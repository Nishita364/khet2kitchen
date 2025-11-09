
"use client";

import { FarmerList } from "@/components/dashboard/farmer-list";
import { Users } from "lucide-react";

export default function FarmersPage() {
  return (
    <>
      <div className="flex items-center mb-6">
         <div className="flex-shrink-0 mr-4 bg-primary/10 text-primary p-3 rounded-full">
            <Users className="h-6 w-6" />
        </div>
        <div>
            <h1 className="text-2xl font-semibold md:text-3xl font-headline">
              Farmer Data
            </h1>
            <p className="text-muted-foreground">
              View farm and financial details for all connected farmers.
            </p>
        </div>
      </div>
      <FarmerList />
    </>
  );
}
