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
    <footer className="bg-[#0A2558] text-white font-sans relative overflow-hidden">
      {/* World Map Background Silhouette (Image 1 Style) */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:20px_20px]" 
      />

      {/* Top Statutory & Compliance Banner */}
      <div className="bg-[#06183B] border-b border-blue-900/60 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center space-x-2 text-blue-200">
            <Building className="w-4 h-4 text-blue-400" />
            <span>
              <strong className="text-white">INCORPORATED UNDER CAMA 2020:</strong> DUZZA LIMITED (CAC Certified)
            </span>
            <span className="text-blue-300 font-bold ml-2">| RC: {rcNumber}</span>
          </div>
          <div className="flex items-center space-x-6 text-blue-300">
            <span className="flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
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
              <div className="w-9 h-9 rounded-xl bg-white p-0.5 flex items-center justify-center font-display font-black text-brandBlue-600 text-lg shadow-md">
                DZ
              </div>
              <span className="font-display font-bold text-xl text-white tracking-wider">
                DUZZA LIMITED
              </span>
            </div>

            <p className="text-sm text-blue-200/80 leading-relaxed max-w-md font-light">
              A diversified multi-sector holding company operating active subsidiaries across Heavy Engineering, 
              Oil & Gas, Marine Hydrospatial Survey, and Executive Brand Identity, alongside emerging lifestyle divisions.
            </p>

            <div className="pt-2 text-xs space-y-2 text-blue-300 font-mono">
              <p className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{registeredOffice}</span>
              </p>
              <p className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href="mailto:duzzacontact@gmail.com" className="hover:text-white transition-colors">
                  duzzacontact@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Col 2: Duzza Projects */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-blue-300 font-mono">
              Duzza Projects
            </h4>
            <ul className="space-y-2 text-sm text-blue-100">
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">
                  General Contracting
                </Link>
              </li>
              <li>
                <Link href="/projects#marine-survey" className="hover:text-white transition-colors">
                  Marine Hydrographic Survey
                </Link>
              </li>
              <li>
                <Link href="/projects/equipment" className="hover:text-white transition-colors">
                  Equipment Hire Catalogue
                </Link>
              </li>
              <li>
                <Link href="/projects#oil-gas" className="hover:text-white transition-colors">
                  Oil & Gas Infrastructure
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-sky-300 hover:underline font-semibold">
                  Request RFQ Proposal →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Duzza Branding */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-blue-300 font-mono">
              Duzza Branding
            </h4>
            <ul className="space-y-2 text-sm text-blue-100">
              <li>
                <Link href="/branding" className="hover:text-white transition-colors">
                  Executive Identity
                </Link>
              </li>
              <li>
                <Link href="/branding#sports-media" className="hover:text-white transition-colors">
                  Sports & Digital Media UGC
                </Link>
              </li>
              <li>
                <Link href="/branding#merchandising" className="hover:text-white transition-colors">
                  Global Merchandising
                </Link>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/duzza_branding"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram @duzza_branding
                </a>
              </li>
              <li>
                <a
                  href="mailto:duzzacontact@gmail.com"
                  className="text-emerald-300 hover:underline font-semibold"
                >
                  duzzacontact@gmail.com →
                </a>
              </li>
              <li>
                <Link href="/branding#brief-section" className="text-sky-300 hover:underline font-semibold">
                  Submit Creative Brief →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Direct Dispatch (Image 1 Style) */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-blue-300 font-mono">
              Get Our Newsletter
            </h4>
            <p className="text-xs text-blue-200/80 leading-relaxed font-light">
              Receive quarterly project updates, marine survey equipment availability, and brand releases.
            </p>
            <div className="flex items-center space-x-1 pt-1">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-white text-slate-900 rounded-lg px-3 py-2 text-xs placeholder-slate-400 focus:outline-none"
              />
              <button
                className="px-3.5 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs uppercase tracking-wider transition-colors shrink-0"
              >
                Send
              </button>
            </div>
            <p className="text-[11px] text-blue-300/80 font-mono pt-1">
              We respect your data per NDPA 2023. Zero spam.
            </p>
          </div>
        </div>

        {/* Bottom Legal Copyright */}
        <div className="pt-10 mt-10 border-t border-blue-900/60 flex flex-col sm:flex-row items-center justify-between text-xs text-blue-300/80 gap-4">
          <div className="flex items-center space-x-2">
            <span>© {currentYear} DUZZA LIMITED. All rights reserved.</span>
            <span>•</span>
            <Link href="/legal/privacy-policy" className="hover:text-white underline">
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
