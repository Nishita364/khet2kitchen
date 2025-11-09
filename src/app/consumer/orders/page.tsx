
"use client";

import { OrderHistory } from "@/components/dashboard/order-history";
import { Package } from "lucide-react";

export default function ConsumerOrdersPage() {
  return (
    <>
      <div className="flex items-center mb-6">
         <div className="flex-shrink-0 mr-4 bg-primary/10 text-primary p-3 rounded-full">
            <Package className="h-6 w-6" />
        </div>
        <div>
            <h1 className="text-2xl font-semibold md:text-3xl font-headline">
              My Orders
            </h1>
            <p className="text-muted-foreground">
              Track your current and past purchases.
            </p>
        </div>
      </div>
      <OrderHistory />
    </>
  );
}
