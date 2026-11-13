import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, verifySessionToken } from "./crypto";
import { findUserById, sanitizeUser } from "./db";
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
 * Validates signed HTTP-only cookie, checks live DB status === 'ACTIVE',
 * blocks DELETE operations for CONTRIBUTOR, and enforces rigid role permissions.
 */
export function requireActiveRole(
  req: NextRequest,
  allowedRoles: Role[] = ["ADMIN", "MANAGER", "CONTRIBUTOR"]
): AuthGuardSuccess | AuthGuardFailure {
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

  const liveUser = findUserById(session.userId);
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
              ? "Access Denied: Your account status is PENDING approval by an ADMIN or MANAGER."
              : "Access Denied: Your account has been SUSPENDED.",
          status: liveUser.status,
        },
        { status: 403 }
      ),
    };
  }

  // Strict server-side block: CONTRIBUTOR is NEVER permitted to perform DELETE requests
  if (req.method === "DELETE" && liveUser.role === "CONTRIBUTOR") {
    return {
      ok: false,
      response: NextResponse.json(
        {
          error:
            "STRICTLY FORBIDDEN: Active CONTRIBUTOR accounts are blocked from deleting projects, images, notifications, or user accounts.",
          code: "CONTRIBUTOR_DELETE_BLOCKED",
        },
        { status: 403 }
      ),
    };
  }

  if (!allowedRoles.includes(liveUser.role)) {
    return {
      ok: false,
      response: NextResponse.json(
        {
          error: `Forbidden: Role '${liveUser.role}' lacks permission for this action. Required: ${allowedRoles.join(" or ")}.`,
          code: "INSUFFICIENT_ROLE_PRIVILEGE",
        },
        { status: 403 }
      ),
    };
  }

  return {
    ok: true,
    user: sanitizeUser(liveUser),
  };
}

