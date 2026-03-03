"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";

/* ── Country dot data (for interactive hover points) ───────── */
const LUMEN_COUNTRIES = [
  { name: "United States", lat: 39.8, lng: -98.6, major: true },
  { name: "United Kingdom", lat: 51.5, lng: -0.12, major: true },
  { name: "Brazil", lat: -14.2, lng: -51.9, major: true },
  { name: "Mexico", lat: 23.6, lng: -102.6, major: false },
  { name: "Canada", lat: 56.1, lng: -106.3, major: false },
  { name: "Germany", lat: 51.2, lng: 10.4, major: false },
  { name: "Spain", lat: 40.5, lng: -3.7, major: false },
  { name: "Chile", lat: -35.7, lng: -71.5, major: false },
  { name: "France", lat: 46.6, lng: 2.3, major: false },
  { name: "Poland", lat: 51.9, lng: 19.1, major: false },
  { name: "Australia", lat: -25.3, lng: 133.8, major: true },
  { name: "Thailand", lat: 15.9, lng: 100.9, major: false },
  { name: "Turkey", lat: 39.0, lng: 35.2, major: false },
  { name: "Argentina", lat: -38.4, lng: -63.6, major: false },
  { name: "Guatemala", lat: 15.8, lng: -90.2, major: false },
  { name: "Japan", lat: 36.2, lng: 138.3, major: true },
  { name: "Colombia", lat: 4.6, lng: -74.3, major: false },
  { name: "Italy", lat: 41.9, lng: 12.6, major: false },
  { name: "Sweden", lat: 60.1, lng: 18.6, major: false },
  { name: "Netherlands", lat: 52.1, lng: 5.3, major: false },
  { name: "Saudi Arabia", lat: 23.9, lng: 45.1, major: false },
  { name: "Belgium", lat: 50.5, lng: 4.5, major: false },
  { name: "Russia", lat: 61.5, lng: 105.3, major: false },
  { name: "South Africa", lat: -30.6, lng: 22.9, major: true },
  { name: "Denmark", lat: 56.3, lng: 9.5, major: false },
  { name: "Austria", lat: 47.5, lng: 14.6, major: false },
  { name: "Norway", lat: 60.5, lng: 8.5, major: false },
  { name: "India", lat: 20.6, lng: 78.9, major: true },
  { name: "Indonesia", lat: -0.8, lng: 113.9, major: false },
  { name: "South Korea", lat: 35.9, lng: 127.8, major: false },
  { name: "Peru", lat: -9.2, lng: -75.0, major: false },
  { name: "Philippines", lat: 12.9, lng: 121.8, major: false },
  { name: "Croatia", lat: 45.1, lng: 15.2, major: false },
  { name: "Serbia", lat: 44.0, lng: 21.0, major: false },
  { name: "Vietnam", lat: 14.1, lng: 108.3, major: false },
  { name: "Finland", lat: 61.9, lng: 25.7, major: false },
  { name: "Egypt", lat: 26.8, lng: 30.8, major: false },
  { name: "Switzerland", lat: 46.8, lng: 8.2, major: false },
  { name: "Taiwan", lat: 23.7, lng: 121.0, major: false },
  { name: "Hong Kong", lat: 22.4, lng: 114.1, major: false },
  { name: "Portugal", lat: 39.4, lng: -8.2, major: false },
  { name: "Kuwait", lat: 29.3, lng: 47.5, major: false },
  { name: "Qatar", lat: 25.3, lng: 51.2, major: false },
  { name: "Romania", lat: 45.9, lng: 25.0, major: false },
  { name: "China", lat: 35.9, lng: 104.2, major: false },
  { name: "Singapore", lat: 1.4, lng: 103.8, major: false },
  { name: "Ireland", lat: 53.4, lng: -8.2, major: false },
];

/* Arc connections from London HQ (index 1) to major hubs */
const ARC_PAIRS: [number, number][] = [
  [1, 0],  // UK → US
  [1, 4],  // UK → Canada
  [1, 2],  // UK → Brazil
  [1, 27], // UK → India
  [1, 8],  // UK → France
  [1, 10], // UK → Australia
  [1, 15], // UK → Japan
  [0, 29], // US → South Korea
];

/* ── ISO 3166-1 numeric codes for highlighted countries ───── */
const HIGHLIGHT_IDS = new Set([
  "840", // United States
  "826", // United Kingdom
  "076", // Brazil
  "484", // Mexico
  "124", // Canada
  "276", // Germany
  "724", // Spain
  "152", // Chile
  "250", // France
  "616", // Poland
  "036", // Australia
  "764", // Thailand
  "792", // Turkey
  "032", // Argentina
  "320", // Guatemala
  "392", // Japan
  "170", // Colombia
  "380", // Italy
  "752", // Sweden
  "528", // Netherlands
  "682", // Saudi Arabia
  "056", // Belgium
  "643", // Russia
  "710", // South Africa
  "208", // Denmark
  "040", // Austria
  "578", // Norway
  "356", // India
  "360", // Indonesia
  "410", // South Korea
  "604", // Peru
  "608", // Philippines
  "191", // Croatia
  "688", // Serbia
  "704", // Vietnam
  "246", // Finland
  "818", // Egypt
  "756", // Switzerland
  "158", // Taiwan
  "344", // Hong Kong
  "620", // Portugal
  "414", // Kuwait
  "634", // Qatar
  "642", // Romania
  "156", // China
  "702", // Singapore
  "372", // Ireland
]);

