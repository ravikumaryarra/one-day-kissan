"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Maximize2,
  Minimize2,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Smartphone,
  Eye,
  ArrowRight,
  Info,
  MapPin,
  Sparkles,
  Droplets,
  Sprout,
  Feather,
  HeartHandshake,
  Leaf,
  Recycle
} from "lucide-react";
import { farmsData, FarmLocation, Hotspot } from "@/data/farms";

const iconMap: Record<string, React.ReactNode> = {
  Droplets: <Droplets className="w-4 h-4 text-[#2b4c1c]" />,
  Sprout: <Sprout className="w-4 h-4 text-[#2b4c1c]" />,
  Compass: <Compass className="w-4 h-4 text-[#a84724]" />,
  Eye: <Eye className="w-4 h-4 text-[#8a5738]" />,
  Feather: <Feather className="w-4 h-4 text-[#b8522f]" />,
  HeartHandshake: <HeartHandshake className="w-4 h-4 text-[#8a5738]" />,
  Leaf: <Leaf className="w-4 h-4 text-[#2b4c1c]" />,
  Recycle: <Recycle className="w-4 h-4 text-[#2b4c1c]" />,
};

interface ScreenHotspot extends Hotspot {
  screenX: number;
  screenY: number;
  visible: boolean;
}

export default function Farm360Tour() {
  const [selectedFarmKey, setSelectedFarmKey] = useState<"bhongir" | "moinabad">("bhongir");
  const farm: FarmLocation = farmsData[selectedFarmKey];

  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isGyroActive, setIsGyroActive] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [screenHotspots, setScreenHotspots] = useState<ScreenHotspot[]>([]);
  const [isLoadingTexture, setIsLoadingTexture] = useState(true);

  // Three.js refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sphereRef = useRef<THREE.Mesh | null>(null);
  const textureLoaderRef = useRef<THREE.TextureLoader | null>(null);

  // Camera orientation state
  const latRef = useRef(0);
  const lonRef = useRef(90);
  const targetLonRef = useRef(90);
  const targetLatRef = useRef(0);
  const fovRef = useRef(70);

  // Interaction tracking
  const isUserInteractingRef = useRef(false);
  const onPointerDownPointerXRef = useRef(0);
  const onPointerDownPointerYRef = useRef(0);
  const onPointerDownLonRef = useRef(0);
  const onPointerDownLatRef = useRef(0);

  // Setup Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(fovRef.current, width / height, 1, 1100);
    const cameraTarget = new THREE.Vector3(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // Sphere Geometry (inverted)
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);

    const textureLoader = new THREE.TextureLoader();
    textureLoaderRef.current = textureLoader;

    setIsLoadingTexture(true);
    const texture = textureLoader.load(farm.panoramaUrl, () => {
      setIsLoadingTexture(false);
    });
    texture.colorSpace = THREE.SRGBColorSpace;

    const material = new THREE.MeshBasicMaterial({ map: texture });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    sphereRef.current = sphere;

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth camera interpolation
      if (isAutoRotating && !isUserInteractingRef.current) {
        targetLonRef.current += 0.08;
      }

      lonRef.current += (targetLonRef.current - lonRef.current) * 0.1;
      latRef.current += (targetLatRef.current - latRef.current) * 0.1;
      latRef.current = Math.max(-85, Math.min(85, latRef.current));

      const phi = THREE.MathUtils.degToRad(90 - latRef.current);
      const theta = THREE.MathUtils.degToRad(lonRef.current);

      cameraTarget.x = 500 * Math.sin(phi) * Math.cos(theta);
      cameraTarget.y = 500 * Math.cos(phi);
      cameraTarget.z = 500 * Math.sin(phi) * Math.sin(theta);
      camera.lookAt(cameraTarget);

      camera.fov = fovRef.current;
      camera.updateProjectionMatrix();

      renderer.render(scene, camera);

      // Project Hotspots into 2D Screen Space
      if (containerRef.current) {
        const curW = containerRef.current.clientWidth;
        const curH = containerRef.current.clientHeight;
        const currentFarm = farmsData[selectedFarmKey];

        const updated = currentFarm.hotspots.map((hs) => {
          const hPhi = THREE.MathUtils.degToRad(90 - hs.pitch);
          const hTheta = THREE.MathUtils.degToRad(hs.yaw);
          const pos = new THREE.Vector3(
            500 * Math.sin(hPhi) * Math.cos(hTheta),
            500 * Math.cos(hPhi),
            500 * Math.sin(hPhi) * Math.sin(hTheta)
          );

          pos.project(camera);

          const isFacingCamera = pos.z < 1;
          const sx = (pos.x * 0.5 + 0.5) * curW;
          const sy = (-(pos.y * 0.5) + 0.5) * curH;

          return {
            ...hs,
            screenX: sx,
            screenY: sy,
            visible: isFacingCamera && sx >= 20 && sx <= curW - 20 && sy >= 20 && sy <= curH - 20,
          };
        });

        setScreenHotspots(updated);
      }
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      texture.dispose();
    };
  }, []);

  // Handle Switching Farm Panorama
  useEffect(() => {
    if (!sphereRef.current || !textureLoaderRef.current) return;
    setIsLoadingTexture(true);
    setSelectedHotspot(null);

    textureLoaderRef.current.load(farm.panoramaUrl, (newTexture) => {
      newTexture.colorSpace = THREE.SRGBColorSpace;
      const material = sphereRef.current!.material as THREE.MeshBasicMaterial;
      material.map?.dispose();
      material.map = newTexture;
      material.needsUpdate = true;
      setIsLoadingTexture(false);
    });

    targetLonRef.current = 90;
    targetLatRef.current = 0;
  }, [selectedFarmKey, farm.panoramaUrl]);

  // Pointer & Touch Events
  const handlePointerDown = (e: React.PointerEvent) => {
    isUserInteractingRef.current = true;
    onPointerDownPointerXRef.current = e.clientX;
    onPointerDownPointerYRef.current = e.clientY;
    onPointerDownLonRef.current = targetLonRef.current;
    onPointerDownLatRef.current = targetLatRef.current;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isUserInteractingRef.current) return;
    const factor = fovRef.current / 70;
    targetLonRef.current = (onPointerDownPointerXRef.current - e.clientX) * 0.15 * factor + onPointerDownLonRef.current;
    targetLatRef.current = (e.clientY - onPointerDownPointerYRef.current) * 0.15 * factor + onPointerDownLatRef.current;
  };

  const handlePointerUp = () => {
    isUserInteractingRef.current = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    fovRef.current = Math.max(35, Math.min(90, fovRef.current + e.deltaY * 0.05));
  };

  const zoomIn = () => {
    fovRef.current = Math.max(35, fovRef.current - 12);
  };
  const zoomOut = () => {
    fovRef.current = Math.min(90, fovRef.current + 12);
  };

  const jumpToHotspot = (hs: Hotspot) => {
    targetLonRef.current = hs.yaw;
    targetLatRef.current = hs.pitch;
    setSelectedHotspot(hs);
    setIsAutoRotating(false);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const toggleGyro = () => {
    if (typeof window === "undefined") return;
    if (typeof (DeviceOrientationEvent as any)?.requestPermission === "function") {
      (DeviceOrientationEvent as any).requestPermission()
        .then((state: string) => {
          if (state === "granted") {
            setIsGyroActive((prev) => !prev);
          }
        })
        .catch(() => {});
    } else {
      setIsGyroActive((prev) => !prev);
    }
  };

  useEffect(() => {
    if (!isGyroActive) return;
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.alpha !== null && e.beta !== null) {
        targetLonRef.current = -e.alpha;
        targetLatRef.current = Math.max(-80, Math.min(80, e.beta - 60));
      }
    };
    window.addEventListener("deviceorientation", handleOrientation);
    return () => window.removeEventListener("deviceorientation", handleOrientation);
  }, [isGyroActive]);

  return (
    <section id="tour360" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#2b4c1c]/10">
      {/* Chapter Marker */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="field-note-tag mb-4"
        >
          <Compass className="w-3.5 h-3.5 text-[#a84724]" />
          Visual Interlude • The Living Horizon
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-5xl font-serif font-bold text-[#1a2713] tracking-tight"
        >
          Look across the fields <br />
          <span className="italic font-normal text-[#a84724]">before you take the highway.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-4 text-[#4a5840] text-base sm:text-lg font-light leading-relaxed"
        >
          Drag with your fingers or move your phone to turn 360 degrees. Both farm locations near Hyderabad are open to explore.
        </motion.p>

        {/* Dual-Farm Switcher: Warm Linen Segmented Pill */}
        <div className="mt-8 inline-flex p-1.5 rounded-full bg-[#ffffff] border border-[#2b4c1c]/15 relative shadow-md">
          <button
            onClick={() => setSelectedFarmKey("bhongir")}
            className={`relative z-10 px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
              selectedFarmKey === "bhongir"
                ? "text-white font-semibold"
                : "text-[#526048] hover:text-[#1a2713]"
            }`}
          >
            <MapPin className="w-4 h-4 text-[#a84724]" />
            Bhongir Main Farm
            <span className="hidden sm:inline text-[10px] px-2 py-0.5 rounded-full bg-[#ffffff]/20 font-normal">
              Warangal Hwy
            </span>
          </button>

          <button
            onClick={() => setSelectedFarmKey("moinabad")}
            className={`relative z-10 px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
              selectedFarmKey === "moinabad"
                ? "text-white font-semibold"
                : "text-[#526048] hover:text-[#1a2713]"
            }`}
          >
            <MapPin className="w-4 h-4 text-[#8a5738]" />
            Moinabad Agro-Sanctuary
            <span className="hidden sm:inline text-[10px] px-2 py-0.5 rounded-full bg-[#ffffff]/20 font-normal">
              Kapil Agro
            </span>
          </button>

          {/* Active Pill Animation */}
          <motion.div
            layoutId="activeFarmPill"
            className="absolute inset-y-1.5 rounded-full bg-[#2b4c1c] shadow-sm"
            style={{
              left: selectedFarmKey === "bhongir" ? "6px" : "50%",
              width: "calc(50% - 6px)",
            }}
            transition={{ type: "spring", stiffness: 350, damping: 32 }}
          />
        </div>
      </div>

      {/* 360 Horizon Pavilion Container */}
      <div className="relative rounded-3xl overflow-hidden bg-[#ffffff] border border-[#2b4c1c]/15 shadow-[0_20px_60px_-15px_rgba(50,40,20,0.12)] aspect-[16/10] sm:aspect-[16/9] max-h-[700px] select-none">
        {/* Loading Overlay */}
        <AnimatePresence>
          {isLoadingTexture && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#fdfbf7]/85 backdrop-blur-md"
            >
              <div className="w-10 h-10 rounded-full border-2 border-[#2b4c1c]/20 border-t-[#2b4c1c] animate-spin" />
              <p className="mt-4 text-xs font-serif italic text-[#4a5840]">
                Connecting to {farm.name}...
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* WebGL Canvas */}
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onWheel={handleWheel}
          className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
        />

        {/* 3D Hotspots in 2D Screen Space */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {screenHotspots.map((hs) => {
            if (!hs.visible) return null;
            const isSelected = selectedHotspot?.id === hs.id;

            return (
              <div
                key={hs.id}
                style={{
                  transform: `translate3d(${hs.screenX}px, ${hs.screenY}px, 0)`,
                }}
                className="absolute -top-5 -left-5 pointer-events-auto transition-transform duration-75 ease-out"
              >
                <button
                  onClick={() => setSelectedHotspot(isSelected ? null : hs)}
                  className="group relative flex items-center justify-center w-10 h-10 rounded-full bg-[#ffffff] shadow-lg hover:scale-125 transition-all duration-300 border border-[#2b4c1c]/20"
                  title={hs.title}
                >
                  {/* Radar Pulse */}
                  <span className="absolute inset-0 rounded-full bg-[#a84724]/20 animate-ping" />
                  <span className="relative z-10 flex items-center justify-center">
                    {iconMap[hs.icon] || <Info className="w-4 h-4 text-[#2b4c1c]" />}
                  </span>

                  {/* Hotspot Floating Label */}
                  <span className="absolute left-12 whitespace-nowrap px-3 py-1 rounded-full bg-[#ffffff] text-[11px] font-semibold text-[#1a2713] tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md border border-[#2b4c1c]/15">
                    {hs.title}
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Selected Hotspot Detail Card (Warm Editorial Polaroid Sheet) */}
        <AnimatePresence>
          {selectedHotspot && (
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.94 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute bottom-20 left-4 sm:left-8 right-4 sm:right-auto sm:max-w-md z-20 bg-[#ffffff] rounded-2xl p-5 border border-[#2b4c1c]/15 shadow-2xl text-left"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className="field-note-tag text-[10px]">
                  {selectedHotspot.tag}
                </span>
                <button
                  onClick={() => setSelectedHotspot(null)}
                  className="text-[#6e7d64] hover:text-[#1a2713] p-1 rounded-full hover:bg-[#f3ede2]"
                >
                  ✕
                </button>
              </div>

              <div className="flex gap-4">
                {selectedHotspot.image && (
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[#e8ded0] border border-[#2b4c1c]/10">
                    <img
                      src={selectedHotspot.image}
                      alt={selectedHotspot.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <h4 className="text-base font-serif font-bold text-[#1e2917]">
                    {selectedHotspot.title}
                  </h4>
                  <p className="mt-1 text-xs text-[#526048] leading-relaxed">
                    {selectedHotspot.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#2b4c1c]/10 flex items-center justify-between text-xs">
                <span className="text-[11px] text-[#6e7d64]">
                  Part of {farm.name}
                </span>
                <a
                  href="#act1-mud"
                  className="text-xs font-semibold text-[#2b4c1c] hover:underline inline-flex items-center gap-1"
                >
                  Read Field Note <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top Location Pill */}
        <div className="absolute top-4 left-4 z-20 hidden sm:flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#ffffff]/90 border border-[#2b4c1c]/15 text-xs text-[#4a5840] shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#2b4c1c] animate-pulse" />
          <span className="font-semibold text-[#1a2713]">{farm.name}</span>
          <span>•</span>
          <span>{farm.highway}</span>
          <span>•</span>
          <span className="text-[#a84724] font-medium">{farm.travelTime}</span>
        </div>

        {/* Bottom Floating Control Bar */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 p-1 rounded-full bg-[#ffffff]/90 border border-[#2b4c1c]/15 shadow-xl">
          <button
            onClick={() => setIsAutoRotating((prev) => !prev)}
            className={`p-2 rounded-full transition-all ${
              isAutoRotating ? "bg-[#2b4c1c] text-white" : "text-[#4a5840] hover:bg-[#f3ece0]"
            }`}
            title="Auto-Rotate Horizon"
          >
            <RotateCw className="w-4 h-4" />
          </button>

          <button
            onClick={zoomIn}
            className="p-2 rounded-full text-[#4a5840] hover:bg-[#f3ece0]"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <button
            onClick={zoomOut}
            className="p-2 rounded-full text-[#4a5840] hover:bg-[#f3ece0]"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <button
            onClick={toggleGyro}
            className={`p-2 rounded-full transition-all ${
              isGyroActive ? "bg-[#2b4c1c] text-white" : "text-[#4a5840] hover:bg-[#f3ece0]"
            }`}
            title="Mobile Gyroscope View"
          >
            <Smartphone className="w-4 h-4" />
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-full text-[#4a5840] hover:bg-[#f3ece0]"
            title="Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Landmark Jump Pills */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs text-[#6e7d64] font-medium mr-1 flex items-center gap-1">
          <Compass className="w-3.5 h-3.5 text-[#a84724]" />
          Direct landmark jumps:
        </span>
        {farm.hotspots.map((hs) => (
          <button
            key={hs.id}
            onClick={() => jumpToHotspot(hs)}
            className={`px-3.5 py-1.5 rounded-full text-xs transition-all duration-300 flex items-center gap-1.5 border ${
              selectedHotspot?.id === hs.id
                ? "bg-[#2b4c1c] text-white border-[#2b4c1c] shadow-sm font-medium"
                : "bg-[#ffffff] text-[#4a5840] hover:text-[#1a2713] border-[#2b4c1c]/15"
            }`}
          >
            {iconMap[hs.icon]}
            {hs.title}
          </button>
        ))}
      </div>
    </section>
  );
}
