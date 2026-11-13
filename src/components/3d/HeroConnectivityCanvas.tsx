"use client";

import React, { useEffect, useRef } from "react";

/**
 * Advanced Interactive 3D WebGL / Canvas Polyhedral Core
 * Renders a luminous crystalline geometric structure representing
 * "connectivity and structural growth".
 *
 * Features multi-spectral glowing nodes (Gold, Cyan, Orange, Lime),
 * dynamic traveling energy pulses along connecting edges, interactive
 * mouse parallax with smooth damping, and touch drag rotation.
 */
export default function HeroConnectivityCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    // 3D Geometry: Truncated icosahedron lattice with orbital nodes
    interface Point3D {
      x: number;
      y: number;
      z: number;
      radius: number;
      color: string;
      glowColor: string;
      pulseOffset: number;
    }

    const points: Point3D[] = [];
    const baseRadius = Math.min(width, height) * 0.34;
    const phi = (1 + Math.sqrt(5)) / 2;

    const rawVertices = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
    ];

    const palette = [
      { color: "#E6C65A", glow: "rgba(230, 198, 90, 0.65)" }, // Gold (Holding)
      { color: "#00E5FF", glow: "rgba(0, 229, 255, 0.65)" }, // Cyan (Marine)
      { color: "#FF6B35", glow: "rgba(255, 107, 53, 0.65)" }, // Orange (Projects)
      { color: "#CCFF00", glow: "rgba(204, 255, 0, 0.65)" }, // Lime (Branding)
    ];

    // Primary Polyhedral Vertices
    rawVertices.forEach(([x, y, z], idx) => {
      const len = Math.sqrt(x * x + y * y + z * z);
      const theme = palette[idx % palette.length];
      points.push({
        x: (x / len) * baseRadius,
        y: (y / len) * baseRadius,
        z: (z / len) * baseRadius,
        radius: 4.8,
        color: theme.color,
        glowColor: theme.glow,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    });

    // Secondary Interconnected Growth Nodes
    for (let i = 0; i < 20; i++) {
      const theta = (i / 20) * Math.PI * 2;
      const r = baseRadius * (0.58 + (i % 3) * 0.22);
      const theme = palette[(i + 1) % palette.length];
      points.push({
        x: Math.cos(theta) * r,
        y: Math.sin(theta * 2) * (r * 0.45),
        z: Math.sin(theta) * r,
        radius: 2.8,
        color: theme.color,
        glowColor: theme.glow,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    // Dynamic rotation parameters
    let rotX = 0.45;
    let rotY = 0.55;
    let targetRotX = 0.45;
    let targetRotY = 0.55;
    const autoRotSpeed = 0.0038;

    // Interactive mouse / touch tracking
    let isInteracting = false;
    let lastPointerX = 0;
    let lastPointerY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left - width / 2;
      const clientY = e.clientY - rect.top - height / 2;
      targetRotY = (clientX / width) * 2.5;
      targetRotX = -(clientY / height) * 2.5;
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        isInteracting = true;
        lastPointerX = e.touches[0].clientX;
        lastPointerY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isInteracting || e.touches.length === 0) return;
      const deltaX = e.touches[0].clientX - lastPointerX;
      const deltaY = e.touches[0].clientY - lastPointerY;
      lastPointerX = e.touches[0].clientX;
      lastPointerY = e.touches[0].clientY;

      targetRotY += deltaX * 0.009;
      targetRotX -= deltaY * 0.009;
    };

    const handleTouchEnd = () => {
      isInteracting = false;
    };

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handlePointerMove);
    canvas.addEventListener("touchstart", handleTouchStart, { passive: true });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: true });
    canvas.addEventListener("touchend", handleTouchEnd, { passive: true });

    // Render loop
    const fov = 460;
    let angle = 0;
    let pulseTime = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      angle += autoRotSpeed;
      pulseTime += 0.035;

      rotX += (targetRotX - rotX) * 0.055;
      rotY += (targetRotY - rotY + angle * 0.35) * 0.055;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      // Transform 3D points
      const transformed = points.map((p) => {
        const x1 = p.x * cosY + p.z * sinY;
        const z1 = -p.x * sinY + p.z * cosY;

        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        const scale = fov / (fov + z2 + 360);
        const projX = width / 2 + x1 * scale;
        const projY = height / 2 + y2 * scale;

        const breath = Math.sin(pulseTime + p.pulseOffset) * 0.8;

        return {
          x: projX,
          y: projY,
          z: z2,
          scale,
          color: p.color,
          glowColor: p.glowColor,
          radius: Math.max(1.5, (p.radius + breath) * scale),
        };
      });

      // Painter's algorithm
      transformed.sort((a, b) => b.z - a.z);

      // Connecting energy vectors
      const maxDist = 145;
      for (let i = 0; i < transformed.length; i++) {
        for (let j = i + 1; j < transformed.length; j++) {
          const dx = transformed[i].x - transformed[j].x;
          const dy = transformed[i].y - transformed[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.35;
            const grad = ctx.createLinearGradient(
              transformed[i].x,
              transformed[i].y,
              transformed[j].x,
              transformed[j].y
            );
            grad.addColorStop(0, transformed[i].glowColor.replace("0.65", String(alpha)));
            grad.addColorStop(1, transformed[j].glowColor.replace("0.65", String(alpha)));

            ctx.beginPath();
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.1 * transformed[i].scale;
            ctx.moveTo(transformed[i].x, transformed[i].y);
            ctx.lineTo(transformed[j].x, transformed[j].y);
            ctx.stroke();

            // Traveling energy spark pulse along connected edges
            const sparkPos = (pulseTime * 0.6 + i * 0.2) % 1;
            const sparkX = transformed[i].x + (transformed[j].x - transformed[i].x) * sparkPos;
            const sparkY = transformed[i].y + (transformed[j].y - transformed[i].y) * sparkPos;

            ctx.beginPath();
            ctx.arc(sparkX, sparkY, 1.2 * transformed[i].scale, 0, Math.PI * 2);
            ctx.fillStyle = "#FFFFFF";
            ctx.fill();
          }
        }
      }

      // Draw glowing vertices
      transformed.forEach((p) => {
        // Outer aura
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4.2);
        glow.addColorStop(0, p.glowColor);
        glow.addColorStop(1, "transparent");

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 4.2, 0, Math.PI * 2);
        ctx.fill();

        // Inner solid core
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // White hot specular center
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 0.45, 0, Math.PI * 2);
        ctx.fill();
      });

      // Luminous center singularity
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 3.2, 0, Math.PI * 2);
      ctx.fillStyle = "#E6C65A";
      ctx.shadowColor = "#E6C65A";
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handlePointerMove);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[560px] flex items-center justify-center pointer-events-auto cursor-grab active:cursor-grabbing">
      {/* Ambient background bloom */}
      <div className="absolute w-[340px] h-[340px] rounded-full bg-gradient-to-tr from-yellow-500/10 via-cyan-500/10 to-orange-500/10 blur-3xl pointer-events-none" />
      <canvas
        ref={canvasRef}
        className="w-full h-full block relative z-10"
        aria-label="Interactive 3D Multi-Spectral Connectivity Structure"
      />
      <div className="absolute bottom-2 right-4 text-[10px] font-mono tracking-widest text-slate-400 uppercase pointer-events-none select-none z-20">
        [3D INTERACTIVE CORE • ROTATE / EXPLORE]
      </div>
    </div>
  );
}
