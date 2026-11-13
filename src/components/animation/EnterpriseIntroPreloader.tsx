"use client";

import React, { useEffect, useState, useRef } from "react";
import { Compass, Sparkles, Shirt, UtensilsCrossed, Waves, ArrowRight, Droplets, ShieldCheck } from "lucide-react";
import { gsap } from "gsap";

interface PourStream {
  x: number;
  width: number;
  speed: number;
  offset: number;
  color: string;
}

interface SplashDrop {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  color: string;
  gravity: number;
}

interface FoamBubble {
  x: number;
  y: number;
  r: number;
  alpha: number;
  speedY: number;
  wobble: number;
}

interface WindowStream {
  x: number;
  y: number;
  length: number;
  speed: number;
  width: number;
  alpha: number;
}

/**
 * Full-Screen "Water Pouring into the Screen" Welcome Animation
 * 
 * Features:
 * 1. Cascading Water Pouring Down from Top:
 *    - Heavy, turbulent fluid streams of turquoise and crystal water pouring down from above
 *    - Fluid bezier wave contours with translucent highlights
 * 2. High-Impact Collision Splash Zone:
 *    - Energetic water droplets spraying upward & outward upon impact
 *    - Churning white foam lather bubbling and spreading across the water line
 * 3. Rising / Flowing Liquid Level:
 *    - Water pool filling the screen with dynamic wave sloshing and sun caustics
 * 4. Wet Glass Rivulets:
 *    - Water sheets and streams trickling down the front screen glass
 * 5. DUZZA LIMITED Holding Emblem Reveal:
 *    - Emblem and corporate identity illuminated through the pouring water
 */
