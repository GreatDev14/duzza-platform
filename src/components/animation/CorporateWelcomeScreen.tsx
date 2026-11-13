"use client";

import React, { useEffect, useState, useRef } from "react";
import { Building2, Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { gsap } from "gsap";

/**
 * High-End Corporate Welcome Reveal
 * Clean, visually enticing enterprise intro:
 * - Minimalist luxury light palette (pure white, deep navy #0A2558, electric blue #0052FF)
 * - Sculpted corporate monogram emblem
 * - Interactive cursor magnetic glow
 * - Auto-transitions smoothly into the portal
 */
export default function CorporateWelcomeScreen() {
  const [mounted, setMounted] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const [timeLeft, setTimeLeft] = useState(2.8);
  const [progress, setProgress] = useState(0);

  // Replay event listener
  useEffect(() => {
    const handleReplay = () => {
      startTimeRef.current = Date.now();
      setTimeLeft(2.8);
      setProgress(0);
      setMounted(true);
    };
    window.addEventListener("duzza:replay-welcome", handleReplay);
    return () => window.removeEventListener("duzza:replay-welcome", handleReplay);
  }, []);

  // Timer countdown
  useEffect(() => {
    if (!mounted) return;

    startTimeRef.current = Date.now();
    const duration = 2800;

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const remaining = Math.max(0, (duration - elapsed) / 1000);
      const prog = Math.min(100, (elapsed / duration) * 100);

      setTimeLeft(parseFloat(remaining.toFixed(1)));
      setProgress(prog);

      if (elapsed >= duration) {
        clearInterval(timer);
        handleExit();
      }
    }, 40);

    return () => clearInterval(timer);
  }, [mounted]);

  // Mouse tilt
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    cardRef.current.style.transform = `perspective(1000px) rotateY(${x * 0.04}deg) rotateX(${-y * 0.04}deg)`;
  };

  const handleExit = () => {
    if (!mounted) return;
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        scale: 1.03,
        duration: 0.45,
        ease: "power2.inOut",
        onComplete: () => setMounted(false),
      });
    } else {
      setMounted(false);
    }
  };

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-[999999] flex items-center justify-center overflow-hidden font-sans select-none bg-[#140A05]/98 backdrop-blur-2xl transition-opacity"
    >
      {/* Subtle Warm Amber Gold Grid */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#D4AF37_1.2px,transparent_1.2px)] [background-size:24px_24px]" />
      
      {/* Ambient Warm Earth & Gold Glow (Waterside Koi Radiance) */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#D4AF37]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#8B5A2B]/25 rounded-full blur-3xl pointer-events-none" />

      {/* Main Corporate Card */}
      <div
        ref={cardRef}
        className="relative z-20 max-w-lg w-full mx-6 p-8 sm:p-12 rounded-3xl bg-[#1C110A] border border-[#D4AF37]/35 shadow-2xl shadow-black/90 text-center space-y-6 flex flex-col items-center transition-transform duration-150 ease-out"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Statutory Pill */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#26170E] border border-[#D4AF37]/40 text-xs font-mono text-[#D4AF37] shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
          <span className="font-bold text-[#FFF6DE]">DUZZA LIMITED</span>
          <span className="text-[#6B4429]">•</span>
          <span className="text-[#EED9B3] font-medium">CAMA 2020 RC-7149208</span>
        </div>

        {/* Corporate Monogram (Brown & Glowing Gold) */}
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#D4AF37] via-[#8B5A2B] to-[#140A05] p-0.5 shadow-xl shadow-[#D4AF37]/30 flex items-center justify-center">
          <div className="w-full h-full bg-[#1C110A] rounded-[14px] flex flex-col items-center justify-center shadow-inner">
            <span className="font-display font-black text-2xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-[#FFF6DE] via-[#D4AF37] to-[#8B5A2B]">
              DZ
            </span>
            <span className="text-[7px] font-mono font-bold tracking-widest text-[#D4AF37] -mt-0.5">
              HOLDING
            </span>
          </div>
        </div>

        {/* Corporate Title */}
        <div className="space-y-2">
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#FFF6DE] tracking-tight leading-tight">
            DUZZA LIMITED
          </h1>
          <p className="text-xs sm:text-sm text-[#EED9B3]/80 max-w-sm mx-auto leading-relaxed font-light">
            Diversified Nigerian Enterprise Conglomerate uniting Heavy Marine & Civil Contracting, Oil & Gas Logistics, and Executive Branding.
          </p>
        </div>

        {/* 4 Pillars Micro Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-[11px] font-mono text-[#EED9B3]">
          <span className="px-2.5 py-1 rounded-md bg-[#26170E] border border-[#3D2415] font-medium">Marine Geomatics</span>
          <span className="px-2.5 py-1 rounded-md bg-[#26170E] border border-[#3D2415] font-medium">Civil Engineering</span>
          <span className="px-2.5 py-1 rounded-md bg-[#26170E] border border-[#3D2415] font-medium">Executive Branding</span>
          <span className="px-2.5 py-1 rounded-md bg-[#26170E] border border-[#3D2415] font-medium">Emerging Ventures</span>
        </div>

        {/* Progress Bar & Counter */}
        <div className="w-full space-y-2 pt-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#D4AF37]">
            <span className="text-[#EED9B3] font-semibold flex items-center space-x-1">
              <span>Entering Portal</span>
            </span>
            <span className="font-bold text-[#FFF6DE]">{timeLeft}s</span>
          </div>
          <div className="h-1.5 w-full bg-[#26170E] rounded-full overflow-hidden border border-[#3D2415]">
            <div
              className="h-full bg-gradient-to-r from-[#8B5A2B] via-[#D4AF37] to-[#F3C966] rounded-full transition-all duration-75 shadow-[0_0_12px_rgba(212,175,55,0.9)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Instant Skip Button */}
        <button
          onClick={handleExit}
          className="group inline-flex items-center space-x-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#D4AF37] hover:text-[#FFF6DE] transition-colors pt-1 cursor-pointer"
        >
          <span>Enter Portal Now</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#D4AF37]" />
        </button>
      </div>
    </div>
  );
}

