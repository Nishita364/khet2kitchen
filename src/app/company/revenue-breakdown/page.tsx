
"use client";

import { RevenueBreakdown } from "@/components/dashboard/revenue-breakdown";
import { AreaChart } from "lucide-react";

export default function RevenueBreakdownPage() {
  return (
    <>
      <div className="flex items-center mb-6">
        <div className="flex-shrink-0 mr-4 bg-primary/10 text-primary p-3 rounded-full">
            <AreaChart className="h-6 w-6" />
        </div>
        <div>
            <h1 className="text-2xl font-semibold md:text-3xl font-headline">
              Revenue Breakdown
            </h1>
            <p className="text-muted-foreground">
                A detailed view of revenue from sourced produce.
            </p>
        </div>
      </div>
      <RevenueBreakdown />
    </>
  );
}
