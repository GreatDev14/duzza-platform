"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Building2, ShieldCheck, Award, Eye, Layers } from "lucide-react";

/**
 * Interactive 3D Corporate Holding Architecture Model
 * Native Three.js WebGL for Duzza Limited Corporate Profile & Governance.
 * Features:
 * - Central parent holding crystal monolith (DUZZA LIMITED CAMA 2020)
 * - 4 orbiting subsidiary platform rings connected with animated laser trusses
 * - Telemetry indicators for Projects, Branding, Couture, and Culinary verticals
 * - 360° mouse drag interaction + scroll-triggered camera fly-around
 */
export default function Holding3DArchitecture() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedVertical, setSelectedVertical] = useState("DUZZA CONGLOMERATE PARENT");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 460;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050b18);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 8, 18);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambient);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight1.position.set(10, 20, 15);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x0052ff, 1.0);
    dirLight2.position.set(-15, 10, -10);
    scene.add(dirLight2);

    // Architectural Group
    const holdingGroup = new THREE.Group();
    scene.add(holdingGroup);

    // 1. Central Parent Holding Monolith (Clean white & electric blue chamfered tower)
    const coreGeo = new THREE.CylinderGeometry(1.6, 2.2, 5.0, 8);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.2,
      roughness: 0.1,
      transmission: 0.7,
      thickness: 1.2,
      clearcoat: 1.0,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.y = 1.0;
    holdingGroup.add(coreMesh);

    // Central Wireframe Hologram
    const coreWireGeo = new THREE.CylinderGeometry(1.62, 2.22, 5.02, 8);
    const coreWireMat = new THREE.MeshBasicMaterial({
      color: 0x0052ff,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const coreWire = new THREE.Mesh(coreWireGeo, coreWireMat);
    coreWire.position.y = 1.0;
    holdingGroup.add(coreWire);

    // Holding Top Crown (Blue crystal pyramid)
    const crownGeo = new THREE.ConeGeometry(1.6, 1.4, 8);
    const crownMat = new THREE.MeshStandardMaterial({
      color: 0x0052ff,
      metalness: 0.8,
      roughness: 0.2,
    });
    const crown = new THREE.Mesh(crownGeo, crownMat);
    crown.position.y = 4.2;
    holdingGroup.add(crown);

    // 2. Foundation Base Pedestal Rings
    const baseGrid = new THREE.GridHelper(20, 20, 0x0052ff, 0xe2e8f0);
    baseGrid.position.y = -1.5;
    scene.add(baseGrid);

    // 3. Orbiting Subsidiary Platform Nodes (The 4 Verticals)
    const subsidiaries = [
      { name: "Duzza Projects (Civil & Marine)", color: 0x0052ff, angle: 0 },
      { name: "Duzza Branding (Creative Agency)", color: 0x10b981, angle: Math.PI * 0.5 },
      { name: "Duzza Fashion (Bespoke Couture)", color: 0xf43f5e, angle: Math.PI },
      { name: "Duzza Bakery (Hospitality)", color: 0xf59e0b, angle: Math.PI * 1.5 },
    ];

    const nodeMeshes: THREE.Mesh[] = [];
    const beamLines: THREE.Line[] = [];

    subsidiaries.forEach((sub) => {
      const dist = 6.2;
      const x = Math.cos(sub.angle) * dist;
      const z = Math.sin(sub.angle) * dist;

      // Subsidiary Platform Pad
      const padGeo = new THREE.CylinderGeometry(1.1, 1.2, 0.4, 16);
      const padMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.3,
        roughness: 0.2,
      });
      const pad = new THREE.Mesh(padGeo, padMat);
      pad.position.set(x, -0.6, z);
      holdingGroup.add(pad);

      // Subsidiary Crystal Core
      const nodeGeo = new THREE.OctahedronGeometry(0.7, 0);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: sub.color,
        metalness: 0.8,
        roughness: 0.2,
      });
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.set(x, 0.4, z);
      holdingGroup.add(node);
      nodeMeshes.push(node);

      // Connecting Laser Beam Line from Parent to Subsidiary
      const lineMat = new THREE.LineBasicMaterial({
        color: sub.color,
        transparent: true,
        opacity: 0.6,
      });
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 1.2, 0),
        new THREE.Vector3(x, 0.4, z),
      ]);
      const line = new THREE.Line(lineGeo, lineMat);
      holdingGroup.add(line);
      beamLines.push(line);
    });

    // Orbit Ring
    const orbitRingGeo = new THREE.TorusGeometry(6.2, 0.04, 16, 80);
    const orbitRingMat = new THREE.MeshBasicMaterial({
      color: 0x0052ff,
      transparent: true,
      opacity: 0.3,
    });
    const orbitRing = new THREE.Mesh(orbitRingGeo, orbitRingMat);
    orbitRing.rotation.x = Math.PI * 0.5;
    orbitRing.position.y = -0.6;
    holdingGroup.add(orbitRing);

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

      targetRotY += dx * 0.008;
      targetRotX = Math.max(-0.2, Math.min(0.6, targetRotX + dy * 0.008));
    };
    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Scroll scrub
    let scrollRot = 0;
    const onScroll = () => {
      scrollRot = window.scrollY * 0.0015;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Parent core rotation
      coreMesh.rotation.y += delta * 0.4;
      coreWire.rotation.y = coreMesh.rotation.y;
      crown.rotation.y += delta * 0.6;

      // Nodes spin and float
      nodeMeshes.forEach((n, idx) => {
        n.rotation.y += delta * 1.5;
        n.rotation.x += delta * 0.8;
        n.position.y = 0.4 + Math.sin(elapsed * 2 + idx) * 0.15;
      });

      // Group rotation
      holdingGroup.rotation.y = elapsed * 0.15 + scrollRot + targetRotY;
      holdingGroup.rotation.x = targetRotX;

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
          <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="font-bold">DUZZA HOLDING 3D ARCHITECTURE</span>
          <span className="text-[#1B325C]">•</span>
          <span className="text-[#38BDF8] font-semibold">CAMA 2020 RC-7149208</span>
        </div>

        <div className="hidden sm:inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#091224]/90 backdrop-blur-md border border-[#1B325C] text-[11px] font-mono text-[#94A3B8] shadow-sm">
          <Eye className="w-3 h-3 text-[#D4AF37] animate-pulse" />
          <span>Interactive Orbit • Drag 360°</span>
        </div>
      </div>

      {/* Bottom Telemetry */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center space-x-2 bg-[#091224]/95 backdrop-blur-md border border-[#1B325C] px-4 py-2 rounded-2xl shadow-md text-xs font-mono text-[#CBD5E1]">
          <ShieldCheck className="w-4 h-4 text-[#10B981]" />
          <span>Parent: <strong className="text-white font-bold">DUZZA LIMITED</strong> (4 Operational Subsidiaries)</span>
        </div>

        <div className="bg-[#D4AF37] text-[#050B18] px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold shadow-md flex items-center space-x-1.5">
          <Award className="w-3.5 h-3.5 text-[#050B18]" />
          <span>WARRI HEADQUARTERS</span>
        </div>
      </div>
    </div>
  );
}

