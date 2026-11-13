"use client";

import { useState, useEffect } from "react";
import { getStoredConsent, saveConsent, applyComplianceShield, ConsentPreferences } from "@/lib/compliance/compliance-shield";

export function useCookieConsent() {
  const [consent, setConsent] = useState<ConsentPreferences | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const existing = getStoredConsent();
    if (existing) {
      setConsent(existing);
      applyComplianceShield(existing);
    }
    setHasLoaded(true);
  }, []);

  const updateConsent = (analytics: boolean, marketing: boolean) => {
    const updated = saveConsent({ analytics, marketing });
    setConsent(updated);
  };

  const acceptAll = () => {
    updateConsent(true, true);
  };

  const rejectOptional = () => {
    updateConsent(false, false);
  };

  return {
    consent,
    hasLoaded,
    hasDecided: consent !== null,
    acceptAll,
    rejectOptional,
    updateConsent,
  };
}

