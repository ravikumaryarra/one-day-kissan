import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, AlertCircle, FileText, CheckCircle2, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Official Terms and Conditions, Visitor Agreement, Farm Rules, and Code of Conduct for One Day Kisan (Bhongir & Moinabad campuses).",
};

export default function TermsPage() {
  const lastUpdated = "November 16, 2026";

  return (
    <div className="min-h-screen bg-[#faf7f0] text-[#1e2617]">
      {/* Top Banner & Navigation */}
      <header className="border-b border-[#2b4c1c]/15 bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#2b4c1c] hover:text-[#1a3811] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to One Day Kisan</span>
          </Link>
          <div className="flex items-center gap-2 text-xs font-mono text-[#8a4724]">
            <FileText className="w-4 h-4 text-[#2b4c1c]" />
            <span>Visitor Agreement & Rules</span>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="mb-10 text-center sm:text-left border-b border-[#2b4c1c]/15 pb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2b4c1c]/10 text-[#2b4c1c] border border-[#2b4c1c]/20 text-xs font-mono uppercase tracking-widest mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-[#14230e]">
            Terms & Conditions of Entry
          </h1>
          <p className="mt-3 text-sm text-[#526048]">
            Effective Date: November 1, 2024 • Last Reviewed & Updated: {lastUpdated}
          </p>
        </div>

        <div className="space-y-10 text-sm sm:text-base leading-relaxed text-[#2f3d26]">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14230e] flex items-center gap-2">
              <span className="text-[#8a4724]">1.</span> Acceptance of Agreement
            </h2>
            <p>
              By accessing our website (<strong>onedaykissan.vercel.app</strong>), booking a ticket, issuing a school purchase order, paying a booking token, or entering the campus gates at <strong>Bhongir</strong> or <strong>Moinabad</strong>, you, your accompanying students, staff, and family members agree to be legally bound by these Terms and Conditions (&quot;Terms&quot;).
            </p>
            <p>
              If you represent an educational institution, school, or corporate organization, you warrant that you possess the requisite authority to bind all participants in your delegation to these Terms.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14230e] flex items-center gap-2">
              <span className="text-[#8a4724]">2.</span> Nature of the Experiential Farm
            </h2>
            <p>
              One Day Kisan is an active, open-air rural agricultural and edutainment sanctuary. Unlike enclosed, climate-controlled commercial shopping malls or amusement parks, our campuses encompass living agricultural fields, muddy paddy terraces, earthen bunds, open-well stone hydraulic systems, tractor trails, and free-flight aviaries.
            </p>
            <p>
              Visitors are encouraged to immerse themselves in authentic soil activities. Minor contact with natural soil, mud, freshwater ponds, organic farm animals, harmless insects, and seasonal weather is an intrinsic part of the agro-learning journey.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 p-6 rounded-2xl bg-amber-500/10 border border-amber-600/20 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14230e] flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-[#8a4724]" />
              <span>3. Campus Code of Conduct & Prohibited Items</span>
            </h2>
            <p className="font-medium text-[#14230e]">
              To safeguard children, farm educators, and livestock, the following regulations are strictly enforced across both campuses:
            </p>
            <ul className="space-y-2 list-none pl-2 text-xs sm:text-sm">
              <li className="flex items-start gap-2">
                <span className="text-red-700 font-bold">✕</span>
                <span><strong>Zero Tolerance for Intoxicants:</strong> Alcohol, alcoholic beverages, cigarettes, bidis, vaping devices, chewing tobacco (gutkha), and illicit substances are categorically prohibited. Anyone found carrying or consuming intoxicants will be immediately escorted off the premises without refund.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-700 font-bold">✕</span>
                <span><strong>No Plastic Littering:</strong> Ingestion of plastic wrappers, polythene bags, and thermocol causes fatal blockages in farm cattle. All packaging must be placed in designated segregation bins.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-700 font-bold">✕</span>
                <span><strong>Animal Welfare:</strong> Visitors must treat farm animals (cows, calves, goats, sheep, rabbits, birds) with kindness. Hitting, teasing, shouting at, or feeding unauthorized external food to livestock is grounds for immediate expulsion.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-700 font-bold">✕</span>
                <span><strong>No Hazardous Objects:</strong> Sharp tools, fireworks, inflammable liquids, or unauthorized drones are forbidden inside farm boundaries.</span>
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14230e] flex items-center gap-2">
              <span className="text-[#8a4724]">4.</span> Campus Operating Hours & Admissions
            </h2>
            <ul className="space-y-2 list-none pl-2">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2b4c1c] mt-1 flex-shrink-0" />
                <span><strong>Timings:</strong> 9:00 AM to 6:00 PM (All 7 Days). Standard school and corporate itineraries conclude by 3:30 PM to 4:30 PM to facilitate highway returns.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2b4c1c] mt-1 flex-shrink-0" />
                <span><strong>Check-in:</strong> Pre-booked entry passes must be shown at the main entrance gate via digital confirmation (WhatsApp/Email) or school verification letterhead.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2b4c1c] mt-1 flex-shrink-0" />
                <span><strong>Instructor Ratio:</strong> For school field trips, One Day Kisan provides agricultural mentors at a strict 1:25 instructor-to-student ratio. School management is required to send at least 1 responsible faculty escort per 25 students.</span>
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14230e] flex items-center gap-2">
              <span className="text-[#8a4724]">5.</span> Clothing & Preparation Recommendations
            </h2>
            <p>
              Visitors are advised to dress for an authentic day on the soil:
            </p>
            <ul className="space-y-1.5 list-disc pl-6 text-sm">
              <li>Wear comfortable, loose cotton clothing that can accommodate mud and dust.</li>
              <li>Carry a spare set of dry clothes, a clean towel, and an extra pair of footwear.</li>
              <li>Wear sun-protection caps/hats and stay hydrated using our filtered RO drinking stations.</li>
              <li>Keep expensive jewelry, luxury watches, and non-waterproof electronics inside safe pouches or vehicles.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14230e] flex items-center gap-2">
              <span className="text-[#8a4724]">6.</span> Limitation of Liability & Health Advisory
            </h2>
            <p>
              Visitors participate in hands-on farm activities (mud arena, tractor rides, pottery wheel, tree shade activities) voluntarily. One Day Kisan maintains stringent safety standards, comprehensive perimeter fencing, well-maintained equipment, and on-campus first-aid facilities.
            </p>
            <p>
              However, One Day Kisan shall not be held liable for personal injury, allergic reactions to natural plants or dust, or loss/damage to personal belongings resulting from non-compliance with instructor guidelines, reckless behavior, running on wet bunds, or unsupervised wandering.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14230e] flex items-center gap-2">
              <span className="text-[#8a4724]">7.</span> Intellectual Property & Curriculum Materials
            </h2>
            <p>
              All curriculum modules, 360° virtual tour captures, brand trademarks, logos, audio-visual recordings, and proprietary agricultural syllabus materials displayed on this website are the intellectual property of One Day Kisan. Unauthorized commercial reproduction or mirroring is prohibited.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14230e] flex items-center gap-2">
              <span className="text-[#8a4724]">8.</span> Governing Law & Jurisdiction
            </h2>
            <p>
              These Terms and Conditions shall be governed by and construed in accordance with the laws of the Republic of India. Any disputes arising out of or in connection with visits to One Day Kisan shall be subject to the exclusive jurisdiction of the competent courts in Hyderabad / Yadadri Bhuvanagiri District, Telangana.
            </p>
          </section>
        </div>
      </main>

      {/* Footer Return Bar */}
      <footer className="border-t border-[#2b4c1c]/15 bg-white py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#526048]">
          <span>© {new Date().getFullYear()} One Day Kisan. All Rights Reserved.</span>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-[#14230e] underline">Privacy Policy</Link>
            <Link href="/cancellation-refunds" className="hover:text-[#14230e] underline">Refund & Cancellation</Link>
            <Link href="/safety" className="hover:text-[#14230e] underline">Safety Standards</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
