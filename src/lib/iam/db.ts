import fs from "fs";
import path from "path";
import crypto from "crypto";
import { hashPassword } from "./crypto";
import {
  AccountStatus,
  CmsImage,
  CmsNotification,
  CmsProject,
  IamDatabaseSchema,
  IamUser,
  LoginAuditLog,
  PublicIamUser,
  Role,
} from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "iam-cms-db.json");

function createSeedDatabase(): IamDatabaseSchema {
  const now = new Date().toISOString();

  const adminUser: IamUser = {
    id: "usr-admin-001",
    name: "Executive Admin",
    email: "lipexbagsalot@gmail.com",
    passwordHash: hashPassword("admin"),
    role: "ADMIN",
    status: "ACTIVE",
    createdAt: now,
    updatedAt: now,
  };

  const managerUser: IamUser = {
    id: "usr-manager-002",
    name: "Mr. Caleb",
    email: "duzzacontact@gmail.com",
    passwordHash: hashPassword("admin"),
    role: "MANAGER",
    status: "ACTIVE",
    invitedBy: "lipexbagsalot@gmail.com",
    createdAt: now,
    updatedAt: now,
  };

  const sampleProjects: CmsProject[] = [
    {
      id: "prj-001",
      title: "Warri Port Channel Multibeam Bathymetric Survey",
      division: "Duzza Projects",
      location: "Warri, Delta State",
      description:
        "High-resolution acoustic seabed charting and pipeline burial depth verification across 42km fairway.",
      imageUrl:
        "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80",
      createdBy: "Executive Admin",
      createdByEmail: "lipexbagsalot@gmail.com",
      createdAt: now,
    },
    {
      id: "prj-002",
      title: "Executive Identity & Global Sports Kit Drop",
      division: "Duzza Branding",
      location: "Lagos / London",
      description:
        "End-to-end corporate visual identity system and sponsored Meta ad pipeline for international sports merchandise.",
      imageUrl:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=80",
      createdBy: "Mr. Caleb",
      createdByEmail: "duzzacontact@gmail.com",
      createdAt: now,
    },
  ];

  const sampleImages: CmsImage[] = [
    {
      id: "img-001",
      title: "Hydrographic Survey Vessel Alpha",
      category: "Marine Geomatics",
      url: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80",
      uploadedBy: "Executive Admin",
      uploadedByEmail: "lipexbagsalot@gmail.com",
      createdAt: now,
    },
    {
      id: "img-002",
      title: "Artisan Sourdough & Bistro Collection",
      category: "Duzza Bakery",
      url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80",
      uploadedBy: "Mr. Caleb",
      uploadedByEmail: "duzzacontact@gmail.com",
      createdAt: now,
    },
  ];

  const sampleNotifications: CmsNotification[] = [
    {
      id: "ntf-001",
      title: "Q4 Warri Logistics Base Audit Complete",
      message:
        "All hydrospatial sonar units passed ISO calibration checks. Ready for offshore deployment.",
      priority: "IMPORTANT",
      createdBy: "Executive Admin",
      createdByEmail: "lipexbagsalot@gmail.com",
      createdAt: now,
    },
  ];

  return {
    users: [adminUser, managerUser],
    auditLogs: [],
    projects: sampleProjects,
    images: sampleImages,
    notifications: sampleNotifications,
  };
}

function ensureDbFile(): IamDatabaseSchema {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    const seed = createSeedDatabase();
    fs.writeFileSync(DB_FILE, JSON.stringify(seed, null, 2), "utf8");
    return seed;
  }
  try {
    const raw = fs.readFileSync(DB_FILE, "utf8");
    const parsed = JSON.parse(raw) as IamDatabaseSchema;
    // Guarantee seeded ADMIN and MANAGER always exist
    let modified = false;
    if (!parsed.users.some((u) => u.email.toLowerCase() === "lipexbagsalot@gmail.com")) {
      const seed = createSeedDatabase();
      parsed.users.unshift(seed.users[0]);
      modified = true;
    }
    if (!parsed.users.some((u) => u.email.toLowerCase() === "duzzacontact@gmail.com")) {
      const seed = createSeedDatabase();
      parsed.users.push(seed.users[1]);
      modified = true;
    }
    if (modified) {
      fs.writeFileSync(DB_FILE, JSON.stringify(parsed, null, 2), "utf8");
    }
    return parsed;
  } catch {
    const seed = createSeedDatabase();
    fs.writeFileSync(DB_FILE, JSON.stringify(seed, null, 2), "utf8");
    return seed;
  }
}

function saveDb(db: IamDatabaseSchema): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), "utf8");
}

export function sanitizeUser(user: IamUser): PublicIamUser {
  const { passwordHash: _removed, ...rest } = user;
  return rest;
}

export function findUserByEmail(email: string): IamUser | undefined {
  const db = ensureDbFile();
  return db.users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
}

export function findUserById(id: string): IamUser | undefined {
  const db = ensureDbFile();
  return db.users.find((u) => u.id === id);
}

export function listUsers(): PublicIamUser[] {
  const db = ensureDbFile();
  return db.users
    .slice()
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .map(sanitizeUser);
}

