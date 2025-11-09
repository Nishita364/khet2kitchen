
"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { FileStack, Loader2, Scale } from "lucide-react";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { useFinancialSummary } from "@/context/financial-summary-provider";
import { useLanguage } from "@/context/language-provider";

export const financialSummarySchema = z.object({
  crop: z.string().min(1, "Please select a crop."),
  seeds: z.coerce.number().min(0).default(0),
  fertilizer: z.coerce.number().min(0).default(0),
  pesticides: z.coerce.number().min(0).default(0),
  labor: z.coerce.number().min(0).default(0),
  other: z.coerce.number().min(0).default(0),
  totalYield: z.coerce.number().min(0).default(0),
  pricePerKg: z.coerce.number().min(0).default(0),
  loanInterest: z.coerce.number().min(0).default(0),
});

export type FinancialSummaryData = z.infer<typeof financialSummarySchema>;

const crops = [
  { name: "Winter Wheat" },
  { name: "Corn" },
  { name: "Soybeans" },
  { name: "Barley" },
  { name: "Canola" },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#A45D5D"];

export function FinancialSummary() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { financialSummary, setFinancialSummary, resetFinancialSummary } = useFinancialSummary();
  const [totalCost, setTotalCost] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [netIncome, setNetIncome] = useState(0);
  const [isPending, setIsPending] = useState(false);
  const [chartData, setChartData] = useState<any[]>([]);

  const form = useForm<FinancialSummaryData>({
    resolver: zodResolver(financialSummarySchema),
    defaultValues: financialSummary,
  });

  const watchedValues = useWatch({ control: form.control });

  useEffect(() => {
    const { seeds, fertilizer, pesticides, labor, other, loanInterest, totalYield, pricePerKg } = watchedValues;
    const costs = { seeds, fertilizer, pesticides, labor, other, loanInterest };
    
    const data = Object.entries(costs)
      .map(([name, value]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1).replace('Interest', ' Interest'), value: Number(value) }))
      .filter(item => item.value > 0);
      
    setChartData(data);

    const calculatedTotalCost = Object.values(costs).reduce((sum, val) => (sum ?? 0) + (Number(val) || 0), 0);
    const calculatedTotalIncome = (Number(totalYield) || 0) * (Number(pricePerKg) || 0);
    const calculatedNetIncome = calculatedTotalIncome - (calculatedTotalCost ?? 0);
    
    setTotalCost(calculatedTotalCost ?? 0);
    setTotalIncome(calculatedTotalIncome);
    setNetIncome(calculatedNetIncome);
  }, [watchedValues]);

  const onSubmit = (data: FinancialSummaryData) => {
    setIsPending(true);
    setTimeout(() => {
        setFinancialSummary(data);
        toast({
        title: t.farmer.financialsSaved,
        description: t.farmer.financialsSavedDesc.replace('{crop}', data.crop),
        });
        setIsPending(false);
        form.reset(resetFinancialSummary());
    }, 1000);
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{t.farmer.financialSummary}</CardTitle>
        <CardDescription>
          {t.farmer.financialSummaryDesc}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
             <FormField
              control={form.control}
              name="crop"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Crop</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isPending}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a crop to analyze" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {crops.map((c) => (
                        <SelectItem key={c.name} value={c.name}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <FormField control={form.control} name="seeds" render={({ field }) => (<FormItem><FormLabel>Seeds Cost</FormLabel><FormControl><Input type="number" placeholder="$0" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                <FormField control={form.control} name="fertilizer" render={({ field }) => (<FormItem><FormLabel>Fertilizer</FormLabel><FormControl><Input type="number" placeholder="$0" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                <FormField control={form.control} name="pesticides" render={({ field }) => (<FormItem><FormLabel>Pesticides</FormLabel><FormControl><Input type="number" placeholder="$0" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                <FormField control={form.control} name="labor" render={({ field }) => (<FormItem><FormLabel>Labor Cost</FormLabel><FormControl><Input type="number" placeholder="$0" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                <FormField control={form.control} name="other" render={({ field }) => (<FormItem><FormLabel>Other Costs</FormLabel><FormControl><Input type="number" placeholder="$0" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                <FormField control={form.control} name="loanInterest" render={({ field }) => (<FormItem><FormLabel>Loan Interest</FormLabel><FormControl><Input type="number" placeholder="$0" {...field} /></FormControl><FormMessage /></FormItem>)}/>
            </div>
             <div className="grid grid-cols-2 gap-4">
               <FormField
                  control={form.control}
                  name="totalYield"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Yield (in kg)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 8000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="pricePerKg"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price per kg</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" placeholder="$0.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
            
            <Card className="bg-muted/50 p-4 mt-4 space-y-4">
                 <div className="flex justify-between items-center">
                    <p className="flex items-center gap-2 text-muted-foreground"><FileStack />{t.farmer.totalIncome}</p>
                    <p className="font-bold text-lg">${totalIncome.toFixed(2)}</p>
                </div>
                 <div className="flex justify-between items-center">
                    <p className="flex items-center gap-2 text-muted-foreground"><FileStack />{t.farmer.totalCost}</p>
                    <p className="font-bold text-lg">${totalCost.toFixed(2)}</p>
                </div>
                 <div className="flex justify-between items-center">
                    <p className="flex items-center gap-2 text-muted-foreground"><Scale />{t.farmer.netIncome}</p>
                    <p className={`font-bold text-lg ${netIncome >= 0 ? 'text-green-600' : 'text-destructive'}`}>${netIncome.toFixed(2)}</p>
                </div>
            </Card>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t.farmer.saveFinancials}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
