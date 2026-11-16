"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Sparkles,
  Send,
  CheckCircle2,
  GraduationCap,
  Briefcase,
  Users,
  CreditCard,
  QrCode,
  Printer,
  Share2,
  Calendar,
  MapPin,
  Phone,
  ArrowRight,
  ShieldCheck,
  Check
} from "lucide-react";
import { trackWhatsAppBooking } from "@/components/Analytics";
import { useLanguage } from "@/context/LanguageContext";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedActivity?: string;
}

export interface BookingRecord {
  id: string;
  reference: string;
  createdAt: string;
  visitType: "School" | "Corporate" | "Family";
  farm: "Bhongir" | "Moinabad";
  customerName: string;
  orgName: string;
  phone: string;
  email: string;
  headcount: number;
  visitDate: string;
  tokenPaid: number;
  totalEstimated: number;
  balanceDue: number;
  paymentMethod: "UPI_Online" | "WhatsApp_Offline";
  status: "Confirmed" | "New" | "Contacted" | "Completed" | "Cancelled";
  notes?: string;
}

export default function BookingModal({ isOpen, onClose, preselectedActivity }: BookingModalProps) {
  const { t } = useLanguage();

  const [bookingMode, setBookingMode] = useState<"online" | "whatsapp">("online");
  const [visitType, setVisitType] = useState<"School" | "Corporate" | "Family">("School");
  const [farmLocation, setFarmLocation] = useState<"Bhongir" | "Moinabad">("Bhongir");

  const [name, setName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [city, setCity] = useState("Hyderabad");
  const [grade, setGrade] = useState("");
  const [headcount, setHeadcount] = useState("50");
  const [date, setDate] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState(preselectedActivity ? `Focus: ${preselectedActivity}` : "");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Completed Pass State
  const [confirmedPass, setConfirmedPass] = useState<BookingRecord | null>(null);
  const [isSubmittedWhatsApp, setIsSubmittedWhatsApp] = useState(false);
  const [submittedWhatsAppUrl, setSubmittedWhatsAppUrl] = useState("");

  // Rate & Advance Token calculation
  const getPricing = () => {
    const count = parseInt(headcount, 10) || 1;
    let ratePerPerson = 450;
    let advanceToken = 2500;

    if (visitType === "Corporate") {
      ratePerPerson = 950;
      advanceToken = 5000;
    } else if (visitType === "Family") {
      ratePerPerson = 750;
      advanceToken = 500;
    }

    const totalEstimated = count * ratePerPerson;
    const balanceDue = Math.max(0, totalEstimated - advanceToken);

    return { ratePerPerson, advanceToken, totalEstimated, balanceDue };
  };

  const { ratePerPerson, advanceToken, totalEstimated, balanceDue } = getPricing();

  const handleSaveToAdminStore = (booking: BookingRecord) => {
    try {
      const existingStr = localStorage.getItem("odk_staff_bookings");
      const existing: BookingRecord[] = existingStr ? JSON.parse(existingStr) : [];
      const updated = [booking, ...existing.filter((b) => b.reference !== booking.reference)];
      localStorage.setItem("odk_staff_bookings", JSON.stringify(updated));
    } catch {
      // Ignore in private storage
    }
  };

  const handleOnlineTokenPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setErrorMessage(null);

    const cleanPhone = phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length < 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (visitType === "School" && !orgName.trim()) {
      setErrorMessage("Please enter your school or college name.");
      return;
    }
    if (visitType === "Corporate" && !orgName.trim()) {
      setErrorMessage("Please enter your company name.");
      return;
    }
    if (visitType === "Family" && !name.trim()) {
      setErrorMessage("Please enter your contact name.");
      return;
    }
    if (!date) {
      setErrorMessage("Please choose your preferred visit date.");
      return;
    }

    setIsSubmitting(true);

    // Generate unique Pass reference
    const campusCode = farmLocation === "Bhongir" ? "BH" : "MO";
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const reference = `ODK-2026-${campusCode}-${randomSuffix}`;

    // Simulate instant secure payment processing (or Razorpay standard checkout)
    setTimeout(() => {
      const newBooking: BookingRecord = {
        id: `book_${Date.now()}`,
        reference,
        createdAt: new Date().toISOString(),
        visitType,
        farm: farmLocation,
        customerName: name.trim() || orgName.trim(),
        orgName: orgName.trim() || name.trim(),
        phone: cleanPhone,
        email: email.trim() || `${cleanPhone}@guest.onedaykissan.com`,
        headcount: parseInt(headcount, 10) || 1,
        visitDate: date,
        tokenPaid: advanceToken,
        totalEstimated,
        balanceDue,
        paymentMethod: "UPI_Online",
        status: "Confirmed",
        notes: notes.trim(),
      };

      handleSaveToAdminStore(newBooking);
      setConfirmedPass(newBooking);
      setIsSubmitting(false);
    }, 1200);
  };

  const handleWhatsAppInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setErrorMessage(null);

    const cleanPhone = phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length < 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number for WhatsApp.");
      return;
    }

    setIsSubmitting(true);

    let text = `*New Booking Request – One Day Kissan*%0A%0A`;
    text += `*Category:* ${encodeURIComponent(visitType)}%0A`;
    text += `*Campus:* ${encodeURIComponent(farmLocation)} Farm%0A`;
    if (orgName) text += `*Organization:* ${encodeURIComponent(orgName.trim())}%0A`;
    if (name) text += `*Contact:* ${encodeURIComponent(name.trim())}%0A`;
    if (date) text += `*Date:* ${encodeURIComponent(date)}%0A`;
    text += `*Headcount:* ${encodeURIComponent(headcount)} persons%0A`;
    text += `*Phone:* ${encodeURIComponent(cleanPhone)}%0A`;
    if (email) text += `*Email:* ${encodeURIComponent(email.trim())}%0A`;
    if (notes) text += `*Notes:* ${encodeURIComponent(notes.trim())}%0A`;

    const waUrl = `https://wa.me/919849798674?text=${text}`;
    setSubmittedWhatsAppUrl(waUrl);

    // Save as "New" lead in Admin store
    const campusCode = farmLocation === "Bhongir" ? "BH" : "MO";
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const reference = `ODK-INQ-${campusCode}-${randomSuffix}`;

    const newLead: BookingRecord = {
      id: `inq_${Date.now()}`,
      reference,
      createdAt: new Date().toISOString(),
      visitType,
      farm: farmLocation,
      customerName: name.trim() || orgName.trim(),
      orgName: orgName.trim() || name.trim(),
      phone: cleanPhone,
      email: email.trim(),
      headcount: parseInt(headcount, 10) || 1,
      visitDate: date || "Flexible",
      tokenPaid: 0,
      totalEstimated,
      balanceDue: totalEstimated,
      paymentMethod: "WhatsApp_Offline",
      status: "New",
      notes: notes.trim(),
    };

    handleSaveToAdminStore(newLead);
    trackWhatsAppBooking(visitType, farmLocation, headcount);
    window.open(waUrl, "_blank");
    setIsSubmittedWhatsApp(true);
    setIsSubmitting(false);
  };

  const handleReset = () => {
    setConfirmedPass(null);
    setIsSubmittedWhatsApp(false);
    setIsSubmitting(false);
    setErrorMessage(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-md"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ type: "spring", damping: 26, stiffness: 320 }}
        className="relative z-10 w-full max-w-xl rounded-3xl bg-[#ffffff] p-6 sm:p-8 border border-[#2b4c1c]/15 shadow-2xl max-h-[92vh] overflow-y-auto text-left"
      >
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#f3ede2] text-[#4a5840] transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 1. SUCCESS: DIGITAL GATE PASS VIEW */}
        {confirmedPass ? (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-3 shadow-xs">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              </div>
              <span className="field-note-tag mb-2">Gate Pass Issued</span>
              <h3 className="font-serif font-black text-2xl text-[#14230e]">
                {t.booking.ticketSuccessTitle}
              </h3>
              <p className="text-xs text-[#526048] mt-1 max-w-md mx-auto">
                {t.booking.ticketSuccessSubtitle}
              </p>
            </div>

            {/* Visual Digital Ticket Pass */}
            <div className="rounded-2xl border-2 border-dashed border-[#2b4c1c]/30 bg-[#faf7f0] p-6 relative overflow-hidden">
              <div className="flex items-start justify-between border-b border-[#2b4c1c]/15 pb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8a4724] font-bold">
                    Official Farm Pass
                  </span>
                  <h4 className="font-serif font-bold text-lg text-[#1e2917]">
                    {confirmedPass.orgName || confirmedPass.customerName}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-[#2b4c1c] font-semibold mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#8a4724]" />
                    <span>{confirmedPass.farm === "Bhongir" ? "Bhongir Main Farm" : "Moinabad Agro-Sanctuary"}</span>
                  </div>
                </div>

                {/* QR Code Simulation */}
                <div className="w-20 h-20 bg-white border border-[#2b4c1c]/20 rounded-xl p-1.5 flex flex-col items-center justify-center shadow-xs">
                  <QrCode className="w-12 h-12 text-[#1e2917]" />
                  <span className="text-[8px] font-mono text-[#6e7d64] mt-0.5 font-bold">EXPRESS PASS</span>
                </div>
              </div>

              {/* Pass Details Grid */}
              <div className="grid grid-cols-2 gap-4 py-4 text-xs border-b border-[#2b4c1c]/15">
                <div>
                  <span className="text-[10px] text-[#6e7d64] uppercase tracking-wider block">Reference Number</span>
                  <span className="font-mono font-bold text-[#14230e] text-sm">{confirmedPass.reference}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6e7d64] uppercase tracking-wider block">Visit Date</span>
                  <span className="font-medium text-[#14230e]">{confirmedPass.visitDate}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6e7d64] uppercase tracking-wider block">Headcount</span>
                  <span className="font-medium text-[#14230e]">{confirmedPass.headcount} Persons</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6e7d64] uppercase tracking-wider block">Token Status</span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                    <Check className="w-3 h-3" /> Paid ₹{confirmedPass.tokenPaid}
                  </span>
                </div>
              </div>

              {/* Balance Settlement Note */}
              <div className="pt-4 flex items-center justify-between text-xs">
                <span className="text-[#526048]">Gate Balance on Arrival:</span>
                <span className="font-bold text-[#14230e] text-sm">₹{confirmedPass.balanceDue.toLocaleString()}</span>
              </div>
            </div>

            {/* Actions: Print and Share */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="w-full sm:flex-1 py-3 rounded-full bg-[#2b4c1c] text-white font-semibold text-xs hover:bg-[#1e3614] transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Printer className="w-4 h-4" />
                <span>{t.booking.printPassBtn}</span>
              </button>

              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `*One Day Kissan Digital Gate Pass*\nReference: ${confirmedPass.reference}\nCampus: ${confirmedPass.farm} Farm\nDate: ${confirmedPass.visitDate}\nHeadcount: ${confirmedPass.headcount} Persons\nToken Paid: ₹${confirmedPass.tokenPaid}\nDirections: https://onedaykissan.vercel.app/#directions`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-3 rounded-full bg-emerald-700 text-white font-semibold text-xs hover:bg-emerald-800 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Share2 className="w-4 h-4" />
                <span>{t.booking.shareWhatsAppBtn}</span>
              </a>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="w-full py-2 text-center text-xs text-[#6e7d64] hover:text-[#14230e] underline"
            >
              Done & Return to Website
            </button>
          </div>
        ) : isSubmittedWhatsApp ? (
          /* 2. SUCCESS: WHATSAPP REDIRECT VIEW */
          <div className="text-center py-6 space-y-5">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="font-serif font-black text-2xl text-[#14230e]">
              Inquiry Dispatched!
            </h3>
            <p className="text-xs text-[#526048] max-w-sm mx-auto leading-relaxed">
              We&apos;ve initiated WhatsApp with your customized visit proposal details. If your chat didn&apos;t open automatically, use the buttons below:
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={submittedWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#2b4c1c] hover:bg-[#1e3614] text-white text-xs font-semibold shadow-sm flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Open WhatsApp Chat</span>
              </a>
              <a
                href="tel:9849798674"
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-white border border-[#2b4c1c]/20 hover:bg-[#2b4c1c]/5 text-[#1e2917] text-xs font-semibold"
              >
                Call: +91 98497 98674
              </a>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-[#6e7d64] underline pt-4"
            >
              Close Window
            </button>
          </div>
        ) : (
          /* 3. BOOKING FORM */
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="field-note-tag">Reserve Your Date</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-black text-[#14230e] tracking-tight">
                {t.booking.modalTitle}
              </h3>
              <p className="text-xs text-[#526048] mt-1">
                {t.booking.modalSubtitle}
              </p>
            </div>

            {/* Mode Switcher: Online Token vs. WhatsApp */}
            <div className="grid grid-cols-2 p-1 rounded-2xl bg-[#faf7f0] border border-[#2b4c1c]/15 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setBookingMode("online")}
                className={`py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                  bookingMode === "online"
                    ? "bg-[#2b4c1c] text-white shadow-xs"
                    : "text-[#526048] hover:text-[#1e2917]"
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>{t.booking.tabOnlineToken}</span>
              </button>
              <button
                type="button"
                onClick={() => setBookingMode("whatsapp")}
                className={`py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                  bookingMode === "whatsapp"
                    ? "bg-[#2b4c1c] text-white shadow-xs"
                    : "text-[#526048] hover:text-[#1e2917]"
                }`}
              >
                <Send className="w-3.5 h-3.5" />
                <span>{t.booking.tabWhatsApp}</span>
              </button>
            </div>

            <form onSubmit={bookingMode === "online" ? handleOnlineTokenPayment : handleWhatsAppInquiry} className="space-y-4">
              {/* Category Pills */}
              <div>
                <label className="block text-xs font-semibold text-[#1e2917] mb-2">
                  {t.booking.visitTypeLabel}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "School", label: t.booking.school, icon: GraduationCap },
                    { id: "Corporate", label: t.booking.corporate, icon: Briefcase },
                    { id: "Family", label: t.booking.family, icon: Users },
                  ].map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setVisitType(type.id as any)}
                        className={`py-2.5 px-2 rounded-2xl border text-xs font-medium flex flex-col items-center justify-center gap-1 transition-all ${
                          visitType === type.id
                            ? "bg-[#2b4c1c] text-white border-[#2b4c1c] shadow-xs"
                            : "bg-[#faf7f0] text-[#4a5840] border-[#2b4c1c]/15 hover:bg-[#f5f0e6]"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-[11px] leading-tight text-center">{type.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Campus Selection */}
              <div>
                <label className="block text-xs font-semibold text-[#1e2917] mb-2">
                  {t.booking.farmSelectLabel}
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setFarmLocation("Bhongir")}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      farmLocation === "Bhongir"
                        ? "bg-[#2b4c1c]/10 border-[#2b4c1c] text-[#14230e] font-semibold"
                        : "bg-[#faf7f0] border-[#2b4c1c]/15 text-[#526048]"
                    }`}
                  >
                    <div className="flex items-center gap-1 font-bold">
                      <MapPin className="w-3.5 h-3.5 text-[#8a4724]" />
                      Bhongir Main Farm
                    </div>
                    <span className="text-[10px] text-[#6e7d64] block mt-0.5">15+ Acres • NH 163 Warangal Hwy</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFarmLocation("Moinabad")}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      farmLocation === "Moinabad"
                        ? "bg-[#2b4c1c]/10 border-[#2b4c1c] text-[#14230e] font-semibold"
                        : "bg-[#faf7f0] border-[#2b4c1c]/15 text-[#526048]"
                    }`}
                  >
                    <div className="flex items-center gap-1 font-bold">
                      <MapPin className="w-3.5 h-3.5 text-[#8a4724]" />
                      Moinabad Agro-Sanctuary
                    </div>
                    <span className="text-[10px] text-[#6e7d64] block mt-0.5">12+ Acres • Chilkur Balaji Corridor</span>
                  </button>
                </div>
              </div>

              {/* Conditional Name / Org */}
              {visitType === "School" || visitType === "Corporate" ? (
                <div>
                  <label className="block text-xs font-semibold text-[#1e2917] mb-1">
                    {t.booking.orgLabel} *
                  </label>
                  <input
                    type="text"
                    required
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder={t.booking.orgPlaceholder}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#2b4c1c]/20 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-[#2b4c1c]/30 text-[#14230e]"
                  />
                </div>
              ) : null}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1e2917] mb-1">
                    {t.booking.nameLabel} *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.booking.namePlaceholder}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#2b4c1c]/20 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-[#2b4c1c]/30 text-[#14230e]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1e2917] mb-1">
                    {t.booking.phoneLabel} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t.booking.phonePlaceholder}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#2b4c1c]/20 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-[#2b4c1c]/30 text-[#14230e]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1e2917] mb-1">
                    {t.booking.dateLabel} *
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#2b4c1c]/20 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-[#2b4c1c]/30 text-[#14230e]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1e2917] mb-1">
                    {t.booking.headcountLabel}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="1500"
                    value={headcount}
                    onChange={(e) => setHeadcount(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#2b4c1c]/20 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-[#2b4c1c]/30 text-[#14230e]"
                  />
                </div>
              </div>

              {/* Online Token Pricing Breakdown Box */}
              {bookingMode === "online" && (
                <div className="p-4 rounded-2xl bg-[#f0f7ec] border border-[#2b4c1c]/20 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-[#526048]">
                    <span>{t.booking.perPersonEst}</span>
                    <span className="font-semibold text-[#1e2917]">₹{ratePerPerson} / Person</span>
                  </div>
                  <div className="flex items-center justify-between text-[#526048]">
                    <span>Total Estimated Package:</span>
                    <span className="font-semibold text-[#1e2917]">₹{totalEstimated.toLocaleString()}</span>
                  </div>
                  <div className="pt-2 border-t border-[#2b4c1c]/15 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[#2b4c1c] block">{t.booking.tokenPayableNow}</span>
                      <span className="text-[10px] text-[#6e7d64]">Secures your farm slot and instructor batch</span>
                    </div>
                    <span className="font-serif font-black text-lg text-[#2b4c1c]">₹{advanceToken.toLocaleString()}</span>
                  </div>
                </div>
              )}

              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-2xl bg-[#2b4c1c] hover:bg-[#1e3614] text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>{t.booking.processing}</span>
                ) : bookingMode === "online" ? (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>{t.booking.payTokenBtn}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{t.booking.submitWhatsAppBtn}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
}
