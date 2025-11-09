
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const marketData = [
  { crop: "Wheat", price: "$250/ton", trend: "up", change: "+2.5%" },
  { crop: "Corn", price: "$180/ton", trend: "down", change: "-1.8%" },
  { crop: "Soybeans", price: "$420/ton", trend: "stable", change: "+0.2%" },
];


export function MarketInsights() {
  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="h-5 w-5 text-green-500" />;
    if (trend === "down") return <TrendingDown className="h-5 w-5 text-red-500" />;
    return <Minus className="h-5 w-5 text-gray-500" />;
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
            Market Insights
        </CardTitle>
        <CardDescription>
            Current commodity prices and trends.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {marketData.map((item) => (
            <li key={item.crop} className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-4">
                {getTrendIcon(item.trend)}
                <div>
                    <p className="font-semibold">{item.crop}</p>
                    <p className="text-sm text-muted-foreground">{item.price}</p>
                </div>
              </div>
              <Badge variant={item.trend === 'up' ? 'default' : item.trend === 'down' ? 'destructive' : 'secondary'} className="bg-opacity-20 text-opacity-100">
                {item.change}
              </Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
