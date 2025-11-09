
"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFarmDetails } from "@/context/farm-details-provider";
import { format } from "date-fns";

export function FarmDetailsView() {
  const { farmDetails } = useFarmDetails();

  const details = [
    { label: "Irrigation Type", value: farmDetails.irrigationType },
    { label: "Soil Type", value: farmDetails.soilType },
    { label: "Current Crop", value: farmDetails.currentCrop },
    { label: "Acreage", value: farmDetails.acreage },
    { label: "Sowing Date", value: farmDetails.sowingDate ? format(new Date(farmDetails.sowingDate), "PPP") : "-" },
    { label: "Expected Harvest", value: farmDetails.harvestDate ? format(new Date(farmDetails.harvestDate), "PPP") : "-" },
    { label: "Expected Yield", value: `${farmDetails.expectedYield} kg` },
    { label: "Last Sown Crop", value: farmDetails.lastSownCrop },
    { label: "Last Yield", value: `${farmDetails.lastYield} kg` },
  ];

  const hasData = Object.values(farmDetails).some(val => val !== "" && val !== 0 && val !== null && val.toString().length > 0);


  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Farmer's Farm Details</CardTitle>
        <CardDescription>
          An overview of the farmer's current setup.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {hasData ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {details.map(detail => (
                <React.Fragment key={detail.label}>
                    <p className="font-medium text-muted-foreground">{detail.label}</p>
                    <p>{detail.value || "-"}</p>
                </React.Fragment>
            ))}
            </div>
        ) : (
            <p className="text-muted-foreground">The farmer has not provided their farm details yet.</p>
        )}
      </CardContent>
    </Card>
  );
}
