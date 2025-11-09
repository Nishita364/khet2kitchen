"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FlaskConical, Loader2 } from "lucide-react";

export function NutrientRecommendation() {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState("");

  const handleGetRecommendation = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setRecommendation("");
    setTimeout(() => {
      setRecommendation("Based on the data provided for your clay soil and NPK values, we recommend applying a custom-blend fertilizer (12-8-15) at a rate of 120kg/ha across your 10-acre plot. Additionally, supplement with Calcium Nitrate to improve soil structure and nutrient uptake.");
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Crop Nutrient Recommendation</CardTitle>
        <CardDescription>Get AI-based nutrient recommendations for your crops.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleGetRecommendation} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="crop-type">Crop Type</Label>
              <Select>
                <SelectTrigger id="crop-type">
                  <SelectValue placeholder="Select Crop" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wheat">Winter Wheat</SelectItem>
                  <SelectItem value="corn">Corn</SelectItem>
                  <SelectItem value="soybeans">Soybeans</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="growth-stage">Growth Stage</Label>
              <Select>
                <SelectTrigger id="growth-stage">
                  <SelectValue placeholder="Select Stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vegetative">Vegetative</SelectItem>
                  <SelectItem value="flowering">Flowering</SelectItem>
                  <SelectItem value="fruiting">Fruiting</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="soil-type">Soil Type</Label>
                <Select>
                    <SelectTrigger id="soil-type">
                        <SelectValue placeholder="Select Soil Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="loam">Loam</SelectItem>
                        <SelectItem value="clay">Clay</SelectItem>
                        <SelectItem value="sandy">Sandy</SelectItem>
                        <SelectItem value="silt">Silt</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="acreage">Acreage</Label>
              <Input id="acreage" type="number" step="0.1" placeholder="e.g., 10" />
            </div>
          </div>
           <div className="space-y-2">
            <Label>NPK Soil Test Values (ppm)</Label>
            <div className="grid grid-cols-3 gap-2">
                <Input id="nitrogen" type="number" placeholder="N (Nitrogen)" />
                <Input id="phosphorus" type="number" placeholder="P (Phosphorus)" />
                <Input id="potassium" type="number" placeholder="K (Potassium)" />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Get Recommendation
          </Button>
        </form>
        {isLoading && (
          <div className="mt-4 flex flex-col items-center gap-2 text-muted-foreground animate-pulse">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p>Analyzing soil and crop data...</p>
          </div>
        )}
        {recommendation && (
          <Alert className="mt-4 animate-in fade-in-50">
            <FlaskConical className="h-4 w-4" />
            <AlertTitle>Recommendation</AlertTitle>
            <AlertDescription className="mt-2">
              {recommendation}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
