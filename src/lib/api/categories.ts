"use server";

import { z } from "zod";
import { requireSession } from "@/lib/auth";
import { getDb, newId, nowIso } from "@/lib/db";
import { slugify } from "@/lib/slugify";

export type Category = {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
};

type CategoryRow = { id: string; name: string; slug: string; created_at: string };

function toCategory(row: CategoryRow): Category {
  return { id: row.id, name: row.name, slug: row.slug, createdAt: row.created_at };
}

export async function listCategories() : Promise<Category[]> {
    await requireSession();
    const { results } = await getDb()
      .prepare("SELECT * FROM categories ORDER BY name COLLATE NOCASE")
      .all<CategoryRow>();
    return results.map(toCategory);
  }

const createCategorySchema = z.object({ name: z.string().min(1) });

export async function createCategory(input: { data: z.input<typeof createCategorySchema> }) : Promise<{ id: string }> {
    const data = createCategorySchema.parse(input.data);
    await requireSession();
    const db = getDb();

    const slug = slugify(data.name);
    const existing = await db
      .prepare("SELECT id FROM categories WHERE slug = ?")
      .bind(slug)
      .first();
    if (existing) throw new Error("A category with this name already exists");

    const id = newId();
    await db
      .prepare("INSERT INTO categories (id, name, slug, created_at) VALUES (?, ?, ?, ?)")
      .bind(id, data.name, slug, nowIso())
      .run();

    return { id };
  }

const deleteCategorySchema = z.object({ id: z.string() });

export async function deleteCategory(input: { data: z.input<typeof deleteCategorySchema> }) : Promise<{ ok: true }> {
    const data = deleteCategorySchema.parse(input.data);
    await requireSession();
    await getDb().prepare("DELETE FROM categories WHERE id = ?").bind(data.id).run();
    return { ok: true };
  }
