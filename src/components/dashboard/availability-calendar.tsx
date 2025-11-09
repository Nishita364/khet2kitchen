"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function AvailabilityCalendar() {
  const [dates, setDates] = React.useState<Date[] | undefined>([]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crop Availability</CardTitle>
        <CardDescription>Select dates when your crops are available for market.</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center p-0 md:p-6">
        <Calendar
          mode="multiple"
          selected={dates}
          onSelect={setDates}
          className="rounded-md border"
        />
      </CardContent>
    </Card>
  );
}
