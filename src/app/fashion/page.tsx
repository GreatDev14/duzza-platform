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
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const moodboardImages = [
    {
      title: "Artisanal Ankara Silk Fusion",
      tag: "Couture Textiles",
      src: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200",
    },
    {
      title: "Modern Savile Row x Lagos Tailoring",
      tag: "Structured Suiting",
      src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200",
    },
    {
      title: "Handcrafted Leather & Luxury Accessories",
      tag: "Accessories",
      src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200",
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
    <div ref={containerRef} className="bg-white min-h-screen text-slate-900 font-sans selection:bg-rose-500 selection:text-white">
      {/* Editorial Textile Backdrop Header */}
      <section className="relative py-20 lg:py-28 border-b border-slate-200 overflow-hidden bg-gradient-to-b from-rose-50/50 via-white to-white">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="gsap-fashion-badge inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-xs font-mono text-rose-700 font-bold shadow-sm">
                <Shirt className="w-3.5 h-3.5 text-rose-500" />
                <span>DUZZA FASHION • COMING SOON TEASER</span>
              </div>

              <h1 className="gsap-fashion-title text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-navy-950 tracking-tight leading-tight">
                Artisanal Tailoring Meets{" "}
                <span className="text-gradient-rose font-light block sm:inline">
                  Contemporary African Luxury.
                </span>
              </h1>

              <p className="gsap-fashion-desc text-base sm:text-lg text-slate-600 leading-relaxed font-light">
                Curated English tailoring, bespoke contemporary Ankara couture, artisanal leather goods, 
                and statement lifestyle wearables. Crafted in Nigeria for global runways and discerning wardrobes.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <a
                  href="#waitlist-box"
                  className="px-8 py-4 rounded-xl bg-rose-600 text-white font-bold text-xs uppercase tracking-widest hover:bg-rose-700 transition-all shadow-md shadow-rose-600/25"
                >
                  Reserve VIP Lookbook Access
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <Fashion3DCouture />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Brand Mood Board */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-rose-600 font-bold">
              Aesthetic Direction
            </span>
            <h2 className="text-3xl font-display font-bold text-navy-950">
              The Inaugural Capsule Concept
            </h2>
          </div>
          <p className="text-xs text-slate-500 font-mono">COLLECTION 01 • LAUNCHING 2026/2027</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {moodboardImages.map((item, idx) => (
            <div
              key={idx}
              className="gsap-fashion-card rounded-2xl overflow-hidden bg-white border border-slate-200 group hover:border-rose-300 hover:shadow-xl transition-all shadow-sm"
            >
              <div className="relative h-72 w-full overflow-hidden bg-slate-100">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <span className="absolute top-3 left-3 text-[10px] font-mono uppercase px-2.5 py-1 rounded bg-white/90 text-navy-950 font-bold shadow-md">
                  {item.tag}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display font-bold text-lg text-navy-950 group-hover:text-rose-600 transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Fabric Swatches Showcase */}
        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-rose-600 font-bold block">
              Textile Archive
            </span>
            <h3 className="text-2xl font-display font-bold text-navy-950">
              Hand-Selected Indigenous & English Weaves
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {fabricSwatches.map((swatch, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white border border-slate-200 space-y-3 hover:border-rose-300 transition-colors shadow-sm"
              >
                <div
                  className="h-16 w-full rounded-lg shadow-inner"
                  style={{ backgroundColor: swatch.hex }}
                />
                <div>
                  <span className="text-xs font-bold text-navy-950 block">{swatch.name}</span>
                  <span className="text-[10px] font-mono text-slate-500 block">{swatch.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIP Waitlist Box */}
      <section id="waitlist-box" className="py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-rose-200 shadow-xl space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-rose-600 block">
              VIP GUEST REGISTRATION
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-navy-950 mt-1">
              Join the Fashion Inaugural Waitlist
            </h3>
            <p className="text-xs text-slate-600 mt-1 font-light">
              Receive the private digital lookbook and bespoke private fitting invitations 14 days before public release.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-rose-50 border border-rose-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-rose-600 text-white mx-auto flex items-center justify-center">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="font-display font-bold text-xl text-navy-950">
                You're on the Duzza Fashion Guestlist!
              </h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{name}</strong>. We will notify you at <strong>{email}</strong> when the private lookbook opens.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Amaka Williams"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="amaka@luxury.com"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">WhatsApp Number</label>
                  <input
                    type="tel"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="+234 803 123 4567"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Primary Residence City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Lagos, London, Abuja, Warri..."
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Preferred Fashion Category</label>
                <select
                  value={categoryPreference}
                  onChange={(e) => setCategoryPreference(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-rose-500"
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
                  className="mt-0.5 rounded border-slate-300 text-rose-600 focus:ring-rose-500"
                />
                <label htmlFor="fashion-consent" className="text-[11px] text-slate-600">
                  I agree to receive communications regarding Duzza Fashion under the{" "}
                  <strong className="text-navy-950">Nigeria Data Protection Act 2023</strong>.
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-rose-600 text-white font-bold text-xs uppercase tracking-widest hover:bg-rose-700 transition-all shadow-md shadow-rose-600/20 disabled:opacity-50"
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
