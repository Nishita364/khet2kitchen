
"use client";

import { CommodityPricing } from "@/components/dashboard/commodity-pricing";
import { DollarSign } from "lucide-react";

export default function PricingPage() {
  return (
    <>
      <div className="flex items-center mb-6">
        <div className="flex-shrink-0 mr-4 bg-primary/10 text-primary p-3 rounded-full">
            <DollarSign className="h-6 w-6" />
        </div>
        <div>
            <h1 className="text-2xl font-semibold md:text-3xl font-headline">
              Commodity Pricing
            </h1>
            <p className="text-muted-foreground">
                View current procurement and selling prices.
            </p>
        </div>
      </div>
      <CommodityPricing />
    </>
  );
}
