import "server-only";
import { getCloudflareContext } from "@opennextjs/cloudflare";

// Server-only: the D1 binding declared in wrangler.jsonc (binding "DB").

export function getDb(): D1Database {
  return getCloudflareContext().env.DB;
}

export function newId(): string {
  return crypto.randomUUID();
}

export function nowIso(): string {
  return new Date().toISOString();
}
