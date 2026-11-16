"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Feather, HeartHandshake, Utensils, ArrowRight, X, CheckCircle2 } from "lucide-react";

interface Act3Props {
  onOpenBooking: () => void;
}

export default function StoryAct3_Kinship({ onOpenBooking }: Act3Props) {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const animalKinship = [
    {
      id: "aviary",
      title: "The Walk-In Birds Aviary",
      time: "01:30 PM",
      image: "/images/23.png",
      tag: "Avian Ethology",
      quote: "When a wild bird chooses to land on your palm",
      description: "An enclosed walk-through sanctuary. Children learn stillness and calm as parakeets, lovebirds, and doves flutter down to feed seeds directly from their outstretched hands. An instant lesson in quiet patience and animal trust.",
      syllabus: "Avian Anatomy, Nesting Patterns, Feathers & Bird Diversity"
    },
    {
      id: "dairy",
      title: "Desi Gir & Indigenous Cattle",
      time: "02:00 PM",
      image: "/images/18.png",
      tag: "Living Heritage",
      quote: "Understanding the ancient mother of Indian agriculture",
      description: "Getting up close with indigenous Gir and Sahiwal cows. Students stroke the distinctive dorsal hump, hand-feed green organic fodder, observe milking, and learn why A2 beta-casein protein is biologically superior for human health.",
      syllabus: "Dairy Science, Indigenous Breeds (Bos indicus) & A1 vs A2 Beta-Casein Genetics"
    },
    {
      id: "lunch",
      title: "The Traditional Farm Feast",
      time: "02:30 PM",
      image: "/images/1.png",
      tag: "Nourishment",
      quote: "Hot food cooked over earthen hearths with pure farm water",
      description: "Under shady neem canopies, students and visitors sit down to a wholesome, steaming Telangana rural buffet: authentic Dal, freshly harvested seasonal vegetables, fragrant rice, crisp papads, and buttermilk. Zero preservatives.",
      syllabus: "Culinary Heritage, Earthen Hearth (Chulha) & Slow Food Nutrition"
    }
  ];

  return (
    <section id="act3-kinship" className="scroll-mt-24 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#2b4c1c]/10">
      {/* Chapter Marker */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8a4724]/10 text-[#8a4724] border border-[#8a4724]/20 text-xs font-mono uppercase tracking-widest mb-4">
          <HeartHandshake className="w-3.5 h-3.5 text-[#8a4724]" />
          <span>Act III • 01:30 PM • Animal Kinship, Birds & Farm Feast</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif font-black text-[#14230e] tracking-tight">
          Where milk is a living gift, <br />
          <span className="italic font-normal text-[#8a4724]">
            not a supermarket barcode.
          </span>
        </h2>

        <p className="mt-4 text-[#3d4f33] text-sm sm:text-base font-normal leading-relaxed">
          In an era where children interact through glass touchscreens, touching the warm coat of a Desi calf and feeling gentle birds alight on their fingers awakens something ancient and kind.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {animalKinship.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={() => setActiveModal(item.id)}
            className="polaroid-frame rounded-2xl cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#e8ded0] mb-4">
                <img
                  src={item.image}
                  alt={`${item.title} - Animal Care & Aviary Experience at One Day Kisan`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#ffffff]/90 text-[10px] font-mono text-[#a84724] font-semibold">
                  {item.time}
                </span>
              </div>

              <div className="px-1">
                <span className="text-[10px] font-semibold text-[#a84724] uppercase tracking-wider">
                  {item.tag}
                </span>
                <h3 className="font-serif font-bold text-lg text-[#1e2917] mt-1 group-hover:text-[#2b4c1c] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#526048] font-light mt-2 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#2b4c1c]/10 flex items-center justify-between text-xs text-[#2b4c1c] px-1 font-medium">
              <span>Read Journal Entry</span>
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
                const item = animalKinship.find((x) => x.id === activeModal)!;
                return (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="field-note-tag">{item.tag}</span>
                      <span className="text-xs font-mono text-[#a84724]">{item.time}</span>
                    </div>

                    <h3 className="text-2xl font-serif font-bold text-[#1e2917] mb-2">
                      {item.title}
                    </h3>
                    <p className="italic text-xs text-[#8a5738] mb-3">{item.quote}</p>

                    <div className="aspect-video rounded-xl overflow-hidden bg-[#e8ded0] mb-4">
                      <img src={item.image} alt={`${item.title} - One Day Kisan Educational Animal Husbandry`} className="w-full h-full object-cover" />
                    </div>

                    <p className="text-sm text-[#4a5840] leading-relaxed font-light mb-4">
                      {item.description}
                    </p>

                    <div className="p-3.5 rounded-xl bg-[#f7f2e8] text-xs text-[#2b4c1c] font-medium flex items-center gap-2 mb-6">
                      <CheckCircle2 className="w-4 h-4 text-[#a84724] flex-shrink-0" />
                      <span>{item.syllabus}</span>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[#2b4c1c]/10">
                      <span className="text-xs text-[#6e7d64]">Featured at Moinabad & Bhongir Farms</span>
                      <button
                        onClick={() => {
                          setActiveModal(null);
                          onOpenBooking();
                        }}
                        className="px-5 py-2 rounded-full text-xs font-semibold text-white bg-[#2b4c1c] hover:bg-[#1e3614]"
                      >
                        Reserve Visit →
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
