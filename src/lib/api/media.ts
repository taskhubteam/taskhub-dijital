"use server";

import { z } from "zod";
import { getDb, newId, nowIso } from "@/lib/db";
import { deleteObjects, putObject } from "@/lib/blob-store";
import { requireSession } from "@/lib/auth";
import { slugify } from "@/lib/slugify";
import { UPLOAD_WIDTHS, variantKey } from "@/lib/images";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export type MediaItem = {
  id: string;
  filename: string;
  url: string;
  alt: string;
  contentType: string;
  size: number;
  uploadedAt: string;
};

type MediaRow = {
  id: string;
  filename: string;
  alt: string;
  content_type: string;
  size: number;
  widths: string;
  uploaded_at: string;
};

function timestamp(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}

/**
 * FormData fields: `file` (the original, already shrunk to ≤1920px in the browser — see
 * lib/use-image-upload.ts), `title`, and optional `w<width>` WebP variants for each of
 * UPLOAD_WIDTHS. There's no sharp on Cloudflare Workers, so resizing happens client-side.
 */
export async function uploadImage(input: { data: FormData }) : Promise<{ id: string; url: string }> {
    const data = input.data;
    await requireSession();

    const file = data.get("file");
    if (!(file instanceof File)) throw new Error("No file provided");

    const ext = ALLOWED_TYPES[file.type];
    if (!ext) throw new Error("Only JPEG, PNG, WebP, and GIF images are supported");
    if (file.size > MAX_SIZE) throw new Error("Image must be under 5MB");

    const title = String(data.get("title") ?? "post");
    const filename = `${slugify(title) || "post"}-${timestamp()}.${ext}`;
    await putObject(filename, await file.arrayBuffer(), file.type);

    const widths: number[] = [];
    for (const w of UPLOAD_WIDTHS) {
      const variant = data.get(`w${w}`);
      if (!(variant instanceof File) || variant.type !== "image/webp" || variant.size > MAX_SIZE) {
        continue;
      }
      await putObject(variantKey(filename, w), await variant.arrayBuffer(), "image/webp");
      widths.push(w);
    }

    const id = newId();
    await getDb()
      .prepare(
        `INSERT INTO media (id, filename, alt, content_type, size, widths, uploaded_at)
         VALUES (?, ?, '', ?, ?, ?, ?)`,
      )
      .bind(id, filename, file.type, file.size, JSON.stringify(widths), nowIso())
      .run();

    return { id, url: `/uploads/${filename}` };
  }

export async function listMedia() : Promise<MediaItem[]> {
    await requireSession();
    const { results } = await getDb()
      .prepare("SELECT * FROM media ORDER BY uploaded_at DESC")
      .all<MediaRow>();

    return results.map((r) => ({
      id: r.id,
      filename: r.filename,
      url: `/uploads/${r.filename}`,
      alt: r.alt,
      contentType: r.content_type,
      size: r.size,
      uploadedAt: r.uploaded_at,
    }));
  }

const updateMediaAltSchema = z.object({ id: z.string(), alt: z.string() });

export async function updateMediaAlt(input: { data: z.input<typeof updateMediaAltSchema> }) : Promise<{ ok: true }> {
    const data = updateMediaAltSchema.parse(input.data);
    await requireSession();
    await getDb().prepare("UPDATE media SET alt = ? WHERE id = ?").bind(data.alt, data.id).run();
    return { ok: true };
  }

const deleteMediaSchema = z.object({ id: z.string() });

export async function deleteMedia(input: { data: z.input<typeof deleteMediaSchema> }) : Promise<{ ok: true }> {
    const data = deleteMediaSchema.parse(input.data);
    await requireSession();
    const db = getDb();
    const row = await db
      .prepare("SELECT filename FROM media WHERE id = ?")
      .bind(data.id)
      .first<{ filename: string }>();
    if (row) {
      await deleteObjects([row.filename, ...UPLOAD_WIDTHS.map((w) => variantKey(row.filename, w))]);
    }
    await db.prepare("DELETE FROM media WHERE id = ?").bind(data.id).run();
    return { ok: true };
  }
