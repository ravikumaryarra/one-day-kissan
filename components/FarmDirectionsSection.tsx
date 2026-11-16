"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Navigation,
  Clock,
  Car,
  Bus,
  Phone,
  Compass,
  ArrowRight,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Share2
} from "lucide-react";
import { farmsData } from "@/data/farms";
import { trackPhoneCall } from "@/components/Analytics";

export default function FarmDirectionsSection() {
  const [selectedCampus, setSelectedCampus] = useState<"bhongir" | "moinabad">("bhongir");

  const departureHubs = [
    { name: "Uppal / Secunderabad", toBhongir: "45-50 mins", toMoinabad: "65-75 mins" },
    { name: "Gachibowli / Hitec City", toBhongir: "70-80 mins", toMoinabad: "30-35 mins" },
    { name: "Mehdipatnam", toBhongir: "60-70 mins", toMoinabad: "35-40 mins" },
    { name: "Kukatpally / Miyapur", toBhongir: "75-85 mins", toMoinabad: "45-55 mins" },
    { name: "LB Nagar / Dilsukhnagar", toBhongir: "40-45 mins", toMoinabad: "50-60 mins" },
  ];

  const handleShareDirections = (farmName: string, url: string) => {
    if (navigator.share) {
      navigator.share({
        title: `Directions to One Day Kisan - ${farmName}`,
        text: `Here is the Google Maps navigation for One Day Kisan ${farmName}:`,
        url: url,
      }).catch(() => {});
    } else {
      window.open(url, "_blank");
    }
  };

  return (
    <section id="directions" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Header with Colorful Badges */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/15 via-amber-500/15 to-orange-500/15 border border-emerald-600/20 text-xs font-semibold text-[#1e5128] uppercase tracking-wider mb-4 shadow-xs">
          <Navigation className="w-3.5 h-3.5 text-[#16a34a] animate-pulse" />
          <span>Interactive Campus Guide • Both Locations</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif font-black text-[#14230e] tracking-tight">
          How to Reach Our Farms <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-green-600 to-amber-600">
            from Anywhere in Hyderabad.
          </span>
        </h2>

        <p className="mt-4 text-[#3d4f33] text-sm sm:text-base font-normal max-w-2xl mx-auto">
          Both campuses feature wide highway access, dedicated private bus parking for school batches, and clean paved approach roads.
        </p>

        {/* Campus Toggle Pills for Quick Switching */}
        <div className="mt-8 inline-flex p-1.5 rounded-full bg-white border border-emerald-900/15 shadow-md">
          <button
            onClick={() => setSelectedCampus("bhongir")}
            className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
              selectedCampus === "bhongir"
                ? "bg-gradient-to-r from-emerald-600 to-green-700 text-white shadow-sm"
                : "text-[#3f5135] hover:text-[#16330b]"
            }`}
          >
            <MapPin className="w-4 h-4 text-amber-300" />
            Bhongir Main Farm
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 font-medium">
              Warangal Hwy
            </span>
          </button>

          <button
            onClick={() => setSelectedCampus("moinabad")}
            className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
              selectedCampus === "moinabad"
                ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-sm"
                : "text-[#3f5135] hover:text-[#16330b]"
            }`}
          >
            <MapPin className="w-4 h-4 text-emerald-300" />
            Moinabad Agro-Sanctuary
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 font-medium">
              Chilkur Road
            </span>
          </button>
        </div>
      </div>

      {/* Campus Direction Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Farm 1: Bhongir Main Farm Card */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
          className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between border-2 transition-all ${
            selectedCampus === "bhongir"
              ? "bg-gradient-to-b from-[#f2f9ed] via-white to-[#f7faf3] border-emerald-500 shadow-[0_20px_50px_rgba(22,101,52,0.15)] ring-2 ring-emerald-500/20"
              : "bg-white border-[#2b4c1c]/15 shadow-sm opacity-90 hover:opacity-100"
          }`}
        >
          <div>
            {/* Badges Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700 text-white text-[11px] font-bold tracking-wide uppercase">
                <Sparkles className="w-3 h-3 text-amber-300" />
                Flagship Campus (15+ Acres)
              </span>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-700" />
                ~45–50 Mins Drive
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-black text-[#14230e] mb-1">
              Bhongir Main Farm
            </h3>
            <p className="text-xs font-semibold text-amber-800 mb-4">
              Hyderabad – Warangal Highway (NH 163) • Landmark: Near Hotel Vivera
            </p>

            {/* Address Box */}
            <div className="p-4 rounded-2xl bg-white/80 border border-emerald-900/10 mb-6 text-xs text-[#334628] leading-relaxed">
              <p className="font-semibold text-[#18310f] mb-1">Official Address:</p>
              <p>Near Hotel Vivera, Hyderabad - Warangal Highway, Bhongir Bypass, Bhongir, Telangana - 508 116</p>
            </div>

            {/* Step-by-Step Route */}
            <div className="space-y-3 mb-6">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                <Car className="w-4 h-4 text-emerald-600" />
                Recommended Driving Route:
              </div>
              <ul className="space-y-2 text-xs text-[#3d5032]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Start from <strong>Uppal Junction</strong> or take <strong>ORR Exit 8 (Ghatkesar)</strong> onto 4-lane NH 163.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Cruise straight for 35 km past Bibinagar towards Bhongir Bypass.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Look for <strong>Hotel Vivera</strong> on your left; take the immediate service lane entrance into One Day Kisan.</span>
                </li>
              </ul>
            </div>

            {/* Logistics Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-[11px] px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-medium border border-emerald-200 flex items-center gap-1">
                <Bus className="w-3.5 h-3.5 text-emerald-700" /> Dedicated Bus / Coach Parking
              </span>
              <span className="text-[11px] px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 font-medium border border-amber-200">
                Paddy Arena & Persian Wheel
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-emerald-900/10 flex flex-col sm:flex-row gap-3">
            <a
              href="https://maps.google.com/?q=One+Day+Kisan+Bhongir"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-emerald-700 to-green-700 hover:from-emerald-800 hover:to-green-800 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Navigation className="w-4 h-4 text-amber-300" />
              <span>Start Google Maps Navigation</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => handleShareDirections("Bhongir Farm", "https://maps.google.com/?q=One+Day+Kisan+Bhongir")}
              className="py-3 px-4 rounded-xl bg-white border border-emerald-700/25 text-emerald-900 font-semibold text-xs hover:bg-emerald-50 transition-colors flex items-center justify-center gap-1.5"
            >
              <Share2 className="w-4 h-4 text-emerald-700" />
              <span>Share Location</span>
            </button>
          </div>
        </motion.div>

        {/* Farm 2: Moinabad Agro-Sanctuary Card */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
          className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between border-2 transition-all ${
            selectedCampus === "moinabad"
              ? "bg-gradient-to-b from-[#fdf7ee] via-white to-[#fbf5eb] border-amber-500 shadow-[0_20px_50px_rgba(217,119,6,0.15)] ring-2 ring-amber-500/20"
              : "bg-white border-[#2b4c1c]/15 shadow-sm opacity-90 hover:opacity-100"
          }`}
        >
          <div>
            {/* Badges Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 text-white text-[11px] font-bold tracking-wide uppercase">
                <Sparkles className="w-3 h-3 text-yellow-200" />
                Agro-Sanctuary Branch (12+ Acres)
              </span>
              <span className="text-xs font-semibold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-700" />
                ~30–35 Mins Drive
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-black text-[#14230e] mb-1">
              Moinabad Agro-Sanctuary
            </h3>
            <p className="text-xs font-semibold text-emerald-800 mb-4">
              Chevella Road / Chilkur Balaji Corridor • Landmark: Kapil Agro Farms
            </p>

            {/* Address Box */}
            <div className="p-4 rounded-2xl bg-white/80 border border-amber-900/10 mb-6 text-xs text-[#334628] leading-relaxed">
              <p className="font-semibold text-[#18310f] mb-1">Official Address:</p>
              <p>Kapil Agro Farms, Sriramnagar, Moinabad, Telangana - 501 504 (Chilkur Balaji Corridor)</p>
            </div>

            {/* Step-by-Step Route */}
            <div className="space-y-3 mb-6">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                <Car className="w-4 h-4 text-amber-600" />
                Recommended Driving Route:
              </div>
              <ul className="space-y-2 text-xs text-[#3d5032]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>From <strong>Gachibowli / Financial District</strong>, take <strong>ORR to Exit 18 (TSPA / Appa Junction)</strong>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>Head towards Chevella / Moinabad main road for 14 km.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>Turn at Sriramnagar junction towards <strong>Kapil Agro Farms</strong> entrance.</span>
                </li>
              </ul>
            </div>

            {/* Logistics Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-[11px] px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-medium border border-emerald-200 flex items-center gap-1">
                <Bus className="w-3.5 h-3.5 text-emerald-700" /> Bus & Van Parking Ready
              </span>
              <span className="text-[11px] px-2.5 py-1 rounded-lg bg-orange-50 text-orange-800 font-medium border border-orange-200">
                Walk-In Aviary & Gir Cow Dairy
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-amber-900/10 flex flex-col sm:flex-row gap-3">
            <a
              href="https://maps.google.com/?q=Kapil+Agro+Farms+Moinabad"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Navigation className="w-4 h-4 text-yellow-200" />
              <span>Start Google Maps Navigation</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => handleShareDirections("Moinabad Agro-Sanctuary", "https://maps.google.com/?q=Kapil+Agro+Farms+Moinabad")}
              className="py-3 px-4 rounded-xl bg-white border border-amber-700/25 text-amber-900 font-semibold text-xs hover:bg-amber-50 transition-colors flex items-center justify-center gap-1.5"
            >
              <Share2 className="w-4 h-4 text-amber-700" />
              <span>Share Location</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Travel Time Estimator across Hyderabad */}
      <div className="mt-12 rounded-3xl bg-white p-6 sm:p-8 border border-emerald-900/15 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-emerald-900/10">
          <div>
            <h4 className="font-serif font-bold text-lg text-[#14230e]">
              Estimated Travel Time from Hyderabad Hubs
            </h4>
            <p className="text-xs text-[#526548] mt-0.5">
              Approximate morning travel time during weekend & school hours
            </p>
          </div>

          <a
            href="tel:9849798674"
            onClick={() => trackPhoneCall("9849798674")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold hover:bg-emerald-100 border border-emerald-200 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-700" />
            <span>Need Help Finding the Gate? Call 98497 98674</span>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {departureHubs.map((hub) => (
            <div key={hub.name} className="p-3.5 rounded-2xl bg-[#faf7f0] border border-emerald-900/10 flex flex-col justify-between">
              <span className="text-xs font-bold text-[#14230e] mb-2">{hub.name}</span>
              <div className="space-y-1 text-[11px]">
                <div className="flex justify-between items-center text-emerald-800 font-medium">
                  <span>To Bhongir:</span>
                  <span className="font-bold">{hub.toBhongir}</span>
                </div>
                <div className="flex justify-between items-center text-amber-800 font-medium">
                  <span>To Moinabad:</span>
                  <span className="font-bold">{hub.toMoinabad}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}