export function createUser(input: {
  name: string;
  email: string;
  password: string;
  role: Role;
  status: AccountStatus;
  invitedBy?: string;
}): PublicIamUser {
  const db = ensureDbFile();
  const normalizedEmail = input.email.trim().toLowerCase();
  if (db.users.some((u) => u.email.toLowerCase() === normalizedEmail)) {
    throw new Error("An account with this email already exists.");
  }

  const now = new Date().toISOString();
  const newUser: IamUser = {
    id: `usr-${crypto.randomUUID().slice(0, 8)}`,
    name: input.name.trim(),
    email: normalizedEmail,
    passwordHash: hashPassword(input.password),
    role: input.role,
    status: input.status,
    invitedBy: input.invitedBy,
    createdAt: now,
    updatedAt: now,
  };

  db.users.push(newUser);
  saveDb(db);
  return sanitizeUser(newUser);
}

export function updateUser(
  userId: string,
  updates: { role?: Role; status?: AccountStatus; name?: string }
): PublicIamUser | null {
  const db = ensureDbFile();
  const idx = db.users.findIndex((u) => u.id === userId);
  if (idx === -1) return null;

  const target = db.users[idx];
  // Protect primary admin email from being demoted or suspended by mistake
  if (target.email === "lipexbagsalot@gmail.com") {
    if (updates.role && updates.role !== "ADMIN") {
      throw new Error("Primary Root ADMIN cannot be demoted.");
    }
    if (updates.status && updates.status !== "ACTIVE") {
      throw new Error("Primary Root ADMIN cannot be suspended.");
    }
  }

  db.users[idx] = {
    ...target,
    ...(updates.role ? { role: updates.role } : {}),
    ...(updates.status ? { status: updates.status } : {}),
    ...(updates.name ? { name: updates.name.trim() } : {}),
    updatedAt: new Date().toISOString(),
  };

  saveDb(db);
  return sanitizeUser(db.users[idx]);
}

export function deleteUserById(userId: string): boolean {
  const db = ensureDbFile();
  const target = db.users.find((u) => u.id === userId);
  if (!target) return false;
  if (target.email === "lipexbagsalot@gmail.com") {
    throw new Error("Primary Root ADMIN account cannot be deleted.");
  }
  db.users = db.users.filter((u) => u.id !== userId);
  saveDb(db);
  return true;
}

export function recordLoginAudit(entry: Omit<LoginAuditLog, "id" | "timestamp">): LoginAuditLog {
  const db = ensureDbFile();
  const log: LoginAuditLog = {
    id: `log-${crypto.randomUUID().slice(0, 8)}`,
    timestamp: new Date().toISOString(),
    ...entry,
  };
  db.auditLogs.unshift(log);
  // Keep latest 500 logs
  if (db.auditLogs.length > 500) {
    db.auditLogs = db.auditLogs.slice(0, 500);
  }
  saveDb(db);
  return log;
}

export function listLoginAuditLogs(): LoginAuditLog[] {
  const db = ensureDbFile();
  return db.auditLogs;
}

export function listProjects(): CmsProject[] {
  const db = ensureDbFile();
  return db.projects;
}

export function createProject(
  input: Omit<CmsProject, "id" | "createdAt">
): CmsProject {
  const db = ensureDbFile();
  const project: CmsProject = {
    id: `prj-${crypto.randomUUID().slice(0, 8)}`,
    createdAt: new Date().toISOString(),
    ...input,
  };
  db.projects.unshift(project);
  saveDb(db);
  return project;
}

export function deleteProjectById(id: string): boolean {
  const db = ensureDbFile();
  const before = db.projects.length;
  db.projects = db.projects.filter((p) => p.id !== id);
  if (db.projects.length === before) return false;
  saveDb(db);
  return true;
}

export function listImages(): CmsImage[] {
  const db = ensureDbFile();
  return db.images;
}

export function createImage(input: Omit<CmsImage, "id" | "createdAt">): CmsImage {
  const db = ensureDbFile();
  const image: CmsImage = {
    id: `img-${crypto.randomUUID().slice(0, 8)}`,
    createdAt: new Date().toISOString(),
    ...input,
  };
  db.images.unshift(image);
  saveDb(db);
  return image;
}

export function deleteImageById(id: string): boolean {
  const db = ensureDbFile();
  const before = db.images.length;
  db.images = db.images.filter((img) => img.id !== id);
  if (db.images.length === before) return false;
  saveDb(db);
  return true;
}

export function listNotifications(): CmsNotification[] {
  const db = ensureDbFile();
  return db.notifications;
}

export function createNotification(
  input: Omit<CmsNotification, "id" | "createdAt">
): CmsNotification {
  const db = ensureDbFile();
  const note: CmsNotification = {
    id: `ntf-${crypto.randomUUID().slice(0, 8)}`,
    createdAt: new Date().toISOString(),
    ...input,
  };
  db.notifications.unshift(note);
  saveDb(db);
  return note;
}

export function deleteNotificationById(id: string): boolean {
  const db = ensureDbFile();
  const before = db.notifications.length;
  db.notifications = db.notifications.filter((n) => n.id !== id);
  if (db.notifications.length === before) return false;
  saveDb(db);
  return true;
}

