import AdminCategories from "@/components/admin/screens/Categories";
import { listCategories } from "@/lib/api/categories";

export const metadata = { title: "Categories" };

export default async function CategoriesPage() {
  return <AdminCategories categories={await listCategories()} />;
}
