
"use client";

import { OrderHistory } from "@/components/dashboard/order-history";

export default function OrdersPage() {
  return (
    <>
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-semibold md:text-3xl font-headline">
          My Orders
        </h1>
      </div>
      <OrderHistory />
    </>
  );
}
