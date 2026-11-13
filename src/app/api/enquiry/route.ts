import { NextRequest, NextResponse } from "next/server";
import { checkBotId } from "botid/server";
import { z } from "zod";
import { verifyRecaptchaEnterpriseToken } from "@/lib/security/recaptcha";
import { checkRateLimit } from "@/lib/security/rate-limiter";
import { sanitizeObject } from "@/lib/security/sanitizer";
import { query } from "@/lib/db/client";

// ============================================================================
// STRICT ZOD VALIDATION SCHEMAS PER ENTERPRISE DIVISION
// ============================================================================

const BaseEnquirySchema = z.object({
  recaptchaToken: z.string().min(10, "reCAPTCHA verification token is required"),
  consentDataProcessing: z.literal(true, {
    errorMap: () => ({ message: "You must consent to data processing under NDPA 2023 standards" }),
  }),
});

const ProjectsEnquirySchema = BaseEnquirySchema.extend({
  division: z.literal("projects"),
  name: z.string().min(2, "Full name must be at least 2 characters").max(100),
  email: z.string().email("A valid corporate or personal email is required"),
  whatsappNumber: z.string().regex(/^\+?[1-9]\d{7,14}$/, "Valid international phone or WhatsApp number required"),
  company: z.string().max(120).optional(),
  serviceCategory: z.enum([
    "ENGINEERING_CONSTRUCTION",
    "OIL_AND_GAS_SERVICES",
    "MARINE_AND_HYDROGRAPHIC_SURVEY",
    "EQUIPMENT_HIRE",
    "GENERAL_SUPPLY_PROCUREMENT",
  ]),
  projectLocation: z.string().min(2).max(100),
  timeline: z.enum(["IMMEDIATE_UNDER_30_DAYS", "ONE_TO_THREE_MONTHS", "THREE_TO_SIX_MONTHS", "LONG_TERM_PLANNING"]),
  estimatedBudgetNgn: z.string().max(60).optional(),
  equipmentCode: z.string().max(50).optional(),
  scopeDescription: z.string().min(15, "Please provide a brief technical scope description (min 15 chars)").max(4000),
});

const BrandingEnquirySchema = BaseEnquirySchema.extend({
  division: z.literal("branding"),
  name: z.string().min(2).max(100),
  email: z.string().email(),
  whatsappNumber: z.string().regex(/^\+?[1-9]\d{7,14}$/),
  companyOrAgency: z.string().min(2).max(120),
  country: z.string().min(2).max(60),
  servicesNeeded: z.array(z.string()).min(1, "Select at least one branding service"),
  projectGoal: z.string().min(10).max(2000),
  currentBrandLinks: z.string().max(500).optional(),
  budgetRangeUsdOrNgn: z.string().max(60).optional(),
  targetDeadline: z.string().max(60).optional(),
});

const GeneralEnquirySchema = BaseEnquirySchema.extend({
  division: z.literal("general"),
  name: z.string().min(2).max(100),
  email: z.string().email(),
  whatsappNumber: z.string().regex(/^\+?[1-9]\d{7,14}$/),
  inquiryType: z.enum(["PARTNERSHIP_PROPOSAL", "SUPPLIER_VENDOR", "MEDIA_PRESS", "CAREERS", "GENERAL_OFFICE"]),
  subject: z.string().min(3).max(150),
  message: z.string().min(15).max(3000),
});

const WaitlistEnquirySchema = BaseEnquirySchema.extend({
  division: z.literal("waitlist"),
  name: z.string().min(2).max(100),
  email: z.string().email(),
  whatsappNumber: z.string().regex(/^\+?[1-9]\d{7,14}$/),
  verticalInterest: z.enum(["FASHION_BOUTIQUE", "BAKERY_RESTAURANT", "BOTH_VERTICALS"]),
  city: z.string().min(2).max(80),
});

const RootEnquirySchema = z.discriminatedUnion("division", [
  ProjectsEnquirySchema,
  BrandingEnquirySchema,
  GeneralEnquirySchema,
  WaitlistEnquirySchema,
]);

// ============================================================================
// MULTI-ROUTE API GATEWAY HANDLER
// ============================================================================

