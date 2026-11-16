/** Widths the /uploads route serves WebP variants for (anything else gets the original file). */
export const UPLOAD_WIDTHS = [400, 640, 960, 1280] as const;

/** Storage key of a pre-generated WebP variant (made in the browser at upload time). */
export function variantKey(filename: string, width: number): string {
  return `w${width}/${filename}.webp`;
}

function isUpload(src: string) {
  return src.startsWith("/uploads/") && /\.(png|jpe?g|webp)$/i.test(src);
}

/** srcset for an image uploaded through the admin (served from /uploads). */
export function uploadSrcSet(src: string): string | undefined {
  if (!isUpload(src)) return undefined;
  return UPLOAD_WIDTHS.map((w) => `${src}?w=${w} ${w}w`).join(", ");
}

/** A sensible default `src` for an upload: a mid-size WebP rather than the original. */
export function uploadSrc(src: string, width: (typeof UPLOAD_WIDTHS)[number] = 960): string {
  return isUpload(src) ? `${src}?w=${width}` : src;
}

/**
 * Adds srcset/sizes, lazy loading and async decoding to <img> tags inside stored post HTML,
 * so images in article bodies are served at the right size too.
 */
export function optimizeContentImages(html: string): string {
  return html.replace(/<img\b([^>]*?)\bsrc="([^"]+)"([^>]*)>/g, (tag, before, src, after) => {
    if (!isUpload(src) || /\bsrcset=/.test(tag)) return tag;
    const extra = `srcset="${uploadSrcSet(src)}" sizes="(min-width: 768px) 720px, 100vw" loading="lazy" decoding="async"`;
    return `<img${before}src="${uploadSrc(src)}" ${extra}${after}>`;
  });
}

/** Wraps <table>s from post HTML in a scroll container so wide tables don't break mobile. */
export function wrapContentTables(html: string): string {
  return html.replace(/<table\b[\s\S]*?<\/table>/g, (t) => `<div class="table-wrap">${t}</div>`);
}
