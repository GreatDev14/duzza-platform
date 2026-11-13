"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Sparkles, Crown, Eye, Globe2, Layers } from "lucide-react";

/**
 * Interactive 3D Holographic Brand Prism & Creative Studio Canvas
 * Built natively with Three.js WebGL for Duzza Branding.
 * Features:
 * - Central 3D faceted crystal icosahedron with iridescent refraction
 * - Dual floating orbital luxury rings with dynamic brand typography
 * - Floating creative satellite nodes (Identity, Sports, Production, Strategy)
 * - 360° mouse drag interaction + scroll-driven rotation scrub
 */
export default function Branding3DPrism() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeFacet, setActiveFacet] = useState("IDENTITY ARCHITECTURE");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 480;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc); // Clean light background

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 15);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambient);

    const keyLight = new THREE.PointLight(0x0052ff, 3, 50);
    keyLight.position.set(8, 12, 10);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0x00d4ff, 2.5, 50);
    fillLight.position.set(-10, -8, 8);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xffffff, 2, 50);
    rimLight.position.set(0, 10, -10);
    scene.add(rimLight);

    // Main 3D Prism Group
    const prismGroup = new THREE.Group();
    scene.add(prismGroup);

    // 1. Central Faceted Crystal Icosahedron
    const crystalGeo = new THREE.IcosahedronGeometry(3.2, 0);
    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.1,
      transmission: 0.85,
      thickness: 1.5,
      ior: 1.6,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false,
    });
    const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
    prismGroup.add(crystalMesh);

    // Wireframe Cage for Holographic Effect
    const wireGeo = new THREE.IcosahedronGeometry(3.22, 0);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x0052ff,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    prismGroup.add(wireMesh);

    // 2. Orbital Metallic Golden / Sapphire Rings
    const ring1Geo = new THREE.TorusGeometry(4.8, 0.06, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x0052ff,
      metalness: 0.8,
      roughness: 0.2,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI * 0.35;
    ring1.rotation.y = Math.PI * 0.2;
    prismGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(5.6, 0.05, 16, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x00d4ff,
      metalness: 0.9,
      roughness: 0.1,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI * 0.25;
    ring2.rotation.y = Math.PI * 0.4;
    prismGroup.add(ring2);

    // 3. Floating Creative Pillar Satellite Nodes
    const satelliteGroup = new THREE.Group();
    prismGroup.add(satelliteGroup);

    const nodeColors = [0x0052ff, 0x0284c7, 0x10b981, 0x6366f1];
    const satellites: THREE.Mesh[] = [];

    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2;
      const sGeo = new THREE.OctahedronGeometry(0.5, 0);
      const sMat = new THREE.MeshStandardMaterial({
        color: nodeColors[i],
        metalness: 0.7,
        roughness: 0.2,
      });
      const sMesh = new THREE.Mesh(sGeo, sMat);
      sMesh.position.set(Math.cos(angle) * 5.2, Math.sin(angle) * 1.5, Math.sin(angle) * 5.2);
      satelliteGroup.add(sMesh);
      satellites.push(sMesh);
    }

    // 4. Floating Specular Particle Dust
    const particleGeo = new THREE.BufferGeometry();
    const particleCount = 120;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 16;
      positions[i + 1] = (Math.random() - 0.5) * 16;
      positions[i + 2] = (Math.random() - 0.5) * 16;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x0052ff,
      size: 0.08,
      transparent: true,
      opacity: 0.6,
    });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    scene.add(particlePoints);

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

    // Scroll Scrub Response
    let scrollRot = 0;
    const onScroll = () => {
      scrollRot = window.scrollY * 0.002;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Continuous crystal spin
      crystalMesh.rotation.y += delta * 0.35;
      crystalMesh.rotation.x = Math.sin(elapsed * 0.6) * 0.15;
      wireMesh.rotation.copy(crystalMesh.rotation);

      // Rings opposite rotations
      ring1.rotation.z += delta * 0.5;
      ring2.rotation.z -= delta * 0.4;

      // Orbit satellites
      satelliteGroup.rotation.y = elapsed * 0.4 + scrollRot;
      satellites.forEach((sat, idx) => {
        sat.rotation.x += delta * 1.5;
        sat.rotation.y += delta * 2.0;
        sat.position.y = Math.sin(elapsed * 2 + idx) * 0.6;
      });

      // Smooth mouse drag lerp
      prismGroup.rotation.y += (targetRotY - prismGroup.rotation.y) * 0.08;
      prismGroup.rotation.x += (targetRotX - prismGroup.rotation.x) * 0.08;

      // Subtle particle float
      particlePoints.rotation.y = elapsed * 0.05;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    // Resize
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 480;
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
    <div className="relative w-full h-[460px] sm:h-[520px] rounded-3xl bg-slate-50/80 border border-slate-200 overflow-hidden shadow-lg select-none">
      {/* Three.js Canvas */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top HUD */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-brandBlue-200 text-xs font-mono text-brandBlue-800 shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-brandBlue-600 animate-spin" />
          <span className="font-bold">DUZZA BRANDING PRISM</span>
          <span className="text-slate-300">•</span>
          <span className="text-emerald-600 font-semibold">3D HOLOGRAPHIC STUDIO</span>
        </div>

        <div className="hidden sm:inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-[11px] font-mono text-slate-600 shadow-sm">
          <Eye className="w-3 h-3 text-brandBlue-600 animate-pulse" />
          <span>Interactive 3D Gyro • Drag to Rotate</span>
        </div>
      </div>

      {/* Bottom Pillars Telemetry */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center space-x-2 bg-white/95 backdrop-blur-md border border-slate-200 px-4 py-2 rounded-2xl shadow-md text-xs font-mono text-slate-700">
          <Crown className="w-4 h-4 text-brandBlue-600" />
          <span>Focus: <strong className="text-brandBlue-700 font-bold">{activeFacet}</strong></span>
        </div>

        <div className="bg-brandBlue-600 text-white px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold shadow-md flex items-center space-x-1.5">
          <Globe2 className="w-3.5 h-3.5 animate-pulse" />
          <span>LAGOS • WARRI • LONDON REACH</span>
        </div>
      </div>
    </div>
  );
}

