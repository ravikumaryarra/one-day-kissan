import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Mail, Phone, MapPin, Lock, FileText, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Official Privacy Policy and Data Protection practices of One Day Kisan under the Digital Personal Data Protection Act, 2023 (DPDP) and Information Technology Act, 2000.",
};

export default function PrivacyPolicyPage() {
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
            <ShieldCheck className="w-4 h-4 text-[#2b4c1c]" />
            <span>DPDP Act (India) Compliant</span>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="mb-10 text-center sm:text-left border-b border-[#2b4c1c]/15 pb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2b4c1c]/10 text-[#2b4c1c] border border-[#2b4c1c]/20 text-xs font-mono uppercase tracking-widest mb-4">
            <Lock className="w-3.5 h-3.5" />
            <span>Institutional Legal Disclosure</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-[#14230e]">
            Privacy Policy & Data Governance
          </h1>
          <p className="mt-3 text-sm text-[#526048]">
            Effective Date: November 1, 2024 • Last Reviewed & Updated: {lastUpdated}
          </p>
        </div>

        <div className="space-y-10 text-sm sm:text-base leading-relaxed text-[#2f3d26]">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14230e] flex items-center gap-2">
              <span className="text-[#8a4724]">1.</span> Commitment to Privacy & Governance
            </h2>
            <p>
              <strong>One Day Kisan</strong> (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;, or the &quot;Organization&quot;) is committed to upholding the highest standards of data integrity, confidentiality, and statutory compliance. This Privacy Policy details our practices concerning the collection, storage, processing, transfer, and deletion of personal data collected through our website (<strong>onedaykissan.vercel.app</strong>), official communications, WhatsApp concierge desks, and on-farm visitor management counters.
            </p>
            <p>
              This policy is formulated in strict accordance with the <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong>, the <strong>Information Technology Act, 2000</strong> (including Section 43A), and the <strong>Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011</strong>.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14230e] flex items-center gap-2">
              <span className="text-[#8a4724]">2.</span> Information We Collect
            </h2>
            <p>Depending on your interaction with One Day Kisan, we collect the following categories of information:</p>
            <ul className="space-y-2 list-none pl-2">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2b4c1c] mt-1 flex-shrink-0" />
                <span>
                  <strong>Individual & Representative Contact Details:</strong> Full name, telephone/mobile number, email address, postal address, and identity verification of coordinating teachers, principals, corporate HR managers, or family heads.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2b4c1c] mt-1 flex-shrink-0" />
                <span>
                  <strong>Institutional & Batch Details:</strong> School/College name, corporate organization details, participant headcounts, grade/age brackets of students, emergency contacts, and special dietary/accessibility requirements.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2b4c1c] mt-1 flex-shrink-0" />
                <span>
                  <strong>Transaction & Invoicing Data:</strong> Bank transaction reference numbers, GST numbers, advance booking tokens, and payment receipts. <em>Note: We do not store complete credit card or debit card numbers on our servers; transactions are handled securely through RBI-compliant payment gateways.</em>
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2b4c1c] mt-1 flex-shrink-0" />
                <span>
                  <strong>Device & Telemetry Data:</strong> IP addresses, browser specifications, operating systems, and anonymous usage telemetry collected to maintain 360° interactive tour performance and prevent cyber intrusions.
                </span>
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14230e] flex items-center gap-2">
              <span className="text-[#8a4724]">3.</span> Purpose of Data Processing
            </h2>
            <p>All personal data is processed strictly for legitimate educational, operational, and safety purposes, including:</p>
            <ol className="list-decimal pl-6 space-y-1.5">
              <li>Processing entry permits, batch allocations, and itinerary scheduling at our Bhongir and Moinabad campuses.</li>
              <li>Procuring fresh, hygienic ingredients for the traditional farm buffet based on exact visitor headcounts.</li>
              <li>Ensuring child safety, instructor-to-student ratio maintenance (1:25), and on-farm emergency medical coordination.</li>
              <li>Issuing GST-compliant invoices, school field trip proposals, and parent circular documentation.</li>
              <li>Responding to user queries via phone, email, and WhatsApp concierge channels.</li>
            </ol>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 p-6 rounded-2xl bg-white border border-[#2b4c1c]/15 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14230e] flex items-center gap-2">
              <span className="text-[#8a4724]">4.</span> Protection of Children & Minors Data
            </h2>
            <p>
              As an experiential educational destination hosting tens of thousands of school children annually, we enforce strict compliance with Section 9 of the DPDP Act 2023 regarding the processing of children&apos;s data:
            </p>
            <ul className="space-y-2 pl-2">
              <li className="flex items-start gap-2">
                <span className="text-[#8a4724] font-bold">•</span>
                <span>We never engage in tracking, behavioral monitoring, or targeted advertising directed at children.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8a4724] font-bold">•</span>
                <span>All student batch information is obtained strictly through authorized school administration or legal guardians with written educational consent.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8a4724] font-bold">•</span>
                <span>Any student emergency information collected is purged 30 days after the completion of the respective school excursion.</span>
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14230e] flex items-center gap-2">
              <span className="text-[#8a4724]">5.</span> On-Farm Photography & Video Documentation
            </h2>
            <p>
              One Day Kisan captures unscripted moments of agriculture, muddy paddy transplantation, ancient water engineering, and artisan pottery to showcase authentic agritourism archives and educational progress.
            </p>
            <p>
              <strong>Opt-Out Protocol:</strong> If a visiting institution, school principal, parent, or visitor does not wish to be included in photographs or video archives published for educational outreach, they may notify our campus helpdesk upon arrival or email us in advance at <strong>info@onedaykisan.com</strong>. We will ensure designated batches are excluded from public archives.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14230e] flex items-center gap-2">
              <span className="text-[#8a4724]">6.</span> Data Security & Storage Standards
            </h2>
            <p>
              We implement comprehensive physical, managerial, and electronic safeguards (including SSL/TLS 256-bit encryption, role-based access restrictions, and periodic vulnerability reviews) to prevent unauthorized access, accidental alteration, disclosure, or destruction of personal records.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14230e] flex items-center gap-2">
              <span className="text-[#8a4724]">7.</span> Statutory Grievance Redressal Officer
            </h2>
            <p>
              In accordance with Rule 5(9) of the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 and DPDP Act provisions, the contact details of the designated Grievance Officer are set forth below:
            </p>

            <div className="p-6 rounded-2xl bg-[#f5f0e6] border border-[#2b4c1c]/15 space-y-2 text-xs sm:text-sm">
              <div className="font-bold text-[#14230e] text-base">Grievance & Data Protection Officer</div>
              <div><strong>Organization:</strong> One Day Kisan</div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#8a4724] flex-shrink-0" />
                <span>Near Hotel Vivera, Hyderabad - Warangal Highway (NH 163), Bhongir Bypass, Yadadri Bhuvanagiri Dist, Telangana - 508116</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#2b4c1c] flex-shrink-0" />
                <span>+91 98497 98674 / +91 93983 57618</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#2b4c1c] flex-shrink-0" />
                <span>info@onedaykisan.com</span>
              </div>
              <div className="text-[#526048] pt-2">
                Response SLA: All privacy-related grievances and verification requests will be acknowledged within 24 hours and redressed within 15 business days.
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer Return Bar */}
      <footer className="border-t border-[#2b4c1c]/15 bg-white py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#526048]">
          <span>© {new Date().getFullYear()} One Day Kisan. All Rights Reserved.</span>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-[#14230e] underline">Terms & Conditions</Link>
            <Link href="/cancellation-refunds" className="hover:text-[#14230e] underline">Refund & Cancellation</Link>
            <Link href="/safety" className="hover:text-[#14230e] underline">Safety Standards</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
