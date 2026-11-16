import PostEditor from "@/components/admin/screens/PostEditor";
import { listCategories } from "@/lib/api/categories";
import { listFocusKeyphrases } from "@/lib/api/posts";

export const metadata = { title: "New post" };

export default async function NewPostPage() {
  const [categories, keyphrases] = await Promise.all([listCategories(), listFocusKeyphrases()]);
  return <PostEditor categories={categories} keyphrases={keyphrases} />;
}