export default function EnterpriseIntroPreloader() {
  const [mounted, setMounted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [telemetryText, setTelemetryText] = useState("WATER POURING INTO SCREEN...");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const handleResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // 1. Water Pouring Streams configuration
    const pourStreams: PourStream[] = [
      { x: 0.50, width: 90, speed: 1.0, offset: 0, color: "rgba(2, 132, 199, 0.75)" },
      { x: 0.47, width: 60, speed: 1.2, offset: 1.5, color: "rgba(56, 189, 248, 0.85)" },
      { x: 0.53, width: 70, speed: 0.9, offset: 3.0, color: "rgba(6, 182, 212, 0.80)" },
      { x: 0.43, width: 40, speed: 1.4, offset: 0.8, color: "rgba(186, 230, 253, 0.90)" },
      { x: 0.57, width: 45, speed: 1.1, offset: 2.2, color: "rgba(14, 165, 233, 0.70)" },
    ];

    // Arrays for dynamic particles
    const splashDrops: SplashDrop[] = [];
    const foamBubbles: FoamBubble[] = [];
    const windowStreams: WindowStream[] = [];

    // Initialize 30 sliding water streams on the screen glass
    for (let i = 0; i < 35; i++) {
      windowStreams.push({
        x: Math.random() * width,
        y: Math.random() * -height,
        length: Math.random() * 80 + 40,
        speed: Math.random() * 12 + 8,
        width: Math.random() * 3.5 + 1.2,
        alpha: Math.random() * 0.5 + 0.3,
      });
    }

    let time = 0;
    let poolHeight = 0;
    const targetPoolHeight = height * 0.45;

    // =========================================================================
    // 60FPS WATER POURING & SPLASH PHYSICS RENDER LOOP
    // =========================================================================
    const render = () => {
      time += 0.03;
      ctx.clearRect(0, 0, width, height);

      // Water pool rises smoothly as water pours in
      poolHeight += (targetPoolHeight - poolHeight) * 0.035;
      const currentWaterY = height - poolHeight;
      const impactCenterY = currentWaterY;

      // -----------------------------------------------------------------------
      // 1. DRAW WATER POURING DOWN FROM TOP (Heavy Liquid Columns)
      // -----------------------------------------------------------------------
      pourStreams.forEach((stream) => {
        const streamCenterX = width * stream.x + Math.sin(time * 2.5 + stream.offset) * 15;
        const halfW = stream.width * 0.5 + Math.sin(time * 3 + stream.offset) * 8;

        ctx.save();
        ctx.beginPath();
        // Top entrance
        ctx.moveTo(streamCenterX - halfW * 0.7, 0);
        
        // Fluid turbulent stream sides with bezier curve wobbles
        const cp1X = streamCenterX - halfW + Math.sin(time * 4 + stream.offset) * 20;
        const cp1Y = impactCenterY * 0.35;
        const cp2X = streamCenterX - halfW * 1.3 + Math.cos(time * 3.5) * 15;
        const cp2Y = impactCenterY * 0.75;
        ctx.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, streamCenterX - halfW * 1.5, impactCenterY);

        // Impact base connection
        ctx.lineTo(streamCenterX + halfW * 1.5, impactCenterY);

        // Right side curve
        const rcp2X = streamCenterX + halfW * 1.3 + Math.cos(time * 3.5) * 15;
        const rcp2Y = impactCenterY * 0.75;
        const rcp1X = streamCenterX + halfW + Math.sin(time * 4 + stream.offset) * 20;
        const rcp1Y = impactCenterY * 0.35;
        ctx.bezierCurveTo(rcp2X, rcp2Y, rcp1X, rcp1Y, streamCenterX + halfW * 0.7, 0);
        ctx.closePath();

        // Shimmering water stream gradient
        const streamGrad = ctx.createLinearGradient(0, 0, 0, impactCenterY);
        streamGrad.addColorStop(0, "rgba(224, 242, 254, 0.95)"); // Bright water entry
        streamGrad.addColorStop(0.3, stream.color);
        streamGrad.addColorStop(0.7, "rgba(2, 132, 199, 0.85)");
        streamGrad.addColorStop(1, "rgba(255, 255, 255, 0.95)"); // Impact froth
        ctx.fillStyle = streamGrad;
        ctx.fill();

        // White specular glint line down center of falling stream
        ctx.beginPath();
        ctx.moveTo(streamCenterX - 2, 0);
        ctx.lineTo(streamCenterX + 2, impactCenterY);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.restore();
      });

      // -----------------------------------------------------------------------
      // 2. SPAWN CONTINUOUS IMPACT WATER SPLASHES & DROPLETS
      // -----------------------------------------------------------------------
      if (splashDrops.length < 180) {
        for (let i = 0; i < 6; i++) {
          const angle = -Math.PI * 0.5 + (Math.random() - 0.5) * 1.8; // Upward spray
          const speed = Math.random() * 16 + 6;
          splashDrops.push({
            x: width * 0.5 + (Math.random() - 0.5) * 120,
            y: impactCenterY + 5,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            r: Math.random() * 4.5 + 1.5,
            alpha: 1.0,
            color: Math.random() > 0.4 ? "rgba(255, 255, 255, 0.95)" : "rgba(56, 189, 248, 0.85)",
            gravity: 0.38,
          });
        }
      }

      // Update and draw splash drops
      for (let i = splashDrops.length - 1; i >= 0; i--) {
        const drop = splashDrops[i];
        drop.vy += drop.gravity;
        drop.x += drop.vx;
        drop.y += drop.vy;
        drop.alpha -= 0.015;

        if (drop.alpha <= 0 || drop.y > height + 20) {
          splashDrops.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(drop.x, drop.y, drop.r, 0, Math.PI * 2);
        ctx.fillStyle = drop.color;
        ctx.shadowColor = "rgba(56, 189, 248, 0.8)";
        ctx.shadowBlur = 5;
        ctx.fill();

        // Droplet glint
        ctx.beginPath();
        ctx.arc(drop.x - drop.r * 0.3, drop.y - drop.r * 0.3, drop.r * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
        ctx.fill();
        ctx.restore();
      }

      // -----------------------------------------------------------------------
      // 3. DRAW RISING WATER POOL (Surface wave & Deep body)
      // -----------------------------------------------------------------------
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(0, currentWaterY);

      // Agitated churning wave surface
      for (let x = 0; x <= width; x += 15) {
        // Higher wave turbulence near the central pouring stream
        const distFromCenter = Math.abs(x - width * 0.5);
        const centerImpactAmp = Math.max(0, 1 - distFromCenter / (width * 0.35)) * 25;
        const waveY = currentWaterY +
          Math.sin(x * 0.015 + time * 3.5) * (8 + centerImpactAmp) +
          Math.cos(x * 0.025 - time * 2) * 6;
        ctx.lineTo(x, waveY);
      }

      ctx.lineTo(width, height);
      ctx.closePath();

      // Deep turquoise to crystal azure pool gradient
      const poolGrad = ctx.createLinearGradient(0, currentWaterY, 0, height);
      poolGrad.addColorStop(0, "rgba(56, 189, 248, 0.82)"); // Surface sky blue
      poolGrad.addColorStop(0.3, "rgba(6, 182, 212, 0.88)");  // Caribbean cyan
      poolGrad.addColorStop(0.7, "rgba(2, 132, 199, 0.92)");  // Sapphire body
      poolGrad.addColorStop(1, "rgba(10, 37, 88, 0.96)");     // Deep Navy
      ctx.fillStyle = poolGrad;
      ctx.fill();

      // Frothy White Foam Crest on Water Surface
      ctx.beginPath();
      for (let x = 0; x <= width; x += 12) {
        const distFromCenter = Math.abs(x - width * 0.5);
        const centerImpactAmp = Math.max(0, 1 - distFromCenter / (width * 0.35)) * 25;
        const waveY = currentWaterY +
          Math.sin(x * 0.015 + time * 3.5) * (8 + centerImpactAmp) +
          Math.cos(x * 0.025 - time * 2) * 6;
        if (x === 0) ctx.moveTo(x, waveY);
        else ctx.lineTo(x, waveY);
      }
      ctx.strokeStyle = "rgba(255, 255, 255, 0.95)";
      ctx.lineWidth = 4.0;
      ctx.stroke();

      // -----------------------------------------------------------------------
      // 4. CHURNING WHITE FOAM BUBBLES IN POOL
      // -----------------------------------------------------------------------
      if (foamBubbles.length < 90) {
        foamBubbles.push({
          x: width * 0.5 + (Math.random() - 0.5) * (width * 0.6),
          y: currentWaterY + Math.random() * 40,
          r: Math.random() * 5 + 2,
          alpha: 0.9,
          speedY: -(Math.random() * 1.5 + 0.5), // Bubbles float up to surface
          wobble: Math.random() * Math.PI * 2,
        });
      }

      for (let i = foamBubbles.length - 1; i >= 0; i--) {
        const b = foamBubbles[i];
        b.y += b.speedY;
        b.wobble += 0.05;
        b.x += Math.sin(b.wobble) * 0.8;
        b.alpha -= 0.008;

        if (b.alpha <= 0 || b.y < currentWaterY - 10) {
          foamBubbles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${b.alpha})`;
        ctx.fill();
      }

      ctx.restore();

      // -----------------------------------------------------------------------
      // 5. WATER TRICKLING DOWN SCREEN GLASS (Streaming down the viewport)
      // -----------------------------------------------------------------------
      ctx.save();
      windowStreams.forEach((ws) => {
        ws.y += ws.speed;
        if (ws.y > height + ws.length) {
          ws.y = -ws.length - Math.random() * 150;
          ws.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.moveTo(ws.x, ws.y);
        ctx.lineTo(ws.x, ws.y + ws.length);
        ctx.strokeStyle = `rgba(224, 242, 254, ${ws.alpha})`;
        ctx.lineWidth = ws.width;
        ctx.lineCap = "round";
        ctx.stroke();

        // Droplet head at bottom of stream
        ctx.beginPath();
        ctx.arc(ws.x, ws.y + ws.length, ws.width * 1.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${ws.alpha * 1.2})`;
        ctx.fill();
      });
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    // Progress percentage timer
    const startTime = Date.now();
    const duration = 2400;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(pct);

      if (pct < 30) {
        setTelemetryText("CASCADING WATER TORRENT POURING IN...");
      } else if (pct < 65) {
        setTelemetryText("HYDROSPATIAL VOLUME RISING • 4.28M LITRES...");
      } else if (pct < 90) {
        setTelemetryText("CALIBRATING WARRI MARINE LOGISTICS FLEET...");
      } else {
        setTelemetryText("WATER LEVEL STABILIZED • WELCOME TO DUZZA");
      }

      if (pct >= 100) {
        clearInterval(interval);
      }
    }, 35);

    // GSAP Welcome Reveal & Exit Timeline
    const ctxGsap = gsap.context(() => {
      const tl = gsap.timeline();

      // Text and emblem entrance (emerging from the pouring water)
      tl.fromTo(
        ".pour-badge",
        { opacity: 0, y: -30, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, delay: 0.3, ease: "back.out(2.0)" }
      )
        .fromTo(
          ".pour-emblem",
          { opacity: 0, scale: 0.3, y: -40 },
          { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: "elastic.out(1, 0.55)" },
          "-=0.4"
        )
        .fromTo(
          ".pour-title",
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          ".pour-sectors",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
          "-=0.3"
        );

      // Auto exit after 3.2 seconds
      gsap.delayedCall(3.2, handleExit);
    }, containerRef);

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      ctxGsap.revert();
    };
  }, []);

  const handleExit = () => {
    if (!mounted) return;

    const tl = gsap.timeline({
      onComplete: () => setMounted(false),
    });

    // Dramatic Water Spillway Wash-Away Exit
    tl.to(".pour-content", {
      opacity: 0,
      scale: 1.05,
      y: -30,
      duration: 0.45,
      ease: "power2.in",
    })
      .to(
        ".curtain-pour",
        {
          yPercent: 100,
          duration: 0.85,
          ease: "power4.inOut",
        },
        "-=0.1"
      )
      .to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.3,
        },
        "-=0.2"
      );
  };

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999999] flex items-center justify-center overflow-hidden font-sans select-none bg-white"
    >
      {/* 1. Full-Screen Water Pouring & Cascading Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 pointer-events-none"
      />

      {/* 2. Full-Screen Spillway Curtain Wash Panel */}
      <div className="curtain-pour absolute inset-0 z-0 bg-gradient-to-b from-white via-sky-50/50 to-white flex flex-col justify-end pointer-events-none" />

      {/* 3. Central Ambient Blue & Turquoise Light Glow */}
      <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
        <div className="w-[650px] h-[650px] rounded-full bg-gradient-to-br from-brandBlue-500/20 via-cyan-400/25 to-transparent blur-[130px] animate-pulse" />
      </div>

      {/* 4. Center Welcome Stage (Illuminated through the pouring water) */}
      <div className="pour-content relative z-20 max-w-xl mx-auto px-6 text-center space-y-6 flex flex-col items-center">
        {/* Top Statutory Pill */}
        <div className="pour-badge inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md border border-brandBlue-200 text-xs font-mono text-brandBlue-800 shadow-xl">
          <Droplets className="w-4 h-4 text-brandBlue-600 animate-bounce" />
          <span className="font-bold">FEDERAL REPUBLIC OF NIGERIA</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-600 font-semibold">CAMA 2020 RC-7149208</span>
        </div>

        {/* 3D Insignia Emblem with Hydrodynamic Ripples */}
        <div className="pour-emblem relative flex items-center justify-center">
          <div className="absolute w-28 h-28 rounded-full border-2 border-brandBlue-300/80 animate-ping opacity-50" />
          <div className="absolute w-40 h-40 rounded-full border border-sky-400/50 animate-pulse" />

          {/* Luxury Metallic Glass DZ Holding Box */}
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brandBlue-600 via-brandBlue-700 to-navy-950 p-1 shadow-2xl flex items-center justify-center relative">
            <div className="w-full h-full bg-white rounded-[13px] flex items-center justify-center flex-col shadow-inner">
              <span className="font-display font-black text-2xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-brandBlue-600 to-navy-950">
                DZ
              </span>
              <span className="text-[7px] font-mono font-bold tracking-widest text-brandBlue-600 -mt-0.5">
                HOLDING
              </span>
            </div>
          </div>
        </div>

        {/* Welcome Typography */}
        <div className="pour-title space-y-2">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-brandBlue-600 font-bold block">
            Welcome to the Future of Enterprise
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-navy-950 tracking-tight leading-tight">
            DUZZA LIMITED
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed font-light">
            Multidisciplinary Conglomerate Platform uniting Marine Hydrospatial Survey, Heavy Civil Contracting, and Global Executive Branding.
          </p>
        </div>

        {/* 4 Conglomerate Pillar Micro-Badges */}
        <div className="pour-sectors flex flex-wrap items-center justify-center gap-2 pt-1">
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-white/95 backdrop-blur-md border border-slate-200 text-[11px] font-medium text-slate-800 shadow-sm">
            <Compass className="w-3.5 h-3.5 text-brandBlue-600" />
            <span>Marine Geomatics</span>
          </div>
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-white/95 backdrop-blur-md border border-slate-200 text-[11px] font-medium text-slate-800 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Executive Branding</span>
          </div>
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-white/95 backdrop-blur-md border border-slate-200 text-[11px] font-medium text-slate-800 shadow-sm">
            <Shirt className="w-3.5 h-3.5 text-rose-500" />
            <span>Bespoke Fashion</span>
          </div>
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-white/95 backdrop-blur-md border border-slate-200 text-[11px] font-medium text-slate-800 shadow-sm">
            <UtensilsCrossed className="w-3.5 h-3.5 text-amber-500" />
            <span>Artisan Bakery</span>
          </div>
        </div>

        {/* Hydrodynamic Progress Telemetry */}
        <div className="w-full max-w-md space-y-2 pt-2">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
            <span className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-brandBlue-600 animate-ping" />
              <span>{telemetryText}</span>
            </span>
            <span className="font-bold text-navy-950">{progress}%</span>
          </div>

          {/* Progress Bar Track */}
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div
              className="h-full bg-gradient-to-r from-brandBlue-600 via-sky-400 to-brandBlue-600 rounded-full transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Skip Button for Instant Portal Entry */}
        <button
          onClick={handleExit}
          className="group inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-400 hover:text-brandBlue-600 transition-colors pt-1 cursor-pointer"
        >
          <span>Enter Portal Directly</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
