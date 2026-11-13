"use client";

import React, { useEffect, useRef } from "react";

export default function CorporateLiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Dynamic points
    const POINT_COUNT = Math.min(50, Math.floor((width * height) / 22000) + 20);
    const mouse = { x: -1000, y: -1000, radius: 140 };

    interface Point {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseAlpha: number;
      pulseSpeed: number;
      pulseOffset: number;
      color: string;
    }

    const colors = ["#8B5A2B", "#D4AF37", "#F3C966", "#B88E4F", "#241409"];

    const points: Point[] = Array.from({ length: POINT_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 2 + 1.2,
      baseAlpha: Math.random() * 0.35 + 0.15,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      pulseOffset: Math.random() * Math.PI * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    // Ambient floating glow orbs (Brown and Pale Gold Radiance)
    const orbs = [
      { x: width * 0.2, y: height * 0.3, r: 240, color: "rgba(212, 175, 55, 0.08)" },
      { x: width * 0.8, y: height * 0.6, r: 280, color: "rgba(139, 90, 43, 0.06)" },
      { x: width * 0.5, y: height * 0.85, r: 200, color: "rgba(243, 201, 102, 0.07)" },
    ];

    let tick = 0;

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw soft ambient glowing background orbs
      orbs.forEach((orb) => {
        const driftX = Math.sin(tick * 0.008 + orb.x) * 20;
        const driftY = Math.cos(tick * 0.008 + orb.y) * 20;
        const grad = ctx.createRadialGradient(
          orb.x + driftX,
          orb.y + driftY,
          0,
          orb.x + driftX,
          orb.y + driftY,
          orb.r
        );
        grad.addColorStop(0, orb.color);
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x + driftX, orb.y + driftY, orb.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Update and draw constellation points & connecting lines
      const maxDist = 135;

      for (let i = 0; i < points.length; i++) {
        const p1 = points[i];

        // Move
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Bounce on boundaries
        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Mouse interaction (gentle repulsion/attraction)
        const dxMouse = mouse.x - p1.x;
        const dyMouse = mouse.y - p1.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < mouse.radius) {
          const force = (1 - distMouse / mouse.radius) * 0.8;
          p1.x -= (dxMouse / distMouse) * force;
          p1.y -= (dyMouse / distMouse) * force;
        }

        // Connect nearby points
        for (let j = i + 1; j < points.length; j++) {
          const p2 = points[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(212, 175, 55, ${alpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }

        // Draw point node with subtle pulsating glow
        const pulse = Math.sin(tick * p1.pulseSpeed + p1.pulseOffset);
        const currentRadius = Math.max(0.8, p1.radius + pulse * 0.6);
        const currentAlpha = Math.max(0.1, p1.baseAlpha + pulse * 0.15);

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = p1.color;
        ctx.globalAlpha = currentAlpha;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none w-full h-full z-0 transition-opacity duration-1000"
      style={{ opacity: 0.85 }}
      aria-hidden="true"
    />
  );
}

