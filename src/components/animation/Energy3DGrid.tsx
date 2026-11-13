"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Sun, Gauge, Activity, Zap, CheckCircle2 } from "lucide-react";

/**
 * 3D Interactive Energy, Solar & Flowstation Pipeline Grid
 * (Replaces reference screenshot with real 3D WebGL solar infrastructure & pipeline network)
 */
export default function Energy3DGrid() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [telemetry, setTelemetry] = useState({
    solarOutput: "4.28 MW",
    pressure: "1,240 PSI",
    flowRate: "85,400 BPD",
    efficiency: "99.4%",
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 500;
    let height = container.clientHeight || 420;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(18, 14, 22);
    camera.lookAt(0, 2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff5db, 2.2);
    sunLight.position.set(20, 30, 15);
    sunLight.castShadow = true;
    scene.add(sunLight);

    const blueLight = new THREE.DirectionalLight(0x0284c7, 1.2);
    blueLight.position.set(-15, 10, -10);
    scene.add(blueLight);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Foundation Base Plate
    const baseGeo = new THREE.BoxGeometry(26, 0.8, 26);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.3,
      metalness: 0.1,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = -0.4;
    baseMesh.receiveShadow = true;
    mainGroup.add(baseMesh);

    // Grid on Ground
    const gridHelper = new THREE.GridHelper(26, 16, 0x0284c7, 0xe2e8f0);
    gridHelper.position.y = 0.02;
    mainGroup.add(gridHelper);

    // 2. Industrial Solar Panel Arrays (Multiple angled PV panels)
    const panelGroup = new THREE.Group();
    mainGroup.add(panelGroup);

    const pvMat = new THREE.MeshPhysicalMaterial({
      color: 0x0c4a6e, // Deep photovoltaic blue
      metalness: 0.9,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.8,
      roughness: 0.3,
    });

    const panelRows = 3;
    const panelCols = 3;

    for (let r = 0; r < panelRows; r++) {
      for (let c = 0; c < panelCols; c++) {
        const x = (c - 1) * 6;
        const z = (r - 1) * 6 - 2;

        const singlePanelGroup = new THREE.Group();
        singlePanelGroup.position.set(x, 0, z);

        // Stand legs
        const leg1Geo = new THREE.CylinderGeometry(0.08, 0.08, 1.8, 16);
        const leg1 = new THREE.Mesh(leg1Geo, frameMat);
        leg1.position.set(-1.8, 0.9, 0);
        singlePanelGroup.add(leg1);

        const leg2 = new THREE.Mesh(leg1Geo, frameMat);
        leg2.position.set(1.8, 0.9, 0);
        singlePanelGroup.add(leg2);

        // Panel Surface
        const pvGeo = new THREE.BoxGeometry(4.6, 0.12, 3.2);
        const pvMesh = new THREE.Mesh(pvGeo, pvMat);
        pvMesh.position.y = 1.9;
        pvMesh.rotation.x = -Math.PI / 6; // 30-degree solar tilt
        pvMesh.castShadow = true;
        singlePanelGroup.add(pvMesh);

        panelGroup.add(singlePanelGroup);
      }
    }

    // 3. Flowstation Oil & Gas Manifold Pipeline System
    const pipeGroup = new THREE.Group();
    mainGroup.add(pipeGroup);

    const pipeMat = new THREE.MeshStandardMaterial({
      color: 0x64748b, // Industrial steel
      metalness: 0.85,
      roughness: 0.25,
    });
    const valveMat = new THREE.MeshStandardMaterial({
      color: 0xef4444, // Red safety valve
      metalness: 0.5,
      roughness: 0.3,
    });

    // Main Headers
    for (let i = 0; i < 2; i++) {
      const zPos = 8 + i * 2.5;
      const pipeGeo = new THREE.CylinderGeometry(0.35, 0.35, 24, 24);
      pipeGeo.rotateZ(Math.PI / 2);
      const pipeMesh = new THREE.Mesh(pipeGeo, pipeMat);
      pipeMesh.position.set(0, 1.2, zPos);
      pipeGroup.add(pipeMesh);

      // Flanges & Valves
      for (let f = -8; f <= 8; f += 4) {
        const flangeGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.25, 24);
        flangeGeo.rotateZ(Math.PI / 2);
        const flange = new THREE.Mesh(flangeGeo, pipeMat);
        flange.position.set(f, 1.2, zPos);
        pipeGroup.add(flange);

        if (f % 8 === 0) {
          const valveGeo = new THREE.TorusGeometry(0.6, 0.12, 16, 32);
          valveGeo.rotateX(Math.PI / 2);
          const valve = new THREE.Mesh(valveGeo, valveMat);
          valve.position.set(f, 2.0, zPos);
          pipeGroup.add(valve);
        }
      }
    }

    // 4. Luminous Flow Pulse Particles (Simulating energy and oil transfer)
    const pulseCount = 18;
    const pulseGeo = new THREE.SphereGeometry(0.22, 16, 16);
    const pulseMat = new THREE.MeshBasicMaterial({ color: 0x00c2cb });
    const pulses: { mesh: THREE.Mesh; x: number; speed: number; z: number }[] = [];

    for (let i = 0; i < pulseCount; i++) {
      const mesh = new THREE.Mesh(pulseGeo, pulseMat);
      const z = i % 2 === 0 ? 8 : 10.5;
      const x = (Math.random() - 0.5) * 20;
      mesh.position.set(x, 1.2, z);
      pipeGroup.add(mesh);
      pulses.push({
        mesh,
        x,
        speed: 0.08 + Math.random() * 0.05,
        z,
      });
    }

    // 5. Mouse Parallax Tilt
    let targetRotY = 0;
    let targetRotX = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / width) * 2 - 1;
      const my = -(((e.clientY - rect.top) / height) * 2 - 1);
      targetRotY = mx * 0.35;
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

    // 6. Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Smooth parallax tilt
      mainGroup.rotation.y += (targetRotY - mainGroup.rotation.y) * 0.05;
      mainGroup.rotation.x += (targetRotX - mainGroup.rotation.x) * 0.05;

      // Animate solar panel tracking rotation (micro adjustment)
      panelGroup.children.forEach((p, idx) => {
        const pv = p.children[2];
        if (pv) {
          pv.rotation.x = -Math.PI / 6 + Math.sin(elapsed * 0.6 + idx) * 0.04;
        }
      });

      // Animate pipeline pulses
      pulses.forEach((p) => {
        p.x += p.speed;
        if (p.x > 11) p.x = -11;
        p.mesh.position.x = p.x;
      });

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
    <div className="relative w-full h-[400px] sm:h-[460px] rounded-3xl bg-gradient-to-b from-[#091224] via-[#050B18] to-[#091224] border border-[#1B325C] shadow-2xl overflow-hidden group">
      {/* 3D Canvas */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating HUD Telemetry */}
      <div className="absolute top-4 left-4 p-3.5 rounded-2xl bg-[#091224]/95 backdrop-blur-md border border-[#1B325C] shadow-xl space-y-1.5 pointer-events-none">
        <div className="flex items-center space-x-2 text-xs font-bold text-white">
          <Sun className="w-4 h-4 text-[#D4AF37] animate-spin-slow" />
          <span>Industrial Solar & Flowstation Infrastructure</span>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-[10px] font-mono text-[#94A3B8]">
          <div>Array Generation: <strong className="text-[#D4AF37]">{telemetry.solarOutput}</strong></div>
          <div>Manifold Pressure: <strong className="text-[#38BDF8]">{telemetry.pressure}</strong></div>
          <div>Liquid Flowrate: <strong className="text-white">{telemetry.flowRate}</strong></div>
          <div>System Uptime: <strong className="text-[#10B981]">{telemetry.efficiency}</strong></div>
        </div>
      </div>

      {/* Bottom Live Safety Badge */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-[#94A3B8] px-3 py-1.5 rounded-xl bg-[#091224]/85 backdrop-blur-md border border-[#1B325C]">
        <span className="flex items-center space-x-1.5 text-[#10B981] font-bold">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
          <span>ZERO LTI HSE AUDITED RECORD</span>
        </span>
        <span className="text-[10px] text-[#D4AF37]">NUPRC / NIPEX CERTIFIED</span>
      </div>
    </div>
  );
}

