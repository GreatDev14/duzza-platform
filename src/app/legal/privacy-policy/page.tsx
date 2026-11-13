import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { 
  ShieldCheck, 
  Building, 
  Scale, 
  FileText, 
  UserCheck, 
  AlertTriangle,
  Lock
} from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy & NDPA 2023 Compliance Disclosures",
  description: "Official Data Protection Policy and Data Subject Rights Statement for DUZZA LIMITED under the Nigeria Data Protection Act 2023 (NDPA) and GDPR.",
};

export default function PrivacyPolicyPage() {
  const companyName = process.env.NEXT_PUBLIC_COMPANY_LEGAL_NAME || "DUZZA LIMITED";
  const rcNumber = process.env.NEXT_PUBLIC_CAC_RC_NUMBER || "RC-7149208";
  const registeredOffice = process.env.NEXT_PUBLIC_REGISTERED_OFFICE || "KM 4 DSC Expressway, Warri, Delta State, Nigeria";
  const dpoEmail = process.env.NEXT_PUBLIC_DPO_EMAIL || "dpo@duzza.com.ng";
  const effectiveDate = "November 2026";

  return (
    <div className="bg-[#050B18] min-h-screen py-16 px-4 sm:px-6 lg:px-8 text-[#F1F5F9] selection:bg-[#D4AF37] selection:text-[#050B18]">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="border-b border-[#1B325C] pb-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#091224] border border-[#D4AF37]/30 text-xs font-mono text-[#D4AF37]">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span>STATUTORY DATA PROTECTION STATEMENT</span>
          </div>
          
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Privacy Policy & Data Subject Rights
          </h1>

          <p className="text-sm text-[#94A3B8] leading-relaxed font-light">
            Effective Date: <strong className="text-white">{effectiveDate}</strong> | Governance: <strong className="text-[#D4AF37]">Nigeria Data Protection Act 2023 (NDPA) & General Data Protection Regulation (GDPR)</strong>.
          </p>

          <div className="p-4 rounded-xl bg-[#091224] border border-[#1B325C] text-xs text-[#CBD5E1] space-y-1.5 font-mono">
            <p><strong className="text-[#D4AF37]">Legal Entity:</strong> {companyName} (CAMA 2020)</p>
            <p><strong className="text-[#D4AF37]">Corporate Registration:</strong> Corporate Affairs Commission (CAC) {rcNumber}</p>
            <p><strong className="text-[#D4AF37]">Registered Base & Operational HQ:</strong> {registeredOffice}</p>
            <p><strong className="text-[#D4AF37]">Designated Data Protection Officer (DPO):</strong> {dpoEmail}</p>
          </div>
        </div>

        {/* Section 1 */}
        <section className="space-y-4">
          <h2 className="text-xl font-display font-bold text-white flex items-center space-x-2">
            <Building className="w-5 h-5 text-[#D4AF37]" />
            <span>1. Identity of the Data Controller & Scope</span>
          </h2>
          <p className="text-sm text-[#94A3B8] leading-relaxed font-light">
            {companyName} (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;the Holding Group&rdquo;) operates as the Data Controller responsible for 
            personal data processed through this portal and our subsidiaries: <strong className="text-white">Duzza Projects</strong> (Engineering, 
            Oil & Gas, Marine Hydrographic Survey, Equipment Hire) and <strong className="text-white">Duzza Branding</strong> (Executive Identity, 
            Creative Media, Merchandising), as well as pre-launch subscriber interactions for our emerging retail divisions 
            (Duzza Fashion and Duzza Bakery & Eatery).
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="text-xl font-display font-bold text-white flex items-center space-x-2">
            <Scale className="w-5 h-5 text-[#D4AF37]" />
            <span>2. Lawful Bases for Processing (NDPA Section 25)</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#CBD5E1]">
            <div className="p-4 rounded-xl bg-[#091224] border border-[#1B325C] space-y-2">
              <strong className="text-white block text-sm">Contractual Performance</strong>
              <p className="text-[#94A3B8] font-light">
                Processing required to evaluate technical engineering scopes, issue Requests for Quotation (RFQs), 
                execute marine equipment hire leases, or fulfill corporate branding deliverables.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#091224] border border-[#1B325C] space-y-2">
              <strong className="text-white block text-sm">Explicit Consent</strong>
              <p className="text-[#94A3B8] font-light">
                Freely given, specific, and informed consent gathered for pre-launch consumer waitlists (Fashion & Bakery) 
                and optional analytics tracking pixels. Consent may be revoked at any time.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#091224] border border-[#1B325C] space-y-2">
              <strong className="text-white block text-sm">Legitimate Corporate Interests</strong>
              <p className="text-[#94A3B8] font-light">
                Maintaining infrastructure integrity, securing endpoints against distributed denial of service (DDoS), 
                and preventing malicious automated form submissions via reCAPTCHA Enterprise risk scoring.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#091224] border border-[#1B325C] space-y-2">
              <strong className="text-white block text-sm">Legal & Regulatory Compliance</strong>
              <p className="text-[#94A3B8] font-light">
                Retention and disclosures required under Nigerian statutory corporate legislation, the Federal Inland 
                Revenue Service (FIRS), and NDPC oversight audit obligations.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-4">
          <h2 className="text-xl font-display font-bold text-white flex items-center space-x-2">
            <UserCheck className="w-5 h-5 text-[#D4AF37]" />
            <span>3. Data Subject Rights Under NDPA 2023 & GDPR</span>
          </h2>
          <p className="text-sm text-[#94A3B8] leading-relaxed font-light">
            You maintain enforceable statutory rights regarding personal data collected by DUZZA LIMITED:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-[#94A3B8] font-light">
            <li><strong className="text-white">Right to be Informed:</strong> Transparent disclosure on how information is handled.</li>
            <li><strong className="text-white">Right of Access:</strong> Request a copy of records retained about your company or profile.</li>
            <li><strong className="text-white">Right to Rectification:</strong> Request correction of inaccurate contact or project information.</li>
            <li><strong className="text-white">Right to Erasure (&ldquo;Right to be Forgotten&rdquo;):</strong> Request deletion when data is no longer necessary for statutory or contractual purposes.</li>
            <li><strong className="text-white">Right to Data Portability:</strong> Receive digital information in a machine-readable format.</li>
            <li><strong className="text-white">Right to Object & Restrict:</strong> Refuse direct marketing or contest lawful basis processing.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-4">
          <h2 className="text-xl font-display font-bold text-white flex items-center space-x-2">
            <Lock className="w-5 h-5 text-[#D4AF37]" />
            <span>4. Data Security Measures & Cloud Infrastructure</span>
          </h2>
          <p className="text-sm text-[#94A3B8] leading-relaxed font-light">
            DUZZA LIMITED deploys end-to-end TLS 1.3 cryptographic transport security, AES-256 encrypted database 
            storage, role-based identity access management (RBAC), and automated penetration screening to ensure all 
            technical and personal data remains protected against unauthorized access, exfiltration, or modification.
          </p>
        </section>

        {/* Section 5: Exercise Rights */}
        <section className="p-6 rounded-2xl bg-[#091224] border border-[#D4AF37]/30 space-y-3">
          <h3 className="font-display font-bold text-base text-white flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-[#D4AF37]" />
            <span>Submitting a Data Subject Access Request (DSAR)</span>
          </h3>
          <p className="text-xs text-[#94A3B8] leading-relaxed font-light">
            To exercise your statutory rights under NDPA 2023, dispatch a formal request to our designated Data Protection Officer:
          </p>
          <div className="p-3 rounded-lg bg-[#0E1B33] border border-[#1B325C] font-mono text-xs text-[#D4AF37] font-bold">
            Data Protection Officer: {dpoEmail}
          </div>
          <p className="text-[11px] text-[#64748B] font-light">
            All validated requests will receive an initial response within thirty (30) business days in accordance with NDPA guidelines.
          </p>
        </section>
      </div>
    </div>
  );
}
