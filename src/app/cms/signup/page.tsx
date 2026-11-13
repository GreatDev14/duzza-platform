"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  UserPlus,
  Mail,
  Lock,
  User,
  Clock,
  ArrowRight,
  AlertCircle,
  ShieldAlert,
} from "lucide-react";

export default function CmsSignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [createdPending, setCreatedPending] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Registration failed.");
        setLoading(false);
        return;
      }

      setCreatedPending(true);
      setLoading(false);
    } catch {
      setErrorMsg("Network error during registration.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#140A05] pt-28 pb-16 px-4 sm:px-6 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-[#1C110A] rounded-3xl border border-[#D4AF37]/35 shadow-2xl shadow-black/90 p-7 sm:p-9 space-y-6">
          <div className="space-y-2 text-center">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#26170E] border border-[#D4AF37]/40 text-[11px] font-mono font-bold text-[#D4AF37]">
              <UserPlus className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>NEW ACCOUNT REGISTRATION</span>
            </div>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#FFF6DE]">
              Request CMS Access
            </h1>
            <p className="text-xs sm:text-sm text-[#EED9B3]/80">
              New signups default to <strong className="text-[#D4AF37]">CONTRIBUTOR</strong> with{" "}
              <strong className="text-[#F3C966]">PENDING</strong> status until approved.
            </p>
          </div>

          {createdPending ? (
            <div className="p-5 rounded-2xl bg-[#26170E] border border-[#D4AF37]/40 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#382315] text-[#D4AF37] flex items-center justify-center mx-auto border border-[#D4AF37]/50">
                <Clock className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h2 className="font-display font-bold text-lg text-[#FFF6DE]">
                  Account Status: PENDING Approval
                </h2>
                <p className="text-xs text-[#EED9B3]/85 leading-relaxed">
                  Your account for <strong>{email}</strong> has been created with role{" "}
                  <strong>CONTRIBUTOR</strong> and status <strong>PENDING</strong>. You do not
                  have dashboard access until an <strong>ADMIN</strong> or{" "}
                  <strong>MANAGER</strong> switches your status to <strong>ACTIVE</strong>.
                </p>
              </div>
              <Link
                href="/cms/login"
                className="btn-brand-primary inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-[#140A05] font-bold text-xs uppercase tracking-wider"
              >
                <span className="text-[#140A05]">Return to Login</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#140A05]" />
              </Link>
            </div>
          ) : (
            <>
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/50 text-xs text-rose-200 flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-[#6E431F] mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Chinedu Okafor"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-sm text-[#241409] bg-stone-50/50 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#6E431F] mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="staff@duzza.com.ng"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-sm text-[#241409] bg-stone-50/50 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#6E431F] mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                    <input
                      type="password"
                      required
                      minLength={4}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimum 4 characters"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-sm text-[#241409] bg-stone-50/50 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 flex items-start space-x-2 text-[11px] text-amber-900">
                  <ShieldAlert className="w-4 h-4 text-[#8B5A2B] shrink-0 mt-0.5" />
                  <span>
                    All new accounts are quarantined in <strong>PENDING</strong> state until
                    approved by Executive Admin or Mr. Caleb (Manager).
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-brand-primary w-full py-3.5 rounded-xl text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                >
                  <span className="text-white font-bold">
                    {loading ? "Submitting Request..." : "Submit Access Request"}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#F3C966]" />
                </button>
              </form>
            </>
          )}

          <div className="pt-2 text-center text-xs text-stone-500">
            Already approved?{" "}
            <Link href="/cms/login" className="font-bold text-[#8B5A2B] hover:text-[#6E431F] hover:underline">
              Sign In to CMS
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

