"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  AlertCircle,
  Clock,
  UserCheck,
} from "lucide-react";

export default function CmsLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isPendingBlocked, setIsPendingBlocked] = useState(false);

  const submitCredentials = async (targetEmail: string, targetPass: string) => {
    setLoading(true);
    setErrorMsg("");
    setIsPendingBlocked(false);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: targetEmail, password: targetPass }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (data.code === "ACCOUNT_PENDING") {
          setIsPendingBlocked(true);
        }
        setErrorMsg(data.error || "Authentication failed.");
        setLoading(false);
        return;
      }

      window.location.href = "/cms/dashboard";
    } catch {
      setErrorMsg("Network error while connecting to IAM server.");
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitCredentials(email, password);
  };

  return (
    <div className="min-h-screen bg-[#140A05] pt-28 pb-16 px-4 sm:px-6 flex items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        {/* Card */}
        <div className="bg-[#1C110A] rounded-3xl border border-[#D4AF37]/35 shadow-2xl shadow-black/90 p-7 sm:p-9 space-y-6">
          <div className="space-y-2 text-center">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#26170E] border border-[#D4AF37]/40 text-[11px] font-mono font-bold text-[#D4AF37]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>ZERO-TRUST IAM • DUZZA CMS</span>
            </div>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#FFF6DE]">
              CMS Portal Sign In
            </h1>
            <p className="text-xs sm:text-sm text-[#EED9B3]/80">
              Role-based access control for Admin, Manager, and Approved Contributors.
            </p>
          </div>

          {errorMsg && (
            <div
              className={`p-3.5 rounded-xl border text-xs flex items-start space-x-2.5 ${
                isPendingBlocked
                  ? "bg-amber-950/40 border-amber-500/50 text-amber-200"
                  : "bg-rose-950/40 border-rose-500/50 text-rose-200"
              }`}
            >
              {isPendingBlocked ? (
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div>
                <span className="font-bold block">
                  {isPendingBlocked ? "Approval Required (Status: PENDING)" : "Access Denied"}
                </span>
                <span>{errorMsg}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold text-[#D4AF37] mb-1.5">
                Corporate / Account Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#D4AF37]/60 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@duzza.com.ng"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#3D2415] text-sm text-[#FFF6DE] bg-[#26170E]/80 placeholder-[#6B4429] focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-[#D4AF37] mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#D4AF37]/60 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#3D2415] text-sm text-[#FFF6DE] bg-[#26170E]/80 placeholder-[#6B4429] focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-brand-primary w-full py-3.5 rounded-xl text-[#140A05] font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
            >
              <span className="text-[#140A05] font-bold">
                {loading ? "Verifying IAM Credentials..." : "Sign In to CMS Dashboard"}
              </span>
              <ArrowRight className="w-4 h-4 text-[#140A05]" />
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-[#EED9B3]/70">
            New contributor?{" "}
            <Link
              href="/cms/signup"
              className="font-bold text-[#D4AF37] hover:text-[#FFF6DE] hover:underline inline-flex items-center space-x-1"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Request Account Access</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

