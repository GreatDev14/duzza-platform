"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { UtensilsCrossed, Coffee, Check, ArrowRight, Cake, ChefHat, Sparkles } from "lucide-react";
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
      title: "Traditional Artisan Sourdough & Crusts",
      tag: "Slow Fermentation",
      src: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=85",
    },
    {
      title: "Delicate French Patisserie & Viennoiserie",
      tag: "Gourmet Pastries",
      src: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=85",
    },
    {
      title: "Bespoke Celebratory & Wedding Cakes",
      tag: "Confectionery",
      src: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=85",
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
    <div ref={containerRef} className="bg-white min-h-screen text-slate-900 font-sans selection:bg-amber-500 selection:text-white">
      {/* Culinary Warm Header */}
      <section className="relative py-20 lg:py-28 border-b border-slate-200 overflow-hidden bg-gradient-to-b from-amber-50/50 via-white to-white">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="gsap-bakery-badge inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-mono text-amber-800 font-bold shadow-sm">
                <UtensilsCrossed className="w-3.5 h-3.5 text-amber-600" />
                <span>DUZZA BAKERY & EATERY • COMING SOON TEASER</span>
              </div>

              <h1 className="gsap-bakery-title text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-navy-950 tracking-tight leading-tight">
                Warm Culinary Craft &{" "}
                <span className="text-gradient-amber font-light block sm:inline">
                  Artisan Confectionery.
                </span>
              </h1>

              <p className="gsap-bakery-desc text-base sm:text-lg text-slate-600 leading-relaxed font-light">
                Slow-fermented artisan breads, delicate morning viennoiserie, celebratory custom cakes, 
                and premium all-day dining experiences crafted with uncompromised hospitality.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <a
                  href="#waitlist-box"
                  className="px-8 py-4 rounded-xl bg-amber-600 text-white font-bold text-xs uppercase tracking-widest hover:bg-amber-700 transition-all shadow-md shadow-amber-600/25"
                >
                  Reserve Private Tasting Invitation
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <RealFoodShowcase />
            </div>
          </div>
        </div>
      </section>

      {/* Culinary Direction Showcase */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-600 font-bold">
              Culinary Philosophy
            </span>
            <h2 className="text-3xl font-display font-bold text-navy-950">
              The Daily Hearth Concept
            </h2>
          </div>
          <p className="text-xs text-slate-500 font-mono">FLAGSHIP LOCATION • WARRI, DELTA STATE</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bakeryMoodboard.map((item, idx) => (
            <div
              key={idx}
              className="gsap-bakery-card rounded-2xl overflow-hidden bg-white border border-slate-200 group hover:border-amber-300 hover:shadow-xl transition-all shadow-sm"
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
                <h3 className="font-display font-bold text-lg text-navy-950 group-hover:text-amber-600 transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VIP Tasting Waitlist Box */}
      <section id="waitlist-box" className="py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-amber-200 shadow-xl space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-600 block">
              PRIVATE TASTING GUESTLIST
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-navy-950 mt-1">
              Join the Bakery & Eatery Launch List
            </h3>
            <p className="text-xs text-slate-600 mt-1 font-light">
              Receive invitations to our pre-opening chef table tastings and complimentary introductory bread boxes.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-amber-600 text-white mx-auto flex items-center justify-center">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="font-display font-bold text-xl text-navy-950">
                You're on the Duzza Bakery Guestlist!
              </h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{name}</strong>. We look forward to welcoming you at our Warri bistro doors.
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
                    placeholder="e.g. David Efe"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="david@company.com"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500"
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
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">City / Neighborhood</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Warri, Effurun, Benin City, Lagos..."
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Primary Interest</label>
                <select
                  value={diningInterest}
                  onChange={(e) => setDiningInterest(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
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
                  className="mt-0.5 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                />
                <label htmlFor="bakery-consent" className="text-[11px] text-slate-600">
                  I agree to receive communications from Duzza Bakery under the{" "}
                  <strong className="text-navy-950">Nigeria Data Protection Act 2023</strong>.
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-amber-600 text-white font-bold text-xs uppercase tracking-widest hover:bg-amber-700 transition-all shadow-md shadow-amber-600/20 disabled:opacity-50"
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
