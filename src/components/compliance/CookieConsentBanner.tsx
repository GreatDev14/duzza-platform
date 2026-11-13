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
      className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl animate-in slide-in-from-bottom duration-300 text-slate-800"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-brandBlue-600" />
              <h3 className="text-sm font-display font-bold uppercase tracking-wider text-navy-950">
                DUZZA LIMITED — Data Governance & Privacy Shield (NDPA 2023 & GDPR)
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
              We operate under the Nigeria Data Protection Act 2023 (NDPA). We deploy strictly necessary cookies for operational security, 
              session integrity, and reCAPTCHA Enterprise bot mitigation. Non-essential tracking scripts (Meta Pixel, Google Analytics 4) 
              remain <strong>frozen</strong> until you grant affirmative consent.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="inline-flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-100 text-slate-700 hover:text-navy-950 hover:bg-slate-200 border border-slate-300 transition-colors"
            >
              <Settings className="w-3.5 h-3.5 text-brandBlue-600" />
              <span>{showDetails ? "Hide Options" : "Preferences"}</span>
            </button>

            <button
              onClick={rejectOptional}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg bg-slate-100 text-slate-700 hover:text-navy-950 hover:bg-slate-200 border border-slate-300 transition-colors"
            >
              Reject Optional
            </button>

            <button
              onClick={acceptAll}
              className="px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg bg-brandBlue-600 text-white hover:bg-brandBlue-700 shadow-md shadow-brandBlue-600/20 transition-all"
            >
              Accept All
            </button>
          </div>
        </div>

        {/* Granular Preference Controls */}
        {showDetails && (
          <div className="mt-6 pt-6 border-t border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in duration-200">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-navy-950 block">Strictly Necessary</span>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  CAMA 2020 verification, CSRF tokens, and reCAPTCHA bot defense.
                </span>
              </div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-brandBlue-100 text-brandBlue-800 border border-brandBlue-200 font-bold">
                Mandatory
              </span>
            </div>

            <label className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start justify-between cursor-pointer hover:border-slate-300">
              <div>
                <span className="text-xs font-bold text-navy-950 block">Performance & GA4</span>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Anonymous performance metrics and Core Web Vitals telemetry.
                </span>
              </div>
              <input
                type="checkbox"
                checked={analyticsChecked}
                onChange={(e) => setAnalyticsChecked(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-brandBlue-600 focus:ring-brandBlue-600"
              />
            </label>

            <label className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start justify-between cursor-pointer hover:border-slate-300">
              <div>
                <span className="text-xs font-bold text-navy-950 block">Marketing & Meta Pixels</span>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Instagram & Meta creative campaign measurement.
                </span>
              </div>
              <input
                type="checkbox"
                checked={marketingChecked}
                onChange={(e) => setMarketingChecked(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-brandBlue-600 focus:ring-brandBlue-600"
              />
            </label>

            <div className="md:col-span-3 flex justify-between items-center pt-2">
              <Link
                href="/legal/privacy-policy"
                className="text-xs text-brandBlue-600 hover:underline inline-flex items-center space-x-1 font-semibold"
              >
                <span>Read Full NDPA 2023 Legal Disclosures</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>

              <button
                onClick={handleSaveCustom}
                className="px-4 py-1.5 text-xs font-bold uppercase rounded bg-slate-800 hover:bg-slate-900 text-white transition-colors"
              >
                Save Selected Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
