"use client";

import { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { handleSubmitFeedback } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send, ThumbsUp } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  feedbackText: z.string().min(10, 'Feedback must be at least 10 characters long.'),
});

const initialState = {
  message: '',
  data: null,
  error: null,
};

type FeedbackFormProps = {
    userType: 'farmer' | 'company' | 'consumer';
}

export function FeedbackForm({ userType }: FeedbackFormProps) {
  const [state, formAction, isPending] = useActionState(handleSubmitFeedback, initialState);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      feedbackText: "",
    },
  });

  useEffect(() => {
    if (state.error) {
       toast({
        variant: "destructive",
        title: "Error submitting feedback",
        description: state.error,
      });
    }
    if (state.data) {
      toast({
        title: "Feedback Submitted!",
        description: `Thank you! Your reference ID is ${state.data.referenceId}.`,
      });
      form.reset();
    }
  }, [state, toast, form]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("feedbackText", data.feedbackText);
    formData.append("userType", userType);
    formAction(formData);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="font-headline">Share Your Thoughts</CardTitle>
        <CardDescription>
          We value your feedback. Let us know how we can improve Khet2Kitchen.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {state.data ? (
          <Alert className="animate-in fade-in-50 bg-background">
            <ThumbsUp className="h-4 w-4" />
            <AlertTitle>Thank You!</AlertTitle>
            <AlertDescription className="mt-4 space-y-2 text-foreground/80">
              <p>Your feedback has been received. We appreciate you taking the time to help us improve.</p>
              <p><strong>Reference ID:</strong> {state.data.referenceId}</p>
              <p><strong>Category:</strong> {state.data.category}</p>
              <Button onClick={() => window.location.reload()} className="mt-4">Submit another feedback</Button>
            </AlertDescription>
          </Alert>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="feedbackText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Feedback</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about your experience, or suggest a new feature..."
                        rows={6}
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="mr-2 h-4 w-4" />
                )}
                Submit Feedback
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
