"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/* ── Country data ───────────────────────────────────────────── */
const LUMEN_COUNTRIES = [
  { name: "United Kingdom", lat: 51.5, lng: -0.12, major: true },
  { name: "United States", lat: 39.8, lng: -98.6, major: true },
  { name: "Germany", lat: 51.2, lng: 10.4, major: false },
  { name: "France", lat: 46.6, lng: 2.3, major: false },
  { name: "Australia", lat: -25.3, lng: 133.8, major: true },
  { name: "Canada", lat: 56.1, lng: -106.3, major: false },
  { name: "Japan", lat: 36.2, lng: 138.3, major: true },
  { name: "Brazil", lat: -14.2, lng: -51.9, major: true },
  { name: "India", lat: 20.6, lng: 78.9, major: true },
  { name: "China", lat: 35.9, lng: 104.2, major: false },
  { name: "South Korea", lat: 35.9, lng: 127.8, major: false },
  { name: "Italy", lat: 41.9, lng: 12.6, major: false },
  { name: "Spain", lat: 40.5, lng: -3.7, major: false },
  { name: "Netherlands", lat: 52.1, lng: 5.3, major: false },
  { name: "Sweden", lat: 60.1, lng: 18.6, major: false },
  { name: "Norway", lat: 60.5, lng: 8.5, major: false },
  { name: "Denmark", lat: 56.3, lng: 9.5, major: false },
  { name: "Finland", lat: 61.9, lng: 25.7, major: false },
  { name: "Switzerland", lat: 46.8, lng: 8.2, major: false },
  { name: "Austria", lat: 47.5, lng: 14.6, major: false },
  { name: "Belgium", lat: 50.5, lng: 4.5, major: false },
  { name: "Poland", lat: 51.9, lng: 19.1, major: false },
  { name: "Ireland", lat: 53.4, lng: -8.2, major: false },
  { name: "Portugal", lat: 39.4, lng: -8.2, major: false },
  { name: "Czech Republic", lat: 49.8, lng: 15.5, major: false },
  { name: "New Zealand", lat: -40.9, lng: 174.9, major: false },
  { name: "Singapore", lat: 1.4, lng: 103.8, major: false },
  { name: "Mexico", lat: 23.6, lng: -102.6, major: false },
  { name: "Argentina", lat: -38.4, lng: -63.6, major: false },
  { name: "Colombia", lat: 4.6, lng: -74.3, major: false },
  { name: "Chile", lat: -35.7, lng: -71.5, major: false },
  { name: "South Africa", lat: -30.6, lng: 22.9, major: true },
  { name: "Nigeria", lat: 9.1, lng: 8.7, major: false },
  { name: "Kenya", lat: -0.02, lng: 37.9, major: false },
  { name: "Egypt", lat: 26.8, lng: 30.8, major: false },
  { name: "UAE", lat: 23.4, lng: 53.8, major: false },
  { name: "Saudi Arabia", lat: 23.9, lng: 45.1, major: false },
  { name: "Israel", lat: 31.0, lng: 34.9, major: false },
  { name: "Turkey", lat: 39.0, lng: 35.2, major: false },
  { name: "Thailand", lat: 15.9, lng: 100.9, major: false },
  { name: "Vietnam", lat: 14.1, lng: 108.3, major: false },
  { name: "Indonesia", lat: -0.8, lng: 113.9, major: false },
  { name: "Philippines", lat: 12.9, lng: 121.8, major: false },
  { name: "Malaysia", lat: 4.2, lng: 101.9, major: false },
  { name: "Taiwan", lat: 23.7, lng: 121.0, major: false },
  { name: "Hong Kong", lat: 22.4, lng: 114.1, major: false },
  { name: "Romania", lat: 45.9, lng: 25.0, major: false },
  { name: "Hungary", lat: 47.2, lng: 19.5, major: false },
  { name: "Greece", lat: 39.1, lng: 21.8, major: false },
  { name: "Croatia", lat: 45.1, lng: 15.2, major: false },
  { name: "Slovakia", lat: 48.7, lng: 19.7, major: false },
  { name: "Peru", lat: -9.2, lng: -75.0, major: false },
];

