
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Leaf } from 'lucide-react';
import { useLanguage } from '@/context/language-provider';

export default function LandingPage() {
  const { t } = useLanguage();
  
  return (
    <div className="relative flex flex-col min-h-screen bg-background">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/backgrd.jpg')" }}
        data-ai-hint="lush farm field"
      >
        <div className="absolute inset-0 bg-background/80"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="px-4 lg:px-6 h-16 flex items-center">
          <Link href="#" className="flex items-center justify-center text-primary">
            <Leaf className="h-6 w-6" />
            <span className="ml-2 text-lg font-semibold">Khet2Kitchen</span>
          </Link>
        </header>

        <main className="flex-1 flex items-center justify-center text-center">
          <div className="container mx-auto px-4">
              <div className="space-y-6">
                  <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none font-headline text-primary">
                  {t.landing.title}
                  </h1>
                  <p className="max-w-[700px] mx-auto text-xl text-primary/80">
                  {t.landing.subtitle}
                  </p>
                  <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <Link href="/language">
                      {t.landing.getStarted}
                      <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  </Button>
              </div>
          </div>
        </main>

        <footer className="w-full py-6 text-xs text-center text-primary/70">
          <p>&copy; {new Date().getFullYear()} {t.landing.copyright}</p>
        </footer>
      </div>
    </div>
  );
}
