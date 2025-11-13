'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DiseaseScanner } from '@/components/disease-detection/disease-scanner';
import { DiseaseHistory } from '@/components/disease-detection/disease-history';
import { DiseaseDetectionResult } from '@/lib/ml/plant-disease-detector';

export default function DiseaseDetectionPage() {
  const [latestResult, setLatestResult] = useState<DiseaseDetectionResult | undefined>();

  const handleNewResult = (result: DiseaseDetectionResult) => {
    setLatestResult(result);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Plant Disease Detection</h1>
        <p className="text-muted-foreground mt-2">
          Use AI to identify plant diseases and get treatment recommendations
        </p>
      </div>

      <Tabs defaultValue="scanner" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="scanner">Disease Scanner</TabsTrigger>
          <TabsTrigger value="history">Detection History</TabsTrigger>
        </TabsList>

        <TabsContent value="scanner">
          <DiseaseScanner onResult={handleNewResult} />
        </TabsContent>

        <TabsContent value="history">
          <DiseaseHistory newResult={latestResult} />
        </TabsContent>
      </Tabs>
    </div>
  );
}