export async function POST(req: NextRequest) {
  const startTime = Date.now();

  // 0. Vercel BotID Invisible Bot Verification
  const botCheck = await checkBotId();
  if (botCheck.isBot) {
    return NextResponse.json(
      { success: false, error: "Automated submission blocked by Vercel BotID." },
      { status: 403 }
    );
  }

  // 1. Extract Client Metadata for Rate Limiting and Audit
  const forwardedFor = req.headers.get("x-forwarded-for");
  const cfConnectingIp = req.headers.get("cf-connecting-ip");
  const clientIp = (cfConnectingIp || (forwardedFor ? forwardedFor.split(",")[0] : null) || "127.0.0.1").trim();
  const userAgent = req.headers.get("user-agent") || "UNKNOWN_USER_AGENT";

  // 2. Distributed Rate Limiting (Token Bucket: Max 5 submissions per 60 seconds per IP)
  const rateLimit = await checkRateLimit(clientIp, 5, 60);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        success: false,
        error: "Rate limit exceeded. Too many submissions from this connection.",
        retryAfter: rateLimit.resetSeconds,
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.resetSeconds),
          "X-RateLimit-Limit": String(rateLimit.limit),
          "X-RateLimit-Remaining": String(rateLimit.remaining),
        },
      }
    );
  }

  // 3. Payload Parsing & Schema Validation
  let rawBody: any;
  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON payload" }, { status: 400 });
  }

  const validationResult = RootEnquirySchema.safeParse(rawBody);
  if (!validationResult.success) {
    return NextResponse.json(
      {
        success: false,
        error: "Validation failed on payload attributes",
        details: validationResult.error.flatten().fieldErrors,
      },
      { status: 422 }
    );
  }

  const data = validationResult.data;

  // 4. reCAPTCHA Enterprise Risk Assessment
  const assessment = await verifyRecaptchaEnterpriseToken(data.recaptchaToken, "ENQUIRY_SUBMISSION");

  if (!assessment.success || assessment.score < 0.5) {
    console.warn(`[SECURITY ALERT - BOT DEFENSE TRIGGERED]: IP=${clientIp} Score=${assessment.score} Reasons=${assessment.reasons.join(",")}`);

    // Record security challenge anomaly in audit trail asynchronously
    try {
      await query(
        `INSERT INTO immutable_audit_logs (action, actor_id, ip_address, user_agent, entity_table, diff_jsonb)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          "BOT_TRAFFIC_CHALLENGE_BLOCKED",
          "SYSTEM_SECURITY_AGENT",
          clientIp,
          userAgent,
          "enquiries",
          JSON.stringify({ riskScore: assessment.score, reasons: assessment.reasons, division: data.division }),
        ]
      );
    } catch (e) {
      // Non-blocking fallback
    }

    return NextResponse.json(
      {
        success: false,
        error: "Security verification flagged an anomaly. Automated submissions are blocked.",
        score: assessment.score,
        supportNotice: "For immediate enterprise assistance, contact DUZZA Warri HQ via WhatsApp or telephone.",
      },
      { status: 403 }
    );
  }

  // 5. Sanitize Sanitized Payload & Generate Enterprise Reference Code
  const sanitizedPayload = sanitizeObject(data);
  const timestampStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const referenceCode = `DZ-${data.division.toUpperCase().slice(0, 3)}-${timestampStr}-${randomSuffix}`;

  // 6. Persistence & Audit Log Entry
  try {
    await query(
      `INSERT INTO enquiries (reference_code, division, payload_jsonb, risk_score, ip_address, user_agent, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        referenceCode,
        data.division,
        JSON.stringify(sanitizedPayload),
        assessment.score,
        clientIp,
        userAgent,
        "PENDING_DISPATCH",
      ]
    );

    await query(
      `INSERT INTO immutable_audit_logs (action, actor_id, ip_address, user_agent, entity_table, entity_id, diff_jsonb)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        "ENQUIRY_RECEIVED",
        data.email,
        clientIp,
        userAgent,
        "enquiries",
        referenceCode,
        JSON.stringify({ division: data.division, referenceCode, riskScore: assessment.score }),
      ]
    );
  } catch (dbError: any) {
    console.error("[Database Persistence Warning - Continuing to CRM Dispatch]:", dbError.message);
  }

  // 7. Dynamic Route Dispatching to Specific Divisional Inboxes / CRM Webhooks
  let dispatchDestination = "";
  try {
    switch (data.division) {
      case "projects": {
        dispatchDestination = process.env.PROJECTS_PROCUREMENT_INBOX || "projects-procurement@duzza.com.ng";
        const crmEndpoint = process.env.CRM_PROJECTS_ENDPOINT;
        if (crmEndpoint) {
          await forwardToCrmWebhook(crmEndpoint, { ...sanitizedPayload, referenceCode });
        }
        break;
      }
      case "branding": {
        dispatchDestination = process.env.BRANDING_BRIEFS_INBOX || "branding-briefs@duzza.com.ng";
        const crmEndpoint = process.env.CRM_BRANDING_ENDPOINT;
        if (crmEndpoint) {
          await forwardToCrmWebhook(crmEndpoint, { ...sanitizedPayload, referenceCode });
        }
        break;
      }
      case "waitlist": {
        dispatchDestination = "waitlist-leads@duzza.com.ng";
        break;
      }
      case "general":
      default: {
        dispatchDestination = process.env.GENERAL_INQUIRIES_INBOX || "info@duzza.com.ng";
        const crmEndpoint = process.env.CRM_GENERAL_ENDPOINT;
        if (crmEndpoint) {
          await forwardToCrmWebhook(crmEndpoint, { ...sanitizedPayload, referenceCode });
        }
        break;
      }
    }
  } catch (dispatchError: any) {
    console.error("[CRM Dispatch Exception]:", dispatchError.message);
  }

  const durationMs = Date.now() - startTime;

  return NextResponse.json(
    {
      success: true,
      message: "Enquiry validated, verified via reCAPTCHA Enterprise, and successfully routed.",
      referenceCode,
      division: data.division,
      dispatchedTo: dispatchDestination,
      latencyMs: durationMs,
    },
    {
      status: 201,
      headers: {
        "X-RateLimit-Limit": String(rateLimit.limit),
        "X-RateLimit-Remaining": String(rateLimit.remaining),
      },
    }
  );
}

// Background webhook helper
async function forwardToCrmWebhook(endpoint: string, payload: any) {
  try {
    await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Duzza-Gateway-Key": process.env.SYSTEM_ENCRYPTION_KEY || "duzza-internal-gateway",
      },
      body: JSON.stringify(payload),
    });
  } catch (err: any) {
    console.warn(`[CRM Webhook Push Failed for ${endpoint}]:`, err.message);
  }
}

