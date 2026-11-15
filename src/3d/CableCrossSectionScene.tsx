import React, { useEffect, useRef } from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import * as THREE from "three";

export const CableCrossSectionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    cableGroup: THREE.Group;
    fiberCore: THREE.Mesh;
    particles: THREE.Points;
  } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = 1080;
    const height = 1920;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060e20, 0.025);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 3, 14);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(1);
    renderer.setClearColor(0x060e20, 1);

    const cableGroup = new THREE.Group();
    scene.add(cableGroup);

    // 1. Layer 1 (Outer Polyethylene Black Jacket)
    const l1Geo = new THREE.CylinderGeometry(3.2, 3.2, 8, 32, 1, true);
    const l1Mat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      roughness: 0.8,
      metalness: 0.2,
      side: THREE.DoubleSide,
    });
    const layer1 = new THREE.Mesh(l1Geo, l1Mat);
    layer1.rotation.x = Math.PI / 2;
    cableGroup.add(layer1);

    // 2. Layer 2 (Steel Armor Ring)
    const l2Geo = new THREE.CylinderGeometry(2.6, 2.6, 9, 32, 1, true);
    const l2Mat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      roughness: 0.2,
      metalness: 0.9,
      wireframe: true,
      side: THREE.DoubleSide,
    });
    const layer2 = new THREE.Mesh(l2Geo, l2Mat);
    layer2.rotation.x = Math.PI / 2;
    cableGroup.add(layer2);

    // 3. Layer 3 (Copper Tube Barrier)
    const l3Geo = new THREE.CylinderGeometry(1.9, 1.9, 10, 32, 1, true);
    const l3Mat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.3,
      metalness: 0.8,
      side: THREE.DoubleSide,
    });
    const layer3 = new THREE.Mesh(l3Geo, l3Mat);
    layer3.rotation.x = Math.PI / 2;
    cableGroup.add(layer3);

    // 4. Center Optical Fiber Glass Core (Glowing Neon Cyan/White)
    const coreGeo = new THREE.CylinderGeometry(0.5, 0.5, 12, 16);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
    });
    const fiberCore = new THREE.Mesh(coreGeo, coreMat);
    fiberCore.rotation.x = Math.PI / 2;
    cableGroup.add(fiberCore);

    // 5. Laser Photon Particles streaming down the core
    const pCount = 150;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i += 3) {
      pPos[i] = (Math.random() - 0.5) * 0.6;
      pPos[i + 1] = (Math.random() - 0.5) * 0.6;
      pPos[i + 2] = (Math.random() - 0.5) * 12;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.18,
      transparent: true,
      opacity: 0.9,
    });
    const particles = new THREE.Points(pGeo, pMat);
    cableGroup.add(particles);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambient);

    const cyanPoint = new THREE.PointLight(0x38bdf8, 3, 20);
    cyanPoint.position.set(0, 2, 4);
    scene.add(cyanPoint);

    const amberLight = new THREE.PointLight(0xf59e0b, 2, 20);
    amberLight.position.set(3, -2, -2);
    scene.add(amberLight);

    sceneRef.current = { scene, camera, renderer, cableGroup, fiberCore, particles };

    return () => {
      renderer.dispose();
      l1Geo.dispose();
      l2Geo.dispose();
      l3Geo.dispose();
      coreGeo.dispose();
      pGeo.dispose();
      sceneRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!sceneRef.current) return;
    const { scene, camera, renderer, cableGroup, particles } = sceneRef.current;

    const t = frame * 0.02;

    // Cable rotation & tilt to show cut layers
    cableGroup.rotation.y = Math.sin(t * 0.4) * 0.35 + 0.4;
    cableGroup.rotation.x = 0.35 + Math.cos(t * 0.3) * 0.15;
    cableGroup.rotation.z = -0.2;

    // Stream laser photon particles through the fiber
    const pos = particles.geometry.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    for (let i = 2; i < arr.length; i += 3) {
      arr[i] += 0.4;
      if (arr[i] > 6) arr[i] = -6;
    }
    pos.needsUpdate = true;

    // Camera zoom push-in
    const zoom = interpolate(frame, [0, 360], [14, 11.5], { extrapolateRight: "clamp" });
    camera.position.z = zoom;

    renderer.render(scene, camera);
  }, [frame]);

  const scaleSpring = spring({ frame, fps, config: { damping: 12 } });

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
          backgroundColor: "rgba(6, 14, 32, 0.85)",
          border: "1px solid rgba(56, 189, 248, 0.4)",
          padding: "10px 28px",
          borderRadius: 30,
          backdropFilter: "blur(12px)",
          zIndex: 20,
        }}
      >
        <span style={{ fontSize: 24 }}>🔬</span>
        <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: 2, color: "#38bdf8" }}>
          @nalardigital • ANATOMI 3D KABEL
        </span>
      </div>

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 220,
          left: 0,
          width: "100%",
          textAlign: "center",
          padding: "0 60px",
          zIndex: 20,
          transform: `scale(${scaleSpring})`,
        }}
      >
        <div
          style={{
            display: "inline-block",
            backgroundColor: "rgba(245, 158, 11, 0.2)",
            border: "1px solid #f59e0b",
            color: "#fbbf24",
            padding: "8px 24px",
            borderRadius: 20,
            fontSize: 24,
            fontWeight: 800,
            marginBottom: 20,
          }}
        >
          Bukan Pipa Minyak Raksasa!
        </div>
        <h2
          style={{
            fontSize: 56,
            fontWeight: 900,
            lineHeight: 1.25,
            color: "#f8fafc",
            margin: 0,
          }}
        >
          Tebalnya Cuma ~21 mm:
          <br />
          <span style={{ color: "#38bdf8" }}>Seukuran Selang Taman Rumah Lu</span>
        </h2>
      </div>

      {/* Layer Decomposition Labels */}
      <div
        style={{
          position: "absolute",
          bottom: 110,
          left: 0,
          width: "100%",
          padding: "0 60px",
          zIndex: 20,
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(6, 14, 32, 0.9)",
            border: "2px solid #38bdf8",
            borderRadius: 24,
            padding: "28px 36px",
            boxShadow: "0 0 50px rgba(56, 189, 248, 0.25)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
            <span style={{ fontSize: 22, color: "#94a3b8" }}>1. Pelindung Luar:</span>
            <strong style={{ fontSize: 22, color: "#f8fafc" }}>Polyethylene &amp; Kawat Baja</strong>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
            <span style={{ fontSize: 22, color: "#94a3b8" }}>2. Konduktor Listrik:</span>
            <strong style={{ fontSize: 22, color: "#fbbf24" }}>Tabung Tembaga Murni</strong>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: 16,
              borderTop: "1px solid #1e293b",
            }}
          >
            <span style={{ fontSize: 24, color: "#38bdf8", fontWeight: 800 }}>
              3. Inti Data Foton:
            </span>
            <strong style={{ fontSize: 24, color: "#4ade80", fontWeight: 900 }}>
              Kaca Silika (125 µm) • 200.000 km/s
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
};
