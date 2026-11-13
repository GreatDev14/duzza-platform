"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Compass, 
  Sparkles, 
  Shirt, 
  UtensilsCrossed, 
  ArrowRight, 
  ExternalLink, 
  CheckCircle2, 
  MapPin, 
  Mail, 
  Instagram,
  ShieldCheck,
  Building2
} from "lucide-react";
import Tilt3DCard from "@/components/animation/Tilt3DCard";

interface DivisionItem {
  id: string;
  name: string;
  tagline: string;
  category: string;
  badgeColor: string;
  borderColor: string;
  description: string;
  image: string;
  capabilities: string[];
  primaryLink: string;
  primaryLinkText: string;
  contactNote: string;
  externalLink?: string;
  externalLinkText?: string;
  status: "ACTIVE VERTICAL" | "INCUBATING CAPSULE";
}

const OPERATING_DIVISIONS: DivisionItem[] = [
  {
    id: "projects",
    name: "DUZZA PROJECTS",
    tagline: "Marine Hydrospatial Survey & Heavy Civil Engineering",
    category: "B2B Infrastructure & Geomatics",
    badgeColor: "bg-[#FAF7F2] text-[#8B5A2B] border-[#EADCCB]",
    borderColor: "hover:border-[#D4AF37] hover:shadow-[0_0_25px_rgba(212,175,55,0.2)]",
    description: "Delivering mission-critical bathymetric charting, multibeam sonar surveys, DGPS hydrospatial positioning, oil & gas facility maintenance, and turnkey civil foundations across the Niger Delta.",
    // Real High-Resolution Marine Hydrographic Survey Vessel & Engineering Photography
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85",
    capabilities: [
      "Multibeam Sonar & Acoustic Seabed Mapping",
      "Marine Survey Vessel & Hydrographic Equipment Hire",
      "Subsea Pipeline Burial Depth & Geotechnical Profiling",
      "Turnkey Civil Foundations, Concrete & Shore Protection"
    ],
    primaryLink: "/projects",
    primaryLinkText: "Enter Duzza Projects",
    contactNote: "Warri Logistics Base • Delta State",
    externalLink: "/projects/equipment",
    externalLinkText: "View Equipment Fleet →",
    status: "ACTIVE VERTICAL"
  },
  {
    id: "branding",
    name: "DUZZA BRANDING",
    tagline: "Digital, Merchandising & Executive Branding Agency",
    category: "..a subsidiary of Duzza Limited ®",
    badgeColor: "bg-[#FDFBF7] text-[#B88E4F] border-[#EADCCB]",
    borderColor: "hover:border-[#D4AF37] hover:shadow-[0_0_25px_rgba(212,175,55,0.2)]",
    description: "High-octane creative production studio engineering magnetic executive identity, scalable corporate design systems, Meta/IG sponsored advertisement pipelines, and global sports merchandise drops.",
    // Real High-Resolution Creative Agency & Executive Design Studio Photography
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=85",
    capabilities: [
      "Executive Personal Identity & Speaker Kit Architecture",
      "Digital Design Systems & High-Converting Web UI/UX",
      "Instagram & Facebook Sponsored Ads & Performance Media",
      "Custom Sports Apparel, Kits & Merchandising Production"
    ],
    primaryLink: "/branding",
    primaryLinkText: "Enter Duzza Branding",
    contactNote: "📧 duzzacontact@gmail.com",
    externalLink: "https://www.instagram.com/duzza_branding",
    externalLinkText: "Instagram @duzza_branding →",
    status: "ACTIVE VERTICAL"
  },
  {
    id: "fashion",
    name: "DUZZA FASHION",
    tagline: "Artisanal English Tailoring & Contemporary African Couture",
    category: "Luxury Apparel & Leatherworks",
    badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
    borderColor: "hover:border-rose-400",
    description: "Where bespoke Savile Row structure fuses with artisanal Nigerian brocade, hand-dyed cotton, and luxury leathercraft. Curated English suits, bespoke contemporary Ankara couture, and statement wearables.",
    // Real High-Resolution Luxury Tailoring & Couture Fashion Photography
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=85",
    capabilities: [
      "Bespoke English Tailoring & Structured Suiting",
      "Contemporary Artisanal Ankara Silk & Brocade Couture",
      "Handcrafted Leather Footwear & Luxury Goods",
      "VIP Private Client & Executive Wardrobe Styling"
    ],
    primaryLink: "/fashion",
    primaryLinkText: "Enter Duzza Fashion",
    contactNote: "Inaugural Capsule 2026",
    externalLink: "/fashion#waitlist-box",
    externalLinkText: "VIP Lookbook Waitlist →",
    status: "INCUBATING CAPSULE"
  },
  {
    id: "bakery",
    name: "DUZZA BAKERY & EATERY",
    tagline: "48-Hour Wild Yeast Sourdough & Gourmet Patisserie",
    category: "Culinary Hospitality & Confectionery",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
    borderColor: "hover:border-amber-400",
    description: "Dedicated to the art of traditional European breadmaking and Nigerian hospitality. Slow-fermented golden sourdough boules, flaky butter viennoiserie, custom celebration cakes, and casual bistro dining.",
    // Real High-Resolution Mouth-Watering Sourdough & Gourmet Pastry Photography
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=85",
    capabilities: [
      "48-Hour Cold-Fermented Country Sourdough Crusts",
      "Fresh Daily French Viennoiserie & Flaky Croissants",
      "Bespoke Multi-Tier Celebratory & Wedding Cakes",
      "Executive Corporate Catering & Gourmet Gift Hampers"
    ],
    primaryLink: "/bakery",
    primaryLinkText: "Enter Duzza Bakery",
    contactNote: "Warri Flagship Bakery",
    externalLink: "/bakery#waitlist-box",
    externalLinkText: "Reserve Tasting Invite →",
    status: "INCUBATING CAPSULE"
  }
];

