"use client";

import React, { useState } from "react";
import { Sparkles, Check, Upload, AlertCircle, ArrowRight } from "lucide-react";

export default function BrandingBriefForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("United Kingdom");
  const [selectedServices, setSelectedServices] = useState<string[]>(["Executive Branding"]);
  const [projectGoal, setProjectGoal] = useState("");
  const [timeline, setTimeline] = useState("TWO_TO_FOUR_WEEKS");
  const [budgetRange, setBudgetRange] = useState("$3,000 - $7,500 USD");
  const [brandLinks, setBrandLinks] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [consent, setConsent] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [refCode, setRefCode] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const serviceOptions = [
    "Executive Branding",
    "Corporate & Digital Identity",
    "Sports & Creative Media UGC",
    "Global Merchandising",
    "Content Calendar & Art Direction",
  ];

  const toggleService = (srv: string) => {
    if (selectedServices.includes(srv)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== srv));
      }
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");

    try {
      const formattedPhone = whatsapp.startsWith("+") ? whatsapp : `+234${whatsapp.replace(/^0/, "")}`;
      const payload = {
        division: "branding",
        name,
        email,
        whatsappNumber: formattedPhone,
        companyOrAgency: company,
        country,
        servicesNeeded: selectedServices,
        projectGoal: `${projectGoal} | Attached: ${fileName || "None"}`,
        currentBrandLinks: brandLinks || undefined,
        budgetRangeUsdOrNgn: budgetRange,
        targetDeadline: timeline,
        consentDataProcessing: consent,
        recaptchaToken: "client_mock_token_for_assessment_verification",
      };

      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit creative brief");
      }

      setRefCode(data.referenceCode);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to transmit brief. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (refCode) {
    return (
      <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 text-center space-y-4 shadow-xl">
        <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 mx-auto flex items-center justify-center">
          <Check className="w-8 h-8" />
        </div>
        <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-navy-950">
          Creative Brief Transmitted
        </h3>
        <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed font-light">
          Your brief has been routed directly to our Creative Director and Agency Leads. 
          Expect a concept response within 24 to 48 hours.
        </p>
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 inline-block font-mono text-xs text-brandBlue-700 font-bold">
          TRACKING IDENTIFIER: {refCode}
        </div>
        <div className="pt-4">
          <button
            onClick={() => setRefCode(null)}
            className="px-6 py-2.5 rounded-xl bg-brandBlue-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-brandBlue-700 transition-colors shadow-sm"
          >
            Submit Another Creative Brief
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xl">
      <div className="border-b border-slate-200 pb-4">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-brandBlue-600 block">
          CREATIVE SPRINT INITIATION
        </span>
        <h3 className="text-2xl sm:text-3xl font-display font-bold text-navy-950 mt-1">
          Submit Your Branding Brief
        </h3>
        <p className="text-xs text-slate-500 mt-1 font-light">
          Select deliverables, specify your visual goals, and ignite your campaign.
        </p>
      </div>

      {errorMsg && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Multi-Select Service Options */}
      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 mb-2 font-semibold">
          Select Services Required (Multi-Select)
        </label>
        <div className="flex flex-wrap gap-2">
          {serviceOptions.map((srv) => {
            const active = selectedServices.includes(srv);
            return (
              <button
                type="button"
                key={srv}
                onClick={() => toggleService(srv)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  active
                    ? "bg-brandBlue-600 text-white shadow-sm font-bold"
                    : "bg-slate-50 text-slate-700 hover:text-navy-950 border border-slate-200 hover:border-brandBlue-300"
                }`}
              >
                {active ? `✓ ${srv}` : `+ ${srv}`}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Executive / Client Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Samuel Adekunle"
            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brandBlue-600"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Company / Brand / Agency</label>
          <input
            type="text"
            required
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="e.g. Apex Athletic Sports / Apex Advisory"
            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brandBlue-600"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Corporate Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="samuel@brand.com"
            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brandBlue-600"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">WhatsApp Line</label>
          <input
            type="tel"
            required
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="+44 7911 123456"
            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brandBlue-600"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Target Market / Country</label>
          <input
            type="text"
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="e.g. United Kingdom, Nigeria, US"
            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brandBlue-600"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-700 mb-1">Project Goal & Vision</label>
        <textarea
          rows={3}
          required
          value={projectGoal}
          onChange={(e) => setProjectGoal(e.target.value)}
          placeholder="Describe your desired brand impact, aesthetic style, campaign target audience, or specific UGC deliverables..."
          className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brandBlue-600"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Estimated Budget Range</label>
          <select
            value={budgetRange}
            onChange={(e) => setBudgetRange(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-brandBlue-600"
          >
            <option value="UNDER_3000_USD">Under $3,000 USD / ₦4M NGN</option>
            <option value="$3,000 - $7,500 USD">$3,000 – $7,500 USD / ₦5M – ₦12M</option>
            <option value="$7,500 - $15,000 USD">$7,500 – $15,000 USD / ₦12M – ₦25M</option>
            <option value="ENTERPRISE_CUSTOM">Enterprise / Global Retainer ($15K+)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Target Turnaround</label>
          <select
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-brandBlue-600"
          >
            <option value="RAPID_48H_SPRINT">Rapid UGC Sprint (&lt; 48 Hours)</option>
            <option value="TWO_TO_FOUR_WEEKS">2 to 4 Weeks Standard</option>
            <option value="ONE_TO_TWO_MONTHS">1 to 2 Months Full Identity</option>
            <option value="ONGOING_CONTENT">Ongoing Monthly Retainer</option>
          </select>
        </div>
      </div>

      {/* File Upload Dropzone Simulation */}
      <div>
        <label className="block text-xs font-medium text-slate-700 mb-1">
          Brand Assets / Moodboard Reference (Optional)
        </label>
        <div className="relative border-2 border-dashed border-slate-300 hover:border-brandBlue-500 rounded-xl p-4 text-center cursor-pointer transition-colors bg-slate-50">
          <input
            type="file"
            onChange={handleFileUpload}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
          <Upload className="w-5 h-5 text-brandBlue-600 mx-auto mb-1" />
          <span className="text-xs text-slate-700 block font-medium">
            {fileName ? `Selected: ${fileName}` : "Drop reference PDF, vector logo, or style brief here"}
          </span>
          <span className="text-[10px] text-slate-400 block mt-0.5">PDF, PNG, SVG or ZIP up to 25MB</span>
        </div>
      </div>

      <div className="flex items-start space-x-2 pt-1">
        <input
          type="checkbox"
          required
          id="brief-consent"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 rounded border-slate-300 text-brandBlue-600 focus:ring-brandBlue-500"
        />
        <label htmlFor="brief-consent" className="text-[11px] text-slate-600">
          I agree to the processing of our branding brief under the{" "}
          <strong className="text-navy-950">Nigeria Data Protection Act 2023 (NDPA)</strong>.
        </label>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-4 rounded-xl bg-brandBlue-600 text-white font-bold text-xs uppercase tracking-widest hover:bg-brandBlue-700 transition-all shadow-md shadow-brandBlue-600/20 disabled:opacity-50 flex items-center justify-center space-x-2 shimmer-button"
      >
        <span>{submitting ? "Transmitting to Agency Lead..." : "Submit Creative Brief"}</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
}
