"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Droplets, ArrowRight, X, CheckCircle2 } from "lucide-react";

interface Act2Props {
  onOpenBooking: () => void;
}

export default function StoryAct2_Water({ onOpenBooking }: Act2Props) {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const waterInventions = [
    {
      id: "persian-wheel",
      title: "The Persian Wheel (Rahat)",
      time: "11:30 AM",
      image: "/images/7.png",
      tag: "Hydraulic Mechanics",
      quote: "Circular gear torque converted to vertical water lift",
      description: "A monumental wooden gear apparatus dating back over 1,500 years. As the bullock-arm pivots horizontally, crown gears translate rotary motion into a vertical chain of metal buckets descending into the deep well and tipping cool water into the stone flume.",
      curriculum: "Gear Ratios, Torque Transfer, Centrifugal Dynamics & History of Agriculture"
    },
    {
      id: "archimedes",
      title: "Archimedes Screw Lift",
      time: "12:00 PM",
      image: "/images/8.png",
      tag: "Fluid Dynamics",
      quote: "Defying gravity with a rotating helical cylinder",
      description: "Students physically crank the sealed helix cylinder. Watching trapped pockets of water travel upward against gravity as the helical spiral rotates. A profound visceral demonstration that engineering is about geometry, not just batteries.",
      curriculum: "Helical Geometry, Positive Displacement & Ancient Irrigation Innovations"
    },
    {
      id: "mota-bavi",
      title: "Mota Bavi & Vintage Stone Well",
      time: "12:20 PM",
      image: "/images/11.png",
      tag: "Civil Architecture",
      quote: "The heart of every Telangana village settlement",
      description: "Hand-chiseled granite blocks descending 40 feet into the groundwater table. Demonstrating the ancient leather-bucket 'Mota' pulley system. Students feel the immense weight of 50 litres of water and understand why water was worshipped as sacred.",
      curriculum: "Aquifers, Groundwater Recharge & Heritage Stone Masonry"
    },
    {
      id: "dam-reservoir",
      title: "Working Dam & Canal Model",
      time: "12:45 PM",
      image: "/images/6.png",
      tag: "Hydro-Electric Science",
      quote: "Controlling monsoon run-off for 12 months of harvests",
      description: "A scale working model of a multi-gate reservoir. Students operate miniature sluice gates, observe hydrostatic water pressure, watch turbine fins spin under hydraulic head pressure, and trace canal distribution networks into terrace fields.",
      curriculum: "Potential to Kinetic Energy, Sluice Gate Hydraulics & Basin Planning"
    }
  ];

  return (
    <section id="act2-water" className="scroll-mt-24 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#2b4c1c]/10">
      {/* Chapter Marker */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2b4c1c]/10 text-[#2b4c1c] border border-[#2b4c1c]/20 text-xs font-mono uppercase tracking-widest mb-4">
          <Droplets className="w-3.5 h-3.5 text-[#2b4c1c]" />
          <span>Act II • 11:30 AM • Ancient Water Hydraulics & Wells</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif font-black text-[#14230e] tracking-tight">
          Long before electricity, <br />
          <span className="italic font-normal text-[#8a4724]">
            our ancestors built poetry out of wood.
          </span>
        </h2>

        <p className="mt-4 text-[#3d4f33] text-sm sm:text-base font-normal leading-relaxed">
          In a city apartment, water is a plastic tap turned without thought. Here, under the Telangana sun, children witness the gears, screws, and deep wells that kept civilizations alive for centuries.
        </p>
      </div>

      {/* Grid of Water Engineering */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {waterInventions.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={() => setActiveModal(item.id)}
            className="polaroid-frame rounded-2xl cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#e8ded0] mb-3">
                <img
                  src={item.image}
                  alt={`${item.title} - Ancient Hydraulic Irrigation Demonstration at One Day Kisan`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#ffffff]/90 text-[10px] font-mono text-[#2b4c1c] font-semibold">
                  {item.time}
                </span>
              </div>

              <div className="px-1">
                <span className="text-[10px] font-semibold text-[#2b4c1c] uppercase tracking-wider">
                  {item.tag}
                </span>
                <h3 className="font-serif font-bold text-base text-[#1e2917] mt-1 group-hover:text-[#2b4c1c] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#526048] font-light mt-1.5 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#2b4c1c]/10 flex items-center justify-between text-[11px] text-[#2b4c1c] px-1 font-medium">
              <span>Inspect Mechanics</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl rounded-3xl bg-[#ffffff] p-6 sm:p-8 shadow-2xl border border-[#2b4c1c]/15 text-left"
            >
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#f3ede2] text-[#4a5840]"
              >
                <X className="w-5 h-5" />
              </button>

              {(() => {
                const item = waterInventions.find((x) => x.id === activeModal)!;
                return (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="field-note-tag">{item.tag}</span>
                      <span className="text-xs font-mono text-[#2b4c1c]">{item.time}</span>
                    </div>

                    <h3 className="text-2xl font-serif font-bold text-[#1e2917] mb-2">
                      {item.title}
                    </h3>
                    <p className="italic text-xs text-[#8a5738] mb-3">{item.quote}</p>

                    <div className="aspect-video rounded-xl overflow-hidden bg-[#e8ded0] mb-4">
                      <img src={item.image} alt={`${item.title} - Working Model at One Day Kisan`} className="w-full h-full object-cover" />
                    </div>

                    <p className="text-sm text-[#4a5840] leading-relaxed font-light mb-4">
                      {item.description}
                    </p>

                    <div className="p-3.5 rounded-xl bg-[#f7f2e8] text-xs text-[#2b4c1c] font-medium flex items-center gap-2 mb-6">
                      <CheckCircle2 className="w-4 h-4 text-[#2b4c1c] flex-shrink-0" />
                      <span>{item.curriculum}</span>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[#2b4c1c]/10">
                      <span className="text-xs text-[#6e7d64]">Featured at Bhongir Main Farm</span>
                      <button
                        onClick={() => {
                          setActiveModal(null);
                          onOpenBooking();
                        }}
                        className="px-5 py-2 rounded-full text-xs font-semibold text-white bg-[#2b4c1c] hover:bg-[#1e3614]"
                      >
                        Plan Educational Tour →
                      </button>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
