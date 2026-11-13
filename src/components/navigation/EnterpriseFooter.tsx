import React from "react";
import Link from "next/link";
import { ShieldCheck, MapPin, Building, Phone, Mail, Lock, ArrowRight, Send } from "lucide-react";

export default function EnterpriseFooter() {
  const rcNumber = process.env.NEXT_PUBLIC_CAC_RC_NUMBER || "RC-7149208";
  const registeredOffice = process.env.NEXT_PUBLIC_REGISTERED_OFFICE || "KM 4 DSC Expressway, Warri, Delta State, Nigeria";
  const operationalBase = process.env.NEXT_PUBLIC_OPERATIONAL_BASE || "Warri, Delta State, Nigeria";
  const dpoEmail = process.env.NEXT_PUBLIC_DPO_EMAIL || "dpo@duzza.com.ng";
  const currentYear = 2026;

  return (
    <footer className="bg-[#030712] text-[#F1F5F9] font-sans relative overflow-hidden border-t border-[#1B325C]">
      {/* Deep Blue & Gold Ambient Constellation Silhouette */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:24px_24px]" 
      />

      {/* Top Statutory & Compliance Banner */}
      <div className="bg-[#050B18] border-b border-[#1B325C] py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center space-x-2 text-[#CBD5E1]">
            <Building className="w-4 h-4 text-[#D4AF37]" />
            <span>
              <strong className="text-white">INCORPORATED UNDER CAMA 2020:</strong> DUZZA LIMITED (CAC Certified)
            </span>
            <span className="text-[#D4AF37] font-bold ml-2">| RC: {rcNumber}</span>
          </div>
          <div className="flex items-center space-x-6 text-[#CBD5E1]">
            <span className="flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Base: {operationalBase}</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>NDPA 2023 & GDPR Aligned</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Structural Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Group Identity & Trust Profile */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0284C7] to-[#D4AF37] p-0.5 flex items-center justify-center font-display font-black text-[#050B18] text-lg shadow-[0_0_15px_rgba(212,175,55,0.35)]">
                <div className="w-full h-full bg-[#091224] rounded-[10px] flex items-center justify-center text-[#D4AF37] font-bold">
                  DZ
                </div>
              </div>
              <span className="font-display font-bold text-xl text-white tracking-wider">
                DUZZA LIMITED
              </span>
            </div>

            <p className="text-sm text-[#CBD5E1]/90 leading-relaxed max-w-md font-light">
              A diversified multi-sector holding company operating active subsidiaries across Heavy Engineering, 
              Oil & Gas, Marine Hydrospatial Survey, and Executive Brand Identity, alongside emerging lifestyle divisions.
            </p>

            <div className="pt-2 text-xs space-y-2 text-[#94A3B8] font-mono">
              <p className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>{registeredOffice}</span>
              </p>
              <p className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <a href="mailto:duzzacontact@gmail.com" className="hover:text-white transition-colors">
                  duzzacontact@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Col 2: Duzza Projects */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37] font-mono">
              Duzza Projects
            </h4>
            <ul className="space-y-2 text-sm text-[#CBD5E1]">
              <li>
                <Link href="/projects" className="hover:text-[#38BDF8] transition-colors">
                  General Contracting
                </Link>
              </li>
              <li>
                <Link href="/projects#marine-survey" className="hover:text-[#38BDF8] transition-colors">
                  Marine Hydrographic Survey
                </Link>
              </li>
              <li>
                <Link href="/projects/equipment" className="hover:text-[#38BDF8] transition-colors">
                  Equipment Hire Catalogue
                </Link>
              </li>
              <li>
                <Link href="/projects#oil-gas" className="hover:text-[#38BDF8] transition-colors">
                  Oil & Gas Infrastructure
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-[#D4AF37] hover:underline font-semibold flex items-center space-x-1">
                  <span>Request RFQ Proposal →</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Duzza Branding */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37] font-mono">
              Duzza Branding
            </h4>
            <ul className="space-y-2 text-sm text-[#CBD5E1]">
              <li>
                <Link href="/branding" className="hover:text-[#38BDF8] transition-colors">
                  Executive Identity
                </Link>
              </li>
              <li>
                <Link href="/branding#sports-media" className="hover:text-[#38BDF8] transition-colors">
                  Sports & Digital Media UGC
                </Link>
              </li>
              <li>
                <Link href="/branding#merchandising" className="hover:text-[#38BDF8] transition-colors">
                  Global Merchandising
                </Link>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/duzza_branding"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#38BDF8] transition-colors"
                >
                  Instagram @duzza_branding
                </a>
              </li>
              <li>
                <a
                  href="mailto:duzzacontact@gmail.com"
                  className="text-emerald-400 hover:underline font-semibold"
                >
                  duzzacontact@gmail.com →
                </a>
              </li>
              <li>
                <Link href="/branding#brief-section" className="text-[#D4AF37] hover:underline font-semibold">
                  Submit Creative Brief →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Direct Dispatch */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37] font-mono">
              Get Our Newsletter
            </h4>
            <p className="text-xs text-[#CBD5E1]/80 leading-relaxed font-light">
              Receive quarterly project updates, marine survey equipment availability, and brand releases.
            </p>
            <div className="flex items-center space-x-1 pt-1">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-[#0E1B33] text-[#F1F5F9] border border-[#1B325C] rounded-lg px-3 py-2 text-xs placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              />
              <button
                className="px-3.5 py-2 rounded-lg btn-brand-primary text-[#050B18] font-bold text-xs uppercase tracking-wider transition-all shadow-md shrink-0 cursor-pointer"
              >
                Send
              </button>
            </div>
            <p className="text-[11px] text-[#94A3B8] font-mono pt-1">
              We respect your data per NDPA 2023. Zero spam.
            </p>
          </div>
        </div>

        {/* Bottom Legal Copyright */}
        <div className="pt-10 mt-10 border-t border-[#1B325C] flex flex-col sm:flex-row items-center justify-between text-xs text-[#94A3B8] gap-4">
          <div className="flex items-center space-x-2">
            <span>© {currentYear} DUZZA LIMITED. All rights reserved.</span>
            <span>•</span>
            <Link href="/legal/privacy-policy" className="hover:text-[#D4AF37] underline">
              Privacy Policy
            </Link>
          </div>
          <div className="font-mono text-[11px]">
            Statutory Registration: CAC RC-{rcNumber} | Warri, Delta State, Nigeria
          </div>
        </div>
      </div>
    </footer>
  );
}
