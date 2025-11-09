
"use client";

import { DemandDisplay } from "@/components/dashboard/demand-display";
import { LineChart } from "lucide-react";

export default function MarketDemandPage() {
  return (
    <>
      <div className="flex items-center mb-6">
        <div className="flex-shrink-0 mr-4 bg-primary/10 text-primary p-3 rounded-full">
            <LineChart className="h-6 w-6" />
        </div>
        <div>
            <h1 className="text-2xl font-semibold md:text-3xl font-headline">
              Current Market Demand
            </h1>
            <p className="text-muted-foreground">
              A list of crops currently in demand by companies.
            </p>
        </div>
      </div>
      <DemandDisplay />
    </>
  );
}
