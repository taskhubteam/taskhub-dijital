import AdminPosts from "@/components/admin/screens/PostsList";
import { listPosts } from "@/lib/api/posts";

export const metadata = { title: "Posts" };

export default async function PostsPage() {
  return <AdminPosts posts={await listPosts()} />;
}
