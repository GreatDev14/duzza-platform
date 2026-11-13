"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Globe2, ShieldCheck, Radio, Compass } from "lucide-react";

export default function EnterpriseOperationsGlobe3D() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeSector, setActiveSector] = useState<"MARINE" | "CIVIL" | "GLOBAL">("MARINE");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 520;
    let height = container.clientHeight || 460;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x140a05);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 1.5, 13.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    container.appendChild(renderer.domElement);

    // Lighting (Warm Ambient Gold & Saddle Brown)
    const ambient = new THREE.AmbientLight(0xfff6de, 1.2);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xd4af37, 2.5);
    keyLight.position.set(8, 10, 10);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x8b5a2b, 1.5);
    fillLight.position.set(-8, -5, 6);
    scene.add(fillLight);

    // Master centered group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 1. Inner Core Sphere (Translucent Dark Obsidian Bronze)
    const coreGeo = new THREE.IcosahedronGeometry(3.2, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x26170e,
      roughness: 0.35,
      metalness: 0.4,
      transparent: true,
      opacity: 0.9,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    globeGroup.add(coreMesh);

    // 2. Outer Geodesic Wireframe Cage (Glowing Pale Gold)
    const wireGeo = new THREE.IcosahedronGeometry(3.26, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    globeGroup.add(wireMesh);

    // 3. Three Tilted Orbital Rings + Satellites (Brown, Gold & Burnished Amber)
    const ringConfigs = [
      { radius: 4.4, tiltX: 0.55, tiltZ: 0.2, color: 0x8b5a2b, speed: 0.012 },
      { radius: 5.0, tiltX: -0.45, tiltZ: 0.7, color: 0xd4af37, speed: -0.009 },
      { radius: 5.5, tiltX: 0.85, tiltZ: -0.4, color: 0xf3c966, speed: 0.007 },
    ];

    const satellites: { pivot: THREE.Group; speed: number }[] = [];

    ringConfigs.forEach((cfg) => {
      const ringPivot = new THREE.Group();
      ringPivot.rotation.x = cfg.tiltX;
      ringPivot.rotation.z = cfg.tiltZ;

      const torusGeo = new THREE.TorusGeometry(cfg.radius, 0.035, 16, 100);
      const torusMat = new THREE.MeshBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: 0.45,
      });
      const torus = new THREE.Mesh(torusGeo, torusMat);
      torus.rotation.x = Math.PI / 2;
      ringPivot.add(torus);

      // Orbiting Satellite Node
      const satGeo = new THREE.SphereGeometry(0.24, 20, 20);
      const satMat = new THREE.MeshStandardMaterial({
        color: cfg.color,
        emissive: cfg.color,
        emissiveIntensity: 0.7,
      });
      const sat = new THREE.Mesh(satGeo, satMat);
      sat.position.set(cfg.radius, 0, 0);
      ringPivot.add(sat);

      globeGroup.add(ringPivot);
      satellites.push({ pivot: ringPivot, speed: cfg.speed });
    });

    // 4. Surface Beacon Nodes (Warri, Lagos, Offshore)
    const beaconPositions = [
      [2.1, 1.4, 2.0],
      [-1.9, 1.8, 1.9],
      [0.6, -2.0, 2.5],
      [2.5, -0.8, -1.9],
    ];
    const beaconGeo = new THREE.SphereGeometry(0.16, 16, 16);
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    beaconPositions.forEach(([x, y, z]) => {
      const b = new THREE.Mesh(beaconGeo, beaconMat);
      b.position.set(x, y, z);
      globeGroup.add(b);
    });

    // Interactive Drag & Scroll
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let targetRotY = 0;
    let targetRotX = 0.15;
    let scrollBoost = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      targetRotY += (e.clientX - prevX) * 0.008;
      targetRotX += (e.clientY - prevY) * 0.006;
      prevX = e.clientX;
      prevY = e.clientY;
    };
    const onPointerUp = () => {
      isDragging = false;
    };
    const onScroll = () => {
      scrollBoost = (window.scrollY || 0) * 0.0012;
    };

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("scroll", onScroll, { passive: true });

    // ResizeObserver guarantees centered framing even after layout shifts
    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      if (newW > 0 && newH > 0) {
        width = newW;
        height = newH;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    });
    resizeObserver.observe(container);

    let animId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      if (!isDragging) {
        targetRotY += 0.004;
      }

      globeGroup.rotation.y += (targetRotY + scrollBoost - globeGroup.rotation.y) * 0.06;
      globeGroup.rotation.x += (targetRotX - globeGroup.rotation.x) * 0.06;
      globeGroup.position.y = Math.sin(elapsed * 1.4) * 0.22;

      satellites.forEach((s) => {
        s.pivot.rotation.y += s.speed;
      });

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("scroll", onScroll);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[320px] sm:h-[420px] lg:h-[480px] rounded-2xl sm:rounded-3xl bg-[#140A05] border border-[#3D2415] shadow-2xl shadow-black/80 overflow-hidden select-none">
      {/* Centered 3D Canvas */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Overlay Header */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 pointer-events-none">
        <div className="px-3.5 py-2 rounded-2xl bg-[#1C110A]/95 backdrop-blur-md border border-[#D4AF37]/30 shadow-md flex items-center space-x-2">
          <Globe2 className="w-4 h-4 text-[#D4AF37]" />
          <div>
            <span className="text-[11px] font-bold text-[#FFF6DE] block leading-tight">
              Global Operations Network
            </span>
            <span className="text-[10px] font-mono text-[#D4AF37]/80 block">
              Drag to orbit 360° • Warri → International
            </span>
          </div>
        </div>

        <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#26170E] border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-mono font-bold shadow-sm">
          <Radio className="w-3 h-3 text-[#D4AF37] animate-pulse" />
          <span>NETWORK ONLINE</span>
        </div>
      </div>

      {/* Bottom Interactive Telemetry Pills */}
      <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 grid grid-cols-3 gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-2xl bg-[#1C110A]/95 backdrop-blur-md border border-[#D4AF37]/30 shadow-xl">
        <button
          type="button"
          onClick={() => setActiveSector("MARINE")}
          style={activeSector === "MARINE" ? { backgroundColor: "#D4AF37", color: "#140A05" } : {}}
          className={`min-w-0 py-1.5 sm:py-2 px-1.5 sm:px-2.5 rounded-xl text-[10px] sm:text-[11px] font-bold transition-all flex items-center justify-center space-x-1 sm:space-x-1.5 cursor-pointer ${
            activeSector === "MARINE"
              ? "bg-[#D4AF37] text-[#140A05] shadow-sm font-extrabold"
              : "text-[#EED9B3]/80 hover:text-[#FFF6DE] hover:bg-[#26170E]"
          }`}
        >
          <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 text-[#140A05]" />
          <span className="truncate">Marine Base</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSector("CIVIL")}
          style={activeSector === "CIVIL" ? { backgroundColor: "#D4AF37", color: "#140A05" } : {}}
          className={`min-w-0 py-1.5 sm:py-2 px-1.5 sm:px-2.5 rounded-xl text-[10px] sm:text-[11px] font-bold transition-all flex items-center justify-center space-x-1 sm:space-x-1.5 cursor-pointer ${
            activeSector === "CIVIL"
              ? "bg-[#D4AF37] text-[#140A05] shadow-sm font-extrabold"
              : "text-[#EED9B3]/80 hover:text-[#FFF6DE] hover:bg-[#26170E]"
          }`}
        >
          <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 text-[#140A05]" />
          <span className="truncate">ISO Standards</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSector("GLOBAL")}
          style={activeSector === "GLOBAL" ? { backgroundColor: "#D4AF37", color: "#140A05" } : {}}
          className={`min-w-0 py-1.5 sm:py-2 px-1.5 sm:px-2.5 rounded-xl text-[10px] sm:text-[11px] font-bold transition-all flex items-center justify-center space-x-1 sm:space-x-1.5 cursor-pointer ${
            activeSector === "GLOBAL"
              ? "bg-[#D4AF37] text-[#140A05] shadow-sm font-extrabold"
              : "text-[#EED9B3]/80 hover:text-[#FFF6DE] hover:bg-[#26170E]"
          }`}
        >
          <Globe2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 text-[#140A05]" />
          <span className="truncate">Global Reach</span>
        </button>
      </div>
    </div>
  );
}

