"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Crosshair, Radio, RotateCcw, ShieldCheck, Target, Zap } from "lucide-react";

/**
 * 3D Interactive Cadastral Geomatics & Laser Scanner Station
 * (Replaces reference screenshot with real 3D WebGL instrument & laser scan telemetry)
 * 
 * Features:
 * - 3D Robotic Total Station mounted on yellow survey tripod
 * - Rotating telescope turret with collimator and laser beam
 * - Animated 3D topography elevation wireframe with scanning laser sweep
 * - Real-time UTM coordinates & angular measurements HUD
 * - Mouse drag to orbit in 3D space
 */
export default function Cadastral3DScanner() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [laserActive, setLaserActive] = useState(true);
  const [coords, setCoords] = useState({
    easting: "324,510.42",
    northing: "610,920.85",
    elevation: "+4.18",
    hzAngle: "148° 32' 14\"",
    vAngle: "+04° 12' 08\"",
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 500;
    let height = container.clientHeight || 450;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(16, 12, 20);
    camera.lookAt(0, 3, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfffaed, 2.0);
    sunLight.position.set(15, 25, 15);
    sunLight.castShadow = true;
    scene.add(sunLight);

    const blueBackLight = new THREE.DirectionalLight(0x0052ff, 1.2);
    blueBackLight.position.set(-15, 10, -10);
    scene.add(blueBackLight);

    // 3. Instrument Group
    const instrumentGroup = new THREE.Group();
    scene.add(instrumentGroup);

    // Yellow Surveying Materials (Leica / Trimble Cadastral Signature)
    const surveyYellowMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b, // Industrial Survey Yellow
      metalness: 0.1,
      roughness: 0.35,
    });
    const instrumentGreyMat = new THREE.MeshStandardMaterial({
      color: 0x334155, // Slate grey housing
      metalness: 0.6,
      roughness: 0.25,
    });
    const aluminumMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.9,
      roughness: 0.15,
    });

    // 3A. Tripod Legs
    const tripodGroup = new THREE.Group();
    instrumentGroup.add(tripodGroup);

    for (let i = 0; i < 3; i++) {
      const angle = (i * (Math.PI * 2)) / 3;
      const legGeo = new THREE.CylinderGeometry(0.18, 0.12, 9, 16);
      const legMesh = new THREE.Mesh(legGeo, surveyYellowMat);

      legMesh.position.set(
        Math.cos(angle) * 2.2,
        2.5,
        Math.sin(angle) * 2.2
      );
      legMesh.rotation.z = Math.cos(angle) * 0.32;
      legMesh.rotation.x = -Math.sin(angle) * 0.32;
      tripodGroup.add(legMesh);

      // Aluminum tripod feet
      const footGeo = new THREE.ConeGeometry(0.25, 0.8, 16);
      const footMesh = new THREE.Mesh(footGeo, aluminumMat);
      footMesh.position.set(
        Math.cos(angle) * 3.6,
        -1.6,
        Math.sin(angle) * 3.6
      );
      tripodGroup.add(footMesh);
    }

    // Tripod Tribrach Base Plate
    const plateGeo = new THREE.CylinderGeometry(1.4, 1.4, 0.4, 32);
    const plateMesh = new THREE.Mesh(plateGeo, aluminumMat);
    plateMesh.position.y = 6.4;
    tripodGroup.add(plateMesh);

    // 3B. Tribrach & Rotating Instrument Body
    const bodyBaseGeo = new THREE.CylinderGeometry(1.1, 1.2, 0.6, 32);
    const bodyBaseMesh = new THREE.Mesh(bodyBaseGeo, instrumentGreyMat);
    bodyBaseMesh.position.y = 6.8;
    instrumentGroup.add(bodyBaseMesh);

    // Rotating Alidade Turret
    const turretGroup = new THREE.Group();
    turretGroup.position.y = 7.1;
    instrumentGroup.add(turretGroup);

    // Left and Right Turret Standards (Yolk Arms)
    const yolkGeo = new THREE.BoxGeometry(0.7, 3.2, 1.2);
    const leftYolk = new THREE.Mesh(yolkGeo, surveyYellowMat);
    leftYolk.position.set(-1.0, 1.6, 0);
    turretGroup.add(leftYolk);

    const rightYolk = new THREE.Mesh(yolkGeo, surveyYellowMat);
    rightYolk.position.set(1.0, 1.6, 0);
    turretGroup.add(rightYolk);

    // Digital Screen Face on Turret
    const screenGeo = new THREE.PlaneGeometry(1.2, 0.9);
    const screenMat = new THREE.MeshBasicMaterial({ color: 0x0284c7 });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 0.8, 0.61);
    turretGroup.add(screenMesh);

    // 3C. Rotating Telescope & Laser Scanner Objective
    const telescopeGroup = new THREE.Group();
    telescopeGroup.position.set(0, 2.2, 0);
    turretGroup.add(telescopeGroup);

    const scopeGeo = new THREE.CylinderGeometry(0.75, 0.85, 2.8, 32);
    scopeGeo.rotateX(Math.PI / 2);
    const scopeMesh = new THREE.Mesh(scopeGeo, instrumentGreyMat);
    telescopeGroup.add(scopeMesh);

    // Front Laser Optical Lens (Cyan glow)
    const lensGeo = new THREE.CylinderGeometry(0.65, 0.65, 0.2, 32);
    lensGeo.rotateX(Math.PI / 2);
    const lensMat = new THREE.MeshStandardMaterial({
      color: 0x00c2cb,
      emissive: 0x00c2cb,
      emissiveIntensity: 0.8,
      roughness: 0.1,
    });
    const lensMesh = new THREE.Mesh(lensGeo, lensMat);
    lensMesh.position.z = 1.4;
    telescopeGroup.add(lensMesh);

    // 3D Projected Laser Beam Cone
    const laserGeo = new THREE.ConeGeometry(3.5, 16, 32, 1, true);
    laserGeo.rotateX(-Math.PI / 2);
    const laserMat = new THREE.MeshBasicMaterial({
      color: 0x00c2cb,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide,
    });
    const laserCone = new THREE.Mesh(laserGeo, laserMat);
    laserCone.position.z = 9.4;
    telescopeGroup.add(laserCone);

    // Center Red Laser Point Line
    const laserLineMat = new THREE.LineBasicMaterial({ color: 0xef4444, linewidth: 2 });
    const laserLineGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 1.4),
      new THREE.Vector3(0, 0, 18),
    ]);
    const laserLine = new THREE.Line(laserLineGeo, laserLineMat);
    telescopeGroup.add(laserLine);

    // 4. Ground Elevation Topography Grid (Delta Geomatics Contour Mesh)
    const groundGeo = new THREE.PlaneGeometry(36, 36, 28, 28);
    groundGeo.rotateX(-Math.PI / 2);
    const posAttr = groundGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const vx = posAttr.getX(i);
      const vz = posAttr.getZ(i);
      // Gentle riverine & contour undulating hills
      const vy = Math.sin(vx * 0.22) * Math.cos(vz * 0.2) * 0.8 - 2.2;
      posAttr.setY(i, vy);
    }
    groundGeo.computeVertexNormals();

    const groundMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      wireframe: true,
      roughness: 0.8,
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    scene.add(groundMesh);

    // 5. Mouse Parallax & Orbit Interaction
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let rotY = 0.3;
    let rotX = 0.05;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };
    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const dx = e.clientX - prevMouseX;
        const dy = e.clientY - prevMouseY;
        rotY += dx * 0.008;
        rotX += dy * 0.005;
        rotX = Math.max(-0.2, Math.min(0.6, rotX));
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      }
    };
    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Resize
    const onResize = () => {
      if (!container) return;
      width = container.clientWidth || 500;
      height = container.clientHeight || 450;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    // 6. 60FPS Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Instrument subtle auto-scan turret sweep
      turretGroup.rotation.y = Math.sin(elapsed * 0.8) * 0.55;
      telescopeGroup.rotation.x = Math.sin(elapsed * 1.2) * 0.12;

      // Pulse laser beam opacity
      laserCone.visible = laserActive;
      laserLine.visible = laserActive;
      if (laserActive) {
        laserMat.opacity = 0.2 + Math.sin(elapsed * 6.0) * 0.08;
      }

      // Smooth camera position based on drag
      camera.position.x = 24 * Math.sin(rotY) * Math.cos(rotX);
      camera.position.z = 24 * Math.cos(rotY) * Math.cos(rotX);
      camera.position.y = 10 + 24 * Math.sin(rotX);
      camera.lookAt(0, 4.5, 0);

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    // Periodic dynamic update of precision coordinates simulation
    const interval = setInterval(() => {
      const randOffset = (Math.random() * 0.04 - 0.02).toFixed(2);
      setCoords({
        easting: (324510.42 + parseFloat(randOffset)).toFixed(2),
        northing: (610920.85 + parseFloat(randOffset)).toFixed(2),
        elevation: "+4.18",
        hzAngle: `${Math.floor(140 + Math.random() * 15)}° ${Math.floor(Math.random() * 60)}' ${Math.floor(Math.random() * 60)}"`,
        vAngle: `+04° ${Math.floor(Math.random() * 30)}' ${Math.floor(Math.random() * 60)}"`,
      });
    }, 1500);

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(animId);
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [laserActive]);

  return (
    <div className="relative w-full h-[280px] sm:h-[400px] md:h-[480px] rounded-2xl sm:rounded-3xl bg-[#050B18] border border-[#1B325C] shadow-2xl overflow-hidden group select-none">
      {/* 3D WebGL Canvas */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        style={{ touchAction: "pan-y" }}
      />

      {/* Top HUD: Robotic Total Station Telemetry */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#091224]/95 backdrop-blur-md border border-[#1B325C] shadow-xl space-y-1 sm:space-y-1.5 pointer-events-none max-w-[65%] sm:max-w-none">
        <div className="flex items-center space-x-1.5 sm:space-x-2 text-[11px] sm:text-xs font-bold text-white">
          <Crosshair className="w-3.5 h-3.5 text-[#D4AF37] animate-spin-slow shrink-0" />
          <span className="truncate">Robotic Total Station & 3D Scanner</span>
        </div>
        {/* Full Coordinates on SM+, compact on mobile */}
        <div className="hidden sm:grid grid-cols-2 gap-x-4 gap-y-0.5 text-[10px] font-mono text-[#94A3B8]">
          <div>E: <strong className="text-white">{coords.easting} m</strong></div>
          <div>N: <strong className="text-white">{coords.northing} m</strong></div>
          <div>Hz: <strong className="text-[#38BDF8]">{coords.hzAngle}</strong></div>
          <div>Elev: <strong className="text-[#D4AF37]">{coords.elevation} m MSL</strong></div>
        </div>
        <div className="sm:hidden text-[9px] font-mono text-[#D4AF37] truncate">
          Hz: {coords.hzAngle} • Elev: {coords.elevation}m
        </div>
      </div>

      {/* Top Right: Status Badge & Controls */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center space-x-2">
        <button
          onClick={() => setLaserActive(!laserActive)}
          className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-mono font-bold uppercase transition-all shadow-sm flex items-center space-x-1 sm:space-x-1.5 cursor-pointer ${
            laserActive
              ? "bg-[#D4AF37] text-[#050B18] shadow-[#D4AF37]/20"
              : "bg-[#091224] text-[#CBD5E1] border border-[#1B325C]"
          }`}
        >
          <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span>{laserActive ? "Laser On" : "Laser Off"}</span>
        </button>
      </div>

      {/* Bottom Drag Instruction */}
      <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#94A3B8] px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl bg-[#091224]/90 backdrop-blur-md border border-[#1B325C]">
        <span className="flex items-center space-x-1.5 truncate">
          <RotateCcw className="w-3 h-3 text-[#D4AF37] shrink-0" />
          <span className="truncate">Drag 360° to inspect</span>
        </span>
        <span className="text-[9px] sm:text-[10px] text-[#D4AF37] font-bold shrink-0 ml-2">WARRI SURVEY BASE</span>
      </div>
    </div>
  );
}

