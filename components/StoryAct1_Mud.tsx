"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, X, Sprout, CheckCircle2 } from "lucide-react";

interface Act1Props {
  onOpenBooking: () => void;
}

export default function StoryAct1_Mud({ onOpenBooking }: Act1Props) {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const modules = [
    {
      id: "paddy",
      title: "Paddy Sowing & Transplantation",
      time: "09:45 AM",
      image: "/images/21.webp",
      tag: "Botany & Soil Science",
      caption: "From seed bed to slush terrace",
      description: "Students stand calf-deep in organic mud. Local farmers demonstrate the precise thumb-and-forefinger technique to plant live rice saplings at regular 6-inch intervals, learning the grueling physical labour required to put white rice on an urban dinner plate.",
      syllabus: "Aligned with CBSE Class 6–10 Plant Nutrition & NCERT Agriculture Chapter"
    },
    {
      id: "ploughing",
      title: "Traditional Soil Ploughing",
      time: "10:15 AM",
      image: "/images/16.webp",
      tag: "Earth Mechanics",
      caption: "Breaking the hard crust",
      description: "Gripping the wooden plough handles. Understanding why compacted dry soil must be aerated, inverted, and pulverized before sowing can begin. A lesson in friction, soil density, and ancestral ergonomic design.",
      syllabus: "Physics of Simple Machines & Soil Aeration"
    },
    {
      id: "vermicompost",
      title: "Vermiculture & Earthworm Nursery",
      time: "10:45 AM",
      image: "/images/4.webp",
      tag: "Circular Biology",
      caption: "Nature's quiet engineers",
      description: "Touching live red wigglers (Eisenia fetida). Discovering why earthworms are called the farmer's best friend. Students analyze organic waste decomposition, pH balance, and bio-fertilizer production without synthetic chemicals.",
      syllabus: "Ecology, Food Chains & Sustainable Organic Chemistry"
    },
    {
      id: "scarecrow",
      title: "Community Scarecrow Crafting",
      time: "11:15 AM",
      image: "/images/5.webp",
      tag: "Traditional Ecology",
      caption: "Guarding the ripening crops",
      description: "Working in teams of four using dried paddy straw, bamboo stakes, and vintage dhotis to craft scarecrows. Learning how visual deterrents protect developing grain spikes from predatory birds without harmful pesticides.",
      syllabus: "Team Synergy, Non-Lethal Pest Management"
    }
  ];

  return (
    <section id="act1-mud" className="scroll-mt-24 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#2b4c1c]/10">
      {/* Chapter Marker */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2b4c1c]/10 text-[#2b4c1c] border border-[#2b4c1c]/20 text-xs font-mono uppercase tracking-widest mb-4">
          <Sprout className="w-3.5 h-3.5 text-[#2b4c1c]" />
          <span>Act I • 09:30 AM • Soil Awakening & Paddy Arena</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif font-black text-[#14230e] tracking-tight">
          The cold shock of earth <br />
          <span className="italic font-normal text-[#8a4724]">
            between bare toes.
          </span>
        </h2>

        <p className="mt-4 text-[#3d4f33] text-sm sm:text-base font-normal leading-relaxed">
          Clean school shoes are abandoned on the bund. Trousers are rolled past knees. In the first three minutes, there is nervous hesitation. By the fourth minute, they are grinning from ear to ear, submerged in the mud.
        </p>
      </div>

      {/* Module Grid (Editorial Polaroid Style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {modules.map((m) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={() => setActiveModal(m.id)}
            className="polaroid-frame rounded-2xl cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#e8e2d4] mb-3">
                <img
                  src={m.image}
                  alt={`${m.title} - Hands-on Agricultural Learning at One Day Kisan Hyderabad`}
                  width={500}
                  height={334}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#ffffff]/90 text-[10px] font-mono text-[#8a5738] font-semibold">
                  {m.time}
                </span>
              </div>

              <div className="px-1">
                <span className="text-[10px] font-semibold text-[#a84724] uppercase tracking-wider">
                  {m.tag}
                </span>
                <h3 className="font-serif font-bold text-base text-[#1e2917] mt-1 group-hover:text-[#2b4c1c] transition-colors">
                  {m.title}
                </h3>
                <p className="text-xs text-[#526048] font-light mt-1.5 line-clamp-2">
                  {m.description}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#2b4c1c]/10 flex items-center justify-between text-[11px] text-[#2b4c1c] px-1 font-medium">
              <span>Inspect Field Notes</span>
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
                const item = modules.find((x) => x.id === activeModal)!;
                return (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="field-note-tag">{item.tag}</span>
                      <span className="text-xs font-mono text-[#8a5738]">{item.time}</span>
                    </div>

                    <h3 className="text-2xl font-serif font-bold text-[#1e2917] mb-3">
                      {item.title}
                    </h3>

                    <div className="aspect-video rounded-xl overflow-hidden bg-[#e8ded0] mb-4">
                      <img src={item.image} alt={`${item.title} - One Day Kisan Educational Field Trip`} width={500} height={334} loading="lazy" className="w-full h-full object-cover" />
                    </div>

                    <p className="text-sm text-[#4a5840] leading-relaxed font-light mb-4">
                      {item.description}
                    </p>

                    <div className="p-3.5 rounded-xl bg-[#f7f2e8] text-xs text-[#2b4c1c] font-medium flex items-center gap-2 mb-6">
                      <CheckCircle2 className="w-4 h-4 text-[#a84724] flex-shrink-0" />
                      <span>{item.syllabus}</span>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[#2b4c1c]/10">
                      <span className="text-xs text-[#6e7d64]">Experience at Bhongir & Moinabad</span>
                      <button
                        onClick={() => {
                          setActiveModal(null);
                          onOpenBooking();
                        }}
                        className="px-5 py-2 rounded-full text-xs font-semibold text-white bg-[#2b4c1c] hover:bg-[#1e3614]"
                      >
                        Plan for My Batch →
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
