
"use client";

import React, { useState } from 'react';
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FarmDetailsView } from './farm-details-view';
import { FinancialSummaryView } from './financial-summary-view';

const farmers = [
  { name: 'John D.', id: 'farmer-1', avatarFallback: 'JD' },
  { name: 'Maria G.', id: 'farmer-2', avatarFallback: 'MG' },
  { name: 'Chen W.', id: 'farmer-3', avatarFallback: 'CW' },
];

export function FarmerList() {
  const [selectedFarmer, setSelectedFarmer] = useState<string | null>(null);

  return (
    <Card>
      <CardContent className="p-4">
        <Accordion 
            type="single" 
            collapsible 
            className="w-full"
            value={selectedFarmer ?? ""}
            onValueChange={setSelectedFarmer}
        >
          {farmers.map((farmer) => (
            <AccordionItem value={farmer.id} key={farmer.id}>
              <AccordionTrigger>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={`https://placehold.co/100x100.png`} alt={farmer.name} data-ai-hint="farmer portrait" />
                    <AvatarFallback>{farmer.avatarFallback}</AvatarFallback>
                  </Avatar>
                  <span className="font-semibold text-lg">{farmer.name}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid md:grid-cols-2 gap-6 lg:gap-8 p-4 bg-muted/30 rounded-lg">
                    <FarmDetailsView />
                    <FinancialSummaryView />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
