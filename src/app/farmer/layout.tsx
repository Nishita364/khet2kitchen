
"use client";

import React from 'react';
import Link from 'next/link';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LayoutDashboard,
  LogOut,
  Leaf,
  Menu,
  DollarSign,
  ShoppingCart,
  Users,
  MessageSquareHeart,
  FlaskConical,
  Bug,
  CloudSun,
  Award,
  TrendingUp,
  LineChart
} from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { FarmDetailsProvider } from '@/context/farm-details-provider';
import { FinancialSummaryProvider } from '@/context/financial-summary-provider';
import { useLanguage } from '@/context/language-provider';
import { VoiceButton } from '@/components/voice-assistant/voice-button';

export default function FarmerLayout({ children }: { children: React.ReactNode; }) {
  const { t } = useLanguage();
  
  const navLinksData = [
    { href: "/farmer/dashboard", label: t.farmer.dashboard, icon: <LayoutDashboard className="h-4 w-4" /> },
    { href: "/farmer/pricing", label: t.farmer.aiPricing, icon: <DollarSign className="h-4 w-4" /> },
    { href: "/farmer/orders", label: t.farmer.incomingOrders, icon: <ShoppingCart className="h-4 w-4" /> },
    { href: "/farmer/graded-produce", label: t.farmer.myGradedProduce, icon: <Award className="h-4 w-4" /> },
    { href: "/farmer/market-insights", label: t.farmer.marketInsights, icon: <TrendingUp className="h-4 w-4" /> },
    { href: "/farmer/market-demand", label: t.farmer.marketDemand, icon: <LineChart className="h-4 w-4" /> },
    { href: "/farmer/community", label: t.farmer.community, icon: <Users className="h-4 w-4" /> },
    { href: "/farmer/nutrient-recommendation", label: t.farmer.nutrientRecommendation, icon: <FlaskConical className="h-4 w-4" /> },
    { href: "/farmer/pest-control", label: t.farmer.pestDiseaseControl, icon: <Bug className="h-4 w-4" /> },
    { href: "/farmer/weather-forecast", label: t.farmer.weatherForecast, icon: <CloudSun className="h-4 w-4" /> },
    { href: "/farmer/feedback", label: t.farmer.feedback, icon: <MessageSquareHeart className="h-4 w-4" /> },
  ];
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/farmer/dashboard" className="flex items-center gap-2 font-semibold">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="">Khet2Kitchen</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {navLinksData.map((link, index) => (
                <Link
                  key={`${link.href}-${index}`}
                  href={link.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted-foreground/10 data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="/farmer/dashboard"
                  className="flex items-center gap-2 text-lg font-semibold mb-4"
                >
                  <Leaf className="h-6 w-6 text-primary" />
                  <span className="">Khet2Kitchen</span>
                </Link>
                {navLinksData.map((link, index) => (
                  <Link
                    key={`${link.href}-${index}-mobile`}
                    href={link.href}
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    {React.cloneElement(link.icon, { className: 'h-5 w-5' })}
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage src="https://placehold.co/100x100.png" alt="Farmer" data-ai-hint="farmer portrait" />
                  <AvatarFallback>F</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t.farmer.farmerAccount}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>{t.common.settings}</DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/farmer/support">{t.common.support}</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
               <DropdownMenuItem asChild>
                <Link href="/" className="flex items-center cursor-pointer"><LogOut className="mr-2 h-4 w-4" />{t.common.logout}</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/20 relative">
          <FinancialSummaryProvider>
            <FarmDetailsProvider>
              {children}
            </FarmDetailsProvider>
          </FinancialSummaryProvider>
          <VoiceButton />
        </main>
      </div>
    </div>
  );
}
