import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";

export const SESSION_COOKIE = "nikkinind_studio_session";

function getAdminPassword() {
  return process.env.NIKKININD_STUDIO_PASSWORD || "";
}

function getSessionSecret() {
  return process.env.NIKKININD_SESSION_SECRET || "";
}

function sign(value: string) {
  const secret = getSessionSecret();
  if (!secret) {
    throw new Error("NIKKININD_SESSION_SECRET is not configured");
  }
  return createHmac("sha256", secret).update(value).digest("hex");
}

export function createSessionToken() {
  const issuedAt = Date.now().toString();
  return `${issuedAt}.${sign(issuedAt)}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  if (!getSessionSecret()) return false;
  const [issuedAt, signature] = token.split(".");
  if (!issuedAt || !signature) return false;
  let expected: string;
  try {
    expected = sign(issuedAt);
  } catch {
    return false;
  }
  try {
    const a = Buffer.from(signature);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    if (!timingSafeEqual(a, b)) return false;
  } catch {
    return false;
  }
  const age = Date.now() - Number(issuedAt);
  if (!Number.isFinite(age) || age < 0) return false;
  // 14 days
  return age < 14 * 24 * 60 * 60 * 1000;
}

export function verifyPassword(password: string) {
  const expected = getAdminPassword();
  if (!expected) return false;
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function isStudioAuthenticated() {
  const jar = await cookies();
  return verifySessionToken(jar.get(SESSION_COOKIE)?.value);
}
