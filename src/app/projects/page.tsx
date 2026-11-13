"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { 
  Compass, 
  ArrowRight, 
  Search, 
  Filter, 
  CheckCircle2, 
  MapPin, 
  FileText, 
  PhoneCall, 
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles
} from "lucide-react";
import BathymetricSonarCanvas from "@/components/projects/BathymetricSonarCanvas";
import EquipmentEnquiryModal from "@/components/projects/EquipmentEnquiryModal";
import CapabilityDownloadModule from "@/components/projects/CapabilityDownloadModule";
import Tilt3DCard from "@/components/animation/Tilt3DCard";
import Sonar3DVessel from "@/components/animation/Sonar3DVessel";
import { gsap, useGSAP } from "@/lib/animations/gsap";

interface EquipmentItem {
  code: string;
  name: string;
  category: "SURVEY" | "BATHYMETRY" | "CIVIL" | "SAFETY";
  specs: string;
  useCase: string;
  status: "AVAILABLE" | "MOBILIZED";
  rateNgn: string;
}

const EQUIPMENT_CATALOG: EquipmentItem[] = [
  {
    code: "EQ-MBES-7125",
    name: "Reson SeaBat T50-P Multibeam System",
    category: "BATHYMETRY",
    specs: "190–420 kHz agile frequency, 1024 soundings/ping, integrated roll/pitch compensation.",
    useCase: "Deep fairway navigation surveys, port dredging verification & pipeline route clearance.",
    status: "AVAILABLE",
    rateNgn: "From ₦850,000 / Day",
  },
  {
    code: "EQ-GNSS-R12I",
    name: "Trimble R12i GNSS RTK System",
    category: "SURVEY",
    specs: "672-channel tracking, ProPoint GNSS engine, TIP tilt compensation up to 30°.",
    useCase: "Sub-centimeter cadastral boundary marking, shoreline profiling & piling guidance.",
    status: "AVAILABLE",
    rateNgn: "From ₦180,000 / Day",
  },
  {
    code: "EQ-SBP-3000",
    name: "EdgeTech 3100 Sub-Bottom Profiler",
    category: "BATHYMETRY",
    specs: "Full Spectrum CHIRP sub-seabed penetration up to 40m in sand and silt strata.",
    useCase: "Subsea pipeline burial depth verification, shallow gas hazards & geologic stratigraphy.",
    status: "MOBILIZED",
    rateNgn: "From ₦650,000 / Day",
  },
  {
    code: "EQ-SSS-4200",
    name: "Klein 3900 High-Resolution Side-Scan Sonar",
    category: "BATHYMETRY",
    specs: "Dual simultaneous 445/900 kHz frequencies, dynamic focusing, 150m swath range/channel.",
    useCase: "Wreck investigations, seabed debris identification & fairway obstacle clearance.",
    status: "AVAILABLE",
    rateNgn: "From ₦520,000 / Day",
  },
  {
    code: "EQ-SURV-TS16",
    name: "Leica TS16 Robotic Total Station",
    category: "SURVEY",
    specs: "1\" angular precision, ATRplus automated target recognition up to 1,500m.",
    useCase: "Structural foundation monitoring, industrial plant alignments & high-precision civil engineering.",
    status: "AVAILABLE",
    rateNgn: "From ₦120,000 / Day",
  },
  {
    code: "EQ-MAG-G882",
    name: "Geometrics G-882 Marine Magnetometer",
    category: "BATHYMETRY",
    specs: "Cesium vapor sensor, 0.004 nT sensitivity, 10 Hz sampling rate, depth rated to 2,750m.",
    useCase: "Ferrous pipeline tracking, UXO detection & subsea cable route confirmation.",
    status: "AVAILABLE",
    rateNgn: "From ₦450,000 / Day",
  },
];

