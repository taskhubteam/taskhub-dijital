import { notFound } from "next/navigation";
import PostEditor from "@/components/admin/screens/PostEditor";
import { listCategories } from "@/lib/api/categories";
import { getPost, listFocusKeyphrases } from "@/lib/api/posts";

export const metadata = { title: "Edit post" };

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [post, categories, keyphrases] = await Promise.all([
    getPost({ data: { id } }),
    listCategories(),
    listFocusKeyphrases(),
  ]);
  if (!post) notFound();
  return <PostEditor post={post} categories={categories} keyphrases={keyphrases} />;
}