interface OperatingDivisionsShowcaseProps {
  onOpenSpecialRequest?: () => void;
}

export default function OperatingDivisionsShowcase({ onOpenSpecialRequest }: OperatingDivisionsShowcaseProps) {
  return (
    <section id="duzza-operating-businesses" className="py-20 lg:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brandBlue-50 border border-brandBlue-200 text-xs font-mono text-brandBlue-700 font-bold">
              <Building2 className="w-3.5 h-3.5 text-brandBlue-600" />
              <span>DUZZA LIMITED • OPERATING CONGLOMERATE DIVISIONS</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-navy-950 tracking-tight leading-tight">
              All of Duzza’s Businesses Under One Roof.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-light">
              Explore our operating subsidiaries directly. Select any division below to enter its specialized portal, inspect equipment, review portfolios, or submit project briefs.
            </p>
          </div>

          {/* Special Client Request Button */}
          {onOpenSpecialRequest && (
            <button
              onClick={onOpenSpecialRequest}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-brandBlue-600 to-navy-900 text-white font-bold text-xs uppercase tracking-wider hover:shadow-xl hover:shadow-brandBlue-600/30 transition-all flex items-center space-x-2 shrink-0 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-cyan-300 animate-spin" />
              <span>Special Client Request</span>
            </button>
          )}
        </div>

        {/* 4 Large Visual Business Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {OPERATING_DIVISIONS.map((biz) => (
            <Tilt3DCard key={biz.id} maxTilt={6} scale={1.01}>
              <div
                className={`rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-md hover:shadow-2xl ${biz.borderColor} transition-all duration-300 flex flex-col justify-between h-full group`}
              >
                {/* 1. Real High-Definition Photo Container */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={biz.image}
                    alt={biz.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    priority={biz.id === "projects" || biz.id === "branding"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent" />

                  {/* Top Badge Overlay */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold border backdrop-blur-md bg-white/90 ${biz.badgeColor}`}>
                      {biz.category}
                    </span>
                    <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-navy-950/80 text-white border border-white/20 font-semibold backdrop-blur-md">
                      {biz.status}
                    </span>
                  </div>

                  {/* Bottom Image Caption */}
                  <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-white drop-shadow-md">
                      {biz.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-cyan-200 font-medium line-clamp-1 drop-shadow-sm">
                      {biz.tagline}
                    </p>
                  </div>
                </div>

                {/* 2. Business Description & Scope */}
                <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                    {biz.description}
                  </p>

                  {/* Bullet Capabilities */}
                  <div className="space-y-2.5 pt-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                      Core Scope & Deliverables
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 font-medium">
                      {biz.capabilities.map((cap, i) => (
                        <div key={i} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brandBlue-600 shrink-0 mt-0.5" />
                          <span className="leading-tight">{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Action Buttons (Direct Entry) */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <div className="text-[11px] font-mono text-slate-500 font-semibold">
                      {biz.contactNote}
                    </div>

                    <div className="flex items-center space-x-3">
                      {biz.externalLink && (
                        <Link
                          href={biz.externalLink}
                          target={biz.externalLink.startsWith("http") ? "_blank" : undefined}
                          rel={biz.externalLink.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-xs font-semibold text-slate-600 hover:text-brandBlue-600 transition-colors"
                        >
                          {biz.externalLinkText}
                        </Link>
                      )}

                      <Link
                        href={biz.primaryLink}
                        className="btn-brand-primary px-5 py-3 rounded-xl text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center space-x-2 group/btn shrink-0 cursor-pointer"
                      >
                        <span className="text-white font-bold">{biz.primaryLinkText}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#F3C966] group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Tilt3DCard>
          ))}
        </div>
      </div>
    </section>
  );
}

