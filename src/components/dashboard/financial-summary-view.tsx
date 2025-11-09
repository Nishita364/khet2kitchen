
"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFinancialSummary } from "@/context/financial-summary-provider";
import { FileStack, Scale } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#A45D5D"];


export function FinancialSummaryView() {
  const { financialSummary } = useFinancialSummary();
  const [totalCost, setTotalCost] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [netIncome, setNetIncome] = useState(0);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const { seeds, fertilizer, pesticides, labor, other, loanInterest, totalYield, pricePerKg, crop } = financialSummary;
    if (!crop) return;

    const costs = { seeds, fertilizer, pesticides, labor, other, loanInterest };
    
    const data = Object.entries(costs)
      .map(([name, value]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1).replace('Interest', ' Interest'), value }))
      .filter(item => item.value > 0);
      
    setChartData(data);

    const calculatedTotalCost = Object.values(costs).reduce((sum, val) => sum + (val || 0), 0);
    const calculatedTotalIncome = (totalYield || 0) * (pricePerKg || 0);
    const calculatedNetIncome = calculatedTotalIncome - calculatedTotalCost;
    
    setTotalCost(calculatedTotalCost);
    setTotalIncome(calculatedTotalIncome);
    setNetIncome(calculatedNetIncome);
  }, [financialSummary]);

  const hasData = financialSummary.crop && financialSummary.crop.length > 0;

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Farmer's Financial Summary</CardTitle>
        <CardDescription>
          An overview of the farmer's crop profitability.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {hasData ? (
            <div className="space-y-4">
                <div className="text-center p-2 bg-muted rounded-md">
                    <p className="text-sm text-muted-foreground">Currently Viewing</p>
                    <p className="font-bold text-lg text-primary">{financialSummary.crop}</p>
                </div>
                 <Card className="bg-muted/50 p-4 space-y-4">
                    <div className="flex justify-between items-center">
                        <p className="flex items-center gap-2 text-muted-foreground">Total Yield</p>
                        <p className="font-bold text-lg">{financialSummary.totalYield.toLocaleString()} kg</p>
                    </div>
                     <div className="flex justify-between items-center">
                        <p className="flex items-center gap-2 text-muted-foreground">Price per kg</p>
                        <p className="font-bold text-lg">${financialSummary.pricePerKg.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="flex items-center gap-2 text-muted-foreground"><FileStack />Total Income</p>
                        <p className="font-bold text-lg">${totalIncome.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="flex items-center gap-2 text-muted-foreground"><FileStack />Total Cost</p>
                        <p className="font-bold text-lg">${totalCost.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="flex items-center gap-2 text-muted-foreground"><Scale />Net Income</p>
                        <p className={`font-bold text-lg ${netIncome >= 0 ? 'text-green-600' : 'text-destructive'}`}>${netIncome.toFixed(2)}</p>
                    </div>
                </Card>

                <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg min-h-[200px]">
                    <h3 className="font-semibold mb-2">Cost Breakdown</h3>
                    {chartData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={150}>
                            <PieChart>
                            <Pie data={chartData} cx="50%" cy="50%" labelLine={false} outerRadius={60} fill="#8884d8" dataKey="value" nameKey="name" label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}>
                                {chartData.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
                            </Pie>
                            <Tooltip formatter={(value, name) => [`$${value}`, name]} />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <p className="text-muted-foreground text-sm">No cost data entered.</p>
                    )}
                </div>
            </div>
        ) : (
            <p className="text-muted-foreground">The farmer has not provided their financial summary yet.</p>
        )}
      </CardContent>
    </Card>
  );
}
