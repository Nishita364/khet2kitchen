
"use client";

import { CommunityFeed } from "@/components/dashboard/community-feed";

export default function CommunityPage() {
  return (
    <>
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-semibold md:text-3xl font-headline">
          Community Hub
        </h1>
      </div>
      <CommunityFeed />
    </>
  );
}
