"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Compass, 
  Waves, 
  Wrench, 
  HardHat, 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  Search, 
  Download, 
  PhoneCall, 
  Ship, 
  Radio, 
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
  category: "Bathymetry" | "Positioning" | "Subsea Detection" | "Sonar Imaging";
  specs: string;
  useCase: string;
  rateNgn: string;
  status: "AVAILABLE" | "RESERVED";
}

const EQUIPMENT_DATA: EquipmentItem[] = [
  {
    code: "EQ-MBES-7125",
    name: "Reson SeaBat T50-P Multibeam Echo Sounder",
    category: "Bathymetry",
    specs: "190–420 kHz agile | 1024 beams | 575m max depth | 50 pings/sec",
    useCase: "High-density bathymetric seafloor mapping and port fairway depth clearance.",
    rateNgn: "₦1,850,000 / day",
    status: "AVAILABLE",
  },
  {
    code: "EQ-GNSS-R12I",
    name: "Trimble R12i GNSS RTK Rover & Base System",
    category: "Positioning",
    specs: "672 channels | GPS, GLONASS, Galileo, BeiDou | IMU tilt up to 30° | 8mm H RMS",
    useCase: "Real-time kinematic hydrospatial positioning for survey barges and coastal civil works.",
    rateNgn: "₦450,000 / day",
    status: "AVAILABLE",
  },
  {
    code: "EQ-SBP-3000",
    name: "EdgeTech 3100 Sub-Bottom Profiler Chirp System",
    category: "Subsea Detection",
    specs: "Full Spectrum CHIRP | Up to 80m sediment penetration | 8cm resolution | 300m tow",
    useCase: "Sub-seabed geologic stratigraphy, pipeline burial depth, and subsea hazard detection.",
    rateNgn: "₦1,400,000 / day",
    status: "AVAILABLE",
  },
  {
    code: "EQ-SSS-4200",
    name: "Klein 3900 High-Definition Side-Scan Sonar",
    category: "Sonar Imaging",
    specs: "Dual 445/900 kHz simultaneous | 150m range per channel | 300m towfish pressure",
    useCase: "Acoustic seafloor classification, shipwreck investigation, and unexploded ordnance search.",
    rateNgn: "₦1,250,000 / day",
    status: "RESERVED",
  },
  {
    code: "EQ-SVP-PLUS",
    name: "Valeport miniSVP Sound Velocity Profiler",
    category: "Bathymetry",
    specs: "Direct digital time of flight | 0.002 m/s resolution | 500m titanium housing",
    useCase: "Water column sound speed correction for high-precision multibeam calibrations.",
    rateNgn: "₦280,000 / day",
    status: "AVAILABLE",
  },
  {
    code: "EQ-TIDE-GAUGE",
    name: "Aanderaa WLR7 Coastal Water Level & Tide Recorder",
    category: "Positioning",
    specs: "High-accuracy piezoresistive sensor | Acoustic telemetry | 0.01% accuracy",
    useCase: "Real-time coastal tidal reduction for dredging and hydrographic charting.",
    rateNgn: "₦320,000 / day",
    status: "AVAILABLE",
  },
];

