"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, ShieldCheck, CheckCircle2, Utensils, Bus, FileText, ArrowRight, Award } from "lucide-react";

interface SchoolsSectionProps {
  onOpenBooking: () => void;
}

export default function SchoolsSection({ onOpenBooking }: SchoolsSectionProps) {
  const schoolLogos = [
    "Hyderabad Public School",
    "Delhi Public School (DPS)",
    "Oakridge International",
    "Chirec International",
    "Meridian School",
    "Silver Oaks",
    "Indus International",
    "Gitanjali School"
  ];

  const curriculumPoints = [
    {
      subject: "Botany & Agriculture",
      topics: "Seed germination, paddy vegetative stages, transplantation spacing, chlorophyll, and organic crop rotation.",
      grades: "Grades 3 – 10"
    },
    {
      subject: "Physics & Mechanics",
      topics: "Persian wheel crown gears, torque conversion, Archimedes screw helical lift, and dam potential-to-kinetic energy.",
      grades: "Grades 5 – 12"
    },
    {
      subject: "Ecology & Soil Biology",
      topics: "Vermiculture, Eisenia fetida decomposition, humus fertility, pH balance, and rain water harvesting recharge pits.",
      grades: "Grades 4 – 10"
    },
    {
      subject: "Living Animal Science",
      topics: "Bos indicus (Desi Gir) cow genetics, A1 vs A2 beta-casein milk, avian anatomy in the walk-in aviary, and pollination.",
      grades: "All Grades"
    }
  ];

  return (
    <section id="schools" className="scroll-mt-24 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#2b4c1c]/10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2b4c1c]/10 text-[#2b4c1c] border border-[#2b4c1c]/20 text-xs font-mono uppercase tracking-widest mb-4">
          <GraduationCap className="w-3.5 h-3.5 text-[#2b4c1c]" />
          <span>Academic Partner Program • CBSE & ICSE Enriched</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif font-black text-[#14230e] tracking-tight">
          Where Textbooks Meet <br />
          <span className="italic font-normal text-[#8a4724]">
            the Living Soil.
          </span>
        </h2>

        <p className="mt-4 text-[#3d4f33] text-sm sm:text-base font-normal leading-relaxed">
          Over 350+ educational institutions trust One Day Kisan for structured, experiential CBSE, ICSE, and State Board curriculum field trips.
        </p>
      </div>

      {/* School Trust Badges */}
      <div className="mb-16 p-6 rounded-3xl bg-[#ffffff] border border-[#2b4c1c]/10 shadow-xs">
        <p className="text-center text-xs font-mono uppercase text-[#8a5738] tracking-wider mb-5">
          Trusted by Educators from Telangana&apos;s Leading Institutions
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
          {schoolLogos.map((school) => (
            <div
              key={school}
              className="px-4 py-2 rounded-xl bg-[#faf7f0] border border-[#2b4c1c]/10 text-xs font-semibold text-[#1a2713]"
            >
              {school}
            </div>
          ))}
        </div>
      </div>

      {/* Curriculum Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {curriculumPoints.map((point) => (
          <div
            key={point.subject}
            className="p-6 rounded-2xl bg-[#ffffff] border border-[#2b4c1c]/10 shadow-xs flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-semibold text-[#a84724] uppercase tracking-wider">
                {point.grades}
              </span>
              <h3 className="font-serif font-bold text-lg text-[#1e2917] mt-1 mb-2">
                {point.subject}
              </h3>
              <p className="text-xs text-[#526048] leading-relaxed font-light">
                {point.topics}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#2b4c1c]/10 text-[11px] font-medium text-[#2b4c1c]">
              Hands-On Demonstration
            </div>
          </div>
        ))}
      </div>

      {/* School Field Trip Logistics & Safety Bento */}
      <div className="rounded-3xl bg-[#ffffff] p-8 sm:p-12 border border-[#2b4c1c]/10 shadow-sm">
        <div className="max-w-2xl mb-8">
          <span className="field-note-tag mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2b4c1c]" />
            Peace of Mind for Principals & Parents
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1e2917] mt-1">
            Complete Student Care & Logistics
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-5 rounded-2xl bg-[#faf7f0] border border-[#2b4c1c]/10">
            <div className="w-9 h-9 rounded-full bg-[#2b4c1c]/10 text-[#2b4c1c] flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-sm text-[#1e2917]">1:25 Instructor Ratio</h4>
            <p className="text-xs text-[#526048] mt-1 leading-relaxed">
              Trained agrarian educators lead each small batch, ensuring attentive learning, order, and supervision.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#faf7f0] border border-[#2b4c1c]/10">
            <div className="w-9 h-9 rounded-full bg-[#a84724]/10 text-[#a84724] flex items-center justify-center mb-3">
              <Utensils className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-sm text-[#1e2917]">Hygienic Farm Lunch</h4>
            <p className="text-xs text-[#526048] mt-1 leading-relaxed">
              Steaming, nutritious Telangana buffet with pure RO drinking water. Full hospitality for visiting teachers and bus drivers.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#faf7f0] border border-[#2b4c1c]/10">
            <div className="w-9 h-9 rounded-full bg-[#2b4c1c]/10 text-[#2b4c1c] flex items-center justify-center mb-3">
              <Bus className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-sm text-[#1e2917]">Dedicated Bus Bays</h4>
            <p className="text-xs text-[#526048] mt-1 leading-relaxed">
              Enclosed, fenced campus with extensive parking for up to 30 school buses at both Bhongir and Moinabad.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#2b4c1c]/10">
          <span className="text-xs text-[#6e7d64]">
            Batch Timings: 9:00 AM to 3:30 PM (Flexible for school schedules)
          </span>
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-7 py-3 rounded-full text-xs font-semibold text-white bg-[#2b4c1c] hover:bg-[#1e3614] shadow-sm flex items-center justify-center gap-2"
          >
            <span>Request School Proposal & Schedule</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