/* ── Helpers ────────────────────────────────────────────────── */
const GLOBE_RADIUS = 100;
const LUMEN_CYAN = new THREE.Color("#01b3d4");
const COUNTRY_FILL = "#a8dce6"; // light blue for highlighted countries
const LAND_FILL = "#e9e9e9";   // light gray for other land
const OCEAN_FILL = "#ffffff";   // white for ocean
const BORDER_COLOR = "#c0c0c0"; // subtle gray borders

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
    opacity: 0.5,
  });
  return new THREE.Line(geometry, material);
}

/* ── Canvas texture rendering ──────────────────────────────── */
const TEX_W = 4096;
const TEX_H = 2048;

function projectLon(lon: number): number {
  return ((lon + 180) / 360) * TEX_W;
}
function projectLat(lat: number): number {
  return ((90 - lat) / 180) * TEX_H;
}

function drawPolygonRings(
  ctx: CanvasRenderingContext2D,
  rings: number[][][],
  fill: string
) {
  ctx.beginPath();
  for (const ring of rings) {
    for (let i = 0; i < ring.length; i++) {
      const x = projectLon(ring[i][0]);
      const y = projectLat(ring[i][1]);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
  }
  ctx.fillStyle = fill;
  ctx.fill("evenodd");
}

function strokePolygonRings(
  ctx: CanvasRenderingContext2D,
  rings: number[][][]
) {
  ctx.beginPath();
  for (const ring of rings) {
    for (let i = 0; i < ring.length; i++) {
      const x = projectLon(ring[i][0]);
      const y = projectLat(ring[i][1]);
      if (i === 0) ctx.moveTo(x, y);
      else {
        // Skip long horizontal jumps (antimeridian crossings)
        const prevX = projectLon(ring[i - 1][0]);
        if (Math.abs(x - prevX) > TEX_W * 0.5) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
    }
  }
  ctx.strokeStyle = BORDER_COLOR;
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

type WorldTopology = Topology<{ countries: GeometryCollection }>;

function renderCountriesToCanvas(
  ctx: CanvasRenderingContext2D,
  topology: WorldTopology
) {
  // Clear to ocean white
  ctx.fillStyle = OCEAN_FILL;
  ctx.fillRect(0, 0, TEX_W, TEX_H);

  const countries = feature(topology, topology.objects.countries);

  // Pass 1: fill countries
  for (const feat of countries.features) {
    const id = String(feat.id);
    const fill = HIGHLIGHT_IDS.has(id) ? COUNTRY_FILL : LAND_FILL;

    if (feat.geometry.type === "Polygon") {
      drawPolygonRings(ctx, feat.geometry.coordinates, fill);
    } else if (feat.geometry.type === "MultiPolygon") {
      for (const poly of feat.geometry.coordinates) {
        drawPolygonRings(ctx, poly, fill);
      }
    }
  }

  // Pass 2: stroke borders
  for (const feat of countries.features) {
    if (feat.geometry.type === "Polygon") {
      strokePolygonRings(ctx, feat.geometry.coordinates);
    } else if (feat.geometry.type === "MultiPolygon") {
      for (const poly of feat.geometry.coordinates) {
        strokePolygonRings(ctx, poly);
      }
    }
  }
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
    renderer.setClearColor(0xffffff, 0);
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

    /* ── Globe sphere with canvas texture ─────────── */
    const globeGeometry = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64);
    const canvas2d = document.createElement("canvas");
    canvas2d.width = TEX_W;
    canvas2d.height = TEX_H;
    const ctx2d = canvas2d.getContext("2d")!;

    // Start with white ocean
    ctx2d.fillStyle = OCEAN_FILL;
    ctx2d.fillRect(0, 0, TEX_W, TEX_H);

    const canvasTexture = new THREE.CanvasTexture(canvas2d);
    canvasTexture.colorSpace = THREE.SRGBColorSpace;
    const globeMaterial = new THREE.MeshPhongMaterial({
      map: canvasTexture,
      specular: new THREE.Color("#666666"),
      shininess: 8,
    });
    const globeMesh = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globeMesh);

    // Fetch world topology and render countries
    fetch("https://unpkg.com/world-atlas@2/countries-110m.json")
      .then((res) => res.json())
      .then((topology: WorldTopology) => {
        renderCountriesToCanvas(ctx2d, topology);
        canvasTexture.needsUpdate = true;
      });

    /* ── Subtle rim outline ─────────────────────────── */
    const rimGeo = new THREE.SphereGeometry(GLOBE_RADIUS + 0.5, 64, 64);
    const rimMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#d0d0d0"),
      wireframe: true,
      transparent: true,
      opacity: 0.04,
    });
    scene.add(new THREE.Mesh(rimGeo, rimMat));

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

    /* ── Lighting (bright, clean) ──────────────────── */
    scene.add(new THREE.AmbientLight(0xffffff, 1.0));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(200, 200, 200);
    scene.add(dirLight);
    const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.3);
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
        mat.opacity = 0.25 + 0.25 * Math.sin(arcTime * 2 + i * 1.2);
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
    <div className="w-full flex flex-col items-center bg-white">
      {/* Hovered country label */}
      <div ref={tooltipRef} className="h-8 flex items-center justify-center mb-2">
        {hoveredCountry && (
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#01b3d4] text-white text-sm font-medium shadow-lg shadow-[#01b3d4]/25 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            {hoveredCountry}
          </span>
        )}
      </div>

      {/* Globe canvas */}
      <div className="relative">
        <div
          ref={mountRef}
          style={{ width: size, height: size, cursor: "grab" }}
        />
      </div>

      {/* Instructions */}
      <p className="text-xs text-gray-400 mt-4 select-none">
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
      <div className="w-full flex justify-center bg-white">
        <div className="w-[600px] h-[600px] max-w-full aspect-square rounded-full bg-gradient-to-br from-[#01b3d4]/10 to-[#01b3d4]/5 animate-pulse" />
      </div>
    );
  }
  return <GlobeInner />;
}
