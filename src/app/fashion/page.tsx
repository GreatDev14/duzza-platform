"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Shirt, Check, ArrowRight, Scissors, Sparkles } from "lucide-react";
import Fashion3DCouture from "@/components/animation/Fashion3DCouture";
import { gsap, useGSAP } from "@/lib/animations/gsap";

export default function DuzzaFashionPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [categoryPreference, setCategoryPreference] = useState("BESPOKE_ANKARA_AND_ENGLISH");
  const [city, setCity] = useState("Lagos");
  const [consent, setConsent] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const moodboardImages = [
    {
      title: "Artisanal Ankara Silk Fusion",
      tag: "Couture Textiles",
      src: "/images/fashion/ankara-silk.jpg",
    },
    {
      title: "Modern Savile Row x Lagos Tailoring",
      tag: "Structured Suiting",
      src: "/images/fashion/savile-row-suit.jpg",
    },
    {
      title: "Handcrafted Leather & Luxury Accessories",
      tag: "Accessories",
      src: "/images/fashion/leather-accessories.jpg",
    },
  ];

  const fabricSwatches = [
    { name: "Imperial Burgundy Damask", hex: "#5E1914", tag: "Heavyweight Brocade" },
    { name: "Champagne Gold Silk", hex: "#E6C65A", tag: "Pure Raw Silk" },
    { name: "Royal Indigo Ankara", hex: "#1E3A8A", tag: "Hand-Dyed Cotton" },
    { name: "Terracotta Earth Weave", hex: "#C2410C", tag: "Artisanal Looms" },
  ];

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".gsap-fashion-badge",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          ".gsap-fashion-title",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.3"
        )
        .fromTo(
          ".gsap-fashion-desc",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          ".gsap-fashion-card",
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1 },
          "-=0.2"
        );
    },
    { scope: containerRef }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const formattedPhone = whatsapp.startsWith("+") ? whatsapp : `+234${whatsapp.replace(/^0/, "")}`;
      const payload = {
        name,
        email,
        whatsappNumber: formattedPhone,
        vertical: "FASHION",
        categoryPreference,
        cityLocation: city,
        consentDataProcessing: consent,
        recaptchaToken: "client_mock_token_for_assessment_verification",
      };

      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit waitlist registration");
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={containerRef} className="bg-[#050B18] min-h-screen text-[#F1F5F9] font-sans selection:bg-[#D4AF37] selection:text-[#050B18]">
      {/* Editorial Textile Backdrop Header */}
      <section className="relative py-20 lg:py-28 border-b border-[#1B325C] overflow-hidden bg-gradient-to-b from-[#050B18] via-[#07132B] to-[#050B18]">
        {/* Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="gsap-fashion-badge inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#091224] border border-[#D4AF37]/35 text-xs font-mono text-[#D4AF37] font-bold shadow-sm">
                <Shirt className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>DUZZA FASHION • COMING SOON TEASER</span>
              </div>

              <h1 className="gsap-fashion-title text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-tight">
                Artisanal Tailoring Meets{" "}
                <span className="text-gradient-gold font-light block sm:inline">
                  Contemporary African Luxury.
                </span>
              </h1>

              <p className="gsap-fashion-desc text-base sm:text-lg text-[#CBD5E1]/90 leading-relaxed font-light">
                Curated English tailoring, bespoke contemporary Ankara couture, artisanal leather goods, 
                and statement lifestyle wearables. Crafted in Nigeria for global runways and discerning wardrobes.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <a
                  href="#waitlist-box"
                  className="btn-brand-primary px-8 py-4 rounded-xl text-[#050B18] font-bold text-xs uppercase tracking-widest transition-all shadow-md cursor-pointer"
                >
                  Reserve VIP Lookbook Access
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl border border-[#1B325C] bg-[#091224] p-4 shadow-2xl">
                <Fashion3DCouture />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Brand Mood Board */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1B325C] pb-6">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold">
              Aesthetic Direction
            </span>
            <h2 className="text-3xl font-display font-bold text-white">
              The Inaugural Capsule Concept
            </h2>
          </div>
          <p className="text-xs text-[#94A3B8] font-mono">COLLECTION 01 • LAUNCHING 2026/2027</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {moodboardImages.map((item, idx) => (
            <div
              key={idx}
              className="gsap-fashion-card rounded-2xl overflow-hidden bg-[#091224] border border-[#1B325C] group hover:border-[#D4AF37]/50 hover:shadow-2xl transition-all shadow-md"
            >
              <div className="relative h-72 w-full overflow-hidden bg-[#050B18]">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <span className="absolute top-3 left-3 text-[10px] font-mono uppercase px-2.5 py-1 rounded bg-[#050B18]/90 text-white font-bold shadow-md border border-[#1B325C]">
                  {item.tag}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display font-bold text-lg text-white group-hover:text-[#D4AF37] transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Fabric Swatches Showcase */}
        <div className="p-8 rounded-3xl bg-[#091224] border border-[#1B325C] space-y-6 shadow-xl">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold block">
              Textile Archive
            </span>
            <h3 className="text-2xl font-display font-bold text-white">
              Hand-Selected Indigenous & English Weaves
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {fabricSwatches.map((swatch, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#0E1B33] border border-[#1B325C] space-y-3 hover:border-[#D4AF37]/50 transition-colors shadow-md"
              >
                <div
                  className="h-16 w-full rounded-lg shadow-inner"
                  style={{ backgroundColor: swatch.hex }}
                />
                <div>
                  <span className="text-xs font-bold text-white block">{swatch.name}</span>
                  <span className="text-[10px] font-mono text-[#94A3B8] block">{swatch.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIP Waitlist Box */}
      <section id="waitlist-box" className="py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#091224] border border-[#1B325C] shadow-2xl space-y-6">
          <div className="border-b border-[#1B325C] pb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D4AF37] block">
              VIP GUEST REGISTRATION
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
              Join the Fashion Inaugural Waitlist
            </h3>
            <p className="text-xs text-[#CBD5E1]/80 mt-1 font-light">
              Receive the private digital lookbook and bespoke private fitting invitations 14 days before public release.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-[#0E1B33] border border-[#D4AF37]/40 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#D4AF37] text-[#050B18] mx-auto flex items-center justify-center font-bold">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="font-display font-bold text-xl text-white">
                You're on the Duzza Fashion Guestlist!
              </h4>
              <p className="text-xs text-[#CBD5E1] max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{name}</strong>. We will notify you at <strong>{email}</strong> when the private lookbook opens.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-lg bg-red-950/50 border border-red-500/50 text-xs text-red-300">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#CBD5E1] mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Amaka Williams"
                    className="w-full bg-[#0E1B33] border border-[#1B325C] rounded-lg px-3 py-2 text-xs text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#CBD5E1] mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="amaka@luxury.com"
                    className="w-full bg-[#0E1B33] border border-[#1B325C] rounded-lg px-3 py-2 text-xs text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#CBD5E1] mb-1">WhatsApp Number</label>
                  <input
                    type="tel"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="+234 803 123 4567"
                    className="w-full bg-[#0E1B33] border border-[#1B325C] rounded-lg px-3 py-2 text-xs text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#CBD5E1] mb-1">Primary Residence City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Lagos, London, Abuja, Warri..."
                    className="w-full bg-[#0E1B33] border border-[#1B325C] rounded-lg px-3 py-2 text-xs text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#CBD5E1] mb-1">Preferred Fashion Category</label>
                <select
                  value={categoryPreference}
                  onChange={(e) => setCategoryPreference(e.target.value)}
                  className="w-full bg-[#0E1B33] border border-[#1B325C] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="BESPOKE_ANKARA_AND_ENGLISH">Bespoke Ankara Couture & English Tailoring</option>
                  <option value="EXECUTIVE_SUITING">Savile Row-Inspired Structured Suiting</option>
                  <option value="CONTEMPORARY_STREETWEAR">Luxury Contemporary African Ready-to-Wear</option>
                  <option value="LEATHER_ACCESSORIES">Artisanal Leather Footwear & Handcrafted Bags</option>
                </select>
              </div>

              <div className="flex items-start space-x-2 pt-1">
                <input
                  type="checkbox"
                  required
                  id="fashion-consent"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 rounded border-[#1B325C] text-[#D4AF37] focus:ring-[#D4AF37]"
                />
                <label htmlFor="fashion-consent" className="text-[11px] text-[#CBD5E1]">
                  I agree to receive communications regarding Duzza Fashion under the{" "}
                  <strong className="text-white">Nigeria Data Protection Act 2023</strong>.
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-brand-primary w-full py-4 rounded-xl text-[#050B18] font-bold text-xs uppercase tracking-widest transition-all shadow-md disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Registering VIP Access..." : "Request Exclusive Waitlist Access"}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
