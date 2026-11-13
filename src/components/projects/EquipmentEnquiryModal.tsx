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
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="min-h-full flex items-center justify-center py-6 sm:py-10">
        <div
          className="relative w-full max-w-xl rounded-2xl bg-[#091224] border border-[#1B325C] shadow-2xl p-6 sm:p-8 text-white my-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#0E1B33] transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

        {referenceCode ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#0E1B33] text-[#D4AF37] flex items-center justify-center mx-auto border border-[#D4AF37]/40">
              <Check className="w-8 h-8" />
            </div>

            <h3 className="font-display font-bold text-2xl text-white">
              Enquiry Submitted Successfully
            </h3>

            <p className="text-xs sm:text-sm text-[#CBD5E1] max-w-md mx-auto leading-relaxed">
              Your equipment mobilization request has been routed to our Warri Marine Logistics Desk. 
              A procurement officer will contact you within 2 hours.
            </p>

            <div className="p-4 rounded-xl bg-[#0E1B33] border border-[#1B325C] inline-block font-mono text-xs">
              <span className="text-[#94A3B8] block">Tracking Reference Code:</span>
              <span className="text-base font-bold text-[#D4AF37] tracking-wider">
                {referenceCode}
              </span>
            </div>

            <div className="pt-4">
              <button
                onClick={onClose}
                className="btn-brand-primary px-6 py-2.5 rounded-lg text-[#050B18] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] font-bold block">
                Asset Leasehold Pipeline
              </span>
              <h3 className="font-display font-bold text-2xl text-white">
                Equipment Mobilization Inquiry
              </h3>
              <p className="text-xs text-[#CBD5E1] font-mono">
                Selected Unit: <strong className="text-[#D4AF37]">{equipmentName} ({equipmentCode})</strong>
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-950/50 border border-red-500/50 text-red-300 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase tracking-wider text-[#D4AF37] font-semibold">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Engr. Tari West"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#0E1B33] border border-[#1B325C] rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase tracking-wider text-[#D4AF37] font-semibold">
                  Corporate Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="tari.west@offshore.ng"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0E1B33] border border-[#1B325C] rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase tracking-wider text-[#D4AF37] font-semibold">
                  WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="0803 123 4567"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full bg-[#0E1B33] border border-[#1B325C] rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase tracking-wider text-[#D4AF37] font-semibold">
                  Company / Organization
                </label>
                <input
                  type="text"
                  placeholder="e.g. Chevron Nigeria Contractor"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full bg-[#0E1B33] border border-[#1B325C] rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase tracking-wider text-[#D4AF37] font-semibold">
                  Mobilization Base Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-[#0E1B33] border border-[#1B325C] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase tracking-wider text-[#D4AF37] font-semibold">
                  Deployment Timeline
                </label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full bg-[#0E1B33] border border-[#1B325C] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="IMMEDIATE_UNDER_30_DAYS">Immediate (&lt; 30 Days)</option>
                  <option value="ONE_TO_THREE_MONTHS">1 to 3 Months</option>
                  <option value="THREE_TO_SIX_MONTHS">3 to 6 Months</option>
                  <option value="LONG_TERM_PLANNING">Long-Term Framework</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase tracking-wider text-[#D4AF37] font-semibold">
                Project Specifics / Vessel Requirements
              </label>
              <textarea
                rows={2}
                placeholder="Specify survey duration, deployment depth, or required survey crew..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-[#0E1B33] border border-[#1B325C] rounded-xl p-3 text-xs text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="flex items-start space-x-2 text-xs text-[#CBD5E1] pt-1">
              <input
                type="checkbox"
                id="modalConsent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                required
                className="mt-0.5 h-4 w-4 rounded border-[#1B325C] text-[#D4AF37] focus:ring-[#D4AF37]"
              />
              <label htmlFor="modalConsent" className="text-[11px] leading-relaxed">
                I consent to Duzza Limited processing my details in accordance with the NDPA 2023.
              </label>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-brand-primary w-full py-3.5 rounded-xl text-[#050B18] font-bold text-xs uppercase tracking-wider transition-all shadow-md disabled:opacity-50 cursor-pointer"
            >
              <span>{submitting ? "Transmitting Reservation..." : "Submit Lease Request"}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  </div>
  );
}
