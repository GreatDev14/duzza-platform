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
  Film
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
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200/90 py-2.5 shadow-sm"
          : "bg-white/85 backdrop-blur-sm border-b border-slate-200/60 py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between gap-2">
          {/* Corporate Brand Identity Lockup (Crisp Blue & White) */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-2.5 group min-w-0 sm:shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-brandBlue-600 via-brandBlue-700 to-navy-950 p-0.5 flex items-center justify-center shadow-md group-hover:scale-105 transition-all duration-300 shrink-0">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center font-display font-black text-brandBlue-600 text-sm sm:text-lg tracking-tighter">
                DZ
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-display font-bold text-sm sm:text-lg tracking-wider text-navy-950 uppercase group-hover:text-brandBlue-600 transition-colors leading-tight truncate sm:whitespace-nowrap">
                DUZZA LIMITED
              </span>
              <span className="text-[8px] sm:text-[10px] tracking-widest text-brandBlue-600 uppercase font-mono font-semibold truncate sm:whitespace-nowrap">
                CAMA 2020 HOLDING GROUP
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-3 xl:space-x-6 shrink-0 whitespace-nowrap">
            <Link
              href="/"
              className={`text-xs xl:text-sm font-semibold transition-colors hover:text-brandBlue-600 ${
                pathname === "/" ? "text-brandBlue-600 font-bold" : "text-slate-600"
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
                className={`flex items-center space-x-1 text-xs xl:text-sm font-semibold transition-colors hover:text-brandBlue-600 focus:outline-none cursor-pointer py-1 ${
                  megaMenuOpen ? "text-brandBlue-600 font-bold" : "text-slate-600"
                }`}
                aria-expanded={megaMenuOpen}
              >
                <span>Our Businesses</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${megaMenuOpen ? "rotate-180 text-brandBlue-600" : ""}`} />
              </button>

              {/* Mega-Menu Container (Continuous hover bridge pt-3 + 100% Solid Pure White) */}
              {megaMenuOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[720px] z-[9999]">
                  <div 
                    style={{ backgroundColor: "#FFFFFF", opacity: 1 }}
                    className="mega-menu-solid rounded-2xl bg-white border border-slate-200/95 p-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] animate-in fade-in slide-in-from-top-2 duration-150"
                  >
                  <div className="grid grid-cols-2 gap-6 bg-white">
                    {/* Column 1: Active Divisions */}
                    <div className="space-y-4">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold border-b border-slate-200 pb-2 flex items-center justify-between">
                        <span>Active Commercial Operations</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      </div>

                      {/* Duzza Projects */}
                      <div className="p-3.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all duration-200 group bg-white">
                        <Link
                          href="/projects"
                          className="flex items-start space-x-3"
                        >
                          <div className="p-2.5 rounded-lg bg-brandBlue-50 border border-brandBlue-200 text-brandBlue-600 mt-0.5 shrink-0 group-hover:bg-brandBlue-600 group-hover:text-white transition-all">
                            <Compass className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-bold text-navy-950 group-hover:text-brandBlue-600 transition-colors">
                                Duzza Projects
                              </span>
                              <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-brandBlue-100 text-brandBlue-800 border border-brandBlue-200">
                                Active B2B
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                              Civil construction, oil & gas support, bathymetric marine survey, and equipment hire.
                            </p>
                          </div>
                        </Link>
                        <div className="pl-11 mt-2 text-[11px]">
                          <Link href="/projects/equipment" className="text-brandBlue-600 hover:underline font-semibold">
                            → Marine Survey Equipment Catalog
                          </Link>
                        </div>
                      </div>

                      {/* Duzza Branding */}
                      <div className="p-3.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all duration-200 group bg-white">
                        <Link
                          href="/branding"
                          className="flex items-start space-x-3"
                        >
                          <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-600 mt-0.5 shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                            <Sparkles className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-bold text-navy-950 group-hover:text-emerald-600 transition-colors">
                                Duzza Branding
                              </span>
                              <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                                Active Agency
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                              Executive identity, international sports media UGC, digital systems, and merchandising.
                            </p>
                          </div>
                        </Link>
                        <div className="pl-11 mt-2 text-[11px]">
                          <Link href="/branding#brief-section" className="text-emerald-700 hover:underline font-semibold">
                            → Submit Creative Brief
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Column 2: Coming Soon Verticals & Quick Actions */}
                    <div className="space-y-4">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold border-b border-slate-200 pb-2">
                        Incubating Verticals (Coming Soon)
                      </div>

                      {/* Duzza Fashion */}
                      <Link
                        href="/fashion"
                        className="flex items-start space-x-3 p-3.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all duration-200 group bg-white"
                      >
                        <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-500 mt-0.5 shrink-0 group-hover:bg-rose-500 group-hover:text-white transition-all">
                          <Shirt className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-bold text-navy-950 group-hover:text-rose-600 transition-colors">
                              Duzza Fashion
                            </span>
                            <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 border border-rose-200">
                              Teaser
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                            Contemporary English tailoring & artisanal bespoke Ankara couture.
                          </p>
                        </div>
                      </Link>

                      {/* Duzza Bakery */}
                      <Link
                        href="/bakery"
                        className="flex items-start space-x-3 p-3.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all duration-200 group bg-white"
                      >
                        <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-600 mt-0.5 shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-all">
                          <UtensilsCrossed className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-bold text-navy-950 group-hover:text-amber-600 transition-colors">
                              Duzza Bakery & Eatery
                            </span>
                            <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                              Teaser
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                            Gourmet pastries, confectionery, and fast-casual dining hospitality.
                          </p>
                        </div>
                      </Link>

                      {/* Quick Action Link */}
                      <div className="pt-2">
                        <Link
                          href="/projects#equipment-catalog"
                          className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-navy-950 hover:bg-brandBlue-50 hover:border-brandBlue-300 hover:text-brandBlue-600 transition-all"
                        >
                          <span className="flex items-center space-x-2">
                            <FileText className="w-4 h-4 text-brandBlue-600" />
                            <span className="font-semibold">Download Capability Statement</span>
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-brandBlue-600" />
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
              className={`text-xs xl:text-sm font-semibold transition-colors hover:text-brandBlue-600 ${
                pathname === "/about" ? "text-brandBlue-600 font-bold" : "text-slate-600"
              }`}
            >
              About Holding
            </Link>

            <Link
              href="/legal/privacy-policy"
              className={`text-xs xl:text-sm font-semibold transition-colors hover:text-brandBlue-600 ${
                pathname.startsWith("/legal") ? "text-brandBlue-600 font-bold" : "text-slate-600"
              }`}
            >
              NDPA Governance
            </Link>

            <Link
              href="/cms/login"
              className={`text-xs xl:text-sm font-semibold transition-colors hover:text-brandBlue-600 ${
                pathname.startsWith("/cms") ? "text-brandBlue-600 font-bold" : "text-slate-600"
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
              className="inline-flex items-center space-x-1 px-2 py-1.5 text-xs font-semibold rounded-lg bg-sky-50 text-brandBlue-700 border border-sky-200 hover:bg-sky-100 hover:border-brandBlue-300 transition-colors cursor-pointer shrink-0"
              title="Replay 3-second corporate welcome screen"
            >
              <Film className="w-3.5 h-3.5 text-brandBlue-600 animate-pulse" />
              <span className="text-[11px] font-mono hidden xl:inline">Intro (3s)</span>
            </button>

            {/* Direct WhatsApp HQ Channel */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-lg bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 transition-colors shrink-0"
              title="Chat with Duzza Holding on WhatsApp"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-[11px]">WhatsApp</span>
            </a>

            {/* Subtle Divider */}
            <div className="h-4 w-px bg-slate-200 mx-0.5 shrink-0" />

            {/* Primary High-Contrast Quote CTA (Guaranteed Inside Viewport) */}
            <Link
              href="/projects#equipment-catalog"
              style={{ backgroundColor: "#0052FF", color: "#FFFFFF" }}
              title="Request an Engineering, Marine Survey, or Equipment Lease Quote"
              className="btn-brand-primary inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-xl bg-[#0052FF] text-white hover:bg-[#0041CC] shadow-md shadow-blue-600/20 transition-all shrink-0 cursor-pointer"
            >
              <span className="text-white font-bold whitespace-nowrap">Request Quote</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-brandBlue-600 hover:bg-slate-100 border border-slate-200 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation (Light Theme) */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-4 pb-6 space-y-4 max-h-[85vh] overflow-y-auto shadow-xl">
          <div className="flex flex-col space-y-2">
            <Link
              href="/"
              className="px-3 py-2 rounded-md text-base font-semibold text-navy-950 hover:bg-slate-50"
            >
              Corporate Front Door
            </Link>

            <div className="px-3 pt-2 text-xs font-mono uppercase text-slate-500 font-bold">
              Active Divisions
            </div>

            <Link
              href="/projects"
              className="px-3 py-2.5 rounded-lg text-sm font-semibold text-navy-950 hover:bg-brandBlue-50 flex items-center justify-between border border-slate-200"
            >
              <span className="flex items-center space-x-2">
                <Compass className="w-4 h-4 text-brandBlue-600" />
                <span>Duzza Projects (Engineering & Marine)</span>
              </span>
              <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-brandBlue-100 text-brandBlue-800 border border-brandBlue-200">Active</span>
            </Link>

            <Link
              href="/projects/equipment"
              className="pl-8 py-1 text-xs text-brandBlue-600 hover:underline font-medium"
            >
              → Marine Survey Equipment Catalogue
            </Link>

            <Link
              href="/branding"
              className="px-3 py-2.5 rounded-lg text-sm font-semibold text-navy-950 hover:bg-emerald-50 flex items-center justify-between border border-slate-200"
            >
              <span className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Duzza Branding (Creative Agency)</span>
              </span>
              <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">Active</span>
            </Link>

            <div className="px-3 pt-2 text-xs font-mono uppercase text-slate-500 font-bold">
              Upcoming Verticals
            </div>

            <Link
              href="/fashion"
              className="px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-rose-50 flex items-center justify-between border border-slate-200"
            >
              <span className="flex items-center space-x-2">
                <Shirt className="w-4 h-4 text-rose-500" />
                <span>Duzza Fashion</span>
              </span>
              <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-rose-100 text-rose-700 border border-rose-200">Coming Soon</span>
            </Link>

            <Link
              href="/bakery"
              className="px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-amber-50 flex items-center justify-between border border-slate-200"
            >
              <span className="flex items-center space-x-2">
                <UtensilsCrossed className="w-4 h-4 text-amber-600" />
                <span>Duzza Bakery & Eatery</span>
              </span>
              <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">Coming Soon</span>
            </Link>

            <div className="px-3 pt-2 text-xs font-mono uppercase text-slate-500 font-bold">
              Corporate Governance
            </div>

            <Link
              href="/about"
              className="px-3 py-2 rounded-md text-sm text-slate-600 hover:text-brandBlue-600"
            >
              About Holding & CAC Registration
            </Link>

            <Link
              href="/legal/privacy-policy"
              className="px-3 py-2 rounded-md text-sm text-slate-600 hover:text-brandBlue-600"
            >
              NDPA 2023 & GDPR Privacy Policy
            </Link>
          </div>

          <div className="pt-4 border-t border-slate-200 flex flex-col space-y-3">
            <button
              onClick={() => {
                setIsOpen(false);
                setSpecialRequestOpen(true);
              }}
              className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-sm"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Special Client Request Desk</span>
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new CustomEvent("duzza:replay-welcome"));
                }
              }}
              className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-lg bg-sky-50 border border-sky-200 text-brandBlue-700 font-bold text-sm"
            >
              <Film className="w-4 h-4 text-brandBlue-600 animate-pulse" />
              <span>Watch 3s Corporate Intro</span>
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-lg bg-slate-100 border border-slate-300 text-navy-950 font-semibold text-sm"
            >
              <PhoneCall className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Warri Operations Desk</span>
            </a>
            <Link
              href="/projects"
              className="w-full text-center py-2.5 rounded-lg bg-brandBlue-600 text-white font-bold text-sm hover:bg-brandBlue-700 shadow-sm"
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
