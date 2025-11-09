
"use client";

import { NutrientRecommendation } from "@/components/dashboard/nutrient-recommendation";

export default function NutrientRecommendationPage() {
  return (
    <>
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-semibold md:text-3xl font-headline">
          Crop Nutrient Recommendation
        </h1>
      </div>
      <NutrientRecommendation />
    </>
  );
}
