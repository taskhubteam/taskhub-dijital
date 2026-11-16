import AdminDashboard from "@/components/admin/screens/Dashboard";
import { getAnalyticsSummary } from "@/lib/api/analytics";
import { listPosts } from "@/lib/api/posts";
import { getSearchConsoleSummary } from "@/lib/api/search-console";

export const metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const [posts, analytics, search] = await Promise.all([
    listPosts(),
    getAnalyticsSummary().catch(() => null),
    getSearchConsoleSummary().catch(() => null),
  ]);
  return <AdminDashboard posts={posts} analytics={analytics} search={search} />;
}
