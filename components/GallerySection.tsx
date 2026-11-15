"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { galleryImages } from "@/data/gallery";
import { Image as ImageIcon, ChevronLeft, ChevronRight, X, Sparkles } from "lucide-react";

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [currentLightboxIndex, setCurrentLightboxIndex] = useState<number | null>(null);

  const categories = [
    { key: "all", label: "All Photos (58)" },
    { key: "farming", label: "Farming in Action" },
    { key: "schools", label: "School Trips" },
    { key: "animals", label: "Animals & Birds" },
    { key: "activities", label: "Crafts & Joy" },
  ];

  const filteredImages = galleryImages.filter((img) => {
    if (activeCategory === "all") return true;
    return img.category === activeCategory;
  });

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
    <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#2b4c1c]/10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="field-note-tag mb-4">
          <ImageIcon className="w-3.5 h-3.5 text-[#a84724]" />
          Visual Archive • 100% Authentic Photos
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#1a2713] tracking-tight">
          Snapshots of the Soil. <br />
          <span className="italic font-normal text-[#a84724]">Zero Stock Photography.</span>
        </h2>

        <p className="mt-4 text-[#4a5840] text-base font-light">
          Real moments of discovery, laughter, and red mud across our Bhongir and Moinabad farm destinations.
        </p>

        {/* Filter Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full bg-[#ffffff] border border-[#2b4c1c]/15 max-w-2xl mx-auto shadow-xs">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                activeCategory === cat.key
                  ? "bg-[#2b4c1c] text-white font-semibold shadow-xs"
                  : "text-[#526048] hover:text-[#1a2713] hover:bg-[#faf7f0]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Photo Grid */}
      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4"
      >
        <AnimatePresence>
          {filteredImages.map((img, idx) => (
            <motion.div
              layout
              key={img.src}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3 }}
              onClick={() => openLightbox(idx)}
              className="polaroid-frame rounded-2xl cursor-pointer group relative overflow-hidden"
            >
              <div className="aspect-square rounded-xl overflow-hidden bg-[#e8ded0]">
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="p-2 rounded-full bg-white/90 text-[#2b4c1c] shadow-md scale-75 group-hover:scale-100 transition-transform">
                  <Sparkles className="w-4 h-4" />
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {currentLightboxIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-md">
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="absolute top-6 left-6 z-50 px-4 py-2 rounded-full bg-white/10 text-xs text-white font-mono">
              {currentLightboxIndex + 1} / {filteredImages.length}
            </div>

            <button
              onClick={prevImage}
              className="absolute left-4 sm:left-8 z-50 p-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 sm:right-8 z-50 p-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white"
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
                className="max-w-full max-h-[78vh] object-contain rounded-2xl shadow-2xl border border-white/20"
              />
              <p className="mt-3 text-xs text-stone-300">
                {filteredImages[currentLightboxIndex].alt}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
