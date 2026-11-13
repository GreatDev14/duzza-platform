"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Ship, Radio, Eye, RefreshCw, Compass } from "lucide-react";

/**
 * Interactive 3D Hydrographic Survey Vessel & Multibeam Sonar Bathymetry
 * Rendered natively with Three.js WebGL.
 * Features:
 * - 3D survey vessel hull with cabin, mast, and spinning marine radar
 * - Dynamic blue multibeam sonar acoustic swath cone projecting down to seabed
 * - 3D undulating bathymetric depth terrain mesh with colored elevation contours
 * - 360° mouse drag orbit + scroll-reactive ocean wave pitch and yaw
 */
export default function Sonar3DVessel() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [depthReading, setDepthReading] = useState(48.6);
  const [pingRate, setPingRate] = useState(45);
  const [radarAngle, setRadarAngle] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 480;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc); // Crisp light background

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(14, 10, 16);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 2. Lighting (Crisp enterprise architectural lighting)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 1.6);
    sunLight.position.set(20, 30, 15);
    sunLight.castShadow = true;
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0x0052ff, 0.8);
    fillLight.position.set(-15, 10, -10);
    scene.add(fillLight);

    // 3. 3D Survey Vessel Model Group
    const shipGroup = new THREE.Group();
    shipGroup.position.set(0, 2.5, 0);
    scene.add(shipGroup);

    // Ship Hull (Streamlined white marine hydrographic research vessel)
    const hullShape = new THREE.Shape();
    hullShape.moveTo(-3.5, 0);
    hullShape.lineTo(2.5, 0);
    hullShape.lineTo(4.0, 0.8);
    hullShape.lineTo(4.2, 1.4);
    hullShape.lineTo(-3.5, 1.4);
    hullShape.closePath();

    const extrudeSettings = { depth: 2.2, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.15, bevelThickness: 0.15 };
    const hullGeo = new THREE.ExtrudeGeometry(hullShape, extrudeSettings);
    hullGeo.center();
    const hullMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.3,
      metalness: 0.2,
    });
    const hullMesh = new THREE.Mesh(hullGeo, hullMat);
    hullMesh.castShadow = true;
    hullMesh.receiveShadow = true;
    shipGroup.add(hullMesh);

    // Navy Blue Hull Stripe
    const stripeGeo = new THREE.BoxGeometry(7.2, 0.22, 2.3);
    const stripeMat = new THREE.MeshStandardMaterial({ color: 0x0052ff, roughness: 0.2 });
    const stripeMesh = new THREE.Mesh(stripeGeo, stripeMat);
    stripeMesh.position.set(0, 0.35, 0);
    shipGroup.add(stripeMesh);

    // Deck Superstructure (Cabin & Wheelhouse)
    const cabinGeo = new THREE.BoxGeometry(2.4, 1.3, 1.7);
    const cabinMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.2 });
    const cabinMesh = new THREE.Mesh(cabinGeo, cabinMat);
    cabinMesh.position.set(-0.6, 1.3, 0);
    cabinMesh.castShadow = true;
    shipGroup.add(cabinMesh);

    // Wheelhouse Tinted Glass Windows
    const winGeo = new THREE.BoxGeometry(2.45, 0.45, 1.75);
    const winMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      roughness: 0.1,
      metalness: 0.8,
      transparent: true,
      opacity: 0.75,
    });
    const winMesh = new THREE.Mesh(winGeo, winMat);
    winMesh.position.set(-0.6, 1.5, 0);
    shipGroup.add(winMesh);

    // Radar Mast & Rotating Marine Radar Scanner
    const mastGeo = new THREE.CylinderGeometry(0.06, 0.08, 1.4, 8);
    const mastMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.6 });
    const mast = new THREE.Mesh(mastGeo, mastMat);
    mast.position.set(-0.5, 2.4, 0);
    shipGroup.add(mast);

    const radarBarGeo = new THREE.BoxGeometry(0.12, 0.08, 1.1);
    const radarBarMat = new THREE.MeshStandardMaterial({ color: 0x0052ff, roughness: 0.3 });
    const radarBar = new THREE.Mesh(radarBarGeo, radarBarMat);
    radarBar.position.set(-0.5, 3.1, 0);
    shipGroup.add(radarBar);

    // Dual GNSS Antennas (RTK Survey DGPS Domes)
    const gpsGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.12, 16);
    const gpsMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 });
    const gps1 = new THREE.Mesh(gpsGeo, gpsMat);
    gps1.position.set(0.4, 2.05, 0.6);
    const gps2 = new THREE.Mesh(gpsGeo, gpsMat);
    gps2.position.set(0.4, 2.05, -0.6);
    shipGroup.add(gps1, gps2);

    // 4. Acoustic Multibeam Sonar Fan Swath (Cyan Semitransparent Cone)
    const sonarGeo = new THREE.ConeGeometry(4.8, 5.5, 32, 1, true);
    sonarGeo.rotateX(Math.PI);
    const sonarMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.28,
      wireframe: true,
    });
    const sonarCone = new THREE.Mesh(sonarGeo, sonarMat);
    sonarCone.position.set(0, -0.5, 0);
    shipGroup.add(sonarCone);

    // 5. 3D Bathymetric Seafloor Terrain Mesh
    const seabedW = 20;
    const seabedH = 20;
    const seabedGeo = new THREE.PlaneGeometry(seabedW, seabedH, 48, 48);
    seabedGeo.rotateX(-Math.PI * 0.5);

    // Generate undulating submarine trench and sandwave contours
    const pos = seabedGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const y = Math.sin(x * 0.35) * 0.6 + Math.cos(z * 0.4) * 0.5 + Math.sin(x * 0.8 + z * 0.6) * 0.25 - 3.8;
      pos.setY(i, y);
    }
    seabedGeo.computeVertexNormals();

    const seabedMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const seabedMesh = new THREE.Mesh(seabedGeo, seabedMat);
    scene.add(seabedMesh);

    // Water Surface Reference Grid
    const waterGrid = new THREE.GridHelper(22, 22, 0x0052ff, 0xe2e8f0);
    waterGrid.position.y = 2.4;
    scene.add(waterGrid);

    // Mouse Interaction
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotY = 0.4;
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
      targetRotX = Math.max(-0.4, Math.min(0.7, targetRotX + dy * 0.008));
    };
    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Scroll Reactive Wave Response
    let scrollPitch = 0;
    const onScroll = () => {
      const scrollY = window.scrollY;
      scrollPitch = Math.sin(scrollY * 0.003) * 0.15;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Animation Loop
    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Ship gentle wave heave and pitch
      shipGroup.position.y = 2.5 + Math.sin(elapsed * 1.8) * 0.18;
      shipGroup.rotation.z = Math.sin(elapsed * 1.4) * 0.05 + scrollPitch;
      shipGroup.rotation.x = Math.cos(elapsed * 1.2) * 0.04;

      // Rotate radar
      radarBar.rotation.y += delta * 6;
      setRadarAngle(Math.round((radarBar.rotation.y % (Math.PI * 2)) * (180 / Math.PI)));

      // Sonar pulse breathing
      const pulse = 1 + Math.sin(elapsed * 4) * 0.06;
      sonarCone.scale.set(pulse, 1, pulse);

      // Camera smooth orbit lerp
      scene.rotation.y += (targetRotY - scene.rotation.y) * 0.05;
      scene.rotation.x += (targetRotX - scene.rotation.x) * 0.05;

      // Update mock telemetry
      if (Math.random() > 0.95) {
        setDepthReading(parseFloat((48.2 + Math.sin(elapsed * 0.5) * 2.4).toFixed(1)));
        setPingRate(Math.floor(42 + Math.random() * 8));
      }

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
      {/* Three.js Canvas Container */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top HUD Telemetry Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-brandBlue-200 text-xs font-mono text-brandBlue-800 shadow-md">
          <Ship className="w-3.5 h-3.5 text-brandBlue-600" />
          <span className="font-bold">DUZZA RV-1 HYDROSPATIAL</span>
          <span className="text-slate-300">•</span>
          <span className="text-emerald-600 font-semibold">MULTIBEAM ACTIVE</span>
        </div>

        <div className="hidden sm:inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-[11px] font-mono text-slate-600 shadow-sm">
          <Eye className="w-3 h-3 text-cyan-600 animate-pulse" />
          <span>Click & Drag to Orbit 360°</span>
        </div>
      </div>

      {/* Bottom Telemetry Overlay */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center space-x-3 bg-white/95 backdrop-blur-md border border-slate-200 px-4 py-2 rounded-2xl shadow-md text-xs font-mono">
          <div>
            <span className="text-[10px] text-slate-400 block uppercase">Sounding Depth</span>
            <strong className="text-brandBlue-700 text-sm">{depthReading}m BSL</strong>
          </div>
          <div className="w-px h-6 bg-slate-200" />
          <div>
            <span className="text-[10px] text-slate-400 block uppercase">Ping Velocity</span>
            <strong className="text-cyan-600 text-sm">{pingRate} Hz</strong>
          </div>
          <div className="w-px h-6 bg-slate-200" />
          <div>
            <span className="text-[10px] text-slate-400 block uppercase">Radar Azimuth</span>
            <strong className="text-navy-950 text-sm">{radarAngle}°</strong>
          </div>
        </div>

        <div className="bg-brandBlue-600 text-white px-3 py-1.5 rounded-xl text-xs font-mono font-bold shadow-md flex items-center space-x-1.5">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>WARRI CHANNEL SURVEY ZONE</span>
        </div>
      </div>
    </div>
  );
}

