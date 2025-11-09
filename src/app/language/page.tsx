
"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf } from 'lucide-react';
import React from 'react';
import { useLanguage } from '@/context/language-provider';
import type { Language } from '@/lib/translations';

const languages = [
    { name: 'English', code: 'en' as Language, nativeName: 'English' },
    { name: 'Hindi', code: 'hi' as Language, nativeName: 'हिंदी' },
    { name: 'Telugu', code: 'te' as Language, nativeName: 'తెలుగు' },
    { name: 'Tamil', code: 'ta' as Language, nativeName: 'தமிழ்' },
];

function LanguageSelectionPage() {
  const router = useRouter();
  const { t, setLanguage } = useLanguage();

  const handleLanguageSelect = (langCode: Language) => {
    setLanguage(langCode);
    router.push('/welcome');
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-background p-4 animate-in fade-in duration-500">
        <div className="flex items-center gap-4 mb-4">
            <Leaf className="h-12 w-12 text-primary" />
            <h1 className="text-4xl font-headline font-bold text-primary">
                {t.language.welcome}
            </h1>
        </div>
        <p className="mb-8 text-lg text-foreground/80">
            {t.language.selectLanguage}
        </p>
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <CardTitle>{t.language.chooseLanguage}</CardTitle>
                <CardDescription>{t.language.selectPreferred}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {languages.map((lang) => (
                        <Button 
                            key={lang.code} 
                            variant="outline" 
                            size="lg"
                            onClick={() => handleLanguageSelect(lang.code)}
                        >
                            <span className="font-semibold">{lang.name}</span>
                            <span className="text-muted-foreground ml-2">({lang.nativeName})</span>
                        </Button>
                    ))}
                </div>
            </CardContent>
        </Card>
        <footer className="mt-16 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Khet2Kitchen. All Rights Reserved.
        </footer>
    </div>
  );
}

export default function LanguageSelectionPageWrapper() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <LanguageSelectionPage />
    </React.Suspense>
  );
}
