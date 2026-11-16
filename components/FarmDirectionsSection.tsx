"use client";

import React from "react";
import { MapPin, Navigation, Clock, Phone } from "lucide-react";
import { trackPhoneCall } from "@/components/Analytics";

export default function FarmDirectionsSection() {
  return (
    <section id="directions" className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto scroll-mt-20">
      {/* Clean Minimal Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="field-note-tag mb-3">
          <Navigation className="w-3.5 h-3.5 text-[#8a4724]" />
          <span>Farm Directions</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1a2614] tracking-tight">
          Directions to Both Farms
        </h2>

        <p className="mt-3 text-[#4a5840] text-sm leading-relaxed">
          Both locations have wide highway access, dedicated bus parking, and paved approach roads.
        </p>
      </div>

      {/* Two Direct, Simple Farm Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Farm 1: Bhongir */}
        <div className="rounded-2xl p-6 sm:p-7 bg-[#ffffff] border border-[#2b4c1c]/15 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="field-note-tag text-[10px]">
                Flagship Campus (15+ Acres)
              </span>
              <span className="text-xs text-[#8a4724] font-medium flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                ~45–50 Mins
              </span>
            </div>

            <h3 className="text-xl font-serif font-bold text-[#1a2614] mb-1">
              Bhongir Main Farm
            </h3>
            <p className="text-xs text-[#8a4724] font-medium mb-3">
              Warangal Highway (NH 163) • Near Hotel Vivera
            </p>

            <p className="text-xs text-[#526048] leading-relaxed mb-6">
              Near Hotel Vivera, Hyderabad - Warangal Highway, Bhongir Bypass, Telangana - 508 116.
            </p>
          </div>

          <div className="pt-4 border-t border-[#2b4c1c]/10 flex items-center justify-between gap-3">
            <a
              href="https://maps.google.com/?q=One+Day+Kisan+Bhongir"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-5 rounded-full bg-[#2b4c1c] hover:bg-[#1e3614] text-white font-medium text-xs flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Open in Google Maps</span>
            </a>

            <a
              href="tel:9849798674"
              onClick={() => trackPhoneCall("9849798674")}
              className="text-xs text-[#4a5840] hover:text-[#1a2614] font-medium flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5 text-[#2b4c1c]" />
              <span>Helpdesk</span>
            </a>
          </div>
        </div>

        {/* Farm 2: Moinabad */}
        <div className="rounded-2xl p-6 sm:p-7 bg-[#ffffff] border border-[#2b4c1c]/15 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="field-note-tag text-[10px]">
                Agro-Sanctuary (12+ Acres)
              </span>
              <span className="text-xs text-[#8a4724] font-medium flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                ~30–35 Mins
              </span>
            </div>

            <h3 className="text-xl font-serif font-bold text-[#1a2614] mb-1">
              Moinabad Agro-Sanctuary
            </h3>
            <p className="text-xs text-[#8a4724] font-medium mb-3">
              Chevella Road • Kapil Agro Farms (Chilkur Balaji Corridor)
            </p>

            <p className="text-xs text-[#526048] leading-relaxed mb-6">
              Kapil Agro Farms, Sriramnagar, Moinabad, Telangana - 501 504.
            </p>
          </div>

          <div className="pt-4 border-t border-[#2b4c1c]/10 flex items-center justify-between gap-3">
            <a
              href="https://maps.google.com/?q=Kapil+Agro+Farms+Moinabad"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-5 rounded-full bg-[#2b4c1c] hover:bg-[#1e3614] text-white font-medium text-xs flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Open in Google Maps</span>
            </a>

            <a
              href="tel:9849798674"
              onClick={() => trackPhoneCall("9849798674")}
              className="text-xs text-[#4a5840] hover:text-[#1a2614] font-medium flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5 text-[#2b4c1c]" />
              <span>Helpdesk</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}