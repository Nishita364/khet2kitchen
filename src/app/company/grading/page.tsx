
"use client";

import { GradingDetails } from "@/components/dashboard/grading-details";
import { Award } from "lucide-react";

export default function GradingPage() {
  return (
    <>
      <div className="flex items-center mb-6">
        <div className="flex-shrink-0 mr-4 bg-primary/10 text-primary p-3 rounded-full">
            <Award className="h-6 w-6" />
        </div>
        <div>
            <h1 className="text-2xl font-semibold md:text-3xl font-headline">
              Produce Grading
            </h1>
            <p className="text-muted-foreground">
              Use our AI tool to grade produce quality.
            </p>
        </div>
      </div>
      <GradingDetails />
    </>
  );
}
