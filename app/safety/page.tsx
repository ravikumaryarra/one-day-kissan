import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, HeartPulse, Utensils, Droplets, Users, Bus, AlertTriangle, CheckCircle2 } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Farm Safety, Health & Child Protection Standards",
  description:
    "Comprehensive safety protocols, 1:25 instructor ratios, RO water hygiene, FSSAI meals, and hospital readiness for schools and families at One Day Kissan.",
  alternates: {
    canonical: "https://onedaykissan.vercel.app/safety",
  },
};

export default function SafetyPage() {
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
            <ShieldCheck className="w-4 h-4 text-[#2b4c1c]" />
            <span>Child & Visitor Safety Standard</span>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <Breadcrumbs items={[{ label: "Institutional Compliance" }, { label: "Safety & Child Protection" }]} />

        <div className="mt-6 mb-10 text-center sm:text-left border-b border-[#2b4c1c]/15 pb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2b4c1c]/10 text-[#2b4c1c] border border-[#2b4c1c]/20 text-xs font-mono uppercase tracking-widest mb-4">
            <HeartPulse className="w-3.5 h-3.5 text-[#2b4c1c]" />
            <span>Institutional Safety & Hygiene</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-[#14230e]">
            Farm Safety, Health & Child Protection
          </h1>
          <p className="mt-3 text-sm text-[#526048]">
            Compliance Manual for Principals, Teachers, Parents, and Corporate Leaders • Updated: {lastUpdated}
          </p>
        </div>

        <div className="space-y-10 text-sm sm:text-base leading-relaxed text-[#2f3d26]">
          {/* Section 1: Overview */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14230e] flex items-center gap-2">
              <span className="text-[#8a4724]">1.</span> Safety First Philosophy
            </h2>
            <p>
              Over 350+ esteemed educational institutions—including prominent CBSE, ICSE, and International Baccalaureate schools—choose <strong>One Day Kisan</strong> because our experiential learning occurs within a rigorously managed, fenced, and hygienic agrarian ecosystem.
            </p>
            <p>
              We believe children learn best when they can run barefoot in the mud, climb watchtowers, and touch farm animals without artificial fears, protected by quiet, institutional safety standards behind the scenes.
            </p>
          </section>

          {/* Section 2: Child Protection & Staff Standards */}
          <section className="space-y-4 p-6 rounded-2xl bg-white border border-[#2b4c1c]/15 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14230e] flex items-center gap-2">
              <Users className="w-5 h-5 text-[#2b4c1c]" />
              <span>2. Child Protection (POCSO) & Staff Mentorship</span>
            </h2>
            <ul className="space-y-3 list-none pl-2 text-xs sm:text-sm">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2b4c1c] mt-0.5 flex-shrink-0" />
                <span>
                  <strong>1:25 Instructor-to-Student Ratio:</strong> Visiting school cohorts are divided into manageable squads of 25 students, each led by an experienced agrarian instructor who remains with the squad throughout the entire day.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2b4c1c] mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Background Verified Staff:</strong> Every full-time farm educator, craft master, and kitchen staff member undergoes background verification and sensitization training in accordance with POCSO (Protection of Children from Sexual Offences) norms.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2b4c1c] mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Secure Perimeter & Gate Control:</strong> Both the 15-acre Bhongir campus and the 12-acre Moinabad campus feature continuous perimeter fencing with 24/7 security personnel stationed at all ingress/egress points. No student may exit without written authorization from their escort teacher.
                </span>
              </li>
            </ul>
          </section>

          {/* Section 3: Water, Food & Sanitation */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14230e] flex items-center gap-2">
              <Utensils className="w-5 h-5 text-[#8a4724]" />
              <span>3. Food Hygiene, RO Water & Restroom Facilities</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-[#2b4c1c]/15 shadow-xs">
                <div className="flex items-center gap-2 mb-2 font-serif font-bold text-[#14230e]">
                  <Droplets className="w-4 h-4 text-[#2b4c1c]" />
                  <span>Pure RO Drinking Water</span>
                </div>
                <p className="text-xs text-[#526048] leading-relaxed">
                  Multiple multi-stage Reverse Osmosis (RO) drinking water dispenser hubs are installed across the campus. Water purity is periodically tested to ensure zero microbiological contamination.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#2b4c1c]/15 shadow-xs">
                <div className="flex items-center gap-2 mb-2 font-serif font-bold text-[#14230e]">
                  <Utensils className="w-4 h-4 text-[#8a4724]" />
                  <span>Farm-Fresh Traditional Buffet</span>
                </div>
                <p className="text-xs text-[#526048] leading-relaxed">
                  Meals are cooked fresh on-site in a high-capacity, screened community kitchen adhering to strict FSSAI food hygiene parameters. Traditional, easily digestible, mild vegetarian cuisine is served piping hot.
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#526048] pt-1">
              <strong>Dedicated Washroom Blocks:</strong> Clean, sanitized western and Indian style restrooms with continuous running water and antibacterial soap dispensers are maintained throughout the day, with separate blocks for boys, girls, female teachers, and male teachers.
            </p>
          </section>

          {/* Section 4: Water Bodies & Hydraulic Safeguards */}
          <section className="space-y-3 p-6 rounded-2xl bg-[#ffffff] border border-[#2b4c1c]/15 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14230e] flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#8a4724]" />
              <span>4. Physical Safeguards near Water Engineering Installations</span>
            </h2>
            <p>
              Demonstrations involving the Persian Wheel (Rahat), Archimedes Screw, and traditional Mota Bavi stone wells are engineered with high structural safety:
            </p>
            <ul className="space-y-2 list-none pl-2 text-xs sm:text-sm">
              <li className="flex items-start gap-2">
                <span className="text-[#2b4c1c] font-bold">•</span>
                <span>Deep stone wells feature raised stone parapets, heavy-duty stainless steel security grilles, and mesh covers to eliminate falling hazards.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#2b4c1c] font-bold">•</span>
                <span>Paddy mud arenas have controlled water depth (6 to 12 inches) with gravel-free, filtered red agricultural loam to ensure safe barefoot running and splashing.</span>
              </li>
            </ul>
          </section>

          {/* Section 5: First Aid & Emergency Protocol */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14230e] flex items-center gap-2">
              <HeartPulse className="w-5 h-5 text-[#2b4c1c]" />
              <span>5. First Aid Station & Hospital Readiness</span>
            </h2>
            <p>
              Both campuses maintain a dedicated First Aid post equipped with antiseptic solutions, sterile dressings, burn treatments, ORS hydration sachets, and insect sting relief medications administered by trained personnel.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#f5f0e6] border border-[#2b4c1c]/15 text-xs">
                <div className="font-bold text-[#14230e] mb-1">Bhongir Campus Emergency Tie-Up</div>
                <div className="text-[#526048]">Bhongir Area Hospital / Private Emergency Care Center • Distance: 8 Mins (~4.5 km)</div>
                <div className="text-[#2b4c1c] font-medium mt-1">Dedicated emergency vehicle on standby at all times.</div>
              </div>

              <div className="p-4 rounded-xl bg-[#f5f0e6] border border-[#2b4c1c]/15 text-xs">
                <div className="font-bold text-[#14230e] mb-1">Moinabad Campus Emergency Tie-Up</div>
                <div className="text-[#526048]">Bhaskar Medical College & General Hospital, Moinabad • Distance: 10 Mins (~6 km)</div>
                <div className="text-[#2b4c1c] font-medium mt-1">Dedicated emergency vehicle on standby at all times.</div>
              </div>
            </div>
          </section>

          {/* Section 6: Bus Drivers & Transport Logistics */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14230e] flex items-center gap-2">
              <Bus className="w-5 h-5 text-[#8a4724]" />
              <span>6. School Bus Parking & Driver Hospitality</span>
            </h2>
            <p>
              We recognize that bus drivers and cleaners hold the ultimate responsibility for returning children home safely:
            </p>
            <ul className="space-y-1.5 list-disc pl-6 text-xs sm:text-sm">
              <li>Both campuses accommodate up to 30 full-sized school buses within secure, enclosed on-site parking bays.</li>
              <li>Visiting school bus drivers, conductors, and attendants receive complimentary nutritious farm lunches and shaded rest facilities during the day.</li>
            </ul>
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
            <Link href="/cancellation-refunds" prefetch={true} className="hover:text-[#14230e] underline">Refund & Cancellation</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
