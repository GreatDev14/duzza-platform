"use client";

import React, { useState } from "react";
import { Download, FileText, CheckCircle2, ShieldCheck } from "lucide-react";

export default function CapabilityDownloadModule() {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);

    const rcNumber = process.env.NEXT_PUBLIC_CAC_RC_NUMBER || "RC-7149208";
    const content = `================================================================================
DUZZA LIMITED - CORPORATE & ENGINEERING CAPABILITY STATEMENT
CAMA 2020 Certified | CAC ${rcNumber} | Headquarters: Warri, Delta State, Nigeria
================================================================================

1. EXECUTIVE SUMMARY
DUZZA LIMITED is a diversified Nigerian engineering and multi-sector holding company.
Operational divisions include DUZZA PROJECTS (General Contracting, Civil Engineering,
Oil & Gas Infrastructure Maintenance, Marine and Hydrographic Survey) and DUZZA BRANDING
(Executive Identity, Digital Branding, and International Sports Media).

2. CORE COMPETENCIES - DUZZA PROJECTS
* Marine & Hydrospatial Survey: High-resolution bathymetric surveys, multibeam sonar mapping,
  seafloor hazard identification, RTK GNSS satellite positioning, tidal gauge telemetry.
* Civil & Heavy Structural Engineering: Earthmoving, shore protection, foundation piling,
  turnkey commercial structures.
* Oil & Gas Support Services: Flow station piping maintenance, structural manifold fabrication,
  non-destructive testing (NDT), logistics procurement.
* Equipment Sales & Leasehold: Reson SeaBat Multibeam Echo Sounders, Trimble R12i RTK GNSS,
  EdgeTech Sub-Bottom Profilers, Klein Side-Scan Sonar arrays.

3. GOVERNANCE, SAFETY & COMPLIANCE
* Legal: Incorporated under Companies and Allied Matters Act 2020 (CAMA 2020).
* Privacy & Data Protection: 100% compliant with Nigeria Data Protection Act 2023 (NDPA).
* Health, Safety & Environment (HSE): Zero-compromise compliance with international maritime
  and oilfield safety benchmarks.

4. LOGISTICS BASES & CONTACT
* Operational Base: KM 4 DSC Expressway, Warri, Delta State, Nigeria.
* Direct Procurement Desk: projects-procurement@duzza.com.ng
* Executive Secretariat: info@duzza.com.ng

Generated from DUZZA LIMITED Enterprise Portal: ${new Date().toISOString()}
================================================================================`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `DUZZA_LIMITED_Capability_Statement_${rcNumber}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setTimeout(() => {
      setDownloading(false);
    }, 1200);
  };

  return (
    <div className="rounded-2xl bg-[#091224] border border-[#1B325C] p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 hover:border-[#D4AF37]/50 transition-colors duration-300">
      <div className="space-y-3 max-w-xl">
        <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#D4AF37] font-semibold">
          <FileText className="w-4 h-4 text-[#D4AF37]" />
          <span>PROCUREMENT ASSET DOSSIER</span>
        </div>
        <h3 className="text-2xl font-display font-extrabold text-white">
          Download Official Capability Statement
        </h3>
        <p className="text-xs sm:text-sm text-[#CBD5E1]/90 leading-relaxed font-light">
          Comprehensive dossier covering our CAC incorporation credentials, marine surveying assets, 
          equipment calibration sheets, HSE protocols, and key project track record in the Niger Delta.
        </p>
        <div className="flex items-center space-x-4 text-xs font-mono text-[#94A3B8] pt-1">
          <span className="flex items-center space-x-1 text-[#CBD5E1] font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>CAC CAMA 2020 Verified</span>
          </span>
          <span>•</span>
          <span>Format: Digital Dossier</span>
        </div>
      </div>

      <button
        onClick={handleDownload}
        disabled={downloading}
        className="btn-brand-primary shrink-0 inline-flex items-center space-x-3 px-6 py-4 rounded-xl text-[#050B18] font-bold text-xs uppercase tracking-wider transition-all shadow-md disabled:opacity-50 cursor-pointer"
      >
        <Download className={`w-4 h-4 ${downloading ? "animate-bounce" : ""}`} />
        <span>{downloading ? "Preparing Dossier..." : "Download Capability Dossier"}</span>
      </button>
    </div>
  );
}
