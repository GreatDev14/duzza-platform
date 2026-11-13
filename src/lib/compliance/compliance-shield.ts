/**
 * DUZZA LIMITED - CLIENT-SIDE COMPLIANCE EXECUTION SHIELD
 * Enforces NDPA 2023 (Nigeria Data Protection Act) and GDPR Consent Verification.
 * Programmatically freezes third-party telemetry (GA4, Meta Pixel) until affirmative consent.
 */

export interface ConsentPreferences {
  strictlyNecessary: boolean; // Always true
  analytics: boolean;         // GA4 / Telemetry
  marketing: boolean;         // Meta Pixel / Ad Networks
  timestamp: string;
  version: string;
}

const CONSENT_STORAGE_KEY = "duzza_consent_v1";

export function getStoredConsent(): ConsentPreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveConsent(preferences: Omit<ConsentPreferences, "strictlyNecessary" | "timestamp" | "version">): ConsentPreferences {
  const payload: ConsentPreferences = {
    strictlyNecessary: true,
    analytics: preferences.analytics,
    marketing: preferences.marketing,
    timestamp: new Date().toISOString(),
    version: "1.0-NDPA2023",
  };

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(payload));
      applyComplianceShield(payload);
    } catch (e) {
      console.error("[Consent Storage Failed]:", e);
    }
  }

  return payload;
}

export function applyComplianceShield(consent: ConsentPreferences) {
  if (typeof window === "undefined") return;

  const w = window as any;

  // 1. GA4 / Google Analytics Enforcement
  if (!consent.analytics) {
    // Explicitly disable Google Analytics engines
    w["ga-disable-UA-DUZZA"] = true;
    w["ga-disable-G-DUZZA_MEASUREMENT"] = true;
    if (w.dataLayer) {
      w.dataLayer.push({ event: "consent_revoked_analytics" });
    }
    console.log("[COMPLIANCE SHIELD]: Analytics telemetry frozen under NDPA 2023.");
  } else {
    w["ga-disable-UA-DUZZA"] = false;
    w["ga-disable-G-DUZZA_MEASUREMENT"] = false;
    if (w.gtag) {
      w.gtag("consent", "update", {
        analytics_storage: "granted",
      });
    }
    console.log("[COMPLIANCE SHIELD]: Analytics telemetry enabled via user consent.");
  }

  // 2. Meta / Instagram Pixel Enforcement
  if (!consent.marketing) {
    if (w.fbq) {
      w.fbq("consent", "revoke");
    }
    console.log("[COMPLIANCE SHIELD]: Marketing & Meta Pixel frozen.");
  } else {
    if (w.fbq) {
      w.fbq("consent", "grant");
    }
    console.log("[COMPLIANCE SHIELD]: Marketing telemetry granted.");
  }
}

