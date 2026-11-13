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
  Globe2
} from "lucide-react";
import CorporateHero from "@/components/home/CorporateHero";
import EnterpriseOperationsGlobe3D from "@/components/home/EnterpriseOperationsGlobe3D";
import Cadastral3DScanner from "@/components/animation/Cadastral3DScanner";
import Energy3DGrid from "@/components/animation/Energy3DGrid";
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
    <div ref={containerRef} className="flex flex-col w-full bg-white text-slate-900 selection:bg-brandBlue-600 selection:text-white">
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
        className="relative py-20 lg:py-28 bg-gradient-to-b from-white via-brandBlue-50/20 to-white border-b border-slate-200 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Corporate Positioning */}
            <div className="lg:col-span-6 space-y-6">
              <div className="gsap-hub-badge inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brandBlue-50 border border-brandBlue-200 text-xs font-mono text-brandBlue-700 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-brandBlue-600 animate-pulse" />
                <span className="font-bold">INNOVATIVE CORPORATE SOLUTIONS</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-600">CAMA 2020 REGISTERED</span>
              </div>

              <h2 className="gsap-hub-title font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-navy-950 tracking-tight leading-[1.08]">
                Innovative Multi-Sector{" "}
                <span className="text-gradient-blue font-light">
                  Engineering & Corporate Solutions.
                </span>
              </h2>

              <p className="gsap-hub-desc text-base sm:text-lg text-slate-600 leading-relaxed font-light max-w-xl">
                DUZZA LIMITED operates as a premier Nigerian diversified holding enterprise. We unite mission-critical 
                civil contracting, subsea hydrographic surveying, and oilfield logistics with an international creative branding engine.
              </p>

              {/* High-Converting Action CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/projects"
                  className="btn-brand-primary gsap-hub-action px-7 py-4 rounded-xl text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center space-x-2 group cursor-pointer"
                >
                  <span className="text-white font-bold">Request an Engineering Quote</span>
                  <ArrowRight className="w-4 h-4 text-[#F3C966] group-hover:translate-x-1.5 transition-transform" />
                </Link>

                <Link
                  href="/branding"
                  className="gsap-hub-action px-6 py-4 rounded-xl bg-white text-navy-950 font-bold text-xs uppercase tracking-wider border border-slate-300 hover:bg-slate-50 hover:border-brandBlue-400 transition-all shadow-sm flex items-center space-x-2 group"
                >
                  <Sparkles className="w-4 h-4 text-brandBlue-600 group-hover:rotate-12 transition-transform" />
                  <span>Start a Branding Project</span>
                </Link>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gsap-hub-action px-4 py-4 rounded-xl bg-slate-100 text-slate-800 font-semibold text-xs uppercase tracking-wider hover:bg-slate-200 border border-slate-200 transition-colors inline-flex items-center space-x-2"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp Warri HQ</span>
                </a>
              </div>

              {/* Enterprise Partner Strip */}
              <div className="pt-8 border-t border-slate-200/80 space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold block">
                  Enterprise Operators & Compliance Standards
                </span>
                <div className="flex flex-wrap items-center gap-6 opacity-75 grayscale hover:grayscale-0 transition-all text-xs font-bold text-slate-600">
                  <span className="flex items-center space-x-1 hover:text-navy-950 transition-colors">
                    <span className="w-2 h-2 bg-brandBlue-600 rounded-sm" />
                    <span>NUPRC / NIPEX</span>
                  </span>
                  <span className="hover:text-navy-950 transition-colors">OSPRI MARINE</span>
                  <span className="hover:text-navy-950 transition-colors">MICROSOFT PARTNER</span>
                  <span className="hover:text-navy-950 transition-colors">AMAZON AWS</span>
                  <span className="hover:text-navy-950 transition-colors">CAC CAMA 2020</span>
                </div>
              </div>
            </div>

            {/* Right Column: Centered 3D Global Operations Network Globe */}
            <div className="lg:col-span-6 relative">
              <EnterpriseOperationsGlobe3D />
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 3. 3D CADASTRAL GEOMATICS & LASER SCANNING ARRAY                      */}
      {/* -------------------------------------------------------------------- */}
      <section id="survey-engineering-section" className="py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-brandBlue-600 font-bold block">
                Duzza Projects • Marine & Land Geomatics
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-950 mt-1">
                Hydrospatial & Cadastral Surveying Solutions
              </h2>
            </div>
            <p className="text-sm text-slate-600 max-w-md font-light">
              Equipped with high-precision robotic total stations, multibeam swath sounders, and subsea profilers stationed at Warri Marine Base.
            </p>
          </div>

          {/* Interactive 3D Surveying Station & Live Telemetry Module */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl p-6 sm:p-10">
            {/* Left: 3D Robotic Total Station & Laser Scanner */}
            <div className="lg:col-span-7">
              <Cadastral3DScanner />
            </div>

            {/* Right: Operational Statistics & Direct Request */}
            <div className="lg:col-span-5 space-y-8 lg:pl-4">
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-600 font-bold">
                  Field Precision Engineering
                </span>
                <h3 className="font-display font-black text-3xl sm:text-4xl text-navy-950">
                  Cadastral, Bathymetric & Topographic Surveys
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-light">
                  Delivering millimeter boundary accuracy, fairway depth clearance, 
                  and subsea pipeline burial depth verification across Delta State and coastal Nigeria.
                </p>
              </div>

              {/* Exact Stats Block with 3D Tilt Cards */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <Tilt3DCard maxTilt={8} scale={1.03}>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center h-full flex flex-col justify-center">
                    <span className="block text-3xl sm:text-4xl font-display font-extrabold text-navy-950">
                      7+
                    </span>
                    <span className="text-[10px] font-mono uppercase text-slate-500 font-semibold block mt-1">
                      Years Active
                    </span>
                  </div>
                </Tilt3DCard>

                <Tilt3DCard maxTilt={8} scale={1.03}>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center h-full flex flex-col justify-center">
                    <span className="block text-3xl sm:text-4xl font-display font-extrabold text-brandBlue-600">
                      892+
                    </span>
                    <span className="text-[10px] font-mono uppercase text-slate-500 font-semibold block mt-1">
                      Surveys Done
                    </span>
                  </div>
                </Tilt3DCard>

                <Tilt3DCard maxTilt={8} scale={1.03}>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center h-full flex flex-col justify-center">
                    <span className="block text-3xl sm:text-4xl font-display font-extrabold text-navy-950">
                      650+
                    </span>
                    <span className="text-[10px] font-mono uppercase text-slate-500 font-semibold block mt-1">
                      Clients Served
                    </span>
                  </div>
                </Tilt3DCard>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => handleOpenGearModal("EQ-SURV-TS16", "Robotic Total Station & 3D Scanning Array")}
                  className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center space-x-2"
                >
                  <span>Order Survey Services</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  href="/projects/equipment"
                  className="px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs uppercase tracking-wider border border-slate-300 transition-colors"
                >
                  View Equipment Fleet
                </Link>
              </div>
            </div>
          </div>

          {/* 3D Tilt Equipment Grid: Multibeam, GNSS RTK, Chirp SBP, Side-Scan Sonar */}
          <div className="space-y-6">
            <h4 className="text-xl font-display font-bold text-navy-950">
              Specialized Marine Geomatics Fleet (Warri Mobilization)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1 */}
              <Tilt3DCard maxTilt={10} scale={1.02}>
                <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-brandBlue-400 hover:shadow-xl transition-all space-y-4 flex flex-col justify-between h-full">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-brandBlue-600 font-bold block">EQ-MBES-7125</span>
                    <h5 className="font-display font-bold text-base text-navy-950">Reson SeaBat T50-P Multibeam</h5>
                    <p className="text-xs text-slate-600 leading-relaxed font-light">
                      190–420 kHz agile multibeam sonar with 1024 beams. 575m max depth soundings for port fairways.
                    </p>
                  </div>
                  <button
                    onClick={() => handleOpenGearModal("EQ-MBES-7125", "Reson SeaBat T50-P Multibeam Echo Sounder")}
                    className="w-full py-2.5 rounded-lg bg-slate-100 hover:bg-brandBlue-600 hover:text-white text-slate-700 text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    Enquire for Lease →
                  </button>
                </div>
              </Tilt3DCard>

              {/* Card 2 */}
              <Tilt3DCard maxTilt={10} scale={1.02}>
                <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-brandBlue-400 hover:shadow-xl transition-all space-y-4 flex flex-col justify-between h-full">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-brandBlue-600 font-bold block">EQ-GNSS-R12I</span>
                    <h5 className="font-display font-bold text-base text-navy-950">Trimble R12i GNSS RTK System</h5>
                    <p className="text-xs text-slate-600 leading-relaxed font-light">
                      672 channels multi-constellation receiver with inertial tilt compensation up to 30°.
                    </p>
                  </div>
                  <button
                    onClick={() => handleOpenGearModal("EQ-GNSS-R12I", "Trimble R12i GNSS RTK System")}
                    className="w-full py-2.5 rounded-lg bg-slate-100 hover:bg-brandBlue-600 hover:text-white text-slate-700 text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    Enquire for Lease →
                  </button>
                </div>
              </Tilt3DCard>

              {/* Card 3 */}
              <Tilt3DCard maxTilt={10} scale={1.02}>
                <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-brandBlue-400 hover:shadow-xl transition-all space-y-4 flex flex-col justify-between h-full">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-brandBlue-600 font-bold block">EQ-SBP-3000</span>
                    <h5 className="font-display font-bold text-base text-navy-950">EdgeTech 3100 Sub-Bottom Profiler</h5>
                    <p className="text-xs text-slate-600 leading-relaxed font-light">
                      Full Spectrum CHIRP sub-seabed geological stratigraphy and pipeline burial depth inspection.
                    </p>
                  </div>
                  <button
                    onClick={() => handleOpenGearModal("EQ-SBP-3000", "EdgeTech 3100 Sub-Bottom Profiler")}
                    className="w-full py-2.5 rounded-lg bg-slate-100 hover:bg-brandBlue-600 hover:text-white text-slate-700 text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    Enquire for Lease →
                  </button>
                </div>
              </Tilt3DCard>

              {/* Card 4 */}
              <Tilt3DCard maxTilt={10} scale={1.02}>
                <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-brandBlue-400 hover:shadow-xl transition-all space-y-4 flex flex-col justify-between h-full">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-brandBlue-600 font-bold block">EQ-SSS-4200</span>
                    <h5 className="font-display font-bold text-base text-navy-950">Klein 3900 Side-Scan Sonar</h5>
                    <p className="text-xs text-slate-600 leading-relaxed font-light">
                      Dual 445/900 kHz simultaneous high-definition acoustic seafloor seabed classification.
                    </p>
                  </div>
                  <button
                    onClick={() => handleOpenGearModal("EQ-SSS-4200", "Klein 3900 Side-Scan Sonar")}
                    className="w-full py-2.5 rounded-lg bg-slate-100 hover:bg-brandBlue-600 hover:text-white text-slate-700 text-xs font-semibold uppercase tracking-wider transition-colors"
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
      {/* 4. 3D ENERGY & SOLAR INFRASTRUCTURE GRID                             */}
      {/* -------------------------------------------------------------------- */}
      <section className="py-24 bg-white border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: 3D Interactive Energy & Solar Manifold Model */}
            <div className="lg:col-span-6">
              <Energy3DGrid />
            </div>

            {/* Right: Industrial Description & Scope */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-brandBlue-600 font-bold block">
                Oil & Gas Infrastructure Support
              </span>

              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-950 leading-tight">
                Turnkey Energy Assets & Sustainable Power Deployments
              </h2>

              <p className="text-base text-slate-600 leading-relaxed font-light">
                Providing comprehensive facility support across the Niger Delta oilfields. 
                From flowstation modifications, structural pipeline tie-in supports, and pressure testing, 
                to industrial solar arrays and hybrid power systems for remote installations.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <Tilt3DCard maxTilt={6} scale={1.02}>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1 h-full">
                    <span className="text-sm font-bold text-navy-950 flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-brandBlue-600" />
                      <span>Flowstation Maintenance</span>
                    </span>
                    <p className="text-xs text-slate-500 font-light">
                      Corrosion mitigation, piping fabrication, and certified pressure inspections.
                    </p>
                  </div>
                </Tilt3DCard>

                <Tilt3DCard maxTilt={6} scale={1.02}>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1 h-full">
                    <span className="text-sm font-bold text-navy-950 flex items-center space-x-2">
                      <Sun className="w-4 h-4 text-amber-500" />
                      <span>Industrial Solar Arrays</span>
                    </span>
                    <p className="text-xs text-slate-500 font-light">
                      Grid-tied and off-grid hybrid power for remote telecommunication and field stations.
                    </p>
                  </div>
                </Tilt3DCard>
              </div>

              <div className="pt-2">
                <Link
                  href="/projects"
                  className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-brandBlue-600 hover:text-brandBlue-800 transition-colors"
                >
                  <span>Explore Energy Division Capabilities</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 5. 3D HEAVY CIVIL & STRUCTURAL FOUNDATIONS MATRIX                     */}
      {/* -------------------------------------------------------------------- */}
      <section className="py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header Banner: Building Strong Foundations (Pristine Light Theme) */}
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/90 text-navy-950 shadow-md relative overflow-hidden">
            <div className="relative z-10 max-w-2xl space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-brandBlue-600 font-bold block">
                General Civil Contracting
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight leading-none uppercase text-navy-950">
                Building Strong Foundations
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
                Delivering industry-leading civil engineering, shoreline revetments, and heavy industrial concrete works with uncompromised safety and durability.
              </p>
            </div>

            {/* Industrial Stat Strip */}
            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 mt-8 border-t border-slate-200">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="block text-3xl sm:text-4xl font-display font-extrabold text-navy-950">450+</span>
                <span className="text-xs font-mono uppercase text-slate-500 block mt-1">Building Projects</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="block text-3xl sm:text-4xl font-display font-extrabold text-brandBlue-600">29+</span>
                <span className="text-xs font-mono uppercase text-slate-500 block mt-1">Years Heritage</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="block text-3xl sm:text-4xl font-display font-extrabold text-navy-950">7K+</span>
                <span className="text-xs font-mono uppercase text-slate-500 block mt-1">Skilled Team</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="block text-3xl sm:text-4xl font-display font-extrabold text-emerald-600">4.9/5</span>
                <span className="text-xs font-mono uppercase text-slate-500 block mt-1">Client Score</span>
              </div>
            </div>
          </div>

          {/* 3D Foundation Model & Scope */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6">
              <Civil3DFoundations />
            </div>

            <div className="lg:col-span-6 space-y-6">
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-navy-950">
                Turnkey Civil Fabrication & Ground Stabilization
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-light">
                Our heavy civil division handles complex soil stabilization across riverine delta terrain, 
                retaining bulkheads for port terminals, and heavy structural foundation slabs for industrial warehouses.
              </p>

              <div className="space-y-3 font-mono text-xs text-slate-700">
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between shadow-sm">
                  <span>✓ Shore Protection & Deep Piling</span>
                  <span className="text-orange-600 font-bold">ACTIVE</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between shadow-sm">
                  <span>✓ Industrial Concrete Slabs & Footings</span>
                  <span className="text-orange-600 font-bold">ACTIVE</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between shadow-sm">
                  <span>✓ Turnkey Commercial Facilities</span>
                  <span className="text-orange-600 font-bold">ACTIVE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 6. DUZZA BRANDING — 3D TILT CREATIVE PILLARS                          */}
      {/* -------------------------------------------------------------------- */}
      <section className="py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-bold block">
                Creative Production Division
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-950 mt-1">
                Duzza Branding & Sports Media
              </h2>
            </div>
            <Link
              href="/branding"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-emerald-700 transition-colors shadow-sm shrink-0"
            >
              Explore Creative Agency →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Tilt3DCard maxTilt={12} scale={1.03}>
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 hover:border-emerald-500 hover:shadow-xl transition-all h-full flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-emerald-600 block">PILLAR 01</span>
                  <h4 className="font-display font-bold text-lg text-navy-950 mt-1">Executive Identity</h4>
                  <p className="text-xs text-slate-600 font-light leading-relaxed mt-2">
                    Personal branding architecture for founders and executives. Speaker kits, bio packaging, and editorial imagery.
                  </p>
                </div>
                <div className="pt-3 text-[11px] font-mono text-emerald-700 font-semibold border-t border-slate-200">
                  2–3 Weeks Sprint →
                </div>
              </div>
            </Tilt3DCard>

            <Tilt3DCard maxTilt={12} scale={1.03}>
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 hover:border-emerald-500 hover:shadow-xl transition-all h-full flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-emerald-600 block">PILLAR 02</span>
                  <h4 className="font-display font-bold text-lg text-navy-950 mt-1">Corporate Design</h4>
                  <p className="text-xs text-slate-600 font-light leading-relaxed mt-2">
                    Comprehensive brand guidelines, vector asset suites, and scalable design token systems.
                  </p>
                </div>
                <div className="pt-3 text-[11px] font-mono text-emerald-700 font-semibold border-t border-slate-200">
                  3–4 Weeks Sprint →
                </div>
              </div>
            </Tilt3DCard>

            <Tilt3DCard maxTilt={12} scale={1.03}>
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 hover:border-emerald-500 hover:shadow-xl transition-all h-full flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-emerald-600 block">PILLAR 03</span>
                  <h4 className="font-display font-bold text-lg text-navy-950 mt-1">Sports Media UGC</h4>
                  <p className="text-xs text-slate-600 font-light leading-relaxed mt-2">
                    High-volume social reels and matchday promotional creative pipelines for international sports teams.
                  </p>
                </div>
                <div className="pt-3 text-[11px] font-mono text-emerald-700 font-semibold border-t border-slate-200">
                  48-Hour Turnaround →
                </div>
              </div>
            </Tilt3DCard>

            <Tilt3DCard maxTilt={12} scale={1.03}>
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 hover:border-emerald-500 hover:shadow-xl transition-all h-full flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-emerald-600 block">PILLAR 04</span>
                  <h4 className="font-display font-bold text-lg text-navy-950 mt-1">Global Merchandising</h4>
                  <p className="text-xs text-slate-600 font-light leading-relaxed mt-2">
                    Custom apparel, team kits, luxury packaging, and promotional merchandise engineering.
                  </p>
                </div>
                <div className="pt-3 text-[11px] font-mono text-emerald-700 font-semibold border-t border-slate-200">
                  Sample & Production →
                </div>
              </div>
            </Tilt3DCard>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 7. INCUBATING DIVISIONS: FASHION & BAKERY TEASERS                    */}
      {/* -------------------------------------------------------------------- */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-500 font-semibold">
              Emerging Consumer Verticals
            </span>
            <h2 className="text-3xl font-display font-bold text-navy-950">
              Incubating Divisions (Coming Soon)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Duzza Fashion */}
            <Tilt3DCard maxTilt={8} scale={1.02}>
              <div className="p-8 rounded-3xl bg-white border border-rose-200 shadow-sm flex flex-col justify-between space-y-6 h-full">
                <div className="space-y-3">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-rose-100 text-rose-700 font-bold border border-rose-200">
                    Coming Soon
                  </span>
                  <h3 className="text-2xl font-display font-bold text-navy-950">Duzza Fashion</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-light">
                    Contemporary English tailoring and artisanal bespoke Ankara couture. Handcrafted leather footwear and luxury accessories.
                  </p>
                </div>
                <Link
                  href="/fashion"
                  className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-rose-600 hover:underline"
                >
                  <span>Join VIP Fashion Waitlist</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Tilt3DCard>

            {/* Duzza Bakery */}
            <Tilt3DCard maxTilt={8} scale={1.02}>
              <div className="p-8 rounded-3xl bg-white border border-amber-200 shadow-sm flex flex-col justify-between space-y-6 h-full">
                <div className="space-y-3">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold border border-amber-200">
                    Coming Soon
                  </span>
                  <h3 className="text-2xl font-display font-bold text-navy-950">Duzza Bakery & Eatery</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-light">
                    Slow-fermented artisan sourdough loaves, French patisserie, bespoke custom celebration cakes, and casual bistro dining.
                  </p>
                </div>
                <Link
                  href="/bakery"
                  className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-700 hover:underline"
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
