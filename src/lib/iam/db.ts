import crypto from "crypto";
import { query } from "@/lib/db/client";
import { hashPassword } from "./crypto";
import {
  AccountStatus,
  CmsImage,
  CmsNotification,
  CmsProject,
  IamUser,
  LoginAuditLog,
  PublicIamUser,
  Role,
} from "./types";

export function sanitizeUser(user: IamUser): PublicIamUser {
  const { passwordHash: _removed, ...rest } = user;
  return rest;
}

function mapUserRow(r: any): IamUser {
  return {
    id: r.id,
    name: r.name,
    email: r.email,
    passwordHash: r.password_hash,
    role: r.role as Role,
    status: r.status as AccountStatus,
    invitedBy: r.invited_by || undefined,
    createdAt: new Date(r.created_at).toISOString(),
    updatedAt: new Date(r.updated_at).toISOString(),
  };
}

function mapAuditRow(r: any): LoginAuditLog {
  return {
    id: r.id,
    userId: r.user_id || undefined,
    name: r.name,
    email: r.email,
    role: r.role as Role,
    status: r.status,
    ipAddress: r.ip_address || undefined,
    userAgent: r.user_agent || undefined,
    timestamp: new Date(r.timestamp).toISOString(),
  };
}

function mapProjectRow(r: any): CmsProject {
  return {
    id: r.id,
    title: r.title,
    division: r.division,
    location: r.location,
    description: r.description,
    imageUrl: r.image_url || undefined,
    createdBy: r.created_by,
    createdByEmail: r.created_by_email,
    createdAt: new Date(r.created_at).toISOString(),
  };
}

function mapImageRow(r: any): CmsImage {
  return {
    id: r.id,
    title: r.title,
    category: r.category,
    url: r.url,
    uploadedBy: r.uploaded_by,
    uploadedByEmail: r.uploaded_by_email,
    createdAt: new Date(r.created_at).toISOString(),
  };
}

function mapNotificationRow(r: any): CmsNotification {
  return {
    id: r.id,
    title: r.title,
    message: r.message,
    priority: r.priority,
    createdBy: r.created_by,
    createdByEmail: r.created_by_email,
    createdAt: new Date(r.created_at).toISOString(),
  };
}

export async function findUserByEmail(email: string): Promise<IamUser | undefined> {
  const rows = await query<any>(
    "SELECT * FROM iam_users WHERE LOWER(email) = LOWER($1) LIMIT 1",
    [email.trim()]
  );
  if (rows.length === 0) return undefined;
  return mapUserRow(rows[0]);
}

export async function findUserById(id: string): Promise<IamUser | undefined> {
  const rows = await query<any>(
    "SELECT * FROM iam_users WHERE id = $1 LIMIT 1",
    [id]
  );
  if (rows.length === 0) return undefined;
  return mapUserRow(rows[0]);
}

export async function listUsers(): Promise<PublicIamUser[]> {
  const rows = await query<any>(
    "SELECT * FROM iam_users ORDER BY created_at DESC"
  );
  return rows.map(mapUserRow).map(sanitizeUser);
}

export async function createUser(input: {
  name: string;
  email: string;
  password: string;
  role: Role;
  status: AccountStatus;
  invitedBy?: string;
}): Promise<PublicIamUser> {
  const normalizedEmail = input.email.trim().toLowerCase();
  const existing = await findUserByEmail(normalizedEmail);
  if (existing) {
    throw new Error("An account with this email already exists.");
  }

  const id = `usr-${crypto.randomUUID().slice(0, 8)}`;
  const hash = hashPassword(input.password);
  const now = new Date();

  const rows = await query<any>(
    `INSERT INTO iam_users (id, name, email, password_hash, role, status, invited_by, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING *`,
    [id, input.name.trim(), normalizedEmail, hash, input.role, input.status, input.invitedBy || null, now, now]
  );

  return sanitizeUser(mapUserRow(rows[0]));
}

export async function updateUser(
  userId: string,
  updates: { role?: Role; status?: AccountStatus; name?: string }
): Promise<PublicIamUser | null> {
  const target = await findUserById(userId);
  if (!target) return null;

  if (target.email === "lipexbagsalot@gmail.com") {
    if (updates.role && updates.role !== "ADMIN") {
      throw new Error("Primary Root ADMIN cannot be demoted.");
    }
    if (updates.status && updates.status !== "ACTIVE") {
      throw new Error("Primary Root ADMIN cannot be suspended.");
    }
  }

  const newRole = updates.role || target.role;
  const newStatus = updates.status || target.status;
  const newName = updates.name ? updates.name.trim() : target.name;
  const now = new Date();

  const rows = await query<any>(
    `UPDATE iam_users
     SET role = $1, status = $2, name = $3, updated_at = $4
     WHERE id = $5
     RETURNING *`,
    [newRole, newStatus, newName, now, userId]
  );

  if (rows.length === 0) return null;
  return sanitizeUser(mapUserRow(rows[0]));
}

