"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { videoTestimonials, Testimonial } from "@/data/testimonials";
import { Play, X, Video, Star, ChevronDown, ChevronUp, Sparkles } from "lucide-react";

export default function VideoTestimonials() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeVideo, setActiveVideo] = useState<Testimonial | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const INITIAL_COUNT = 6;

  const categories = [
    { key: "All", label: "All Reviews", count: videoTestimonials.length },
    { key: "Schools", label: "Schools & Colleges", count: videoTestimonials.filter(v => v.category === "Schools").length },
    { key: "Corporates", label: "Corporates", count: videoTestimonials.filter(v => v.category === "Corporates").length },
    { key: "Families", label: "Families", count: videoTestimonials.filter(v => v.category === "Families").length },
  ];

  const filteredVideos = videoTestimonials.filter((v) => {
    if (activeCategory === "All") return true;
    return v.category === activeCategory;
  });

  const visibleVideos = isExpanded ? filteredVideos : filteredVideos.slice(0, INITIAL_COUNT);
  const remainingCount = Math.max(0, filteredVideos.length - INITIAL_COUNT);

  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Header with Natural Field Note Badge */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2b4c1c]/10 border border-[#2b4c1c]/20 text-xs font-mono uppercase tracking-widest text-[#2b4c1c] mb-4">
          <Video className="w-3.5 h-3.5 text-[#2b4c1c]" />
          <span>Field Archives • Unscripted Reflections</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif font-black text-[#14230e] tracking-tight">
          Hear from Principals, Teachers <br />
          <span className="italic font-normal text-[#8a4724]">
            & Corporate Organizers.
          </span>
        </h2>

        <p className="mt-4 text-[#3d4f33] text-sm sm:text-base font-normal">
          Authentic video reflections from educational institutions and corporate teams that spent a full day grounded at One Day Kisan.
        </p>

        {/* Category Filter Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full bg-white/80 border border-[#2b4c1c]/15 max-w-lg mx-auto shadow-xs">
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
                  : "text-[#4a5f3f] hover:text-[#14230e] hover:bg-[#2b4c1c]/5"
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                activeCategory === cat.key ? "bg-white/20 text-white" : "bg-[#2b4c1c]/10 text-[#2b4c1c]"
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Video Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleVideos.map((vid) => (
          <motion.div
            key={vid.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={() => setActiveVideo(vid)}
            className="polaroid-frame rounded-2xl cursor-pointer group flex flex-col justify-between bg-white border border-[#2b4c1c]/15 hover:border-[#2b4c1c]/50 hover:shadow-lg transition-all"
          >
            <div>
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black mb-3">
                <img
                  src={vid.thumbnail}
                  alt={`${vid.title} - Authentic Video Review from One Day Kisan Visitor`}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/15 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#2b4c1c] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 ml-0.5 fill-white" />
                  </div>
                </div>
              </div>

              <div className="px-1">
                <div className="flex items-center gap-1 text-[#8a4724] mb-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#8a4724] text-[#8a4724]" />
                  ))}
                  <span className="text-[10px] text-[#8a4724] ml-1 font-mono uppercase font-bold tracking-wider">
                    Verified {vid.category} Visit
                  </span>
                </div>
                <h4 className="font-serif font-bold text-sm text-[#14230e] group-hover:text-[#2b4c1c] transition-colors line-clamp-2">
                  {vid.title}
                </h4>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#2b4c1c]/10 flex items-center justify-between text-[11px] text-[#4a5f3f] px-1 font-semibold">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#8a4724]" />
                {vid.category} Experience
              </span>
              <span className="group-hover:translate-x-1 transition-transform text-[#8a4724] font-bold">
                Watch Video →
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Explore More / See Fewer Videos Toggle Button */}
      {filteredVideos.length > INITIAL_COUNT && (
        <div className="mt-10 text-center flex flex-col items-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#2b4c1c] hover:bg-[#1e3613] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {isExpanded ? (
              <>
                <span>Show Fewer Reviews</span>
                <ChevronUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
              </>
            ) : (
              <>
                <span>Watch More Video Reviews (+{remainingCount} More)</span>
                <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              </>
            )}
          </button>
          
          <p className="mt-2 text-xs text-[#526548]">
            Showing {visibleVideos.length} of {filteredVideos.length} authentic video reviews
          </p>
        </div>
      )}

      {/* YouTube Video Modal Player */}
      <AnimatePresence>
        {activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl rounded-3xl overflow-hidden bg-black shadow-2xl border border-white/20"
            >
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-black/70 hover:bg-black text-white"
                aria-label="Close video player"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&rel=0`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>

              <div className="p-4 bg-zinc-900 text-white">
                <h4 className="font-serif font-bold text-base">{activeVideo.title}</h4>
                <p className="text-xs text-zinc-400 mt-1">Verified {activeVideo.category} Visitor Feedback</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}