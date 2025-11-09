
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
  MessageSquareHeart,
  ShoppingCart,
  Users,
  ShieldAlert,
  Award,
  DollarSign,
  Package,
  TrendingUp,
  Tractor,
  AreaChart,
} from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { FarmDetailsProvider } from '@/context/farm-details-provider';
import { FinancialSummaryProvider } from '@/context/financial-summary-provider';

const navLinksData = [
    { href: "/company/dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
    { href: "/company/produce", label: "Available Produce", icon: <Package className="h-4 w-4" /> },
    { href: "/company/grading", label: "Produce Grading", icon: <Award className="h-4 w-4" /> },
    { href: "/company/pricing", label: "Commodity Pricing", icon: <DollarSign className="h-4 w-4" /> },
    { href: "/company/market-insights", label: "Market Insights", icon: <TrendingUp className="h-4 w-4" /> },
    { href: "/company/sourcing-breakdown", label: "Sourcing Breakdown", icon: <Tractor className="h-4 w-4" /> },
    { href: "/company/revenue-breakdown", label: "Revenue Breakdown", icon: <AreaChart className="h-4 w-4" /> },
    { href: "/company/orders", label: "Orders", icon: <ShoppingCart className="h-4 w-4" /> },
    { href: "/company/farmers", label: "Farmer Data", icon: <Users className="h-4 w-4" /> },
    { href: "/company/community", label: "Community", icon: <Users className="h-4 w-4" /> },
    { href: "/company/feedback", label: "Feedback", icon: <MessageSquareHeart className="h-4 w-4" /> },
    { href: "/company/complaints", label: "Complaint Redressal", icon: <ShieldAlert className="h-4 w-4" /> },
];

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/company/dashboard" className="flex items-center gap-2 font-semibold">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="">Khet2Kitchen</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {navLinksData.map((link) => (
                <Link
                  key={link.href}
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
                  href="/company/dashboard"
                  className="flex items-center gap-2 text-lg font-semibold mb-4"
                >
                  <Leaf className="h-6 w-6 text-primary" />
                  <span className="">Khet2Kitchen</span>
                </Link>
                 {navLinksData.map((link) => (
                    <Link
                        key={`${link.href}-mobile`}
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
                  <AvatarImage src="https://placehold.co/100x100.png" alt="Company Rep" data-ai-hint="business person" />
                  <AvatarFallback>C</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Company Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/company/support">Support</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/" className="flex items-center cursor-pointer"><LogOut className="mr-2 h-4 w-4" />Logout</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
          <FinancialSummaryProvider>
            <FarmDetailsProvider>
              {children}
            </FarmDetailsProvider>
          </FinancialSummaryProvider>
        </main>
      </div>
    </div>
  );
}
