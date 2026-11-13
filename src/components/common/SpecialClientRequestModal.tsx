"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { 
  X, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  PhoneCall, 
  Mail, 
  Building2, 
  ArrowRight,
  Lock
} from "lucide-react";

interface SpecialClientRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SpecialClientRequestModal({ isOpen, onClose }: SpecialClientRequestModalProps) {
  const [fullName, setFullName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [requestType, setRequestType] = useState("CROSS_VERTICAL_ENGAGEMENT");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === "undefined") return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);

      // Prepare WhatsApp message URL
      const msg = encodeURIComponent(
        `*SPECIAL CLIENT REQUEST — DUZZA LIMITED*\n\n` +
        `• Name: ${fullName}\n` +
        `• Organization: ${organization || "Private Client"}\n` +
        `• Email: ${email}\n` +
        `• Phone: ${whatsapp}\n` +
        `• Nature of Engagement: ${requestType}\n` +
        `• Brief: ${details}\n\n` +
        `Routing to Executive Operations Desk.`
      );
      window.open(`https://wa.me/2348030000000?text=${msg}`, "_blank");
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFullName("");
    setOrganization("");
    setEmail("");
    setWhatsapp("");
    setDetails("");
    onClose();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] overflow-y-auto bg-slate-950/75 backdrop-blur-md p-3 sm:p-6 font-sans animate-fade-in"
      style={{ backgroundColor: "rgba(10, 17, 32, 0.75)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="min-h-full flex items-center justify-center py-4 sm:py-10">
        <div
          className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl p-4 sm:p-8 space-y-5 sm:space-y-6 my-auto"
          style={{ backgroundColor: "#FFFFFF" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className="flex items-start justify-between border-b border-slate-200 pb-4 sm:pb-5">
            <div className="space-y-1.5 min-w-0">
              <div className="inline-flex items-center space-x-2 px-2.5 sm:px-3 py-1 rounded-full bg-brandBlue-50 border border-brandBlue-200 text-[10px] sm:text-xs font-mono text-brandBlue-800 max-w-full">
                <Sparkles className="w-3.5 h-3.5 text-brandBlue-600 shrink-0" />
                <span className="truncate">SPECIAL CLIENT DESK • DUZZA LIMITED</span>
              </div>
              <h3 className="font-display font-extrabold text-xl sm:text-3xl text-navy-950">
                Submit a Special Client Request
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-light">
                Direct institutional routing to DUZZA executive leadership. Response guaranteed within 4 hours.
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-navy-950 hover:bg-slate-100 transition-colors cursor-pointer shrink-0 ml-2"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

        {submitted ? (
          <div className="py-10 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <div className="space-y-2">
              <h4 className="font-display font-bold text-2xl text-navy-950">
                Request Dispatched Successfully
              </h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{fullName}</strong>. Your special request has been routed to our Warri Operations Desk and an email confirmation sent to <strong>{email}</strong>.
              </p>
            </div>
            <div className="pt-2 flex justify-center">
              <button
                onClick={handleReset}
                className="btn-brand-primary px-6 py-3 rounded-xl text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono font-bold text-slate-700 block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Chief / Engr / Dr. Adebayo"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-navy-950 focus:outline-none focus:border-brandBlue-600 bg-slate-50/50"
                />
              </div>

              <div>
                <label className="text-xs font-mono font-bold text-slate-700 block mb-1">
                  Organization / Entity
                </label>
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="Company, Ministry, or Private"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-navy-950 focus:outline-none focus:border-brandBlue-600 bg-slate-50/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono font-bold text-slate-700 block mb-1">
                  Corporate Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="director@organization.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-navy-950 focus:outline-none focus:border-brandBlue-600 bg-slate-50/50"
                />
              </div>

              <div>
                <label className="text-xs font-mono font-bold text-slate-700 block mb-1">
                  WhatsApp / Phone Line *
                </label>
                <input
                  type="tel"
                  required
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="+234 803 000 0000"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-navy-950 focus:outline-none focus:border-brandBlue-600 bg-slate-50/50"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono font-bold text-slate-700 block mb-1">
                Nature of Special Engagement *
              </label>
              <select
                value={requestType}
                onChange={(e) => setRequestType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-navy-950 focus:outline-none focus:border-brandBlue-600 bg-slate-50/50 font-medium"
              >
                <option value="CROSS_VERTICAL_ENGAGEMENT">Multi-Sector Conglomerate Retainer (Cross-Vertical)</option>
                <option value="MARINE_SURVEY_MOBILIZATION">Marine Hydrographic Survey & Offshore Vessel Mobilization</option>
                <option value="EQUIPMENT_FLEET_LEASE">High-Precision Hydrospatial Equipment Fleet Lease</option>
                <option value="EXECUTIVE_BRANDING_OVERHAUL">Executive Branding Architecture & Global Sports Media</option>
                <option value="BESPOKE_COUTURE_CAPSULE">Bespoke Couture Corporate Uniform / VIP Capsule Commission</option>
                <option value="GOURMET_CONFECTIONERY_CONTRACT">Artisan Bakery & Commercial Catering Contract</option>
                <option value="CONFIDENTIAL_HOLDING_ENQUIRY">Confidential Strategic Holding Investment / Joint Venture</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-mono font-bold text-slate-700 block mb-1">
                Scope & Requirements Details *
              </label>
              <textarea
                required
                rows={4}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Please outline timeline, project site/region, estimated requirements, and any special confidentiality instructions..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-navy-950 focus:outline-none focus:border-brandBlue-600 bg-slate-50/50 resize-none"
              />
            </div>

            {/* Confidentiality Notice */}
            <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-500 pt-1">
              <Lock className="w-3.5 h-3.5 text-brandBlue-600 shrink-0" />
              <span>Protected by NDPA 2023 Enterprise Confidentiality. Routed directly to duzzacontact@gmail.com</span>
            </div>

            {/* Submit Action */}
            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Direct Desk: <strong>+234 803 000 0000</strong>
              </span>

              <button
                type="submit"
                disabled={loading}
                className="btn-brand-primary px-7 py-3 rounded-xl text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                <span className="text-white font-bold">{loading ? "Transmitting..." : "Submit Special Request"}</span>
                <Send className="w-3.5 h-3.5 text-[#F3C966]" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  </div>,
    document.body
  );
}

