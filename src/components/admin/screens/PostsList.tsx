"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExternalLink, FileText, MoreHorizontal, PencilLine, Plus, Trash2 } from "lucide-react";
import { AdminPageHeader } from "@/components/admin-shell";
import { useState } from "react";
import { toast } from "sonner";
import { ConfirmDeleteDialog } from "@/components/admin/confirm-delete-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deletePost, type AdminPost } from "@/lib/api/posts";
import { isPostScheduled } from "@/lib/post-status";

export default function AdminPosts({ posts }: { posts: AdminPost[] }) {
  const router = useRouter();
  const [pendingDelete, setPendingDelete] = useState<AdminPost | null>(null);

  async function confirmDelete() {
    if (!pendingDelete) return;
    await deletePost({ data: { id: pendingDelete.id } });
    toast.success(`Deleted “${pendingDelete.title}”`);
    setPendingDelete(null);
    router.refresh();
  }

  return (
    <div>
      <AdminPageHeader
        icon={FileText}
        title="Posts"
        description={`${posts.length} total`}
        actions={
          <Link
            href="/admin/posts/new"
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-800"
          >
            <Plus className="size-4" aria-hidden="true" />
            New post
          </Link>
        }
      />

      <div className="mt-6 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="py-10 text-center text-neutral-500">
                  No posts yet.
                </TableCell>
              </TableRow>
            )}
            {posts.map((post) => {
              const scheduled = isPostScheduled(post);
              const isLive = post.status === "published" && !scheduled;
              return (
                <TableRow key={post.id}>
                  <TableCell className="font-medium text-neutral-900">
                    <Link
                      href={`/admin/posts/${post.id}`}
                      className="hover:text-blue-700"
                    >
                      {post.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge variant={isLive ? "default" : scheduled ? "outline" : "secondary"}>
                      {scheduled ? "Scheduled" : post.status}
                    </Badge>
                    {scheduled && post.publishedAt && (
                      <div className="mt-1 text-xs text-neutral-500">
                        {new Date(post.publishedAt).toLocaleString()}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-neutral-500">
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" aria-label={`Actions for ${post.title}`}>
                          <MoreHorizontal className="size-4" aria-hidden="true" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {isLive && (
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/blog/${post.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="size-4" aria-hidden="true" />
                              View
                            </Link>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/posts/${post.id}`}>
                            <PencilLine className="size-4" aria-hidden="true" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600 focus:text-red-600"
                          onSelect={() => setPendingDelete(post)}
                        >
                          <Trash2 className="size-4" aria-hidden="true" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <ConfirmDeleteDialog
        open={!!pendingDelete}
        onOpenChange={(open) => !open && setPendingDelete(null)}
        title={`Delete “${pendingDelete?.title}”?`}
        description="This can't be undone. The post will be permanently removed."
        onConfirm={confirmDelete}
      />
    </div>
  );
}
