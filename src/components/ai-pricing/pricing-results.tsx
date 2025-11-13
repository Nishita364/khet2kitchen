'use client';

import { TrendingUp, TrendingDown, AlertCircle, CheckCircle, DollarSign, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PricingRecommendation } from '@/lib/ai/gemini-pricing';

interface PricingResultsProps {
  result: PricingRecommendation;
  cropName: string;
  quantity: number;
}

export function PricingResults({ result, cropName, quantity }: PricingResultsProps) {
  const totalValue = result.suggestedPrice * quantity;
  const confidencePercentage = Math.round(result.confidence * 100);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConfidenceIcon = (confidence: number) => {
    if (confidence >= 0.8) return <CheckCircle className="h-4 w-4" />;
    if (confidence >= 0.6) return <AlertCircle className="h-4 w-4" />;
    return <TrendingDown className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Main Pricing Card */}
      <Card className="border-2 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              AI Pricing Recommendation
            </span>
            <Badge className={`${getConfidenceColor(result.confidence)} bg-transparent border`}>
              {getConfidenceIcon(result.confidence)}
              <span className="ml-1">{confidencePercentage}% Confidence</span>
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-muted-foreground">Suggested Price</p>
              <p className="text-2xl font-bold text-green-600">₹{result.suggestedPrice}/kg</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-muted-foreground">Price Range</p>
              <p className="text-lg font-semibold text-blue-600">
                ₹{result.priceRange.min} - ₹{result.priceRange.max}/kg
              </p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-muted-foreground">Total Value</p>
              <p className="text-2xl font-bold text-purple-600">₹{totalValue.toLocaleString()}</p>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">AI Confidence Level</span>
              <span className="text-sm text-muted-foreground">{confidencePercentage}%</span>
            </div>
            <Progress value={confidencePercentage} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Market Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            Market Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed">{result.marketAnalysis}</p>
        </CardContent>
      </Card>

      {/* Pricing Factors */}
      <Card>
        <CardHeader>
          <CardTitle>Key Pricing Factors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {result.factors.map((factor, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">{factor}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {result.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                  {index + 1}
                </div>
                <p className="text-sm">{recommendation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Market Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Market Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed bg-yellow-50 p-3 rounded-lg">
            {result.marketTrends}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}