export default function DuzzaProjectsPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const equipRef = useRef<HTMLDivElement | null>(null);

  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedGear, setSelectedGear] = useState<{ code: string; name: string }>({
    code: "EQ-MBES-7125",
    name: "Reson SeaBat T50-P Multibeam Echo Sounder",
  });

  const categories = ["ALL", "Bathymetry", "Positioning", "Subsea Detection", "Sonar Imaging"];

  const filteredGear = EQUIPMENT_DATA.filter((item) => {
    const matchesCat = activeCategory === "ALL" || item.category === activeCategory;
    const matchesQuery = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.useCase.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesQuery;
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
        { opacity: 0, y: -25 },
        { opacity: 1, y: 0, duration: 0.65 }
      )
        .fromTo(
          ".gsap-proj-title",
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.85 },
          "-=0.3"
        )
        .fromTo(
          ".gsap-proj-desc",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.65 },
          "-=0.4"
        )
        .fromTo(
          ".gsap-proj-action",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.1 },
          "-=0.3"
        )
        .fromTo(
          ".gsap-parallax-card",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.15 },
          "-=0.2"
        );
    },
    { scope: containerRef }
  );

  useGSAP(
    () => {
      if (!equipRef.current) return;
      gsap.fromTo(
        equipRef.current.querySelectorAll(".gsap-gear-card"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.08, ease: "power2.out" }
      );
    },
    { dependencies: [activeCategory, searchTerm], scope: equipRef }
  );

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2348030000000";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hello%20Duzza%20Projects,%20I%20would%20like%20to%20request%20an%20engineering%20quotation.`;

  return (
    <div ref={containerRef} className="bg-white min-h-screen text-slate-900 font-sans selection:bg-brandBlue-600 selection:text-white">
      {/* -------------------------------------------------------------------- */}
      {/* 1. SECTOR HERO (CLEAN LIGHT BLUE & WHITE)                            */}
      {/* -------------------------------------------------------------------- */}
      <section className="relative py-20 lg:py-28 border-b border-slate-200 bg-gradient-to-b from-brandBlue-50/40 via-white to-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:28px_28px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="gsap-proj-badge inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brandBlue-50 border border-brandBlue-200 text-xs font-mono text-brandBlue-700 font-bold shadow-sm">
                <Compass className="w-4 h-4 text-brandBlue-600" />
                <span>DUZZA PROJECTS • B2B HEAVY INDUSTRY & MARINE OPERATIONS</span>
              </div>

              <h1 className="gsap-proj-title text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-navy-950 tracking-tight leading-[1.08]">
                Engineering Precision,{" "}
                <span className="text-gradient-blue block sm:inline">Hydrospatial Survey</span> & Infrastructure.
              </h1>

              <p className="gsap-proj-desc text-base sm:text-lg text-slate-600 leading-relaxed font-light">
                Executing mission-critical civil construction, oil & gas facility maintenance, and specialized 
                marine bathymetric mapping for offshore operators, state infrastructure, and port authorities across the Niger Delta.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#equipment-catalog"
                  className="gsap-proj-action px-6 py-4 rounded-xl bg-brandBlue-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-brandBlue-700 transition-all shadow-md shadow-brandBlue-600/20"
                >
                  Browse Marine Equipment Catalogue
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gsap-proj-action px-5 py-4 rounded-xl bg-slate-100 text-slate-800 font-semibold text-xs uppercase tracking-wider hover:bg-slate-200 border border-slate-300 transition-colors inline-flex items-center space-x-2"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-600" />
                  <span>Warri Marine Operations Desk</span>
                </a>
              </div>
            </div>

            {/* Right Column: 3D Survey Vessel & Bathymetry Sonar Simulator */}
            <div className="lg:col-span-6">
              <Sonar3DVessel />
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 2. REAL-WORLD ENGINEERING ENVIRONMENTS & FIELD ASSETS                */}
      {/* -------------------------------------------------------------------- */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-brandBlue-600 font-bold block">
              Field Execution Track Record
            </span>
            <h2 className="text-3xl font-display font-bold text-navy-950 mt-1">
              Industrial Environments & Operational Assets
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md font-light">
            Stationed in Warri, Delta State with rapid deployment capability across coastal creeks, riverine terminals, and offshore installations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Marine Surveying 3D Tilt Card */}
          <Tilt3DCard maxTilt={10} scale={1.03}>
            <div className="gsap-parallax-card rounded-2xl overflow-hidden bg-white border border-slate-200 group hover:border-brandBlue-400 hover:shadow-xl transition-all duration-300 shadow-sm h-full flex flex-col justify-between">
              <div>
                <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-navy-950 via-brandBlue-950 to-slate-900 p-6 flex flex-col justify-between">
                  {/* High-tech Radar & Bathymetric HUD Vector */}
                  <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#00C2CB_1px,transparent_1px)] [background-size:16px_16px]" />
                  <div className="flex items-center justify-between relative z-10">
                    <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded bg-brandBlue-500/20 text-sky-300 border border-brandBlue-400/40 font-bold">
                      Hydrospatial & Geomatics
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  </div>
                  
                  <div className="relative z-10 flex items-center justify-center py-4">
                    <div className="w-24 h-24 rounded-full border border-sky-400/40 flex items-center justify-center relative">
                      <div className="w-16 h-16 rounded-full border border-sky-400/60 flex items-center justify-center animate-ping opacity-40" />
                      <div className="w-8 h-8 rounded-full bg-brandBlue-600/60 border border-sky-300 flex items-center justify-center">
                        <Compass className="w-4 h-4 text-white" />
                      </div>
                      <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-sky-400/30" />
                      <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-sky-400/30" />
                    </div>
                  </div>

                  <div className="relative z-10 flex justify-between text-[10px] font-mono text-sky-200/80">
                    <span>UTM ZONE 31N/32N</span>
                    <span>MULTIBEAM MBES ACTIVE</span>
                  </div>
                </div>

                <div className="p-6 space-y-2">
                  <h3 className="font-display font-bold text-lg text-navy-950 group-hover:text-brandBlue-600 transition-colors">
                    Hydrospatial & Cadastral Survey
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-light">
                    Multibeam swath sounding, side-scan acoustic imaging, navigation fairway depth charting, 
                    and underwater pipeline burial depth inspections.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-brandBlue-600">
                <span>View Geomatics Fleet</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Tilt3DCard>

          {/* Card 2: Oil & Gas Energy Infrastructure 3D Tilt Card */}
          <Tilt3DCard maxTilt={10} scale={1.03}>
            <div className="gsap-parallax-card rounded-2xl overflow-hidden bg-white border border-slate-200 group hover:border-brandBlue-400 hover:shadow-xl transition-all duration-300 shadow-sm h-full flex flex-col justify-between">
              <div>
                <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-slate-900 via-sky-950 to-navy-950 p-6 flex flex-col justify-between">
                  <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:16px_16px]" />
                  <div className="flex items-center justify-between relative z-10">
                    <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded bg-sky-500/20 text-sky-300 border border-sky-400/40 font-bold">
                      Energy & Flowstations
                    </span>
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  </div>

                  <div className="relative z-10 flex items-center justify-center py-4">
                    <div className="w-24 h-24 rounded-2xl border border-sky-400/40 bg-sky-900/30 flex items-center justify-center relative p-3">
                      <div className="grid grid-cols-2 gap-2 w-full h-full">
                        <div className="bg-sky-400/20 rounded border border-sky-300/40" />
                        <div className="bg-sky-400/40 rounded border border-sky-300/60" />
                        <div className="bg-sky-400/40 rounded border border-sky-300/60" />
                        <div className="bg-sky-400/20 rounded border border-sky-300/40" />
                      </div>
                      <div className="absolute -bottom-2 px-2 py-0.5 rounded-full bg-amber-500 text-black text-[8px] font-mono font-bold">
                        4.28 MW SOLAR
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 flex justify-between text-[10px] font-mono text-sky-200/80">
                    <span>PRESSURE: 1,240 PSI</span>
                    <span>FLOW: 85K BPD</span>
                  </div>
                </div>

                <div className="p-6 space-y-2">
                  <h3 className="font-display font-bold text-lg text-navy-950 group-hover:text-brandBlue-600 transition-colors">
                    Oil & Gas Infrastructure
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-light">
                    Flow station modification, structural pipeline tie-in supports, pressure testing, 
                    and corrosion control across swamp and land assets.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-brandBlue-600">
                <span>View Field Telemetry</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Tilt3DCard>

          {/* Card 3: Civil Works Foundations 3D Tilt Card */}
          <Tilt3DCard maxTilt={10} scale={1.03}>
            <div className="gsap-parallax-card rounded-2xl overflow-hidden bg-white border border-slate-200 group hover:border-brandBlue-400 hover:shadow-xl transition-all duration-300 shadow-sm h-full flex flex-col justify-between">
              <div>
                <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-stone-900 via-orange-950 to-slate-900 p-6 flex flex-col justify-between">
                  <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#EA580C_1px,transparent_1px)] [background-size:16px_16px]" />
                  <div className="flex items-center justify-between relative z-10">
                    <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded bg-orange-500/20 text-orange-300 border border-orange-400/40 font-bold">
                      Civil & Structural
                    </span>
                    <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
                  </div>

                  <div className="relative z-10 flex items-center justify-center py-4">
                    <div className="w-24 h-24 rounded-2xl border border-orange-400/40 bg-orange-900/30 flex flex-col items-center justify-center space-y-1 p-2">
                      <div className="w-16 h-3 bg-orange-500/70 rounded-sm border border-orange-300/40" />
                      <div className="flex space-x-2">
                        <div className="w-2.5 h-10 bg-slate-400/60 rounded-sm" />
                        <div className="w-2.5 h-10 bg-slate-400/60 rounded-sm" />
                        <div className="w-2.5 h-10 bg-slate-400/60 rounded-sm" />
                      </div>
                      <span className="text-[8px] font-mono text-orange-200">BORED PILING</span>
                    </div>
                  </div>

                  <div className="relative z-10 flex justify-between text-[10px] font-mono text-orange-200/80">
                    <span>DEPTH: -12.5M</span>
                    <span>GRADE: C35/45</span>
                  </div>
                </div>

                <div className="p-6 space-y-2">
                  <h3 className="font-display font-bold text-lg text-navy-950 group-hover:text-brandBlue-600 transition-colors">
                    Civil & Heavy Works
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-light">
                    Deep ground stabilization, shore protection bulkheads, heavy industrial concrete foundations, 
                    and turnkey facility fabrication.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-brandBlue-600">
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
      <section className="py-16 bg-[#070B14] border-y border-neutral-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-projects-cyan">
              Hydrospatial Data Visualization
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
              Dynamic Sonar & Bathymetric Seabed Mapping
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 font-light">
              Interactive 3D representation of our acoustic multibeam soundings. Elevation contours reflect real-time 
              subsea terrain variations mapped during channel navigation surveys.
            </p>
          </div>

          <BathymetricSonarCanvas />
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 4. INTERACTIVE EQUIPMENT HIRE CATALOGUE (LIGHT THEME)               */}
      {/* -------------------------------------------------------------------- */}
      <section id="equipment-catalog" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-brandBlue-600 font-bold block">
              Asset Leasehold & Mobilization
            </span>
            <h2 className="text-3xl font-display font-extrabold text-navy-950 mt-1">
              Marine & Hydrographic Equipment Hire
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md font-light">
            Click &ldquo;Enquire&rdquo; on any asset to pre-fill our rapid reservation pipeline. Verified calibration reports accompany all mobilization kits.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeCategory === cat
                    ? "bg-brandBlue-600 text-white shadow-md shadow-brandBlue-600/20 font-bold"
                    : "bg-white text-slate-600 hover:text-navy-950 border border-slate-200"
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
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 pl-9 text-xs text-navy-950 placeholder-slate-400 focus:outline-none focus:border-brandBlue-600 transition-colors"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Equipment Product Grid */}
        <div ref={equipRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGear.map((item) => (
            <div
              key={item.code}
              className="gsap-gear-card rounded-2xl bg-white border border-slate-200 p-6 flex flex-col justify-between hover:border-brandBlue-400 hover:shadow-xl transition-all duration-300 group shadow-sm"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-brandBlue-600 font-bold block">
                      {item.code}
                    </span>
                    <h3 className="font-display font-bold text-lg text-navy-950 mt-0.5 group-hover:text-brandBlue-600 transition-colors">
                      {item.name}
                    </h3>
                  </div>
                  <span
                    className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                      item.status === "AVAILABLE"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-slate-100 text-slate-500 border-slate-200"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1 text-xs">
                  <span className="text-[10px] uppercase font-mono text-brandBlue-700 font-semibold block">
                    Technical Specifications
                  </span>
                  <p className="text-slate-600 font-mono text-[11px] leading-relaxed">
                    {item.specs}
                  </p>
                </div>

                <div className="text-xs text-slate-500 space-y-1 font-light">
                  <span className="text-[10px] uppercase font-mono text-slate-400 font-semibold block">
                    Target Marine Use Case
                  </span>
                  <p className="text-slate-700 leading-relaxed text-xs">
                    {item.useCase}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-mono">Indicative Lease</span>
                  <span className="text-xs font-mono font-bold text-brandBlue-700">
                    {item.rateNgn}
                  </span>
                </div>

                <button
                  onClick={() => handleOpenEnquiry(item.code, item.name)}
                  className="px-4 py-2 rounded-lg bg-brandBlue-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-brandBlue-700 shadow-sm shadow-brandBlue-600/20 transition-all"
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
