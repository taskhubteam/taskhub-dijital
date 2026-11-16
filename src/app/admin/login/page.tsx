import { redirect } from "next/navigation";
import AdminLogin from "@/components/admin/screens/Login";
import { getCurrentUser } from "@/lib/api/auth";

export const dynamic = "force-dynamic";
export const metadata = { title: "Log in" };

export default async function LoginPage() {
  if (await getCurrentUser()) redirect("/admin");
  return <AdminLogin />;
}
