"use client";

import { useRouter } from "next/navigation";
import {
  Check,
  Copy,
  ExternalLink,
  Image as ImageIcon,
  Search,
  Trash2,
  Upload,
} from "lucide-react";
import { useRef, useState } from "react";
import { AdminPageHeader } from "@/components/admin-shell";
import { toast } from "sonner";
import { ConfirmDeleteDialog } from "@/components/admin/confirm-delete-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { deleteMedia, updateMediaAlt, type MediaItem } from "@/lib/api/media";
import { useImageUpload } from "@/lib/use-image-upload";

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export default function AdminMedia({ media }: { media: MediaItem[] }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<MediaItem | null>(null);
  const [altDraft, setAltDraft] = useState("");
  const [savingAlt, setSavingAlt] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<MediaItem | null>(null);
  const [copied, setCopied] = useState(false);
  const { upload } = useImageUpload();

  const filtered = media.filter(
    (m) =>
      m.filename.toLowerCase().includes(search.toLowerCase()) ||
      m.alt.toLowerCase().includes(search.toLowerCase()),
  );

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (files.length === 0) return;

    setUploading(true);
    const results = await Promise.all(
      files.map((file) => upload(file, file.name.replace(/\.[^.]+$/, ""))),
    );
    setUploading(false);

    const succeeded = results.filter((r) => r !== null).length;
    if (succeeded > 0) {
      toast.success(`Uploaded ${succeeded} image${succeeded === 1 ? "" : "s"}`);
      await router.refresh();
    }
  }

  function openDetail(item: MediaItem) {
    setSelected(item);
    setAltDraft(item.alt);
    setCopied(false);
  }

  async function copyUrl(url: string) {
    try {
      await navigator.clipboard.writeText(new URL(url, window.location.origin).href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Couldn't copy. Select the URL and copy it manually.");
    }
  }

  async function saveAlt() {
    if (!selected) return;
    setSavingAlt(true);
    try {
      await updateMediaAlt({ data: { id: selected.id, alt: altDraft } });
      toast.success("Alt text saved");
      setSelected({ ...selected, alt: altDraft });
      await router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setSavingAlt(false);
    }
  }

  async function confirmDelete() {
    if (!pendingDelete) return;
    await deleteMedia({ data: { id: pendingDelete.id } });
    toast.success(`Deleted “${pendingDelete.filename}”`);
    setPendingDelete(null);
    setSelected(null);
    await router.refresh();
  }

  return (
    <div>
      <AdminPageHeader
        icon={ImageIcon}
        title="Media"
        description={`${media.length} item${media.length === 1 ? "" : "s"}`}
        actions={
          <Button type="button" disabled={uploading} onClick={() => fileInputRef.current?.click()}>
            <Upload className="size-4" aria-hidden="true" />
            {uploading ? "Uploading…" : "Upload"}
          </Button>
        }
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple
        className="hidden"
        onChange={handleUpload}
      />

      <div className="relative mt-6 max-w-sm">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400"
          aria-hidden="true"
        />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by file name or alt text…"
          className="bg-white pl-9"
          aria-label="Search media"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-sm text-neutral-500">
          {media.length === 0
            ? "No media yet. Upload your first image."
            : "No media matches your search."}
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filtered.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => openDetail(item)}
              className="group relative aspect-square overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              <img
                src={item.url}
                alt={item.alt}
                loading="lazy"
                className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
              />
              {!item.alt && (
                <span className="absolute right-1.5 top-1.5 rounded-md bg-amber-500 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white">
                  No alt
                </span>
              )}
              <span className="absolute inset-x-0 bottom-0 truncate bg-gradient-to-t from-black/75 to-transparent px-2.5 pb-2 pt-6 text-left text-[11px] text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                {item.filename}
              </span>
            </button>
          ))}
        </div>
      )}

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        {/* grid-cols-[minmax(0,1fr)] stops long file names / wide images from widening the grid
            past the dialog (the default `auto` track sizes to content). */}
        <DialogContent className="max-h-[calc(100vh-2rem)] w-[calc(100%-2rem)] max-w-2xl grid-cols-[minmax(0,1fr)] overflow-y-auto rounded-2xl bg-white">
          {selected && (
            <>
              <DialogHeader className="pr-8 text-left">
                <DialogTitle className="break-all text-base leading-snug">
                  {selected.filename}
                </DialogTitle>
                <DialogDescription className="flex flex-wrap gap-x-3 text-xs">
                  <span>{formatSize(selected.size)}</span>
                  <span>Uploaded {new Date(selected.uploadedAt).toLocaleDateString()}</span>
                </DialogDescription>
              </DialogHeader>
              <div className="grid place-items-center overflow-hidden rounded-xl border border-neutral-200 bg-[repeating-conic-gradient(#f1f5f9_0%_25%,#fff_0%_50%)] bg-[length:20px_20px]">
                <img
                  src={selected.url}
                  alt={selected.alt}
                  className="max-h-[45vh] w-auto max-w-full object-contain"
                />
              </div>
              <div className="space-y-4 text-sm">
                <div>
                  <Label htmlFor="alt-text">Alt text</Label>
                  <Input
                    id="alt-text"
                    value={altDraft}
                    onChange={(e) => setAltDraft(e.target.value)}
                    placeholder="Describe this image for accessibility & SEO"
                    className="mt-1.5"
                  />
                  {!altDraft.trim() && (
                    <p className="mt-1 text-xs text-amber-700">
                      Add alt text so Google and screen readers know what the image shows.
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="file-url">File URL</Label>
                  <div className="mt-1.5 flex gap-2">
                    <Input
                      id="file-url"
                      readOnly
                      value={selected.url}
                      className="min-w-0 flex-1 text-neutral-500"
                      onFocus={(e) => e.target.select()}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => copyUrl(selected.url)}
                      aria-label="Copy URL"
                      title="Copy URL"
                    >
                      {copied ? (
                        <Check className="size-4 text-emerald-600" aria-hidden="true" />
                      ) : (
                        <Copy className="size-4" aria-hidden="true" />
                      )}
                    </Button>
                    <Button type="button" variant="outline" size="icon" asChild>
                      <a
                        href={selected.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Open full size"
                        title="Open full size"
                      >
                        <ExternalLink className="size-4" aria-hidden="true" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
              <DialogFooter className="flex-row items-center justify-between sm:justify-between">
                <Button
                  type="button"
                  variant="ghost"
                  className="text-red-600 hover:text-red-600"
                  onClick={() => setPendingDelete(selected)}
                >
                  <Trash2 className="size-4" aria-hidden="true" />
                  Delete
                </Button>
                <Button type="button" disabled={savingAlt} onClick={saveAlt}>
                  {savingAlt ? "Saving…" : "Save"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <ConfirmDeleteDialog
        open={!!pendingDelete}
        onOpenChange={(open) => !open && setPendingDelete(null)}
        title={`Delete “${pendingDelete?.filename}”?`}
        description="This can't be undone. If this image is used in any post, it will no longer load there."
        onConfirm={confirmDelete}
      />
    </div>
  );
}
