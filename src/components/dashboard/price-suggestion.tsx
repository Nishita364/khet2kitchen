"use client";

import { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { handleSuggestPrice } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/datepicker";
import { useToast } from "@/hooks/use-toast";
import { DollarSign, Lightbulb, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useLanguage } from "@/context/language-provider";

const formSchema = z.object({
  cropType: z.string().min(1, 'Crop type is required.'),
  plantingDate: z.date({ required_error: 'Planting date is required.' }),
  expectedYield: z.coerce.number().min(1, 'Expected yield must be greater than 0.'),
  location: z.string().min(1, 'Location is required.'),
});

const initialState = {
  message: '',
  data: null,
  error: null,
};

export function PriceSuggestion() {
  const { t } = useLanguage();
  const [state, formAction, isPending] = useActionState(handleSuggestPrice, initialState);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cropType: "",
      expectedYield: 0,
      location: "",
    },
  });

  useEffect(() => {
    if (state.error) {
      let errorMessage = "An unknown error occurred.";
      try {
        const parsedErrors = JSON.parse(state.error);
        errorMessage = Object.values(parsedErrors).flat().join(', ');
      } catch (e) {
        errorMessage = state.error;
      }
      toast({
        variant: "destructive",
        title: t.forms.error,
        description: errorMessage,
      });
    }
    if (state.data) {
       toast({
        title: t.forms.success + "!",
        description: "Price suggestion generated.",
      });
      form.reset();
    }
  }, [state, toast, form]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("cropType", data.cropType);
    formData.append("plantingDate", data.plantingDate.toISOString());
    formData.append("expectedYield", data.expectedYield.toString());
    formData.append("location", data.location);
    formAction(formData);
  }

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{t.components.aiPriceSuggestion}</CardTitle>
        <CardDescription>
          {t.components.aiPriceSuggestionDesc}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="cropType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.components.cropType}</FormLabel>
                  <FormControl>
                    <Input placeholder={t.components.cropTypePlaceholder} {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="plantingDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{t.components.plantingDate}</FormLabel>
                  <DatePicker date={field.value} setDate={field.onChange} disabled={isPending} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expectedYield"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.components.expectedYieldKg}</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder={t.components.expectedYieldPlaceholder} {...field} disabled={isPending}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.components.location}</FormLabel>
                  <FormControl>
                    <Input placeholder={t.components.locationPlaceholder} {...field} disabled={isPending}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t.components.getSuggestion}
            </Button>
          </form>
        </Form>
        <div className="flex flex-col items-center justify-center p-6 bg-muted/50 rounded-lg">
          {isPending ? (
             <div className="flex flex-col items-center gap-2 text-muted-foreground animate-pulse">
               <Loader2 className="h-8 w-8 animate-spin" />
               <p>{t.components.analyzingMarketData}</p>
             </div>
          ) : state.data ? (
            <Alert className="animate-in fade-in-50 bg-background">
              <Lightbulb className="h-4 w-4" />
              <AlertTitle className="flex items-center gap-4">
                {t.components.suggestedPrice} 
                <span className="text-2xl font-bold text-primary flex items-center">
                  <DollarSign className="h-6 w-6 mr-1" />
                  {state.data.suggestedPricePerKilogram.toFixed(2)}
                  <span className="text-base font-normal text-muted-foreground ml-1">/ kg</span>
                </span>
              </AlertTitle>
              <AlertDescription className="mt-4 text-foreground/80">
                <strong>{t.components.reasoning}</strong> {state.data.reasoning}
              </AlertDescription>
            </Alert>
          ) : (
            <div className="text-center text-muted-foreground">
              <p>{t.components.resultWillAppear}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
