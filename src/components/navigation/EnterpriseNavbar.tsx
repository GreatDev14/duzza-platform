"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Building2, 
  Compass, 
  Sparkles, 
  Shirt, 
  UtensilsCrossed, 
  Menu, 
  X, 
  PhoneCall, 
  ChevronDown,
  ArrowRight,
  FileText,
  Film,
  ShieldCheck
} from "lucide-react";
import SpecialClientRequestModal from "@/components/common/SpecialClientRequestModal";

export default function EnterpriseNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [specialRequestOpen, setSpecialRequestOpen] = useState(false);
  const pathname = usePathname();
  const megaMenuRef = useRef<HTMLDivElement | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMegaMenu = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setMegaMenuOpen(true);
  };

  const scheduleCloseMegaMenu = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 180);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target as Node)) {
        setMegaMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleOpenModal = () => setSpecialRequestOpen(true);
    window.addEventListener("duzza:open-special-request", handleOpenModal);
    return () => window.removeEventListener("duzza:open-special-request", handleOpenModal);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setMegaMenuOpen(false);
  }, [pathname]);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2348030000000";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hello%20Duzza%20Limited,%20I%20would%20like%20to%20make%20an%20inquiry.`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#050B18]/95 backdrop-blur-md border-b border-[#D4AF37]/25 py-2.5 shadow-lg shadow-black/60"
          : "bg-[#050B18]/85 backdrop-blur-sm border-b border-[#1B325C]/80 py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between gap-2">
          {/* Corporate Brand Identity Lockup (Prestige Midnight Navy & Pale Gold Glow) */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-2.5 group min-w-0 sm:shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] via-[#0284C7] to-[#050B18] p-0.5 flex items-center justify-center shadow-md shadow-[#D4AF37]/20 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.6)] transition-all duration-300 shrink-0">
              <div className="w-full h-full bg-[#091224] rounded-[10px] flex items-center justify-center font-display font-black text-[#D4AF37] group-hover:text-[#FFF8E7] text-sm sm:text-lg tracking-tighter transition-colors">
                DZ
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-display font-bold text-sm sm:text-lg tracking-wider text-[#F1F5F9] uppercase group-hover:text-[#D4AF37] transition-colors leading-tight truncate sm:whitespace-nowrap">
                DUZZA LIMITED
              </span>
              <span className="text-[8px] sm:text-[10px] tracking-widest text-[#D4AF37] uppercase font-mono font-semibold truncate sm:whitespace-nowrap">
                CAMA 2020 HOLDING GROUP
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-3 xl:space-x-6 shrink-0 whitespace-nowrap">
            <Link
              href="/"
              className={`text-xs xl:text-sm font-semibold transition-colors hover:text-[#D4AF37] ${
                pathname === "/" ? "text-[#D4AF37] font-bold" : "text-[#E2E8F0]/80"
              }`}
            >
              Corporate HQ
            </Link>

            {/* 'Our Businesses' Mega-Menu Hub */}
            <div 
              ref={megaMenuRef}
              className="relative"
              onMouseEnter={openMegaMenu}
              onMouseLeave={scheduleCloseMegaMenu}
            >
              <button
                type="button"
                onClick={() => setMegaMenuOpen((prev) => !prev)}
                className={`flex items-center space-x-1 text-xs xl:text-sm font-semibold transition-colors hover:text-[#D4AF37] focus:outline-none cursor-pointer py-1 ${
                  megaMenuOpen ? "text-[#D4AF37] font-bold" : "text-[#E2E8F0]/80"
                }`}
                aria-expanded={megaMenuOpen}
              >
                <span>Our Businesses</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${megaMenuOpen ? "rotate-180 text-[#D4AF37]" : ""}`} />
              </button>

              {/* Mega-Menu Container (100% Solid Midnight Navy & Pale Gold) */}
              {megaMenuOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[720px] z-[9999]">
                  <div 
                    style={{ backgroundColor: "#091224", opacity: 1 }}
                    className="mega-menu-solid rounded-2xl bg-[#091224] border border-[#D4AF37]/30 p-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] animate-in fade-in slide-in-from-top-2 duration-150"
                  >
                  <div className="grid grid-cols-2 gap-6 bg-[#091224]">
                    {/* Column 1: Active Divisions */}
                    <div className="space-y-4">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-[#D4AF37] font-semibold border-b border-[#1B325C] pb-2 flex items-center justify-between">
                        <span>Active Commercial Operations</span>
                        <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                      </div>

                      {/* Duzza Projects */}
                      <div className="p-3.5 rounded-xl hover:bg-[#0E1B33] border border-transparent hover:border-[#D4AF37]/40 transition-all duration-200 group bg-[#091224]">
                        <Link
                          href="/projects"
                          className="flex items-start space-x-3"
                        >
                          <div className="p-2.5 rounded-lg bg-[#0E1B33] border border-[#D4AF37]/30 text-[#D4AF37] mt-0.5 shrink-0 group-hover:bg-[#D4AF37] group-hover:text-[#050B18] transition-all">
                            <Compass className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-bold text-[#F1F5F9] group-hover:text-[#D4AF37] transition-colors">
                                Duzza Projects
                              </span>
                              <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-[#142547] text-[#D4AF37] border border-[#D4AF37]/40">
                                Active B2B
                              </span>
                            </div>
                            <p className="text-xs text-[#CBD5E1]/80 mt-1 leading-relaxed">
                              Civil construction, oil & gas support, bathymetric marine survey, and equipment hire.
                            </p>
                          </div>
                        </Link>
                        <div className="pl-11 mt-2 text-[11px]">
                          <Link href="/projects/equipment" className="text-[#D4AF37] hover:underline font-semibold">
                            → Marine Survey Equipment Catalog
                          </Link>
                        </div>
                      </div>

                      {/* Duzza Branding */}
                      <div className="p-3.5 rounded-xl hover:bg-[#0E1B33] border border-transparent hover:border-[#D4AF37]/40 transition-all duration-200 group bg-[#091224]">
                        <Link
                          href="/branding"
                          className="flex items-start space-x-3"
                        >
                          <div className="p-2.5 rounded-lg bg-[#0E1B33] border border-[#D4AF37]/30 text-[#D4AF37] mt-0.5 shrink-0 group-hover:bg-[#D4AF37] group-hover:text-[#050B18] transition-all">
                            <Sparkles className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-bold text-[#F1F5F9] group-hover:text-[#D4AF37] transition-colors">
                                Duzza Branding
                              </span>
                              <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-[#142547] text-[#D4AF37] border border-[#D4AF37]/40">
                                Active Agency
                              </span>
                            </div>
                            <p className="text-xs text-[#CBD5E1]/80 mt-1 leading-relaxed">
                              Executive identity, international sports media UGC, digital systems, and merchandising.
                            </p>
                          </div>
                        </Link>
                        <div className="pl-11 mt-2 text-[11px]">
                          <Link href="/branding#brief-section" className="text-[#D4AF37] hover:underline font-semibold">
                            → Submit Creative Brief
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Column 2: Coming Soon Verticals & Quick Actions */}
                    <div className="space-y-4">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-[#D4AF37] font-semibold border-b border-[#1B325C] pb-2">
                        Incubating Verticals (Coming Soon)
                      </div>

                      {/* Duzza Fashion */}
                      <Link
                        href="/fashion"
                        className="flex items-start space-x-3 p-3.5 rounded-xl hover:bg-[#0E1B33] border border-transparent hover:border-[#D4AF37]/40 transition-all duration-200 group bg-[#091224]"
                      >
                        <div className="p-2.5 rounded-lg bg-[#0E1B33] border border-[#D4AF37]/30 text-[#E5C378] mt-0.5 shrink-0 group-hover:bg-[#D4AF37] group-hover:text-[#050B18] transition-all">
                          <Shirt className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-bold text-[#F1F5F9] group-hover:text-[#D4AF37] transition-colors">
                              Duzza Fashion
                            </span>
                            <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#142547] text-[#E5C378] border border-[#1B325C]">
                              Teaser
                            </span>
                          </div>
                          <p className="text-xs text-[#CBD5E1]/80 mt-1 leading-relaxed">
                            Contemporary English tailoring & artisanal bespoke Ankara couture.
                          </p>
                        </div>
                      </Link>

                      {/* Duzza Bakery */}
                      <Link
                        href="/bakery"
                        className="flex items-start space-x-3 p-3.5 rounded-xl hover:bg-[#0E1B33] border border-transparent hover:border-[#D4AF37]/40 transition-all duration-200 group bg-[#091224]"
                      >
                        <div className="p-2.5 rounded-lg bg-[#0E1B33] border border-[#D4AF37]/30 text-[#E5C378] mt-0.5 shrink-0 group-hover:bg-[#D4AF37] group-hover:text-[#050B18] transition-all">
                          <UtensilsCrossed className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-bold text-[#F1F5F9] group-hover:text-[#D4AF37] transition-colors">
                              Duzza Bakery & Eatery
                            </span>
                            <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#142547] text-[#E5C378] border border-[#1B325C]">
                              Teaser
                            </span>
                          </div>
                          <p className="text-xs text-[#CBD5E1]/80 mt-1 leading-relaxed">
                            Gourmet pastries, confectionery, and fast-casual dining hospitality.
                          </p>
                        </div>
                      </Link>

                      {/* Quick Action Link */}
                      <div className="pt-2">
                        <Link
                          href="/projects#equipment-catalog"
                          className="w-full flex items-center justify-between p-3 rounded-xl bg-[#0E1B33] border border-[#1B325C] text-xs text-[#F1F5F9] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
                        >
                          <span className="flex items-center space-x-2">
                            <FileText className="w-4 h-4 text-[#D4AF37]" />
                            <span className="font-semibold">Download Capability Statement</span>
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              )}
            </div>

            <Link
              href="/about"
              className={`text-xs xl:text-sm font-semibold transition-colors hover:text-[#D4AF37] ${
                pathname === "/about" ? "text-[#D4AF37] font-bold" : "text-[#E2E8F0]/80"
              }`}
            >
              About Holding
            </Link>

            <Link
              href="/legal/privacy-policy"
              className={`text-xs xl:text-sm font-semibold transition-colors hover:text-[#D4AF37] ${
                pathname.startsWith("/legal") ? "text-[#D4AF37] font-bold" : "text-[#E2E8F0]/80"
              }`}
            >
              NDPA Governance
            </Link>

            <Link
              href="/cms/login"
              className={`text-xs xl:text-sm font-semibold transition-colors hover:text-[#D4AF37] ${
                pathname.startsWith("/cms") ? "text-[#D4AF37] font-bold" : "text-[#E2E8F0]/80"
              }`}
            >
              CMS Portal
            </Link>
          </nav>

          {/* Action CTAs (Executive Balanced Layout - Guaranteed Fit on All Screens) */}
          <div className="hidden lg:flex items-center space-x-2 shrink-0">
            {/* Special Client Request Modal Trigger */}
            <button
              onClick={() => setSpecialRequestOpen(true)}
              className="inline-flex items-center space-x-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors cursor-pointer shrink-0"
              title="Submit a specialized cross-vertical or VIP inquiry"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
              <span className="hidden xl:inline">Special Request</span>
              <span className="xl:hidden">Special</span>
            </button>

            {/* Replay 3s Intro */}
            <button
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new CustomEvent("duzza:replay-welcome"));
                }
              }}
              className="inline-flex items-center space-x-1 px-2 py-1.5 text-xs font-semibold rounded-lg bg-[#0E1B33] text-[#D4AF37] border border-[#D4AF37]/30 hover:bg-[#142547] hover:border-[#D4AF37] transition-all cursor-pointer shrink-0"
              title="Replay 3-second corporate welcome screen"
            >
              <Film className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
              <span className="text-[11px] font-mono hidden xl:inline">Intro (3s)</span>
            </button>

            {/* Direct WhatsApp HQ Channel */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-lg bg-[#0E1B33] text-[#38BDF8] border border-[#1B325C] hover:bg-[#142547] hover:border-[#38BDF8]/50 transition-colors shrink-0"
              title="Chat with Duzza Holding on WhatsApp"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-[11px]">WhatsApp</span>
            </a>

            {/* Subtle Divider */}
            <div className="h-4 w-px bg-stone-200 mx-0.5 shrink-0" />

            {/* Primary High-Contrast Quote CTA (Brown with Glowing Gold Accents) */}
            <Link
              href="/projects#equipment-catalog"
              title="Request an Engineering, Marine Survey, or Equipment Lease Quote"
              className="btn-brand-primary inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shrink-0 cursor-pointer"
            >
              <span className="text-white font-bold whitespace-nowrap">Request Quote</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#F3C966]" />
            </Link>
          </div>

          {/* Mobile Right Controls: Direct CMS Button + Hamburger Menu */}
          <div className="flex lg:hidden items-center space-x-2">
            <Link
              href="/cms/login"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#0E1B33] text-[#D4AF37] border border-[#D4AF37]/50 text-xs font-mono font-bold tracking-wider hover:bg-[#142547] shadow-[0_0_12px_rgba(212,175,55,0.25)] transition-all cursor-pointer"
              title="Access Duzza CMS IAM Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>CMS</span>
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-[#E2E8F0] hover:text-[#D4AF37] hover:bg-[#0E1B33] border border-[#1B325C] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6 text-[#D4AF37]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation (Prestige Midnight Navy Theme) */}
      {isOpen && (
        <div className="lg:hidden bg-[#091224] border-b border-[#D4AF37]/30 px-4 pt-4 pb-6 space-y-4 max-h-[85vh] overflow-y-auto shadow-2xl">
          <div className="flex flex-col space-y-2">
            {/* Prominent Mobile CMS Card */}
            <Link
              href="/cms/login"
              onClick={() => setIsOpen(false)}
              className="p-3.5 rounded-2xl bg-gradient-to-r from-[#0E1B33] via-[#142547] to-[#0E1B33] border border-[#D4AF37]/60 shadow-lg text-white flex items-center justify-between group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-[#D4AF37] text-[#050B18] flex items-center justify-center font-bold shadow-sm">
                  <ShieldCheck className="w-4 h-4 text-[#050B18]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-[#D4AF37] flex items-center space-x-1.5">
                    <span>CMS Administrative Portal</span>
                    <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 font-bold">IAM</span>
                  </div>
                  <div className="text-[10px] font-mono text-[#CBD5E1]/80">
                    Admin, Manager & Contributor Sign In
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-md text-base font-semibold text-[#F1F5F9] hover:bg-[#0E1B33] hover:text-[#D4AF37]"
            >
              Corporate Front Door
            </Link>

            <div className="px-3 pt-2 text-xs font-mono uppercase text-[#D4AF37] font-bold">
              Active Divisions
            </div>

            <Link
              href="/projects"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm font-semibold text-[#F1F5F9] hover:bg-[#0E1B33] flex items-center justify-between border border-[#1B325C]"
            >
              <span className="flex items-center space-x-2">
                <Compass className="w-4 h-4 text-[#D4AF37]" />
                <span>Duzza Projects (Engineering & Marine)</span>
              </span>
              <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#142547] text-[#D4AF37] border border-[#D4AF37]/40">Active</span>
            </Link>

            <Link
              href="/projects/equipment"
              onClick={() => setIsOpen(false)}
              className="pl-8 py-1 text-xs text-[#D4AF37] hover:underline font-medium"
            >
              → Marine Survey Equipment Catalogue
            </Link>

            <Link
              href="/branding"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm font-semibold text-[#F1F5F9] hover:bg-[#0E1B33] flex items-center justify-between border border-[#1B325C]"
            >
              <span className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>Duzza Branding (Creative Agency)</span>
              </span>
              <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#142547] text-[#D4AF37] border border-[#D4AF37]/40">Active</span>
            </Link>

            <div className="px-3 pt-2 text-xs font-mono uppercase text-[#D4AF37] font-bold">
              Upcoming Verticals
            </div>

            <Link
              href="/fashion"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm font-medium text-[#E5C378] hover:bg-[#0E1B33] flex items-center justify-between border border-[#1B325C]"
            >
              <span className="flex items-center space-x-2">
                <Shirt className="w-4 h-4 text-[#E5C378]" />
                <span>Duzza Fashion</span>
              </span>
              <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-[#0E1B33] text-[#D4AF37] border border-[#1B325C]">Coming Soon</span>
            </Link>

            <Link
              href="/bakery"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm font-medium text-[#E5C378] hover:bg-[#0E1B33] flex items-center justify-between border border-[#1B325C]"
            >
              <span className="flex items-center space-x-2">
                <UtensilsCrossed className="w-4 h-4 text-[#E5C378]" />
                <span>Duzza Bakery & Eatery</span>
              </span>
              <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-[#0E1B33] text-[#D4AF37] border border-[#1B325C]">Coming Soon</span>
            </Link>

            <div className="px-3 pt-2 text-xs font-mono uppercase text-[#D4AF37] font-bold">
              Corporate Governance
            </div>

            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-md text-sm text-[#E2E8F0] hover:text-[#D4AF37]"
            >
              About Holding & CAC Registration
            </Link>

            <Link
              href="/legal/privacy-policy"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-md text-sm text-[#E2E8F0] hover:text-[#D4AF37]"
            >
              NDPA 2023 & GDPR Privacy Policy
            </Link>

            <Link
              href="/cms/login"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-md text-sm text-[#E2E8F0] hover:text-[#D4AF37]"
            >
              CMS Portal Login
            </Link>
          </div>

          <div className="pt-4 border-t border-[#1B325C] flex flex-col space-y-3">
            <button
              onClick={() => {
                setIsOpen(false);
                setSpecialRequestOpen(true);
              }}
              className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-lg bg-[#0E1B33] border border-[#D4AF37]/50 text-[#F5D77F] font-bold text-sm shadow-[0_0_15px_rgba(212,175,55,0.2)]"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Special Client Request Desk</span>
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new CustomEvent("duzza:replay-welcome"));
                }
              }}
              className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-lg bg-[#0E1B33] border border-[#1B325C] text-[#E2E8F0] font-bold text-sm"
            >
              <Film className="w-4 h-4 text-[#D4AF37] animate-pulse" />
              <span>Watch 3s Corporate Intro</span>
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-lg bg-[#0E1B33] border border-[#1B325C] text-[#F1F5F9] font-semibold text-sm"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Warri Operations Desk</span>
            </a>
            <Link
              href="/projects"
              onClick={() => setIsOpen(false)}
              className="btn-brand-primary w-full text-center py-2.5 rounded-lg text-[#050B18] font-bold text-sm shadow-md"
            >
              Request Engineering Quote
            </Link>
          </div>
        </div>
      )}

      {/* Global Special Client Request Modal */}
      <SpecialClientRequestModal
        isOpen={specialRequestOpen}
        onClose={() => setSpecialRequestOpen(false)}
      />
    </header>
  );
}
