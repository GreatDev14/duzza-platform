export type Role = "ADMIN" | "MANAGER" | "CONTRIBUTOR";

export type AccountStatus = "PENDING" | "ACTIVE" | "SUSPENDED";

export type LoginAuditStatus =
  | "SUCCESS"
  | "BLOCKED_PENDING"
  | "BLOCKED_SUSPENDED"
  | "FAILED_CREDENTIALS";

export interface IamUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
  status: AccountStatus;
  invitedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export type PublicIamUser = Omit<IamUser, "passwordHash">;

export interface LoginAuditLog {
  id: string;
  userId: string | null;
  name: string;
  email: string;
  role: Role | "UNKNOWN";
  status: LoginAuditStatus;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
}

export interface CmsProject {
  id: string;
  title: string;
  division: "Duzza Projects" | "Duzza Branding" | "Duzza Fashion" | "Duzza Bakery";
  location: string;
  description: string;
  imageUrl?: string;
  createdBy: string;
  createdByEmail: string;
  createdAt: string;
}

export interface CmsImage {
  id: string;
  title: string;
  category: string;
  url: string;
  uploadedBy: string;
  uploadedByEmail: string;
  createdAt: string;
}

export interface CmsNotification {
  id: string;
  title: string;
  message: string;
  priority: "INFO" | "IMPORTANT" | "URGENT";
  createdBy: string;
  createdByEmail: string;
  createdAt: string;
}

export interface IamDatabaseSchema {
  users: IamUser[];
  auditLogs: LoginAuditLog[];
  projects: CmsProject[];
  images: CmsImage[];
  notifications: CmsNotification[];
}

export interface SessionPayload {
  userId: string;
  email: string;
  name: string;
  role: Role;
  exp: number;
}

