"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";

/* ── Countries with Lumen data (name + ISO 3166-1 numeric code) ── */
const COUNTRY_DATA = [
  { name: "United States", iso: "840" },
  { name: "United Kingdom", iso: "826" },
  { name: "Brazil", iso: "076" },
  { name: "Mexico", iso: "484" },
  { name: "Canada", iso: "124" },
  { name: "Germany", iso: "276" },
  { name: "Spain", iso: "724" },
  { name: "Chile", iso: "152" },
  { name: "France", iso: "250" },
  { name: "Poland", iso: "616" },
  { name: "Australia", iso: "036" },
  { name: "Thailand", iso: "764" },
  { name: "Turkey", iso: "792" },
  { name: "Argentina", iso: "032" },
  { name: "Guatemala", iso: "320" },
  { name: "Japan", iso: "392" },
  { name: "Colombia", iso: "170" },
  { name: "Italy", iso: "380" },
  { name: "Sweden", iso: "752" },
  { name: "Netherlands", iso: "528" },
  { name: "Saudi Arabia", iso: "682" },
  { name: "Belgium", iso: "056" },
  { name: "Russia", iso: "643" },
  { name: "South Africa", iso: "710" },
  { name: "Denmark", iso: "208" },
  { name: "Austria", iso: "040" },
  { name: "Norway", iso: "578" },
  { name: "India", iso: "356" },
  { name: "Indonesia", iso: "360" },
  { name: "South Korea", iso: "410" },
  { name: "Peru", iso: "604" },
  { name: "Philippines", iso: "608" },
  { name: "Croatia", iso: "191" },
  { name: "Serbia", iso: "688" },
  { name: "Vietnam", iso: "704" },
  { name: "Finland", iso: "246" },
  { name: "Egypt", iso: "818" },
  { name: "Switzerland", iso: "756" },
  { name: "Taiwan", iso: "158" },
  { name: "Hong Kong", iso: "344" },
  { name: "Portugal", iso: "620" },
  { name: "Kuwait", iso: "414" },
  { name: "Qatar", iso: "634" },
  { name: "Romania", iso: "642" },
  { name: "China", iso: "156" },
  { name: "Singapore", iso: "702" },
  { name: "Ireland", iso: "372" },
];

const DATA_COUNTRY_IDS = new Set(COUNTRY_DATA.map((c) => c.iso));
const ISO_TO_NAME = new Map(COUNTRY_DATA.map((c) => [c.iso, c.name]));

