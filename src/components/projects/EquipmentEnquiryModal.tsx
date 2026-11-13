"use client";

import React, { useState, useEffect } from "react";
import { X, Check, ShieldCheck, Calendar, PhoneCall, AlertCircle } from "lucide-react";

interface EquipmentEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  equipmentCode?: string;
  equipmentName?: string;
}

export default function EquipmentEnquiryModal({
  isOpen,
  onClose,
  equipmentCode = "EQ-MBES-7125",
  equipmentName = "Reson SeaBat T50-P Multibeam Echo Sounder",
}: EquipmentEnquiryModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("Warri / Niger Delta");
  const [timeline, setTimeline] = useState("IMMEDIATE_UNDER_30_DAYS");
  const [notes, setNotes] = useState("");
  const [consent, setConsent] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [referenceCode, setReferenceCode] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (isOpen) {
      setReferenceCode(null);
      setErrorMsg("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");

    try {
      const formattedPhone = whatsapp.startsWith("+") ? whatsapp : `+234${whatsapp.replace(/^0/, "")}`;
      const payload = {
        division: "projects",
        name: fullName,
        email,
        whatsappNumber: formattedPhone,
        company: company || "Corporate Client",
        serviceCategory: "EQUIPMENT_HIRE",
        projectLocation: location,
        timeline,
        equipmentCode,
        scopeDescription: `Lease inquiry for ${equipmentCode} (${equipmentName}). Notes: ${notes || "Standard mobilization"}.`,
        consentDataProcessing: consent,
        recaptchaToken: "client_mock_token_for_assessment_verification",
      };

      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit equipment enquiry");
      }

      setReferenceCode(data.referenceCode);
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred while processing your request.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200"
      style={{ backgroundColor: "rgba(10, 17, 32, 0.75)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="min-h-full flex items-center justify-center py-6 sm:py-10">
        <div
          className="relative w-full max-w-xl rounded-2xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 text-slate-900 my-auto"
          style={{ backgroundColor: "#FFFFFF" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-navy-950 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {referenceCode ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-300">
              <Check className="w-8 h-8" />
            </div>

            <h3 className="font-display font-bold text-2xl text-navy-950">
              Enquiry Submitted Successfully
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Your equipment mobilization request has been routed to our Warri Marine Logistics Desk. 
              A procurement officer will contact you within 2 hours.
            </p>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 inline-block font-mono text-xs">
              <span className="text-slate-500 block">Tracking Reference Code:</span>
              <span className="text-base font-bold text-brandBlue-600 tracking-wider">
                {referenceCode}
              </span>
            </div>

            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-lg bg-brandBlue-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-brandBlue-700 transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-brandBlue-600 font-bold block">
                Asset Leasehold Pipeline
              </span>
              <h3 className="font-display font-bold text-2xl text-navy-950">
                Equipment Mobilization Inquiry
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                Selected Unit: <strong className="text-brandBlue-700">{equipmentName} ({equipmentCode})</strong>
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-600 font-semibold">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Engr. Tari West"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy-950 placeholder-slate-400 focus:outline-none focus:border-brandBlue-600"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-600 font-semibold">
                  Corporate Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="tari.west@offshore.ng"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy-950 placeholder-slate-400 focus:outline-none focus:border-brandBlue-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-600 font-semibold">
                  WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="0803 123 4567"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy-950 placeholder-slate-400 focus:outline-none focus:border-brandBlue-600"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-600 font-semibold">
                  Company / Organization
                </label>
                <input
                  type="text"
                  placeholder="e.g. Chevron Nigeria Contractor"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy-950 placeholder-slate-400 focus:outline-none focus:border-brandBlue-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-600 font-semibold">
                  Mobilization Base Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy-950 focus:outline-none focus:border-brandBlue-600"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-600 font-semibold">
                  Deployment Timeline
                </label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-navy-950 focus:outline-none focus:border-brandBlue-600"
                >
                  <option value="IMMEDIATE_UNDER_30_DAYS">Immediate (&lt; 30 Days)</option>
                  <option value="ONE_TO_THREE_MONTHS">1 to 3 Months</option>
                  <option value="THREE_TO_SIX_MONTHS">3 to 6 Months</option>
                  <option value="LONG_TERM_PLANNING">Long-Term Framework</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase tracking-wider text-slate-600 font-semibold">
                Project Specifics / Vessel Requirements
              </label>
              <textarea
                rows={2}
                placeholder="Specify survey duration, deployment depth, or required survey crew..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-navy-950 placeholder-slate-400 focus:outline-none focus:border-brandBlue-600"
              />
            </div>

            <div className="flex items-start space-x-2 text-xs text-slate-600 pt-1">
              <input
                type="checkbox"
                id="modalConsent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                required
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brandBlue-600 focus:ring-0"
              />
              <label htmlFor="modalConsent" className="text-[11px] leading-relaxed">
                I consent to Duzza Limited processing my details in accordance with the NDPA 2023.
              </label>
            </div>

            <button
              type="submit"
              disabled={submitting}
              style={{ backgroundColor: "#0052FF", color: "#FFFFFF" }}
              className="btn-brand-primary w-full py-3.5 rounded-xl bg-[#0052FF] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#0041CC] transition-all shadow-md shadow-blue-600/20 disabled:opacity-50 cursor-pointer"
            >
              <span className="text-white font-bold">{submitting ? "Transmitting Reservation..." : "Submit Lease Request"}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  </div>
  );
}
