
"use client";

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Leaf } from 'lucide-react';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/context/language-provider';


const emailLoginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

const phoneLoginSchema = z.object({
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  otp: z.string().min(6, { message: 'OTP must be 6 digits.' }).max(6),
});

type LoginFormProps = {
  userType: 'farmer' | 'company' | 'consumer';
};

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="24px"
    height="24px"
  >
    <path
      fill="#fbc02d"
      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    />
    <path
      fill="#e53935"
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    />
    <path
      fill="#4caf50"
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.222,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
    />
    <path
      fill="#1565c0"
      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238	C42.021,35.59,44,30.034,44,24C44,22.659,43.862,21.35,43.611,20.083z"
    />
  </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    height="24px"
    width="24px"
  >
    <path d="M22,12c0-5.523-4.477-10-10-10S2,6.477,2,12c0,4.99,3.657,9.128,8.438,9.878V14.89h-2.54V12h2.54V9.797 c0-2.506,1.492-3.89,3.777-3.89c1.094,0,2.238,0.195,2.238,0.195v2.46h-1.26c-1.24,0-1.628,0.772-1.628,1.562V12h2.773l-0.443,2.89h-2.33V21.878C18.343,21.128,22,16.99,22,12z" />
  </svg>
);


export function LoginForm({ userType }: LoginFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const getTitle = () => {
    switch (userType) {
        case 'farmer': return t.login.farmerPortal;
        case 'company': return t.login.companyPortal;
        case 'consumer': return t.login.consumerPortal;
    }
  };
  
  const emailForm = useForm<z.infer<typeof emailLoginSchema>>({
    resolver: zodResolver(emailLoginSchema),
    defaultValues: { email: '', password: '' },
  });

  const phoneForm = useForm<z.infer<typeof phoneLoginSchema>>({
    resolver: zodResolver(phoneLoginSchema),
    defaultValues: { phone: '', otp: '' },
  });

  function onLogin() {
    setIsSubmitting(true);
    toast({
      title: t.login.loginSuccess,
      description: t.login.welcomeRedirect,
    });
    
    setTimeout(() => {
      router.push(`/${userType}/dashboard`);
    }, 1000);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 animate-in fade-in duration-500">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex items-center justify-center bg-primary rounded-full h-16 w-16">
            <Leaf className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-3xl font-headline">
             {getTitle()}
          </CardTitle>
          <CardDescription>
            {t.login.credentials}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="email">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email">{t.login.email}</TabsTrigger>
              <TabsTrigger value="phone">{t.login.phone.split(' ')[0]}</TabsTrigger>
            </TabsList>
            <TabsContent value="email">
              <Form {...emailForm}>
                <form onSubmit={emailForm.handleSubmit(onLogin)} className="space-y-6 pt-4">
                  <FormField
                    control={emailForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.login.email}</FormLabel>
                        <FormControl>
                          <Input placeholder={t.login.emailPlaceholder} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={emailForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.login.password}</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder={t.login.passwordPlaceholder} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? t.login.loggingIn : t.login.loginEmail}
                  </Button>
                </form>
              </Form>
            </TabsContent>
            <TabsContent value="phone">
               <Form {...phoneForm}>
                <form onSubmit={phoneForm.handleSubmit(onLogin)} className="space-y-6 pt-4">
                  <FormField
                    control={phoneForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.login.phone}</FormLabel>
                        <FormControl>
                          <Input placeholder={t.login.phonePlaceholder} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={phoneForm.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.login.otp}</FormLabel>
                        <FormControl>
                          <Input placeholder={t.login.otpPlaceholder} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? t.login.loggingIn : t.login.loginPhone}
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>

          <div className="my-6 flex items-center">
            <Separator className="flex-1" />
            <span className="mx-4 text-sm text-muted-foreground">{t.login.or}</span>
            <Separator className="flex-1" />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <Button variant="outline" onClick={onLogin} disabled={isSubmitting}>
              <GoogleIcon className="mr-2 h-5 w-5" /> {t.login.google}
            </Button>
            <Button variant="outline" onClick={onLogin} disabled={isSubmitting} className="bg-[#1877F2] text-white hover:bg-[#1877F2]/90 hover:text-white">
              <FacebookIcon className="mr-2 h-5 w-5" /> {t.login.facebook}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