/* ── Full ISO 3166-1 numeric → country name map (110m topology) ── */
const ALL_COUNTRY_NAMES = new Map<string, string>([
  ["004", "Afghanistan"], ["008", "Albania"], ["012", "Algeria"],
  ["024", "Angola"], ["031", "Azerbaijan"], ["032", "Argentina"],
  ["036", "Australia"], ["040", "Austria"], ["050", "Bangladesh"],
  ["051", "Armenia"], ["056", "Belgium"], ["064", "Bhutan"],
  ["068", "Bolivia"], ["070", "Bosnia and Herzegovina"], ["072", "Botswana"],
  ["076", "Brazil"], ["084", "Belize"], ["090", "Solomon Islands"],
  ["096", "Brunei"], ["100", "Bulgaria"], ["104", "Myanmar"],
  ["108", "Burundi"], ["112", "Belarus"], ["116", "Cambodia"],
  ["120", "Cameroon"], ["124", "Canada"], ["140", "Central African Republic"],
  ["144", "Sri Lanka"], ["148", "Chad"], ["152", "Chile"],
  ["156", "China"], ["158", "Taiwan"], ["170", "Colombia"],
  ["174", "Comoros"], ["178", "Republic of the Congo"],
  ["180", "Democratic Republic of the Congo"], ["188", "Costa Rica"],
  ["191", "Croatia"], ["192", "Cuba"], ["196", "Cyprus"],
  ["203", "Czech Republic"], ["204", "Benin"], ["208", "Denmark"],
  ["214", "Dominican Republic"], ["218", "Ecuador"], ["222", "El Salvador"],
  ["226", "Equatorial Guinea"], ["231", "Ethiopia"], ["232", "Eritrea"],
  ["233", "Estonia"], ["242", "Fiji"], ["246", "Finland"],
  ["250", "France"], ["260", "French Southern Territories"],
  ["262", "Djibouti"], ["266", "Gabon"], ["268", "Georgia"],
  ["270", "Gambia"], ["275", "Palestine"], ["276", "Germany"],
  ["288", "Ghana"], ["300", "Greece"], ["304", "Greenland"],
  ["320", "Guatemala"], ["324", "Guinea"], ["328", "Guyana"],
  ["332", "Haiti"], ["340", "Honduras"], ["344", "Hong Kong"],
  ["348", "Hungary"], ["352", "Iceland"], ["356", "India"],
  ["360", "Indonesia"], ["364", "Iran"], ["368", "Iraq"],
  ["372", "Ireland"], ["376", "Israel"], ["380", "Italy"],
  ["384", "Ivory Coast"], ["388", "Jamaica"], ["392", "Japan"],
  ["398", "Kazakhstan"], ["400", "Jordan"], ["404", "Kenya"],
  ["408", "North Korea"], ["410", "South Korea"], ["414", "Kuwait"],
  ["417", "Kyrgyzstan"], ["418", "Laos"], ["422", "Lebanon"],
  ["426", "Lesotho"], ["428", "Latvia"], ["430", "Liberia"],
  ["434", "Libya"], ["440", "Lithuania"], ["442", "Luxembourg"],
  ["450", "Madagascar"], ["454", "Malawi"], ["458", "Malaysia"],
  ["462", "Maldives"], ["466", "Mali"], ["470", "Malta"],
  ["478", "Mauritania"], ["480", "Mauritius"], ["484", "Mexico"],
  ["496", "Mongolia"], ["498", "Moldova"], ["499", "Montenegro"],
  ["504", "Morocco"], ["508", "Mozambique"], ["512", "Oman"],
  ["516", "Namibia"], ["524", "Nepal"], ["528", "Netherlands"],
  ["540", "New Caledonia"], ["548", "Vanuatu"], ["554", "New Zealand"],
  ["558", "Nicaragua"], ["562", "Niger"], ["566", "Nigeria"],
  ["578", "Norway"], ["586", "Pakistan"], ["591", "Panama"],
  ["598", "Papua New Guinea"], ["600", "Paraguay"], ["604", "Peru"],
  ["608", "Philippines"], ["616", "Poland"], ["620", "Portugal"],
  ["624", "Guinea-Bissau"], ["626", "East Timor"], ["630", "Puerto Rico"],
  ["634", "Qatar"], ["642", "Romania"], ["643", "Russia"],
  ["646", "Rwanda"], ["659", "Saint Kitts and Nevis"],
  ["662", "Saint Lucia"], ["670", "Saint Vincent and the Grenadines"],
  ["678", "São Tomé and Príncipe"],
  ["682", "Saudi Arabia"], ["686", "Senegal"], ["688", "Serbia"],
  ["694", "Sierra Leone"], ["702", "Singapore"], ["703", "Slovakia"],
  ["704", "Vietnam"], ["705", "Slovenia"], ["706", "Somalia"],
  ["710", "South Africa"], ["716", "Zimbabwe"], ["724", "Spain"],
  ["728", "South Sudan"], ["729", "Sudan"], ["732", "Western Sahara"],
  ["740", "Suriname"], ["748", "Eswatini"], ["752", "Sweden"],
  ["756", "Switzerland"], ["760", "Syria"], ["762", "Tajikistan"],
  ["764", "Thailand"], ["768", "Togo"], ["776", "Tonga"],
  ["780", "Trinidad and Tobago"], ["784", "United Arab Emirates"],
  ["788", "Tunisia"], ["792", "Turkey"], ["795", "Turkmenistan"],
  ["800", "Uganda"], ["804", "Ukraine"], ["807", "North Macedonia"],
  ["818", "Egypt"], ["826", "United Kingdom"], ["834", "Tanzania"],
  ["840", "United States"], ["854", "Burkina Faso"], ["858", "Uruguay"],
  ["860", "Uzbekistan"], ["862", "Venezuela"], ["887", "Yemen"],
  ["894", "Zambia"], ["-99", "Northern Cyprus"], ["010", "Antarctica"],
]);

/* ── Constants ────────────────────────────────────────────────── */
const GLOBE_RADIUS = 100;
const TEX_W = 4096;
const TEX_H = 2048;
const LAND_FILL = "#d4d4d4";
const OCEAN_FILL = "#ffffff";
const BORDER_COLOR = "#bfbfbf";
const GREEN_FILL = "#4ade80";
const NO_DATA_FILL = "#ececec";
const AUTO_ROTATE_PAUSE_MS = 10_000;

