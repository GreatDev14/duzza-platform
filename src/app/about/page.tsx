import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Building2, CheckCircle2, ArrowRight, ShieldCheck, Award, MapPin } from "lucide-react";
import Holding3DArchitecture from "@/components/animation/Holding3DArchitecture";

export const metadata: Metadata = {
  title: "About DUZZA LIMITED | Corporate Holding Group & Governance",
  description: "Company history, leadership structure, CAMA 2020 statutory disclosures, and operating vision of DUZZA LIMITED. Headquartered in Warri, Delta State, Nigeria.",
};

export default function AboutPage() {
  const rcNumber = process.env.NEXT_PUBLIC_CAC_RC_NUMBER || "RC-7149208";
  const registeredOffice = process.env.NEXT_PUBLIC_REGISTERED_OFFICE || "KM 4 DSC Expressway, Warri, Delta State, Nigeria";

  return (
    <div className="bg-[#050B18] min-h-screen text-[#F1F5F9] font-sans py-16 px-4 sm:px-6 lg:px-8 selection:bg-[#D4AF37] selection:text-[#050B18]">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header & 3D Model Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-[#1B325C] pb-12">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#091224] border border-[#D4AF37]/35 text-xs font-mono text-[#D4AF37] shadow-sm">
              <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>CORPORATE HOLDING PROFILE & GOVERNANCE</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
              Building Sustainable Enterprise Across{" "}
              <span className="text-gradient-gold font-light block sm:inline">
                Nigerian & Global Markets.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#CBD5E1]/90 leading-relaxed font-light">
              DUZZA LIMITED was incorporated under the Companies and Allied Matters Act (CAMA 2020) by the Corporate 
              Affairs Commission, Federal Republic of Nigeria. We serve as a strategic conglomerate platform incubating 
              and scaling specialized operating subsidiaries.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl border border-[#1B325C] bg-[#091224] p-4 shadow-2xl">
              <Holding3DArchitecture />
            </div>
          </div>
        </div>

        {/* Corporate Objects & Legal Baseline */}
        <section className="space-y-4">
          <h2 className="text-xl font-display font-bold text-white flex items-center space-x-2">
            <Award className="w-5 h-5 text-[#D4AF37]" />
            <span>1. Corporate Governance & Legal Standing</span>
          </h2>
          <div className="p-6 sm:p-8 rounded-2xl bg-[#091224] border border-[#1B325C] text-xs sm:text-sm text-[#CBD5E1] space-y-3 font-mono shadow-md">
            <p><strong className="text-white">Legal Entity:</strong> DUZZA LIMITED</p>
            <p><strong className="text-white">Company Type:</strong> Private Company Limited by Shares (CAMA 2020)</p>
            <p><strong className="text-white">CAC Registration:</strong> {rcNumber}</p>
            <p><strong className="text-white">Memorandum Certified Date:</strong> October 2023 (CAC Registrar General)</p>
            <p><strong className="text-white">Registered Base & Operational HQ:</strong> {registeredOffice}</p>
            <p><strong className="text-white">Core Statutory Objects:</strong> General contracting, marine & hydrographic survey, engineering, oil & gas support, manufacturing & merchandise trading, executive branding, food & bakery, and fashion retail.</p>
          </div>
        </section>

        {/* Group Vision and Mission */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-[#091224] border border-[#1B325C] space-y-3 shadow-md hover:border-[#D4AF37]/50 transition-colors">
            <h3 className="font-display font-bold text-lg text-white">Our Vision</h3>
            <p className="text-xs sm:text-sm text-[#CBD5E1]/90 leading-relaxed font-light">
              To build a respected, multi-sector African conglomerate that combines technological precision 
              with creative excellence—empowering key industries and raising living standards across West Africa.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#091224] border border-[#1B325C] space-y-3 shadow-md hover:border-[#D4AF37]/50 transition-colors">
            <h3 className="font-display font-bold text-lg text-white">Our Mission</h3>
            <p className="text-xs sm:text-sm text-[#CBD5E1]/90 leading-relaxed font-light">
              Deliver zero-compromise engineering and marine hydrospatial services to industrial operators, 
              provide transformative creative identity to executives and sports brands, and launch customer-first retail brands.
            </p>
          </div>
        </section>

        {/* Core Principles */}
        <section className="space-y-4">
          <h2 className="text-xl font-display font-bold text-white flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>2. Our Guiding Principles</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-[#091224] border border-[#1B325C] space-y-1">
              <span className="text-sm font-bold text-white flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#38BDF8]" />
                <span>Technical Precision & HSE</span>
              </span>
              <p className="text-xs text-[#94A3B8] font-light">
                Rigorous adherence to international marine safety, oilfield standards, and environmental responsibility.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#091224] border border-[#1B325C] space-y-1">
              <span className="text-sm font-bold text-white flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                <span>Creative Distinctiveness</span>
              </span>
              <p className="text-xs text-[#94A3B8] font-light">
                Crafting visual identities and digital media assets that cut through noise and command authority.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#091224] border border-[#1B325C] space-y-1">
              <span className="text-sm font-bold text-white flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Regulatory Integrity</span>
              </span>
              <p className="text-xs text-[#94A3B8] font-light">
                Full transparency with statutory agencies (CAC, NDPC, FIRS) and client procurement divisions.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#091224] border border-[#1B325C] space-y-1">
              <span className="text-sm font-bold text-white flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#38BDF8]" />
                <span>Local Content Leadership</span>
              </span>
              <p className="text-xs text-[#94A3B8] font-light">
                Deeply committed to capacity building in Delta State, the Niger Delta, and Nigeria at large.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-[#0E1B33] to-[#050B18] border border-[#1B325C] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1">
            <h3 className="font-bold text-lg text-white">Partner with DUZZA LIMITED</h3>
            <p className="text-xs text-[#CBD5E1] font-light">
              Inquire about joint ventures, procurement partnerships, or commercial contracts.
            </p>
          </div>

          <Link
            href="/"
            className="btn-brand-primary px-5 py-3 rounded-xl text-[#050B18] font-bold text-xs uppercase tracking-wider transition-all shadow-md shrink-0 cursor-pointer"
          >
            Explore Divisions →
          </Link>
        </div>
      </div>
    </div>
  );
}
