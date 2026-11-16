"use client";

import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Download, ArrowUp, Instagram, Facebook, Youtube, Linkedin, ShieldCheck, FileText, RefreshCw, HeartPulse } from "lucide-react";
import { trackPhoneCall } from "@/components/Analytics";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[#2b4c1c]/15 bg-[#f5f0e6] text-[#2f3d26] pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#2b4c1c]/15">
          {/* Brand & Manifesto */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-[#2b4c1c]/20 bg-[#ffffff] flex items-center justify-center">
                <img
                  src="/images/logo.png"
                  alt="One Day Kisan - India's Premier Farm-Based Edutainment Destination"
                  className="w-full h-full object-contain p-0.5"
                />
              </div>
              <span className="font-serif font-bold text-lg text-[#1e2917]">
                One Day Kisan
              </span>
            </div>

            <p className="text-xs text-[#526048] leading-relaxed font-light max-w-sm mb-6">
              India&apos;s First Farm-Based Edutainment Destination. Reconnecting urban schools, corporate teams, and families to living Indian agricultural heritage, water engineering, and living soil stewardship.
            </p>

            <a
              href="https://www.onedaykisan.com/wp-content/uploads/2024/08/ONE-DAY-KISAN-2024.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ffffff] text-xs font-semibold text-[#2b4c1c] hover:bg-[#e8ded0] border border-[#2b4c1c]/20 transition-all shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-[#8a4724]" />
              Download Official 2024–2025 Brochure (PDF)
            </a>

            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://www.instagram.com/onedaykisan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#ffffff] border border-[#2b4c1c]/15 flex items-center justify-center text-[#2b4c1c] hover:bg-[#2b4c1c] hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/onedaykisan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#ffffff] border border-[#2b4c1c]/15 flex items-center justify-center text-[#2b4c1c] hover:bg-[#2b4c1c] hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@onedaykisan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#ffffff] border border-[#2b4c1c]/15 flex items-center justify-center text-[#2b4c1c] hover:bg-[#2b4c1c] hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/onedaykisan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#ffffff] border border-[#2b4c1c]/15 flex items-center justify-center text-[#2b4c1c] hover:bg-[#2b4c1c] hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Farm Campuses */}
          <div>
            <h4 className="font-serif font-bold text-sm text-[#14230e] mb-3">
              Campus Locations
            </h4>
            
            <div className="mb-4">
              <div className="font-semibold text-xs text-[#14230e] flex items-center gap-1.5 mb-1">
                <MapPin className="w-3.5 h-3.5 text-[#2b4c1c]" />
                <span>Bhongir Main Farm (15+ Ac)</span>
              </div>
              <p className="text-[11px] text-[#526548] leading-relaxed mb-1.5">
                Near Hotel Vivera, Hyderabad - Warangal Highway (NH 163), Bhongir Bypass - 508 116
              </p>
              <a
                href="https://maps.google.com/?q=One+Day+Kisan+Bhongir"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-[#2b4c1c] hover:underline font-semibold"
              >
                Maps Navigation →
              </a>
            </div>

            <div>
              <div className="font-semibold text-xs text-[#14230e] flex items-center gap-1.5 mb-1">
                <MapPin className="w-3.5 h-3.5 text-[#8a4724]" />
                <span>Moinabad Sanctuary (12+ Ac)</span>
              </div>
              <p className="text-[11px] text-[#526548] leading-relaxed mb-1.5">
                Kapil Agro Farms, Sriramnagar, Chilkur Balaji Corridor, Moinabad - 501 504
              </p>
              <a
                href="https://maps.google.com/?q=Kapil+Agro+Farms+Moinabad"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-[#8a4724] hover:underline font-semibold"
              >
                Maps Navigation →
              </a>
            </div>
          </div>

          {/* Legal & Governance Compliance */}
          <div>
            <h4 className="font-serif font-bold text-sm text-[#14230e] mb-3">
              Institutional Compliance
            </h4>
            <div className="space-y-2 text-xs">
              <Link
                href="/privacy"
                className="flex items-center gap-2 text-[#526048] hover:text-[#14230e] transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#2b4c1c]" />
                <span>Privacy & DPDP Governance</span>
              </Link>
              <Link
                href="/terms"
                className="flex items-center gap-2 text-[#526048] hover:text-[#14230e] transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-[#2b4c1c]" />
                <span>Terms of Entry & Rules</span>
              </Link>
              <Link
                href="/cancellation-refunds"
                className="flex items-center gap-2 text-[#526048] hover:text-[#14230e] transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#2b4c1c]" />
                <span>Cancellation & Weather Policy</span>
              </Link>
              <Link
                href="/safety"
                className="flex items-center gap-2 text-[#526048] hover:text-[#14230e] transition-colors"
              >
                <HeartPulse className="w-3.5 h-3.5 text-[#8a4724]" />
                <span>Farm Safety & Child Protection</span>
              </Link>
            </div>

            <div className="mt-4 pt-3 border-t border-[#2b4c1c]/10 text-[11px] text-[#6e7d64]">
              CBSE & ICSE Practical Curriculum Aligned
            </div>
          </div>

          {/* Direct Desk & Grievance */}
          <div>
            <h4 className="font-serif font-bold text-sm text-[#1e2917] mb-3">
              Helpdesk & Grievance
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href="tel:9849798674"
                onClick={() => trackPhoneCall("9849798674")}
                className="flex items-center gap-2 text-[#2b4c1c] font-medium hover:underline"
              >
                <Phone className="w-3.5 h-3.5 text-[#8a4724]" />
                <span>+91 98497 98674</span>
              </a>
              <a
                href="tel:9398357618"
                onClick={() => trackPhoneCall("9398357618")}
                className="flex items-center gap-2 text-[#2b4c1c] font-medium hover:underline"
              >
                <Phone className="w-3.5 h-3.5 text-[#8a4724]" />
                <span>+91 93983 57618</span>
              </a>
              <a href="mailto:info@onedaykisan.com" className="flex items-center gap-2 text-[#526048] hover:underline">
                <Mail className="w-3.5 h-3.5 text-[#2b4c1c]" />
                <span>info@onedaykisan.com</span>
              </a>
            </div>
            <div className="mt-4 pt-4 border-t border-[#2b4c1c]/10 text-[11px] text-[#6e7d64]">
              Operating Hours: 9:00 AM – 6:00 PM (All 7 Days)
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6e7d64]">
          <div>
            © {new Date().getFullYear()} One Day Kisan. Experience Life. Learn Real Farming.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link href="/privacy" className="hover:text-[#1e2917]">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#1e2917]">Terms of Entry</Link>
            <Link href="/cancellation-refunds" className="hover:text-[#1e2917]">Cancellation & Refunds</Link>
            <Link href="/safety" className="hover:text-[#1e2917]">Safety Standards</Link>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-[#ffffff] border border-[#2b4c1c]/15 hover:bg-[#e8ded0] text-[#1e2917]"
              title="Return to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

