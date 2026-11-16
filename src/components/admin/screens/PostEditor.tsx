"use client";

import { PencilLine } from "lucide-react";
import { AdminPageHeader } from "@/components/admin-shell";
import { PostForm } from "@/components/admin/post-form";
import type { Category } from "@/lib/api/categories";
import type { AdminPost, KeyphraseUse } from "@/lib/api/posts";

export default function PostEditor({
  post,
  categories,
  keyphrases,
}: {
  post?: AdminPost;
  categories: Category[];
  keyphrases: KeyphraseUse[];
}) {
  return (
    <div>
      <AdminPageHeader
        icon={PencilLine}
        title={post ? "Edit post" : "New post"}
        description={post?.title}
      />
      <div className="mt-6 max-w-6xl">
        <PostForm post={post} categories={categories} keyphrases={keyphrases} />
      </div>
    </div>
  );
}
