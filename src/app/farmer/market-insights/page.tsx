
"use client";

import { MarketInsights } from "@/components/dashboard/market-insights";
import { TrendingUp } from "lucide-react";
import { useLanguage } from "@/context/language-provider";

export default function MarketInsightsPage() {
  const { t } = useLanguage();
  
  return (
    <>
      <div className="flex items-center mb-6">
        <div className="flex-shrink-0 mr-4 bg-primary/10 text-primary p-3 rounded-full">
            <TrendingUp className="h-6 w-6" />
        </div>
        <div>
            <h1 className="text-2xl font-semibold md:text-3xl font-headline">
              {t.pages.marketInsights}
            </h1>
            <p className="text-muted-foreground">
                {t.pages.marketInsightsDesc}
            </p>
        </div>
      </div>
      <MarketInsights />
    </>
  );
}
