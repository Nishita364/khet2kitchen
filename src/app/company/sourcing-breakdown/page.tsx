
"use client";

import { SourcingBreakdown } from "@/components/dashboard/sourcing-breakdown";
import { Tractor } from "lucide-react";

export default function SourcingBreakdownPage() {
  return (
    <>
      <div className="flex items-center mb-6">
        <div className="flex-shrink-0 mr-4 bg-primary/10 text-primary p-3 rounded-full">
            <Tractor className="h-6 w-6" />
        </div>
        <div>
            <h1 className="text-2xl font-semibold md:text-3xl font-headline">
              Sourcing Breakdown
            </h1>
            <p className="text-muted-foreground">
                A detailed view of all produce sourced from farmers.
            </p>
        </div>
      </div>
      <SourcingBreakdown />
    </>
  );
}
