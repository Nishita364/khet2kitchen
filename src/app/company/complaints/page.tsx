
"use client";

import { ComplaintRedressal } from "@/components/dashboard/complaint-redressal";
import { ShieldAlert } from "lucide-react";

export default function ComplaintsPage() {
  return (
    <>
      <div className="flex items-center mb-6">
        <div className="flex-shrink-0 mr-4 bg-destructive/10 text-destructive p-3 rounded-full">
            <ShieldAlert className="h-6 w-6" />
        </div>
        <div>
            <h1 className="text-2xl font-semibold md:text-3xl font-headline">
              Complaint Redressal
            </h1>
            <p className="text-muted-foreground">
              Review and manage all user feedback and complaints.
            </p>
        </div>
      </div>
      <ComplaintRedressal />
    </>
  );
}
