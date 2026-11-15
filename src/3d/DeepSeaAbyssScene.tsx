import React, { useEffect, useRef } from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import * as THREE from "three";

export const DeepSeaAbyssScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    cable: THREE.Mesh;
    rovGroup: THREE.Group;
    spotlight: THREE.SpotLight;
    particles: THREE.Points;
  } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = 1080;
    const height = 1920;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020617, 0.04);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 5, 14);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(1);
    renderer.setClearColor(0x020617, 1);

    // 1. Seafloor Plane (Sandy dark bottom)
    const floorGeo = new THREE.PlaneGeometry(50, 50, 20, 20);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0a1128,
      roughness: 0.9,
      metalness: 0.1,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -3;
    scene.add(floor);

    // 2. Subsea Cable laying on seafloor
    const cableCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-12, -2.8, -10),
      new THREE.Vector3(-5, -2.85, -2),
      new THREE.Vector3(0, -2.8, 2),
      new THREE.Vector3(6, -2.85, 6),
      new THREE.Vector3(12, -2.8, 10),
    ]);
    const cableGeo = new THREE.TubeGeometry(cableCurve, 40, 0.25, 12, false);
    const cableMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.8,
      roughness: 0.4,
    });
    const cable = new THREE.Mesh(cableGeo, cableMat);
    scene.add(cable);

    // 3. ROV Robotic Submersible (Stylized Box with Twin Lights & Robotic Arm)
    const rovGroup = new THREE.Group();
    rovGroup.position.set(0, 1.5, 3);
    scene.add(rovGroup);

    const rovBodyGeo = new THREE.BoxGeometry(2.4, 1.4, 3.2);
    const rovBodyMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24, // Bright yellow submarine
      roughness: 0.2,
      metalness: 0.5,
    });
    const rovBody = new THREE.Mesh(rovBodyGeo, rovBodyMat);
    rovGroup.add(rovBody);

    // ROV Frame Edges
    const edges = new THREE.EdgesGeometry(rovBodyGeo);
    const lineMat = new THREE.LineBasicMaterial({ color: 0x0284c7, linewidth: 2 });
    const wireframe = new THREE.LineSegments(edges, lineMat);
    rovBody.add(wireframe);

    // Twin Thrusters on sides
    const thrusterGeo = new THREE.CylinderGeometry(0.3, 0.3, 1.2, 16);
    const thrusterMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8 });
    const leftThruster = new THREE.Mesh(thrusterGeo, thrusterMat);
    leftThruster.rotation.x = Math.PI / 2;
    leftThruster.position.set(-1.4, 0, 0);
    rovGroup.add(leftThruster);

    const rightThruster = new THREE.Mesh(thrusterGeo, thrusterMat);
    rightThruster.rotation.x = Math.PI / 2;
    rightThruster.position.set(1.4, 0, 0);
    rovGroup.add(rightThruster);

    // Twin ROV Spotlights
    const spotlight = new THREE.SpotLight(0x38bdf8, 5, 25, Math.PI / 4, 0.5);
    spotlight.position.set(0, 0, 1.2);
    spotlight.target.position.set(0, -3, 0);
    rovGroup.add(spotlight);
    rovGroup.add(spotlight.target);

    // Green Laser Repair Beam
    const laserGeo = new THREE.CylinderGeometry(0.04, 0.04, 4, 8);
    const laserMat = new THREE.MeshBasicMaterial({ color: 0x22c55e });
    const laser = new THREE.Mesh(laserGeo, laserMat);
    laser.position.set(0, -1.8, 0.5);
    laser.rotation.x = 0.2;
    rovGroup.add(laser);

    // 4. Underwater plankton / marine snow particles
    const pCount = 300;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i += 3) {
      pPos[i] = (Math.random() - 0.5) * 30;
      pPos[i + 1] = Math.random() * 15 - 3;
      pPos[i + 2] = (Math.random() - 0.5) * 30;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x7dd3fc,
      size: 0.15,
      transparent: true,
      opacity: 0.5,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Ambient light & Key lights for submersible visibility
    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0x38bdf8, 2.5);
    dirLight.position.set(5, 10, 8);
    scene.add(dirLight);

    const subKeyLight = new THREE.PointLight(0xf59e0b, 3, 15);
    subKeyLight.position.set(2, 4, 4);
    scene.add(subKeyLight);

    sceneRef.current = { scene, camera, renderer, cable, rovGroup, spotlight, particles };

    return () => {
      renderer.dispose();
      floorGeo.dispose();
      cableGeo.dispose();
      rovBodyGeo.dispose();
      laserGeo.dispose();
      pGeo.dispose();
      sceneRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!sceneRef.current) return;
    const { scene, camera, renderer, rovGroup, particles } = sceneRef.current;

    const t = frame * 0.02;

    // ROV gentle floating motion
    rovGroup.position.y = 1.2 + Math.sin(t * 1.5) * 0.25;
    rovGroup.position.x = Math.sin(t * 0.8) * 0.8;
    rovGroup.rotation.z = Math.sin(t) * 0.05;

    // Plankton marine snow falling
    const pos = particles.geometry.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    for (let i = 1; i < arr.length; i += 3) {
      arr[i] -= 0.02;
      if (arr[i] < -3) arr[i] = 12;
    }
    pos.needsUpdate = true;

    // Camera slow descending push
    camera.position.z = 14 - (frame * 0.008);
    camera.position.y = 5 - (frame * 0.006);
    camera.lookAt(0, -1, 0);

    renderer.render(scene, camera);
  }, [frame]);

  // Dynamic Depth Meter
  const depth = Math.floor(interpolate(frame, [0, 360], [1200, 8450], { extrapolateRight: "clamp" }));
  const pressure = Math.floor(depth / 10);

  const isSharkAlert = frame > 120 && frame < 240;
  const isRovActive = frame >= 240;

  return (
    <div style={{ position: "relative", width: 1080, height: 1920 }}>
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
        }}
      />

      {/* Top Header Pill */}
      <div
        style={{
          position: "absolute",
          top: 100,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: 12,
          backgroundColor: "rgba(2, 6, 23, 0.85)",
          border: "1px solid rgba(245, 158, 11, 0.4)",
          padding: "10px 28px",
          borderRadius: 30,
          backdropFilter: "blur(12px)",
          zIndex: 20,
        }}
      >
        <span style={{ fontSize: 24 }}>🚨</span>
        <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: 2, color: "#fbbf24" }}>
          @nalardigital • EKSTREM SAMUDRA
        </span>
      </div>

      {/* Depth & Pressure HUD Gauges */}
      <div
        style={{
          position: "absolute",
          top: 220,
          left: 60,
          right: 60,
          display: "flex",
          gap: 20,
          zIndex: 20,
        }}
      >
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(2, 6, 23, 0.85)",
            border: "2px solid #ef4444",
            borderRadius: 20,
            padding: "20px 24px",
          }}
        >
          <div style={{ fontSize: 18, color: "#94a3b8", fontWeight: 700 }}>KEDALAMAN PALUNG</div>
          <div style={{ fontSize: 48, fontWeight: 900, color: "#f87171", marginTop: 4 }}>
            -{depth.toLocaleString()} m
          </div>
        </div>

        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(2, 6, 23, 0.85)",
            border: "2px solid #38bdf8",
            borderRadius: 20,
            padding: "20px 24px",
          }}
        >
          <div style={{ fontSize: 18, color: "#94a3b8", fontWeight: 700 }}>TEKANAN AIR SAMUDRA</div>
          <div style={{ fontSize: 48, fontWeight: 900, color: "#38bdf8", marginTop: 4 }}>
            ~{pressure.toLocaleString()} ATM
          </div>
        </div>
      </div>

      {/* Threat Alert vs ROV Repair Banner */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 60,
          right: 60,
          zIndex: 20,
        }}
      >
        {isSharkAlert && (
          <div
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.2)",
              border: "2px solid #ef4444",
              borderRadius: 24,
              padding: "28px 36px",
              boxShadow: "0 0 50px rgba(239, 68, 68, 0.35)",
            }}
          >
            <div style={{ fontSize: 26, fontWeight: 900, color: "#f87171", marginBottom: 8 }}>
              🦈 ANCAMAN: Gigitan Hiu &amp; Gempa Tektonik
            </div>
            <p style={{ fontSize: 20, color: "#fca5a5", margin: 0, lineHeight: 1.5 }}>
              Hiu tertarik oleh medan elektromagnetik kabel, sementara palung laut rawan gesekan lempeng bumi.
            </p>
          </div>
        )}

        {isRovActive && (
          <div
            style={{
              backgroundColor: "rgba(34, 197, 94, 0.2)",
              border: "2px solid #22c55e",
              borderRadius: 24,
              padding: "28px 36px",
              boxShadow: "0 0 50px rgba(34, 197, 94, 0.35)",
            }}
          >
            <div style={{ fontSize: 26, fontWeight: 900, color: "#4ade80", marginBottom: 8 }}>
              🤖 ROV REPAIR SUBMERSIBLE • Operasi Pemulihan
            </div>
            <p style={{ fontSize: 20, color: "#bbf7d0", margin: 0, lineHeight: 1.5 }}>
              Kapal khusus menerjunkan robot selam untuk menyambung serat kaca 125 mikron di tengah badai samudra.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
