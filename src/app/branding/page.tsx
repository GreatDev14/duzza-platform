"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Tv, 
  Shirt, 
  ExternalLink, 
  Award,
  Globe2,
  PhoneCall,
  Crown
} from "lucide-react";
import Branding3DPrism from "@/components/animation/Branding3DPrism";
import BrandingBriefForm from "@/components/branding/BrandingBriefForm";
import { gsap, useGSAP } from "@/lib/animations/gsap";

interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  pillar: string;
  country: string;
  imageUrl: string;
  metrics: string;
}

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "work-1",
    title: "Championship Football Club Matchday Identity & Reels",
    client: "UK Football League Franchise",
    pillar: "Sports & Media",
    country: "United Kingdom",
    imageUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200",
    metrics: "1.2M+ Views, 48hr Turnaround on UGC Motion",
  },
  {
    id: "work-2",
    title: "Executive Personal Brand & Keynote Packaging",
    client: "Energy Infrastructure CEO",
    pillar: "Executive Branding",
    country: "Nigeria / UAE",
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200",
    metrics: "Speaker Kit, Bio Packaging, LinkedIn 3x Growth",
  },
  {
    id: "work-3",
    title: "FinTech Conglomerate Visual System Refresh",
    client: "West Africa Payments Operator",
    pillar: "Corporate Identity",
    country: "Nigeria",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200",
    metrics: "Comprehensive Design Tokens & Brand Manual",
  },
  {
    id: "work-4",
    title: "Custom Athleisure & Merchandise Drop",
    client: "Championship Football Collective",
    pillar: "Merchandising",
    country: "United Kingdom",
    imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200",
    metrics: "1,500 Units Produced with Custom Emblems",
  },
  {
    id: "work-5",
    title: "Digital Performance Campaign Creative Assets",
    client: "Fitness & Lifestyle App",
    pillar: "Sports & Media",
    country: "United States",
    imageUrl: "https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=1200",
    metrics: "42 Dynamic Story & Feed Static Creative Assets",
  },
  {
    id: "work-6",
    title: "Founder Authority Media Packaging",
    client: "Tech Venture Accelerator",
    pillar: "Executive Branding",
    country: "Kenya / UK",
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200",
    metrics: "Keynote Visual Deck & International Press Kit",
  },
];

