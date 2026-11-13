import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, verifySessionToken } from "./crypto";
import { findUserById } from "./db";
import { PublicIamUser, Role } from "./types";

export interface AuthGuardSuccess {
  ok: true;
  user: PublicIamUser;
}

export interface AuthGuardFailure {
  ok: false;
  response: NextResponse;
}

/**
 * Backend server-side role & status check middleware.
 * Validates signed HTTP-only cookie, checks live Postgres status === 'ACTIVE',
 * blocks DELETE operations for CONTRIBUTOR, and enforces rigid role permissions.
 */
export async function requireActiveRole(
  req: NextRequest,
  allowedRoles: Role[] = ["ADMIN", "MANAGER", "CONTRIBUTOR"]
): Promise<AuthGuardSuccess | AuthGuardFailure> {
  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = verifySessionToken(token);

  if (!session) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Unauthorized: Valid CMS session required." },
        { status: 401 }
      ),
    };
  }

  const liveUser = await findUserById(session.userId);
  if (!liveUser) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Unauthorized: Account no longer exists." },
        { status: 401 }
      ),
    };
  }

  if (liveUser.status !== "ACTIVE") {
    return {
      ok: false,
      response: NextResponse.json(
        {
          error:
            liveUser.status === "PENDING"
              ? "Account pending approval. An ADMIN or MANAGER must activate your account."
              : "Account suspended. Please contact institutional administration.",
          status: liveUser.status,
        },
        { status: 403 }
      ),
    };
  }

  // Rigid Role Enforcement
  if (!allowedRoles.includes(liveUser.role)) {
    return {
      ok: false,
      response: NextResponse.json(
        {
          error: `Forbidden: Role '${liveUser.role}' is not authorized for this resource.`,
        },
        { status: 403 }
      ),
    };
  }

  // Server-Side Role Check: CONTRIBUTOR is STRICTLY forbidden from DELETE
  if (req.method === "DELETE" && liveUser.role === "CONTRIBUTOR") {
    return {
      ok: false,
      response: NextResponse.json(
        {
          error:
            "Strict IAM Role Violation: Active 'CONTRIBUTOR' accounts are strictly forbidden from deleting resources.",
        },
        { status: 403 }
      ),
    };
  }

  return {
    ok: true,
    user: {
      id: liveUser.id,
      name: liveUser.name,
      email: liveUser.email,
      role: liveUser.role,
      status: liveUser.status,
      invitedBy: liveUser.invitedBy,
      createdAt: liveUser.createdAt,
      updatedAt: liveUser.updatedAt,
    },
  };
}
