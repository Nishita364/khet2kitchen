
"use client";

import React from "react";
import { useForm } from "react-hook-form";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "../ui/datepicker";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useToast } from "@/hooks/use-toast";
import { useFarmDetails } from "@/context/farm-details-provider";
import { Input } from "../ui/input";
import { useLanguage } from "@/context/language-provider";

export const farmDetailsSchema = z.object({
    irrigationType: z.string().min(1, "Irrigation type is required"),
    soilType: z.string().min(1, "Soil type is required"),
    currentCrop: z.string().min(1, "Crop is required"),
    acreage: z.coerce.number().min(0.1, "Acreage must be greater than 0."),
    sowingDate: z.date({ required_error: "Sowing date is required."}).nullable(),
    harvestDate: z.date({ required_error: "Harvest date is required."}).nullable(),
    expectedYield: z.coerce.number().min(0, "Expected yield cannot be negative."),
    lastSownCrop: z.string().min(1, "Last sown crop is required."),
    lastYield: z.coerce.number().min(0, "Last yield cannot be negative."),
});

export type FarmDetailsData = z.infer<typeof farmDetailsSchema>;

export function FarmDetails() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { farmDetails, setFarmDetails, resetFarmDetails } = useFarmDetails();
  
  const form = useForm<FarmDetailsData>({
    resolver: zodResolver(farmDetailsSchema),
    defaultValues: farmDetails,
  });
  
  React.useEffect(() => {
    form.reset(farmDetails);
  }, [farmDetails, form]);

  const onSubmit = (data: FarmDetailsData) => {
    setFarmDetails(data);
    toast({
        title: t.farmer.farmDetailsSaved,
        description: t.farmer.farmDetailsSavedDesc,
    });
    form.reset(resetFarmDetails());
  }

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{t.farmer.farmDetails}</CardTitle>
        <CardDescription>
          {t.farmer.farmDetailsDesc}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="irrigationType"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Type of Irrigation</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value || ''}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Type" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="drip">Drip Irrigation</SelectItem>
                                <SelectItem value="sprinkler">Sprinkler</SelectItem>
                                <SelectItem value="flood">Flood Irrigation</SelectItem>
                                <SelectItem value="rain-fed">Rain-fed</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="soilType"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Type of Soil</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value || ''}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Soil Type" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="loam">Loam</SelectItem>
                                <SelectItem value="clay">Clay</SelectItem>
                                <SelectItem value="sandy">Sandy</SelectItem>
                                <SelectItem value="silt">Silt</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="currentCrop"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Current Crop Sown</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Winter Wheat" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="acreage"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Acreage</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="e.g., 10" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="sowingDate"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                        <FormLabel>Date of Sowing</FormLabel>
                            <DatePicker date={field.value ?? undefined} setDate={field.onChange} />
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="harvestDate"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                        <FormLabel>Expected Date of Harvest</FormLabel>
                            <DatePicker date={field.value ?? undefined} setDate={field.onChange} />
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <FormField
                    control={form.control}
                    name="expectedYield"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Expected Yield (in kg)</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="e.g., 8000" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="lastSownCrop"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Last Sown Crop</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Soybeans" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="lastYield"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Last Yield (in kg)</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="e.g., 8000" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <Button type="submit" className="w-full">
                {t.farmer.saveDetails}
            </Button>
            </form>
        </Form>
      </CardContent>
    </Card>
  );
}
