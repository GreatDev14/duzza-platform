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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 pt-28 pb-16 px-4 sm:px-6 flex items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        {/* Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-7 sm:p-9 space-y-6">
          <div className="space-y-2 text-center">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[11px] font-mono font-bold text-[#0052FF]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ZERO-TRUST IAM • DUZZA CMS</span>
            </div>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">
              CMS Portal Sign In
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Role-based access control for Admin, Manager, and Approved Contributors.
            </p>
          </div>

          {errorMsg && (
            <div
              className={`p-3.5 rounded-xl border text-xs flex items-start space-x-2.5 ${
                isPendingBlocked
                  ? "bg-amber-50 border-amber-300 text-amber-900"
                  : "bg-rose-50 border-rose-200 text-rose-800"
              }`}
            >
              {isPendingBlocked ? (
                <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
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
              <label className="block text-xs font-mono font-bold text-slate-700 mb-1.5">
                Corporate / Account Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@duzza.com.ng"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-slate-50/50 focus:outline-none focus:border-[#0052FF]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-slate-50/50 focus:outline-none focus:border-[#0052FF]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ backgroundColor: "#0052FF", color: "#FFFFFF" }}
              className="btn-brand-primary w-full py-3.5 rounded-xl bg-[#0052FF] hover:bg-[#0041CC] text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
            >
              <span className="text-white font-bold">
                {loading ? "Verifying IAM Credentials..." : "Sign In to CMS Dashboard"}
              </span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-slate-500">
            New contributor?{" "}
            <Link
              href="/cms/signup"
              className="font-bold text-[#0052FF] hover:underline inline-flex items-center space-x-1"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Request Account Access</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

