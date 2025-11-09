
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tractor, Users, FileText, DollarSign, ArrowRight, AreaChart } from "lucide-react";
import Link from "next/link";

export function SourcingOverview() {
  const stats = [
    {
      title: "Total Farmers",
      value: "128",
      change: "+12 since last month",
      icon: <Users className="h-6 w-6 text-primary" />,
      href: "/company/farmers"
    },
    {
        title: "Revenue",
        value: "$1.2M",
        change: "+15% this quarter",
        icon: <DollarSign className="h-6 w-6 text-green-600" />,
        href: "/company/revenue-breakdown"
    },
    {
      title: "Pending Orders",
      value: "15",
      change: "Totaling $45,000",
      icon: <FileText className="h-6 w-6 text-blue-500" />,
      href: "/company/orders"
    },
    {
      title: "Total Sourced",
      value: "250,000 kg",
      change: "Last 30 days",
      icon: <Tractor className="h-6 w-6 text-yellow-800" />,
      href: "/company/sourcing-breakdown"
    },
  ];

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
          Supply Chain Summary
        </CardTitle>
        <CardDescription>
          A summary of your supply chain activities.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
            const StatCard = (
                <Card key={stat.title} className="p-4 flex flex-col justify-between bg-muted/50 transition-all duration-300 hover:bg-muted/80 hover:shadow-md h-full">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-background rounded-full">
                            {stat.icon}
                        </div>
                        <div>
                        <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                        <p className="text-xl font-bold">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.change}</p>
                        </div>
                    </div>
                    {stat.href && (
                         <div className="flex items-center justify-end text-xs font-semibold text-primary mt-2">
                            View Details <ArrowRight className="ml-1 h-3 w-3" />
                        </div>
                    )}
                </Card>
            );

            return stat.href ? (
                <Link href={stat.href} key={stat.title} className="flex">
                    {StatCard}
                </Link>
            ) : (
                StatCard
            );
        })}
      </CardContent>
    </Card>
  );
}
