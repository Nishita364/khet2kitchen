
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LifeBuoy, Mail } from "lucide-react";

const faqs = [
  {
    question: "How do I reset my password?",
    answer:
      "You can reset your password from the login page by clicking the 'Forgot Password' link. If you continue to have trouble, please contact our support team.",
  },
  {
    question: "How does the AI pricing suggestion work?",
    answer:
      "Our AI analyzes current market trends, historical data, your crop type, and location to provide a fair and competitive price suggestion. It is a recommendation, and you can set your final price as you see fit.",
  },
  {
    question: "What do the produce grades (A, B, C) mean?",
    answer:
      "The grades are based on standard quality parameters. Grade A is premium quality with no defects. Grade B is good quality with minor inconsistencies. Grade C is fair quality with noticeable defects.",
  },
  {
    question: "How can I track my order?",
    answer:
      "You can view your current and past orders in the 'My Orders' section of your dashboard. The status of each order will be updated there.",
  },
];

export function SupportPage() {
  return (
    <>
      <div className="flex items-center mb-6">
        <div className="flex-shrink-0 mr-4 bg-primary/10 text-primary p-3 rounded-full">
            <LifeBuoy className="h-6 w-6" />
        </div>
        <div>
            <h1 className="text-2xl font-semibold md:text-3xl font-headline">
              Support Center
            </h1>
            <p className="text-muted-foreground">
              Find answers to your questions or get in touch with our team.
            </p>
        </div>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger>{faq.question}</AccordionTrigger>
                                <AccordionContent>{faq.answer}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
        </div>
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Contact Support</CardTitle>
                    <CardDescription>
                        Can't find the answer you're looking for? Reach out to us.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild className="w-full">
                        <a href="mailto:support@khet2kitchen.com">
                            <Mail className="mr-2 h-4 w-4" /> Email Us
                        </a>
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </>
  );
}