export async function deleteUserById(userId: string): Promise<boolean> {
  const target = await findUserById(userId);
  if (!target) return false;
  if (target.email === "lipexbagsalot@gmail.com") {
    throw new Error("Primary Root ADMIN account cannot be deleted.");
  }
  await query("DELETE FROM iam_users WHERE id = $1", [userId]);
  return true;
}

export async function recordLoginAudit(
  entry: Omit<LoginAuditLog, "id" | "timestamp">
): Promise<LoginAuditLog> {
  const id = `log-${crypto.randomUUID().slice(0, 8)}`;
  const now = new Date();
  await query(
    `INSERT INTO iam_login_audit_logs (id, user_id, name, email, role, status, ip_address, user_agent, timestamp)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    [
      id,
      entry.userId || null,
      entry.name,
      entry.email,
      entry.role,
      entry.status,
      entry.ipAddress || null,
      entry.userAgent || null,
      now,
    ]
  );
  return {
    id,
    timestamp: now.toISOString(),
    ...entry,
  };
}

export async function listLoginAuditLogs(): Promise<LoginAuditLog[]> {
  const rows = await query<any>(
    "SELECT * FROM iam_login_audit_logs ORDER BY timestamp DESC LIMIT 500"
  );
  return rows.map(mapAuditRow);
}

export async function listProjects(): Promise<CmsProject[]> {
  const rows = await query<any>(
    "SELECT * FROM cms_projects ORDER BY created_at DESC"
  );
  return rows.map(mapProjectRow);
}

export async function createProject(
  input: Omit<CmsProject, "id" | "createdAt">
): Promise<CmsProject> {
  const id = `prj-${crypto.randomUUID().slice(0, 8)}`;
  const now = new Date();
  const rows = await query<any>(
    `INSERT INTO cms_projects (id, title, division, location, description, image_url, created_by, created_by_email, created_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING *`,
    [
      id,
      input.title,
      input.division,
      input.location,
      input.description,
      input.imageUrl || null,
      input.createdBy,
      input.createdByEmail,
      now,
    ]
  );
  return mapProjectRow(rows[0]);
}

export async function deleteProjectById(id: string): Promise<boolean> {
  const res = await query<any>(
    "DELETE FROM cms_projects WHERE id = $1 RETURNING id",
    [id]
  );
  return res.length > 0;
}

export async function listImages(): Promise<CmsImage[]> {
  const rows = await query<any>(
    "SELECT * FROM cms_images ORDER BY created_at DESC"
  );
  return rows.map(mapImageRow);
}

export async function createImage(
  input: Omit<CmsImage, "id" | "createdAt">
): Promise<CmsImage> {
  const id = `img-${crypto.randomUUID().slice(0, 8)}`;
  const now = new Date();
  const rows = await query<any>(
    `INSERT INTO cms_images (id, title, category, url, uploaded_by, uploaded_by_email, created_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [
      id,
      input.title,
      input.category,
      input.url,
      input.uploadedBy,
      input.uploadedByEmail,
      now,
    ]
  );
  return mapImageRow(rows[0]);
}

export async function deleteImageById(id: string): Promise<boolean> {
  const res = await query<any>(
    "DELETE FROM cms_images WHERE id = $1 RETURNING id",
    [id]
  );
  return res.length > 0;
}

export async function listNotifications(): Promise<CmsNotification[]> {
  const rows = await query<any>(
    "SELECT * FROM cms_notifications ORDER BY created_at DESC"
  );
  return rows.map(mapNotificationRow);
}

export async function createNotification(
  input: Omit<CmsNotification, "id" | "createdAt">
): Promise<CmsNotification> {
  const id = `ntf-${crypto.randomUUID().slice(0, 8)}`;
  const now = new Date();
  const rows = await query<any>(
    `INSERT INTO cms_notifications (id, title, message, priority, created_by, created_by_email, created_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [
      id,
      input.title,
      input.message,
      input.priority,
      input.createdBy,
      input.createdByEmail,
      now,
    ]
  );
  return mapNotificationRow(rows[0]);
}

export async function deleteNotificationById(id: string): Promise<boolean> {
  const res = await query<any>(
    "DELETE FROM cms_notifications WHERE id = $1 RETURNING id",
    [id]
  );
  return res.length > 0;
}
