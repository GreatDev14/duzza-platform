"use client";

import React from "react";
import Link from "next/link";
import { 
  Building2, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  ChevronRight, 
  Compass, 
  Award,
  Layers,
  MapPin,
  CheckCircle2,
  TrendingUp,
  Globe2
} from "lucide-react";
import Isometric3DHub from "@/components/animation/Isometric3DHub";
import Tilt3DCard from "@/components/animation/Tilt3DCard";
import CorporateLiveBackground from "@/components/home/CorporateLiveBackground";

interface CorporateHeroProps {
  onOpenSpecialRequest?: () => void;
}

export default function CorporateHero({ onOpenSpecialRequest }: CorporateHeroProps) {
  const rcNumber = process.env.NEXT_PUBLIC_CAC_RC_NUMBER || "RC-7149208";

  return (
    <section className="relative w-full pt-20 pb-14 sm:pt-24 sm:pb-20 lg:pt-28 lg:pb-28 border-b border-[#1B325C] bg-gradient-to-b from-[#050B18] via-[#07132B] to-[#050B18] overflow-hidden">
      {/* 60FPS Interactive Corporate Constellation Live Background */}
      <CorporateLiveBackground />

      {/* Subtle Gold and Azure Grid Architecture */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[radial-gradient(#38BDF8_1.2px,transparent_1.2px)] [background-size:24px_24px]" />
      
      {/* Ambient Waterside Spotlight Glow (Inspired by Gilded Quiet Hours) */}
      <div className="absolute -top-32 -right-32 w-[32rem] h-[32rem] bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-32 w-96 h-96 bg-[#0284C7]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Authoritative Corporate Positioning */}
          <div className="lg:col-span-7 space-y-6">
            {/* Statutory Corporate Badge */}
            <div className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 px-3 sm:px-4 py-1.5 rounded-full bg-[#091224] border border-[#D4AF37]/35 text-[10px] sm:text-xs font-mono text-[#D4AF37] shadow-sm max-w-full">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse shrink-0" />
              <span className="font-bold text-white">DUZZA LIMITED</span>
              <span className="text-[#1B325C]">•</span>
              <span className="text-[#CBD5E1] font-semibold">CAMA 2020 RC-7149208</span>
              <span className="text-[#1B325C] hidden sm:inline">•</span>
              <span className="text-[#38BDF8] font-bold hidden sm:inline">WARRI LOGISTICS BASE</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08]">
              Make Informed Decisions.{" "}
              <span className="text-gradient-gold font-light block sm:inline">
                Execute with Certainty.
              </span>
            </h1>

            {/* Corporate Subtitle */}
            <p className="text-sm sm:text-lg text-[#CBD5E1]/90 max-w-2xl leading-relaxed font-light">
              A premier Nigerian multi-sector conglomerate delivering mission-critical marine hydrospatial survey, 
              civil engineering, and oil & gas logistics, paired with global executive branding authority.
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#duzza-operating-businesses"
                className="btn-brand-primary w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-[#050B18] font-bold text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center space-x-2 group shrink-0 cursor-pointer"
              >
                <span className="text-[#050B18] font-bold">Explore All 4 Businesses</span>
                <ChevronRight className="w-4 h-4 text-[#050B18] group-hover:translate-x-1.5 transition-transform" />
              </a>

              {onOpenSpecialRequest && (
                <button
                  onClick={onOpenSpecialRequest}
                  className="w-full sm:w-auto px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl bg-[#091224] text-[#F8FAFC] font-bold text-xs uppercase tracking-wider hover:bg-[#0E1B33] border border-[#1B325C] hover:border-[#D4AF37] transition-all shadow-sm flex items-center justify-center space-x-2 cursor-pointer shrink-0"
                >
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>Special Client Request</span>
                </button>
              )}

              <Link
                href="/about"
                className="px-3 sm:px-5 py-3 text-xs font-mono font-bold text-[#D4AF37] hover:text-white transition-colors"
              >
                Holding Profile →
              </Link>
            </div>

            {/* Credibility Key Metrics Strip */}
            <div className="pt-6 grid grid-cols-3 gap-2 sm:gap-4 border-t border-[#1B325C]">
              <div className="min-w-0">
                <span className="font-display font-black text-lg sm:text-2xl lg:text-3xl text-white block truncate">CAMA 2020</span>
                <span className="text-[9px] sm:text-[11px] font-mono text-[#D4AF37]/90 uppercase block mt-0.5 truncate">CAC Registered</span>
              </div>
              <div className="min-w-0">
                <span className="font-display font-black text-lg sm:text-2xl lg:text-3xl text-[#38BDF8] block truncate">4 Pillars</span>
                <span className="text-[9px] sm:text-[11px] font-mono text-[#CBD5E1]/80 uppercase block mt-0.5 truncate">Operating Verticals</span>
              </div>
              <div className="min-w-0">
                <span className="font-display font-black text-lg sm:text-2xl lg:text-3xl text-white block truncate">Warri Base</span>
                <span className="text-[9px] sm:text-[11px] font-mono text-[#D4AF37]/90 uppercase block mt-0.5 truncate">Delta State HQ</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive WebGL Holding Platform */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl border border-[#1B325C] bg-[#091224]/90 p-2 shadow-2xl shadow-black/80">
              <Isometric3DHub />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
