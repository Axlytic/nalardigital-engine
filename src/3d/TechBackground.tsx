import React, { useEffect, useRef } from "react";
import { useCurrentFrame } from "remotion";
import * as THREE from "three";

export const TechBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Store three scene instances across renders
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    grid: THREE.GridHelper;
    cubes: THREE.Mesh[];
    particles: THREE.Points;
  } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = 1080;
    const height = 1920;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06090f, 0.015);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 8, 22);
    camera.lookAt(0, 2, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(1);
    renderer.setClearColor(0x06090f, 1);

    // 1. Cyber Perspective Grid Plane
    const grid = new THREE.GridHelper(120, 60, 0x38bdf8, 0x1e293b);
    grid.position.y = -4;
    scene.add(grid);

    // 2. Ambient and colored directional lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x38bdf8, 2, 50);
    cyanLight.position.set(-10, 15, 10);
    scene.add(cyanLight);

    const purpleLight = new THREE.PointLight(0xa855f7, 2.5, 50);
    purpleLight.position.set(10, 10, -5);
    scene.add(purpleLight);

    // 3. Floating 3D Geometric Tech Cubes & Octahedrons
    const cubes: THREE.Mesh[] = [];
    const geometries = [
      new THREE.BoxGeometry(2.5, 2.5, 2.5),
      new THREE.OctahedronGeometry(2),
      new THREE.IcosahedronGeometry(1.8),
    ];

    const cubeMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: false,
    });

    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });

    const positions: [number, number, number][] = [
      [-6, 6, 2],
      [7, 9, -2],
      [-8, 2, -6],
      [6, 3, -8],
      [0, 14, -10],
      [-5, 12, -4],
      [5, 15, -6],
    ];

    positions.forEach((pos, idx) => {
      const geom = geometries[idx % geometries.length];
      const mesh = new THREE.Mesh(geom, cubeMat);
      mesh.position.set(...pos);

      // Add wireframe overlay for tech aesthetics
      const wireMesh = new THREE.Mesh(geom, wireMat);
      mesh.add(wireMesh);

      scene.add(mesh);
      cubes.push(mesh);
    });

    // 4. Data Stream Particle System
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 35;
      particlePositions[i + 1] = Math.random() * 25 - 4;
      particlePositions[i + 2] = (Math.random() - 0.5) * 35;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.25,
      transparent: true,
      opacity: 0.65,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    sceneRef.current = { scene, camera, renderer, grid, cubes, particles };

    return () => {
      renderer.dispose();
      geometries.forEach((g) => g.dispose());
      cubeMat.dispose();
      wireMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      sceneRef.current = null;
    };
  }, []);

  // Update scene based on Remotion current frame
  useEffect(() => {
    if (!sceneRef.current) return;
    const { scene, camera, renderer, grid, cubes, particles } = sceneRef.current;

    const t = frame * 0.015;

    // Smooth forward camera dolly
    camera.position.z = 22 + Math.sin(t * 0.3) * 1.5;
    camera.position.x = Math.sin(t * 0.2) * 2;
    camera.position.y = 8 + Math.cos(t * 0.25) * 1;
    camera.lookAt(0, 3 + Math.sin(t * 0.2), 0);

    // Infinite moving grid
    grid.position.z = (t * 10) % 2;

    // Rotate geometric tech meshes
    cubes.forEach((cube, i) => {
      cube.rotation.x = t * (0.4 + i * 0.1);
      cube.rotation.y = t * (0.6 + i * 0.08);
      cube.position.y += Math.sin(t * 2 + i) * 0.01;
    });

    // Particle flow
    const posAttr = particles.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    for (let i = 1; i < arr.length; i += 3) {
      arr[i] += 0.05;
      if (arr[i] > 22) arr[i] = -4;
    }
    posAttr.needsUpdate = true;

    renderer.render(scene, camera);
  }, [frame]);

  return (
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
  );
};
