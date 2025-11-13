import { GoogleGenerativeAI } from '@google/generative-ai';

export interface CropPricingRequest {
  cropName: string;
  quantity: number;
  quality: 'premium' | 'standard' | 'basic';
  location: string;
  harvestDate: string;
  marketType: 'local' | 'wholesale' | 'retail' | 'export';
}

export interface PricingRecommendation {
  suggestedPrice: number;
  priceRange: {
    min: number;
    max: number;
  };
  marketAnalysis: string;
  factors: string[];
  confidence: number;
  recommendations: string[];
  marketTrends: string;
}

export class GeminiPricingService {
  private genAI: GoogleGenerativeAI | null = null;

  private getModel() {
    if (!this.genAI) {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'AIzaSyABYW86qDD32Ktv-B4u17a9kc4w0CsH74w';
      this.genAI = new GoogleGenerativeAI(apiKey);
    }
    return this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  async getPricingRecommendation(request: CropPricingRequest): Promise<PricingRecommendation> {
    try {
      console.log('Initializing Gemini model...');
      const model = this.getModel();
      console.log('Building pricing prompt...');
      const prompt = this.buildPricingPrompt(request);
      console.log('Calling Gemini API...');
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      console.log('Received response from Gemini API');
      
      return this.parsePricingResponse(text, request);
    } catch (error: any) {
      console.error('Gemini API error:', error);
      console.error('Error details:', error?.message || 'Unknown error');
      
      // If API fails, return fallback pricing instead of throwing
      console.log('Using fallback pricing due to API error');
      return this.getFallbackPricing(request);
    }
  }

  private buildPricingPrompt(request: CropPricingRequest): string {
    return `
You are an agricultural pricing expert AI. Analyze the following crop details and provide pricing recommendations:

Crop Details:
- Crop: ${request.cropName}
- Quantity: ${request.quantity} kg
- Quality: ${request.quality}
- Location: ${request.location}
- Harvest Date: ${request.harvestDate}
- Market Type: ${request.marketType}

Please provide a detailed pricing analysis in the following JSON format:
{
  "suggestedPrice": [price per kg in INR],
  "priceRange": {
    "min": [minimum price per kg],
    "max": [maximum price per kg]
  },
  "marketAnalysis": "[detailed market analysis]",
  "factors": ["factor1", "factor2", "factor3"],
  "confidence": [confidence score 0-1],
  "recommendations": ["recommendation1", "recommendation2"],
  "marketTrends": "[current market trends analysis]"
}

Consider factors like:
- Seasonal demand and supply
- Quality grade impact on pricing
- Regional market conditions
- Transportation costs
- Storage and handling
- Current market trends
- Weather impact
- Festival seasons
- Export opportunities

Provide realistic Indian market prices in INR per kg.
`;
  }

  private parsePricingResponse(text: string, request: CropPricingRequest): PricingRecommendation {
    try {
      // Extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          suggestedPrice: parsed.suggestedPrice || 0,
          priceRange: parsed.priceRange || { min: 0, max: 0 },
          marketAnalysis: parsed.marketAnalysis || 'Market analysis not available',
          factors: parsed.factors || [],
          confidence: parsed.confidence || 0.8,
          recommendations: parsed.recommendations || [],
          marketTrends: parsed.marketTrends || 'Market trends not available'
        };
      }
    } catch (error) {
      console.error('Failed to parse AI response:', error);
    }

    // Fallback response if parsing fails
    return this.getFallbackPricing(request);
  }

  private getFallbackPricing(request: CropPricingRequest): PricingRecommendation {
    // Basic fallback pricing based on crop type
    const basePrices: Record<string, number> = {
      'wheat': 25,
      'rice': 30,
      'tomato': 20,
      'onion': 15,
      'potato': 12,
      'sugarcane': 3,
      'cotton': 60,
      'soybean': 45,
      'maize': 20,
      'barley': 22
    };

    const basePrice = basePrices[request.cropName.toLowerCase()] || 25;
    const qualityMultiplier = request.quality === 'premium' ? 1.3 : request.quality === 'standard' ? 1.0 : 0.8;
    const suggestedPrice = Math.round(basePrice * qualityMultiplier);

    return {
      suggestedPrice,
      priceRange: {
        min: Math.round(suggestedPrice * 0.8),
        max: Math.round(suggestedPrice * 1.2)
      },
      marketAnalysis: `Based on current market conditions for ${request.cropName}, considering ${request.quality} quality and ${request.marketType} market type.`,
      factors: [
        'Quality grade',
        'Market type',
        'Seasonal demand',
        'Regional pricing'
      ],
      confidence: 0.75,
      recommendations: [
        'Monitor market prices daily',
        'Consider bulk selling for better rates',
        'Store properly to maintain quality'
      ],
      marketTrends: 'Market showing stable demand with seasonal variations expected.'
    };
  }

  async getMarketInsights(cropName: string, location: string): Promise<string> {
    try {
      const model = this.getModel();
      const prompt = `
Provide current market insights for ${cropName} in ${location}, India. 
Include:
- Current market trends
- Demand-supply situation  
- Price movements
- Best selling strategies
- Upcoming market opportunities

Keep it concise and actionable for farmers.
`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      return response.text();
    } catch (error) {
      console.error('Failed to get market insights:', error);
      return `Market insights for ${cropName} in ${location} are currently unavailable. Please try again later.`;
    }
  }
}

export const geminiPricingService = new GeminiPricingService();