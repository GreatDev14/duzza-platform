"use client";

import React, { useEffect, useRef } from "react";

/**
 * Advanced Multi-Spectral Bathymetric Sonar Grid
 * Visualizes seafloor terrain mapping with dynamic depth contours,
 * oceanic color gradations (Cyan, Amber, Emerald), scroll-accelerated ripples,
 * and an acoustic sweep radar beam.
 */
export default function BathymetricSonarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const cols = 30;
    const rows = 22;
    let time = 0;
    let scrollOffset = 0;

    const handleScroll = () => {
      scrollOffset = window.scrollY * 0.003;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    const render = () => {
      time += 0.022;
      ctx.clearRect(0, 0, width, height);

      // Deep Abyssal Oceanic Gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, "#030712");
      bgGrad.addColorStop(0.5, "#061326");
      bgGrad.addColorStop(1, "#0A1B38");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      const originX = width / 2;
      const originY = height * 0.26;
      const cellW = (width * 0.82) / cols;
      const cellH = (height * 0.62) / rows;

      // Sonar sweep beam position
      const sweepX = ((time * 42) % (width + 120)) - 60;

      // Dynamic seabed coordinates calculation
      const gridPoints: { x: number; y: number; depth: number }[][] = [];

      for (let r = 0; r < rows; r++) {
        gridPoints[r] = [];
        for (let c = 0; c < cols; c++) {
          const normC = c / cols;
          const normR = r / rows;
          const wave1 = Math.sin(normC * 6.8 + time + scrollOffset) * 18;
          const wave2 = Math.cos(normR * 4.5 - time * 0.8) * 14;
          const seabedDip = Math.sin(normC * Math.PI) * Math.sin(normR * Math.PI) * 50;
          const depth = wave1 + wave2 + seabedDip;

          const px = originX + (c - cols / 2) * (cellW * (0.58 + normR * 0.72));
          const py = originY + r * cellH + depth;

          gridPoints[r][c] = { x: px, y: py, depth };
        }
      }

      // Draw longitudinal depth lines
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const pt = gridPoints[r][c];
          if (c === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }

        const depthFactor = r / rows;
        // Color transition: Cyan in shallow -> Amber in trench -> White peak highlights
        if (r % 5 === 0) {
          ctx.strokeStyle = "rgba(255, 107, 53, 0.85)"; // Safety Amber primary contour
          ctx.lineWidth = 1.6;
        } else if (r % 2 === 0) {
          ctx.strokeStyle = `rgba(0, 229, 255, ${0.3 + depthFactor * 0.5})`; // Electric Cyan
          ctx.lineWidth = 1.0;
        } else {
          ctx.strokeStyle = `rgba(16, 185, 129, ${0.2 + depthFactor * 0.4})`; // Hydrospatial Emerald
          ctx.lineWidth = 0.7;
        }
        ctx.stroke();
      }

      // Draw latitudinal depth lines
      for (let c = 0; c < cols; c += 2) {
        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          const pt = gridPoints[r][c];
          if (r === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.strokeStyle = "rgba(0, 229, 255, 0.16)";
        ctx.lineWidth = 0.65;
        ctx.stroke();
      }

      // Luminous Cyan / Orange Sonar Sweep Beam
      const sweepGrad = ctx.createLinearGradient(sweepX - 50, 0, sweepX + 50, 0);
      sweepGrad.addColorStop(0, "rgba(0, 229, 255, 0)");
      sweepGrad.addColorStop(0.5, "rgba(0, 229, 255, 0.38)");
      sweepGrad.addColorStop(1, "rgba(0, 229, 255, 0)");

      ctx.fillStyle = sweepGrad;
      ctx.fillRect(sweepX - 50, 0, 100, height);

      // Acoustic echo reflection points
      for (let r = 0; r < rows; r += 2) {
        for (let c = 0; c < cols; c += 2) {
          const pt = gridPoints[r][c];
          if (Math.abs(pt.x - sweepX) < 30) {
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 2.8, 0, Math.PI * 2);
            ctx.fillStyle = r % 4 === 0 ? "#FF6B35" : "#00E5FF";
            ctx.shadowColor = ctx.fillStyle;
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      }

      // Hydrospatial HUD Telemetry overlay
      ctx.font = "10px monospace";
      ctx.fillStyle = "rgba(255, 107, 53, 0.95)";
      ctx.fillText("[ACOUSTIC BATHYMETRY: 420 kHz HIGH-RES CHIRP]", 18, 26);
      ctx.fillStyle = "rgba(0, 229, 255, 0.85)";
      ctx.fillText("WARRI FAIRWAY GRID • LAT: 05°31' N | LON: 005°45' E", 18, 42);
      ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
      ctx.fillText(`SWATH SPREAD: 150° | DEPTH CLEARANCE: -${(22.8 + Math.sin(time * 0.9) * 2.4).toFixed(1)}m LAT`, 18, 58);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative w-full h-[320px] sm:h-[440px] rounded-2xl overflow-hidden border border-cyan-500/30 shadow-2xl bg-black">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute top-3 right-4 px-3 py-1 rounded-full bg-slate-900/90 border border-cyan-500/40 text-[10px] font-mono text-cyan-300 flex items-center space-x-2">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span>MULTIBEAM SONAR ACTIVE</span>
      </div>
    </div>
  );
}
