"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  LogOut,
  FolderPlus,
  ImagePlus,
  BellPlus,
  Users,
  FileClock,
  Trash2,
  CheckCircle2,
  Clock,
  UserPlus,
  AlertCircle,
  Lock,
  Search,
  RefreshCw,
  Ban,
} from "lucide-react";
import type {
  CmsImage,
  CmsNotification,
  CmsProject,
  LoginAuditLog,
  PublicIamUser,
  Role,
} from "@/lib/iam/types";

type DashboardTab = "projects" | "images" | "notifications" | "users" | "audit";

export default function CmsDashboardPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<PublicIamUser | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [activeTab, setActiveTab] = useState<DashboardTab>("projects");

  const [projects, setProjects] = useState<CmsProject[]>([]);
  const [images, setImages] = useState<CmsImage[]>([]);
  const [notifications, setNotifications] = useState<CmsNotification[]>([]);
  const [users, setUsers] = useState<PublicIamUser[]>([]);
  const [auditLogs, setAuditLogs] = useState<LoginAuditLog[]>([]);

  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Project form state
  const [prjTitle, setPrjTitle] = useState("");
  const [prjDivision, setPrjDivision] = useState<CmsProject["division"]>("Duzza Projects");
  const [prjLocation, setPrjLocation] = useState("Warri, Delta State");
  const [prjDesc, setPrjDesc] = useState("");
  const [prjImgUrl, setPrjImgUrl] = useState("");

  // Image form state
  const [imgTitle, setImgTitle] = useState("");
  const [imgCategory, setImgCategory] = useState("Marine Geomatics");
  const [imgUrl, setImgUrl] = useState("");
  const [imgFile, setImgFile] = useState<File | null>(null);

  // Notification form state
  const [ntfTitle, setNtfTitle] = useState("");
  const [ntfMessage, setNtfMessage] = useState("");
  const [ntfPriority, setNtfPriority] = useState<CmsNotification["priority"]>("INFO");

  // Invite user form state
  const [invName, setInvName] = useState("");
  const [invEmail, setInvEmail] = useState("");
  const [invPassword, setInvPassword] = useState("admin");
  const [invRole, setInvRole] = useState<Role>("CONTRIBUTOR");

  // Audit filter state
  const [auditSearch, setAuditSearch] = useState("");
  const [auditStatusFilter, setAuditStatusFilter] = useState("ALL");

  const showToast = (type: "success" | "error", text: string) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 4500);
  };

  const isPrivileged = currentUser?.role === "ADMIN" || currentUser?.role === "MANAGER";

  const fetchAllData = useCallback(async (user: PublicIamUser) => {
    const [prjRes, imgRes, ntfRes] = await Promise.all([
      fetch("/api/cms/projects"),
      fetch("/api/cms/images"),
      fetch("/api/cms/notifications"),
    ]);

    if (prjRes.ok) setProjects((await prjRes.json()).projects || []);
    if (imgRes.ok) setImages((await imgRes.json()).images || []);
    if (ntfRes.ok) setNotifications((await ntfRes.json()).notifications || []);

    if (user.role === "ADMIN" || user.role === "MANAGER") {
      const [usrRes, logRes] = await Promise.all([
        fetch("/api/cms/users"),
        fetch("/api/cms/audit-logs"),
      ]);
      if (usrRes.ok) setUsers((await usrRes.json()).users || []);
      if (logRes.ok) setAuditLogs((await logRes.json()).logs || []);
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          router.replace("/cms/login");
          return;
        }
        const data = await res.json();
        setCurrentUser(data.user);
        setLoadingAuth(false);
        await fetchAllData(data.user);
      } catch {
        router.replace("/cms/login");
      }
    })();
  }, [router, fetchAllData]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/cms/login");
    router.refresh();
  };

  // --- PROJECT ACTIONS ---
  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/cms/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: prjTitle,
        division: prjDivision,
        location: prjLocation,
        description: prjDesc,
        imageUrl: prjImgUrl,
      }),
    });
    const data = await res.json();
    if (!res.ok) return showToast("error", data.error || "Failed to upload project");
    setProjects((prev) => [data.project, ...prev]);
    setPrjTitle("");
    setPrjDesc("");
    setPrjImgUrl("");
    showToast("success", "Project uploaded to CMS.");
  };

  const handleDeleteProject = async (id: string) => {
    const res = await fetch(`/api/cms/projects/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) return showToast("error", data.error || "Delete blocked");
    setProjects((prev) => prev.filter((p) => p.id !== id));
    showToast("success", "Project deleted.");
  };

  // --- IMAGE ACTIONS ---
  const handleUploadImage = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", imgTitle);
    formData.append("category", imgCategory);
    if (imgFile) {
      formData.append("file", imgFile);
    } else {
      formData.append("url", imgUrl);
    }

    const res = await fetch("/api/cms/images", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) return showToast("error", data.error || "Failed to upload image");
    setImages((prev) => [data.image, ...prev]);
    setImgTitle("");
    setImgUrl("");
    setImgFile(null);
    showToast("success", "Image uploaded to CMS media library.");
  };

  const handleDeleteImage = async (id: string) => {
    const res = await fetch(`/api/cms/images/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) return showToast("error", data.error || "Delete blocked");
    setImages((prev) => prev.filter((img) => img.id !== id));
    showToast("success", "Image deleted.");
  };

  // --- NOTIFICATION ACTIONS ---
  const handleAddNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/cms/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: ntfTitle,
        message: ntfMessage,
        priority: ntfPriority,
      }),
    });
    const data = await res.json();
    if (!res.ok) return showToast("error", data.error || "Failed to add notification");
    setNotifications((prev) => [data.notification, ...prev]);
    setNtfTitle("");
    setNtfMessage("");
    showToast("success", "Notification published.");
  };

  const handleDeleteNotification = async (id: string) => {
    const res = await fetch(`/api/cms/notifications/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) return showToast("error", data.error || "Delete blocked");
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    showToast("success", "Notification removed.");
  };

  // --- USER & IAM ACTIONS (ADMIN & MANAGER ONLY) ---
  const handleInviteUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/cms/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: invName,
        email: invEmail,
        password: invPassword,
        role: invRole,
        status: "ACTIVE",
      }),
    });
    const data = await res.json();
    if (!res.ok) return showToast("error", data.error || "Failed to invite user");
    setUsers((prev) => [data.user, ...prev]);
    setInvName("");
    setInvEmail("");
    showToast("success", `${data.user.email} added as ACTIVE ${data.user.role}.`);
  };

  const handleUpdateUser = async (
    id: string,
    updates: { status?: PublicIamUser["status"]; role?: Role }
  ) => {
    const res = await fetch(`/api/cms/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    const data = await res.json();
    if (!res.ok) return showToast("error", data.error || "Update failed");
    setUsers((prev) => prev.map((u) => (u.id === id ? data.user : u)));
    showToast("success", `Updated ${data.user.email} (${data.user.role} • ${data.user.status}).`);
  };

  const handleDeleteUser = async (id: string) => {
    const res = await fetch(`/api/cms/users/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) return showToast("error", data.error || "Delete failed");
    setUsers((prev) => prev.filter((u) => u.id !== id));
    showToast("success", "User account deleted.");
  };

  if (loadingAuth || !currentUser) {
    return (
      <div className="min-h-screen bg-[#050B18] pt-32 flex items-center justify-center">
        <div className="text-sm font-mono text-[#94A3B8] flex items-center space-x-2">
          <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" />
          <span>Verifying Zero-Trust IAM Session...</span>
        </div>
      </div>
    );
  }

  const pendingUsers = users.filter((u) => u.status === "PENDING");

  const filteredLogs = auditLogs.filter((log) => {
    const matchesStatus = auditStatusFilter === "ALL" || log.status === auditStatusFilter;
    const q = auditSearch.trim().toLowerCase();
    const matchesQuery =
      !q ||
      log.email.toLowerCase().includes(q) ||
      log.name.toLowerCase().includes(q) ||
      log.role.toLowerCase().includes(q);
    return matchesStatus && matchesQuery;
  });

  const roleBadgeClass = (role: string) => {
    if (role === "ADMIN") return "bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40";
    if (role === "MANAGER") return "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40";
    return "bg-[#0E1B33] text-[#94A3B8] border border-[#1B325C]";
  };

  return (
    <div className="min-h-screen bg-[#050B18] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Toast Feedback */}
        {toast && (
          <div
            className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl shadow-2xl border text-xs font-semibold flex items-center space-x-2.5 ${
              toast.type === "success"
                ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                : "bg-rose-50 border-rose-300 text-rose-900"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600" />
            )}
            <span>{toast.text}</span>
          </div>
        )}

        {/* Top IAM Identity Header */}
        <div className="bg-[#091224] rounded-3xl border border-[#1B325C] p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-[#0E1B33] border border-[#D4AF37]/30 text-[11px] font-mono font-bold text-[#D4AF37]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>DUZZA CMS IAM PORTAL</span>
              </span>
              <span
                className={`px-2.5 py-1 rounded-full border text-[11px] font-mono font-bold ${roleBadgeClass(
                  currentUser.role
                )}`}
              >
                ROLE: {currentUser.role}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono font-bold">
                STATUS: {currentUser.status}
              </span>
            </div>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
              Welcome, {currentUser.name}
            </h1>
            <p className="text-xs font-mono text-[#94A3B8]">{currentUser.email}</p>
          </div>

          <div className="flex items-center space-x-3">
            {isPrivileged && pendingUsers.length > 0 && (
              <button
                onClick={() => setActiveTab("users")}
                className="px-3.5 py-2 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold flex items-center space-x-1.5 cursor-pointer hover:bg-[#D4AF37]/30"
              >
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{pendingUsers.length} Pending Approval</span>
              </button>
            )}

            <button
              onClick={handleLogout}
              className="px-4 py-2.5 rounded-xl bg-[#0E1B33] hover:bg-[#142547] text-[#CBD5E1] border border-[#1B325C] text-xs font-bold uppercase tracking-wider flex items-center space-x-2 cursor-pointer transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Contributor Guardrail Banner */}
        {currentUser.role === "CONTRIBUTOR" && (
          <div className="p-4 rounded-2xl bg-[#0E1B33] border border-[#D4AF37]/30 flex items-start space-x-3 text-xs text-[#CBD5E1]">
            <Lock className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
            <div>
              <strong className="block text-[#D4AF37]">CONTRIBUTOR Permissions Active</strong>
              <span>
                You are authorized to <strong>upload new projects, upload images, and add notifications</strong>.
                Deleting projects, deleting images, managing permissions, and viewing audit logs are strictly blocked by server-side IAM middleware.
              </span>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 bg-[#091224] p-2 rounded-2xl border border-[#1B325C] shadow-xs">
          <button
            onClick={() => setActiveTab("projects")}
            style={activeTab === "projects" ? { backgroundColor: "#D4AF37", color: "#050B18" } : {}}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer ${
              activeTab === "projects"
                ? "bg-[#D4AF37] text-[#050B18] shadow-md shadow-[#D4AF37]/20 font-bold"
                : "text-[#94A3B8] hover:bg-[#0E1B33] hover:text-white"
            }`}
          >
            <FolderPlus className="w-4 h-4" />
            <span>Projects ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("images")}
            style={activeTab === "images" ? { backgroundColor: "#D4AF37", color: "#050B18" } : {}}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer ${
              activeTab === "images"
                ? "bg-[#D4AF37] text-[#050B18] shadow-md shadow-[#D4AF37]/20 font-bold"
                : "text-[#94A3B8] hover:bg-[#0E1B33] hover:text-white"
            }`}
          >
            <ImagePlus className="w-4 h-4" />
            <span>Media Images ({images.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("notifications")}
            style={activeTab === "notifications" ? { backgroundColor: "#D4AF37", color: "#050B18" } : {}}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer ${
              activeTab === "notifications"
                ? "bg-[#D4AF37] text-[#050B18] shadow-md shadow-[#D4AF37]/20 font-bold"
                : "text-[#94A3B8] hover:bg-[#0E1B33] hover:text-white"
            }`}
          >
            <BellPlus className="w-4 h-4" />
            <span>Notifications ({notifications.length})</span>
          </button>

          {isPrivileged && (
            <>
              <button
                onClick={() => setActiveTab("users")}
                style={activeTab === "users" ? { backgroundColor: "#D4AF37", color: "#050B18" } : {}}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer ${
                  activeTab === "users"
                    ? "bg-[#D4AF37] text-[#050B18] shadow-md shadow-[#D4AF37]/20 font-bold"
                    : "text-[#94A3B8] hover:bg-[#0E1B33] hover:text-white"
                }`}
              >
                <Users className="w-4 h-4" />
                <span>User Approvals & IAM ({users.length})</span>
              </button>

              <button
                onClick={() => setActiveTab("audit")}
                style={activeTab === "audit" ? { backgroundColor: "#D4AF37", color: "#050B18" } : {}}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer ${
                  activeTab === "audit"
                    ? "bg-[#D4AF37] text-[#050B18] shadow-md shadow-[#D4AF37]/20 font-bold"
                    : "text-[#94A3B8] hover:bg-[#0E1B33] hover:text-white"
                }`}
              >
                <FileClock className="w-4 h-4" />
                <span>Login Audit Logs ({auditLogs.length})</span>
              </button>
            </>
          )}
        </div>

        {/* ==================== TAB 1: PROJECTS ==================== */}
        {activeTab === "projects" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 bg-[#091224] rounded-3xl border border-[#1B325C] p-6 shadow-sm h-fit space-y-4">
              <h2 className="font-display font-bold text-lg text-[#FFFFFF] flex items-center space-x-2">
                <FolderPlus className="w-5 h-5 text-[#D4AF37]" />
                <span>Upload New Project</span>
              </h2>
              <form onSubmit={handleCreateProject} className="space-y-3.5">
                <input
                  type="text"
                  required
                  value={prjTitle}
                  onChange={(e) => setPrjTitle(e.target.value)}
                  placeholder="Project Title *"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-[#050B18]/50"
                />
                <select
                  value={prjDivision}
                  onChange={(e) => setPrjDivision(e.target.value as CmsProject["division"])}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-[#050B18]/50"
                >
                  <option value="Duzza Projects">Duzza Projects</option>
                  <option value="Duzza Branding">Duzza Branding</option>
                  <option value="Duzza Fashion">Duzza Fashion</option>
                  <option value="Duzza Bakery">Duzza Bakery</option>
                </select>
                <input
                  type="text"
                  required
                  value={prjLocation}
                  onChange={(e) => setPrjLocation(e.target.value)}
                  placeholder="Location *"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-[#050B18]/50"
                />
                <input
                  type="url"
                  value={prjImgUrl}
                  onChange={(e) => setPrjImgUrl(e.target.value)}
                  placeholder="Cover Image URL (optional)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-[#050B18]/50"
                />
                <textarea
                  required
                  rows={3}
                  value={prjDesc}
                  onChange={(e) => setPrjDesc(e.target.value)}
                  placeholder="Project Scope & Summary *"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-[#050B18]/50 resize-none"
                />
                <button
                  type="submit"
                  style={{ backgroundColor: "#D4AF37", color: "#050B18" }}
                  className="btn-brand-primary w-full py-3 rounded-xl bg-[#D4AF37] text-[#050B18] font-bold text-xs uppercase tracking-wider cursor-pointer shadow-md shadow-[#D4AF37]/20"
                >
                  Upload Project
                </button>
              </form>
            </div>

            <div className="lg:col-span-8 space-y-4">
              {projects.map((p) => (
                <div
                  key={p.id}
                  className="bg-[#091224] rounded-2xl border border-[#1B325C] p-5 shadow-xs flex flex-col sm:flex-row justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[#0E1B33] text-[#D4AF37] border border-[#D4AF37]/30 text-[10px] font-mono font-bold">
                        {p.division}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">{p.location}</span>
                    </div>
                    <h3 className="font-display font-bold text-base text-[#FFFFFF]">{p.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{p.description}</p>
                    <p className="text-[10px] font-mono text-slate-400">
                      Uploaded by {p.createdBy} ({p.createdByEmail}) •{" "}
                      {new Date(p.createdAt).toLocaleString()}
                    </p>
                  </div>

                  {isPrivileged && (
                    <button
                      onClick={() => handleDeleteProject(p.id)}
                      className="self-start px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold flex items-center space-x-1.5 cursor-pointer shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== TAB 2: IMAGES ==================== */}
        {activeTab === "images" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 bg-[#091224] rounded-3xl border border-[#1B325C] p-6 shadow-sm h-fit space-y-4">
              <h2 className="font-display font-bold text-lg text-[#FFFFFF] flex items-center space-x-2">
                <ImagePlus className="w-5 h-5 text-[#D4AF37]" />
                <span>Upload Media Image</span>
              </h2>
              <form onSubmit={handleUploadImage} className="space-y-3.5">
                <input
                  type="text"
                  required
                  value={imgTitle}
                  onChange={(e) => setImgTitle(e.target.value)}
                  placeholder="Image Title *"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#1B325C] text-xs bg-[#0E1B33] text-white placeholder-[#94A3B8]"
                />
                <input
                  type="text"
                  value={imgCategory}
                  onChange={(e) => setImgCategory(e.target.value)}
                  placeholder="Category (e.g. Marine Geomatics)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#1B325C] text-xs bg-[#0E1B33] text-white placeholder-[#94A3B8]"
                />
                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#94A3B8] mb-1">
                    Select Image File (or paste URL below)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImgFile(e.target.files?.[0] || null)}
                    className="w-full text-xs text-[#94A3B8] file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-[#0E1B33] file:text-[#D4AF37] file:font-bold"
                  />
                </div>
                <input
                  type="url"
                  value={imgUrl}
                  onChange={(e) => setImgUrl(e.target.value)}
                  placeholder="Or Image URL (https://...)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#1B325C] text-xs bg-[#0E1B33] text-white placeholder-[#94A3B8]"
                />
                <button
                  type="submit"
                  style={{ backgroundColor: "#D4AF37", color: "#050B18" }}
                  className="btn-brand-primary w-full py-3 rounded-xl bg-[#D4AF37] text-[#050B18] font-bold text-xs uppercase tracking-wider cursor-pointer shadow-md shadow-[#D4AF37]/20"
                >
                  Upload Image
                </button>
              </form>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="bg-[#091224] rounded-2xl border border-[#1B325C] overflow-hidden shadow-xs flex flex-col justify-between"
                >
                  <div className="h-44 bg-[#0E1B33] relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.url}
                      alt={img.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 space-y-2 flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase">
                        {img.category}
                      </span>
                      <h3 className="font-bold text-sm text-[#FFFFFF]">{img.title}</h3>
                      <p className="text-[10px] font-mono text-slate-400">
                        By {img.uploadedBy}
                      </p>
                    </div>
                    {isPrivileged && (
                      <button
                        onClick={() => handleDeleteImage(img.id)}
                        className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 cursor-pointer shrink-0"
                        title="Delete Image"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== TAB 3: NOTIFICATIONS ==================== */}
        {activeTab === "notifications" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 bg-[#091224] rounded-3xl border border-[#1B325C] p-6 shadow-sm h-fit space-y-4">
              <h2 className="font-display font-bold text-lg text-[#FFFFFF] flex items-center space-x-2">
                <BellPlus className="w-5 h-5 text-[#D4AF37]" />
                <span>Add Notification</span>
              </h2>
              <form onSubmit={handleAddNotification} className="space-y-3.5">
                <input
                  type="text"
                  required
                  value={ntfTitle}
                  onChange={(e) => setNtfTitle(e.target.value)}
                  placeholder="Notification Title *"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#1B325C] text-xs bg-[#0E1B33] text-white placeholder-[#94A3B8]"
                />
                <select
                  value={ntfPriority}
                  onChange={(e) => setNtfPriority(e.target.value as CmsNotification["priority"])}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#1B325C] text-xs bg-[#0E1B33] text-white"
                >
                  <option value="INFO">INFO</option>
                  <option value="IMPORTANT">IMPORTANT</option>
                  <option value="URGENT">URGENT</option>
                </select>
                <textarea
                  required
                  rows={3}
                  value={ntfMessage}
                  onChange={(e) => setNtfMessage(e.target.value)}
                  placeholder="Notification message..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#1B325C] text-xs bg-[#0E1B33] text-white placeholder-[#94A3B8] resize-none"
                />
                <button
                  type="submit"
                  style={{ backgroundColor: "#D4AF37", color: "#050B18" }}
                  className="btn-brand-primary w-full py-3 rounded-xl bg-[#D4AF37] text-[#050B18] font-bold text-xs uppercase tracking-wider cursor-pointer shadow-md shadow-[#D4AF37]/20"
                >
                  Publish Notification
                </button>
              </form>
            </div>

            <div className="lg:col-span-8 space-y-3">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className="bg-[#091224] rounded-2xl border border-[#1B325C] p-5 shadow-xs flex justify-between items-start gap-4"
                >
                  <div className="space-y-1">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                        n.priority === "URGENT"
                          ? "bg-rose-500/20 text-rose-300 border-rose-500/30"
                          : n.priority === "IMPORTANT"
                          ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                          : "bg-[#0E1B33] text-[#D4AF37] border border-[#D4AF37]/30"
                      }`}
                    >
                      {n.priority}
                    </span>
                    <h3 className="font-bold text-sm text-[#FFFFFF]">{n.title}</h3>
                    <p className="text-xs text-slate-600">{n.message}</p>
                    <p className="text-[10px] font-mono text-slate-400">
                      Posted by {n.createdBy} • {new Date(n.createdAt).toLocaleString()}
                    </p>
                  </div>
                  {isPrivileged && (
                    <button
                      onClick={() => handleDeleteNotification(n.id)}
                      className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 cursor-pointer"
                      title="Delete Notification"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== TAB 4: USER APPROVALS & IAM (ADMIN & MANAGER ONLY) ==================== */}
        {activeTab === "users" && isPrivileged && (
          <div className="space-y-6">
            {/* Pending Approval Queue */}
            <div className="bg-[#091224] rounded-3xl border border-amber-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display font-bold text-lg text-[#FFFFFF] flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-amber-600" />
                  <span>Pending Account Approvals ({pendingUsers.length})</span>
                </h2>
              </div>

              {pendingUsers.length === 0 ? (
                <p className="text-xs text-slate-500">
                  No pending user signups awaiting approval.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pendingUsers.map((u) => (
                    <div
                      key={u.id}
                      className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 flex items-center justify-between gap-3"
                    >
                      <div>
                        <div className="font-bold text-sm text-[#FFFFFF]">{u.name}</div>
                        <div className="text-xs font-mono text-slate-600">{u.email}</div>
                        <div className="text-[10px] font-mono text-amber-800 mt-1">
                          Role: {u.role} • Status: {u.status}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleUpdateUser(u.id, { status: "ACTIVE" })}
                          className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer"
                        >
                          Approve → ACTIVE
                        </button>
                        <button
                          onClick={() => handleDeleteUser(u.id)}
                          className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 cursor-pointer"
                          title="Reject & Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Invite / Add New Person */}
              <div className="lg:col-span-4 bg-[#091224] rounded-3xl border border-[#1B325C] p-6 shadow-sm h-fit space-y-4">
                <h2 className="font-display font-bold text-lg text-[#FFFFFF] flex items-center space-x-2">
                  <UserPlus className="w-5 h-5 text-[#D4AF37]" />
                  <span>Invite / Add Person</span>
                </h2>
                <form onSubmit={handleInviteUser} className="space-y-3.5">
                  <input
                    type="text"
                    required
                    value={invName}
                    onChange={(e) => setInvName(e.target.value)}
                    placeholder="Full Name *"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#1B325C] text-xs bg-[#0E1B33] text-white placeholder-[#94A3B8]"
                  />
                  <input
                    type="email"
                    required
                    value={invEmail}
                    onChange={(e) => setInvEmail(e.target.value)}
                    placeholder="Email Address *"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#1B325C] text-xs bg-[#0E1B33] text-white placeholder-[#94A3B8]"
                  />
                  <input
                    type="text"
                    required
                    value={invPassword}
                    onChange={(e) => setInvPassword(e.target.value)}
                    placeholder="Initial Password *"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#1B325C] text-xs bg-[#0E1B33] text-white placeholder-[#94A3B8]"
                  />
                  <select
                    value={invRole}
                    onChange={(e) => setInvRole(e.target.value as Role)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#1B325C] text-xs bg-[#0E1B33] text-white font-semibold"
                  >
                    <option value="CONTRIBUTOR">CONTRIBUTOR (Upload Only)</option>
                    <option value="MANAGER">MANAGER (Approve & Manage)</option>
                    {currentUser.role === "ADMIN" && (
                      <option value="ADMIN">ADMIN (Full Root Authority)</option>
                    )}
                  </select>
                  <button
                    type="submit"
                    style={{ backgroundColor: "#D4AF37", color: "#050B18" }}
                    className="btn-brand-primary w-full py-3 rounded-xl bg-[#D4AF37] text-[#050B18] font-bold text-xs uppercase tracking-wider cursor-pointer shadow-md shadow-[#D4AF37]/20"
                  >
                    Add Active Member
                  </button>
                </form>
              </div>

              {/* All Users & Permissions Table */}
              <div className="lg:col-span-8 bg-[#091224] rounded-3xl border border-[#1B325C] p-6 shadow-sm overflow-x-auto">
                <h2 className="font-display font-bold text-lg text-[#FFFFFF] mb-4">
                  Manage Directory & Permissions
                </h2>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#1B325C] text-[11px] font-mono uppercase text-slate-500">
                      <th className="py-2.5 pr-4">User</th>
                      <th className="py-2.5 pr-4">Role</th>
                      <th className="py-2.5 pr-4">Status</th>
                      <th className="py-2.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {users.map((u) => {
                      const isRootAdmin = u.email === "lipexbagsalot@gmail.com";
                      return (
                        <tr key={u.id}>
                          <td className="py-3 pr-4">
                            <div className="font-bold text-[#FFFFFF]">{u.name}</div>
                            <div className="font-mono text-[11px] text-slate-500">{u.email}</div>
                          </td>
                          <td className="py-3 pr-4">
                            <select
                              disabled={
                                isRootAdmin ||
                                (currentUser.role !== "ADMIN" && u.role === "ADMIN")
                              }
                              value={u.role}
                              onChange={(e) =>
                                handleUpdateUser(u.id, { role: e.target.value as Role })
                              }
                              className="px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-mono font-bold bg-[#050B18] disabled:opacity-60"
                            >
                              <option value="CONTRIBUTOR">CONTRIBUTOR</option>
                              <option value="MANAGER">MANAGER</option>
                              {(currentUser.role === "ADMIN" || u.role === "ADMIN") && (
                                <option value="ADMIN">ADMIN</option>
                              )}
                            </select>
                          </td>
                          <td className="py-3 pr-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border ${
                                u.status === "ACTIVE"
                                  ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                                  : u.status === "PENDING"
                                  ? "bg-amber-50 text-amber-800 border-amber-200"
                                  : "bg-rose-50 text-rose-800 border-rose-200"
                              }`}
                            >
                              {u.status}
                            </span>
                          </td>
                          <td className="py-3 text-right space-x-2 whitespace-nowrap">
                            {u.status !== "ACTIVE" && (
                              <button
                                onClick={() => handleUpdateUser(u.id, { status: "ACTIVE" })}
                                className="px-2.5 py-1.5 rounded-lg bg-emerald-600 text-white text-[11px] font-bold cursor-pointer"
                              >
                                Activate
                              </button>
                            )}
                            {u.status === "ACTIVE" && !isRootAdmin && (
                              <button
                                onClick={() => handleUpdateUser(u.id, { status: "SUSPENDED" })}
                                className="px-2.5 py-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-bold cursor-pointer"
                                title="Suspend Account"
                              >
                                <Ban className="w-3.5 h-3.5 inline" />
                              </button>
                            )}
                            {!isRootAdmin && u.id !== currentUser.id && (
                              <button
                                onClick={() => handleDeleteUser(u.id)}
                                className="px-2.5 py-1.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 text-[11px] font-bold cursor-pointer"
                                title="Delete Account"
                              >
                                <Trash2 className="w-3.5 h-3.5 inline" />
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 5: LOGIN AUDIT LOGS (ADMIN & MANAGER ONLY) ==================== */}
        {activeTab === "audit" && isPrivileged && (
          <div className="bg-[#091224] rounded-3xl border border-[#1B325C] p-6 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display font-bold text-lg text-[#FFFFFF] flex items-center space-x-2">
                  <FileClock className="w-5 h-5 text-[#D4AF37]" />
                  <span>Authentication & Login Audit Logs</span>
                </h2>
                <p className="text-xs text-[#94A3B8]">
                  Every login attempt (success, pending blocks, failed credentials) is automatically persisted.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={auditSearch}
                    onChange={(e) => setAuditSearch(e.target.value)}
                    placeholder="Search email or name..."
                    className="pl-8 pr-3 py-2 rounded-xl border border-[#1B325C] text-xs bg-[#0E1B33] text-white placeholder-[#94A3B8]"
                  />
                </div>
                <select
                  value={auditStatusFilter}
                  onChange={(e) => setAuditStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-[#1B325C] text-xs bg-[#0E1B33] text-white font-mono"
                >
                  <option value="ALL">ALL STATUSES</option>
                  <option value="SUCCESS">SUCCESS</option>
                  <option value="BLOCKED_PENDING">BLOCKED_PENDING</option>
                  <option value="BLOCKED_SUSPENDED">BLOCKED_SUSPENDED</option>
                  <option value="FAILED_CREDENTIALS">FAILED_CREDENTIALS</option>
                </select>
                <button
                  onClick={() => fetchAllData(currentUser)}
                  className="p-2 rounded-xl border border-[#1B325C] bg-[#050B18] hover:bg-slate-100 cursor-pointer"
                  title="Refresh Audit Logs"
                >
                  <RefreshCw className="w-4 h-4 text-slate-600" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#1B325C] text-[11px] font-mono uppercase text-slate-500">
                    <th className="py-2.5 pr-4">Timestamp</th>
                    <th className="py-2.5 pr-4">User / Email</th>
                    <th className="py-2.5 pr-4">Role</th>
                    <th className="py-2.5 pr-4">Login Status</th>
                    <th className="py-2.5">IP / Client</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredLogs.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-400 font-mono">
                        No login events recorded yet.
                      </td>
                    </tr>
                  ) : (
                    filteredLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-[#050B18]/70">
                        <td className="py-3 pr-4 font-mono text-[11px] text-slate-600 whitespace-nowrap">
                          {new Date(log.timestamp).toLocaleString()}
                        </td>
                        <td className="py-3 pr-4">
                          <div className="font-bold text-[#FFFFFF]">{log.name}</div>
                          <div className="font-mono text-[11px] text-slate-500">{log.email}</div>
                        </td>
                        <td className="py-3 pr-4">
                          <span
                            className={`px-2 py-0.5 rounded-full border text-[10px] font-mono font-bold ${roleBadgeClass(
                              log.role
                            )}`}
                          >
                            {log.role}
                          </span>
                        </td>
                        <td className="py-3 pr-4">
                          <span
                            className={`px-2.5 py-1 rounded-full border text-[10px] font-mono font-bold ${
                              log.status === "SUCCESS"
                                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                                : log.status === "BLOCKED_PENDING"
                                ? "bg-amber-50 text-amber-800 border-amber-200"
                                : "bg-rose-50 text-rose-800 border-rose-200"
                            }`}
                          >
                            {log.status}
                          </span>
                        </td>
                        <td className="py-3 font-mono text-[11px] text-slate-500 max-w-xs truncate">
                          {log.ipAddress} • {log.userAgent}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

