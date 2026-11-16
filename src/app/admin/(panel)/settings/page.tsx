import AdminSettings from "@/components/admin/screens/Settings";
import { getCurrentUser } from "@/lib/api/auth";

export const metadata = { title: "Settings" };

export default async function SettingsPage() {
  return <AdminSettings user={await getCurrentUser()} />;
}
