"use client";

import React from "react";
import { motion } from "framer-motion";
import { Compass, Sparkles, MapPin, ArrowDown, Calendar } from "lucide-react";

interface StoryPrologueProps {
  onOpenBooking: () => void;
}

export default function StoryPrologue({ onOpenBooking }: StoryPrologueProps) {
  return (
    <section id="prologue" className="relative pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      {/* Background Subtle Sun Dapple */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#f0e3cc]/50 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Prologue Stamp */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="field-note-tag mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#a84724]" />
          Prologue • The Nostalgic Memory
        </motion.div>

        {/* Monumental Editorial Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl font-serif font-black tracking-tight text-[#14230e] leading-[1.08]"
        >
          Give your children <br />
          <span className="italic font-normal text-[#8a4724]">
            the childhood you had.
          </span>
        </motion.h1>

        {/* Agricultural Highlights Bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs"
        >
          <span className="px-3.5 py-1.5 rounded-full bg-[#2b4c1c]/10 text-[#2b4c1c] font-medium border border-[#2b4c1c]/20 flex items-center gap-1.5 shadow-2xs">
            <span>🌱</span> 24 Hands-On Farm Modules
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-[#8a4724]/10 text-[#8a4724] font-medium border border-[#8a4724]/20 flex items-center gap-1.5 shadow-2xs">
            <span>📍</span> 2 Campuses: Bhongir & Moinabad
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-[#2b4c1c]/10 text-[#2b4c1c] font-medium border border-[#2b4c1c]/20 flex items-center gap-1.5 shadow-2xs">
            <span>⭐</span> 4.8★ Rating (664+ Google Reviews)
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-[#8a4724]/10 text-[#8a4724] font-medium border border-[#8a4724]/20 flex items-center gap-1.5 shadow-2xs">
            <span>🎓</span> 350+ Trusted Schools
          </span>
        </motion.div>

        {/* The Nostalgic Hook */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-6 text-[#3d4f33] text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto"
        >
          Before iPads, coaching classes, and high-rise balconies, childhood smelled like wet red earth after the first rain, tasted like raw sugarcane, and ended only when the village sun went down.
        </motion.p>
      </div>

      {/* Editorial Split: The Story & Authentic Visuals */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left: The Narrative Essay */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 space-y-6 text-[#2f3d26] text-base leading-relaxed font-light"
        >
          <div className="p-8 rounded-3xl bg-[#ffffff] border border-[#2b4c1c]/10 shadow-[0_10px_35px_rgba(50,40,20,0.04)] relative">
            <span className="text-4xl font-serif text-[#a84724] float-left mr-3 -mt-2 leading-none">
              T
            </span>
            <p>
              oday, an urban child in Hyderabad spends over six hours a day looking into glass screens. They can pass a botany exam without ever touching the silky roots of a rice sapling. They know the price of groceries, but have never heard the rhythmic wooden groaning of a Persian wheel lifting life-giving water from a deep stone well.
            </p>

            <p className="mt-4">
              <strong>One Day Kisan is not a resort or a sterile amusement park.</strong> It is fifteen acres of living, breathing Telangana farmland—two lush campuses at <strong>Bhongir</strong> and <strong>Moinabad</strong>—where children take off their sneakers, roll up their sleeves, and discover how humanity actually survives.
            </p>

            {/* Travel Footnote */}
            <div className="mt-6 pt-5 border-t border-[#2b4c1c]/10 flex flex-wrap items-center justify-between gap-3 text-xs text-[#6e7d64]">
              <span className="flex items-center gap-1.5 font-medium text-[#2b4c1c]">
                <MapPin className="w-3.5 h-3.5 text-[#a84724]" />
                45 mins from Hyderabad (ORR Access)
              </span>
              <span>Open for Schools, Corporates & Families</span>
            </div>
          </div>

          {/* Action Buttons with Natural Agrarian Colors */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <a
              href="#tour360"
              className="px-6 py-3.5 rounded-full text-xs font-semibold text-white bg-[#2b4c1c] hover:bg-[#1e3613] shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Compass className="w-4 h-4 text-white/80 animate-spin" style={{ animationDuration: "12s" }} />
              <span>Explore 360° Farm Tour</span>
            </a>

            <a
              href="#directions"
              className="px-6 py-3.5 rounded-full text-xs font-semibold text-[#14230e] bg-white border border-[#2b4c1c]/20 hover:bg-[#2b4c1c]/5 transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              <MapPin className="w-4 h-4 text-[#8a4724]" />
              <span>Get Directions</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="px-6 py-3.5 rounded-full text-xs font-semibold text-[#8a4724] bg-[#8a4724]/10 hover:bg-[#8a4724]/15 border border-[#8a4724]/25 transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-[#8a4724]" />
              <span>Plan a Visit</span>
            </button>
          </div>
        </motion.div>

        {/* Right: The Field Polaroid Composition */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-6 relative flex flex-col items-center"
        >
          {/* Main Polaroid */}
          <div className="polaroid-frame rounded-2xl max-w-md w-full -rotate-1 relative z-10">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#e8ded0]">
              <img
                src="/gallery/gallery-01.webp"
                alt="School children experiencing barefoot paddy transplantation in mud at One Day Kisan farm near Hyderabad"
                width={600}
                height={450}
                fetchPriority="high"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-3 flex items-center justify-between px-1">
              <span className="font-serif italic text-sm text-[#4a5840]">
                &ldquo;They hesitated for 3 minutes. Then they refused to leave the mud.&rdquo;
              </span>
              <span className="text-[10px] font-mono text-[#8a5738] uppercase">
                Field Photo #04
              </span>
            </div>
          </div>

          {/* Secondary Layered Polaroid */}
          <div className="polaroid-frame rounded-2xl max-w-xs w-full rotate-3 absolute -bottom-10 -right-4 hidden sm:block z-20">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#e8ded0]">
              <img
                src="/gallery/gallery-06.webp"
                alt="Persian wheel (Rahat) hydraulic irrigation working demonstration at One Day Kisan Bhongir"
                width={400}
                height={300}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-2 text-right px-1">
              <span className="text-[10px] font-mono text-[#8a5738]">
                Bhongir Farm • Morning Batch
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
