/**
 * Google reCAPTCHA Enterprise Verification Service
 * Evaluates automated bot traffic risk scores based on token assessment.
 */

interface RecaptchaAssessmentResponse {
  tokenProperties?: {
    valid: boolean;
    invalidReason?: string;
    hostname?: string;
    action?: string;
    createTime?: string;
  };
  riskAnalysis?: {
    score: number;
    reasons?: string[];
  };
  name?: string;
}

export interface RecaptchaVerificationResult {
  success: boolean;
  score: number;
  action: string;
  reasons: string[];
  error?: string;
}

const DEFAULT_MIN_SCORE = parseFloat(process.env.RECAPTCHA_SCORE_THRESHOLD || "0.5");

export async function verifyRecaptchaEnterpriseToken(
  token: string,
  expectedAction: string
): Promise<RecaptchaVerificationResult> {
  const projectId = process.env.RECAPTCHA_ENTERPRISE_PROJECT_ID;
  const apiKey = process.env.RECAPTCHA_ENTERPRISE_API_KEY;
  const siteKey = process.env.RECAPTCHA_SITE_KEY_V3 || process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  // Development bypass with strict warning if credentials are unset in local test
  if (!projectId || !apiKey || !siteKey || apiKey.includes("Example")) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[SECURITY WARN] reCAPTCHA Enterprise running in Mock Dev Mode. Configure production variables in .env."
      );
      return {
        success: true,
        score: 0.9,
        action: expectedAction,
        reasons: ["DEVELOPMENT_MOCK_APPROVAL"],
      };
    }
  }

  try {
    const url = `https://recaptchaenterprise.googleapis.com/v1/projects/${projectId}/assessments?key=${apiKey}`;

    const payload = {
      event: {
        token: token,
        siteKey: siteKey,
        expectedAction: expectedAction,
      },
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[reCAPTCHA Enterprise HTTP Error ${response.status}]:`, errorText);
      return {
        success: false,
        score: 0.0,
        action: expectedAction,
        reasons: ["API_GATEWAY_COMMUNICATION_FAILURE"],
        error: `reCAPTCHA Enterprise assessment failed with status ${response.status}`,
      };
    }

    const data: RecaptchaAssessmentResponse = await response.json();

    if (!data.tokenProperties?.valid) {
      return {
        success: false,
        score: 0.0,
        action: expectedAction,
        reasons: [data.tokenProperties?.invalidReason || "INVALID_TOKEN"],
        error: `Token verification failed: ${data.tokenProperties?.invalidReason || "Unknown Reason"}`,
      };
    }

    if (data.tokenProperties.action !== expectedAction) {
      return {
        success: false,
        score: 0.0,
        action: data.tokenProperties.action || "UNKNOWN",
        reasons: ["ACTION_MISMATCH"],
        error: `Action mismatch: expected ${expectedAction}, got ${data.tokenProperties.action}`,
      };
    }

    const score = data.riskAnalysis?.score ?? 0.0;
    const reasons = data.riskAnalysis?.reasons || [];
    const isApproved = score >= DEFAULT_MIN_SCORE;

    return {
      success: isApproved,
      score,
      action: expectedAction,
      reasons,
      error: isApproved ? undefined : `Risk score ${score.toFixed(2)} is below minimum threshold ${DEFAULT_MIN_SCORE}`,
    };
  } catch (err: any) {
    console.error("[reCAPTCHA Enterprise Exception]:", err);
    return {
      success: false,
      score: 0.0,
      action: expectedAction,
      reasons: ["INTERNAL_ASSESSMENT_EXCEPTION"],
      error: err.message || "Failed to contact reCAPTCHA Enterprise verification server",
    };
  }
}

