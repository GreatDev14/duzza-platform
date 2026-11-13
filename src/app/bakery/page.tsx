"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { UtensilsCrossed, Check, ArrowRight, Wheat, Clock, Heart } from "lucide-react";
import RealFoodShowcase from "@/components/bakery/RealFoodShowcase";
import { gsap, useGSAP } from "@/lib/animations/gsap";

export default function DuzzaBakeryPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [diningInterest, setDiningInterest] = useState("ARTISAN_BREAD_AND_PASTRIES");
  const [city, setCity] = useState("Warri");
  const [consent, setConsent] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const bakeryMoodboard = [
    {
      title: "Wild Yeast Country Sourdough Loaves",
      tag: "48hr Cold Ferment",
      src: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200",
    },
    {
      title: "Artisan Butter Croissants & Viennoiserie",
      tag: "French Patisserie",
      src: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1200",
    },
    {
      title: "Bespoke Multi-Tier Celebration Cakes",
      tag: "Celebration Cakes",
      src: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?q=80&w=1200",
    },
  ];

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".gsap-bakery-badge",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          ".gsap-bakery-title",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.3"
        )
        .fromTo(
          ".gsap-bakery-desc",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          ".gsap-bakery-card",
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
        vertical: "BAKERY",
        categoryPreference: diningInterest,
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
        throw new Error(data.error || "Failed to submit tasting registration");
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
      {/* Culinary Warm Header */}
      <section className="relative py-20 lg:py-28 border-b border-[#1B325C] overflow-hidden bg-gradient-to-b from-[#050B18] via-[#07132B] to-[#050B18]">
        {/* Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="gsap-bakery-badge inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#091224] border border-[#D4AF37]/35 text-xs font-mono text-[#D4AF37] font-bold shadow-sm">
                <UtensilsCrossed className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>DUZZA BAKERY & EATERY • COMING SOON TEASER</span>
              </div>

              <h1 className="gsap-bakery-title text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-tight">
                Warm Culinary Craft &{" "}
                <span className="text-gradient-gold font-light block sm:inline">
                  Artisan Confectionery.
                </span>
              </h1>

              <p className="gsap-bakery-desc text-base sm:text-lg text-[#CBD5E1]/90 leading-relaxed font-light">
                Slow-fermented artisan breads, delicate morning viennoiserie, celebratory custom cakes, 
                and premium all-day dining experiences crafted with uncompromised hospitality.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <a
                  href="#waitlist-box"
                  className="btn-brand-primary px-8 py-4 rounded-xl text-[#050B18] font-bold text-xs uppercase tracking-widest transition-all shadow-md cursor-pointer"
                >
                  Reserve Private Tasting Invitation
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-[#1B325C] bg-[#091224] p-2 shadow-2xl">
                <RealFoodShowcase />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Culinary Direction Showcase */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1B325C] pb-6">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold">
              Culinary Philosophy
            </span>
            <h2 className="text-3xl font-display font-bold text-white">
              The Daily Hearth Concept
            </h2>
          </div>
          <p className="text-xs text-[#94A3B8] font-mono">FLAGSHIP LOCATION • WARRI, DELTA STATE</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bakeryMoodboard.map((item, idx) => (
            <div
              key={idx}
              className="gsap-bakery-card rounded-2xl overflow-hidden bg-[#091224] border border-[#1B325C] group hover:border-[#D4AF37]/50 hover:shadow-2xl transition-all shadow-md"
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
      </section>

      {/* VIP Tasting Waitlist Box */}
      <section id="waitlist-box" className="py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#091224] border border-[#1B325C] shadow-2xl space-y-6">
          <div className="border-b border-[#1B325C] pb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D4AF37] block">
              PRIVATE TASTING GUESTLIST
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
              Join the Bakery & Eatery Launch List
            </h3>
            <p className="text-xs text-[#CBD5E1]/80 mt-1 font-light">
              Receive invitations to our pre-opening chef table tastings and complimentary introductory bread boxes.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-[#0E1B33] border border-[#D4AF37]/40 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#D4AF37] text-[#050B18] mx-auto flex items-center justify-center font-bold">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="font-display font-bold text-xl text-white">
                You're on the Duzza Bakery Guestlist!
              </h4>
              <p className="text-xs text-[#CBD5E1] max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{name}</strong>. We look forward to welcoming you at our Warri bistro doors.
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
                    placeholder="e.g. David Efe"
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
                    placeholder="david@company.com"
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
                  <label className="block text-xs font-medium text-[#CBD5E1] mb-1">City / Neighborhood</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Warri, Effurun, Benin City, Lagos..."
                    className="w-full bg-[#0E1B33] border border-[#1B325C] rounded-lg px-3 py-2 text-xs text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#CBD5E1] mb-1">Primary Interest</label>
                <select
                  value={diningInterest}
                  onChange={(e) => setDiningInterest(e.target.value)}
                  className="w-full bg-[#0E1B33] border border-[#1B325C] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="ARTISAN_BREAD_AND_PASTRIES">Artisan Sourdough & Morning Pastries</option>
                  <option value="CELEBRATION_CAKES">Bespoke Wedding & Milestone Celebration Cakes</option>
                  <option value="BISTRO_DINING">All-Day Breakfast & Casual Bistro Dining</option>
                  <option value="CORPORATE_CATERING">Corporate Event & Executive Breakfast Platters</option>
                </select>
              </div>

              <div className="flex items-start space-x-2 pt-1">
                <input
                  type="checkbox"
                  required
                  id="bakery-consent"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 rounded border-[#1B325C] text-[#D4AF37] focus:ring-[#D4AF37]"
                />
                <label htmlFor="bakery-consent" className="text-[11px] text-[#CBD5E1]">
                  I agree to receive communications from Duzza Bakery under the{" "}
                  <strong className="text-white">Nigeria Data Protection Act 2023</strong>.
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-brand-primary w-full py-4 rounded-xl text-[#050B18] font-bold text-xs uppercase tracking-widest transition-all shadow-md disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Registering for Private Tasting..." : "Request Exclusive Tasting Invitation"}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
