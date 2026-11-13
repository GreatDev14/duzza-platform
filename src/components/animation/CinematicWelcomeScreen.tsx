"use client";

import React, { useEffect, useState, useRef } from "react";
import { 
  Building2, 
  Sparkles, 
  Compass, 
  Shirt, 
  UtensilsCrossed, 
  ArrowRight, 
  Droplets,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import { gsap } from "gsap";

interface FluidRipple {
  x: number;
  y: number;
  r: number;
  maxR: number;
  alpha: number;
  speed: number;
}

interface ShimmerOrb {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
}

/**
 * Ultra-Luxury Corporate Welcome Animation (3 Seconds)
 * 
 * Visually enticing, pristine light corporate aesthetic (NO gaming UI/bars).
 * Features:
 * - Pure luminous white & azure ambient light dispersion
 * - Shimmering crystal caustics and fluid refractive ripples
 * - Sculpted rose-gold & deep-navy DUZZA Monogram Emblem
 * - Real-time cursor interaction: mouse movements create physical hydrodynamic ripple rings
 * - Smooth 3-second countdown (3.0s -> 0.0s) with seamless aperture dissolve
 */
export default function CinematicWelcomeScreen() {
  const [mounted, setMounted] = useState(true);
  const [timeLeft, setTimeLeft] = useState(3.0);
  const [progressPercent, setProgressPercent] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  // Listen for manual replay triggers
  useEffect(() => {
    const handleReplay = () => {
      startTimeRef.current = Date.now();
      setTimeLeft(3.0);
      setProgressPercent(0);
      setMounted(true);
    };
    window.addEventListener("duzza:replay-welcome", handleReplay);
    return () => window.removeEventListener("duzza:replay-welcome", handleReplay);
  }, []);

  // 3-Second Precise Timer & Auto-Exit
  useEffect(() => {
    if (!mounted) return;

    startTimeRef.current = Date.now();
    const duration = 3000; // Exactly 3 seconds

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const remaining = Math.max(0, (duration - elapsed) / 1000);
      const prog = Math.min(100, (elapsed / duration) * 100);

      setTimeLeft(parseFloat(remaining.toFixed(1)));
      setProgressPercent(prog);

      if (elapsed >= duration) {
        clearInterval(timer);
        handleCorporateExit();
      }
    }, 40);

    return () => clearInterval(timer);
  }, [mounted]);

  // 60FPS Fluid Shimmer & Light Dispersion Canvas
  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let time = 0;

    const ripples: FluidRipple[] = [];
    const orbs: ShimmerOrb[] = [];

    const handleResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      // Create floating luminous light orbs
      orbs.length = 0;
      for (let i = 0; i < 24; i++) {
        orbs.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          r: Math.random() * 80 + 40,
          alpha: Math.random() * 0.25 + 0.1,
        });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Interactive mouse / touch ripples
    const handlePointer = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      if (cardRef.current) {
        const dx = (clientX / width - 0.5) * 12;
        const dy = (clientY / height - 0.5) * -12;
        cardRef.current.style.transform = `perspective(1000px) rotateY(${dx}deg) rotateX(${dy}deg)`;
      }

      if (Math.random() > 0.4 && ripples.length < 35) {
        ripples.push({
          x: clientX,
          y: clientY,
          r: 10,
          maxR: Math.random() * 80 + 50,
          alpha: 0.6,
          speed: Math.random() * 2 + 1.5,
        });
      }
    };

    window.addEventListener("mousemove", handlePointer);
    window.addEventListener("touchmove", handlePointer, { passive: true });

    // Render Loop
    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // 1. Pristine Luminous Light Gradient
      const grad = ctx.createRadialGradient(
        width * 0.5, height * 0.45, 50,
        width * 0.5, height * 0.5, Math.max(width, height) * 0.75
      );
      grad.addColorStop(0, "#FFFFFF");
      grad.addColorStop(0.35, "#F0F9FF");
      grad.addColorStop(0.7, "#E0F2FE");
      grad.addColorStop(1, "#F8FAFC");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 2. Soft Ambient Water Light Caustic Waves
      ctx.save();
      ctx.strokeStyle = "rgba(0, 82, 255, 0.05)";
      ctx.lineWidth = 1.8;
      for (let y = height * 0.2; y < height; y += 45) {
        ctx.beginPath();
        for (let x = 0; x <= width; x += 25) {
          const cy = y + Math.sin(x * 0.015 + time * 1.5) * 12 + Math.cos(y * 0.02 - time) * 8;
          if (x === 0) ctx.moveTo(x, cy);
          else ctx.lineTo(x, cy);
        }
        ctx.stroke();
      }
      ctx.restore();

      // 3. Floating Luminous Light Orbs
      orbs.forEach((orb) => {
        orb.x += orb.vx;
        orb.y += orb.vy;
        if (orb.x < -100) orb.x = width + 100;
        if (orb.x > width + 100) orb.x = -100;
        if (orb.y < -100) orb.y = height + 100;
        if (orb.y > height + 100) orb.y = -100;

        const orbGrad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        orbGrad.addColorStop(0, `rgba(56, 189, 248, ${orb.alpha})`);
        orbGrad.addColorStop(0.6, `rgba(0, 82, 255, ${orb.alpha * 0.4})`);
        orbGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = orbGrad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // 4. Interactive Hydrodynamic Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 82, 255, ${rp.alpha * 0.5})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        rp.r += rp.speed;
        rp.alpha -= 0.015;
        if (rp.alpha <= 0 || rp.r >= rp.maxR) {
          ripples.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handlePointer);
      window.removeEventListener("touchmove", handlePointer);
    };
  }, [mounted]);

  // Smooth Corporate Exit
  const handleCorporateExit = () => {
    if (!mounted) return;
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        scale: 1.04,
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
      className="fixed inset-0 z-[999999] flex items-center justify-center overflow-hidden font-sans select-none bg-white transition-opacity"
    >
      {/* 1. Luminous Ambient Fluid Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 cursor-crosshair"
      />

      {/* 2. Soft Vignette for Visual Luxury */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-white/40 via-transparent to-white/70" />

      {/* 3. Center Corporate Showcase Card */}
      <div
        ref={cardRef}
        className="relative z-20 max-w-xl mx-auto px-6 text-center space-y-7 flex flex-col items-center pointer-events-auto"
        style={{ transformStyle: "preserve-3d", transition: "transform 0.12s ease-out" }}
      >
        {/* Statutory Conglomerate Pill */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-brandBlue-200 text-xs font-mono text-brandBlue-800 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="font-bold text-navy-950">FEDERAL REPUBLIC OF NIGERIA</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-600 font-semibold">CAMA 2020 RC-7149208</span>
        </div>

        {/* Official Sculpted Monogram Emblem */}
        <div className="relative flex items-center justify-center py-1">
          {/* Subtle Outer Energy Rings */}
          <div className="absolute w-28 h-28 rounded-full border border-brandBlue-300/60 animate-ping opacity-30" />
          <div className="absolute w-36 h-36 rounded-full border border-sky-300/40 animate-pulse" />

          {/* Sculpted Rose Gold & Deep Navy DZ Emblem */}
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-rose-200 via-amber-100 to-rose-300 p-0.5 shadow-2xl flex items-center justify-center relative hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-gradient-to-br from-navy-950 via-brandBlue-900 to-navy-950 rounded-[14px] flex items-center justify-center flex-col shadow-inner">
              <span className="font-display font-black text-2xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-rose-200 via-white to-amber-200">
                DZ
              </span>
              <span className="text-[7px] font-mono font-bold tracking-widest text-cyan-300 -mt-0.5">
                LIMITED
              </span>
            </div>
          </div>
        </div>

        {/* Corporate Titles */}
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-brandBlue-600 font-bold block">
            Multi-Sector Conglomerate Portal
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-navy-950 tracking-tight leading-tight">
            DUZZA LIMITED
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed font-light">
            Uniting Marine Hydrospatial Survey, Heavy Civil Engineering, Oil & Gas Logistics, and Executive Branding.
          </p>
        </div>

        {/* 4 Operating Divisions Pill Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-white/95 backdrop-blur-md border border-slate-200 text-[11px] font-medium text-slate-800 shadow-sm">
            <Compass className="w-3.5 h-3.5 text-brandBlue-600" />
            <span>Marine & Civil Engineering</span>
          </div>
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-white/95 backdrop-blur-md border border-slate-200 text-[11px] font-medium text-slate-800 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Digital & Merchandising</span>
          </div>
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-white/95 backdrop-blur-md border border-slate-200 text-[11px] font-medium text-slate-800 shadow-sm">
            <Shirt className="w-3.5 h-3.5 text-rose-500" />
            <span>Bespoke Couture</span>
          </div>
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-white/95 backdrop-blur-md border border-slate-200 text-[11px] font-medium text-slate-800 shadow-sm">
            <UtensilsCrossed className="w-3.5 h-3.5 text-amber-500" />
            <span>Artisan Bakery</span>
          </div>
        </div>

        {/* 3-Second Corporate Transition Progress */}
        <div className="w-full max-w-xs space-y-2 pt-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span className="flex items-center space-x-1.5 text-brandBlue-700 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-brandBlue-600 animate-ping" />
              <span>Entering Portal</span>
            </span>
            <span className="font-bold text-navy-950">{timeLeft}s</span>
          </div>

          <div className="h-1.5 w-full bg-slate-200/80 rounded-full overflow-hidden p-0.5 border border-slate-300/60">
            <div
              className="h-full bg-gradient-to-r from-brandBlue-600 via-sky-400 to-brandBlue-600 rounded-full transition-all duration-75"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Enter Portal Immediately Button */}
        <button
          onClick={handleCorporateExit}
          className="group inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-400 hover:text-brandBlue-600 transition-colors pt-1 cursor-pointer"
        >
          <span>Enter Portal Directly</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
