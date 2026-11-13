"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Waves, 
  Search, 
  Filter, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  FileText, 
  ArrowRight,
  PhoneCall
} from "lucide-react";
import Cadastral3DScanner from "@/components/animation/Cadastral3DScanner";
import Tilt3DCard from "@/components/animation/Tilt3DCard";

interface EquipmentItem {
  code: string;
  name: string;
  category: string;
  status: "AVAILABLE" | "ON_HIRE" | "RESERVED";
  specs: Record<string, string>;
  dailyRateNgn: string;
  image: string;
}

const EQUIPMENT_CATALOGUE: EquipmentItem[] = [
  {
    code: "EQ-MBES-7125",
    name: "Reson SeaBat T50-P Multibeam Echo Sounder",
    category: "Bathymetric Survey",
    status: "AVAILABLE",
    specs: {
      "Frequency Band": "190 – 420 kHz frequency agile",
      "Swath Coverage": "Up to 150° with 1024 beams",
      "Operational Depth": "0.5m to 575m water depth",
      "Sounding Rate": "Up to 50 pings / sec",
    },
    dailyRateNgn: "₦1,850,000 / day",
    image: "https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=1200",
  },
  {
    code: "EQ-GNSS-R12I",
    name: "Trimble R12i GNSS RTK Rover & Base System",
    category: "Hydrospatial Positioning",
    status: "AVAILABLE",
    specs: {
      "Constellations": "GPS, GLONASS, Galileo, BeiDou (672 channels)",
      "Tilt Compensation": "Inertial IMU tilt up to 30°",
      "Horizontal Accuracy": "8 mm + 1 ppm RMS",
      "Data Logging": "Internal 6 GB memory + NTRIP cellular modem",
    },
    dailyRateNgn: "₦450,000 / day",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200",
  },
  {
    code: "EQ-SBP-3000",
    name: "EdgeTech 3100 Sub-Bottom Profiler (Chirp)",
    category: "Subsea Geophysics",
    status: "AVAILABLE",
    specs: {
      "Acoustic Pulse": "Full Spectrum CHIRP (2 – 16 kHz)",
      "Sub-bottom Penetration": "Up to 80m in silt/clay formations",
      "Towfish Type": "SB-216S tow vehicle with 50m cable",
      "Applications": "Pipeline burial depth & seabed geological stratification",
    },
    dailyRateNgn: "₦1,250,000 / day",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80",
  },
  {
    code: "EQ-SSS-4200",
    name: "Klein 3900 High-Resolution Side-Scan Sonar",
    category: "Acoustic Seabed Mapping",
    status: "AVAILABLE",
    specs: {
      "Dual Frequency": "445 kHz / 900 kHz simultaneous operation",
      "Range per Side": "150m @ 445 kHz / 75m @ 900 kHz",
      "Towfish Rating": "200m depth rated lightweight hydrodynamic body",
      "Use Cases": "Seafloor debris, shipwreck search, hazard clearance",
    },
    dailyRateNgn: "₦950,000 / day",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200",
  },
  {
    code: "EQ-SV-MINI",
    name: "Valeport MiniSVP Sound Velocity Profiler",
    category: "Acoustic Calibration",
    status: "AVAILABLE",
    specs: {
      "Velocity Range": "1375 – 1900 m/s with ±0.02 m/s accuracy",
      "Pressure Sensor": "0.01% range strain gauge (50 bar)",
      "Sampling": "Direct digital time-of-flight acoustic sensor",
      "Export Formats": "Hypack, CARIS, QINSy, NaviSound profile compatible",
    },
    dailyRateNgn: "₦180,000 / day",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200",
  },
  {
    code: "EQ-MAG-G882",
    name: "Geometrics G-882 Marine Magnetometer",
    category: "Ferrous UXO & Pipeline Tracking",
    status: "AVAILABLE",
    specs: {
      "Sensor Technology": "Cesium vapor optically pumped magnetometer",
      "Sensitivity": "<0.004 nT / √Hz RMS at 10 Hz sample rate",
      "Depth Rating": "300m standard lightweight casing",
      "Tow Cable": "100m Kevlar-reinforced low-noise marine cable",
    },
    dailyRateNgn: "₦850,000 / day",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function MarineEquipmentHirePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2348030000000";

  const categories = [
    "ALL",
    "Bathymetric Survey",
    "Hydrospatial Positioning",
    "Subsea Geophysics",
    "Acoustic Seabed Mapping",
    "Acoustic Calibration",
    "Ferrous UXO & Pipeline Tracking"
  ];

  const filteredItems = EQUIPMENT_CATALOGUE.filter((item) => {
    const matchesCategory = selectedCategory === "ALL" || item.category === selectedCategory;
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white min-h-screen text-slate-900 font-sans py-12 px-4 sm:px-6 lg:px-8 selection:bg-brandBlue-600 selection:text-white">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Breadcrumb & Header */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-xs font-mono text-brandBlue-600">
            <Link href="/projects" className="hover:underline font-semibold">DUZZA PROJECTS</Link>
            <span>/</span>
            <span className="text-slate-500">MARINE EQUIPMENT HIRE</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-950">
            Hydrospatial & Marine Survey Equipment Catalogue
          </h1>

          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed font-light">
            All equipment is stationed at our <strong>Warri Marine Logistics Base</strong>, fully calibrated, 
            and ready for rapid mobilization across coastal waterways, riverine zones, and offshore oilfields.
          </p>
        </div>

        {/* 3D Geomatics & Hydrospatial Scanner Hardware Inspection */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-brandBlue-600 font-bold">
              Interactive 3D Hardware Telemetry
            </span>
            <span className="text-xs text-slate-500 font-mono">Total Station & Cadastral Array</span>
          </div>
          <Cadastral3DScanner />
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? "bg-brandBlue-600 text-white font-bold shadow-md shadow-brandBlue-600/20"
                    : "bg-white text-slate-600 hover:text-navy-950 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search code or model..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 pl-9 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brandBlue-600"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredItems.map((item) => {
            const hireWhatsappUrl = `https://wa.me/${whatsappNumber}?text=Hello%20Duzza%20Projects,%20I%20would%20like%20to%20inquire%20about%20leasing%20equipment%20item%20${item.code}%20(${encodeURIComponent(item.name)}).`;

            return (
              <Tilt3DCard key={item.code} maxTilt={8} scale={1.02}>
                <div
                  className="rounded-2xl bg-white border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-brandBlue-400 hover:shadow-xl transition-all shadow-sm h-full"
                >
                  <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[11px] font-mono text-brandBlue-600 font-bold block">
                        {item.code}
                      </span>
                      <h3 className="text-xl font-bold text-navy-950 mt-1">
                        {item.name}
                      </h3>
                      <span className="text-xs text-slate-500 mt-0.5 block">
                        Category: {item.category}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-mono uppercase font-bold px-2.5 py-1 rounded-full border ${
                        item.status === "AVAILABLE"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  {/* Specs Table */}
                  <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 space-y-2 text-xs">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-brandBlue-600 block font-semibold">
                      Technical Specifications
                    </span>
                    {Object.entries(item.specs).map(([specKey, specVal]) => (
                      <div key={specKey} className="flex justify-between py-1 border-b border-slate-200/60 last:border-none">
                        <span className="text-slate-500">{specKey}:</span>
                        <span className="text-navy-950 font-medium text-right">{specVal}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-slate-500">Indicative Lease Rate:</span>
                    <span className="text-sm font-bold text-brandBlue-700 font-mono">
                      {item.dailyRateNgn}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
                  <span className="text-xs text-slate-600 flex items-center space-x-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-brandBlue-600" />
                    <span>Warri Base Mobilization</span>
                  </span>

                  <a
                    href={hireWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-brandBlue-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-brandBlue-700 shadow-sm transition-all"
                  >
                    <span>Enquire for Lease</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </Tilt3DCard>
          );
        })}
        </div>
      </div>
    </div>
  );
}