export default function DuzzaBrandingPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const portfolioRef = useRef<HTMLDivElement | null>(null);

  const [selectedPillar, setSelectedPillar] = useState<string>("ALL");
  const [hoveredPillar, setHoveredPillar] = useState<number | null>(null);

  const pillars = ["ALL", "Executive Branding", "Corporate Identity", "Sports & Media", "Merchandising"];

  const filteredWork = PORTFOLIO_ITEMS.filter((item) => {
    return selectedPillar === "ALL" || item.pillar === selectedPillar;
  });

  // GSAP Animations
  useGSAP(
    () => {
      if (!containerRef.current) return;
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".gsap-brand-badge",
        { opacity: 0, y: -25 },
        { opacity: 1, y: 0, duration: 0.65 }
      )
        .fromTo(
          ".gsap-brand-title",
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.3"
        )
        .fromTo(
          ".gsap-brand-desc",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.4"
        )
        .fromTo(
          ".gsap-brand-cta",
          { opacity: 0, y: 15, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1 },
          "-=0.3"
        );
    },
    { scope: containerRef }
  );

  const instagramUrl = "https://www.instagram.com/duzza_branding";

  return (
    <div ref={containerRef} className="bg-[#050B18] min-h-screen text-[#F1F5F9] font-sans selection:bg-[#D4AF37] selection:text-[#050B18]">
      {/* -------------------------------------------------------------------- */}
      {/* 1. CINEMATIC HERO SECTION                                            */}
      {/* -------------------------------------------------------------------- */}
      <section className="relative py-20 lg:py-28 border-b border-[#1B325C] overflow-hidden bg-gradient-to-b from-[#050B18] via-[#07132B] to-[#050B18]">
        {/* Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#38BDF8]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="gsap-brand-badge inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#091224] border border-[#D4AF37]/35 text-xs font-mono text-[#D4AF37] font-bold shadow-sm">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>DUZZA BRANDING • A SUBSIDIARY OF DUZZA LIMITED ®</span>
              </div>

              <h1 className="gsap-brand-title text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.05]">
                Digital & Merchandising Agency.{" "}
                <span className="text-gradient-gold font-light block sm:inline">
                  Executive Branding Authority.
                </span>
              </h1>

              <p className="gsap-brand-desc text-base sm:text-lg text-[#CBD5E1]/90 leading-relaxed font-light">
                Engineering magnetic executive presence, enterprise design systems, Instagram & Facebook sponsored 
                advertising campaigns, and custom high-volume sports merchandise pipelines.
              </p>

              {/* Official Instagram Bio Strip */}
              <div className="p-4 rounded-2xl bg-[#091224] border border-[#1B325C] space-y-2.5 font-mono text-xs">
                <div className="flex items-center justify-between text-[#CBD5E1]">
                  <span className="font-bold text-white flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>@duzza_branding (Official Agency Desk)</span>
                  </span>
                  <a
                    href="mailto:duzzacontact@gmail.com"
                    className="text-[#D4AF37] hover:underline font-bold"
                  >
                    duzzacontact@gmail.com
                  </a>
                </div>
                <div className="flex flex-wrap gap-2 text-[11px] text-[#CBD5E1] pt-1">
                  <span className="px-2.5 py-1 rounded-md bg-[#0E1B33] border border-[#1B325C]">✓ Digital & Merchandising</span>
                  <span className="px-2.5 py-1 rounded-md bg-[#0E1B33] border border-[#1B325C]">✓ Executive Branding</span>
                  <span className="px-2.5 py-1 rounded-md bg-[#0E1B33] border border-[#1B325C]">✓ IG & Facebook Ads</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#brief-section"
                  className="btn-brand-primary gsap-brand-cta px-7 py-4 rounded-xl text-[#050B18] font-extrabold text-xs uppercase tracking-widest transition-all shadow-md flex items-center space-x-2 group cursor-pointer"
                >
                  <span>Start a Branding Project</span>
                  <ArrowRight className="w-4 h-4 text-[#050B18] group-hover:translate-x-1.5 transition-transform" />
                </a>

                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gsap-brand-cta px-6 py-4 rounded-xl bg-[#091224] text-white font-semibold text-xs uppercase tracking-wider hover:bg-[#0E1B33] border border-[#1B325C] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all inline-flex items-center space-x-2 shadow-sm"
                >
                  <span>Instagram @duzza_branding</span>
                  <ExternalLink className="w-4 h-4 text-[#38BDF8]" />
                </a>
              </div>
            </div>

            {/* Right Column: 3D Holographic Identity Prism */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl border border-[#1B325C] bg-[#091224] p-4 shadow-2xl">
                <Branding3DPrism />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 1B. OFFICIAL INSTAGRAM HIGHLIGHTS HUD (@duzza_branding)             */}
      {/* -------------------------------------------------------------------- */}
      <section className="py-8 bg-[#070E1E] border-b border-[#1B325C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 overflow-x-auto pb-2 scrollbar-none">
            {/* Highlight 1: Reviews */}
            <div className="flex flex-col items-center space-y-2 min-w-[80px] group cursor-pointer">
              <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-[#D4AF37] via-[#0284C7] to-[#38BDF8] group-hover:scale-105 transition-transform shadow-md">
                <div className="w-full h-full rounded-full bg-[#050B18] p-1 flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-[#091224] text-[#D4AF37] flex items-center justify-center font-bold text-xs">
                    ★★★★★
                  </div>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-white group-hover:text-[#D4AF37]">Reviews</span>
            </div>

            {/* Highlight 2: Portfolio */}
            <div className="flex flex-col items-center space-y-2 min-w-[80px] group cursor-pointer">
              <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-[#D4AF37] via-[#0284C7] to-[#38BDF8] group-hover:scale-105 transition-transform shadow-md">
                <div className="w-full h-full rounded-full bg-[#050B18] p-1 flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-[#091224] text-[#38BDF8] flex items-center justify-center font-bold text-xs">
                    WORK
                  </div>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-white group-hover:text-[#D4AF37]">Portfolio</span>
            </div>

            {/* Highlight 3: Tips */}
            <div className="flex flex-col items-center space-y-2 min-w-[80px] group cursor-pointer">
              <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-[#D4AF37] via-[#0284C7] to-[#38BDF8] group-hover:scale-105 transition-transform shadow-md">
                <div className="w-full h-full rounded-full bg-[#050B18] p-1 flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-[#091224] text-amber-300 flex items-center justify-center font-bold text-sm">
                    💡
                  </div>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-white group-hover:text-[#D4AF37]">Tips</span>
            </div>

            {/* Highlight 4: Our Clients */}
            <div className="flex flex-col items-center space-y-2 min-w-[80px] group cursor-pointer">
              <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-[#D4AF37] via-[#0284C7] to-[#38BDF8] group-hover:scale-105 transition-transform shadow-md">
                <div className="w-full h-full rounded-full bg-[#050B18] p-1 flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-[#091224] text-emerald-300 flex items-center justify-center font-bold text-sm">
                    👥
                  </div>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-white group-hover:text-[#D4AF37]">Our Clients</span>
            </div>

            {/* Highlight 5: About Us */}
            <div className="flex flex-col items-center space-y-2 min-w-[80px] group cursor-pointer">
              <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-[#D4AF37] via-[#0284C7] to-[#38BDF8] group-hover:scale-105 transition-transform shadow-md">
                <div className="w-full h-full rounded-full bg-[#050B18] p-1 flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-[#091224] text-[#E5C378] flex items-center justify-center font-bold text-xs">
                    DUZZA
                  </div>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-white group-hover:text-[#D4AF37]">About Us</span>
            </div>

            {/* Direct Official Desk Link */}
            <div className="hidden md:flex flex-col items-end pl-6 border-l border-[#1B325C] text-xs font-mono space-y-1">
              <span className="text-[#94A3B8] font-semibold">Official Channels:</span>
              <span className="font-bold text-white">IG: @duzza_branding</span>
              <span className="text-[#D4AF37] font-bold">Email: duzzacontact@gmail.com</span>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 2. INTERACTIVE 4-PILLAR SERVICE EXPANDABLE GRID (GSAP)               */}
      {/* -------------------------------------------------------------------- */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold">
            Comprehensive Disciplines
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
            The 4 Creative Pillars
          </h2>
          <p className="text-xs sm:text-sm text-[#CBD5E1]/90 font-light">
            Hover over any pillar to view scope, turnarounds, and delivered outputs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1 */}
          <div
            onMouseEnter={() => setHoveredPillar(1)}
            onMouseLeave={() => setHoveredPillar(null)}
            className="gsap-pillar-card p-8 rounded-2xl bg-[#091224] border border-[#1B325C] hover:border-[#D4AF37]/60 hover:shadow-xl transition-all duration-300 space-y-4 cursor-default group shadow-md"
          >
            <div className="p-3 w-fit rounded-xl bg-[#0E1B33] border border-[#1B325C] text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#050B18] transition-all">
              <Crown className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl text-white group-hover:text-[#D4AF37] transition-colors">
              Executive Branding
            </h3>
            <p className="text-xs text-[#CBD5E1]/80 leading-relaxed font-light">
              Personal brand architecture for C-suite leaders and founders. Editorial imagery, bio packaging, 
              LinkedIn design systems, and international speaker kits.
            </p>
            <div className={`space-y-2 pt-2 border-t border-[#1B325C] text-[11px] font-mono text-[#CBD5E1] transition-all ${hoveredPillar === 1 ? "opacity-100 max-h-40" : "opacity-70 max-h-24 overflow-hidden"}`}>
              <div className="text-[#D4AF37] font-bold">✓ C-Suite Bio & Press Kit</div>
              <div>✓ LinkedIn Profile Redesign</div>
              <div>✓ Keynote Presentation Deck</div>
              <div>✓ Typical Turnaround: 2–3 Weeks</div>
            </div>
          </div>

          {/* Pillar 2 */}
          <div
            onMouseEnter={() => setHoveredPillar(2)}
            onMouseLeave={() => setHoveredPillar(null)}
            className="gsap-pillar-card p-8 rounded-2xl bg-[#091224] border border-[#1B325C] hover:border-[#D4AF37]/60 hover:shadow-xl transition-all duration-300 space-y-4 cursor-default group shadow-md"
          >
            <div className="p-3 w-fit rounded-xl bg-[#0E1B33] border border-[#1B325C] text-[#38BDF8] group-hover:bg-[#38BDF8] group-hover:text-[#050B18] transition-all">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl text-white group-hover:text-[#38BDF8] transition-colors">
              Corporate & Digital
            </h3>
            <p className="text-xs text-[#CBD5E1]/80 leading-relaxed font-light">
              Comprehensive brand manuals, dynamic vector logomarks, typography hierarchies, 
              digital design tokens, and marketing visual systems.
            </p>
            <div className={`space-y-2 pt-2 border-t border-[#1B325C] text-[11px] font-mono text-[#CBD5E1] transition-all ${hoveredPillar === 2 ? "opacity-100 max-h-40" : "opacity-70 max-h-24 overflow-hidden"}`}>
              <div className="text-[#38BDF8] font-bold">✓ Complete Brand Guidelines</div>
              <div>✓ Vector Asset Suites (SVG/PNG)</div>
              <div>✓ Social Media Design Systems</div>
              <div>✓ Typical Turnaround: 3–4 Weeks</div>
            </div>
          </div>

          {/* Pillar 3 */}
          <div
            onMouseEnter={() => setHoveredPillar(3)}
            onMouseLeave={() => setHoveredPillar(null)}
            className="gsap-pillar-card p-8 rounded-2xl bg-[#091224] border border-[#1B325C] hover:border-[#D4AF37]/60 hover:shadow-xl transition-all duration-300 space-y-4 cursor-default group shadow-md"
          >
            <div className="p-3 w-fit rounded-xl bg-[#0E1B33] border border-[#1B325C] text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#050B18] transition-all">
              <Tv className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl text-white group-hover:text-[#D4AF37] transition-colors">
              Sports & Creative Media
            </h3>
            <p className="text-xs text-[#CBD5E1]/80 leading-relaxed font-light">
              User-generated content (UGC) reels, static promotional graphics, game-day assets, 
              and content calendars for international sports franchises.
            </p>
            <div className={`space-y-2 pt-2 border-t border-[#1B325C] text-[11px] font-mono text-[#CBD5E1] transition-all ${hoveredPillar === 3 ? "opacity-100 max-h-40" : "opacity-70 max-h-24 overflow-hidden"}`}>
              <div className="text-[#D4AF37] font-bold">✓ 48-Hour Rapid Video Turnaround</div>
              <div>✓ Game-Day Creative Packages</div>
              <div>✓ High-Volume UGC Reels</div>
              <div>✓ Delivered to UK & International Teams</div>
            </div>
          </div>

          {/* Pillar 4 */}
          <div
            onMouseEnter={() => setHoveredPillar(4)}
            onMouseLeave={() => setHoveredPillar(null)}
            className="gsap-pillar-card p-8 rounded-2xl bg-[#091224] border border-[#1B325C] hover:border-[#D4AF37]/60 hover:shadow-xl transition-all duration-300 space-y-4 cursor-default group shadow-md"
          >
            <div className="p-3 w-fit rounded-xl bg-[#0E1B33] border border-[#1B325C] text-[#E5C378] group-hover:bg-[#E5C378] group-hover:text-[#050B18] transition-all">
              <Shirt className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl text-white group-hover:text-[#E5C378] transition-colors">
              Global Merchandising
            </h3>
            <p className="text-xs text-[#CBD5E1]/80 leading-relaxed font-light">
              Concept-to-production customized apparel, team kits, premium packaging, 
              and promotional merchandise engineered for durability and luxury touch.
            </p>
            <div className={`space-y-2 pt-2 border-t border-[#1B325C] text-[11px] font-mono text-[#CBD5E1] transition-all ${hoveredPillar === 4 ? "opacity-100 max-h-40" : "opacity-70 max-h-24 overflow-hidden"}`}>
              <div className="text-[#E5C378] font-bold">✓ Custom Athleisure & Polos</div>
              <div>✓ Emblems & Embossed Detailing</div>
              <div>✓ Quality Sample Prototyping</div>
              <div>✓ International Freight Logistics</div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 3. 'SELECTED WORK' FILTERABLE PORTFOLIO GRID                         */}
      {/* -------------------------------------------------------------------- */}
      <section className="py-20 bg-[#070E1E] border-y border-[#1B325C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold block">
                Portfolio Showcase
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mt-1">
                Selected Work & Campaign Case Studies
              </h2>
            </div>

            {/* Instant Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {pillars.map((pillar) => (
                <button
                  key={pillar}
                  onClick={() => setSelectedPillar(pillar)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedPillar === pillar
                      ? "btn-brand-primary text-[#050B18] font-extrabold shadow-md"
                      : "bg-[#091224] text-[#CBD5E1] hover:text-white border border-[#1B325C] hover:border-[#D4AF37]"
                  }`}
                >
                  {pillar}
                </button>
              ))}
            </div>
          </div>

          {/* Portfolio Grid */}
          <div ref={portfolioRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWork.map((item) => (
              <div
                key={item.id}
                className="gsap-portfolio-card rounded-2xl overflow-hidden bg-[#091224] border border-[#1B325C] group hover:border-[#D4AF37]/60 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between shadow-md"
              >
                <div>
                  <div className="relative h-60 w-full overflow-hidden bg-[#050B18]">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#091224] via-transparent to-transparent pointer-events-none" />
                    <span className="absolute top-3 left-3 text-[10px] font-mono uppercase px-2.5 py-1 rounded bg-[#050B18]/90 text-[#38BDF8] font-bold shadow-md border border-[#1B325C]">
                      {item.pillar}
                    </span>
                    <span className="absolute top-3 right-3 text-[10px] font-mono px-2 py-1 rounded bg-[#050B18]/90 text-[#CBD5E1] shadow-sm border border-[#1B325C]">
                      {item.country}
                    </span>
                  </div>

                  <div className="p-6 space-y-2">
                    <span className="text-[11px] font-mono text-[#D4AF37] font-semibold block">{item.client}</span>
                    <h3 className="font-display font-bold text-lg text-white group-hover:text-[#D4AF37] transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className="p-4 bg-[#0E1B33] border-t border-[#1B325C] flex items-center justify-between text-xs font-mono text-[#CBD5E1]">
                  <span className="text-[#38BDF8] font-semibold">{item.metrics}</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 4. 'SPORTS & INTERNATIONAL WORK' GLOBAL REACH BLOCK                  */}
      {/* -------------------------------------------------------------------- */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="rounded-3xl bg-[#091224] border border-[#1B325C] p-8 lg:p-14 space-y-10 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold block">
                Worldwide Footprint
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
                Global Sports Brands & International Media
              </h2>
              <p className="text-xs sm:text-sm text-[#CBD5E1]/90 leading-relaxed font-light">
                Operating a decoupled creative production pipeline delivering daily UGC reels, matchday campaigns, 
                and promotional collateral to sports collectives across multiple time zones.
              </p>
            </div>

            <div className="shrink-0">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brand-primary inline-flex items-center space-x-2 px-5 py-3 rounded-xl text-[#050B18] font-extrabold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
              >
                <span>Curated Reels on @duzza_branding</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#050B18]" />
              </a>
            </div>
          </div>

          {/* Metrics Counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-[#0E1B33] border border-[#1B325C] shadow-md">
              <span className="block text-3xl sm:text-4xl font-display font-extrabold text-[#D4AF37]">
                12+
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-[#94A3B8] mt-2 block font-medium">
                Countries Served
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-[#0E1B33] border border-[#1B325C] shadow-md">
              <span className="block text-3xl sm:text-4xl font-display font-extrabold text-[#38BDF8]">
                4.8M+
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-[#94A3B8] mt-2 block font-medium">
                Content Views Generated
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-[#0E1B33] border border-[#1B325C] shadow-md">
              <span className="block text-3xl sm:text-4xl font-display font-extrabold text-white">
                150+
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-[#94A3B8] mt-2 block font-medium">
                Creative Assets Delivered
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-[#0E1B33] border border-[#1B325C] shadow-md">
              <span className="block text-3xl sm:text-4xl font-display font-extrabold text-[#D4AF37]">
                48h
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-[#94A3B8] mt-2 block font-medium">
                Rapid UGC Turnaround
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 5. BRANDING BRIEF FORM CONTAINER                                     */}
      {/* -------------------------------------------------------------------- */}
      <section id="brief-section" className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <BrandingBriefForm />
      </section>
    </div>
  );
}