const POSITIVE_MSGS = [
  (n: string) => `Yes! We have attention data in ${n}`,
  (n: string) => `Covered! Data collected in ${n}`,
  (n: string) => `We've gathered data in ${n}!`,
  (n: string) => `${n} — we have data here!`,
];

/* ── Helpers ───────────────────────────────────────────────────── */
function latLngToVec3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function projX(lon: number) {
  return ((lon + 180) / 360) * TEX_W;
}
function projY(lat: number) {
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
      const x = projX(ring[i][0]);
      const y = projY(ring[i][1]);
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        const prevX = projX(ring[i - 1][0]);
        if (Math.abs(x - prevX) > TEX_W * 0.5) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
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
      const x = projX(ring[i][0]);
      const y = projY(ring[i][1]);
      if (i === 0) ctx.moveTo(x, y);
      else {
        const prevX = projX(ring[i - 1][0]);
        if (Math.abs(x - prevX) > TEX_W * 0.5) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
    }
  }
  ctx.strokeStyle = BORDER_COLOR;
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

/* ── Canvas rendering ──────────────────────────────────────────── */
type WorldTopology = Topology<{ countries: GeometryCollection }>;
type GeoFeature = GeoJSON.Feature<GeoJSON.Geometry>;

function idToColor(id: number): string {
  return `rgb(${(id >> 16) & 0xff},${(id >> 8) & 0xff},${id & 0xff})`;
}

function drawFeature(
  ctx: CanvasRenderingContext2D,
  feat: GeoFeature,
  fill: string
) {
  if (feat.geometry.type === "Polygon") {
    drawPolygonRings(ctx, feat.geometry.coordinates, fill);
  } else if (feat.geometry.type === "MultiPolygon") {
    for (const poly of feat.geometry.coordinates) {
      drawPolygonRings(ctx, poly, fill);
    }
  }
}

function strokeFeature(ctx: CanvasRenderingContext2D, feat: GeoFeature) {
  if (feat.geometry.type === "Polygon") {
    strokePolygonRings(ctx, feat.geometry.coordinates);
  } else if (feat.geometry.type === "MultiPolygon") {
    for (const poly of feat.geometry.coordinates) {
      strokePolygonRings(ctx, poly);
    }
  }
}

