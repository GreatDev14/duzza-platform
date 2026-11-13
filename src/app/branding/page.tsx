"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Sparkles, 
  Crown, 
  Layers, 
  Tv, 
  Shirt, 
  ArrowRight, 
  ExternalLink, 
  Globe2, 
  TrendingUp, 
  CheckCircle2, 
  Zap, 
  Play, 
  Filter 
} from "lucide-react";
import BrandingBriefForm from "@/components/branding/BrandingBriefForm";
import Branding3DPrism from "@/components/animation/Branding3DPrism";
import Tilt3DCard from "@/components/animation/Tilt3DCard";
import { gsap, useGSAP } from "@/lib/animations/gsap";

interface WorkItem {
  id: string;
  title: string;
  client: string;
  pillar: "Executive Branding" | "Corporate Identity" | "Sports & Media" | "Merchandising";
  country: string;
  imageUrl: string;
  metrics: string;
}

const PORTFOLIO_ITEMS: WorkItem[] = [
  {
    id: "work-1",
    title: "Global Sports Franchise UGC Campaign",
    client: "International Sports Brand",
    pillar: "Sports & Media",
    country: "United Kingdom",
    imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200",
    metrics: "+1.2M TikTok & Reel Views in 14 Days",
  },
  {
    id: "work-2",
    title: "Executive Personal Identity Architecture",
    client: "Private Equity Managing Partner",
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
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.1 },
          "-=0.3"
        )
        .fromTo(
          ".gsap-pillar-card",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 },
          "-=0.2"
        );
    },
    { scope: containerRef }
  );

  useGSAP(
    () => {
      if (!portfolioRef.current) return;
      gsap.fromTo(
        portfolioRef.current.querySelectorAll(".gsap-portfolio-card"),
        { opacity: 0, y: 30, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.1, ease: "power2.out" }
      );
    },
    { dependencies: [selectedPillar], scope: portfolioRef }
  );

  const instagramUrl = "https://www.instagram.com/duzza_branding";
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2348030000000";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hello%20Duzza%20Branding,%20I%20would%20like%20to%20discuss%20a%20creative%20branding%20project.`;

  return (
    <div ref={containerRef} className="bg-[#140A05] min-h-screen text-[#F5EBE1] font-sans selection:bg-[#D4AF37] selection:text-[#140A05]">
      {/* -------------------------------------------------------------------- */}
      {/* 1. CINEMATIC HERO SECTION (GILDED OBSIDIAN & GOLD)                   */}
      {/* -------------------------------------------------------------------- */}
      <section className="relative py-20 lg:py-28 border-b border-[#3D2415] overflow-hidden bg-gradient-to-b from-[#1C110A] via-[#140A05] to-[#140A05]">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="gsap-brand-badge inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1C110A] border border-[#D4AF37]/30 text-xs font-mono text-[#D4AF37] font-bold shadow-sm">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>DUZZA BRANDING • A SUBSIDIARY OF DUZZA LIMITED ®</span>
              </div>

              <h1 className="gsap-brand-title text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-[#FFF6DE] tracking-tight leading-[1.05]">
                Digital & Merchandising Agency.{" "}
                <span className="text-gradient-blue font-light block sm:inline">
                  Executive Branding Authority.
                </span>
              </h1>

              <p className="gsap-brand-desc text-base sm:text-lg text-slate-600 leading-relaxed font-light">
                Engineering magnetic executive presence, enterprise design systems, Instagram & Facebook sponsored 
                advertising campaigns, and custom high-volume sports merchandise pipelines.
              </p>

              {/* Official Instagram Bio Strip */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 font-mono text-xs">
                <div className="flex items-center justify-between text-slate-700">
                  <span className="font-bold text-navy-950 flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>@duzza_branding (Official Agency Desk)</span>
                  </span>
                  <a
                    href="mailto:duzzacontact@gmail.com"
                    className="text-brandBlue-600 hover:underline font-bold"
                  >
                    duzzacontact@gmail.com
                  </a>
                </div>
                <div className="flex flex-wrap gap-2 text-[11px] text-slate-600 pt-1">
                  <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200">✓ Digital & Merchandising</span>
                  <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200">✓ Executive Branding</span>
                  <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200">✓ IG & Facebook Ads</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#brief-section"
                  className="gsap-brand-cta px-7 py-4 rounded-xl bg-brandBlue-600 text-white font-extrabold text-xs uppercase tracking-widest hover:bg-brandBlue-700 transition-all shadow-md shadow-brandBlue-600/25 flex items-center space-x-2 group shimmer-button"
                >
                  <span>Start a Branding Project</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </a>

                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gsap-brand-cta px-6 py-4 rounded-xl bg-white text-navy-950 font-semibold text-xs uppercase tracking-wider hover:bg-slate-50 border border-slate-300 hover:border-emerald-500 hover:text-emerald-700 transition-all inline-flex items-center space-x-2 shadow-sm"
                >
                  <span>Instagram @duzza_branding</span>
                  <ExternalLink className="w-4 h-4 text-emerald-600" />
                </a>
              </div>
            </div>

            {/* Right Column: 3D Holographic Identity Prism */}
            <div className="lg:col-span-6">
              <Branding3DPrism />
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 1B. OFFICIAL INSTAGRAM HIGHLIGHTS HUD (@duzza_branding)             */}
      {/* -------------------------------------------------------------------- */}
      <section className="py-8 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 overflow-x-auto pb-2 scrollbar-none">
            {/* Highlight 1: Reviews */}
            <div className="flex flex-col items-center space-y-2 min-w-[80px] group cursor-pointer">
              <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 group-hover:scale-105 transition-transform shadow-md">
                <div className="w-full h-full rounded-full bg-white p-1 flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-slate-900 text-amber-300 flex items-center justify-center font-bold text-xs">
                    ★★★★★
                  </div>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-navy-950 group-hover:text-brandBlue-600">Reviews</span>
            </div>

            {/* Highlight 2: Portfolio */}
            <div className="flex flex-col items-center space-y-2 min-w-[80px] group cursor-pointer">
              <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 group-hover:scale-105 transition-transform shadow-md">
                <div className="w-full h-full rounded-full bg-white p-1 flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-slate-900 text-cyan-300 flex items-center justify-center font-bold text-xs">
                    WORK
                  </div>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-navy-950 group-hover:text-brandBlue-600">Portfolio</span>
            </div>

            {/* Highlight 3: Tips */}
            <div className="flex flex-col items-center space-y-2 min-w-[80px] group cursor-pointer">
              <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 group-hover:scale-105 transition-transform shadow-md">
                <div className="w-full h-full rounded-full bg-white p-1 flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-slate-900 text-yellow-300 flex items-center justify-center font-bold text-sm">
                    💡
                  </div>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-navy-950 group-hover:text-brandBlue-600">Tips</span>
            </div>

            {/* Highlight 4: Our Clients */}
            <div className="flex flex-col items-center space-y-2 min-w-[80px] group cursor-pointer">
              <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 group-hover:scale-105 transition-transform shadow-md">
                <div className="w-full h-full rounded-full bg-white p-1 flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-slate-900 text-emerald-300 flex items-center justify-center font-bold text-sm">
                    👥
                  </div>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-navy-950 group-hover:text-brandBlue-600">Our Clients</span>
            </div>

            {/* Highlight 5: About Us */}
            <div className="flex flex-col items-center space-y-2 min-w-[80px] group cursor-pointer">
              <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 group-hover:scale-105 transition-transform shadow-md">
                <div className="w-full h-full rounded-full bg-white p-1 flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-slate-900 text-rose-300 flex items-center justify-center font-bold text-xs">
                    DUZZA
                  </div>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-navy-950 group-hover:text-brandBlue-600">About Us</span>
            </div>

            {/* Direct Official Desk Link */}
            <div className="hidden md:flex flex-col items-end pl-6 border-l border-slate-300 text-xs font-mono space-y-1">
              <span className="text-slate-500 font-semibold">Official Channels:</span>
              <span className="font-bold text-navy-950">IG: @duzza_branding</span>
              <span className="text-brandBlue-600 font-bold">Email: duzzacontact@gmail.com</span>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 2. INTERACTIVE 4-PILLAR SERVICE EXPANDABLE GRID (GSAP)               */}
      {/* -------------------------------------------------------------------- */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-bold">
            Comprehensive Disciplines
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-navy-950">
            The 4 Creative Pillars
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-light">
            Hover over any pillar to view scope, turnarounds, and delivered outputs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1 */}
          <div
            onMouseEnter={() => setHoveredPillar(1)}
            onMouseLeave={() => setHoveredPillar(null)}
            className="gsap-pillar-card p-8 rounded-2xl bg-white border border-slate-200 hover:border-brandBlue-400 hover:shadow-xl transition-all duration-300 space-y-4 cursor-default group shadow-sm"
          >
            <div className="p-3 w-fit rounded-xl bg-brandBlue-50 border border-brandBlue-200 text-brandBlue-600 group-hover:bg-brandBlue-600 group-hover:text-white transition-all">
              <Crown className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl text-navy-950 group-hover:text-brandBlue-600 transition-colors">
              Executive Branding
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              Personal brand architecture for C-suite leaders and founders. Editorial imagery, bio packaging, 
              LinkedIn design systems, and international speaker kits.
            </p>
            <div className={`space-y-2 pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-600 transition-all ${hoveredPillar === 1 ? "opacity-100 max-h-40" : "opacity-70 max-h-24 overflow-hidden"}`}>
              <div className="text-brandBlue-600 font-bold">✓ C-Suite Bio & Press Kit</div>
              <div>✓ LinkedIn Profile Redesign</div>
              <div>✓ Keynote Presentation Deck</div>
              <div>✓ Typical Turnaround: 2–3 Weeks</div>
            </div>
          </div>

          {/* Pillar 2 */}
          <div
            onMouseEnter={() => setHoveredPillar(2)}
            onMouseLeave={() => setHoveredPillar(null)}
            className="gsap-pillar-card p-8 rounded-2xl bg-white border border-slate-200 hover:border-brandBlue-400 hover:shadow-xl transition-all duration-300 space-y-4 cursor-default group shadow-sm"
          >
            <div className="p-3 w-fit rounded-xl bg-brandBlue-50 border border-brandBlue-200 text-brandBlue-600 group-hover:bg-brandBlue-600 group-hover:text-white transition-all">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl text-navy-950 group-hover:text-brandBlue-600 transition-colors">
              Corporate & Digital
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              Comprehensive brand manuals, dynamic vector logomarks, typography hierarchies, 
              digital design tokens, and marketing visual systems.
            </p>
            <div className={`space-y-2 pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-600 transition-all ${hoveredPillar === 2 ? "opacity-100 max-h-40" : "opacity-70 max-h-24 overflow-hidden"}`}>
              <div className="text-brandBlue-600 font-bold">✓ Complete Brand Guidelines</div>
              <div>✓ Vector Asset Suites (SVG/PNG)</div>
              <div>✓ Social Media Design Systems</div>
              <div>✓ Typical Turnaround: 3–4 Weeks</div>
            </div>
          </div>

          {/* Pillar 3 */}
          <div
            onMouseEnter={() => setHoveredPillar(3)}
            onMouseLeave={() => setHoveredPillar(null)}
            className="gsap-pillar-card p-8 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-xl transition-all duration-300 space-y-4 cursor-default group shadow-sm"
          >
            <div className="p-3 w-fit rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
              <Tv className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl text-navy-950 group-hover:text-emerald-600 transition-colors">
              Sports & Creative Media
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              User-generated content (UGC) reels, static promotional graphics, game-day assets, 
              and content calendars for international sports franchises.
            </p>
            <div className={`space-y-2 pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-600 transition-all ${hoveredPillar === 3 ? "opacity-100 max-h-40" : "opacity-70 max-h-24 overflow-hidden"}`}>
              <div className="text-emerald-600 font-bold">✓ 48-Hour Rapid Video Turnaround</div>
              <div>✓ Game-Day Creative Packages</div>
              <div>✓ High-Volume UGC Reels</div>
              <div>✓ Delivered to UK & International Teams</div>
            </div>
          </div>

          {/* Pillar 4 */}
          <div
            onMouseEnter={() => setHoveredPillar(4)}
            onMouseLeave={() => setHoveredPillar(null)}
            className="gsap-pillar-card p-8 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-xl transition-all duration-300 space-y-4 cursor-default group shadow-sm"
          >
            <div className="p-3 w-fit rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
              <Shirt className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl text-navy-950 group-hover:text-emerald-600 transition-colors">
              Global Merchandising
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              Concept-to-production customized apparel, team kits, premium packaging, 
              and promotional merchandise engineered for durability and luxury touch.
            </p>
            <div className={`space-y-2 pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-600 transition-all ${hoveredPillar === 4 ? "opacity-100 max-h-40" : "opacity-70 max-h-24 overflow-hidden"}`}>
              <div className="text-emerald-600 font-bold">✓ Custom Athleisure & Polos</div>
              <div>✓ Emblems & Embossed Detailing</div>
              <div>✓ Quality Sample Prototyping</div>
              <div>✓ International Freight Logistics</div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 3. 'SELECTED WORK' FILTERABLE PORTFOLIO GRID (GSAP)                  */}
      {/* -------------------------------------------------------------------- */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-bold block">
                Portfolio Showcase
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-navy-950 mt-1">
                Selected Work & Campaign Case Studies
              </h2>
            </div>

            {/* Instant Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {pillars.map((pillar) => (
                <button
                  key={pillar}
                  onClick={() => setSelectedPillar(pillar)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedPillar === pillar
                      ? "bg-brandBlue-600 text-white font-extrabold shadow-md shadow-brandBlue-600/20"
                      : "bg-white text-slate-700 hover:text-navy-950 border border-slate-200 hover:border-brandBlue-300"
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
                className="gsap-portfolio-card rounded-2xl overflow-hidden bg-white border border-slate-200 group hover:border-brandBlue-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    <span className="absolute top-3 left-3 text-[10px] font-mono uppercase px-2.5 py-1 rounded bg-white/90 text-navy-950 font-bold shadow-md">
                      {item.pillar}
                    </span>
                    <span className="absolute top-3 right-3 text-[10px] font-mono px-2 py-1 rounded bg-white/90 text-slate-700 shadow-sm">
                      {item.country}
                    </span>
                  </div>

                  <div className="p-6 space-y-2">
                    <span className="text-[11px] font-mono text-brandBlue-600 font-semibold block">{item.client}</span>
                    <h3 className="font-display font-bold text-lg text-navy-950 group-hover:text-brandBlue-600 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs font-mono text-slate-800">
                  <span className="text-emerald-700 font-semibold">{item.metrics}</span>
                  <ArrowRight className="w-4 h-4 text-brandBlue-600 group-hover:translate-x-1 transition-transform" />
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
        <div className="rounded-3xl bg-slate-50 border border-slate-200 p-8 lg:p-14 space-y-10 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-brandBlue-600 font-bold block">
                Worldwide Footprint
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-navy-950">
                Global Sports Brands & International Media
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                Operating a decoupled creative production pipeline delivering daily UGC reels, matchday campaigns, 
                and promotional collateral to sports collectives across multiple time zones.
              </p>
            </div>

            <div className="shrink-0">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-brandBlue-600 text-white font-extrabold text-xs uppercase tracking-wider hover:bg-brandBlue-700 transition-all shadow-md shadow-brandBlue-600/20"
              >
                <span>Curated Reels on @duzza_branding</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Metrics Counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <span className="block text-3xl sm:text-4xl font-display font-extrabold text-brandBlue-600">
                12+
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-600 mt-2 block font-medium">
                Countries Served
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <span className="block text-3xl sm:text-4xl font-display font-extrabold text-brandBlue-600">
                4.8M+
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-600 mt-2 block font-medium">
                Content Views Generated
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <span className="block text-3xl sm:text-4xl font-display font-extrabold text-brandBlue-600">
                150+
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-600 mt-2 block font-medium">
                Creative Assets Delivered
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <span className="block text-3xl sm:text-4xl font-display font-extrabold text-brandBlue-600">
                48h
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-600 mt-2 block font-medium">
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
