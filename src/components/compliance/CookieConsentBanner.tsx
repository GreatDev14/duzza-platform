"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck, ChevronRight, Settings } from "lucide-react";
import { useCookieConsent } from "@/hooks/useCookieConsent";

export default function CookieConsentBanner() {
  const { consent, hasLoaded, hasDecided, acceptAll, rejectOptional, updateConsent } = useCookieConsent();
  const [showDetails, setShowDetails] = useState(false);
  const [analyticsChecked, setAnalyticsChecked] = useState(false);
  const [marketingChecked, setMarketingChecked] = useState(false);

  if (!hasLoaded || hasDecided) {
    return null;
  }

  const handleSaveCustom = () => {
    updateConsent(analyticsChecked, marketingChecked);
  };

  return (
    <div
      role="region"
      aria-label="Privacy and Cookie Consent"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 bg-[#091224]/95 backdrop-blur-md border-t border-[#1B325C] shadow-2xl animate-in slide-in-from-bottom duration-300 text-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="text-sm font-display font-bold uppercase tracking-wider text-white">
                DUZZA LIMITED — Data Governance & Privacy Shield (NDPA 2023 & GDPR)
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#CBD5E1]/90 leading-relaxed font-light">
              We operate under the Nigeria Data Protection Act 2023 (NDPA). We deploy strictly necessary cookies for operational security, 
              session integrity, and reCAPTCHA Enterprise bot mitigation. Non-essential tracking scripts remain <strong>frozen</strong> until you grant affirmative consent.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="inline-flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-[#0E1B33] text-[#CBD5E1] hover:text-white border border-[#1B325C] hover:border-[#D4AF37] transition-colors cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>{showDetails ? "Hide Options" : "Preferences"}</span>
            </button>

            <button
              onClick={rejectOptional}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg bg-[#0E1B33] text-[#CBD5E1] hover:text-white border border-[#1B325C] hover:border-[#D4AF37] transition-colors cursor-pointer"
            >
              Reject Optional
            </button>

            <button
              onClick={acceptAll}
              className="btn-brand-primary px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg text-[#050B18] shadow-md transition-all cursor-pointer"
            >
              Accept All
            </button>
          </div>
        </div>

        {/* Granular Preference Controls */}
        {showDetails && (
          <div className="mt-6 pt-6 border-t border-[#1B325C] grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in duration-200">
            <div className="p-3 rounded-lg bg-[#0E1B33] border border-[#1B325C] flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-white block">Strictly Necessary</span>
                <span className="text-[11px] text-[#94A3B8] mt-1 block">
                  CAMA 2020 verification, CSRF tokens, and reCAPTCHA bot defense.
                </span>
              </div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#091224] text-[#D4AF37] border border-[#D4AF37]/35 font-bold">
                Mandatory
              </span>
            </div>

            <label className="p-3 rounded-lg bg-[#0E1B33] border border-[#1B325C] flex items-start justify-between cursor-pointer hover:border-[#D4AF37]/50">
              <div>
                <span className="text-xs font-bold text-white block">Performance & GA4</span>
                <span className="text-[11px] text-[#94A3B8] mt-1 block">
                  Anonymous performance metrics and Core Web Vitals telemetry.
                </span>
              </div>
              <input
                type="checkbox"
                checked={analyticsChecked}
                onChange={(e) => setAnalyticsChecked(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-[#1B325C] text-[#D4AF37] focus:ring-[#D4AF37]"
              />
            </label>

            <label className="p-3 rounded-lg bg-[#0E1B33] border border-[#1B325C] flex items-start justify-between cursor-pointer hover:border-[#D4AF37]/50">
              <div>
                <span className="text-xs font-bold text-white block">Marketing & Meta Pixel</span>
                <span className="text-[11px] text-[#94A3B8] mt-1 block">
                  Enables tailored campaign conversion measurement.
                </span>
              </div>
              <input
                type="checkbox"
                checked={marketingChecked}
                onChange={(e) => setMarketingChecked(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-[#1B325C] text-[#D4AF37] focus:ring-[#D4AF37]"
              />
            </label>

            <div className="md:col-span-3 flex justify-end pt-2">
              <button
                onClick={handleSaveCustom}
                className="btn-brand-primary px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-[#050B18] shadow-md cursor-pointer"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
