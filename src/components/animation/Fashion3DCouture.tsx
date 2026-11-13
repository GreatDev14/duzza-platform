"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Shirt, Scissors, Eye, Sparkles } from "lucide-react";

/**
 * Interactive 3D Couture & Silk Ribbon Canvas
 * Three.js WebGL simulation for Duzza Fashion.
 * Features:
 * - Fluid waving 3D silk ribbon strips with luxury velvet/satin sheen
 * - Orbiting golden tailoring shears and stitch point markers
 * - Interactive 360° mouse drag and scroll-driven textile waving
 */
export default function Fashion3DCouture() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 460;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 2, 14);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambient);

    const light1 = new THREE.DirectionalLight(0xff2d55, 1.2);
    light1.position.set(10, 15, 10);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0x0052ff, 1.0);
    light2.position.set(-10, -5, 10);
    scene.add(light2);

    const group = new THREE.Group();
    scene.add(group);

    // 1. Fluid Waving 3D Silk Ribbon Mesh
    const ribbonGeo = new THREE.PlaneGeometry(10, 5, 40, 20);
    const ribbonMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.3,
      clearcoat: 0.9,
      side: THREE.DoubleSide,
      wireframe: false,
    });
    const ribbonMesh = new THREE.Mesh(ribbonGeo, ribbonMat);
    group.add(ribbonMesh);

    // Wireframe overlay for modern architectural tech feel
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x0052ff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireMesh = new THREE.Mesh(ribbonGeo, wireMat);
    group.add(wireMesh);

    // 2. Central 3D Mannequin Torso Wireframe
    const torsoGeo = new THREE.CylinderGeometry(1.4, 0.9, 3.2, 16, 8, true);
    const torsoMat = new THREE.MeshStandardMaterial({
      color: 0x0052ff,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const torso = new THREE.Mesh(torsoGeo, torsoMat);
    torso.position.set(0, 0, -1);
    group.add(torso);

    // 3. Floating Golden Shears / Luxury Rings
    const ringGeo = new THREE.TorusGeometry(3.6, 0.05, 16, 64);
    const ringMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.9, roughness: 0.1 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI * 0.4;
    group.add(ring);

    // Mouse Interaction
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotY = 0;
    let targetRotX = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMouseX;
      const dy = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      targetRotY += dx * 0.01;
      targetRotX += dy * 0.01;
    };
    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    let scrollWave = 0;
    const onScroll = () => {
      scrollWave = window.scrollY * 0.003;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const delta = clock.getDelta();

      // Waving cloth vertex shader animation on CPU
      const pos = ribbonGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const u = pos.getX(i);
        const v = pos.getY(i);
        const z = Math.sin(u * 0.8 + elapsed * 3 + scrollWave) * 0.7 +
                  Math.cos(v * 1.2 + elapsed * 2) * 0.4;
        pos.setZ(i, z);
      }
      pos.needsUpdate = true;
      ribbonGeo.computeVertexNormals();

      // Rotate torso and ring
      torso.rotation.y += delta * 0.5;
      ring.rotation.z += delta * 0.8;

      // Group rotation with mouse lerp
      group.rotation.y += (targetRotY - group.rotation.y) * 0.08;
      group.rotation.x += (targetRotX - group.rotation.x) * 0.08;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 460;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[440px] sm:h-[480px] rounded-3xl bg-slate-50/80 border border-slate-200 overflow-hidden shadow-lg select-none">
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top HUD */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-rose-200 text-xs font-mono text-rose-800 shadow-md">
          <Shirt className="w-3.5 h-3.5 text-rose-600" />
          <span className="font-bold">DUZZA COUTURE 3D ATELIER</span>
          <span className="text-slate-300">•</span>
          <span className="text-navy-950 font-semibold">BESPOKE TEXTILE LAB</span>
        </div>

        <div className="hidden sm:inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-[11px] font-mono text-slate-600 shadow-sm">
          <Eye className="w-3 h-3 text-rose-600 animate-pulse" />
          <span>Interactive 3D Drapery • Drag to Orbit</span>
        </div>
      </div>

      {/* Bottom Telemetry */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center space-x-2 bg-white/95 backdrop-blur-md border border-slate-200 px-4 py-2 rounded-2xl shadow-md text-xs font-mono text-slate-700">
          <Scissors className="w-4 h-4 text-rose-600" />
          <span>Craft: <strong className="text-navy-950 font-bold">Artisanal Savile Row x Lagos Tailoring</strong></span>
        </div>

        <div className="bg-rose-600 text-white px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold shadow-md flex items-center space-x-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>SILK & DAMASK COUTURE</span>
        </div>
      </div>
    </div>
  );
}

