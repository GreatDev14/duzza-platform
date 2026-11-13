"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { HardHat, Layers, ShieldCheck, ArrowUpRight, CheckCircle2 } from "lucide-react";

/**
 * 3D Interactive Heavy Civil Structural Foundation & Piling Matrix
 * (Replaces reference screenshot with real 3D WebGL structural engineering model)
 */
export default function Civil3DFoundations() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [activeLayer, setActiveLayer] = useState<string>("DEEP_PILING");

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 500;
    let height = container.clientHeight || 420;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(20, 16, 22);
    camera.lookAt(0, 3, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
    sunLight.position.set(20, 25, 15);
    sunLight.castShadow = true;
    scene.add(sunLight);

    const orangeAccentLight = new THREE.PointLight(0xea580c, 2.0, 50);
    orangeAccentLight.position.set(-10, 8, -10);
    scene.add(orangeAccentLight);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Geological Soil Strata Layers (Riverine Delta Soil Strata)
    const strataColors = [0xe2e8f0, 0xcfd8dc, 0xb0bec5, 0x90a4ae];
    const strataGroup = new THREE.Group();
    mainGroup.add(strataGroup);

    for (let i = 0; i < 4; i++) {
      const slabGeo = new THREE.BoxGeometry(20, 0.8, 20);
      const slabMat = new THREE.MeshStandardMaterial({
        color: strataColors[i],
        roughness: 0.7,
        metalness: 0.1,
      });
      const slab = new THREE.Mesh(slabGeo, slabMat);
      slab.position.y = -i * 0.9 - 0.5;
      strataGroup.add(slab);
    }

    // 2. Concrete Bored Piles (Penetrating down through soil strata)
    const pileMat = new THREE.MeshStandardMaterial({
      color: 0x475569, // Reinforced concrete
      roughness: 0.4,
      metalness: 0.2,
    });

    const pilePositions = [
      [-6, -6], [0, -6], [6, -6],
      [-6, 0], [0, 0], [6, 0],
      [-6, 6], [0, 6], [6, 6],
    ];

    pilePositions.forEach(([px, pz]) => {
      const pileGeo = new THREE.CylinderGeometry(0.5, 0.5, 7.5, 24);
      const pileMesh = new THREE.Mesh(pileGeo, pileMat);
      pileMesh.position.set(px, -1.8, pz);
      mainGroup.add(pileMesh);
    });

    // 3. Heavy Foundation Raft Slab (Reinforced Concrete Cap)
    const raftGeo = new THREE.BoxGeometry(18, 1.2, 18);
    const raftMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.1,
    });
    const raftMesh = new THREE.Mesh(raftGeo, raftMat);
    raftMesh.position.y = 1.0;
    raftMesh.castShadow = true;
    raftMesh.receiveShadow = true;
    mainGroup.add(raftMesh);

    // Raft Edge Lines
    const raftEdges = new THREE.EdgesGeometry(raftGeo);
    const raftLines = new THREE.LineSegments(
      raftEdges,
      new THREE.LineBasicMaterial({ color: 0xea580c, linewidth: 2 })
    );
    raftLines.position.copy(raftMesh.position);
    mainGroup.add(raftLines);

    // 4. Superstructure Structural Columns & Girders (Steel Frame)
    const steelMat = new THREE.MeshStandardMaterial({
      color: 0xea580c, // Safety structural orange
      metalness: 0.8,
      roughness: 0.2,
    });

    // Columns
    const colCoords = [
      [-6, -6], [6, -6], [-6, 6], [6, 6], [0, 0]
    ];
    colCoords.forEach(([cx, cz]) => {
      const colGeo = new THREE.BoxGeometry(0.6, 7.0, 0.6);
      const col = new THREE.Mesh(colGeo, steelMat);
      col.position.set(cx, 4.8, cz);
      mainGroup.add(col);
    });

    // Top Header Beams
    const beamMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.7, roughness: 0.3 });
    const beamGeo1 = new THREE.BoxGeometry(13.2, 0.5, 0.5);
    const b1 = new THREE.Mesh(beamGeo1, beamMat);
    b1.position.set(0, 8.2, -6);
    mainGroup.add(b1);

    const b2 = new THREE.Mesh(beamGeo1, beamMat);
    b2.position.set(0, 8.2, 6);
    mainGroup.add(b2);

    const beamGeo2 = new THREE.BoxGeometry(0.5, 0.5, 13.2);
    const b3 = new THREE.Mesh(beamGeo2, beamMat);
    b3.position.set(-6, 8.2, 0);
    mainGroup.add(b3);

    const b4 = new THREE.Mesh(beamGeo2, beamMat);
    b4.position.set(6, 8.2, 0);
    mainGroup.add(b4);

    // 5. Crane Tower Vector Wireframe
    const craneGeo = new THREE.CylinderGeometry(0.3, 0.3, 12, 16);
    const craneMesh = new THREE.Mesh(craneGeo, steelMat);
    craneMesh.position.set(0, 7.5, 0);
    mainGroup.add(craneMesh);

    // Horizontal Jib Arm
    const jibGeo = new THREE.BoxGeometry(14, 0.4, 0.4);
    const jib = new THREE.Mesh(jibGeo, steelMat);
    jib.position.set(4, 13.5, 0);
    mainGroup.add(jib);

    // Cable & Hook
    const cableGeo = new THREE.CylinderGeometry(0.04, 0.04, 5, 8);
    const cable = new THREE.Mesh(cableGeo, new THREE.MeshBasicMaterial({ color: 0x94a3b8 }));
    cable.position.set(7, 10.8, 0);
    mainGroup.add(cable);

    // 6. Mouse Parallax Tilt
    let targetRotY = 0;
    let targetRotX = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / width) * 2 - 1;
      const my = -(((e.clientY - rect.top) / height) * 2 - 1);
      targetRotY = mx * 0.4;
      targetRotX = -my * 0.2;
    };
    container.addEventListener("mousemove", onMouseMove);

    // Resize
    const onResize = () => {
      if (!container) return;
      width = container.clientWidth || 500;
      height = container.clientHeight || 420;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    // 7. Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Smooth parallax tilt
      mainGroup.rotation.y += (targetRotY - mainGroup.rotation.y) * 0.05 + 0.0015;
      mainGroup.rotation.x += (targetRotX - mainGroup.rotation.x) * 0.05;

      // Jib crane gentle scan rotation
      jib.rotation.y = Math.sin(elapsed * 0.5) * 0.45;
      cable.position.x = 7 * Math.cos(jib.rotation.y);
      cable.position.z = -7 * Math.sin(jib.rotation.y);

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[280px] sm:h-[380px] md:h-[460px] rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#091224] via-[#050B18] to-[#091224] border border-[#1B325C] shadow-2xl overflow-hidden group select-none">
      {/* 3D Canvas */}
      <div 
        ref={mountRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing" 
        style={{ touchAction: "pan-y" }}
      />

      {/* Floating HUD Telemetry */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#091224]/95 backdrop-blur-md border border-[#1B325C] shadow-xl space-y-1 sm:space-y-1.5 pointer-events-none max-w-[85%] sm:max-w-none">
        <div className="flex items-center space-x-1.5 sm:space-x-2 text-[11px] sm:text-xs font-bold text-white">
          <HardHat className="w-3.5 h-3.5 text-[#D4AF37] animate-bounce shrink-0" />
          <span className="truncate">Structural Piling & Foundation Matrix</span>
        </div>
        <div className="hidden sm:grid grid-cols-2 gap-x-4 gap-y-0.5 text-[10px] font-mono text-[#94A3B8]">
          <div>Foundation Depth: <strong className="text-[#D4AF37]">-12.5m Piling</strong></div>
          <div>Bearing Capacity: <strong className="text-white">450 kN/m²</strong></div>
          <div>Concrete Grade: <strong className="text-[#38BDF8]">C35/45 Marine</strong></div>
          <div>Strata Density: <strong className="text-[#10B981]">1.95 g/cm³</strong></div>
        </div>
        <div className="sm:hidden text-[9px] font-mono text-[#D4AF37] truncate">
          C35/45 Marine Concrete • -12.5m Piling Depth
        </div>
      </div>

      {/* Bottom Live Safety Badge */}
      <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#94A3B8] px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl bg-[#091224]/85 backdrop-blur-md border border-[#1B325C]">
        <span className="flex items-center space-x-1.5 text-[#D4AF37] font-bold truncate">
          <Layers className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">RIVERINE STRATA STABILIZED</span>
        </span>
        <span className="text-[9px] sm:text-[10px] text-[#64748B] shrink-0 ml-2">EUROCODE 7 / BS EN</span>
      </div>
    </div>
  );
}

