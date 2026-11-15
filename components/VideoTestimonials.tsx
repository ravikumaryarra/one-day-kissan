"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { videoTestimonials, Testimonial } from "@/data/testimonials";
import { Play, X, Video, Star } from "lucide-react";

export default function VideoTestimonials() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeVideo, setActiveVideo] = useState<Testimonial | null>(null);

  const categories = ["All", "Schools", "Corporates", "Families"];

  const filteredVideos = videoTestimonials.filter((v) => {
    if (activeCategory === "All") return true;
    return v.category === activeCategory;
  });

  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#2b4c1c]/10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="field-note-tag mb-4">
          <Video className="w-3.5 h-3.5 text-[#a84724]" />
          Voices from the Field • Video Reviews
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#1a2713] tracking-tight">
          Hear from Principals, Teachers <br />
          <span className="italic font-normal text-[#a84724]">& Corporate Organizers.</span>
        </h2>

        <p className="mt-4 text-[#4a5840] text-base font-light">
          Watch real, unscripted video reflections from over 350+ educational institutions and corporate teams that have spent a day at One Day Kisan.
        </p>

        {/* Category Filter */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full bg-[#ffffff] border border-[#2b4c1c]/15 max-w-md mx-auto shadow-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#2b4c1c] text-white font-semibold shadow-xs"
                  : "text-[#526048] hover:text-[#1a2713] hover:bg-[#faf7f0]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Video Cards Grid (All 19 Reviews) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((vid) => (
          <motion.div
            key={vid.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={() => setActiveVideo(vid)}
            className="polaroid-frame rounded-2xl cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black mb-3">
                <img
                  src={vid.thumbnail}
                  alt={vid.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#a84724] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 ml-0.5 fill-white" />
                  </div>
                </div>
              </div>

              <div className="px-1">
                <div className="flex items-center gap-1 text-[#d69129] mb-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#d69129]" />
                  ))}
                  <span className="text-[10px] text-[#8a5738] ml-1 font-mono uppercase">
                    Verified {vid.category} Visit
                  </span>
                </div>
                <h4 className="font-serif font-bold text-sm text-[#1e2917] group-hover:text-[#2b4c1c] transition-colors line-clamp-2">
                  {vid.title}
                </h4>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#2b4c1c]/10 flex items-center justify-between text-[11px] text-[#2b4c1c] px-1 font-medium">
              <span>{vid.category} Feedback</span>
              <span className="group-hover:translate-x-1 transition-transform">Watch Video →</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Video Modal Player */}
      <AnimatePresence>
        {activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-3xl rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-black"
            >
              <div className="flex items-center justify-between px-6 py-4 bg-stone-900 border-b border-white/10">
                <span className="font-serif font-bold text-xs text-white truncate max-w-md">
                  {activeVideo.title}
                </span>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="text-stone-300 hover:text-white p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="aspect-video w-full bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&rel=0`}
                  title={activeVideo.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
