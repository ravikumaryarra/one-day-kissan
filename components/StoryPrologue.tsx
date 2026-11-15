"use client";

import React from "react";
import { motion } from "framer-motion";
import { Compass, Sparkles, MapPin, ArrowDown, Calendar } from "lucide-react";

interface StoryPrologueProps {
  onOpenBooking: () => void;
}

export default function StoryPrologue({ onOpenBooking }: StoryPrologueProps) {
  return (
    <section id="prologue" className="relative pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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
          className="text-4xl sm:text-6xl md:text-7xl font-serif font-black tracking-tight text-[#1a2713] leading-[1.08]"
        >
          Give your children <br />
          <span className="italic font-normal text-[#a84724]">the childhood you had.</span>
        </motion.h1>

        {/* The Nostalgic Hook */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-6 text-[#4a5840] text-lg sm:text-xl font-light leading-relaxed max-w-2xl mx-auto"
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

          {/* Action Navigation */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#act1-mud"
              className="px-6 py-3 rounded-full text-xs font-semibold text-white bg-[#2b4c1c] hover:bg-[#1e3614] shadow-md transition-all flex items-center gap-2"
            >
              <span>Walk Through the Day</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </a>

            <a
              href="#tour360"
              className="px-6 py-3 rounded-full text-xs font-semibold text-[#2b4c1c] bg-[#ffffff] border border-[#2b4c1c]/20 hover:bg-[#f3ede2] transition-all flex items-center gap-2 shadow-sm"
            >
              <Compass className="w-3.5 h-3.5 text-[#a84724]" />
              <span>Step Inside 360° Horizon</span>
            </a>
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
