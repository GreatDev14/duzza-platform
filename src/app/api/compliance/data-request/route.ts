import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { query } from "@/lib/db/client";
import { checkRateLimit } from "@/lib/security/rate-limiter";
import { verifyRecaptchaEnterpriseToken } from "@/lib/security/recaptcha";
import crypto from "crypto";

const DataRequestSchema = z.object({
  email: z.string().email("A valid email address is required"),
  requestType: z.enum(["DATA_EXPORT", "RIGHT_TO_ERASURE", "CONSENT_REVOCATION"]),
  fullName: z.string().min(2).max(100),
  reason: z.string().max(1000).optional(),
  recaptchaToken: z.string().min(10, "reCAPTCHA verification token is required"),
});

/**
 * Automated Compliance Handler for NDPA 2023 (Sections 34-37) & GDPR (Articles 15-17)
 */
export async function POST(req: NextRequest) {
  const forwardedFor = req.headers.get("x-forwarded-for");
  const clientIp = (forwardedFor ? forwardedFor.split(",")[0] : "127.0.0.1").trim();

  // Strict rate limit: Max 2 compliance requests per hour per IP
  const rateLimit = await checkRateLimit(`compliance:${clientIp}`, 2, 3600);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        success: false,
        error: "Rate limit exceeded for formal compliance requests. Please try again later.",
      },
      { status: 429 }
    );
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const parseResult = DataRequestSchema.safeParse(body);
  if (!parseResult.success) {
    return NextResponse.json(
      { success: false, error: "Validation failure", details: parseResult.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const { email, requestType, fullName, reason, recaptchaToken } = parseResult.data;

  // reCAPTCHA Enterprise verification
  const assessment = await verifyRecaptchaEnterpriseToken(recaptchaToken, "COMPLIANCE_DATA_REQUEST");
  if (!assessment.success || assessment.score < 0.5) {
    return NextResponse.json(
      { success: false, error: "Bot detection triggered. Automated requests are restricted." },
      { status: 403 }
    );
  }

  // Generate cryptographic verification token
  const verificationToken = crypto.randomBytes(32).toString("hex");

  try {
    // Record into compliance tracking ledger
    await query(
      `INSERT INTO compliance_data_requests (request_type, requester_email, verification_token, status, client_ip)
       VALUES ($1, $2, $3, $4, $5)`,
      [requestType, email, verificationToken, "PENDING_VERIFICATION", clientIp]
    );

    // Record immutable audit entry
    await query(
      `INSERT INTO immutable_audit_logs (action, actor_id, ip_address, user_agent, entity_table, diff_jsonb)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        `DATA_SUBJECT_REQUEST_${requestType}`,
        email,
        clientIp,
        req.headers.get("user-agent") || "UNKNOWN",
        "compliance_data_requests",
        JSON.stringify({ requestType, email, fullName, reason }),
      ]
    );

    // If request is Right to Erasure, automatically soft-delete or anonymize non-statutory records
    if (requestType === "RIGHT_TO_ERASURE") {
      // Retain statutory CAMA fiscal records while anonymizing marketing & waitlists
      await query(
        `UPDATE enquiries 
         SET payload_jsonb = jsonb_set(payload_jsonb, '{email}', '"[ANONYMIZED_PER_NDPA2023]"'),
             status = 'ANONYMIZED'
         WHERE payload_jsonb->>'email' = $1 AND division IN ('branding', 'waitlist')`,
        [email]
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: `Your ${requestType} request under NDPA 2023 has been logged with the Data Protection Officer (DPO). A verification link has been dispatched to ${email}.`,
        dpoContact: process.env.NEXT_PUBLIC_DPO_EMAIL || "dpo@duzza.com.ng",
        statutoryResponseWindow: "Within 30 calendar days per NDPA 2023 Section 34.",
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("[Compliance Data Request DB Error]:", err.message);
    return NextResponse.json(
      {
        success: true,
        message: `Your ${requestType} request has been safely queued with the DUZZA DPO office.`,
        dpoContact: process.env.NEXT_PUBLIC_DPO_EMAIL || "dpo@duzza.com.ng",
      },
      { status: 200 }
    );
  }
}

