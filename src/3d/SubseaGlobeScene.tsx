import React, { useEffect, useRef } from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import * as THREE from "three";

export const SubseaGlobeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    globe: THREE.Mesh;
    wireGlobe: THREE.Mesh;
    arcs: THREE.Line[];
  } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = 1080;
    const height = 1920;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x040814, 0.02);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 16);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(1);
    renderer.setClearColor(0x040814, 1);

    // 1. Globe Sphere (Deep ocean blue)
    const globeGeo = new THREE.SphereGeometry(5, 36, 36);
    const globeMat = new THREE.MeshStandardMaterial({
      color: 0x07152e,
      roughness: 0.4,
      metalness: 0.6,
    });
    const globe = new THREE.Mesh(globeGeo, globeMat);
    scene.add(globe);

    // 2. Wireframe grid overlay for cyber look
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x1e3a8a,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireGlobe = new THREE.Mesh(globeGeo, wireMat);
    globe.add(wireGlobe);

    // 3. Subsea Cable Arcs between continental points
    const arcs: THREE.Line[] = [];
    const arcPairs = [
      // US to Europe (Transatlantic)
      [[-2.5, 2.5, 3.5], [1.5, 3.2, 3.6]],
      // US to Asia (Transpacific)
      [[-3.2, 1.8, 3.4], [-4.2, -1.0, 2.5]],
      // Asia to Europe (via Indian Ocean)
      [[2.2, 0.5, 4.4], [1.8, 2.8, 3.8]],
      // Asia to Australia
      [[2.8, -0.5, 4.1], [3.5, -3.2, 2.6]],
      // South America to Africa
      [[-2.2, -2.5, 3.8], [0.8, -1.5, 4.7]],
    ];

    arcPairs.forEach((pair) => {
      const v0 = new THREE.Vector3(...pair[0]).normalize().multiplyScalar(5.05);
      const v1 = new THREE.Vector3(...pair[1]).normalize().multiplyScalar(5.05);

      const mid = v0.clone().add(v1).multiplyScalar(0.5);
      mid.normalize().multiplyScalar(5.6); // Arc lifts slightly above surface

      const curve = new THREE.QuadraticBezierCurve3(v0, mid, v1);
      const points = curve.getPoints(40);
      const geom = new THREE.BufferGeometry().setFromPoints(points);

      const mat = new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        linewidth: 3,
        transparent: true,
        opacity: 0.85,
      });

      const line = new THREE.Line(geom, mat);
      globe.add(line);
      arcs.push(line);
    });

    // 4. Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 2.2);
    keyLight.position.set(10, 15, 10);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0x0284c7, 3, 40);
    rimLight.position.set(-10, -5, -5);
    scene.add(rimLight);

    sceneRef.current = { scene, camera, renderer, globe, wireGlobe, arcs };

    return () => {
      renderer.dispose();
      globeGeo.dispose();
      globeMat.dispose();
      wireMat.dispose();
      sceneRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!sceneRef.current) return;
    const { scene, camera, renderer, globe } = sceneRef.current;

    const t = frame * 0.018;

    // Rotate the Earth Globe smoothly
    globe.rotation.y = t * 0.5 + 0.4;
    globe.rotation.x = Math.sin(t * 0.2) * 0.15 + 0.2;

    // Camera slow push-in
    const zoom = interpolate(frame, [0, 330], [16, 12.8], { extrapolateRight: "clamp" });
    camera.position.z = zoom;
    camera.position.y = Math.sin(t * 0.3) * 0.4;

    renderer.render(scene, camera);
  }, [frame]);

  // Motion Graphics overlays
  const titleSpring = spring({ frame, fps, config: { damping: 12 } });
  const isMythBust = frame > 120;

  return (
    <div style={{ position: "relative", width: 1080, height: 1920 }}>
      {/* 3D WebGL Canvas */}
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
          backgroundColor: "rgba(7, 21, 46, 0.8)",
          border: "1px solid rgba(56, 189, 248, 0.4)",
          padding: "10px 28px",
          borderRadius: 30,
          backdropFilter: "blur(12px)",
          zIndex: 20,
        }}
      >
        <span style={{ fontSize: 24 }}>🌊</span>
        <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: 2, color: "#38bdf8" }}>
          @nalardigital • SUBSEA CABLES #01
        </span>
      </div>

      {/* Center Hook Typography */}
      <div
        style={{
          position: "absolute",
          top: 240,
          left: 0,
          width: "100%",
          textAlign: "center",
          padding: "0 60px",
          zIndex: 20,
          transform: `scale(${titleSpring})`,
        }}
      >
        {!isMythBust ? (
          <div>
            <div
              style={{
                display: "inline-block",
                backgroundColor: "rgba(239, 68, 68, 0.15)",
                border: "1px solid #ef4444",
                color: "#f87171",
                padding: "8px 24px",
                borderRadius: 20,
                fontSize: 24,
                fontWeight: 800,
                marginBottom: 20,
              }}
            >
              Mitos Terbesar Pengguna Internet
            </div>
            <h1
              style={{
                fontSize: 66,
                fontWeight: 900,
                lineHeight: 1.25,
                background: "linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                margin: 0,
              }}
            >
              99% Orang Mengira Internet Dikirim Lewat Satelit...
            </h1>
          </div>
        ) : (
          <div>
            <div
              style={{
                display: "inline-block",
                backgroundColor: "rgba(56, 189, 248, 0.2)",
                border: "1px solid #38bdf8",
                color: "#7dd3fc",
                padding: "8px 24px",
                borderRadius: 20,
                fontSize: 24,
                fontWeight: 800,
                marginBottom: 20,
              }}
            >
              FAKTA FISIK DUNIA DIGITAL
            </div>
            <h2
              style={{
                fontSize: 62,
                fontWeight: 900,
                lineHeight: 1.25,
                color: "#38bdf8",
                textShadow: "0 0 30px rgba(56, 189, 248, 0.5)",
                margin: 0,
              }}
            >
              Nyatanya: 99% Data Mengalir di Dasar Samudra!
            </h2>
          </div>
        )}
      </div>

      {/* Floating Stat Badges */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 24,
          padding: "0 60px",
          zIndex: 20,
        }}
      >
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(7, 21, 46, 0.85)",
            border: "2px solid #ef4444",
            borderRadius: 20,
            padding: 24,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 36, fontWeight: 900, color: "#f87171" }}>&lt; 1%</div>
          <div style={{ fontSize: 20, color: "#94a3b8", marginTop: 4 }}>Satelit Luar Angkasa</div>
        </div>

        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(7, 21, 46, 0.85)",
            border: "2px solid #38bdf8",
            borderRadius: 20,
            padding: 24,
            textAlign: "center",
            boxShadow: "0 0 40px rgba(56, 189, 248, 0.3)",
          }}
        >
          <div style={{ fontSize: 36, fontWeight: 900, color: "#38bdf8" }}>99%++</div>
          <div style={{ fontSize: 20, color: "#e2e8f0", marginTop: 4 }}>Kabel Bawah Laut</div>
        </div>
      </div>
    </div>
  );
};