export default function DuzzaProjectsPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const equipRef = useRef<HTMLDivElement | null>(null);

  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedGear, setSelectedGear] = useState<{ code: string; name: string }>({
    code: "EQ-MBES-7125",
    name: "Reson SeaBat T50-P Multibeam System",
  });

  const categories = ["ALL", "BATHYMETRY", "SURVEY", "CIVIL", "SAFETY"];

  const filteredGear = EQUIPMENT_CATALOG.filter((item) => {
    const matchesCat = activeCategory === "ALL" || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.specs.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleOpenEnquiry = (code: string, name: string) => {
    setSelectedGear({ code, name });
    setModalOpen(true);
  };

  // GSAP Entrance Animations
  useGSAP(
    () => {
      if (!containerRef.current) return;
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".gsap-proj-badge",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          ".gsap-proj-title",
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.3"
        )
        .fromTo(
          ".gsap-proj-desc",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.4"
        )
        .fromTo(
          ".gsap-proj-action",
          { opacity: 0, y: 15, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1 },
          "-=0.3"
        );
    },
    { scope: containerRef }
  );

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2348030000000";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hello%20Duzza%20Projects,%20I%20would%20like%20to%20request%20an%20engineering%20quotation.`;

  return (
    <div ref={containerRef} className="bg-[#050B18] min-h-screen text-[#F1F5F9] font-sans selection:bg-[#D4AF37] selection:text-[#050B18]">
      {/* -------------------------------------------------------------------- */}
      {/* 1. SECTOR HERO                                                       */}
      {/* -------------------------------------------------------------------- */}
      <section className="relative py-20 lg:py-28 border-b border-[#1B325C] bg-gradient-to-b from-[#050B18] via-[#07132B] to-[#050B18] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:28px_28px]" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="gsap-proj-badge inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#091224] border border-[#D4AF37]/35 text-xs font-mono text-[#D4AF37] font-bold shadow-sm">
                <Compass className="w-4 h-4 text-[#D4AF37]" />
                <span>DUZZA PROJECTS • B2B HEAVY INDUSTRY & MARINE OPERATIONS</span>
              </div>

              <h1 className="gsap-proj-title text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.08]">
                Engineering Precision,{" "}
                <span className="text-gradient-gold block sm:inline">Hydrospatial Survey</span> & Infrastructure.
              </h1>

              <p className="gsap-proj-desc text-base sm:text-lg text-[#CBD5E1]/90 leading-relaxed font-light">
                Executing mission-critical civil construction, oil & gas facility maintenance, and specialized 
                marine bathymetric mapping for offshore operators, state infrastructure, and port authorities across the Niger Delta.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#equipment-catalog"
                  className="btn-brand-primary gsap-proj-action px-6 py-4 rounded-xl text-[#050B18] font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                >
                  Browse Marine Equipment Catalogue
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gsap-proj-action px-5 py-4 rounded-xl bg-[#091224] text-[#CBD5E1] font-semibold text-xs uppercase tracking-wider hover:bg-[#0E1B33] border border-[#1B325C] hover:border-[#D4AF37]/50 transition-colors inline-flex items-center space-x-2"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  <span>Warri Marine Operations Desk</span>
                </a>
              </div>
            </div>

            {/* Right Column: 3D Survey Vessel & Bathymetry Sonar Simulator */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl border border-[#1B325C] bg-[#091224] p-4 shadow-2xl">
                <Sonar3DVessel />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 2. REAL-WORLD ENGINEERING ENVIRONMENTS & FIELD ASSETS                */}
      {/* -------------------------------------------------------------------- */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1B325C] pb-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold block">
              Field Execution Track Record
            </span>
            <h2 className="text-3xl font-display font-bold text-white mt-1">
              Industrial Environments & Operational Assets
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#CBD5E1]/80 max-w-md font-light">
            Stationed in Warri, Delta State with rapid deployment capability across coastal creeks, riverine terminals, and offshore installations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Marine Surveying 3D Tilt Card */}
          <Tilt3DCard maxTilt={10} scale={1.03}>
            <div className="gsap-parallax-card rounded-2xl overflow-hidden bg-[#091224] border border-[#1B325C] group hover:border-[#D4AF37]/50 hover:shadow-2xl transition-all duration-300 shadow-md h-full flex flex-col justify-between">
              <div>
                <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-[#050B18] via-[#091224] to-[#0E1B33] p-6 flex flex-col justify-between">
                  <div className="absolute inset-0 opacity-25 pointer-events-none bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:16px_16px]" />
                  <div className="flex items-center justify-between relative z-10">
                    <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded bg-[#0E1B33] text-[#38BDF8] border border-[#1B325C] font-bold">
                      Hydrospatial & Geomatics
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  </div>
                  
                  <div className="relative z-10 flex items-center justify-center py-4">
                    <div className="w-24 h-24 rounded-full border border-sky-400/40 flex items-center justify-center relative">
                      <div className="w-16 h-16 rounded-full border border-sky-400/60 flex items-center justify-center animate-ping opacity-40" />
                      <div className="w-8 h-8 rounded-full bg-[#0E1B33] border border-[#D4AF37] flex items-center justify-center">
                        <Compass className="w-4 h-4 text-[#D4AF37]" />
                      </div>
                      <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-sky-400/30" />
                      <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-sky-400/30" />
                    </div>
                  </div>

                  <div className="relative z-10 flex justify-between text-[10px] font-mono text-[#CBD5E1]">
                    <span>UTM ZONE 31N/32N</span>
                    <span>MULTIBEAM MBES ACTIVE</span>
                  </div>
                </div>

                <div className="p-6 space-y-2">
                  <h3 className="font-display font-bold text-lg text-white group-hover:text-[#D4AF37] transition-colors">
                    Hydrospatial & Cadastral Survey
                  </h3>
                  <p className="text-xs text-[#CBD5E1]/80 leading-relaxed font-light">
                    Multibeam swath sounding, side-scan acoustic imaging, navigation fairway depth charting, 
                    and underwater pipeline burial depth inspections.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-[#0E1B33] border-t border-[#1B325C] flex items-center justify-between text-xs font-semibold text-[#D4AF37]">
                <span>View Geomatics Fleet</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Tilt3DCard>

          {/* Card 2: Oil & Gas Energy Infrastructure 3D Tilt Card */}
          <Tilt3DCard maxTilt={10} scale={1.03}>
            <div className="gsap-parallax-card rounded-2xl overflow-hidden bg-[#091224] border border-[#1B325C] group hover:border-[#D4AF37]/50 hover:shadow-2xl transition-all duration-300 shadow-md h-full flex flex-col justify-between">
              <div>
                <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-[#050B18] via-[#091224] to-[#0E1B33] p-6 flex flex-col justify-between">
                  <div className="absolute inset-0 opacity-25 pointer-events-none bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:16px_16px]" />
                  <div className="flex items-center justify-between relative z-10">
                    <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded bg-[#0E1B33] text-[#38BDF8] border border-[#1B325C] font-bold">
                      Energy & Flowstations
                    </span>
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  </div>

                  <div className="relative z-10 flex items-center justify-center py-4">
                    <div className="w-24 h-24 rounded-2xl border border-sky-400/40 bg-[#0E1B33] flex items-center justify-center relative p-3">
                      <div className="grid grid-cols-2 gap-2 w-full h-full">
                        <div className="bg-sky-400/20 rounded border border-sky-300/40" />
                        <div className="bg-sky-400/40 rounded border border-sky-300/60" />
                        <div className="bg-sky-400/40 rounded border border-sky-300/60" />
                        <div className="bg-sky-400/20 rounded border border-sky-300/40" />
                      </div>
                      <div className="absolute -bottom-2 px-2 py-0.5 rounded-full bg-[#D4AF37] text-[#050B18] text-[8px] font-mono font-bold">
                        4.28 MW SOLAR
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 flex justify-between text-[10px] font-mono text-[#CBD5E1]">
                    <span>PRESSURE: 1,240 PSI</span>
                    <span>FLOW: 85K BPD</span>
                  </div>
                </div>

                <div className="p-6 space-y-2">
                  <h3 className="font-display font-bold text-lg text-white group-hover:text-[#D4AF37] transition-colors">
                    Oil & Gas Infrastructure
                  </h3>
                  <p className="text-xs text-[#CBD5E1]/80 leading-relaxed font-light">
                    Flow station modification, structural pipeline tie-in supports, pressure testing, 
                    and corrosion control across swamp and land assets.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-[#0E1B33] border-t border-[#1B325C] flex items-center justify-between text-xs font-semibold text-[#D4AF37]">
                <span>View Field Telemetry</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Tilt3DCard>

          {/* Card 3: Civil Works Foundations 3D Tilt Card */}
          <Tilt3DCard maxTilt={10} scale={1.03}>
            <div className="gsap-parallax-card rounded-2xl overflow-hidden bg-[#091224] border border-[#1B325C] group hover:border-[#D4AF37]/50 hover:shadow-2xl transition-all duration-300 shadow-md h-full flex flex-col justify-between">
              <div>
                <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-[#050B18] via-[#091224] to-[#0E1B33] p-6 flex flex-col justify-between">
                  <div className="absolute inset-0 opacity-25 pointer-events-none bg-[radial-gradient(#EA580C_1px,transparent_1px)] [background-size:16px_16px]" />
                  <div className="flex items-center justify-between relative z-10">
                    <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded bg-[#0E1B33] text-orange-300 border border-[#1B325C] font-bold">
                      Civil & Structural
                    </span>
                    <span className="w-2 h-2 rounded-full bg-orange-400 animate-ping" />
                  </div>

                  <div className="relative z-10 flex items-center justify-center py-4">
                    <div className="w-24 h-24 rounded-2xl border border-orange-400/40 bg-[#0E1B33] flex flex-col items-center justify-center space-y-1 p-2">
                      <div className="w-16 h-3 bg-orange-500/70 rounded-sm border border-orange-300/40" />
                      <div className="flex space-x-2">
                        <div className="w-2.5 h-10 bg-slate-500/60 rounded-sm" />
                        <div className="w-2.5 h-10 bg-slate-500/60 rounded-sm" />
                        <div className="w-2.5 h-10 bg-slate-500/60 rounded-sm" />
                      </div>
                      <span className="text-[8px] font-mono text-orange-200">BORED PILING</span>
                    </div>
                  </div>

                  <div className="relative z-10 flex justify-between text-[10px] font-mono text-[#CBD5E1]">
                    <span>DEPTH: -12.5M</span>
                    <span>GRADE: C35/45</span>
                  </div>
                </div>

                <div className="p-6 space-y-2">
                  <h3 className="font-display font-bold text-lg text-white group-hover:text-[#D4AF37] transition-colors">
                    Civil & Heavy Works
                  </h3>
                  <p className="text-xs text-[#CBD5E1]/80 leading-relaxed font-light">
                    Deep ground stabilization, shore protection bulkheads, heavy industrial concrete foundations, 
                    and turnkey facility fabrication.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-[#0E1B33] border-t border-[#1B325C] flex items-center justify-between text-xs font-semibold text-[#D4AF37]">
                <span>View Engineering Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Tilt3DCard>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 3. INTERACTIVE 3D BATHYMETRIC / SONAR SEAFLOOR ANIMATION            */}
      {/* -------------------------------------------------------------------- */}
      <section className="py-16 bg-[#030712] border-y border-[#1B325C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#38BDF8] font-bold">
              Hydrospatial Data Visualization
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
              Dynamic Sonar & Bathymetric Seabed Mapping
            </h2>
            <p className="text-xs sm:text-sm text-[#CBD5E1]/80 font-light">
              Interactive 3D representation of our acoustic multibeam soundings. Elevation contours reflect real-time 
              subsea terrain variations mapped during channel navigation surveys.
            </p>
          </div>

          <BathymetricSonarCanvas />
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 4. INTERACTIVE EQUIPMENT HIRE CATALOGUE                              */}
      {/* -------------------------------------------------------------------- */}
      <section id="equipment-catalog" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1B325C] pb-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold block">
              Asset Leasehold & Mobilization
            </span>
            <h2 className="text-3xl font-display font-extrabold text-white mt-1">
              Marine & Hydrographic Equipment Hire
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#CBD5E1]/80 max-w-md font-light">
            Click &ldquo;Enquire&rdquo; on any asset to pre-fill our rapid reservation pipeline. Verified calibration reports accompany all mobilization kits.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 rounded-xl bg-[#091224] border border-[#1B325C] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "btn-brand-primary text-[#050B18] shadow-md font-bold"
                    : "bg-[#0E1B33] text-[#CBD5E1] hover:text-white border border-[#1B325C] hover:border-[#D4AF37]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search equipment, specs, code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0E1B33] border border-[#1B325C] rounded-lg px-3 py-2 pl-9 text-xs text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
            <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Equipment Product Grid */}
        <div ref={equipRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGear.map((item) => (
            <div
              key={item.code}
              className="gsap-gear-card rounded-2xl bg-[#091224] border border-[#1B325C] p-6 flex flex-col justify-between hover:border-[#D4AF37]/60 hover:shadow-2xl transition-all duration-300 group shadow-md"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#D4AF37] font-bold block">
                      {item.code}
                    </span>
                    <h3 className="font-display font-bold text-lg text-white mt-0.5 group-hover:text-[#D4AF37] transition-colors">
                      {item.name}
                    </h3>
                  </div>
                  <span
                    className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                      item.status === "AVAILABLE"
                        ? "bg-emerald-950/60 text-emerald-400 border-emerald-500/40"
                        : "bg-[#0E1B33] text-[#94A3B8] border-[#1B325C]"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="p-3.5 rounded-lg bg-[#0E1B33] border border-[#1B325C] space-y-1 text-xs">
                  <span className="text-[10px] uppercase font-mono text-[#38BDF8] font-semibold block">
                    Technical Specifications
                  </span>
                  <p className="text-[#CBD5E1] font-mono text-[11px] leading-relaxed">
                    {item.specs}
                  </p>
                </div>

                <div className="text-xs text-[#94A3B8] space-y-1 font-light">
                  <span className="text-[10px] uppercase font-mono text-[#CBD5E1] font-semibold block">
                    Target Marine Use Case
                  </span>
                  <p className="text-[#CBD5E1]/90 leading-relaxed text-xs">
                    {item.useCase}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-[#1B325C] mt-6 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#94A3B8] block uppercase font-mono">Indicative Lease</span>
                  <span className="text-xs font-mono font-bold text-[#D4AF37]">
                    {item.rateNgn}
                  </span>
                </div>

                <button
                  onClick={() => handleOpenEnquiry(item.code, item.name)}
                  className="btn-brand-primary px-4 py-2 rounded-lg text-[#050B18] font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                >
                  Enquire →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 5. CAPABILITY STATEMENT PDF DOWNLOAD MODULE                         */}
      {/* -------------------------------------------------------------------- */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CapabilityDownloadModule />
      </section>

      {/* Equipment Enquiry Modal Trigger Container */}
      <EquipmentEnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        equipmentCode={selectedGear.code}
        equipmentName={selectedGear.name}
      />
    </div>
  );
}
