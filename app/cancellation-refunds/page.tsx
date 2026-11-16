import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, RefreshCw, CloudRain, Clock, AlertCircle, CheckCircle2, Mail, Phone } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Cancellation, Rescheduling & Refund Policy",
  description:
    "Official Cancellation, Weather Rescheduling, and Refund Policy for One Day Kissan bookings (Schools, Corporates, and Family Passes).",
  alternates: {
    canonical: "https://onedaykissan.vercel.app/cancellation-refunds",
  },
};

export default function CancellationRefundPage() {
  const lastUpdated = "November 16, 2026";

  return (
    <div className="min-h-screen bg-[#faf7f0] text-[#1e2617]">
      {/* Top Banner & Navigation */}
      <header className="border-b border-[#2b4c1c]/15 bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            prefetch={true}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#2b4c1c] hover:text-[#1a3811] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to One Day Kissan</span>
          </Link>
          <div className="flex items-center gap-2 text-xs font-mono text-[#8a4724]">
            <RefreshCw className="w-4 h-4 text-[#2b4c1c]" />
            <span>Clear & Fair Policies</span>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <Breadcrumbs items={[{ label: "Institutional Compliance" }, { label: "Cancellation & Refunds" }]} />

        <div className="mt-6 mb-10 text-center sm:text-left border-b border-[#2b4c1c]/15 pb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2b4c1c]/10 text-[#2b4c1c] border border-[#2b4c1c]/20 text-xs font-mono uppercase tracking-widest mb-4">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Consumer Transparent Guidelines</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-[#14230e]">
            Cancellation, Rescheduling & Refund Policy
          </h1>
          <p className="mt-3 text-sm text-[#526048]">
            Effective Date: November 1, 2024 • Last Reviewed & Updated: {lastUpdated}
          </p>
        </div>

        <div className="space-y-10 text-sm sm:text-base leading-relaxed text-[#2f3d26]">
          {/* Section 1: Overview */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14230e] flex items-center gap-2">
              <span className="text-[#8a4724]">1.</span> Fair Hospitality Commitment
            </h2>
            <p>
              At <strong>One Day Kisan</strong>, we recognize that school academic calendars, corporate project deadlines, and family circumstances can change unexpectedly. We strive to provide transparent, flexible, and fair cancellation and rescheduling policies while balancing the logistical reality of reserving dedicated farm instructors, preparing fresh village buffets, and procuring raw harvest produce.
            </p>
          </section>

          {/* Section 2: Weather Contingency */}
          <section className="space-y-3 p-6 rounded-2xl bg-[#ffffff] border border-[#2b4c1c]/15 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14230e] flex items-center gap-2">
              <CloudRain className="w-5 h-5 text-[#8a4724]" />
              <span>2. Weather & Monsoon Contingency Protocol</span>
            </h2>
            <p>
              As an authentic agricultural sanctuary, farming in Telangana has co-existed with natural seasons for millennia:
            </p>
            <ul className="space-y-2 list-none pl-2 text-xs sm:text-sm">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2b4c1c] mt-1 flex-shrink-0" />
                <span>
                  <strong>Light Rain & Monsoon Showers:</strong> Operations proceed normally! In fact, barefoot paddy transplantation, clay sculpting, and the mud arena are especially magical and memorable under gentle rain. All campuses feature vast covered rustic pavilions, gazebo dining sheds, and sheltered demonstration halls.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2b4c1c] mt-1 flex-shrink-0" />
                <span>
                  <strong>Severe Weather & Cyclone Warnings:</strong> In the event of government red alerts, severe thunderstorms, or flooding that impairs highway travel, One Day Kisan offers <strong>100% Free Rescheduling</strong> to any convenient date within 90 days.
                </span>
              </li>
            </ul>
          </section>

          {/* Section 3: Slabs by Booking Category */}
          <section className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14230e] flex items-center gap-2">
              <span className="text-[#8a4724]">3.</span> Cancellation Slabs by Audience
            </h2>

            {/* School Batches */}
            <div className="p-6 rounded-2xl bg-white border border-[#2b4c1c]/15 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-lg text-[#14230e]">
                  A. School & College Institutional Batches
                </h3>
                <span className="field-note-tag text-[10px]">Large Group Bookings</span>
              </div>
              <p className="text-xs sm:text-sm text-[#526048]">
                Because school trips require dedicated instructor allocation (1:25 ratio) and high-volume fresh catering from local farm women, the following notice periods apply:
              </p>
              <ul className="space-y-2 text-xs sm:text-sm pl-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#2b4c1c] font-bold">✓</span>
                  <span><strong>7+ Days Prior Notice:</strong> 90% refund of the advance token, or 100% credit transfer to any rescheduled school date in the current academic year.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8a4724] font-bold">✓</span>
                  <span><strong>3 to 7 Days Prior Notice:</strong> 50% refund, or free date adjustment with no administrative fees.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-700 font-bold">✕</span>
                  <span><strong>Less than 48 Hours:</strong> Token is non-refundable due to farm procurement commitments. However, schools may reschedule their batch with a nominal catering replenishment fee.</span>
                </li>
              </ul>
            </div>

            {/* Corporates */}
            <div className="p-6 rounded-2xl bg-white border border-[#2b4c1c]/15 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-lg text-[#14230e]">
                  B. Corporate Outings & Offsites
                </h3>
                <span className="field-note-tag text-[10px]">Team Retreats</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm pl-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#2b4c1c] font-bold">✓</span>
                  <span><strong>5+ Days Prior Notice:</strong> 85% refund, or 100% full credit transfer toward a future offsite date.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8a4724] font-bold">✓</span>
                  <span><strong>48 Hours to 5 Days Notice:</strong> 50% refund or full date transfer.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-700 font-bold">✕</span>
                  <span><strong>Less than 48 Hours:</strong> Non-refundable for same-day cancel; date adjustment allowed upon payment of food replenishment costs.</span>
                </li>
              </ul>
            </div>

            {/* Family Passes */}
            <div className="p-6 rounded-2xl bg-white border border-[#2b4c1c]/15 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-lg text-[#14230e]">
                  C. Family Weekend Day Passes
                </h3>
                <span className="field-note-tag text-[10px]">Individual / Family Passes</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm pl-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#2b4c1c] font-bold">✓</span>
                  <span><strong>Up to 24 Hours Prior to Visit Date:</strong> 100% Full Refund or instant date change with zero deductions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8a4724] font-bold">✓</span>
                  <span><strong>Same Day Reschedule:</strong> If a family member falls sick on the morning of the visit, simply message our WhatsApp concierge prior to 10:00 AM to transfer your passes to any upcoming Saturday, Sunday, or public holiday.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 4: Refund Timelines */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14230e] flex items-center gap-2">
              <span className="text-[#8a4724]">4.</span> Refund Processing Timelines
            </h2>
            <p>
              Approved refunds are credited directly back to the original source payment method (Bank Account, UPI, Debit Card, or Credit Card). In accordance with standard banking and payment gateway clearing cycles:
            </p>
            <ul className="space-y-1.5 list-disc pl-6 text-sm">
              <li><strong>UPI & Net Banking:</strong> 2 to 4 business days.</li>
              <li><strong>Credit / Debit Cards:</strong> 5 to 7 business days depending on the card issuer.</li>
              <li><strong>Institutional NEFT / RTGS:</strong> 3 to 5 business days post submission of cancelled cheque / bank account details.</li>
            </ul>
          </section>

          {/* Section 5: How to Submit a Request */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14230e] flex items-center gap-2">
              <span className="text-[#8a4724]">5.</span> How to Request Cancellation or Rescheduling
            </h2>
            <p>
              To process your request expeditiously, please provide your Booking Name, Contact Number, and Preferred Rescheduled Date via any of the following channels:
            </p>

            <div className="p-6 rounded-2xl bg-[#f5f0e6] border border-[#2b4c1c]/15 space-y-2 text-xs sm:text-sm">
              <div className="font-bold text-[#14230e] text-base">One Day Kisan Expeditions Desk</div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#2b4c1c] flex-shrink-0" />
                <span>
                  WhatsApp / Phone:{" "}
                  <a href="tel:9849798674" className="hover:underline text-[#2b4c1c] font-semibold">+91 98497 98674</a>
                  {" / "}
                  <a href="tel:9398357618" className="hover:underline text-[#2b4c1c] font-semibold">+91 93983 57618</a>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#2b4c1c] flex-shrink-0" />
                <span>
                  Email:{" "}
                  <a href="mailto:info@onedaykisan.com" className="hover:underline text-[#2b4c1c] font-semibold">info@onedaykisan.com</a>
                </span>
              </div>
              <div className="text-[#526048] pt-2">
                Our support team is available 7 days a week from 8:30 AM to 6:30 PM.
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer Return Bar */}
      <footer className="border-t border-[#2b4c1c]/15 bg-white py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#526048]">
          <span>© {new Date().getFullYear()} One Day Kissan. All Rights Reserved.</span>
          <div className="flex items-center gap-4">
            <Link href="/privacy" prefetch={true} className="hover:text-[#14230e] underline">Privacy Policy</Link>
            <Link href="/terms" prefetch={true} className="hover:text-[#14230e] underline">Terms & Conditions</Link>
            <Link href="/safety" prefetch={true} className="hover:text-[#14230e] underline">Safety Standards</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
