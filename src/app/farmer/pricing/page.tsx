
"use client";

import { PriceSuggestion } from "@/components/dashboard/price-suggestion";
import { useLanguage } from "@/context/language-provider";

export default function PricingPage() {
  const { t } = useLanguage();
  
  return (
    <>
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-semibold md:text-3xl font-headline">
          {t.pages.aiPoweredPricing}
        </h1>
      </div>
      <PriceSuggestion />
    </>
  );
}