function drawCrossHatch(
  ctx: CanvasRenderingContext2D,
  feat: GeoFeature,
  hatchColor: string
) {
  ctx.save();

  // Clip to the country shape
  ctx.beginPath();
  const clipRings = (rings: number[][][]) => {
    for (const ring of rings) {
      for (let i = 0; i < ring.length; i++) {
        const x = projX(ring[i][0]);
        const y = projY(ring[i][1]);
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          const prevX = projX(ring[i - 1][0]);
          if (Math.abs(x - prevX) > TEX_W * 0.5) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
    }
  };

  if (feat.geometry.type === "Polygon") {
    clipRings(feat.geometry.coordinates);
  } else if (feat.geometry.type === "MultiPolygon") {
    for (const poly of feat.geometry.coordinates) clipRings(poly);
  }
  ctx.clip("evenodd");

  // Draw diagonal lines across the clipped region
  ctx.strokeStyle = hatchColor;
  ctx.lineWidth = 2;
  const spacing = 12;
  const maxDim = TEX_W + TEX_H;
  ctx.beginPath();
  for (let d = -maxDim; d < maxDim; d += spacing) {
    ctx.moveTo(d, 0);
    ctx.lineTo(d + TEX_H, TEX_H);
  }
  ctx.stroke();

  ctx.restore();
}

function renderVisualCanvas(
  ctx: CanvasRenderingContext2D,
  features: GeoFeature[],
  revealedIds: Set<string>,
  rejectedIds: Set<string>
) {
  ctx.fillStyle = OCEAN_FILL;
  ctx.fillRect(0, 0, TEX_W, TEX_H);
  for (const feat of features) {
    const id = String(feat.id);
    const fill = revealedIds.has(id)
      ? GREEN_FILL
      : rejectedIds.has(id)
        ? NO_DATA_FILL
        : LAND_FILL;
    drawFeature(ctx, feat, fill);
  }
  // Draw cross-hatch on rejected countries
  for (const feat of features) {
    if (rejectedIds.has(String(feat.id))) {
      drawCrossHatch(ctx, feat, "#d0d0d0");
    }
  }
  for (const feat of features) strokeFeature(ctx, feat);
}

function renderIdCanvas(
  ctx: CanvasRenderingContext2D,
  features: GeoFeature[]
) {
  ctx.fillStyle = "rgb(0,0,0)";
  ctx.fillRect(0, 0, TEX_W, TEX_H);
  for (const feat of features) {
    const numId = parseInt(String(feat.id), 10);
    if (numId === 0) continue;
    drawFeature(ctx, feat, idToColor(numId));
  }
}

/* ── Component ─────────────────────────────────────────────────── */
function GlobeInner({
  onCountryClick,
}: {
  onCountryClick?: (name: string, hasData: boolean) => void;
}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(600);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    positive: boolean;
  } | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const onClickRef = useRef(onCountryClick);
  onClickRef.current = onCountryClick;
  const allNamesRef = useRef(new Map<string, string>(ALL_COUNTRY_NAMES));

  const showToast = useCallback((message: string, positive: boolean) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ message, positive });
    toastTimerRef.current = setTimeout(() => setToast(null), 3000);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

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

    /* ── Auto-rotate pause on interaction ───────────── */
    let autoRotateTimer: ReturnType<typeof setTimeout> | null = null;
    function pauseAutoRotate() {
      controls.autoRotate = false;
      if (autoRotateTimer) clearTimeout(autoRotateTimer);
      autoRotateTimer = setTimeout(() => {
        controls.autoRotate = true;
      }, AUTO_ROTATE_PAUSE_MS);
    }
    controls.addEventListener("start", pauseAutoRotate);

    /* ── Globe mesh with canvas texture ──────────────── */
    const globeGeometry = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64);
    const visualCanvas = document.createElement("canvas");
    visualCanvas.width = TEX_W;
    visualCanvas.height = TEX_H;
    const visualCtx = visualCanvas.getContext("2d")!;
    visualCtx.fillStyle = OCEAN_FILL;
    visualCtx.fillRect(0, 0, TEX_W, TEX_H);

    const canvasTexture = new THREE.CanvasTexture(visualCanvas);
    canvasTexture.colorSpace = THREE.SRGBColorSpace;
    const globeMaterial = new THREE.MeshPhongMaterial({
      map: canvasTexture,
      specular: new THREE.Color("#888888"),
      shininess: 6,
    });
    const globeMesh = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globeMesh);

    /* ── ID-picking canvas ──────────────────────────── */
    const idCanvas = document.createElement("canvas");
    idCanvas.width = TEX_W;
    idCanvas.height = TEX_H;
    const idCtx = idCanvas.getContext("2d", { willReadFrequently: true })!;

    /* ── State ──────────────────────────────────────── */
    const revealedIds = new Set<string>();
    const rejectedIds = new Set<string>();
    let geoFeatures: GeoFeature[] = [];

    /* ── Fetch topology ─────────────────────────────── */
    fetch("https://unpkg.com/world-atlas@2/countries-110m.json")
      .then((res) => res.json())
      .then((topology: WorldTopology) => {
        const countries = feature(topology, topology.objects.countries);
        geoFeatures = countries.features;
        for (const feat of geoFeatures) {
          const id = String(feat.id);
          if (!allNamesRef.current.has(id)) {
            const name = (feat.properties as Record<string, unknown>)?.name;
            if (typeof name === "string") allNamesRef.current.set(id, name);
          }
        }
        renderVisualCanvas(visualCtx, geoFeatures, revealedIds, rejectedIds);
        renderIdCanvas(idCtx, geoFeatures);
        canvasTexture.needsUpdate = true;
      });

    /* ── Lighting ───────────────────────────────────── */
    scene.add(new THREE.AmbientLight(0xffffff, 1.0));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(200, 200, 200);
    scene.add(dirLight);
    const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.3);
    dirLight2.position.set(-200, -100, -200);
    scene.add(dirLight2);

    /* ── Raycaster + UV → country lookup ────────────── */
    const raycaster = new THREE.Raycaster();

    function getCountryIdAtUV(uv: THREE.Vector2): string | null {
      const px = Math.max(0, Math.min(TEX_W - 1, Math.floor(uv.x * TEX_W)));
      const py = Math.max(
        0,
        Math.min(TEX_H - 1, Math.floor((1 - uv.y) * TEX_H))
      );
      const pixel = idCtx.getImageData(px, py, 1, 1).data;
      const id = (pixel[0] << 16) | (pixel[1] << 8) | pixel[2];
      return id === 0 ? null : String(id);
    }

    /* ── Hover ──────────────────────────────────────── */
    const pointer = new THREE.Vector2();
    let currentHoveredId: string | null = null;

    const onPointerMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObject(globeMesh);

      if (hits.length > 0 && hits[0].uv) {
        const countryId = getCountryIdAtUV(hits[0].uv);
        if (countryId !== currentHoveredId) {
          currentHoveredId = countryId;
          if (countryId) {
            const name = allNamesRef.current.get(countryId);
            setHoveredCountry(name ?? null);
            renderer.domElement.style.cursor = "pointer";
          } else {
            setHoveredCountry(null);
            renderer.domElement.style.cursor = "grab";
          }
        }
      } else if (currentHoveredId !== null) {
        currentHoveredId = null;
        setHoveredCountry(null);
        renderer.domElement.style.cursor = "grab";
      }
    };
    renderer.domElement.addEventListener("pointermove", onPointerMove);

    /* ── Click (distinguish from drag) ─────────────── */
    let downPos = { x: 0, y: 0 };

    const onPointerDown = (e: PointerEvent) => {
      downPos = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = (e: PointerEvent) => {
      const dx = e.clientX - downPos.x;
      const dy = e.clientY - downPos.y;
      if (Math.sqrt(dx * dx + dy * dy) > 5) return; // was a drag

      const rect = renderer.domElement.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObject(globeMesh);

      if (hits.length > 0 && hits[0].uv) {
        const countryId = getCountryIdAtUV(hits[0].uv);
        if (!countryId) return; // ocean

        pauseAutoRotate();

        if (DATA_COUNTRY_IDS.has(countryId)) {
          revealedIds.add(countryId);
          renderVisualCanvas(visualCtx, geoFeatures, revealedIds, rejectedIds);
          canvasTexture.needsUpdate = true;
          const name = allNamesRef.current.get(countryId) ?? "this region";
          const msgFn =
            POSITIVE_MSGS[Math.floor(Math.random() * POSITIVE_MSGS.length)];
          showToast(msgFn(name), true);
          onClickRef.current?.(name, true);
        } else {
          rejectedIds.add(countryId);
          renderVisualCanvas(visualCtx, geoFeatures, revealedIds, rejectedIds);
          canvasTexture.needsUpdate = true;
          const name = allNamesRef.current.get(countryId) ?? "Unknown";
          showToast("Not yet, watch this space!", false);
          onClickRef.current?.(name, false);
        }
      }
    };
    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointerup", onPointerUp);

    /* ── Animation loop ─────────────────────────────── */
    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    /* ── Resize ─────────────────────────────────────── */
    const observer = new ResizeObserver(() => {
      currentSize = updateSize();
      renderer.setSize(currentSize, currentSize);
      camera.updateProjectionMatrix();
    });
    if (container.parentElement) observer.observe(container.parentElement);

    /* ── Cleanup ─────────────────────────────────────── */
    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      controls.removeEventListener("start", pauseAutoRotate);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointerup", onPointerUp);
      if (autoRotateTimer) clearTimeout(autoRotateTimer);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [showToast]);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Feedback area above globe: toast → hover name → default hint */}
      <div className="h-10 flex items-center justify-center mb-2">
        {toast ? (
          <span
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium shadow-md animate-fade-in ${
              toast.positive
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-gray-50 text-gray-600 border border-gray-200"
            }`}
          >
            {toast.positive && (
              <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
            )}
            {toast.message}
          </span>
        ) : hoveredCountry ? (
          <span className="text-sm font-medium text-gray-500 animate-fade-in">
            {hoveredCountry}
          </span>
        ) : (
          <span className="text-sm text-gray-400 select-none">
            Click on any country to find out
          </span>
        )}
      </div>

      {/* Globe canvas */}
      <div
        ref={mountRef}
        style={{ width: size, height: size, cursor: "grab", maxWidth: "100%" }}
      />
    </div>
  );
}

export default function InteractiveGlobe({
  onCountryClick,
}: {
  onCountryClick?: (name: string, hasData: boolean) => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return (
      <div className="w-full flex justify-center">
        <div className="w-[600px] h-[600px] max-w-full aspect-square rounded-full bg-gradient-to-br from-gray-100 to-gray-50 animate-pulse" />
      </div>
    );
  }
  return <GlobeInner onCountryClick={onCountryClick} />;
}
