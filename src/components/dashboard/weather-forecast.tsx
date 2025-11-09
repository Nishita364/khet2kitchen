"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sun, Cloud, CloudRain, Wind } from "lucide-react";
import { useLanguage } from "@/context/language-provider";

export function WeatherForecast() {
  const { t } = useLanguage();
  
  const forecastData = [
    { day: t.weather.today, temp: "28°C", condition: t.weather.sunny, icon: <Sun className="h-8 w-8 text-yellow-500" /> },
    { day: t.weather.tomorrow, temp: "25°C", condition: t.weather.cloudy, icon: <Cloud className="h-8 w-8 text-gray-500" /> },
    { day: "Wed", temp: "22°C", condition: t.weather.rainy, icon: <CloudRain className="h-8 w-8 text-blue-500" /> },
    { day: "Thu", temp: "26°C", condition: t.weather.windy, icon: <Wind className="h-8 w-8 text-gray-400" /> },
  ];
  
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{t.components.weatherForecast}</CardTitle>
        <CardDescription>{t.weather.forecast5Day}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center space-x-4">
          {forecastData.map((forecast) => (
            <div key={forecast.day} className="flex flex-col items-center space-y-2 p-2 rounded-lg hover:bg-muted/50 transition-colors">
              <span className="text-sm font-medium text-muted-foreground">{forecast.day}</span>
              {forecast.icon}
              <span className="text-lg font-bold">{forecast.temp}</span>
              <span className="text-xs text-muted-foreground">{forecast.condition}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
