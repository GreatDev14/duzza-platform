"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Compass, Sparkles, ShieldCheck, Activity, Layers, Cpu } from "lucide-react";

/**
 * Interactive 3D Isometric Platform (Inspired by Image 5 Corporate Hub)
 * Built with Three.js WebGL & GSAP 3D Interactive Tilt
 * 
 * Features:
 * - 3D floating isometric conglomerate grid with geometric towers and pipelines
 * - Luminous energy pulses traveling along interconnected conduits
 * - Orbiting rings with reflective material shaders
 * - Mouse-driven 3D parallax tilt & smooth damping
 * - Interactive hover focus on individual business nodes
 */
export default function Isometric3DHub() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [activeNode, setActiveNode] = useState<string>("PROJECTS");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 500;
    let height = container.clientHeight || 420;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x140a05);

    // Isometric Orthographic or Telephoto Perspective Camera
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
    camera.position.set(28, 22, 28);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 2. Lighting Setup (Luxury Gilded Night Waterside aesthetic)
    const ambientLight = new THREE.AmbientLight(0xfff6de, 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xd4af37, 2.2);
    dirLight.position.set(20, 30, 15);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const goldPointLight = new THREE.PointLight(0xf3c966, 3.0, 50);
    goldPointLight.position.set(-15, 12, 10);
    scene.add(goldPointLight);

    const softFillLight = new THREE.DirectionalLight(0x8b5a2b, 1.2);
    softFillLight.position.set(-10, -10, -10);
    scene.add(softFillLight);

    // 3. Central 3D Platform Base
    const baseGroup = new THREE.Group();
    scene.add(baseGroup);

    // Main Floating Island (Chamfered Cylinder or Box in Dark Bronze Obsidian)
    const islandGeo = new THREE.CylinderGeometry(14, 15, 1.2, 48);
    const islandMat = new THREE.MeshStandardMaterial({
      color: 0x1c110a,
      roughness: 0.35,
      metalness: 0.3,
    });
    const islandMesh = new THREE.Mesh(islandGeo, islandMat);
    islandMesh.position.y = -1;
    islandMesh.receiveShadow = true;
    baseGroup.add(islandMesh);

    // Outer Glowing Ring (Glowing Pale Gold)
    const ringGeo = new THREE.RingGeometry(15.2, 15.6, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = -0.9;
    baseGroup.add(ringMesh);

    // Coordinate Grid Overlay on Platform (Gilded Grid Lines)
    const gridHelper = new THREE.GridHelper(24, 16, 0xd4af37, 0x3d2415);
    gridHelper.position.y = -0.38;
    baseGroup.add(gridHelper);

    // 4. Central Corporate Core (Prism Tower)
    const coreGeo = new THREE.BoxGeometry(4.5, 7.5, 4.5);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x26170e,
      metalness: 0.4,
      roughness: 0.15,
      transmission: 0.5,
      transparent: true,
      opacity: 0.95,
      reflectivity: 0.9,
      clearcoat: 1.0,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.set(0, 3.2, 0);
    coreMesh.castShadow = true;
    baseGroup.add(coreMesh);

    // Core Edge Wireframe (Gilded Pale Gold)
    const coreEdges = new THREE.EdgesGeometry(coreGeo);
    const coreEdgeLines = new THREE.LineSegments(
      coreEdges,
      new THREE.LineBasicMaterial({ color: 0xd4af37, linewidth: 2 })
    );
    coreEdgeLines.position.copy(coreMesh.position);
    baseGroup.add(coreEdgeLines);

    // 5. Surrounding Satellite Nodes (Divisions)
    const nodeConfigs = [
      { name: "PROJECTS", angle: 0, r: 9, h: 4.5, color: 0x8b5a2b, label: "Duzza Projects" },
      { name: "BRANDING", angle: (Math.PI * 2) / 3, r: 9, h: 4.0, color: 0xd4af37, label: "Duzza Branding" },
      { name: "VENTURES", angle: (Math.PI * 4) / 3, r: 9, h: 3.5, color: 0xb88e4f, label: "Incubating Retail" },
    ];

    const nodeMeshes: { group: THREE.Group; name: string }[] = [];

    nodeConfigs.forEach((cfg) => {
      const nodeGroup = new THREE.Group();
      const x = Math.cos(cfg.angle) * cfg.r;
      const z = Math.sin(cfg.angle) * cfg.r;
      nodeGroup.position.set(x, 0, z);

      // Node Cylinder Pedestal
      const pedGeo = new THREE.CylinderGeometry(2, 2.2, cfg.h, 32);
      const pedMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.3,
        metalness: 0.15,
      });
      const pedMesh = new THREE.Mesh(pedGeo, pedMat);
      pedMesh.position.y = cfg.h / 2;
      pedMesh.castShadow = true;
      nodeGroup.add(pedMesh);

      // Top Floating Glowing Orb
      const orbGeo = new THREE.SphereGeometry(1.2, 32, 32);
      const orbMat = new THREE.MeshStandardMaterial({
        color: cfg.color,
        emissive: cfg.color,
        emissiveIntensity: 0.6,
        roughness: 0.2,
      });
      const orbMesh = new THREE.Mesh(orbGeo, orbMat);
      orbMesh.position.y = cfg.h + 1.6;
      nodeGroup.add(orbMesh);

      // Orbiting Micro Ring
      const orbRingGeo = new THREE.TorusGeometry(1.8, 0.08, 16, 64);
      const orbRingMat = new THREE.MeshBasicMaterial({ color: cfg.color });
      const orbRing = new THREE.Mesh(orbRingGeo, orbRingMat);
      orbRing.rotation.x = Math.PI / 3;
      orbRing.position.y = cfg.h + 1.6;
      nodeGroup.add(orbRing);

      baseGroup.add(nodeGroup);
      nodeMeshes.push({ group: nodeGroup, name: cfg.name });

      // Connecting Pipe Conduit from Core to Node
      const pipeCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 1.0, 0),
        new THREE.Vector3(x * 0.5, 0.4, z * 0.5),
        new THREE.Vector3(x, 0.4, z),
      ]);
      const pipeGeo = new THREE.TubeGeometry(pipeCurve, 32, 0.22, 16, false);
      const pipeMat = new THREE.MeshStandardMaterial({
        color: 0x94a3b8,
        metalness: 0.7,
        roughness: 0.3,
      });
      const pipeMesh = new THREE.Mesh(pipeGeo, pipeMat);
      baseGroup.add(pipeMesh);
    });

    // 6. Floating Energy Conduit Particles (Traveling along pipelines with Glowing Pale Gold)
    const particleCount = 24;
    const particleGeo = new THREE.SphereGeometry(0.28, 16, 16);
    const particleMat = new THREE.MeshBasicMaterial({ color: 0xf3c966 });
    const pulseParticles: { mesh: THREE.Mesh; pathIndex: number; progress: number; speed: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      const pMesh = new THREE.Mesh(particleGeo, particleMat);
      baseGroup.add(pMesh);
      pulseParticles.push({
        mesh: pMesh,
        pathIndex: i % 3,
        progress: (i / particleCount),
        speed: 0.008 + (Math.random() * 0.004),
      });
    }

    // 7. Mouse-Driven Parallax Tilt Physics & Scroll-Driven Scrub
    let targetRotY = 0;
    let targetRotX = 0;
    let mouseX = 0;
    let mouseY = 0;
    let scrollProgress = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / height) * 2 - 1);
      targetRotY = mouseX * 0.45;
      targetRotX = -mouseY * 0.25;
    };
    container.addEventListener("mousemove", handleMouseMove);

    const handleScroll = () => {
      // Calculate scroll progress relative to hero height
      const scrollY = window.scrollY || window.pageYOffset;
      scrollProgress = Math.min(1.5, Math.max(0, scrollY / 650));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Handle Resize
    const onResize = () => {
      if (!container) return;
      width = container.clientWidth || 500;
      height = container.clientHeight || 420;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    // 8. 60FPS Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // 3D Scroll Dynamics: Platform rotates, tilts and elevates with scroll depth
      const scrollRotation = scrollProgress * Math.PI * 0.85;
      const scrollTilt = scrollProgress * 0.35;
      const targetPlatformY = Math.sin(elapsed * 1.5) * 0.35 + (scrollProgress * 2.5);

      // Continuous gentle rotation + mouse parallax tilt + scroll scrub
      baseGroup.rotation.y += ((targetRotY + scrollRotation) - baseGroup.rotation.y) * 0.06 + 0.002;
      baseGroup.rotation.x += ((targetRotX + scrollTilt) - baseGroup.rotation.x) * 0.06;
      baseGroup.position.y += (targetPlatformY - baseGroup.position.y) * 0.08;

      // Camera dynamic zoom / dolly on scroll
      camera.position.y = 22 + scrollProgress * 6;
      camera.position.z = 24 + scrollProgress * 8;
      camera.lookAt(0, 2 + scrollProgress * 1.2, 0);

      // Animate core pulsing glow
      coreMesh.position.y = 3.2 + Math.sin(elapsed * 2.0) * 0.2;
      coreEdgeLines.position.copy(coreMesh.position);

      // Animate energy pulse spheres traveling along conduits
      pulseParticles.forEach((p) => {
        p.progress = (p.progress + p.speed) % 1;
        const cfg = nodeConfigs[p.pathIndex];
        const tx = Math.cos(cfg.angle) * cfg.r;
        const tz = Math.sin(cfg.angle) * cfg.r;

        // Linear interpolation from core (0, 1, 0) to node (tx, 0.4, tz)
        p.mesh.position.x = tx * p.progress;
        p.mesh.position.z = tz * p.progress;
        p.mesh.position.y = 0.8 * (1 - p.progress) + 0.4 * p.progress + Math.sin(p.progress * Math.PI) * 0.6;
      });

      // Animate node orbiting rings
      nodeMeshes.forEach((nm, idx) => {
        const ring = nm.group.children[2];
        if (ring) {
          ring.rotation.z += 0.03;
          ring.rotation.y += 0.015;
        }
      });

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[320px] sm:h-[420px] lg:h-[480px] rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white via-slate-50/80 to-white border border-slate-200/90 shadow-2xl overflow-hidden group">
      {/* 3D WebGL Canvas Mount */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />

      {/* Floating 3D HUD Badges (Gilded Night Tone) */}
      <div className="absolute top-4 left-4 p-3 rounded-2xl bg-[#1C110A]/95 backdrop-blur-md border border-[#D4AF37]/30 shadow-xl space-y-1 pointer-events-none transition-transform duration-300 group-hover:translate-y-1">
        <div className="flex items-center space-x-2 text-xs font-bold text-[#FFF6DE]">
          <Activity className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
          <span>Interactive Holding Architecture</span>
        </div>
        <span className="text-[10px] font-mono text-[#D4AF37]/80 block">Move cursor to tilt 3D platform • Scroll to scrub</span>
      </div>

      {/* Interactive Division Pills (Bottom Overlay - Gilded Theme) */}
      <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-2xl bg-[#1C110A]/95 backdrop-blur-md border border-[#D4AF37]/30 shadow-xl">
        <button
          onClick={() => setActiveNode("PROJECTS")}
          style={activeNode === "PROJECTS" ? { backgroundColor: "#D4AF37", color: "#140A05" } : {}}
          className={`flex-1 min-w-0 py-1.5 px-1.5 sm:px-3 rounded-xl text-[10px] sm:text-[11px] font-bold transition-all flex items-center justify-center space-x-1 sm:space-x-1.5 cursor-pointer ${
            activeNode === "PROJECTS"
              ? "bg-[#D4AF37] text-[#140A05] shadow-sm font-extrabold"
              : "bg-transparent text-[#EED9B3]/80 hover:text-[#FFF6DE] hover:bg-[#26170E]"
          }`}
        >
          <Compass className="w-3 h-3 shrink-0 text-[#140A05]" />
          <span className="truncate">Duzza Projects</span>
        </button>

        <button
          onClick={() => setActiveNode("BRANDING")}
          style={activeNode === "BRANDING" ? { backgroundColor: "#D4AF37", color: "#140A05" } : {}}
          className={`flex-1 min-w-0 py-1.5 px-1.5 sm:px-3 rounded-xl text-[10px] sm:text-[11px] font-bold transition-all flex items-center justify-center space-x-1 sm:space-x-1.5 cursor-pointer ${
            activeNode === "BRANDING"
              ? "bg-[#D4AF37] text-[#140A05] shadow-sm font-extrabold"
              : "bg-transparent text-[#EED9B3]/80 hover:text-[#FFF6DE] hover:bg-[#26170E]"
          }`}
        >
          <Sparkles className="w-3 h-3 shrink-0 text-[#140A05]" />
          <span className="truncate">Duzza Branding</span>
        </button>

        <button
          onClick={() => setActiveNode("VENTURES")}
          style={activeNode === "VENTURES" ? { backgroundColor: "#D4AF37", color: "#140A05" } : {}}
          className={`flex-1 min-w-0 py-1.5 px-1.5 sm:px-3 rounded-xl text-[10px] sm:text-[11px] font-bold transition-all flex items-center justify-center space-x-1 sm:space-x-1.5 cursor-pointer ${
            activeNode === "VENTURES"
              ? "bg-[#D4AF37] text-[#140A05] shadow-sm font-extrabold"
              : "bg-transparent text-[#EED9B3]/80 hover:text-[#FFF6DE] hover:bg-[#26170E]"
          }`}
        >
          <Layers className="w-3 h-3 shrink-0 text-[#140A05]" />
          <span className="truncate">Retail Ventures</span>
        </button>
      </div>

      {/* Floating Precision Tag */}
      <div className="absolute top-4 right-4 hidden sm:flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#26170E] border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-mono font-bold shadow-sm">
        <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
        <span>LIVE TELEMETRY</span>
      </div>
    </div>
  );
}

