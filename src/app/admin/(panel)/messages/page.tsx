import AdminMessages from "@/components/admin/screens/Messages";
import { listMessages } from "@/lib/api/messages";

export const metadata = { title: "Messages" };

export default async function MessagesPage() {
  return <AdminMessages messages={await listMessages()} />;
}
