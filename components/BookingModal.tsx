"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Send, CheckCircle2, GraduationCap, Briefcase, Users, Heart } from "lucide-react";
import { trackWhatsAppBooking } from "@/components/Analytics";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedActivity?: string;
}

export default function BookingModal({ isOpen, onClose, preselectedActivity }: BookingModalProps) {
  const [visitType, setVisitType] = useState<"School" | "Corporate" | "Family" | "Others">("School");
  const [farmLocation, setFarmLocation] = useState<"Bhongir" | "Moinabad" | "Any">("Bhongir");

  const [name, setName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [city, setCity] = useState("Hyderabad");
  const [grade, setGrade] = useState("");
  const [headcount, setHeadcount] = useState("50");
  const [date, setDate] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState(preselectedActivity ? `Focus: ${preselectedActivity}` : "");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedWhatsAppUrl, setSubmittedWhatsAppUrl] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanPhone = phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length < 10) {
      setErrorMessage("Please enter a valid 10-digit mobile or WhatsApp number.");
      return;
    }

    if (visitType === "School" && !orgName.trim()) {
      setErrorMessage("Please enter your school or institution name.");
      return;
    }
    if (visitType === "Corporate" && !orgName.trim()) {
      setErrorMessage("Please enter your company or organization name.");
      return;
    }
    if ((visitType === "Family" || visitType === "Others") && !name.trim()) {
      setErrorMessage("Please enter your contact name.");
      return;
    }

    let text = `*New Booking Request – One Day Kisan*%0A%0A`;
    text += `*Visit Type:* ${encodeURIComponent(visitType)}%0A`;
    text += `*Preferred Farm:* ${encodeURIComponent(farmLocation)} Farm%0A`;

    if (visitType === "School") {
      text += `*School:* ${encodeURIComponent(orgName.trim())}%0A`;
      text += `*City:* ${encodeURIComponent(city)}%0A`;
      if (grade) text += `*Grade/Class:* ${encodeURIComponent(grade.trim())}%0A`;
      text += `*Est. Students:* ${encodeURIComponent(headcount)}%0A`;
    } else if (visitType === "Corporate") {
      text += `*Company:* ${encodeURIComponent(orgName.trim())}%0A`;
      text += `*City:* ${encodeURIComponent(city)}%0A`;
      text += `*Est. Team Size:* ${encodeURIComponent(headcount)}%0A`;
    } else {
      text += `*Contact Name:* ${encodeURIComponent(name.trim())}%0A`;
      text += `*Persons:* ${encodeURIComponent(headcount)}%0A`;
    }

    if (date) text += `*Date:* ${encodeURIComponent(date)}%0A`;
    text += `*Phone:* ${encodeURIComponent(cleanPhone)}%0A`;
    if (email) text += `*Email:* ${encodeURIComponent(email.trim())}%0A`;
    if (notes) text += `*Notes:* ${encodeURIComponent(notes.trim())}%0A`;

    const waUrl = `https://wa.me/919849798674?text=${text}`;
    setSubmittedWhatsAppUrl(waUrl);

    trackWhatsAppBooking(visitType, farmLocation, headcount);
    window.open(waUrl, "_blank");
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setErrorMessage(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-md"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ type: "spring", damping: 26, stiffness: 320 }}
        className="relative z-10 w-full max-w-xl rounded-3xl bg-[#ffffff] p-6 sm:p-8 border border-[#2b4c1c]/15 shadow-2xl max-h-[92vh] overflow-y-auto text-left"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#f3ede2] text-[#4a5840]"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="mb-6">
              <span className="field-note-tag mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#a84724]" /> Reserve a Day at the Farm
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1a2713]">
                Plan an Unforgettable Experience
              </h3>
              <p className="text-[#526048] text-xs sm:text-sm font-light mt-1">
                Direct WhatsApp concierge with customized package proposals and immediate responses.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1e2917] mb-2">
                  Visit Category *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: "School", label: "School", icon: <GraduationCap className="w-3.5 h-3.5" /> },
                    { id: "Corporate", label: "Corporate", icon: <Briefcase className="w-3.5 h-3.5" /> },
                    { id: "Family", label: "Family", icon: <Users className="w-3.5 h-3.5" /> },
                    { id: "Others", label: "Group", icon: <Heart className="w-3.5 h-3.5" /> },
                  ].map((t) => (
                    <button
                      type="button"
                      key={t.id}
                      onClick={() => setVisitType(t.id as any)}
                      className={`py-2 px-3 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-all border ${
                        visitType === t.id
                          ? "bg-[#2b4c1c] text-white font-semibold border-[#2b4c1c] shadow-sm"
                          : "bg-[#faf7f0] text-[#4a5840] border-[#2b4c1c]/15 hover:bg-[#f3ece0]"
                      }`}
                    >
                      {t.icon}
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1e2917] mb-2">
                  Farm Destination *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "Bhongir", label: "Bhongir (Warangal Hwy)" },
                    { id: "Moinabad", label: "Moinabad (Kapil Agro)" },
                    { id: "Any", label: "Either Campus" },
                  ].map((loc) => (
                    <button
                      type="button"
                      key={loc.id}
                      onClick={() => setFarmLocation(loc.id as any)}
                      className={`py-2 px-2 rounded-xl text-[11px] font-medium transition-all border text-center ${
                        farmLocation === loc.id
                          ? "bg-[#a84724] text-white font-semibold border-[#a84724]"
                          : "bg-[#faf7f0] text-[#4a5840] border-[#2b4c1c]/15 hover:bg-[#f3ece0]"
                      }`}
                    >
                      {loc.label}
                    </button>
                  ))}
                </div>
              </div>

              {visitType === "School" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-[#4a5840] mb-1">School Name *</label>
                    <input
                      type="text"
                      required
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      placeholder="e.g. Hyderabad Public School"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf7f0] text-xs text-[#1e2917] border border-[#2b4c1c]/15 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#4a5840] mb-1">Grade / Classes</label>
                    <input
                      type="text"
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      placeholder="e.g. Grade 4 to 8"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf7f0] text-xs text-[#1e2917] border border-[#2b4c1c]/15 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {visitType === "Corporate" && (
                <div>
                  <label className="block text-xs text-[#4a5840] mb-1">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder="e.g. TCS / Tech Team"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf7f0] text-xs text-[#1e2917] border border-[#2b4c1c]/15 focus:outline-none"
                  />
                </div>
              )}

              {(visitType === "Family" || visitType === "Others") && (
                <div>
                  <label className="block text-xs text-[#4a5840] mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf7f0] text-xs text-[#1e2917] border border-[#2b4c1c]/15 focus:outline-none"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#4a5840] mb-1">Estimated Count *</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={headcount}
                    onChange={(e) => setHeadcount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf7f0] text-xs text-[#1e2917] border border-[#2b4c1c]/15 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#4a5840] mb-1">Preferred Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf7f0] text-xs text-[#1e2917] border border-[#2b4c1c]/15 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#4a5840] mb-1">WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98497 98674"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf7f0] text-xs text-[#1e2917] border border-[#2b4c1c]/15 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#4a5840] mb-1">Email (Optional)</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@school.org"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf7f0] text-xs text-[#1e2917] border border-[#2b4c1c]/15 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#4a5840] mb-1">Special Requirements</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Lunch preferences, transport requirements, or specific activities..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf7f0] text-xs text-[#1e2917] border border-[#2b4c1c]/15 focus:outline-none resize-none"
                />
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                  <span className="font-bold">⚠️</span>
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl text-xs font-semibold text-white bg-[#2b4c1c] hover:bg-[#1e3614] shadow-md flex items-center justify-center gap-2 transition-all mt-4"
              >
                <Send className="w-4 h-4" />
                Dispatch via WhatsApp (+91 98497 98674)
              </button>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#2b4c1c]/10 text-[#2b4c1c] flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#1e2917]">Inquiry Dispatched!</h3>
            <p className="text-xs text-[#4a5840] max-w-sm mt-2 leading-relaxed">
              We&apos;ve opened WhatsApp with your customized visit proposal details. If your chat didn&apos;t open automatically, use the buttons below:
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              {submittedWhatsAppUrl && (
                <a
                  href={submittedWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#2b4c1c] hover:bg-[#1e3614] text-white text-xs font-semibold shadow-sm transition-all text-center flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Open WhatsApp Chat</span>
                </a>
              )}
              <a
                href="tel:9849798674"
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-white border border-[#2b4c1c]/20 hover:bg-[#2b4c1c]/5 text-[#1e2917] text-xs font-semibold transition-all text-center"
              >
                Call: +91 98497 98674
              </a>
            </div>

            <button
              onClick={handleReset}
              className="mt-6 text-xs text-[#6e7d64] hover:text-[#1e2917] underline"
            >
              Close Window
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