/* Arc connections from London HQ to major hubs */
const ARC_PAIRS: [number, number][] = [
  [0, 1], [0, 4], [0, 7], [0, 8], [0, 3], [0, 31], [1, 10], [1, 27],
];

/* ── Helpers ────────────────────────────────────────────────── */
const GLOBE_RADIUS = 100;
const LUMEN_CYAN = new THREE.Color("#01b3d4");

function latLngToVec3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

/** Create a curved arc between two lat/lng points */
function createArc(
  startLat: number,
  startLng: number,
  endLat: number,
  endLng: number
): THREE.Line {
  const start = latLngToVec3(startLat, startLng, GLOBE_RADIUS);
  const end = latLngToVec3(endLat, endLng, GLOBE_RADIUS);
  const mid = start.clone().add(end).multiplyScalar(0.5);
  const dist = start.distanceTo(end);
  mid.normalize().multiplyScalar(GLOBE_RADIUS + dist * 0.25);

  const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
  const points = curve.getPoints(48);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color: LUMEN_CYAN,
    transparent: true,
    opacity: 0.35,
  });
  return new THREE.Line(geometry, material);
}

/* ── Component ──────────────────────────────────────────────── */
function GlobeInner() {
  const mountRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [size, setSize] = useState(600);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    /* ── Sizing ─────────────────────────────────────── */
    const updateSize = () => {
      const w = Math.min(container.parentElement?.clientWidth ?? 600, 600);
      setSize(w);
      return w;
    };
    let currentSize = updateSize();

    /* ── Scene ──────────────────────────────────────── */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 1, 1000);
    camera.position.set(0, 50, 300);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(currentSize, currentSize);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    /* ── Controls ───────────────────────────────────── */
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.rotateSpeed = 0.5;
    controls.enableZoom = true;
    controls.minDistance = 160;
    controls.maxDistance = 500;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;

    /* ── Globe sphere ──────────────────────────────── */
    const globeGeometry = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64);
    const globeMaterial = new THREE.MeshPhongMaterial({
      color: new THREE.Color("#0a1628"),
      emissive: new THREE.Color("#020a18"),
      specular: new THREE.Color("#01b3d4"),
      shininess: 15,
      transparent: true,
      opacity: 0.95,
    });
    const globeMesh = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globeMesh);

    /* ── Wireframe overlay (latitude/longitude lines) */
    const wireGeo = new THREE.SphereGeometry(GLOBE_RADIUS + 0.3, 36, 18);
    const wireMat = new THREE.MeshBasicMaterial({
      color: LUMEN_CYAN,
      wireframe: true,
      transparent: true,
      opacity: 0.06,
    });
    scene.add(new THREE.Mesh(wireGeo, wireMat));

    /* ── Atmosphere glow ───────────────────────────── */
    const glowGeo = new THREE.SphereGeometry(GLOBE_RADIUS + 8, 64, 64);
    const glowMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(0.004, 0.702, 0.831, 1.0) * intensity * 0.6;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    scene.add(new THREE.Mesh(glowGeo, glowMat));

    /* ── Country points ────────────────────────────── */
    const pointMeshes: { mesh: THREE.Mesh; name: string }[] = [];
    const pointGroup = new THREE.Group();

    LUMEN_COUNTRIES.forEach((country) => {
      const pos = latLngToVec3(country.lat, country.lng, GLOBE_RADIUS + 1);
      const r = country.major ? 2.0 : 1.2;
      const geo = new THREE.SphereGeometry(r, 12, 12);
      const mat = new THREE.MeshBasicMaterial({
        color: LUMEN_CYAN,
        transparent: true,
        opacity: 0.9,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(pos);
      pointGroup.add(mesh);
      pointMeshes.push({ mesh, name: country.name });

      // Outer pulse ring
      const ringGeo = new THREE.RingGeometry(r + 0.5, r + 1.5, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: LUMEN_CYAN,
        transparent: true,
        opacity: 0.25,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(pos);
      ring.lookAt(pos.clone().multiplyScalar(2));
      pointGroup.add(ring);
    });
    scene.add(pointGroup);

    /* ── Arcs ──────────────────────────────────────── */
    const arcGroup = new THREE.Group();
    ARC_PAIRS.forEach(([fromIdx, toIdx]) => {
      const from = LUMEN_COUNTRIES[fromIdx];
      const to = LUMEN_COUNTRIES[toIdx];
      arcGroup.add(createArc(from.lat, from.lng, to.lat, to.lng));
    });
    scene.add(arcGroup);

    /* ── Lighting ──────────────────────────────────── */
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(200, 200, 200);
    scene.add(dirLight);
    const dirLight2 = new THREE.DirectionalLight(new THREE.Color("#01b3d4"), 0.3);
    dirLight2.position.set(-200, -100, -200);
    scene.add(dirLight2);

    /* ── Raycaster for hover ───────────────────────── */
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let currentHovered: string | null = null;

    const onPointerMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    renderer.domElement.addEventListener("pointermove", onPointerMove);

    /* ── Arc dash animation state ──────────────────── */
    let arcTime = 0;

    /* ── Animation loop ────────────────────────────── */
    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      controls.update();
      arcTime += 0.003;

      // Animate arc opacity to create a flowing dash effect
      arcGroup.children.forEach((arc, i) => {
        const mat = (arc as THREE.Line).material as THREE.LineBasicMaterial;
        mat.opacity = 0.15 + 0.2 * Math.sin(arcTime * 2 + i * 1.2);
      });

      // Raycaster hover detection
      raycaster.setFromCamera(pointer, camera);
      const meshes = pointMeshes.map((p) => p.mesh);
      const intersects = raycaster.intersectObjects(meshes);
      if (intersects.length > 0) {
        const hit = pointMeshes.find((p) => p.mesh === intersects[0].object);
        if (hit && currentHovered !== hit.name) {
          currentHovered = hit.name;
          setHoveredCountry(hit.name);
          renderer.domElement.style.cursor = "pointer";
        }
      } else if (currentHovered !== null) {
        currentHovered = null;
        setHoveredCountry(null);
        renderer.domElement.style.cursor = "grab";
      }

      renderer.render(scene, camera);
    };
    animate();

    /* ── Resize observer ───────────────────────────── */
    const observer = new ResizeObserver(() => {
      currentSize = updateSize();
      renderer.setSize(currentSize, currentSize);
      camera.updateProjectionMatrix();
    });
    if (container.parentElement) observer.observe(container.parentElement);

    /* ── Cleanup ───────────────────────────────────── */
    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Hovered country label */}
      <div ref={tooltipRef} className="h-8 flex items-center justify-center mb-2">
        {hoveredCountry && (
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#01b3d4] text-white text-sm font-medium shadow-lg shadow-[#01b3d4]/25 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            {hoveredCountry}
          </span>
        )}
      </div>

      {/* Globe canvas + stand */}
      <div className="relative">
        <div
          ref={mountRef}
          style={{ width: size, height: size, cursor: "grab" }}
        />

        {/* Stand */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="w-3 h-10 bg-gradient-to-b from-gray-400 to-gray-500 rounded-sm" />
          <div className="w-32 h-3 bg-gradient-to-b from-gray-400 to-gray-500 rounded-full" />
          <div className="w-40 h-2 bg-gradient-to-b from-gray-500 to-gray-600 rounded-full -mt-0.5" />
          <div className="w-48 h-3 bg-black/10 rounded-full blur-sm -mt-0.5" />
        </div>
      </div>

      {/* Instructions */}
      <p className="text-xs text-gray-400 mt-16 select-none">
        Drag to spin &middot; Scroll to zoom &middot; Hover points to explore
      </p>
    </div>
  );
}

export default function InteractiveGlobe() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return (
      <div className="w-full flex justify-center">
        <div className="w-[600px] h-[600px] max-w-full aspect-square rounded-full bg-gradient-to-br from-[#01b3d4]/10 to-[#01b3d4]/5 animate-pulse" />
      </div>
    );
  }
  return <GlobeInner />;
}
