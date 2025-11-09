
"use client";

import { SourcedProduce } from "@/components/dashboard/sourced-produce";
import { Package } from "lucide-react";

export default function ProducePage() {
  return (
    <>
      <div className="flex items-center mb-6">
         <div className="flex-shrink-0 mr-4 bg-primary/10 text-primary p-3 rounded-full">
            <Package className="h-6 w-6" />
        </div>
        <div>
            <h1 className="text-2xl font-semibold md:text-3xl font-headline">
              Available Produce
            </h1>
            <p className="text-muted-foreground">
              Browse and source produce directly from farmers.
            </p>
        </div>
      </div>
      <SourcedProduce />
    </>
  );
}
