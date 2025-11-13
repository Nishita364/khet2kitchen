'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Brain, Calculator, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CropPricingRequest, PricingRecommendation, geminiPricingService } from '@/lib/ai/gemini-pricing';

const pricingFormSchema = z.object({
  cropName: z.string().min(1, 'Crop name is required'),
  quantity: z.number().min(1, 'Quantity must be at least 1 kg'),
  quality: z.enum(['premium', 'standard', 'basic']),
  location: z.string().min(1, 'Location is required'),
  harvestDate: z.string().min(1, 'Harvest date is required'),
  marketType: z.enum(['local', 'wholesale', 'retail', 'export'])
});

type PricingFormData = z.infer<typeof pricingFormSchema>;

interface PricingFormProps {
  onResult: (result: PricingRecommendation, cropName: string, quantity: number) => void;
}

export function PricingForm({ onResult }: PricingFormProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const form = useForm<PricingFormData>({
    resolver: zodResolver(pricingFormSchema),
    defaultValues: {
      cropName: '',
      quantity: 1000,
      quality: 'standard',
      location: '',
      harvestDate: '',
      marketType: 'wholesale'
    }
  });

  const onSubmit = async (data: PricingFormData) => {
    setIsAnalyzing(true);
    try {
      const request: CropPricingRequest = {
        ...data,
        quantity: Number(data.quantity)
      };
      
      console.log('Sending pricing request:', request);
      const result = await geminiPricingService.getPricingRecommendation(request);
      console.log('Received pricing result:', result);
      onResult(result, data.cropName, data.quantity);
    } catch (error) {
      console.error('Pricing analysis failed:', error);
      alert('Failed to get AI pricing recommendation. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const commonCrops = [
    'Wheat', 'Rice', 'Tomato', 'Onion', 'Potato', 'Sugarcane', 
    'Cotton', 'Soybean', 'Maize', 'Barley', 'Chili', 'Turmeric'
  ];

  const indianStates = [
    'Andhra Pradesh', 'Bihar', 'Gujarat', 'Haryana', 'Karnataka', 
    'Madhya Pradesh', 'Maharashtra', 'Punjab', 'Rajasthan', 'Tamil Nadu',
    'Telangana', 'Uttar Pradesh', 'West Bengal'
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-blue-600" />
          AI Pricing Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="cropName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Crop Name</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select crop" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {commonCrops.map((crop) => (
                          <SelectItem key={crop} value={crop.toLowerCase()}>
                            {crop}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity (kg)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g., 1000"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quality Grade</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="premium">Premium</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="basic">Basic</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location (State)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {indianStates.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="harvestDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Harvest Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="marketType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Market Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="local">Local Market</SelectItem>
                        <SelectItem value="wholesale">Wholesale</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="export">Export</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button 
              type="submit" 
              disabled={isAnalyzing}
              className="w-full"
            >
              {isAnalyzing ? (
                <>
                  <Calculator className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing with AI...
                </>
              ) : (
                <>
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Get AI Pricing Recommendation
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}