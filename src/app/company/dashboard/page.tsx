
"use client";

import { SourcingOverview } from "@/components/dashboard/sourcing-overview";
import { useLanguage } from "@/context/language-provider";

export default function CompanyDashboard() {
  const { t } = useLanguage();
  
  return (
    <>
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-semibold md:text-3xl font-headline">
          {t.pages.companyDashboard}
        </h1>
      </div>
      <div className="grid gap-6 lg:gap-8">
        <SourcingOverview />
        <div className="grid gap-6 lg:gap-8 md:grid-cols-2">
        </div>
      </div>
    </>
  );
}
