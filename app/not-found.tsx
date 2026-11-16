import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Compass, Home, Phone, ArrowLeft, ShieldCheck, MapPin, Search } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Page Not Found (404)",
  description:
    "The requested page on One Day Kissan could not be found. Explore our 360° virtual farm tour, educational school itineraries, and directions to Bhongir and Moinabad campuses.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#faf7f0] text-[#1e2617] flex flex-col justify-between">
      {/* Top Banner */}
      <header className="border-b border-[#2b4c1c]/15 bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#2b4c1c] hover:text-[#1a3811] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to One Day Kissan</span>
          </Link>
          <div className="flex items-center gap-2 text-xs font-mono text-[#8a4724]">
            <MapPin className="w-3.5 h-3.5 text-[#2b4c1c]" />
            <span>Bhongir & Moinabad Campuses</span>
          </div>
        </div>
      </header>

      {/* Main 404 Container */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
        <Breadcrumbs items={[{ label: "Page Not Found" }]} />

        <div className="mt-8 mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#2b4c1c]/10 border border-[#2b4c1c]/20 text-3xl font-serif font-black text-[#2b4c1c]">
          404
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-[#14230e]">
          Lost in the living fields?
        </h1>

        <p className="mt-4 text-sm sm:text-base text-[#4a5840] max-w-lg mx-auto leading-relaxed">
          It looks like this farm pathway has ended or the page has moved. Let&apos;s guide you back to the living soil and active farm activities.
        </p>

        {/* Quick Nav Destination Cards */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          <Link
            href="/"
            prefetch={true}
            className="p-5 rounded-2xl bg-white border border-[#2b4c1c]/15 hover:border-[#2b4c1c]/40 hover:shadow-md transition-all group"
          >
            <div className="w-9 h-9 rounded-full bg-[#2b4c1c]/10 text-[#2b4c1c] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Home className="w-4 h-4" />
            </div>
            <h3 className="font-serif font-bold text-sm text-[#14230e]">Main Farm Home</h3>
            <p className="mt-1 text-xs text-[#526048]">Explore the complete agrarian story and daily timeline.</p>
          </Link>

          <Link
            href="/#tour360"
            className="p-5 rounded-2xl bg-white border border-[#2b4c1c]/15 hover:border-[#2b4c1c]/40 hover:shadow-md transition-all group"
          >
            <div className="w-9 h-9 rounded-full bg-[#8a4724]/10 text-[#8a4724] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Compass className="w-4 h-4" />
            </div>
            <h3 className="font-serif font-bold text-sm text-[#14230e]">360° Virtual Tour</h3>
            <p className="mt-1 text-xs text-[#526048]">Look across the horizons of Bhongir & Moinabad.</p>
          </Link>

          <Link
            href="/safety"
            prefetch={true}
            className="p-5 rounded-2xl bg-white border border-[#2b4c1c]/15 hover:border-[#2b4c1c]/40 hover:shadow-md transition-all group"
          >
            <div className="w-9 h-9 rounded-full bg-[#2b4c1c]/10 text-[#2b4c1c] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="font-serif font-bold text-sm text-[#14230e]">Safety & Standards</h3>
            <p className="mt-1 text-xs text-[#526048]">Review our 1:25 instructor ratio and hygiene standards.</p>
          </Link>
        </div>

        {/* Primary Action Button */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-semibold text-white bg-[#2b4c1c] hover:bg-[#1e3614] shadow-md transition-all"
          >
            Return to Homepage
          </Link>
          <a
            href="tel:9849798674"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full text-xs font-semibold text-[#14230e] bg-white border border-[#2b4c1c]/20 hover:bg-[#2b4c1c]/5 transition-all flex items-center justify-center gap-2"
          >
            <Phone className="w-3.5 h-3.5 text-[#8a4724]" />
            <span>Call Helpdesk (+91 98497 98674)</span>
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#2b4c1c]/15 bg-white py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#526048]">
          <span>© {new Date().getFullYear()} One Day Kissan. All Rights Reserved.</span>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-[#14230e] underline">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#14230e] underline">Terms of Entry</Link>
            <Link href="/cancellation-refunds" className="hover:text-[#14230e] underline">Refund & Cancellation</Link>
            <Link href="/safety" className="hover:text-[#14230e] underline">Safety Standards</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
