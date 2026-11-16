"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Compass, Phone, ArrowRight, Sparkles, Globe, Shield } from "lucide-react";
import { trackPhoneCall } from "@/components/Analytics";
import { useLanguage } from "@/context/LanguageContext";

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 15);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: t.nav.story, href: "/#prologue" },
    { label: t.nav.tour360, href: "/#tour360", badge: "360°" },
    { label: t.nav.directions, href: "/#directions" },
    { label: t.nav.schools, href: "/#schools" },
    { label: t.nav.gallery, href: "/#gallery" },
    { label: t.nav.reviews, href: "/#testimonials" },
    { label: t.nav.faqs, href: "/#planner" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex justify-center px-4 ${
          isScrolled ? "pt-2.5" : "pt-4"
        }`}
      >
        <motion.nav
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`w-full max-w-6xl rounded-full transition-all duration-300 flex items-center justify-between px-6 py-2.5 ${
            isScrolled
              ? "bg-[#ffffff]/95 backdrop-blur-xl border border-[#2b4c1c]/15 shadow-[0_10px_35px_-5px_rgba(43,76,28,0.08)]"
              : "bg-[#ffffff]/80 backdrop-blur-md border border-[#2b4c1c]/10 shadow-[0_4px_20px_rgba(43,76,28,0.04)]"
          }`}
        >
          {/* Brand Identity - Clickable to Home */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-[#2b4c1c]/20 bg-[#faf7f0] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <img
                src="/images/logo.png"
                alt="One Day Kissan - India's Premier Farm-Based Edutainment Destination"
                width={40}
                height={40}
                className="w-full h-full object-contain p-0.5"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif font-bold text-base tracking-tight text-[#1a2713] group-hover:text-[#2b4c1c] transition-colors leading-tight">
                One Day Kissan
              </span>
              <span className="text-[10px] text-[#8a5738] font-medium tracking-wider uppercase">
                Edutainment Farms
              </span>
            </div>
          </Link>

          {/* Clean Single-Line Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium text-[#4a5840] hover:text-[#1a2713] hover:bg-[#f5f0e6]/70 transition-all flex items-center gap-1.5 whitespace-nowrap"
              >
                {item.label}
                {item.badge && (
                  <span className="inline-flex items-center gap-1 text-[9px] font-semibold tracking-wide uppercase px-1.5 py-0.2 rounded-full bg-[#2b4c1c]/10 text-[#2b4c1c] border border-[#2b4c1c]/20">
                    <span className="w-1 h-1 rounded-full bg-[#2b4c1c] animate-pulse" />
                    {item.badge}
                  </span>
                )}
              </a>
            ))}
          </div>

          {/* Right Action Concierge */}
          <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
            {/* Language Switcher Pill */}
            <div className="flex items-center rounded-full bg-[#faf7f0] border border-[#2b4c1c]/15 p-0.5 text-[11px] font-semibold shadow-xs">
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  language === "en"
                    ? "bg-[#2b4c1c] text-white shadow-xs"
                    : "text-[#526048] hover:text-[#1a2713]"
                }`}
                title="Switch to English"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage("te")}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  language === "te"
                    ? "bg-[#2b4c1c] text-white shadow-xs"
                    : "text-[#526048] hover:text-[#1a2713]"
                }`}
                title="తెలుగు భాషకు మారండి"
              >
                తెలుగు
              </button>
            </div>

            <a
              href="tel:9849798674"
              onClick={() => trackPhoneCall("9849798674")}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 transition-all flex items-center gap-1.5 whitespace-nowrap shadow-xs"
              title="Call Helpline"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-700" />
              <span>{t.nav.callHelpline}</span>
            </a>

            <Link
              href="/admin"
              className="p-1.5 rounded-full text-[#4a5840] hover:text-[#1a2713] hover:bg-[#faf7f0] border border-transparent hover:border-[#2b4c1c]/15 transition-all"
              title={t.nav.adminPortal}
            >
              <Shield className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={onOpenBooking}
              className="px-5 py-2 rounded-full text-xs font-semibold text-white bg-[#2b4c1c] hover:bg-[#1e3614] shadow-sm hover:shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-1.5 whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-white/80" />
              <span>{t.nav.bookVisit}</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full text-[#2b4c1c] hover:bg-[#f0e8db] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </motion.nav>
      </header>

      {/* Mobile Drawer with Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-x-4 top-20 z-40 rounded-3xl bg-[#ffffff] p-6 border border-[#2b4c1c]/15 shadow-2xl backdrop-blur-2xl lg:hidden flex flex-col gap-3 max-h-[calc(100vh-6rem)] overflow-y-auto"
            >
              <div className="flex flex-col gap-1 pb-4 border-b border-[#2b4c1c]/10">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-sm font-medium text-[#3b4832] hover:text-[#1e2917] hover:bg-[#f6f0e4] transition-colors flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      {item.label}
                      {item.badge && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#2b4c1c]/10 text-[#2b4c1c] font-semibold border border-[#2b4c1c]/20">
                          {item.badge}
                        </span>
                      )}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#8a5738]" />
                  </a>
                ))}
              </div>

              {/* Mobile Language Switcher */}
              <div className="flex items-center justify-between py-2 px-1 border-b border-[#2b4c1c]/10 text-xs">
                <span className="text-[#526048] font-medium flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#2b4c1c]" />
                  Language / భాష
                </span>
                <div className="flex items-center rounded-full bg-[#faf7f0] border border-[#2b4c1c]/15 p-0.5 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setLanguage("en")}
                    className={`px-3 py-1 rounded-full transition-all ${
                      language === "en"
                        ? "bg-[#2b4c1c] text-white shadow-xs"
                        : "text-[#526048]"
                    }`}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage("te")}
                    className={`px-3 py-1 rounded-full transition-all ${
                      language === "te"
                        ? "bg-[#2b4c1c] text-white shadow-xs"
                        : "text-[#526048]"
                    }`}
                  >
                    తెలుగు
                  </button>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2.5">
                <a
                  href="tel:9849798674"
                  onClick={() => trackPhoneCall("9849798674")}
                  className="w-full py-3 rounded-2xl bg-[#faf7f0] border border-[#2b4c1c]/15 text-xs font-semibold text-[#1e2917] flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#2b4c1c]" />
                  Call +91 98497 98674
                </a>

                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 rounded-2xl bg-white border border-[#2b4c1c]/15 text-xs font-semibold text-[#4a5840] hover:text-[#1e2917] flex items-center justify-center gap-2"
                >
                  <Shield className="w-3.5 h-3.5 text-[#2b4c1c]" />
                  {t.nav.adminPortal}
                </Link>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full py-3.5 rounded-2xl text-xs font-semibold text-white bg-[#2b4c1c] hover:bg-[#1e3614] shadow-md flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-white/80" />
                  {t.nav.bookVisit}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
