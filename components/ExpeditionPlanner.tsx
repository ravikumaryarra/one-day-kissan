"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Briefcase,
  Users,
  MapPin,
  CheckCircle,
  ShieldCheck,
  Send,
  Phone,
  Navigation,
  HelpCircle,
  Plus,
  Minus,
  Sparkles
} from "lucide-react";
import { faqs } from "@/data/faqs";
import { farmsData } from "@/data/farms";
import { trackWhatsAppBooking } from "@/components/Analytics";

interface ExpeditionPlannerProps {
  onOpenBooking: () => void;
}

export default function ExpeditionPlanner({ onOpenBooking }: ExpeditionPlannerProps) {
  const [activeTab, setActiveTab] = useState<"schools" | "corporates" | "families">("schools");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Quick form inside planner
  const [phone, setPhone] = useState("");
  const [org, setOrg] = useState("");
  const [count, setCount] = useState("50");
  const [selectedFarm, setSelectedFarm] = useState("Bhongir");

  const handleQuickWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      alert("Please provide a contact phone number.");
      return;
    }
    const text = `*Expedition Inquiry – One Day Kisan*%0A%0A*Type:* ${activeTab}%0A*Farm:* ${selectedFarm} Farm%0A*Name/Org:* ${encodeURIComponent(org || "Visitor")}%0A*Est. Persons:* ${encodeURIComponent(count)}%0A*Phone:* ${encodeURIComponent(phone)}`;
    trackWhatsAppBooking(activeTab, selectedFarm, count);
    window.open(`https://wa.me/919849798674?text=${text}`, "_blank");
  };

  return (
    <section id="planner" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#2b4c1c]/10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2b4c1c]/10 text-[#2b4c1c] border border-[#2b4c1c]/20 text-xs font-mono uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#8a4724]" />
          <span>Epilogue • The Expedition Desk & Packages</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif font-black text-[#14230e] tracking-tight">
          Everything you need <br />
          <span className="italic font-normal text-[#8a4724]">
            to plan your day on the farm.
          </span>
        </h2>

        <p className="mt-4 text-[#3d4f33] text-sm sm:text-base font-normal leading-relaxed">
          Transparent arrangements, zero hidden costs, and dedicated farm guides for schools, corporate teams, and families.
        </p>

        {/* Tab Selector */}
        <div className="mt-8 inline-flex p-1.5 rounded-full bg-white border border-[#2b4c1c]/15 shadow-sm">
          {[
            { id: "schools" as const, label: "Schools & Colleges", icon: <GraduationCap className="w-4 h-4" /> },
            { id: "corporates" as const, label: "Corporates & Teams", icon: <Briefcase className="w-4 h-4" /> },
            { id: "families" as const, label: "Family Weekend Passes", icon: <Users className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? "bg-[#2b4c1c] text-white shadow-sm"
                  : "text-[#3f5135] hover:text-[#14230e] hover:bg-[#2b4c1c]/5"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Program Details Card */}
      <div className="max-w-5xl mx-auto rounded-3xl bg-[#ffffff] p-8 sm:p-12 border border-[#2b4c1c]/10 shadow-[0_15px_50px_rgba(50,40,20,0.06)] mb-16">
        {activeTab === "schools" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-mono text-[#a84724] uppercase tracking-wider font-semibold">
                NCERT & CBSE Curriculum Enriched Program
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1e2917]">
                The Comprehensive Student Field Trip
              </h3>
              <p className="text-sm text-[#4a5840] leading-relaxed font-light">
                Tailored for classes 1 through 12. Every batch is assigned a dedicated agricultural instructor so teachers can relax. Students participate in 24 distinct learning stations.
              </p>

              <div className="space-y-2.5 pt-2">
                {[
                  "1 agricultural guide assigned per 25 students",
                  "Complimentary entry & lunch for teachers and bus staff",
                  "Hygienic traditional Telangana lunch & clean RO drinking water",
                  "Dedicated washrooms and clean showers after paddy mud activity",
                  "Post-visit science activity worksheets provided for each student"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-[#2f3d26]">
                    <CheckCircle className="w-4 h-4 text-[#2b4c1c] flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Inquiry Form */}
            <div className="lg:col-span-5 bg-[#faf7f0] p-6 rounded-2xl border border-[#2b4c1c]/10">
              <h4 className="font-serif font-bold text-base text-[#1e2917] mb-1">
                Instant School Proposal
              </h4>
              <p className="text-xs text-[#6e7d64] mb-4">Direct quote via WhatsApp in 30 mins</p>

              <form onSubmit={handleQuickWhatsApp} className="space-y-3">
                <input
                  type="text"
                  placeholder="School Name"
                  required
                  value={org}
                  onChange={(e) => setOrg(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#ffffff] text-xs text-[#1e2917] border border-[#2b4c1c]/15 focus:outline-none"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Est. Students"
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#ffffff] text-xs text-[#1e2917] border border-[#2b4c1c]/15 focus:outline-none"
                  />
                  <select
                    value={selectedFarm}
                    onChange={(e) => setSelectedFarm(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#ffffff] text-xs text-[#1e2917] border border-[#2b4c1c]/15 focus:outline-none"
                  >
                    <option value="Bhongir">Bhongir</option>
                    <option value="Moinabad">Moinabad</option>
                  </select>
                </div>
                <input
                  type="tel"
                  placeholder="WhatsApp Number *"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#ffffff] text-xs text-[#1e2917] border border-[#2b4c1c]/15 focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-xs font-semibold text-white bg-[#2b4c1c] hover:bg-[#1e3614] shadow-sm flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  Request School Quotation
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === "corporates" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-mono text-[#a84724] uppercase tracking-wider font-semibold">
                Team Building • Unplugged Offsite
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1e2917]">
                Trade Slack & Sprints for Rural Camaraderie
              </h3>
              <p className="text-sm text-[#4a5840] leading-relaxed font-light">
                Host your team offsite in open green air. Compete in group ploughing relays, pottery sculpting, village tug-of-war, and conclude with an open-air DJ sunset celebration.
              </p>

              <div className="space-y-2.5 pt-2">
                {[
                  "Tailored corporate team obstacle and farming challenges",
                  "Shaded outdoor lawns for town halls & keynotes",
                  "Unlimited rustic farm feast with authentic country flavors",
                  "Evening DJ setup, rustic games, and bonfire arrangements",
                  "High-capacity bus parking and 35–50 min drive from Hyderabad IT corridor"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-[#2f3d26]">
                    <CheckCircle className="w-4 h-4 text-[#a84724] flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#faf7f0] p-6 rounded-2xl border border-[#2b4c1c]/10">
              <h4 className="font-serif font-bold text-base text-[#1e2917] mb-1">
                Corporate Offsite Inquiry
              </h4>
              <p className="text-xs text-[#6e7d64] mb-4">Direct quote via WhatsApp in 30 mins</p>

              <form onSubmit={handleQuickWhatsApp} className="space-y-3">
                <input
                  type="text"
                  placeholder="Company Name"
                  required
                  value={org}
                  onChange={(e) => setOrg(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#ffffff] text-xs text-[#1e2917] border border-[#2b4c1c]/15 focus:outline-none"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Team Size"
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#ffffff] text-xs text-[#1e2917] border border-[#2b4c1c]/15 focus:outline-none"
                  />
                  <select
                    value={selectedFarm}
                    onChange={(e) => setSelectedFarm(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#ffffff] text-xs text-[#1e2917] border border-[#2b4c1c]/15 focus:outline-none"
                  >
                    <option value="Bhongir">Bhongir</option>
                    <option value="Moinabad">Moinabad</option>
                  </select>
                </div>
                <input
                  type="tel"
                  placeholder="Contact WhatsApp *"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#ffffff] text-xs text-[#1e2917] border border-[#2b4c1c]/15 focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-xs font-semibold text-white bg-[#a84724] hover:bg-[#8e381b] shadow-sm flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  Request Corporate Proposal
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === "families" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-mono text-[#a84724] uppercase tracking-wider font-semibold">
                Saturdays, Sundays & Public Holidays
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1e2917]">
                Weekend Family Day Passes
              </h3>
              <p className="text-sm text-[#4a5840] leading-relaxed font-light">
                Bring your kids and grandparents together. Reconnect with village living in an unhurried, safe environment with fresh countryside food.
              </p>

              <div className="space-y-2.5 pt-2">
                {[
                  "Full-day access to all 24 interactive farm activities",
                  "Walk-in aviary and domestic cattle petting & feeding",
                  "Clay pottery wheel experience—take your handmade pot home",
                  "Tractor joyride across the crops & farmer watch tower climb",
                  "Wholesome traditional village buffet lunch included"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-[#2f3d26]">
                    <CheckCircle className="w-4 h-4 text-[#2b4c1c] flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#faf7f0] p-6 rounded-2xl border border-[#2b4c1c]/10">
              <h4 className="font-serif font-bold text-base text-[#1e2917] mb-1">
                Reserve Family Day Pass
              </h4>
              <p className="text-xs text-[#6e7d64] mb-4">Direct confirmation via WhatsApp</p>

              <form onSubmit={handleQuickWhatsApp} className="space-y-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={org}
                  onChange={(e) => setOrg(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#ffffff] text-xs text-[#1e2917] border border-[#2b4c1c]/15 focus:outline-none"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Total Family Members"
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#ffffff] text-xs text-[#1e2917] border border-[#2b4c1c]/15 focus:outline-none"
                  />
                  <select
                    value={selectedFarm}
                    onChange={(e) => setSelectedFarm(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#ffffff] text-xs text-[#1e2917] border border-[#2b4c1c]/15 focus:outline-none"
                  >
                    <option value="Bhongir">Bhongir</option>
                    <option value="Moinabad">Moinabad</option>
                  </select>
                </div>
                <input
                  type="tel"
                  placeholder="WhatsApp Number *"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#ffffff] text-xs text-[#1e2917] border border-[#2b4c1c]/15 focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-xs font-semibold text-white bg-[#2b4c1c] hover:bg-[#1e3614] shadow-sm flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  Reserve Weekend Pass
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Safety & Hygiene Guarantee (Reassuring Principals & Parents) */}
      <div className="mb-20 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-[#ffffff] border border-[#2b4c1c]/10 text-center flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-[#2b4c1c]/10 text-[#2b4c1c] flex items-center justify-center mb-3">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="font-serif font-bold text-sm text-[#1e2917]">Sanitised Washrooms</h4>
          <p className="text-xs text-[#6e7d64] mt-1">Fresh running water showers and clean dressing areas</p>
        </div>

        <div className="p-6 rounded-2xl bg-[#ffffff] border border-[#2b4c1c]/10 text-center flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-[#a84724]/10 text-[#a84724] flex items-center justify-center mb-3">
            <Users className="w-5 h-5" />
          </div>
          <h4 className="font-serif font-bold text-sm text-[#1e2917]">1:25 Instructor Ratio</h4>
          <p className="text-xs text-[#6e7d64] mt-1">Dedicated agrarian guide stays with each student group</p>
        </div>

        <div className="p-6 rounded-2xl bg-[#ffffff] border border-[#2b4c1c]/10 text-center flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-[#2b4c1c]/10 text-[#2b4c1c] flex items-center justify-center mb-3">
            <Sparkles className="w-5 h-5" />
          </div>
          <h4 className="font-serif font-bold text-sm text-[#1e2917]">RO Purified Water</h4>
          <p className="text-xs text-[#6e7d64] mt-1">Drinking water stations across the farm grounds</p>
        </div>

        <div className="p-6 rounded-2xl bg-[#ffffff] border border-[#2b4c1c]/10 text-center flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-[#8a5738]/10 text-[#8a5738] flex items-center justify-center mb-3">
            <MapPin className="w-5 h-5" />
          </div>
          <h4 className="font-serif font-bold text-sm text-[#1e2917]">Enclosed Campus</h4>
          <p className="text-xs text-[#6e7d64] mt-1">Fenced perimeter with dedicated bus and coach parking</p>
        </div>
      </div>

      {/* Both Farm Destinations Grid */}
      <div className="mb-20">
        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1e2917] text-center mb-8">
          Two Destinations Near Hyderabad
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-[#ffffff] border border-[#2b4c1c]/15 shadow-sm flex flex-col justify-between">
            <div>
              <span className="field-note-tag mb-3">Flagship Campus</span>
              <h4 className="text-2xl font-serif font-bold text-[#1e2917] mb-1">
                {farmsData.bhongir.name}
              </h4>
              <p className="text-xs text-[#a84724] font-medium mb-3">
                {farmsData.bhongir.highway} • {farmsData.bhongir.travelTime}
              </p>
              <p className="text-xs text-[#526048] leading-relaxed mb-6">
                {farmsData.bhongir.address}
              </p>
            </div>
            <a
              href={farmsData.bhongir.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[#2b4c1c] hover:underline inline-flex items-center gap-1.5"
            >
              <Navigation className="w-3.5 h-3.5" />
              Open in Google Maps →
            </a>
          </div>

          <div className="p-8 rounded-3xl bg-[#ffffff] border border-[#2b4c1c]/15 shadow-sm flex flex-col justify-between">
            <div>
              <span className="field-note-tag mb-3">Agro-Sanctuary Branch</span>
              <h4 className="text-2xl font-serif font-bold text-[#1e2917] mb-1">
                {farmsData.moinabad.name}
              </h4>
              <p className="text-xs text-[#8a5738] font-medium mb-3">
                {farmsData.moinabad.highway} • {farmsData.moinabad.travelTime}
              </p>
              <p className="text-xs text-[#526048] leading-relaxed mb-6">
                {farmsData.moinabad.address}
              </p>
            </div>
            <a
              href={farmsData.moinabad.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[#8a5738] hover:underline inline-flex items-center gap-1.5"
            >
              <Navigation className="w-3.5 h-3.5" />
              Open in Google Maps →
            </a>
          </div>
        </div>
      </div>

      {/* Field Guide FAQ Accordion */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <span className="field-note-tag mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-[#2b4c1c]" />
            Field Guide FAQ
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1e2917]">
            Answers for Teachers & Organizers
          </h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={faq.number}
                className="rounded-2xl bg-[#ffffff] border border-[#2b4c1c]/10 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full py-4 px-6 flex items-center justify-between text-left gap-4"
                >
                  <span className="font-serif font-bold text-sm text-[#1e2917]">
                    {faq.number}. {faq.question}
                  </span>
                  <span className="p-1 rounded-full text-[#6e7d64]">
                    {isOpen ? <Minus className="w-4 h-4 text-[#a84724]" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-5 pt-1 text-xs text-[#526048] leading-relaxed border-t border-[#2b4c1c]/10"
                    >
                      {faq.answer}
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
