"use client";

import { useRouter } from "next/navigation";
import { Plus, Tags, Trash2 } from "lucide-react";
import { AdminPageHeader } from "@/components/admin-shell";
import { useState } from "react";
import { toast } from "sonner";
import { ConfirmDeleteDialog } from "@/components/admin/confirm-delete-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  createCategory,
  deleteCategory,
  type Category,
} from "@/lib/api/categories";

export default function AdminCategories({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<Category | null>(null);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitting(true);
    try {
      await createCategory({ data: { name: name.trim() } });
      toast.success("Category added");
      setName("");
      await router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  async function confirmDelete() {
    if (!pendingDelete) return;
    await deleteCategory({ data: { id: pendingDelete.id } });
    toast.success(`Deleted “${pendingDelete.name}”`);
    setPendingDelete(null);
    router.refresh();
  }

  return (
    <div>
      <AdminPageHeader icon={Tags} title="Categories" description={`${categories.length} total`} />

      <form onSubmit={handleCreate} className="mt-6 flex gap-3">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category name"
          className="max-w-xs bg-white"
        />
        <Button type="submit" disabled={submitting || !name.trim()}>
          <Plus className="size-4" aria-hidden="true" />
          {submitting ? "Adding…" : "Add category"}
        </Button>
      </form>

      <div className="mt-6 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="py-10 text-center text-neutral-500">
                  No categories yet.
                </TableCell>
              </TableRow>
            )}
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium text-neutral-900">{category.name}</TableCell>
                <TableCell>
                  <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-xs text-neutral-600">
                    {category.slug}
                  </code>
                </TableCell>
                <TableCell className="text-neutral-500">
                  {new Date(category.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-600"
                    onClick={() => setPendingDelete(category)}
                  >
                    <Trash2 className="size-4" aria-hidden="true" />
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ConfirmDeleteDialog
        open={!!pendingDelete}
        onOpenChange={(open) => !open && setPendingDelete(null)}
        title={`Delete “${pendingDelete?.name}”?`}
        description="This can't be undone. Posts already using this category keep it as plain text."
        onConfirm={confirmDelete}
      />
    </div>
  );
}
