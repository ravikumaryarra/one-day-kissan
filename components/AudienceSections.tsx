"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Briefcase, Users, CheckCircle, ArrowRight, Shield, Award, Utensils } from "lucide-react";

interface AudienceSectionsProps {
  onOpenBooking: () => void;
}

export default function AudienceSections({ onOpenBooking }: AudienceSectionsProps) {
  const [activeTab, setActiveTab] = useState<"schools" | "corporates" | "families">("schools");

  const tabs = [
    { key: "schools" as const, label: "Schools & Colleges", icon: <GraduationCap className="w-4 h-4" /> },
    { key: "corporates" as const, label: "Corporates & Teams", icon: <Briefcase className="w-4 h-4" /> },
    { key: "families" as const, label: "Families & Weekend Passes", icon: <Users className="w-4 h-4" /> },
  ];

  return (
    <section id="audiences" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs font-semibold tracking-wide uppercase text-emerald-400 mb-4"
        >
          <Award className="w-3.5 h-3.5" />
          Tailored Programs
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight"
        >
          Curated Experiences for <br />
          <span className="text-gradient-earth">Every Type of Gathering.</span>
        </motion.h2>

        {/* Tab Selector */}
        <div className="mt-8 inline-flex p-1.5 rounded-full glass-panel border border-white/10 relative shadow-xl">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative z-10 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                activeTab === tab.key ? "text-white font-semibold" : "text-stone-400 hover:text-white"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content Cards */}
      <div className="max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === "schools" && (
            <motion.div
              key="schools"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl glass-panel p-8 sm:p-12 border border-white/15 relative overflow-hidden shadow-2xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-medium border border-emerald-500/30 inline-block mb-4">
                    K-12 & Higher Education Programs
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-4">
                    India&apos;s Most Structured Agricultural Field Trip
                  </h3>
                  <p className="text-stone-300 text-sm leading-relaxed font-light mb-6">
                    Designed in alignment with NCERT, CBSE, and ICSE environmental sciences. Students don&apos;t just observe—they practice paddy transplantation, understand water conservation through functional hydraulic models, and study organic composting.
                  </p>

                  <div className="space-y-3">
                    {[
                      "Dedicated agrarian guide for every 25 students",
                      "Full safety perimeter, clean washrooms & fresh change rooms",
                      "Free admission for accompanying teachers & bus drivers",
                      "Wholesome, hot farm-cooked lunch prepared hygienically",
                      "Pre-trip teacher guide and post-trip activity worksheets"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-stone-200">
                        <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex items-center gap-4">
                    <button
                      onClick={onOpenBooking}
                      className="px-7 py-3 rounded-full text-xs font-semibold text-white bg-[#2b4c1c] hover:bg-[#1e3614] shadow-md flex items-center gap-2"
                    >
                      Request School Visit Proposal <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-stone-900 border border-white/10 shadow-2xl">
                  <img
                    src="/gallery/gallery-01.webp"
                    alt="School trip at One Day Kisan"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                    <div className="text-white text-xs">
                      <div className="font-semibold text-sm">Over 350+ Leading Schools</div>
                      <div className="text-stone-300">DPS, Oakridge, Hyderabad Public School, Chirec & more</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "corporates" && (
            <motion.div
              key="corporates"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl glass-panel p-8 sm:p-12 border border-white/15 relative overflow-hidden shadow-2xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-medium border border-amber-500/30 inline-block mb-4">
                    Corporate Offsites & Leadership Retreats
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-4">
                    Trade Conference Rooms for Countryside Camaraderie
                  </h3>
                  <p className="text-stone-300 text-sm leading-relaxed font-light mb-6">
                    Unplug your team from Slack, emails, and sprint cycles. Engage in collaborative farm tasks: group ploughing contests, pottery sculpting, village sports, tractor rides, and sunset DJ sessions.
                  </p>

                  <div className="space-y-3">
                    {[
                      "Customizable team-building challenges & obstacle relays",
                      "Lush outdoor meeting spaces with shaded canopies",
                      "Traditional village banquets (Telangana rustic buffet)",
                      "High-energy DJ sound system & evening bonfire arena",
                      "Close proximity: 35-50 minutes from HITEC City & Secunderabad"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-stone-200">
                        <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex items-center gap-4">
                    <button
                      onClick={onOpenBooking}
                      className="px-7 py-3 rounded-full text-xs font-semibold text-white bg-[#8a4724] hover:bg-[#743a1c] shadow-md flex items-center gap-2"
                    >
                      Book Corporate Outing Package <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-stone-900 border border-white/10 shadow-2xl">
                  <img
                    src="/gallery/gallery-04.webp"
                    alt="Corporate outing at One Day Kisan"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                    <div className="text-white text-xs">
                      <div className="font-semibold text-sm">Teams from TCS, Infosys, Deloitte & Startups</div>
                      <div className="text-stone-300">Custom group sizing from 20 to 500+ participants</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "families" && (
            <motion.div
              key="families"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl glass-panel p-8 sm:p-12 border border-white/15 relative overflow-hidden shadow-2xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="px-3.5 py-1 rounded-full bg-[#8a4724]/20 text-[#f5d0b5] text-xs font-medium border border-[#8a4724]/30 inline-block mb-4">
                    Weekend Day Passes & Family Picnics
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-4">
                    A Meaningful Day Out for Children & Grandparents
                  </h3>
                  <p className="text-stone-300 text-sm leading-relaxed font-light mb-6">
                    Give your children the authentic childhood you had. Introduce them to friendly animals, let grandparents reminisce about village life, and enjoy clean farm food cooked over traditional wood-fire hearths.
                  </p>

                  <div className="space-y-3">
                    {[
                      "Full day access to all 24 hands-on farm activities",
                      "Walk-in aviary interaction & domestic cattle feeding",
                      "Clay pottery wheel workshop—take your pot home!",
                      "Tractor ride across the farm crops & watch tower climb",
                      "Hygienic traditional buffet included in all day-pass options"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-stone-200">
                        <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex items-center gap-4">
                    <button
                      onClick={onOpenBooking}
                      className="px-7 py-3 rounded-full text-xs font-semibold text-white bg-[#2b4c1c] hover:bg-[#1e3614] shadow-md flex items-center gap-2"
                    >
                      Reserve Family Weekend Pass <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-stone-900 border border-white/10 shadow-2xl">
                  <img
                    src="/gallery/gallery-02.webp"
                    alt="Family day at One Day Kisan"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                    <div className="text-white text-xs">
                      <div className="font-semibold text-sm">Perfect Weekend Getaway from Hyderabad</div>
                      <div className="text-stone-300">Open Saturdays, Sundays & Public Holidays</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
