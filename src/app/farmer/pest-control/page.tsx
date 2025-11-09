
"use client";

import { PestControl } from "@/components/dashboard/pest-control";

export default function PestControlPage() {
  return (
    <>
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-semibold md:text-3xl font-headline">
          Pest & Disease Control
        </h1>
      </div>
      <PestControl />
    </>
  );
}
