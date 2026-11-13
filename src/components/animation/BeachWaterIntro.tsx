"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { ArrowDown, Compass, Sparkles, Shirt, UtensilsCrossed, Waves, ChevronRight, Droplets, Zap } from "lucide-react";

/**
 * Procedural Coastal Beach & Ocean Water Wave Canvas Simulation
 * 
 * Features:
 * 1. 100% Procedural Canvas — NO static screenshot used as background!
 * 2. Real-time Scroll-Driven Wave Tide:
 *    - As user scrolls down, the ocean tide surges forward, washing across the sand
 *    - Wave foam trails, sea spray, and water caustics dynamically respond to scroll velocity
 *    - Smoothly recedes when scrolling back up
 * 3. Sunlight Water Caustics:
 *    - Shimmering diamond light refraction patterns across clear turquoise tropical water
 * 4. Multi-Layer Wave Physics:
 *    - Deep ocean swell, rising breaker crest, bubbly white sea foam wash, and glistening wet sand
 * 5. Interactive Cursor Ripples & One-Click Wave Splash:
 *    - Mouse movement creates physical liquid ripple rings
 *    - "Trigger Wave Surge" button creates an instant tidal wash
 */
export default function BeachWaterIntro({ onEnter }: { onEnter?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isPouringActive, setIsPouringActive] = useState(true);
  const triggerSplashRef = useRef<(() => void) | null>(null);
  const togglePouringRef = useRef<(() => void) | null>(null);

  // Time-aware greeting
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Scroll state tracking
    let currentScroll = 0;
    let targetScroll = 0;
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;

    // Simulation time and ripples
    let time = 0;
    let manualSurge = 0;
    let pouringEnabled = true;
    const ripples: { x: number; y: number; r: number; maxR: number; alpha: number; speed: number }[] = [];
    const foamParticles: { x: number; y: number; r: number; vx: number; vy: number; alpha: number; life: number }[] = [];

    // -------------------------------------------------------------------------
    // WATER POURING CASCADE PHYSICS
    // -------------------------------------------------------------------------
    // Droplets falling down in streams
    interface PourSplash {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      alpha: number;
      life: number;
    }
    const splashes: PourSplash[] = [];

    // Screen glass rivulets (water running down the camera screen)
    interface ScreenRivulet {
      x: number;
      y: number;
      length: number;
      width: number;
      speed: number;
      alpha: number;
      wobble: number;
    }
    const rivulets: ScreenRivulet[] = [];
    const initRivulets = (w: number) => {
      rivulets.length = 0;
      for (let i = 0; i < 28; i++) {
        rivulets.push({
          x: Math.random() * w,
          y: Math.random() * -300,
          length: Math.random() * 60 + 25,
          width: Math.random() * 2.8 + 1.2,
          speed: Math.random() * 4.5 + 2.5,
          alpha: Math.random() * 0.5 + 0.4,
          wobble: Math.random() * Math.PI * 2,
        });
      }
    };

    // Internal water stream bubbles
    interface StreamBubble {
      streamIdx: number;
      progress: number; // 0 (top) to 1 (water surface)
      offset: number;
      r: number;
      speed: number;
    }
    const streamBubbles: StreamBubble[] = [];
    for (let i = 0; i < 40; i++) {
      streamBubbles.push({
        streamIdx: i % 4,
        progress: Math.random(),
        offset: (Math.random() - 0.5) * 8,
        r: Math.random() * 2.2 + 0.8,
        speed: Math.random() * 0.02 + 0.015,
      });
    }

    // Toggle pouring function
    togglePouringRef.current = () => {
      pouringEnabled = !pouringEnabled;
      setIsPouringActive(pouringEnabled);
    };

    // Resize handling with DPR support for ultra-sharp rendering
    const handleResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      initRivulets(width);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Scroll listener: Calculate scroll position relative to this section
    const handleScroll = () => {
      const currentY = window.scrollY;
      const deltaY = currentY - lastScrollY;
      lastScrollY = currentY;

      // Calculate how far down the hero section has scrolled (0 to 1)
      const containerH = containerRef.current?.offsetHeight || window.innerHeight;
      const progress = Math.min(Math.max(currentY / (containerH * 0.9), 0), 1);
      targetScroll = progress;
      scrollVelocity = Math.min(Math.abs(deltaY) * 0.05, 3.0);
      setScrollPercent(Math.round(progress * 100));

      // Spawn foam spray along the wave crest when scrolling rapidly
      if (Math.abs(deltaY) > 8 && foamParticles.length < 120) {
        for (let i = 0; i < 4; i++) {
          foamParticles.push({
            x: Math.random() * width,
            y: (height * 0.45) + (targetScroll * height * 0.35) + (Math.random() * 40 - 20),
            r: Math.random() * 4 + 2,
            vx: (Math.random() - 0.5) * 2,
            vy: Math.random() * 2 + 1,
            alpha: 0.8,
            life: 1.0,
          });
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Function to trigger an immediate dramatic wave surge
    const triggerWaveSurge = () => {
      manualSurge = 1.0;
      for (let i = 0; i < 5; i++) {
        ripples.push({
          x: width * 0.5 + (Math.random() - 0.5) * 300,
          y: height * 0.45 + (Math.random() - 0.5) * 80,
          r: 10 + i * 20,
          maxR: 200 + i * 40,
          alpha: 0.9 - i * 0.15,
          speed: 3.5 + i * 0.6,
        });
      }
      for (let i = 0; i < 35; i++) {
        const angle = Math.random() * Math.PI * 2;
        const spd = Math.random() * 4 + 1.5;
        foamParticles.push({
          x: width * 0.5 + (Math.random() - 0.5) * 400,
          y: height * 0.45,
          r: Math.random() * 4 + 2,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd + 1.2,
          alpha: 0.9,
          life: 1.2,
        });
      }
    };
    triggerSplashRef.current = triggerWaveSurge;

    // Mouse movement adds ripple rings and disturbance
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (Math.random() > 0.4 && ripples.length < 40) {
        ripples.push({
          x,
          y,
          r: 4,
          maxR: Math.random() * 50 + 40,
          alpha: 0.7,
          speed: Math.random() * 1.5 + 1.2,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Click creates a splash wave
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      for (let i = 0; i < 3; i++) {
        ripples.push({
          x,
          y,
          r: 5 + i * 15,
          maxR: 120 + i * 30,
          alpha: 0.9 - i * 0.2,
          speed: 2.2 + i * 0.5,
        });
      }
      for (let i = 0; i < 15; i++) {
        const angle = Math.random() * Math.PI * 2;
        const spd = Math.random() * 3 + 1;
        foamParticles.push({
          x,
          y,
          r: Math.random() * 3.5 + 1.5,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd,
          alpha: 0.9,
          life: 1.0,
        });
      }
    };
    window.addEventListener("click", handleClick);

    // =========================================================================
    // MAIN 60FPS BEACH & WATER RENDER LOOP
    // =========================================================================
    const render = () => {
      time += 0.02 + scrollVelocity * 0.02;

      // Decay manual surge
      manualSurge *= 0.95;

      // Smooth lerp scroll progress for fluid wave reaction
      currentScroll += (targetScroll - currentScroll) * 0.12;
      scrollVelocity *= 0.92;

      ctx.clearRect(0, 0, width, height);

      // -----------------------------------------------------------------------
      // 1. BASE BACKGROUND: Pristine Tropical Sand Beach (Golden & Pure White)
      // -----------------------------------------------------------------------
      const sandGrad = ctx.createLinearGradient(0, 0, 0, height);
      sandGrad.addColorStop(0, "#E8E0D2");    // Deeper wet sand at top
      sandGrad.addColorStop(0.35, "#F3EDE2"); // Warm golden shore sand
      sandGrad.addColorStop(0.7, "#FAF6EE");  // Sun-bleached fine powdery sand
      sandGrad.addColorStop(1, "#FFFFFF");    // Clean corporate pure white transition
      ctx.fillStyle = sandGrad;
      ctx.fillRect(0, 0, width, height);

      // Subtle organic sand ripple texture lines
      ctx.save();
      ctx.strokeStyle = "rgba(180, 155, 120, 0.06)";
      ctx.lineWidth = 1.2;
      for (let y = height * 0.3; y < height; y += 38) {
        ctx.beginPath();
        for (let x = 0; x <= width; x += 30) {
          const ny = y + Math.sin(x * 0.015 + y) * 6 + Math.cos(x * 0.03) * 3;
          if (x === 0) ctx.moveTo(x, ny);
          else ctx.lineTo(x, ny);
        }
        ctx.stroke();
      }
      ctx.restore();

      // -----------------------------------------------------------------------
      // 2. WET SAND REFLECTIVE ZONE (Where the tide was previously washing)
      // -----------------------------------------------------------------------
      const wetSandBaseY = height * (0.42 + currentScroll * 0.38 + manualSurge * 0.15);
      const wetSandGrad = ctx.createLinearGradient(0, 0, 0, wetSandBaseY + 70);
      wetSandGrad.addColorStop(0, "rgba(168, 148, 120, 0.45)");
      wetSandGrad.addColorStop(0.7, "rgba(185, 168, 142, 0.28)");
      wetSandGrad.addColorStop(1, "rgba(255, 255, 255, 0.0)");

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(width, 0);
      for (let x = width; x >= 0; x -= 25) {
        const ny = wetSandBaseY + 35 + Math.sin(x * 0.007 + time * 0.8) * 18 + Math.cos(x * 0.014) * 10;
        ctx.lineTo(x, ny);
      }
      ctx.closePath();
      ctx.fillStyle = wetSandGrad;
      ctx.fill();
      ctx.restore();

      // -----------------------------------------------------------------------
      // 3. OCEAN WATER GRADIENT (Turquoise / Azure / Clear Coastal Lagoon)
      // -----------------------------------------------------------------------
      const tideSurge = Math.sin(time * 1.4) * 22 + Math.cos(time * 0.7) * 12 + manualSurge * 90;
      const scrollOffset = currentScroll * (height * 0.42); // Water advances with scroll!
      const mainShoreY = height * 0.38 + tideSurge + scrollOffset;

      const oceanGrad = ctx.createLinearGradient(0, 0, 0, mainShoreY);
      oceanGrad.addColorStop(0, "#014F86");    // Deep marine sapphire
      oceanGrad.addColorStop(0.25, "#0284C7"); // Vibrant Mediterranean blue
      oceanGrad.addColorStop(0.55, "#00A3C4"); // Clear Caribbean turquoise
      oceanGrad.addColorStop(0.82, "#38BDF8"); // Shallow azure lagoon
      oceanGrad.addColorStop(0.96, "#A5F3FC"); // Clear crystal shallows
      oceanGrad.addColorStop(1, "rgba(207, 250, 254, 0.95)");

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(width, 0);

      // Create natural organic wavy shoreline line
      for (let x = width; x >= 0; x -= 15) {
        const waveY = mainShoreY +
          Math.sin(x * 0.006 + time * 1.8) * 16 +
          Math.cos(x * 0.012 - time * 1.2) * 10 +
          Math.sin(x * 0.025 + time * 2.5) * 5;
        ctx.lineTo(x, waveY);
      }
      ctx.closePath();
      ctx.fillStyle = oceanGrad;
      ctx.fill();
      ctx.restore();

      // -----------------------------------------------------------------------
      // 4. ANIMATED SUNLIGHT WATER CAUSTICS (Interlocking Refraction Net)
      // -----------------------------------------------------------------------
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(width, 0);
      for (let x = width; x >= 0; x -= 20) {
        const wy = mainShoreY + Math.sin(x * 0.006 + time * 1.8) * 16;
        ctx.lineTo(x, wy);
      }
      ctx.closePath();
      ctx.clip(); // Only draw caustics inside the ocean body

      ctx.strokeStyle = "rgba(255, 255, 255, 0.16)";
      ctx.lineWidth = 1.8;
      const causticScale = 52;
      const causticSpeed = time * 0.8;

      for (let y = 0; y < mainShoreY; y += causticScale) {
        ctx.beginPath();
        for (let x = 0; x <= width; x += 16) {
          const cy = y +
            Math.sin(x * 0.035 + causticSpeed) * 8 +
            Math.cos(y * 0.03 - causticSpeed * 0.9) * 8;
          if (x === 0) ctx.moveTo(x, cy);
          else ctx.lineTo(x, cy);
        }
        ctx.stroke();
      }
      ctx.restore();

      // -----------------------------------------------------------------------
      // 5. SECONDARY ROLLING WAVE SWELL (Approaching the Shore)
      // -----------------------------------------------------------------------
      const swellY = mainShoreY - 55 - Math.sin(time * 1.2) * 15;
      if (swellY > 20) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(0, swellY - 30);
        ctx.lineTo(width, swellY - 30);
        for (let x = width; x >= 0; x -= 20) {
          const y = swellY + Math.sin(x * 0.008 + time * 2.0) * 12 + Math.cos(x * 0.018 - time) * 6;
          ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fillStyle = "rgba(255, 255, 255, 0.18)";
        ctx.fill();
        ctx.restore();
      }

      // -----------------------------------------------------------------------
      // 6. THICK FOAM CREST & BUBBLY SEA FOAM WASH (Main Shore Breaker)
      // -----------------------------------------------------------------------
      // Broad creamy foam body
      ctx.save();
      ctx.beginPath();
      for (let x = 0; x <= width; x += 12) {
        const topY = mainShoreY - 14 +
          Math.sin(x * 0.006 + time * 1.8) * 16 +
          Math.cos(x * 0.012 - time * 1.2) * 10;
        if (x === 0) ctx.moveTo(x, topY);
        else ctx.lineTo(x, topY);
      }
      for (let x = width; x >= 0; x -= 12) {
        const bottomY = mainShoreY + 16 +
          Math.sin(x * 0.007 + time * 1.7) * 18 +
          Math.cos(x * 0.015 - time) * 12 +
          (scrollVelocity * 10) + (manualSurge * 35);
        ctx.lineTo(x, bottomY);
      }
      ctx.closePath();
      ctx.fillStyle = "rgba(255, 255, 255, 0.72)";
      ctx.fill();

      // Bright white outer foam rim
      ctx.beginPath();
      for (let x = 0; x <= width; x += 10) {
        const y = mainShoreY + 16 +
          Math.sin(x * 0.007 + time * 1.7) * 18 +
          Math.cos(x * 0.015 - time) * 12 +
          (scrollVelocity * 10) + (manualSurge * 35);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(255, 255, 255, 0.95)";
      ctx.lineWidth = 3.5;
      ctx.stroke();

      // Delicate lacy foam bubbles along the wave edge
      ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
      for (let x = 10; x < width; x += 22) {
        const by = mainShoreY + 12 + Math.sin(x * 0.007 + time * 1.7) * 18;
        const bubbleR = (Math.sin(x * 0.1 + time) * 1.8 + 2.8);
        ctx.beginPath();
        ctx.arc(x, by, bubbleR, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // -----------------------------------------------------------------------
      // 7. DYNAMIC SCROLL FOAM SPRAY PARTICLES
      // -----------------------------------------------------------------------
      for (let i = foamParticles.length - 1; i >= 0; i--) {
        const p = foamParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.015;
        p.life -= 0.015;

        if (p.alpha <= 0 || p.life <= 0) {
          foamParticles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fill();
      }

      // -----------------------------------------------------------------------
      // 8. INTERACTIVE CURSOR RIPPLE RINGS
      // -----------------------------------------------------------------------
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${rp.alpha * 0.8})`;
        ctx.lineWidth = 2.0;
        ctx.stroke();

        // Secondary inner refraction ring
        if (rp.r > 15) {
          ctx.beginPath();
          ctx.arc(rp.x, rp.y, rp.r - 8, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(6, 182, 212, ${rp.alpha * 0.4})`;
          ctx.lineWidth = 1.0;
          ctx.stroke();
        }

        rp.r += rp.speed;
        rp.alpha -= 0.014;
        if (rp.alpha <= 0 || rp.r >= rp.maxR) {
          ripples.splice(i, 1);
        }
      }

      // -----------------------------------------------------------------------
      // 9. DYNAMIC WATER POURING CASCADE (Pouring directly into the screen)
      // -----------------------------------------------------------------------
      if (pouringEnabled) {
        // Stream anchor locations across the viewport width
        const streamOrigins = [
          { xRatio: 0.2, baseW: 18, speedMult: 1.1 },
          { xRatio: 0.42, baseW: 26, speedMult: 1.3 },
          { xRatio: 0.62, baseW: 24, speedMult: 1.2 },
          { xRatio: 0.82, baseW: 16, speedMult: 0.95 },
        ];

        streamOrigins.forEach((st, sIdx) => {
          const streamX = width * st.xRatio;
          const impactWaveOffset = Math.sin(streamX * 0.006 + time * 1.8) * 16;
          const streamImpactY = mainShoreY + impactWaveOffset;

          // Draw the pouring liquid column
          ctx.save();

          // 1. Outer cyan glow / mist aura
          ctx.beginPath();
          ctx.moveTo(streamX - st.baseW * 0.7, 0);
          for (let y = 0; y <= streamImpactY; y += 25) {
            const waveX = streamX + Math.sin(y * 0.02 + time * 7 * st.speedMult + sIdx) * 6;
            const w = st.baseW * (1 - (y / streamImpactY) * 0.25);
            ctx.lineTo(waveX - w * 0.5, y);
          }
          for (let y = streamImpactY; y >= 0; y -= 25) {
            const waveX = streamX + Math.sin(y * 0.02 + time * 7 * st.speedMult + sIdx) * 6;
            const w = st.baseW * (1 - (y / streamImpactY) * 0.25);
            ctx.lineTo(waveX + w * 0.5, y);
          }
          ctx.closePath();
          const colGrad = ctx.createLinearGradient(streamX, 0, streamX, streamImpactY);
          colGrad.addColorStop(0, "rgba(56, 189, 248, 0.85)");
          colGrad.addColorStop(0.5, "rgba(2, 132, 199, 0.75)");
          colGrad.addColorStop(1, "rgba(0, 163, 196, 0.9)");
          ctx.fillStyle = colGrad;
          ctx.fill();

          // 2. High-speed white specular light core running down the stream
          ctx.beginPath();
          ctx.lineWidth = Math.max(st.baseW * 0.28, 3);
          ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
          for (let y = 0; y <= streamImpactY; y += 20) {
            const waveX = streamX + Math.sin(y * 0.02 + time * 7 * st.speedMult + sIdx) * 6;
            if (y === 0) ctx.moveTo(waveX, y);
            else ctx.lineTo(waveX, y);
          }
          ctx.stroke();

          // 3. Impact Point: High-turbulent foaming churn ring
          ctx.beginPath();
          const churnR = st.baseW * 1.6 + Math.sin(time * 12 + sIdx) * 4;
          ctx.ellipse(streamX, streamImpactY, churnR * 1.5, churnR * 0.7, 0, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 255, 255, 0.88)";
          ctx.fill();

          ctx.beginPath();
          ctx.ellipse(streamX, streamImpactY, churnR * 2.2, churnR * 0.9, 0, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(165, 243, 252, 0.75)";
          ctx.lineWidth = 2.5;
          ctx.stroke();

          ctx.restore();

          // Continuous splash droplet ejection at impact point
          if (splashes.length < 150) {
            for (let k = 0; k < 2; k++) {
              const angle = -Math.PI * (0.15 + Math.random() * 0.7); // upward spray fan
              const force = Math.random() * 5.5 + 2.5;
              splashes.push({
                x: streamX + (Math.random() - 0.5) * st.baseW,
                y: streamImpactY - 2,
                vx: Math.cos(angle) * force,
                vy: Math.sin(angle) * force,
                r: Math.random() * 3.2 + 1.2,
                alpha: 0.95,
                life: 1.0,
              });
            }
          }
        });

        // ---------------------------------------------------------------------
        // STREAM RACING BUBBLES
        // ---------------------------------------------------------------------
        ctx.save();
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        streamBubbles.forEach((sb) => {
          sb.progress += sb.speed;
          if (sb.progress > 1) sb.progress = 0;

          const st = streamOrigins[sb.streamIdx];
          const streamX = width * st.xRatio;
          const streamImpactY = mainShoreY;
          const curY = sb.progress * streamImpactY;
          const curX = streamX + Math.sin(curY * 0.02 + time * 7 * st.speedMult + sb.streamIdx) * 6 + sb.offset;

          ctx.beginPath();
          ctx.arc(curX, curY, sb.r, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.restore();
      }

      // -----------------------------------------------------------------------
      // 10. IMPACT SPLASH WATER DROPLETS SIMULATION
      // -----------------------------------------------------------------------
      for (let i = splashes.length - 1; i >= 0; i--) {
        const sp = splashes[i];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vy += 0.22; // Gravity pulling splash drops down
        sp.alpha -= 0.02;
        sp.life -= 0.02;

        if (sp.alpha <= 0 || sp.life <= 0 || sp.y > height) {
          splashes.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(224, 242, 254, ${sp.alpha})`;
        ctx.fill();

        // Tiny specular glint
        if (sp.r > 2) {
          ctx.beginPath();
          ctx.arc(sp.x - sp.r * 0.3, sp.y - sp.r * 0.3, sp.r * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${sp.alpha * 0.9})`;
          ctx.fill();
        }
      }

      // -----------------------------------------------------------------------
      // 11. SCREEN SURFACE WATER RIVULETS (Water trickling on the glass screen)
      // -----------------------------------------------------------------------
      ctx.save();
      for (let i = 0; i < rivulets.length; i++) {
        const rv = rivulets[i];
        rv.y += rv.speed;
        rv.wobble += 0.06;
        const wx = rv.x + Math.sin(rv.wobble) * 2;

        if (rv.y - rv.length > height) {
          rv.y = -Math.random() * 100 - 30;
          rv.x = Math.random() * width;
        }

        // Trickle streak
        const streakGrad = ctx.createLinearGradient(wx, rv.y - rv.length, wx, rv.y);
        streakGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
        streakGrad.addColorStop(0.7, `rgba(186, 230, 253, ${rv.alpha * 0.35})`);
        streakGrad.addColorStop(1, `rgba(255, 255, 255, ${rv.alpha * 0.85})`);

        ctx.beginPath();
        ctx.lineWidth = rv.width;
        ctx.strokeStyle = streakGrad;
        ctx.lineCap = "round";
        ctx.moveTo(wx, rv.y - rv.length);
        ctx.lineTo(wx, rv.y);
        ctx.stroke();

        // Water droplet bead at the head
        ctx.beginPath();
        ctx.arc(wx, rv.y, rv.width * 1.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${rv.alpha * 0.9})`;
        ctx.fill();
      }
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  const handleScrollDown = () => {
    const nextSection = document.getElementById("duzza-operating-businesses") || document.getElementById("main-corporate-hub");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleTriggerSurge = () => {
    if (triggerSplashRef.current) {
      triggerSplashRef.current();
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-white text-slate-900 border-b border-slate-200"
    >
      {/* 1. Bespoke 60FPS Procedural Coastal Water & Beach Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 cursor-crosshair"
      />

      {/* 2. Soft Ambient Vignette for Maximum Text Contrast */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-white/20 via-transparent to-white/70" />

      {/* 3. Hero Content Center Stage */}
      <div
        ref={contentRef}
        className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 pt-20 pb-24"
        style={{
          // Subtle parallax lift as user scrolls down
          transform: `translateY(-${scrollPercent * 0.35}px)`,
          opacity: Math.max(1 - scrollPercent * 0.012, 0.15),
          transition: "transform 0.08s ease-out, opacity 0.08s ease-out",
        }}
      >
        {/* Statutory Holding Pill with Dynamic Time Greeting */}
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md border border-brandBlue-200 text-xs font-mono text-brandBlue-800 shadow-md">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="font-bold">{greeting}</span>
          <span className="text-slate-300">•</span>
          <span className="font-bold text-navy-950">DUZZA LIMITED</span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-600 font-semibold">CAMA 2020 (RC-7149208)</span>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <span className="text-brandBlue-700 hidden sm:inline font-bold">WARRI BASE</span>
        </div>

        {/* Headline: Clean, crisp, high-impact enterprise positioning */}
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-navy-950 tracking-tight leading-[1.08] max-w-4xl mx-auto drop-shadow-sm">
          Make Informed Decisions.{" "}
          <span className="text-gradient-blue font-light block sm:inline">
            Execute with Certainty.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-slate-700 max-w-2xl mx-auto leading-relaxed font-light drop-shadow-sm">
          A premier Nigerian multi-sector conglomerate delivering mission-critical marine hydrospatial survey, 
          civil engineering, and oil & gas logistics, paired with global executive branding authority.
        </p>

        {/* Primary Action Buttons */}
        <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleScrollDown}
            className="px-8 py-4 rounded-xl bg-brandBlue-600 text-white font-bold text-xs uppercase tracking-widest hover:bg-brandBlue-700 hover:shadow-xl hover:shadow-brandBlue-600/30 transition-all shadow-md flex items-center space-x-2 shimmer-button group"
          >
            <span>Explore All 4 Businesses</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>

          <a
            href="#duzza-operating-businesses"
            className="px-7 py-4 rounded-xl bg-white/95 backdrop-blur-md text-navy-950 font-bold text-xs uppercase tracking-wider hover:bg-slate-50 border border-slate-300 hover:border-brandBlue-400 transition-all shadow-sm"
          >
            Directory & Portals
          </a>

          {/* Interactive Wave Splash Trigger Button */}
          <button
            onClick={handleTriggerSurge}
            className="px-4 py-4 rounded-xl bg-sky-50 text-brandBlue-700 font-bold text-xs uppercase tracking-wider border border-sky-200 hover:bg-sky-100 hover:border-brandBlue-400 transition-all shadow-sm flex items-center space-x-1.5"
            title="Trigger an interactive ocean wave surge"
          >
            <Waves className="w-4 h-4 text-brandBlue-600 animate-pulse" />
            <span className="hidden sm:inline">Splash Tide</span>
          </button>

          {/* Water Pouring Cascade Control */}
          <button
            onClick={() => togglePouringRef.current?.()}
            className={`px-4 py-4 rounded-xl font-bold text-xs uppercase tracking-wider border transition-all shadow-sm flex items-center space-x-1.5 ${
              isPouringActive 
                ? "bg-brandBlue-50 text-brandBlue-700 border-brandBlue-300 shadow-brandBlue-100"
                : "bg-white text-slate-600 border-slate-300 hover:bg-slate-50"
            }`}
            title="Toggle water pouring stream cascade"
          >
            <Droplets className={`w-4 h-4 text-brandBlue-600 ${isPouringActive ? "animate-bounce" : ""}`} />
            <span className="hidden sm:inline">{isPouringActive ? "Water Pouring ON" : "Pour Water"}</span>
          </button>
        </div>

        {/* 4 Multi-Sector Quick-Jump Pills on Clean White Glass */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 text-xs text-slate-800 shadow-sm hover:border-brandBlue-400 transition-colors">
            <Compass className="w-3.5 h-3.5 text-brandBlue-600" />
            <span className="font-semibold text-navy-950">Marine & Civil Engineering</span>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 text-xs text-slate-800 shadow-sm hover:border-brandBlue-400 transition-colors">
            <Sparkles className="w-3.5 h-3.5 text-brandBlue-600" />
            <span className="font-semibold text-navy-950">Executive & Sports Branding</span>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 text-xs text-slate-800 shadow-sm hover:border-rose-400 transition-colors">
            <Shirt className="w-3.5 h-3.5 text-rose-500" />
            <span className="font-semibold text-navy-950">Bespoke Couture</span>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 text-xs text-slate-800 shadow-sm hover:border-amber-400 transition-colors">
            <UtensilsCrossed className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-semibold text-navy-950">Artisan Confectionery</span>
          </div>
        </div>

        {/* Interactive Scroll Down / Tide Indicator */}
        <div className="pt-8 flex flex-col items-center justify-center">
          <button
            onClick={handleScrollDown}
            className="group flex flex-col items-center space-y-2 text-xs font-mono uppercase tracking-widest text-slate-600 hover:text-brandBlue-600 transition-colors cursor-pointer"
            aria-label="Scroll down to advance ocean tide"
          >
            <span className="flex items-center space-x-1.5 font-bold">
              <Waves className="w-3.5 h-3.5 text-brandBlue-600 animate-pulse" />
              <span>Scroll to Watch Tide Advance</span>
            </span>
            <div className="w-9 h-9 rounded-full bg-white/95 backdrop-blur-md border border-slate-300 flex items-center justify-center group-hover:border-brandBlue-600 transition-colors shadow-md">
              <ArrowDown className="w-4 h-4 text-brandBlue-600 animate-bounce" />
            </div>
          </button>
        </div>
      </div>

      {/* Floating Interactive Live Water Wave Status Bar (Bottom Right) */}
      <div className="absolute bottom-4 right-4 z-20 hidden md:flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-brandBlue-200 text-[11px] font-mono text-slate-600 shadow-md">
        <Droplets className="w-3.5 h-3.5 text-brandBlue-600 animate-pulse" />
        <span>Pouring: <strong className={isPouringActive ? "text-cyan-600" : "text-slate-400"}>{isPouringActive ? "Active Flow" : "Paused"}</strong></span>
        <span className="text-slate-300">•</span>
        <span>Tide: <strong className="text-brandBlue-700">{scrollPercent > 5 ? `${scrollPercent}% Wash` : "Gentle Swell"}</strong></span>
        <span className="text-slate-300">•</span>
        <button
          onClick={handleTriggerSurge}
          className="text-[10px] text-brandBlue-600 hover:underline font-bold cursor-pointer"
        >
          Surge
        </button>
      </div>
    </section>
  );
}
