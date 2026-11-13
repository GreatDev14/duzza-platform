"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { 
  Compass, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  PhoneCall, 
  ChevronRight,
  TrendingUp,
  FileText,
  Award,
  Layers,
  HardHat,
  Sun,
  ShieldCheck,
  Check,
  Cpu,
  BarChart3,
  Waves,
  Zap,
  Activity,
  Globe2,
  Instagram,
  ExternalLink
} from "lucide-react";
import CorporateHero from "@/components/home/CorporateHero";
import EnterpriseOperationsGlobe3D from "@/components/home/EnterpriseOperationsGlobe3D";
import Cadastral3DScanner from "@/components/animation/Cadastral3DScanner";
import Civil3DFoundations from "@/components/animation/Civil3DFoundations";
import Tilt3DCard from "@/components/animation/Tilt3DCard";
import EquipmentEnquiryModal from "@/components/projects/EquipmentEnquiryModal";
import OperatingDivisionsShowcase from "@/components/home/OperatingDivisionsShowcase";
import SpecialClientRequestModal from "@/components/common/SpecialClientRequestModal";
import { gsap, useGSAP } from "@/lib/animations/gsap";

export default function CorporateHomePage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [specialRequestOpen, setSpecialRequestOpen] = useState(false);
  const [selectedGear, setSelectedGear] = useState<{ code: string; name: string }>({
    code: "EQ-SURV-TS16",
    name: "Robotic Total Station & 3D Laser Scanning Array",
  });

  const rcNumber = process.env.NEXT_PUBLIC_CAC_RC_NUMBER || "RC-7149208";
  const operationalBase = process.env.NEXT_PUBLIC_OPERATIONAL_BASE || "Warri, Delta State, Nigeria";
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2348030000000";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hello%20Duzza%20Limited,%20I%20would%20like%20to%20inquire%20about%20your%20services.`;

  const handleOpenGearModal = (code: string, name: string) => {
    setSelectedGear({ code, name });
    setModalOpen(true);
  };

  // GSAP 3D Perspective Entrance Animations
  useGSAP(
    () => {
      if (!containerRef.current) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".gsap-hub-badge",
        { opacity: 0, y: -20, rotateX: 15 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.7 }
      )
        .fromTo(
          ".gsap-hub-title",
          { opacity: 0, y: 35, rotateX: -10 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.9 },
          "-=0.4"
        )
        .fromTo(
          ".gsap-hub-desc",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          ".gsap-hub-action",
          { opacity: 0, y: 15, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1 },
          "-=0.3"
        );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="flex flex-col w-full bg-[#050B18] text-[#F1F5F9] selection:bg-[#D4AF37] selection:text-[#050B18]">
      {/* -------------------------------------------------------------------- */}
      {/* 1. ULTRA-PROFESSIONAL ENTERPRISE HERO & 3D HOLDING PLATFORM          */}
      {/* -------------------------------------------------------------------- */}
      <CorporateHero onOpenSpecialRequest={() => setSpecialRequestOpen(true)} />

      {/* -------------------------------------------------------------------- */}
      {/* 2. ALL OF DUZZA'S OPERATING BUSINESSES WITH REAL PHOTOS & DIRECT ENTRANCE */}
      {/* -------------------------------------------------------------------- */}
      <OperatingDivisionsShowcase onOpenSpecialRequest={() => setSpecialRequestOpen(true)} />

      {/* -------------------------------------------------------------------- */}
      {/* 3. 3D ISOMETRIC CORPORATE HOLDING HUB (REAL 3D THREE.JS WEBGL)       */}
      {/* -------------------------------------------------------------------- */}
      <section
        id="main-corporate-hub"
        className="relative py-20 lg:py-28 bg-[#050B18] border-b border-[#1B325C] overflow-hidden"
      >
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#38BDF8]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Corporate Positioning */}
            <div className="lg:col-span-6 space-y-6">
              <div className="gsap-hub-badge inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#091224] border border-[#D4AF37]/35 text-xs font-mono text-[#D4AF37] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                <span className="font-bold">INNOVATIVE CORPORATE SOLUTIONS</span>
                <span className="text-[#1B325C]">•</span>
                <span className="text-[#CBD5E1]">CAMA 2020 REGISTERED</span>
              </div>

              <h2 className="gsap-hub-title font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08]">
                Innovative Multi-Sector{" "}
                <span className="text-gradient-gold font-light">
                  Engineering & Corporate Solutions.
                </span>
              </h2>

              <p className="gsap-hub-desc text-base sm:text-lg text-[#CBD5E1]/90 leading-relaxed font-light max-w-xl">
                DUZZA LIMITED operates as a premier Nigerian diversified holding enterprise. We unite mission-critical 
                civil contracting, subsea hydrographic surveying, and oilfield logistics with an international creative branding engine.
              </p>

              {/* High-Converting Action CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/projects"
                  className="btn-brand-primary gsap-hub-action px-7 py-4 rounded-xl text-[#050B18] font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center space-x-2 group cursor-pointer"
                >
                  <span className="text-[#050B18] font-bold">Request an Engineering Quote</span>
                  <ArrowRight className="w-4 h-4 text-[#050B18] group-hover:translate-x-1.5 transition-transform" />
                </Link>

                <Link
                  href="/branding"
                  className="gsap-hub-action px-6 py-4 rounded-xl bg-[#091224] text-white font-bold text-xs uppercase tracking-wider border border-[#1B325C] hover:bg-[#0E1B33] hover:border-[#D4AF37] transition-all shadow-sm flex items-center space-x-2 group"
                >
                  <Sparkles className="w-4 h-4 text-[#D4AF37] group-hover:rotate-12 transition-transform" />
                  <span>Start a Branding Project</span>
                </Link>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gsap-hub-action px-4 py-4 rounded-xl bg-[#0E1B33] text-[#F1F5F9] font-semibold text-xs uppercase tracking-wider hover:bg-[#142547] border border-[#1B325C] transition-colors inline-flex items-center space-x-2"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Warri HQ</span>
                </a>
              </div>

              {/* Enterprise Partner Strip */}
              <div className="pt-8 border-t border-[#1B325C] space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest text-[#94A3B8] font-semibold block">
                  Enterprise Operators & Compliance Standards
                </span>
                <div className="flex flex-wrap items-center gap-6 text-xs font-bold text-[#CBD5E1]">
                  <span className="flex items-center space-x-1 text-[#38BDF8] transition-colors">
                    <span className="w-2 h-2 bg-[#D4AF37] rounded-sm" />
                    <span>NUPRC / NIPEX</span>
                  </span>
                  <span className="hover:text-white transition-colors">OSPRI MARINE</span>
                  <span className="hover:text-white transition-colors">MICROSOFT PARTNER</span>
                  <span className="hover:text-white transition-colors">AMAZON AWS</span>
                  <span className="hover:text-[#D4AF37] transition-colors">CAC CAMA 2020</span>
                </div>
              </div>
            </div>

            {/* Right Column: Centered 3D Global Operations Network Globe */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-3xl border border-[#1B325C] bg-[#091224]/80 p-2 shadow-2xl">
                <EnterpriseOperationsGlobe3D />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 4. 3D CADASTRAL GEOMATICS & LASER SCANNING ARRAY                      */}
      {/* -------------------------------------------------------------------- */}
      <section id="survey-engineering-section" className="py-24 bg-[#070E1E] border-b border-[#1B325C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1B325C] pb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold block">
                Duzza Projects • Marine & Land Geomatics
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white mt-1">
                Hydrospatial & Cadastral Surveying Solutions
              </h2>
            </div>
            <p className="text-sm text-[#CBD5E1]/90 max-w-md font-light">
              Equipped with high-precision robotic total stations, multibeam swath sounders, and subsea profilers stationed at Warri Marine Base.
            </p>
          </div>

          {/* Interactive 3D Surveying Station & Live Telemetry Module */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#091224] rounded-3xl border border-[#1B325C] overflow-hidden shadow-xl p-6 sm:p-10">
            {/* Left: 3D Robotic Total Station & Laser Scanner */}
            <div className="lg:col-span-7">
              <Cadastral3DScanner />
            </div>

            {/* Right: Operational Statistics & Direct Request */}
            <div className="lg:col-span-5 space-y-8 lg:pl-4">
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] font-bold">
                  Field Precision Engineering
                </span>
                <h3 className="font-display font-black text-3xl sm:text-4xl text-white">
                  Cadastral, Bathymetric & Topographic Surveys
                </h3>
                <p className="text-sm text-[#CBD5E1]/90 leading-relaxed font-light">
                  Delivering millimeter boundary accuracy, fairway depth clearance, 
                  and subsea pipeline burial depth verification across Delta State and coastal Nigeria.
                </p>
              </div>

              {/* Exact Stats Block with 3D Tilt Cards */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2">
                <Tilt3DCard maxTilt={8} scale={1.03}>
                  <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#0E1B33] border border-[#1B325C] text-center h-full flex flex-col justify-center">
                    <span className="block text-xl sm:text-3xl lg:text-4xl font-display font-extrabold text-white">
                      100%
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-mono uppercase text-[#94A3B8] font-semibold block mt-1 truncate">
                      HSE Compliance
                    </span>
                  </div>
                </Tilt3DCard>

                <Tilt3DCard maxTilt={8} scale={1.03}>
                  <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#0E1B33] border border-[#1B325C] text-center h-full flex flex-col justify-center">
                    <span className="block text-xl sm:text-3xl lg:text-4xl font-display font-extrabold text-[#D4AF37]">
                      Warri Base
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-mono uppercase text-[#94A3B8] font-semibold block mt-1 truncate">
                      Rapid Mobilization
                    </span>
                  </div>
                </Tilt3DCard>

                <Tilt3DCard maxTilt={8} scale={1.03}>
                  <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#0E1B33] border border-[#1B325C] text-center h-full flex flex-col justify-center">
                    <span className="block text-xl sm:text-3xl lg:text-4xl font-display font-extrabold text-white">
                      B2B RFQ
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-mono uppercase text-[#94A3B8] font-semibold block mt-1 truncate">
                      Direct Evaluation
                    </span>
                  </div>
                </Tilt3DCard>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <button
                  onClick={() => handleOpenGearModal("EQ-SURV-TS16", "Robotic Total Station & 3D Scanning Array")}
                  className="btn-brand-primary w-full sm:w-auto px-6 py-3.5 rounded-xl text-[#050B18] font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Request Survey Quote</span>
                  <ArrowRight className="w-4 h-4 text-[#050B18]" />
                </button>

                <Link
                  href="/projects/equipment"
                  className="w-full sm:w-auto text-center px-5 py-3.5 rounded-xl bg-[#0E1B33] hover:bg-[#142547] text-[#F1F5F9] font-semibold text-xs uppercase tracking-wider border border-[#1B325C] hover:border-[#D4AF37] transition-colors"
                >
                  Hire Survey Equipment Fleet →
                </Link>
              </div>
            </div>
          </div>

          {/* 3D Tilt Equipment Grid: Multibeam, GNSS RTK, Chirp SBP, Side-Scan Sonar */}
          <div className="space-y-6">
            <h4 className="text-xl font-display font-bold text-white">
              Specialized Marine Geomatics Fleet (Warri Mobilization)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1 */}
              <Tilt3DCard maxTilt={10} scale={1.02}>
                <div className="p-6 rounded-2xl bg-[#091224] border border-[#1B325C] hover:border-[#D4AF37]/50 hover:shadow-xl transition-all space-y-4 flex flex-col justify-between h-full">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-[#D4AF37] font-bold block">EQ-MBES-7125</span>
                    <h5 className="font-display font-bold text-base text-white">Reson SeaBat T50-P Multibeam</h5>
                    <p className="text-xs text-[#CBD5E1]/80 leading-relaxed font-light">
                      190–420 kHz agile multibeam sonar with 1024 beams. 575m max depth soundings for port fairways.
                    </p>
                  </div>
                  <button
                    onClick={() => handleOpenGearModal("EQ-MBES-7125", "Reson SeaBat T50-P Multibeam Echo Sounder")}
                    className="w-full py-2.5 rounded-lg bg-[#0E1B33] hover:bg-[#D4AF37] hover:text-[#050B18] text-[#F1F5F9] text-xs font-semibold uppercase tracking-wider border border-[#1B325C] transition-colors cursor-pointer"
                  >
                    Enquire for Lease →
                  </button>
                </div>
              </Tilt3DCard>

              {/* Card 2 */}
              <Tilt3DCard maxTilt={10} scale={1.02}>
                <div className="p-6 rounded-2xl bg-[#091224] border border-[#1B325C] hover:border-[#D4AF37]/50 hover:shadow-xl transition-all space-y-4 flex flex-col justify-between h-full">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-[#D4AF37] font-bold block">EQ-GNSS-R12I</span>
                    <h5 className="font-display font-bold text-base text-white">Trimble R12i GNSS RTK System</h5>
                    <p className="text-xs text-[#CBD5E1]/80 leading-relaxed font-light">
                      672 channels multi-constellation receiver with inertial tilt compensation up to 30°.
                    </p>
                  </div>
                  <button
                    onClick={() => handleOpenGearModal("EQ-GNSS-R12I", "Trimble R12i GNSS RTK System")}
                    className="w-full py-2.5 rounded-lg bg-[#0E1B33] hover:bg-[#D4AF37] hover:text-[#050B18] text-[#F1F5F9] text-xs font-semibold uppercase tracking-wider border border-[#1B325C] transition-colors cursor-pointer"
                  >
                    Enquire for Lease →
                  </button>
                </div>
              </Tilt3DCard>

              {/* Card 3 */}
              <Tilt3DCard maxTilt={10} scale={1.02}>
                <div className="p-6 rounded-2xl bg-[#091224] border border-[#1B325C] hover:border-[#D4AF37]/50 hover:shadow-xl transition-all space-y-4 flex flex-col justify-between h-full">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-[#D4AF37] font-bold block">EQ-SBP-3000</span>
                    <h5 className="font-display font-bold text-base text-white">EdgeTech 3100 Sub-Bottom Profiler</h5>
                    <p className="text-xs text-[#CBD5E1]/80 leading-relaxed font-light">
                      Full Spectrum CHIRP sub-seabed geological stratigraphy and pipeline burial depth inspection.
                    </p>
                  </div>
                  <button
                    onClick={() => handleOpenGearModal("EQ-SBP-3000", "EdgeTech 3100 Sub-Bottom Profiler")}
                    className="w-full py-2.5 rounded-lg bg-[#0E1B33] hover:bg-[#D4AF37] hover:text-[#050B18] text-[#F1F5F9] text-xs font-semibold uppercase tracking-wider border border-[#1B325C] transition-colors cursor-pointer"
                  >
                    Enquire for Lease →
                  </button>
                </div>
              </Tilt3DCard>

              {/* Card 4 */}
              <Tilt3DCard maxTilt={10} scale={1.02}>
                <div className="p-6 rounded-2xl bg-[#091224] border border-[#1B325C] hover:border-[#D4AF37]/50 hover:shadow-xl transition-all space-y-4 flex flex-col justify-between h-full">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-[#D4AF37] font-bold block">EQ-SSS-4200</span>
                    <h5 className="font-display font-bold text-base text-white">Klein 3900 Side-Scan Sonar</h5>
                    <p className="text-xs text-[#CBD5E1]/80 leading-relaxed font-light">
                      Dual 445/900 kHz simultaneous high-definition acoustic seafloor seabed classification.
                    </p>
                  </div>
                  <button
                    onClick={() => handleOpenGearModal("EQ-SSS-4200", "Klein 3900 Side-Scan Sonar")}
                    className="w-full py-2.5 rounded-lg bg-[#0E1B33] hover:bg-[#D4AF37] hover:text-[#050B18] text-[#F1F5F9] text-xs font-semibold uppercase tracking-wider border border-[#1B325C] transition-colors cursor-pointer"
                  >
                    Enquire for Lease →
                  </button>
                </div>
              </Tilt3DCard>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 5. 3D HEAVY CIVIL, STRUCTURAL FOUNDATIONS & OIL/GAS ENGINEERING      */}
      {/* -------------------------------------------------------------------- */}
      <section className="py-24 bg-[#070E1E] border-b border-[#1B325C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header Banner: Building Strong Foundations */}
          <div className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-[#091224] border border-[#1B325C] text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold block">
                Duzza Projects • Engineering & Oilfield Support
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight leading-tight uppercase text-white">
                General Contracting & Oil & Gas Infrastructure
              </h2>
              <p className="text-sm sm:text-base text-[#CBD5E1]/90 font-light leading-relaxed">
                Delivering civil engineering construction, shoreline revetments, heavy industrial concrete piling, 
                and oil & gas flowstation modifications across the Niger Delta oilfields.
              </p>
            </div>

            {/* Industrial Stat Strip */}
            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-[#1B325C]">
              <div className="p-3 sm:p-3.5 rounded-xl bg-[#0E1B33] border border-[#1B325C] text-center">
                <span className="block text-2xl sm:text-3xl font-display font-extrabold text-white">CAMA 2020</span>
                <span className="text-[10px] sm:text-xs font-mono uppercase text-[#94A3B8] block mt-1">CAC RC-{rcNumber}</span>
              </div>
              <div className="p-3 sm:p-3.5 rounded-xl bg-[#0E1B33] border border-[#1B325C] text-center">
                <span className="block text-2xl sm:text-3xl font-display font-extrabold text-[#D4AF37]">Warri Base</span>
                <span className="text-[10px] sm:text-xs font-mono uppercase text-[#94A3B8] block mt-1">Delta State HQ</span>
              </div>
              <div className="p-3 sm:p-3.5 rounded-xl bg-[#0E1B33] border border-[#1B325C] text-center">
                <span className="block text-2xl sm:text-3xl font-display font-extrabold text-white">100% HSE</span>
                <span className="text-[10px] sm:text-xs font-mono uppercase text-[#94A3B8] block mt-1">Audited Compliance</span>
              </div>
              <div className="p-3 sm:p-3.5 rounded-xl bg-[#0E1B33] border border-[#1B325C] text-center">
                <span className="block text-2xl sm:text-3xl font-display font-extrabold text-[#38BDF8]">B2B Direct</span>
                <span className="text-[10px] sm:text-xs font-mono uppercase text-[#94A3B8] block mt-1">Rapid RFQ Dispatch</span>
              </div>
            </div>
          </div>

          {/* 3D Foundation Model & Scope */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6">
              <div className="rounded-2xl sm:rounded-3xl border border-[#1B325C] bg-[#091224] p-3 sm:p-4 shadow-xl">
                <Civil3DFoundations />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                Turnkey Civil Fabrication & Field Pipeline Support
              </h3>
              <p className="text-sm text-[#CBD5E1]/90 leading-relaxed font-light">
                Our heavy civil & mechanical contracting division handles complex soil stabilization across riverine delta terrain, 
                retaining bulkheads for port terminals, flowstation piping modifications, and structural pipeline tie-in supports.
              </p>

              <div className="space-y-3 font-mono text-xs text-[#CBD5E1]">
                <div className="p-3.5 rounded-xl bg-[#091224] border border-[#1B325C] flex items-center justify-between shadow-sm">
                  <span>✓ Shore Protection & Deep Piling Matrix</span>
                  <span className="text-[#D4AF37] font-bold">ACTIVE</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#091224] border border-[#1B325C] flex items-center justify-between shadow-sm">
                  <span>✓ Flowstation Modification & Pressure Testing</span>
                  <span className="text-[#D4AF37] font-bold">ACTIVE</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#091224] border border-[#1B325C] flex items-center justify-between shadow-sm">
                  <span>✓ Structural Pipeline Tie-In Supports</span>
                  <span className="text-[#D4AF37] font-bold">ACTIVE</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/projects"
                  className="btn-brand-primary inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl text-[#050B18] font-bold text-xs uppercase tracking-wider shadow-md"
                >
                  <span>Request Engineering Project Quote</span>
                  <ArrowRight className="w-4 h-4 text-[#050B18]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 7. DUZZA BRANDING — 3D TILT CREATIVE PILLARS                          */}
      {/* -------------------------------------------------------------------- */}
      <section className="py-24 bg-[#050B18] border-b border-[#1B325C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1B325C] pb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold block">
                Creative Production Division
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white mt-1">
                Duzza Branding & Sports Media
              </h2>
            </div>
            <Link
              href="/branding"
              className="btn-brand-primary px-5 py-2.5 rounded-xl text-[#050B18] font-bold text-xs uppercase tracking-wider transition-colors shadow-sm shrink-0"
            >
              Explore Creative Agency →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Tilt3DCard maxTilt={12} scale={1.03}>
              <div className="p-6 rounded-2xl bg-[#091224] border border-[#1B325C] space-y-3 hover:border-[#D4AF37] hover:shadow-xl transition-all h-full flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-[#D4AF37] block">PILLAR 01</span>
                  <h4 className="font-display font-bold text-lg text-white mt-1">Executive Identity</h4>
                  <p className="text-xs text-[#CBD5E1]/80 font-light leading-relaxed mt-2">
                    Personal branding architecture for founders and executives. Speaker kits, bio packaging, and editorial imagery.
                  </p>
                </div>
                <div className="pt-3 text-[11px] font-mono text-[#E5C378] font-semibold border-t border-[#1B325C]">
                  2–3 Weeks Sprint →
                </div>
              </div>
            </Tilt3DCard>

            <Tilt3DCard maxTilt={12} scale={1.03}>
              <div className="p-6 rounded-2xl bg-[#091224] border border-[#1B325C] space-y-3 hover:border-[#D4AF37] hover:shadow-xl transition-all h-full flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-[#D4AF37] block">PILLAR 02</span>
                  <h4 className="font-display font-bold text-lg text-white mt-1">Corporate Design</h4>
                  <p className="text-xs text-[#CBD5E1]/80 font-light leading-relaxed mt-2">
                    Comprehensive brand guidelines, vector asset suites, and scalable design token systems.
                  </p>
                </div>
                <div className="pt-3 text-[11px] font-mono text-[#E5C378] font-semibold border-t border-[#1B325C]">
                  3–4 Weeks Sprint →
                </div>
              </div>
            </Tilt3DCard>

            <Tilt3DCard maxTilt={12} scale={1.03}>
              <div className="p-6 rounded-2xl bg-[#091224] border border-[#1B325C] space-y-3 hover:border-[#D4AF37] hover:shadow-xl transition-all h-full flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-[#D4AF37] block">PILLAR 03</span>
                  <h4 className="font-display font-bold text-lg text-white mt-1">Sports Media UGC</h4>
                  <p className="text-xs text-[#CBD5E1]/80 font-light leading-relaxed mt-2">
                    High-volume social reels and matchday promotional creative pipelines for international sports teams.
                  </p>
                </div>
                <div className="pt-3 text-[11px] font-mono text-[#E5C378] font-semibold border-t border-[#1B325C]">
                  48-Hour Turnaround →
                </div>
              </div>
            </Tilt3DCard>

            <Tilt3DCard maxTilt={12} scale={1.03}>
              <div className="p-6 rounded-2xl bg-[#091224] border border-[#1B325C] space-y-3 hover:border-[#D4AF37] hover:shadow-xl transition-all h-full flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-[#D4AF37] block">PILLAR 04</span>
                  <h4 className="font-display font-bold text-lg text-white mt-1">Global Merchandising</h4>
                  <p className="text-xs text-[#CBD5E1]/80 font-light leading-relaxed mt-2">
                    Custom apparel, team kits, luxury packaging, and promotional merchandise engineering.
                  </p>
                </div>
                <div className="pt-3 text-[11px] font-mono text-[#E5C378] font-semibold border-t border-[#1B325C]">
                  Sample & Production →
                </div>
              </div>
            </Tilt3DCard>
          </div>

          {/* Social-First Instagram Showcase Banner */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#091224] border border-[#D4AF37]/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center space-x-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-md">
                <Instagram className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-sm font-bold text-white block">Follow Our Creative Production on Instagram</span>
                <span className="text-xs font-mono text-[#D4AF37]">@duzza_branding • Sports content, UGC reels & executive portfolio</span>
              </div>
            </div>
            <a
              href="https://www.instagram.com/duzza_branding"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto justify-center px-5 py-2.5 rounded-xl bg-[#0E1B33] hover:bg-[#142547] text-[#D4AF37] border border-[#D4AF37]/50 font-bold text-xs font-mono uppercase tracking-wider transition-all shrink-0 inline-flex items-center space-x-2"
            >
              <span>Visit @duzza_branding</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 8. INCUBATING DIVISIONS: FASHION & BAKERY TEASERS                    */}
      {/* -------------------------------------------------------------------- */}
      <section className="py-20 bg-[#070E1E] border-b border-[#1B325C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-[#94A3B8] font-semibold">
              Emerging Consumer Verticals
            </span>
            <h2 className="text-3xl font-display font-bold text-white">
              Incubating Divisions (Coming Soon)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Duzza Fashion */}
            <Tilt3DCard maxTilt={8} scale={1.02}>
              <div className="p-8 rounded-3xl bg-[#091224] border border-[#1B325C] shadow-lg flex flex-col justify-between space-y-6 h-full">
                <div className="space-y-3">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#0E1B33] text-[#E5C378] font-bold border border-[#1B325C]">
                    Coming Soon
                  </span>
                  <h3 className="text-2xl font-display font-bold text-white">Duzza Fashion</h3>
                  <p className="text-xs text-[#CBD5E1]/80 leading-relaxed font-light">
                    Contemporary English tailoring and artisanal bespoke Ankara couture. Handcrafted leather footwear and luxury accessories.
                  </p>
                </div>
                <Link
                  href="/fashion"
                  className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37] hover:underline"
                >
                  <span>Join VIP Fashion Waitlist</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Tilt3DCard>

            {/* Duzza Bakery */}
            <Tilt3DCard maxTilt={8} scale={1.02}>
              <div className="p-8 rounded-3xl bg-[#091224] border border-[#1B325C] shadow-lg flex flex-col justify-between space-y-6 h-full">
                <div className="space-y-3">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#0E1B33] text-[#E5C378] font-bold border border-[#1B325C]">
                    Coming Soon
                  </span>
                  <h3 className="text-2xl font-display font-bold text-white">Duzza Bakery & Eatery</h3>
                  <p className="text-xs text-[#CBD5E1]/80 leading-relaxed font-light">
                    Slow-fermented artisan sourdough loaves, French patisserie, bespoke custom celebration cakes, and casual bistro dining.
                  </p>
                </div>
                <Link
                  href="/bakery"
                  className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37] hover:underline"
                >
                  <span>Join Tasting Guestlist</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Tilt3DCard>
          </div>
        </div>
      </section>

      {/* Equipment Enquiry Modal */}
      <EquipmentEnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        equipmentCode={selectedGear.code}
        equipmentName={selectedGear.name}
      />

      {/* Special Client Request Modal */}
      <SpecialClientRequestModal
        isOpen={specialRequestOpen}
        onClose={() => setSpecialRequestOpen(false)}
      />
    </div>
  );
}
