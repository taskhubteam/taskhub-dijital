import AdminMedia from "@/components/admin/screens/Media";
import { listMedia } from "@/lib/api/media";

export const metadata = { title: "Media" };

export default async function MediaPage() {
  return <AdminMedia media={await listMedia()} />;
}
