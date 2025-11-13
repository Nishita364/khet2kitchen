'use client';

import { useState } from 'react';
import { Brain, Sparkles } from 'lucide-react';
import { PricingForm } from '@/components/ai-pricing/pricing-form';
import { PricingResults } from '@/components/ai-pricing/pricing-results';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PricingRecommendation } from '@/lib/ai/gemini-pricing';

export default function AIPricingPage() {
  const [pricingResult, setPricingResult] = useState<PricingRecommendation | null>(null);
  const [cropDetails, setCropDetails] = useState<{ cropName: string; quantity: number } | null>(null);

  const handlePricingResult = (result: PricingRecommendation, cropName: string, quantity: number) => {
    setPricingResult(result);
    setCropDetails({ cropName, quantity });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Brain className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold">AI-Powered Crop Pricing</h1>
          <Sparkles className="h-6 w-6 text-yellow-500" />
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Get intelligent pricing recommendations powered by Google Gemini AI. 
          Analyze market conditions, quality factors, and regional trends to maximize your crop value.
        </p>
      </div>

      {/* Features Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <Brain className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold">AI Analysis</h3>
            <p className="text-sm text-muted-foreground">Advanced AI considers multiple market factors</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Sparkles className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <h3 className="font-semibold">Real-time Data</h3>
            <p className="text-sm text-muted-foreground">Current market trends and pricing insights</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Brain className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold">Smart Recommendations</h3>
            <p className="text-sm text-muted-foreground">Actionable advice to maximize profits</p>
          </CardContent>
        </Card>
      </div>

      {/* Pricing Form */}
      <PricingForm 
        onResult={(result, cropName, quantity) => {
          setPricingResult(result);
          setCropDetails({ cropName, quantity });
        }} 
      />

      {/* Results */}
      {pricingResult && cropDetails && (
        <PricingResults 
          result={pricingResult}
          cropName={cropDetails.cropName}
          quantity={cropDetails.quantity}
        />
      )}

      {/* Disclaimer */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="text-sm text-yellow-800">Important Disclaimer</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-yellow-700">
            AI pricing recommendations are based on available market data and trends. 
            Actual market prices may vary. Always verify with local markets and consider 
            multiple sources before making pricing decisions.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}