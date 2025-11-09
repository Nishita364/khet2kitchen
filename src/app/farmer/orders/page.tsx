
"use client";

import { IncomingOrders } from "@/components/dashboard/incoming-orders";
import { useLanguage } from "@/context/language-provider";

export default function OrdersPage() {
  const { t } = useLanguage();
  
  return (
    <>
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-semibold md:text-3xl font-headline">
          {t.pages.incomingOrders}
        </h1>
      </div>
      <IncomingOrders />
    </>
  );
}
