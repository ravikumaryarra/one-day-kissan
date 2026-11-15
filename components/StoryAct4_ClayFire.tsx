"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Play, X, Star, ArrowRight } from "lucide-react";
import { videoTestimonials, Testimonial } from "@/data/testimonials";

interface Act4Props {
  onOpenBooking: () => void;
}

export default function StoryAct4_ClayFire({ onOpenBooking }: Act4Props) {
  const [activeVideo, setActiveVideo] = useState<Testimonial | null>(null);

  const afternoonCrafts = [
    {
      id: "pottery",
      title: "Clay Pottery on the Wheel",
      image: "/images/2.png",
      tag: "Sensory Craft",
      desc: "Sitting before the ancient wooden potter's flywheel. Wet clay slipping through palms. Guiding thumbs into the spinning center to raise a clay pot that each visitor takes home."
    },
    {
      id: "dung-cake",
      title: "Dung Cake Making & Chulha",
      image: "/images/1.png",
      tag: "Ancestral Energy",
      desc: "Kneading dried paddy straw into organic cattle by-products. Slapping circular cakes against drying stone walls—India's ancient biofuel for clean domestic firewood hearths."
    },
    {
      id: "tractor",
      title: "Open-Air Tractor Joyrides",
      image: "/images/24.png",
      tag: "Pure Celebration",
      desc: "Climbing into the trailer of the farmer's vehicle. Bumping along unpaved red mud farm borders as late-afternoon breezes blow across acres of green crops."
    }
  ];

  return (
    <section id="act4-clay" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#2b4c1c]/10">
      {/* Chapter Marker */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
        <div className="field-note-tag mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#a84724]" />
          Act IV • 03:30 PM • Fire, Clay & Twilight Joy
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#1a2713] tracking-tight">
          The joy of shaping the world <br />
          <span className="italic font-normal text-[#a84724]">with your own two hands.</span>
        </h2>

        <p className="mt-4 text-[#4a5840] text-base sm:text-lg font-light leading-relaxed">
          As the afternoon softens into golden Telangana dusk, the farm turns into a celebration of music, clay, and wind. The memory of this day stays long after the red mud is washed off.
        </p>
      </div>

      {/* Afternoon Craft Polaroid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {afternoonCrafts.map((craft) => (
          <div key={craft.id} className="polaroid-frame rounded-2xl flex flex-col justify-between">
            <div>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#e8ded0] mb-4">
                <img
                  src={craft.image}
                  alt={`${craft.title} - Traditional Rural Crafts at One Day Kisan Hyderabad`}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[10px] font-semibold text-[#a84724] uppercase tracking-wider">
                {craft.tag}
              </span>
              <h3 className="font-serif font-bold text-lg text-[#1e2917] mt-1">
                {craft.title}
              </h3>
              <p className="text-xs text-[#526048] font-light mt-2 leading-relaxed">
                {craft.desc}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#2b4c1c]/10 text-xs text-[#2b4c1c] font-medium">
              Included in every day pass
            </div>
          </div>
        ))}
      </div>

      {/* Testimonials Video Reel (Real Voices) */}
      <div className="rounded-3xl bg-[#ffffff] p-8 sm:p-12 border border-[#2b4c1c]/10 shadow-sm">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-mono text-[#a84724] uppercase tracking-wider">
            Voices from the Field
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1a2713] mt-1">
            Real Stories from Teachers, Parents & Teams
          </h3>
          <p className="text-xs text-[#526048] font-light mt-2">
            Watch unscripted video reflections captured at the end of a farm day.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {videoTestimonials.slice(0, 3).map((vid) => (
            <div
              key={vid.id}
              onClick={() => setActiveVideo(vid)}
              className="cursor-pointer group rounded-2xl overflow-hidden border border-[#2b4c1c]/15 hover:shadow-xl transition-all"
            >
              <div className="relative aspect-video bg-[#000]">
                <img
                  src={vid.thumbnail}
                  alt={vid.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#a84724] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 ml-0.5 fill-white" />
                  </div>
                </div>
              </div>
              <div className="p-4 bg-[#faf7f0]">
                <div className="flex items-center gap-1 text-[#d69129] mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#d69129]" />
                  ))}
                  <span className="text-[10px] text-[#8a5738] ml-1 font-mono">{vid.category}</span>
                </div>
                <h4 className="font-serif font-bold text-xs text-[#1e2917] line-clamp-2">
                  {vid.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
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
