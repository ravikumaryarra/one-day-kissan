"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs, FAQItem } from "@/data/faqs";
import { HelpCircle, Plus, Minus, MapPin, Navigation } from "lucide-react";
import { farmsData } from "@/data/farms";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Locations Banner: Apple Dual Bento */}
      <div className="mb-20">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs font-semibold tracking-wide uppercase text-emerald-400 mb-3">
            <MapPin className="w-3.5 h-3.5" />
            Two Accessible Farm Destinations
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            Visit One Day Kisan Near Hyderabad
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Farm 1: Bhongir */}
          <div className="rounded-3xl glass-panel p-8 border border-white/10 hover:border-emerald-500/30 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                  Flagship Destination
                </span>
                <span className="text-xs text-stone-400 font-mono">
                  {farmsData.bhongir.travelTime}
                </span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-white mb-2">
                {farmsData.bhongir.name}
              </h3>
              <p className="text-xs text-emerald-400 font-medium mb-3">
                {farmsData.bhongir.highway}
              </p>
              <p className="text-sm text-stone-300 leading-relaxed font-light mb-6">
                {farmsData.bhongir.address}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <a
                href={farmsData.bhongir.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1.5"
              >
                <Navigation className="w-3.5 h-3.5" />
                Open in Google Maps →
              </a>
              <a
                href="#tour360"
                className="text-xs text-stone-400 hover:text-white"
              >
                View 360° Panorama
              </a>
            </div>
          </div>

          {/* Farm 2: Moinabad */}
          <div className="rounded-3xl glass-panel p-8 border border-white/10 hover:border-amber-500/30 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
                  Agro-Sanctuary Branch
                </span>
                <span className="text-xs text-stone-400 font-mono">
                  {farmsData.moinabad.travelTime}
                </span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-white mb-2">
                {farmsData.moinabad.name}
              </h3>
              <p className="text-xs text-amber-400 font-medium mb-3">
                {farmsData.moinabad.highway}
              </p>
              <p className="text-sm text-stone-300 leading-relaxed font-light mb-6">
                {farmsData.moinabad.address}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <a
                href={farmsData.moinabad.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1.5"
              >
                <Navigation className="w-3.5 h-3.5" />
                Open in Google Maps →
              </a>
              <a
                href="#tour360"
                className="text-xs text-stone-400 hover:text-white"
              >
                View 360° Panorama
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs font-semibold tracking-wide uppercase text-emerald-400 mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            Got Questions?
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Frequently Asked <br />
            <span className="text-gradient-earth">Questions.</span>
          </h2>
          <p className="mt-4 text-stone-300 text-sm sm:text-base font-light leading-relaxed">
            Everything you need to know before booking your educational field trip or family weekend outing. Have a custom query? Call our desk anytime.
          </p>

          <div className="mt-8 p-6 rounded-2xl glass-panel border border-white/10">
            <h4 className="font-serif font-bold text-white text-base">Direct Hotline & WhatsApp</h4>
            <p className="text-xs text-stone-400 mt-1">Instant bookings and custom quotes for schools & corporates</p>
            <a
              href="tel:9849798674"
              className="mt-4 inline-block text-lg font-mono font-bold text-emerald-400 hover:text-emerald-300"
            >
              +91 98497 98674
            </a>
          </div>
        </div>

        {/* Accordion */}
        <div className="lg:col-span-7 space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.number}
                className={`rounded-2xl glass-panel border transition-all duration-300 overflow-hidden ${
                  isOpen ? "border-emerald-500/40 bg-stone-900/60 shadow-lg" : "border-white/10 hover:border-white/20"
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full py-5 px-6 flex items-center justify-between text-left gap-4"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-emerald-400 font-bold">
                      {faq.number}
                    </span>
                    <span className="font-serif font-bold text-sm sm:text-base text-white">
                      {faq.question}
                    </span>
                  </div>
                  <span className="p-1 rounded-full glass-pill text-stone-400 flex-shrink-0">
                    {isOpen ? <Minus className="w-4 h-4 text-emerald-400" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-stone-300 leading-relaxed font-light border-t border-white/5">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
