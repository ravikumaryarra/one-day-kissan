"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { galleryImages } from "@/data/gallery";
import { Image as ImageIcon, ChevronLeft, ChevronRight, X, Sparkles, ChevronDown, ChevronUp, Camera } from "lucide-react";

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [currentLightboxIndex, setCurrentLightboxIndex] = useState<number | null>(null);

  const INITIAL_COUNT = 8;

  const categories = [
    { key: "all", label: "All Photos", count: galleryImages.length },
    { key: "farming", label: "Farming in Action", count: galleryImages.filter(i => i.category === "farming").length },
    { key: "schools", label: "School Trips", count: galleryImages.filter(i => i.category === "schools").length },
    { key: "animals", label: "Animals & Birds", count: galleryImages.filter(i => i.category === "animals").length },
    { key: "activities", label: "Crafts & Joy", count: galleryImages.filter(i => i.category === "activities").length },
  ];

  const filteredImages = galleryImages.filter((img) => {
    if (activeCategory === "all") return true;
    return img.category === activeCategory;
  });

  const visibleImages = isExpanded ? filteredImages : filteredImages.slice(0, INITIAL_COUNT);
  const remainingCount = Math.max(0, filteredImages.length - INITIAL_COUNT);

  const openLightbox = (index: number) => {
    setCurrentLightboxIndex(index);
  };

  const closeLightbox = () => {
    setCurrentLightboxIndex(null);
  };

  const prevImage = () => {
    if (currentLightboxIndex === null) return;
    setCurrentLightboxIndex((prev) => (prev! === 0 ? filteredImages.length - 1 : prev! - 1));
  };

  const nextImage = () => {
    if (currentLightboxIndex === null) return;
    setCurrentLightboxIndex((prev) => (prev! === filteredImages.length - 1 ? 0 : prev! + 1));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentLightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentLightboxIndex, filteredImages.length]);

  return (
    <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      {/* Header with Clean Agritourism Badges */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="field-note-tag mb-3">
          <Camera className="w-3.5 h-3.5 text-[#8a4724]" />
          <span>Visual Archive • 100% Authentic Photos</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#1a2614] tracking-tight">
          Snapshots of the Soil. <br />
          <span className="italic font-normal text-[#8a4724]">
            Zero Stock Photography.
          </span>
        </h2>

        <p className="mt-3 text-[#4a5840] text-sm sm:text-base font-normal">
          Real moments of discovery, laughter, and red mud across our Bhongir and Moinabad farm destinations.
        </p>

        {/* Filter Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full bg-white border border-[#2b4c1c]/15 max-w-2xl mx-auto shadow-xs">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => {
                setActiveCategory(cat.key);
                setIsExpanded(false);
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                activeCategory === cat.key
                  ? "bg-[#2b4c1c] text-white shadow-xs"
                  : "text-[#526048] hover:text-[#1a2614] hover:bg-[#faf7f0]"
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeCategory === cat.key ? "bg-white/20 text-white" : "bg-[#f5f0e6] text-[#526048]"
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Curated Photo Grid */}
      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-5"
      >
        <AnimatePresence>
          {visibleImages.map((img, idx) => (
            <motion.div
              layout
              key={img.src}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.3 }}
              onClick={() => openLightbox(idx)}
              className="polaroid-frame rounded-2xl cursor-pointer group relative overflow-hidden bg-white border border-[#2b4c1c]/15 hover:border-[#2b4c1c]/50"
            >
              <div className="aspect-square rounded-xl overflow-hidden bg-[#e8ded0]">
                <img
                  src={img.src}
                  alt={img.alt}
                  width={400}
                  height={400}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-3">
                <span className="py-1.5 px-3 rounded-full bg-white/95 text-[#2b4c1c] text-[11px] font-bold shadow-md flex items-center gap-1 scale-90 group-hover:scale-100 transition-transform">
                  <Sparkles className="w-3.5 h-3.5 text-[#8a4724]" />
                  <span>View Full Photo</span>
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Explore More / See Fewer Photos Toggle Bar */}
      {filteredImages.length > INITIAL_COUNT && (
        <div className="mt-10 text-center flex flex-col items-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#2b4c1c] hover:bg-[#1e3614] text-white font-medium text-xs shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            {isExpanded ? (
              <>
                <span>Show Fewer Photos</span>
                <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>Explore More Photos (+{remainingCount} More)</span>
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
          
          <p className="mt-2 text-xs text-[#6e7d64]">
            Showing {visibleImages.length} of {filteredImages.length} farm photographs
          </p>
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {currentLightboxIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md">
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="absolute top-5 left-5 z-50 px-4 py-1.5 rounded-full bg-white/15 text-xs text-white font-mono border border-white/20">
              {currentLightboxIndex + 1} / {filteredImages.length}
            </div>

            <button
              onClick={prevImage}
              className="absolute left-3 sm:left-8 z-50 p-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-3 sm:right-8 z-50 p-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <motion.div
              key={currentLightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="max-w-4xl max-h-[85vh] p-4 flex flex-col items-center"
            >
              <img
                src={filteredImages[currentLightboxIndex].src}
                alt={filteredImages[currentLightboxIndex].alt}
                width={1200}
                height={800}
                className="max-w-full max-h-[76vh] object-contain rounded-2xl shadow-2xl border border-white/20"
              />
              <p className="mt-3 text-xs text-stone-300 text-center max-w-xl">
                {filteredImages[currentLightboxIndex].alt}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}