"use client";

import React, { useState } from "react";
import { Compass, Navigation, Phone, Calendar, Sparkles, MapPin, X, ExternalLink, Sprout } from "lucide-react";
import { trackPhoneCall } from "@/components/Analytics";
import { motion, AnimatePresence } from "framer-motion";

interface MobileTabBarProps {
  onOpenBooking: () => void;
}

export default function MobileTabBar({ onOpenBooking }: MobileTabBarProps) {
  const [directionsModalOpen, setDirectionsModalOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Fixed Native-Style Bottom App Bar (Mobile & Tablet only) */}
      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden px-3 pb-3 pointer-events-none">
        <div className="max-w-md mx-auto pointer-events-auto bg-[#ffffff]/95 backdrop-blur-xl border border-emerald-900/15 rounded-3xl shadow-[0_-5px_25px_rgba(20,50,15,0.12)] p-2 flex items-center justify-between gap-1">
          {/* 360° Tour Tab */}
          <button
            onClick={() => scrollTo("tour360")}
            className="flex-1 py-1.5 px-1 rounded-2xl flex flex-col items-center justify-center text-[#2b4c1c] hover:bg-emerald-50 active:scale-95 transition-all"
          >
            <div className="relative">
              <Compass className="w-5 h-5 text-emerald-700" />
              <span className="absolute -top-1 -right-2 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
              </span>
            </div>
            <span className="text-[10px] font-bold text-emerald-900 mt-0.5 tracking-tight">360° Tour</span>
          </button>

          {/* Activities / Experiences */}
          <button
            onClick={() => scrollTo("act1-mud")}
            className="flex-1 py-1.5 px-1 rounded-2xl flex flex-col items-center justify-center text-[#4a5840] hover:bg-emerald-50 active:scale-95 transition-all"
          >
            <Sprout className="w-5 h-5 text-amber-600" />
            <span className="text-[10px] font-semibold text-[#3d5032] mt-0.5 tracking-tight">Activities</span>
          </button>

          {/* Directions Quick Action */}
          <button
            onClick={() => setDirectionsModalOpen(true)}
            className="flex-1 py-1.5 px-1 rounded-2xl flex flex-col items-center justify-center text-[#4a5840] hover:bg-emerald-50 active:scale-95 transition-all"
          >
            <Navigation className="w-5 h-5 text-blue-600" />
            <span className="text-[10px] font-semibold text-[#3d5032] mt-0.5 tracking-tight">Directions</span>
          </button>

          {/* Call Helpdesk */}
          <a
            href="tel:9849798674"
            onClick={() => trackPhoneCall("9849798674")}
            className="flex-1 py-1.5 px-1 rounded-2xl flex flex-col items-center justify-center text-[#4a5840] hover:bg-emerald-50 active:scale-95 transition-all"
          >
            <Phone className="w-5 h-5 text-emerald-700" />
            <span className="text-[10px] font-semibold text-[#3d5032] mt-0.5 tracking-tight">Call Us</span>
          </a>

          {/* Book Now Radiant Action Button */}
          <button
            onClick={onOpenBooking}
            className="flex-1.5 py-2.5 px-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-green-600 to-amber-600 text-white font-bold text-xs shadow-md flex items-center justify-center gap-1 active:scale-95 transition-transform"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
            <span>Book Visit</span>
          </button>
        </div>
      </div>

      {/* Quick Mobile Directions Bottom Drawer / Sheet */}
      <AnimatePresence>
        {directionsModalOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl border border-emerald-900/15 max-h-[85vh] overflow-y-auto"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Navigation className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#14230e]">
                      Choose Farm Location
                    </h3>
                    <p className="text-[11px] text-[#526548]">
                      Both farms are open 7 days a week (9 AM – 6 PM)
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setDirectionsModalOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Location 1: Bhongir Farm */}
              <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-200/60 px-2 py-0.5 rounded-full">
                    Flagship • 15+ Acres
                  </span>
                  <span className="text-xs font-semibold text-emerald-700">~45–50 Mins</span>
                </div>
                <h4 className="font-serif font-bold text-base text-[#14230e] mb-1">
                  Bhongir Main Farm
                </h4>
                <p className="text-xs text-[#3a4e30] mb-3 leading-relaxed">
                  Near Hotel Vivera, Hyderabad - Warangal Highway (NH 163), Bhongir Bypass
                </p>
                <div className="flex gap-2">
                  <a
                    href="https://maps.google.com/?q=One+Day+Kisan+Bhongir"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setDirectionsModalOpen(false)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-98"
                  >
                    <Navigation className="w-3.5 h-3.5 text-amber-300" />
                    <span>Navigate (Google Maps)</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </a>
                </div>
              </div>

              {/* Location 2: Moinabad Farm */}
              <div className="mt-3 p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded-full">
                    Agro-Sanctuary • 12+ Acres
                  </span>
                  <span className="text-xs font-semibold text-amber-700">~30–35 Mins</span>
                </div>
                <h4 className="font-serif font-bold text-base text-[#14230e] mb-1">
                  Moinabad Agro-Sanctuary
                </h4>
                <p className="text-xs text-[#3a4e30] mb-3 leading-relaxed">
                  Kapil Agro Farms, Sriramnagar, Chilkur Balaji Corridor, Moinabad
                </p>
                <div className="flex gap-2">
                  <a
                    href="https://maps.google.com/?q=Kapil+Agro+Farms+Moinabad"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setDirectionsModalOpen(false)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-98"
                  >
                    <Navigation className="w-3.5 h-3.5 text-yellow-200" />
                    <span>Navigate (Google Maps)</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </a>
                </div>
              </div>

              {/* Direct Helpdesk Phone Button */}
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-[#526548]">Need gate directions?</span>
                <a
                  href="tel:9849798674"
                  onClick={() => trackPhoneCall("9849798674")}
                  className="font-bold text-emerald-800 flex items-center gap-1 hover:underline"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-700" />
                  +91 98497 98674
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}