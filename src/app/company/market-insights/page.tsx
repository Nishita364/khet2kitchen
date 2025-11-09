
"use client";

import { MarketInsights } from "@/components/dashboard/market-insights";
import { TrendingUp } from "lucide-react";

export default function MarketInsightsPage() {
  return (
    <>
      <div className="flex items-center mb-6">
        <div className="flex-shrink-0 mr-4 bg-primary/10 text-primary p-3 rounded-full">
            <TrendingUp className="h-6 w-6" />
        </div>
        <div>
            <h1 className="text-2xl font-semibold md:text-3xl font-headline">
              Market Insights
            </h1>
            <p className="text-muted-foreground">
                Current commodity prices and trends.
            </p>
        </div>
      </div>
      <MarketInsights />
    </>
  );
}
