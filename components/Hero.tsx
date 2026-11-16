"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Compass, Calendar, ArrowRight, ShieldCheck, Users, TreePine, MapPin } from "lucide-react";

interface HeroProps {
  onOpenBooking: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  return (
    <section className="relative min-h-[95vh] pt-36 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center overflow-hidden">
      {/* Ambient Radial Glows (Apple dark mode aesthetic) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[350px] bg-amber-600/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* Hero Content Container */}
      <div className="max-w-5xl mx-auto flex flex-col items-center z-10">
        {/* Apple Style Top Tag Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs font-semibold tracking-wide text-emerald-300 border border-emerald-500/30 mb-6 shadow-lg"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          India&apos;s First Farm-Based Edutainment Destination
        </motion.div>

        {/* Monumental Headline with Apple Iridescent Text Effect */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl font-serif font-black tracking-tight text-white max-w-4xl leading-[1.08]"
        >
          Experience Life. <br />
          <span className="text-gradient-earth">Learn Real Farming.</span>
        </motion.h1>

        {/* Grounded Human Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-6 text-stone-300 text-base sm:text-xl font-light max-w-2xl leading-relaxed"
        >
          Step away from screens into hands-on soil ploughing, working Persian wheels, paddy mud transplantation, and exotic birds. Two lush destinations near Hyderabad.
        </motion.p>

        {/* Farm Location Badges */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-stone-300 font-medium"
        >
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill border-white/10">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>Bhongir Farm (Warangal Hwy)</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill border-white/10">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Moinabad Farm (Kapil Agro)</span>
          </div>
        </motion.div>

        {/* Action Buttons (Apple Style Pill Transitions) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <a
            href="#tour360"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-semibold text-white bg-[#2b4c1c] hover:bg-[#1e3614] shadow-[0_10px_35px_rgba(43,76,28,0.5)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2.5 specular-border group"
          >
            <Compass className="w-4 h-4 text-emerald-200 group-hover:rotate-45 transition-transform" />
            <span>Explore 360° Farm Tour</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white font-normal">
              Interactive
            </span>
          </a>

          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full text-sm font-semibold text-stone-200 glass-pill hover:text-white hover:border-white/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>Schedule Visit / Inquire</span>
            <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
          </button>
        </motion.div>
      </div>

      {/* Apple-style Bento Metric Bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.55 }}
        className="mt-20 w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-left"
      >
        <div className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-white/20 transition-all">
          <div className="flex items-center gap-2 text-emerald-400 mb-1">
            <TreePine className="w-4 h-4" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">Expansive Land</span>
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-white">15+ Acres</div>
          <p className="text-xs text-stone-400 mt-1">Across 2 scenic Telangana farm campuses</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-white/20 transition-all">
          <div className="flex items-center gap-2 text-amber-400 mb-1">
            <Sparkles className="w-4 h-4" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">Curriculum Aligned</span>
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-white">24+ Activities</div>
          <p className="text-xs text-stone-400 mt-1">Paddy, hydraulic engineering, aviary & pottery</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-white/20 transition-all">
          <div className="flex items-center gap-2 text-emerald-400 mb-1">
            <Users className="w-4 h-4" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">Trusted By</span>
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-white">50,000+</div>
          <p className="text-xs text-stone-400 mt-1">Students, teachers & corporate teams hosted</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-white/20 transition-all">
          <div className="flex items-center gap-2 text-sky-400 mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">Safety First</span>
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-white">100% Safe</div>
          <p className="text-xs text-stone-400 mt-1">Trained agrarian guides & sanitised facilities</p>
        </div>
      </motion.div>
    </section>
  );
}
