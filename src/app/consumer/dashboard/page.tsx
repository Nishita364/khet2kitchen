
"use client";

import { ConsumerMarketplace } from "@/components/dashboard/consumer-marketplace";
import { useLanguage } from "@/context/language-provider";

export default function ConsumerDashboard() {
  const { t } = useLanguage();
  
  return (
    <>
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-semibold md:text-3xl font-headline">
            {t.pages.marketplace}
          </h1>
          <p className="text-muted-foreground">
            {t.pages.marketplaceDesc}
          </p>
        </div>
      </div>
      <ConsumerMarketplace />
    </>
  );
}
