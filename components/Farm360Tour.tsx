"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
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
  Navigation,
  Sparkles,
  Droplets,
  Sprout,
  Feather,
  HeartHandshake,
  Leaf,
  Recycle
} from "lucide-react";
import { farmsData, FarmLocation, Hotspot } from "@/data/farms";
import { track360Interaction } from "@/components/Analytics";

const iconMap: Record<string, React.ReactNode> = {
  Droplets: <Droplets className="w-4 h-4 text-[#2b4c1c]" />,
  Sprout: <Sprout className="w-4 h-4 text-[#2b4c1c]" />,
  Compass: <Compass className="w-4 h-4 text-[#2b4c1c]" />,
  Eye: <Eye className="w-4 h-4 text-[#2b4c1c]" />,
  Feather: <Feather className="w-4 h-4 text-[#8a4724]" />,
  HeartHandshake: <HeartHandshake className="w-4 h-4 text-[#8a4724]" />,
  Leaf: <Leaf className="w-4 h-4 text-[#2b4c1c]" />,
  Recycle: <Recycle className="w-4 h-4 text-[#2b4c1c]" />,
};

export default function Farm360Tour() {
  const [selectedFarmKey, setSelectedFarmKey] = useState<"bhongir" | "moinabad">("bhongir");
  const farm: FarmLocation = farmsData[selectedFarmKey];

  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoadingTexture, setIsLoadingTexture] = useState(true);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [screenHotspots, setScreenHotspots] = useState<
    (Hotspot & { screenX: number; screenY: number; visible: boolean })[]
  >([]);

  // Mobile Gyroscope Support
  const [isGyroActive, setIsGyroActive] = useState(false);

  // Three.js instances
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
  const isVisibleRef = useRef(false);

  // Setup Three.js scene with performance optimizations
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 360;
    const height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(fovRef.current, width / height, 1, 1100);
    const cameraTarget = new THREE.Vector3(0, 0, 0);
    cameraRef.current = camera;

    // Mobile optimized WebGL renderer (capped pixel ratio 1.5 for buttery performance)
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, powerPreference: "default" });
    renderer.setPixelRatio(Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 1.5));
    renderer.setSize(width, height);
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // Optimized Sphere Geometry (36x24 segments - 70% lighter on GPU than 60x40)
    const geometry = new THREE.SphereGeometry(500, 36, 24);
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
    let lastHotspotUpdate = 0;

    // IntersectionObserver to suspend Three.js when scrolled out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // CRITICAL MOBILE PERF: If not in viewport, do zero math and zero rendering!
      if (!isVisibleRef.current) return;

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

      // CRITICAL MOBILE PERF: Throttle hotspot recalculation to at most once per 120ms
      // (avoids calling React setState 60 times/sec which freezes mobile phones!)
      const now = performance.now();
      if (now - lastHotspotUpdate > 120 && containerRef.current) {
        lastHotspotUpdate = now;
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

    // Throttled Resize Handler
    let resizeTicking = false;
    const handleResize = () => {
      if (!resizeTicking) {
        window.requestAnimationFrame(() => {
          if (containerRef.current && rendererRef.current && cameraRef.current) {
            const w = containerRef.current.clientWidth;
            const h = containerRef.current.clientHeight;
            cameraRef.current.aspect = w / h;
            cameraRef.current.updateProjectionMatrix();
            rendererRef.current.setSize(w, h);
          }
          resizeTicking = false;
        });
        resizeTicking = true;
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
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
  };

  // Fullscreen Toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Device Orientation (Gyroscope)
  const toggleGyro = () => {
    if (typeof window === "undefined") return;

    if (
      typeof (DeviceOrientationEvent as any) !== "undefined" &&
      typeof (DeviceOrientationEvent as any).requestPermission === "function"
    ) {
      (DeviceOrientationEvent as any)
        .requestPermission()
        .then((response: string) => {
          if (response === "granted") {
            enableGyroListener();
          }
        })
        .catch(() => {});
    } else {
      enableGyroListener();
    }
  };

  const enableGyroListener = () => {
    setIsGyroActive((prev) => {
      const next = !prev;
      if (next) {
        window.addEventListener("deviceorientation", handleDeviceOrientation);
      } else {
        window.removeEventListener("deviceorientation", handleDeviceOrientation);
      }
      return next;
    });
  };

  const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
    if (event.gamma !== null && event.beta !== null) {
      targetLonRef.current += event.gamma * 0.05;
      targetLatRef.current = Math.max(-85, Math.min(85, event.beta - 45));
    }
  };

  return (
    <section id="tour360" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      {/* Clean Editorial Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="field-note-tag mb-3">
          <Compass className="w-3.5 h-3.5 text-[#8a4724]" />
          <span>Interactive 360° Virtual Tour</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#1a2614] tracking-tight">
          Look across the fields <br />
          <span className="italic font-normal text-[#8a4724]">before you take the highway.</span>
        </h2>

        <p className="mt-3 text-[#4a5840] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Swipe with your finger or move your phone in 360 degrees. Both farm locations near Hyderabad are open to explore.
        </p>

        {/* Dual-Farm Switcher: Simple Clean Pill */}
        <div className="mt-6 inline-flex p-1 rounded-full bg-[#ffffff] border border-[#2b4c1c]/15 shadow-sm">
          <button
            onClick={() => {
              setSelectedFarmKey("bhongir");
              track360Interaction("Bhongir Farm", "switch_farm");
            }}
            className={`px-5 sm:px-7 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
              selectedFarmKey === "bhongir"
                ? "bg-[#2b4c1c] text-white shadow-xs"
                : "text-[#526048] hover:text-[#1a2614]"
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Bhongir Main Farm</span>
          </button>

          <button
            onClick={() => {
              setSelectedFarmKey("moinabad");
              track360Interaction("Moinabad Farm", "switch_farm");
            }}
            className={`px-5 sm:px-7 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
              selectedFarmKey === "moinabad"
                ? "bg-[#2b4c1c] text-white shadow-xs"
                : "text-[#526048] hover:text-[#1a2614]"
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Moinabad Agro-Sanctuary</span>
          </button>
        </div>
      </div>

      {/* 360 Horizon Pavilion Container */}
      <div className="relative rounded-3xl overflow-hidden bg-[#ffffff] border border-[#2b4c1c]/15 shadow-md h-[400px] sm:h-[500px] lg:h-[600px] select-none">
        {/* Loading Overlay */}
        <AnimatePresence>
          {isLoadingTexture && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#faf7f0]/90 backdrop-blur-xs"
            >
              <div className="w-8 h-8 rounded-full border-2 border-[#2b4c1c]/20 border-t-[#2b4c1c] animate-spin" />
              <p className="mt-3 text-xs font-serif italic text-[#4a5840]">
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
                  onClick={() => {
                    const nextState = isSelected ? null : hs;
                    setSelectedHotspot(nextState);
                    if (nextState) {
                      track360Interaction(farm.name, `hotspot_${hs.title}`);
                    }
                  }}
                  className="group relative flex items-center justify-center w-9 h-9 rounded-full bg-[#ffffff] shadow-md hover:scale-115 transition-all duration-300 border border-[#2b4c1c]/20"
                  title={hs.title}
                >
                  <span className="absolute inset-0 rounded-full bg-[#8a4724]/20 animate-ping" />
                  <span className="relative z-10 flex items-center justify-center">
                    {iconMap[hs.icon] || <Info className="w-4 h-4 text-[#2b4c1c]" />}
                  </span>
                  <span className="absolute left-11 whitespace-nowrap px-2.5 py-1 rounded-full bg-[#ffffff] text-[10px] font-semibold text-[#1a2614] tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm border border-[#2b4c1c]/15">
                    {hs.title}
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Selected Hotspot Detail Card */}
        <AnimatePresence>
          {selectedHotspot && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="absolute bottom-16 sm:bottom-6 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-30 p-5 rounded-2xl bg-[#ffffff] border border-[#2b4c1c]/15 shadow-xl"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className="text-[10px] font-semibold text-[#8a4724] uppercase tracking-wider">
                  {selectedHotspot.tag}
                </span>
                <button
                  onClick={() => setSelectedHotspot(null)}
                  className="p-1 text-[#6e7d64] hover:text-[#1a2614]"
                >
                  ✕
                </button>
              </div>

              <div className="flex gap-3">
                {selectedHotspot.image && (
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-[#e8ded0] border border-[#2b4c1c]/10">
                    <img
                      src={selectedHotspot.image}
                      alt={`${selectedHotspot.title} - One Day Kisan 360 virtual tour`}
                      width={64}
                      height={64}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-serif font-bold text-[#1a2614]">
                    {selectedHotspot.title}
                  </h4>
                  <p className="mt-1 text-xs text-[#526048] leading-relaxed">
                    {selectedHotspot.description}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top Location Pill */}
        <div className="absolute top-4 left-4 z-20 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ffffff]/90 backdrop-blur-xs border border-[#2b4c1c]/15 text-xs text-[#334628] shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#2b4c1c]" />
          <span className="font-semibold text-[#1a2614]">{farm.name}</span>
          <span>•</span>
          <span className="text-[#8a4724] font-medium">{farm.travelTime}</span>
        </div>

        {/* Floating Mobile Instruction Pill */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ffffff]/90 backdrop-blur-xs border border-[#2b4c1c]/15 shadow-xs text-[11px] text-[#1a2614]">
          <span>👆</span>
          <span>Swipe 360°</span>
        </div>

        {/* Bottom Floating Control Bar */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 p-1 rounded-full bg-[#ffffff]/90 border border-[#2b4c1c]/15 shadow-md">
          <button
            onClick={() => setIsAutoRotating((prev) => !prev)}
            className={`p-2 rounded-full transition-all ${
              isAutoRotating ? "bg-[#2b4c1c] text-white" : "text-[#4a5840] hover:bg-[#f3ece0]"
            }`}
            title="Auto-Rotate Horizon"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={zoomIn}
            className="p-2 rounded-full text-[#4a5840] hover:bg-[#f3ece0]"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={zoomOut}
            className="p-2 rounded-full text-[#4a5840] hover:bg-[#f3ece0]"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={toggleGyro}
            className={`p-2 rounded-full transition-all ${
              isGyroActive ? "bg-[#2b4c1c] text-white" : "text-[#4a5840] hover:bg-[#f3ece0]"
            }`}
            title="Mobile Gyroscope View"
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-full text-[#4a5840] hover:bg-[#f3ece0]"
            title="Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Simple Clean Landmark Jump Pills */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs text-[#6e7d64] font-medium mr-1 flex items-center gap-1">
          <Compass className="w-3.5 h-3.5 text-[#8a4724]" />
          Key landmarks:
        </span>
        {farm.hotspots.map((hs) => (
          <button
            key={hs.id}
            onClick={() => jumpToHotspot(hs)}
            className={`px-3 py-1 rounded-full text-xs transition-all duration-200 flex items-center gap-1.5 border ${
              selectedHotspot?.id === hs.id
                ? "bg-[#2b4c1c] text-white border-[#2b4c1c] font-medium"
                : "bg-[#ffffff] text-[#4a5840] hover:text-[#1a2614] border-[#2b4c1c]/15 hover:bg-[#faf7f0]"
            }`}
          >
            {iconMap[hs.icon]}
            <span>{hs.title}</span>
          </button>
        ))}
      </div>
    </section>
  );
}