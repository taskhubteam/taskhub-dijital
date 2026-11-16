import { getObject } from "@/lib/blob-store";
import { UPLOAD_WIDTHS, variantKey } from "@/lib/images";

// Serves images uploaded in the admin (stored in D1). A filename never changes content, so
// browsers and Cloudflare's edge can cache forever.
const CACHE_CONTROL = "public, max-age=31536000, immutable";

function edgeCache(): Cache | null {
  return typeof caches !== "undefined" && "default" in caches
    ? (caches as unknown as { default: Cache }).default
    : null;
}

export async function GET(request: Request, { params }: { params: Promise<{ filename: string }> }) {
  const { filename } = await params;
  const cache = edgeCache();
  const cached = await cache?.match(request);
  if (cached) return cached;

  // ?w=<width> serves the pre-generated WebP variant when one exists.
  const w = Number(new URL(request.url).searchParams.get("w"));
  let object = null;
  if ((UPLOAD_WIDTHS as readonly number[]).includes(w)) {
    object = await getObject(variantKey(filename, w));
  }
  object ??= await getObject(filename);
  if (!object) return new Response("Not found", { status: 404 });

  const response = new Response(object.body, {
    headers: {
      "Content-Type": object.contentType,
      "Content-Length": String(object.size),
      "Cache-Control": CACHE_CONTROL,
      "X-Content-Type-Options": "nosniff",
    },
  });
  await cache?.put(request, response.clone()).catch(() => {});
  return response;
}
