
"use client";

import { CropList } from "@/components/dashboard/crop-list";
import { FarmDetails } from "@/components/dashboard/farm-details";
import { FinancialSummary } from "@/components/dashboard/financial-summary";
import { useLanguage } from "@/context/language-provider";

export default function FarmerDashboard() {
  const { t } = useLanguage();
  
  return (
    <>
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-semibold md:text-3xl font-headline">
          {t.farmer.dashboard}
        </h1>
      </div>
      <div className="grid gap-6 lg:gap-8">
        <CropList />
        <div className="grid gap-6 lg:gap-8 md:grid-cols-2">
            <FarmDetails />
            <FinancialSummary />
        </div>
      </div>
    </>
  );
}
