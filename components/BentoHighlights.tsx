"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, GraduationCap, Heart, Droplets, Feather, ShieldCheck } from "lucide-react";

export default function BentoHighlights() {
  return (
    <section id="highlights" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs font-semibold tracking-wide uppercase text-amber-400 mb-4"
        >
          <GraduationCap className="w-3.5 h-3.5" />
          Experiential Learning • Field Trips Matter
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight"
        >
          Why Real Field Trips <br />
          <span className="text-gradient-earth">Beat Screen-Based Classrooms.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-4 text-stone-300 text-base sm:text-lg font-light leading-relaxed"
        >
          Textbooks explain photosynthesis and irrigation—One Day Kisan puts the seeds in their hands and the water pump at their feet.
        </motion.p>
      </div>

      {/* Apple-style Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Large Feature Card: Hands-on Mud & Paddy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:col-span-2 lg:col-span-2 rounded-3xl glass-panel p-8 sm:p-10 border border-white/10 relative overflow-hidden flex flex-col justify-between group hover:border-white/20 transition-all"
        >
          <div className="relative z-10">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-medium border border-emerald-500/30 inline-block mb-4">
              Tactile Farming
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3">
              Barefoot in the Mud: Paddy Transplantation
            </h3>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
              Children roll up their pants, step into the knee-deep mud field, and transplant live rice saplings. They smell the earth, feel the roots, and understand firsthand the sweat behind every bowl of rice on their dining table.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-stone-400">
            <span>Aligned with CBSE & ICSE Botany</span>
            <span className="font-semibold text-emerald-400">100% Mud Safe & Wash Facilities</span>
          </div>

          {/* Background Ambient Glow */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-600/20 transition-all duration-500" />
        </motion.div>

        {/* Feature Card 2: Ancient Water Systems */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-3xl glass-panel p-8 border border-white/10 relative overflow-hidden flex flex-col justify-between group hover:border-white/20 transition-all"
        >
          <div>
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-5 border border-amber-500/30">
              <Droplets className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-serif font-bold text-white mb-2">
              Hydraulic Heritage
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-light">
              See the Persian Wheel rotate, crank the Archimedes screw, and observe the working Dam Reservoir generating clean kinetic energy.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-amber-300 font-medium">
            Physics in the Real World
          </div>
        </motion.div>

        {/* Feature Card 3: Aviary & Animals */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-3xl glass-panel p-8 border border-white/10 relative overflow-hidden flex flex-col justify-between group hover:border-white/20 transition-all"
        >
          <div>
            <div className="w-10 h-10 rounded-2xl bg-pink-500/20 text-pink-400 flex items-center justify-center mb-5 border border-pink-500/30">
              <Feather className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-serif font-bold text-white mb-2">
              Walk-In Aviary & Dairy
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-light">
              Step into the bird sanctuary where friendly parakeets and doves perch gently. Learn about Gir cows, natural fodder, and A1 vs A2 milk nutrition.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-pink-300 font-medium">
            Empathy & Animal Care
          </div>
        </motion.div>

        {/* Feature Card 4: Soil Science / Vermicompost */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="rounded-3xl glass-panel p-8 border border-white/10 relative overflow-hidden flex flex-col justify-between group hover:border-white/20 transition-all"
        >
          <div>
            <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center mb-5 border border-teal-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-serif font-bold text-white mb-2">
              Vermiculture & Compost
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-light">
              Meet nature&apos;s underground heroes: earthworms converting organic farm greens into nutrient-rich compost without synthetic chemicals.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-teal-300 font-medium">
            Zero-Waste Circular Living
          </div>
        </motion.div>

        {/* Feature Card 5: Safe & Managed */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="md:col-span-2 lg:col-span-3 rounded-3xl glass-panel p-8 border border-white/10 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6 group hover:border-white/20 transition-all"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 border border-emerald-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-white mb-1">
                Zero Worries for Teachers & Parents
              </h3>
              <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed max-w-xl">
                Dedicated trained farm coordinators guide each student batch. Clean washrooms, running showers, pure RO drinking water, doctor-on-call, and enclosed bus parking.
              </p>
            </div>
          </div>

          <a
            href="#audiences"
            className="px-6 py-2.5 rounded-full glass-pill text-xs font-semibold text-emerald-300 hover:text-white border-emerald-500/30 whitespace-nowrap flex-shrink-0"
          >
            Review Safety & Packages →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
