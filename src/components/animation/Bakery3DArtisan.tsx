"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { UtensilsCrossed, Coffee, Eye, Sparkles } from "lucide-react";

/**
 * Interactive 3D Artisan Confectionery & Bakery Canvas
 * Three.js WebGL simulation for Duzza Bakery.
 * Features:
 * - 3D procedural artisan sourdough loaf with golden crust texture & flour dusting
 * - Rising organic warm aroma steam particles
 * - Orbiting golden wheat sheaf spiral rings
 * - 360° mouse drag orbit + scroll-driven baking spin
 */
export default function Bakery3DArtisan() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 460;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050b18);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 3, 13);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lighting (Warm artisan golden daylight)
    const ambient = new THREE.AmbientLight(0xfffbeb, 1.4);
    scene.add(ambient);

    const sun = new THREE.DirectionalLight(0xfef3c7, 1.6);
    sun.position.set(8, 15, 10);
    scene.add(sun);

    const warmFill = new THREE.PointLight(0xd97706, 2.5, 40);
    warmFill.position.set(-8, 5, 6);
    scene.add(warmFill);

    const bakeryGroup = new THREE.Group();
    scene.add(bakeryGroup);

    // 1. Procedural 3D Artisan Sourdough Boule Mesh
    const loafGeo = new THREE.SphereGeometry(2.4, 32, 24);
    loafGeo.scale(1.2, 0.75, 1.0);

    // Add artisan crust scoring cuts & rustic surface bumps
    const pos = loafGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      const bump = Math.sin(x * 3) * Math.cos(z * 3) * 0.15;
      pos.setX(i, x + bump);
      pos.setY(i, y + bump);
      pos.setZ(i, z + bump);
    }
    loafGeo.computeVertexNormals();

    const loafMat = new THREE.MeshStandardMaterial({
      color: 0xb45309, // Rich golden brown crust
      roughness: 0.85,
      metalness: 0.05,
    });
    const loaf = new THREE.Mesh(loafGeo, loafMat);
    loaf.position.y = 0.5;
    bakeryGroup.add(loaf);

    // Flour Dusting Overlay
    const flourMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const flourMesh = new THREE.Mesh(loafGeo, flourMat);
    flourMesh.position.y = 0.5;
    bakeryGroup.add(flourMesh);

    // 2. Marble Cutting Board Pedestal
    const boardGeo = new THREE.CylinderGeometry(4.2, 4.4, 0.35, 32);
    const boardMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.1,
    });
    const board = new THREE.Mesh(boardGeo, boardMat);
    board.position.y = -1.2;
    bakeryGroup.add(board);

    // 3. Orbiting Golden Wheat Spiral Ring
    const spiralGeo = new THREE.TorusGeometry(4.2, 0.06, 16, 80);
    const spiralMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.8,
      roughness: 0.2,
    });
    const spiral = new THREE.Mesh(spiralGeo, spiralMat);
    spiral.rotation.x = Math.PI * 0.4;
    bakeryGroup.add(spiral);

    // 4. Rising Warm Aroma Steam Particles
    const steamGeo = new THREE.BufferGeometry();
    const steamCount = 65;
    const steamPositions = new Float32Array(steamCount * 3);
    const steamVelocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < steamCount; i++) {
      steamPositions[i * 3] = (Math.random() - 0.5) * 2;
      steamPositions[i * 3 + 1] = 1.0 + Math.random() * 3.5;
      steamPositions[i * 3 + 2] = (Math.random() - 0.5) * 2;
      steamVelocities.push({
        x: (Math.random() - 0.5) * 0.015,
        y: Math.random() * 0.02 + 0.015,
        z: (Math.random() - 0.5) * 0.015,
      });
    }
    steamGeo.setAttribute("position", new THREE.BufferAttribute(steamPositions, 3));
    const steamMat = new THREE.PointsMaterial({
      color: 0xfef3c7,
      size: 0.18,
      transparent: true,
      opacity: 0.6,
    });
    const steamPoints = new THREE.Points(steamGeo, steamMat);
    bakeryGroup.add(steamPoints);

    // Mouse Interaction
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotY = 0;
    let targetRotX = 0.2;

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

    let scrollSpin = 0;
    const onScroll = () => {
      scrollSpin = window.scrollY * 0.002;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Loaf gentle rotation
      loaf.rotation.y += delta * 0.4;
      flourMesh.rotation.y = loaf.rotation.y;
      spiral.rotation.z += delta * 0.6;

      // Update steam particles rising upward
      const posAttr = steamGeo.attributes.position;
      for (let i = 0; i < steamCount; i++) {
        let curY = posAttr.getY(i) + steamVelocities[i].y;
        if (curY > 5.5) {
          curY = 1.0;
          posAttr.setX(i, (Math.random() - 0.5) * 1.5);
          posAttr.setZ(i, (Math.random() - 0.5) * 1.5);
        }
        posAttr.setY(i, curY);
        posAttr.setX(i, posAttr.getX(i) + Math.sin(elapsed * 2 + i) * 0.005);
      }
      posAttr.needsUpdate = true;

      // Group rotation
      bakeryGroup.rotation.y += (targetRotY + scrollSpin - bakeryGroup.rotation.y) * 0.08;
      bakeryGroup.rotation.x += (targetRotX - bakeryGroup.rotation.x) * 0.08;

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
    <div className="relative w-full h-[440px] sm:h-[480px] rounded-3xl bg-[#050B18] border border-[#1B325C] overflow-hidden shadow-2xl select-none">
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top HUD */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#091224]/95 backdrop-blur-md border border-[#D4AF37]/30 text-xs font-mono text-[#D4AF37] shadow-md">
          <UtensilsCrossed className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="font-bold">DUZZA ARTISAN BAKERY & PATISSERIE</span>
          <span className="text-[#1B325C]">•</span>
          <span className="text-[#38BDF8] font-semibold">SLOW FERMENTATION 3D LAB</span>
        </div>

        <div className="hidden sm:inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#091224]/90 backdrop-blur-md border border-[#1B325C] text-[11px] font-mono text-[#94A3B8] shadow-sm">
          <Eye className="w-3 h-3 text-[#D4AF37] animate-pulse" />
          <span>Interactive 3D Crumb & Crust • Drag to Rotate</span>
        </div>
      </div>

      {/* Bottom Telemetry */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center space-x-2 bg-[#091224]/95 backdrop-blur-md border border-[#1B325C] px-4 py-2 rounded-2xl shadow-md text-xs font-mono text-[#CBD5E1]">
          <Coffee className="w-4 h-4 text-[#D4AF37]" />
          <span>Specialty: <strong className="text-white font-bold">48-Hr Wild Yeast Sourdough & French Viennoiserie</strong></span>
        </div>

        <div className="bg-[#D4AF37] text-[#050B18] px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold shadow-md flex items-center space-x-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#050B18]" />
          <span>WARRI FLAGSHIP GOURMET</span>
        </div>
      </div>
    </div>
  );
}

