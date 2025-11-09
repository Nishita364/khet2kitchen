
"use client";

import { WeatherForecast } from "@/components/dashboard/weather-forecast";

export default function WeatherForecastPage() {
  return (
    <>
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-semibold md:text-3xl font-headline">
          Weather Forecast
        </h1>
      </div>
      <WeatherForecast />
    </>
  );
}
