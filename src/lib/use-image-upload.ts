"use client";

import { toast } from "sonner";
import { uploadImage } from "@/lib/api/media";
import { UPLOAD_WIDTHS } from "@/lib/images";

// Cloudflare Workers can't run sharp, so images are resized here in the browser before
// upload: the original is capped at 1920px (format kept — not every social network accepts
// WebP for og:image) and a WebP variant is made for each width /uploads?w= serves.
const MAX_WIDTH = 1920;

async function toBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Encode failed"))), type, quality),
  );
}

async function resized(bitmap: ImageBitmap, width: number, type: string, quality: number) {
  const scale = Math.min(1, width / bitmap.width);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable");
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return toBlob(canvas, type, quality);
}

async function prepare(file: File): Promise<{ original: File; variants: Map<number, Blob> }> {
  const variants = new Map<number, Blob>();
  // GIFs keep their animation; anything we can't decode is uploaded untouched.
  if (file.type === "image/gif" || typeof createImageBitmap === "undefined") {
    return { original: file, variants };
  }
  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
    let original = file;
    if (bitmap.width > MAX_WIDTH) {
      const blob = await resized(bitmap, MAX_WIDTH, file.type, 0.85);
      if (blob.size < file.size) original = new File([blob], file.name, { type: file.type });
    }
    for (const w of UPLOAD_WIDTHS) {
      if (w >= bitmap.width) break;
      variants.set(w, await resized(bitmap, w, "image/webp", 0.78));
    }
    bitmap.close();
    return { original, variants };
  } catch (error) {
    console.error("Client-side resize failed, uploading original", error);
    return { original: file, variants };
  }
}

export function useImageUpload() {
  async function upload(file: File, title: string): Promise<{ id: string; url: string } | null> {
    try {
      const { original, variants } = await prepare(file);
      const formData = new FormData();
      formData.append("file", original);
      formData.append("title", title);
      for (const [w, blob] of variants) {
        formData.append(`w${w}`, new File([blob], `w${w}.webp`, { type: "image/webp" }));
      }
      return await uploadImage({ data: formData });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Image upload failed");
      return null;
    }
  }

  return { upload };
}
