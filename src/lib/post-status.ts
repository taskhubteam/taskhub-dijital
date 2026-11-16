// A post is "scheduled" rather than truly live when it's marked published but its
// publishedAt hasn't arrived yet. Kept in its own dependency-free module (no mongodb
// import anywhere in this file) so it's safe to import from any client component.
export function isPostScheduled(post: {
  status: "draft" | "published";
  publishedAt: string | null;
}): boolean {
  return (
    post.status === "published" && !!post.publishedAt && new Date(post.publishedAt) > new Date()
  );
}
