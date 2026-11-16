import { getDb, nowIso } from "@/lib/db";

// Server-only: a tiny object store on top of D1 (like MongoDB GridFS), used for admin uploads.
// Objects are split into ≤1 MB chunks because D1 limits a row/BLOB to 2 MB.

const CHUNK_SIZE = 1024 * 1024;

export type StoredObject = { contentType: string; size: number; body: Uint8Array<ArrayBuffer> };

export async function putObject(key: string, data: ArrayBuffer, contentType: string) {
  const db = getDb();
  const bytes = new Uint8Array(data);
  const chunks = Math.max(1, Math.ceil(bytes.length / CHUNK_SIZE));
  const statements = [
    db.prepare("DELETE FROM media_chunks WHERE key = ?").bind(key),
    db
      .prepare(
        `INSERT INTO media_objects (key, content_type, size, chunks, created_at) VALUES (?, ?, ?, ?, ?)
         ON CONFLICT(key) DO UPDATE SET content_type = excluded.content_type, size = excluded.size,
           chunks = excluded.chunks`,
      )
      .bind(key, contentType, bytes.length, chunks, nowIso()),
  ];
  for (let i = 0; i < chunks; i++) {
    statements.push(
      db
        .prepare("INSERT INTO media_chunks (key, idx, data) VALUES (?, ?, ?)")
        .bind(key, i, bytes.subarray(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE)),
    );
  }
  // One batch = one transaction: an object is never left half-written.
  await db.batch(statements);
}

export async function getObject(key: string): Promise<StoredObject | null> {
  const db = getDb();
  const meta = await db
    .prepare("SELECT content_type, size FROM media_objects WHERE key = ?")
    .bind(key)
    .first<{ content_type: string; size: number }>();
  if (!meta) return null;

  const { results } = await db
    .prepare("SELECT data FROM media_chunks WHERE key = ? ORDER BY idx")
    .bind(key)
    .all<{ data: ArrayBuffer | number[] }>();
  const body = new Uint8Array(meta.size);
  let offset = 0;
  for (const row of results) {
    const part =
      row.data instanceof ArrayBuffer ? new Uint8Array(row.data) : Uint8Array.from(row.data);
    body.set(part, offset);
    offset += part.length;
  }
  return { contentType: meta.content_type, size: meta.size, body };
}

export async function deleteObjects(keys: string[]) {
  if (keys.length === 0) return;
  const db = getDb();
  await db.batch(
    keys.flatMap((key) => [
      db.prepare("DELETE FROM media_chunks WHERE key = ?").bind(key),
      db.prepare("DELETE FROM media_objects WHERE key = ?").bind(key),
    ]),
  );
}
