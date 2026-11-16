import { createHmac, timingSafeEqual } from "node:crypto";
import "server-only";
import { cookies } from "next/headers";

export type Role = "admin" | "author";

export type SessionPayload = {
  userId: string;
  role: Role;
};

const SESSION_NAME = "th_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function sessionSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET is not set");
  return secret;
}

function cookieOptions() {
  return {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
  };
}

function sign(value: string): string {
  return createHmac("sha256", sessionSecret()).update(value).digest("base64url");
}

// Cookie value: base64url(JSON payload + expiry) + "." + HMAC-SHA256 signature.
function encodeSession(payload: SessionPayload): string {
  const body = Buffer.from(
    JSON.stringify({ ...payload, exp: Date.now() + SESSION_MAX_AGE * 1000 }),
  ).toString("base64url");
  return `${body}.${sign(body)}`;
}

function decodeSession(token: string): SessionPayload | null {
  const [body, signature] = token.split(".");
  if (!body || !signature) return null;

  const expected = Buffer.from(sign(body));
  const actual = Buffer.from(signature);
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null;

  try {
    const data = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
    if (!data.userId || !data.role || typeof data.exp !== "number" || data.exp < Date.now()) {
      return null;
    }
    return { userId: data.userId, role: data.role };
  } catch {
    return null;
  }
}

// Passwords: PBKDF2-SHA256 via WebCrypto (native on Cloudflare Workers; bcrypt in plain JS
// would blow the per-request CPU budget). Stored as "pbkdf2$<iterations>$<salt>$<hash>"
// (base64url). Workers caps PBKDF2 at 100k iterations. scripts/create-admin.mjs mirrors this.
const PBKDF2_ITERATIONS = 100_000;

async function pbkdf2(
  password: string,
  salt: Uint8Array<ArrayBuffer>,
  iterations: number,
): Promise<Buffer> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt, iterations },
    key,
    256,
  );
  return Buffer.from(bits);
}

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await pbkdf2(password, salt, PBKDF2_ITERATIONS);
  const b64 = (b: Uint8Array) => Buffer.from(b).toString("base64url");
  return ["pbkdf2", PBKDF2_ITERATIONS, b64(salt), b64(hash)].join("$");
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [scheme, iter, saltB64, hashB64] = stored.split("$");
  if (scheme !== "pbkdf2" || !iter || !saltB64 || !hashB64) return false;
  const expected = Buffer.from(hashB64, "base64url");
  const actual = await pbkdf2(
    password,
    new Uint8Array(Buffer.from(saltB64, "base64url")),
    Number(iter),
  );
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export async function createSession(payload: SessionPayload): Promise<void> {
  (await cookies()).set(SESSION_NAME, encodeSession(payload), {
    ...cookieOptions(),
    maxAge: SESSION_MAX_AGE,
  });
}

export async function getSessionPayload(): Promise<SessionPayload | null> {
  const token = (await cookies()).get(SESSION_NAME)?.value;
  return token ? decodeSession(token) : null;
}

export async function destroySession(): Promise<void> {
  (await cookies()).delete({ name: SESSION_NAME, ...cookieOptions() });
}

export async function requireSession(): Promise<SessionPayload> {
  const session = await getSessionPayload();
  if (!session) throw new Error("Not authenticated");
  return session;
}
