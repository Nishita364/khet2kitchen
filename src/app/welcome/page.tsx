
"use client";

import Link from 'next/link';
import { Leaf, User, Building, ShoppingCart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/context/language-provider';

export default function WelcomePage() {
  const { t } = useLanguage();
  
  const userTypes = [
    { 
        type: 'farmer',
        icon: <User className="h-8 w-8" />,
        href: '/farmer/login'
    },
    { 
        type: 'company',
        icon: <Building className="h-8 w-8" />,
        href: '/company/login'
    },
    { 
        type: 'consumer',
        icon: <ShoppingCart className="h-8 w-8" />,
        href: '/consumer/login'
    },
  ];

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-background p-4 animate-in fade-in duration-500">
        <div className="flex items-center gap-4 mb-4">
            <Leaf className="h-12 w-12 text-primary" />
            <h1 className="text-4xl font-headline font-bold text-primary">
                {t.welcome.title}
            </h1>
        </div>
        <p className="mb-8 text-lg text-foreground/80">
            {t.welcome.selectRole}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
            {userTypes.map((user) => {
                const isCompany = user.type === 'company';
                const iconColor = isCompany ? 'text-accent' : 'text-primary';
                const iconBgColor = isCompany ? 'bg-accent/10' : 'bg-primary/10';
                const buttonVariant = isCompany ? 'default' : 'default';
                const buttonClass = isCompany ? 'bg-accent hover:bg-accent/90 text-accent-foreground' : '';
                const userTypeKey = user.type as 'farmer' | 'company' | 'consumer';

                return (
                    <Card key={user.type} className="flex flex-col text-center hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300">
                        <CardHeader className="items-center">
                            <div className={`p-4 ${iconBgColor} rounded-full mb-4`}>
                                {user.icon.type === User && <User className={`h-8 w-8 ${iconColor}`} />}
                                {user.icon.type === Building && <Building className={`h-8 w-8 ${iconColor}`} />}
                                {user.icon.type === ShoppingCart && <ShoppingCart className={`h-8 w-8 ${iconColor}`} />}
                            </div>
                            <CardTitle className="font-headline">{t.welcome[userTypeKey].title}</CardTitle>
                            <CardDescription>{t.welcome[userTypeKey].description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow flex items-end justify-center">
                            <Button asChild className={`w-full ${buttonClass}`} variant={buttonVariant as any}>
                                <Link href={user.href}>
                                    {t.welcome[userTypeKey].button} <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
         <footer className="mt-16 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Khet2Kitchen. All Rights Reserved.
        </footer>
    </div>
  );
}
