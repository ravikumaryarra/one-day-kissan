"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { activities, Activity } from "@/data/activities";
import { Sparkles, ArrowRight, X, Sprout, Droplets, Feather, PartyPopper } from "lucide-react";

interface ActivitiesExplorerProps {
  onSelectActivityForBooking: (title: string) => void;
}

export default function ActivitiesExplorer({ onSelectActivityForBooking }: ActivitiesExplorerProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const categories = [
    { key: "all", label: "All Activities", icon: <Sparkles className="w-3.5 h-3.5" /> },
    { key: "agriculture", label: "Farming & Soil", icon: <Sprout className="w-3.5 h-3.5" /> },
    { key: "heritage_tech", label: "Water & Machinery", icon: <Droplets className="w-3.5 h-3.5" /> },
    { key: "animals", label: "Animals & Birds", icon: <Feather className="w-3.5 h-3.5" /> },
    { key: "experiences", label: "Heritage & Joy", icon: <PartyPopper className="w-3.5 h-3.5" /> },
  ];

  const filteredActivities = activities.filter((act) => {
    if (activeCategory === "all") return true;
    return act.category === activeCategory;
  });

  return (
    <section id="activities" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs font-semibold tracking-wide uppercase text-emerald-400 mb-4"
        >
          <Sprout className="w-3.5 h-3.5" />
          Curriculum of the Earth • 24 Guided Modules
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight"
        >
          Hands-On Rural <br />
          <span className="text-gradient-earth">Experiences & Activities.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-4 text-stone-300 text-base sm:text-lg font-light leading-relaxed"
        >
          Each experience is designed to teach science, traditional wisdom, and environmental responsibility through sensory engagement.
        </motion.p>

        {/* Category Pills Slider */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full glass-panel max-w-2xl mx-auto border border-white/10">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-1.5 ${
                activeCategory === cat.key
                  ? "bg-gradient-to-r from-emerald-600 to-farm-700 text-white font-semibold shadow-md border border-white/20"
                  : "text-stone-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Activities Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
      >
        <AnimatePresence>
          {filteredActivities.map((act) => (
            <motion.div
              layout
              key={act.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              onClick={() => setSelectedActivity(act)}
              className="group cursor-pointer rounded-3xl glass-panel p-4 border border-white/10 hover:border-emerald-500/40 hover:bg-stone-900/60 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-[0_15px_40px_rgba(45,74,18,0.25)] relative overflow-hidden"
            >
              <div>
                {/* Image Area with Zoom */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-950/80 mb-4 border border-white/10">
                  <img
                    src={`/${act.img}`}
                    alt={`${act.title} - One Day Kisan Agricultural Activity Hyderabad`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-full glass-panel text-[10px] font-medium text-emerald-300 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    Inspect Details <ArrowRight className="w-2.5 h-2.5" />
                  </span>
                </div>

                {/* Title & Short Desc */}
                <h3 className="font-serif font-bold text-base text-white group-hover:text-emerald-300 transition-colors">
                  {act.title}
                </h3>
                <p className="mt-1.5 text-xs text-stone-300 font-light leading-relaxed line-clamp-2">
                  {act.short}
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-stone-400">
                <span className="capitalize font-medium text-emerald-400/80">
                  {act.category.replace("_", " ")}
                </span>
                <span className="text-stone-500 group-hover:text-stone-300 transition-colors">
                  Tap to learn →
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Activity Detail Modal (Apple visionOS floating sheet) */}
      <AnimatePresence>
        {selectedActivity && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedActivity(null)}
              className="absolute inset-0 bg-black/75 backdrop-blur-xl"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative z-10 w-full max-w-2xl rounded-3xl glass-panel p-6 sm:p-8 border border-white/20 shadow-2xl bg-stone-950/90 max-h-[90vh] overflow-y-auto text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedActivity(null)}
                className="absolute top-5 right-5 p-2 rounded-full glass-pill text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-full sm:w-56 aspect-square rounded-2xl overflow-hidden flex-shrink-0 bg-stone-900 border border-white/10">
                  <img
                    src={`/${selectedActivity.img}`}
                    alt={`${selectedActivity.title} - Experiential Activity at One Day Kisan`}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30 uppercase tracking-wider mb-2">
                    {selectedActivity.category.replace("_", " ")}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-white">
                    {selectedActivity.title}
                  </h3>
                  <p className="mt-3 text-sm text-stone-200 leading-relaxed font-light">
                    {selectedActivity.full}
                  </p>
                </div>
              </div>

              {/* Action Bar */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-stone-400">
                  Available for School Batches, Corporates & Families
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      const title = selectedActivity.title;
                      setSelectedActivity(null);
                      onSelectActivityForBooking(title);
                    }}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-emerald-600 to-farm-700 hover:from-emerald-500 hover:to-farm-600 shadow-lg transition-all"
                  >
                    Include in Visit Plan →
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
