
"use client";

import { useRouter } from 'next/navigation';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MainLayout } from '@/components/layout/MainLayout';
import { useAppContext } from '@/context/AppContext';
import type { UserInfo } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { checkoutUserDetailsPageTexts as texts } from '@/lib/constants/checkoutUserDetailsPageTexts';
import { UserDetailsSchema, type UserDetailsFormValues } from '@/lib/schemas/checkoutSchemas';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export default function CheckoutUserDetailsPage() {
  const router = useRouter();
  const { setUser, getTotalItems } = useAppContext();
  const [isClient, setIsClient] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null); 
  const [shouldSaveInfo, setShouldSaveInfo] = useState<boolean>(false);

  const form = useForm<UserDetailsFormValues>({
    resolver: zodResolver(UserDetailsSchema),
    defaultValues: {
      name: '',
      address: '',
      complement: '',
    },
  });

  useEffect(() => {
    setIsClient(true);
    try {
      const phoneFromSession = sessionStorage.getItem('checkoutPhoneNumber'); 
      const saveInfo = sessionStorage.getItem('checkoutSaveInfo');

      if (!phoneFromSession) {
        toast({ title: texts.errorLoadingPhoneTitle, description: texts.errorLoadingPhoneDescription, variant: "destructive" });
        router.push('/checkout');
        return;
      }
      setPhoneNumber(phoneFromSession);
      setShouldSaveInfo(saveInfo ? JSON.parse(saveInfo) : false);

      const phoneKey = phoneFromSession.replace(/\D/g, ''); 
      const storedDataString = localStorage.getItem(phoneKey);
      if (storedDataString) {
        const storedData: Omit<UserInfo, 'phone'> = JSON.parse(storedDataString);
        form.reset({
          name: storedData.name || '',
          address: storedData.address || '',
          complement: storedData.complement || '',
        });
      }
    } catch (error) {
      console.warn("Erro ao acessar sessionStorage ou localStorage:", error);
      toast({ title: texts.errorLoadingPhoneTitle, description: "Ocorreu um erro inesperado.", variant: "destructive" });
      router.push('/checkout');
    }
  }, [router, form]);

  useEffect(() => {
    if (isClient && getTotalItems() === 0 && !phoneNumber) {
      router.push('/cart');
    }
  }, [isClient, getTotalItems, phoneNumber, router]);


  if (!isClient || !phoneNumber) {
     return <LoadingSpinner text={texts.loading} fullPageLayout={true} />;
  }

  const onSubmit: SubmitHandler<UserDetailsFormValues> = (data) => {
    if (!phoneNumber) { 
      toast({ title: texts.errorLoadingPhoneTitle, description: texts.errorLoadingPhoneDescription, variant: "destructive" });
      router.push('/checkout');
      return;
    }

    const fullUserInfo: UserInfo = {
      phone: phoneNumber, 
      name: data.name,
      address: data.address,
      complement: data.complement || undefined,
    };

    setUser(fullUserInfo);

    try {
      const phoneKey = phoneNumber.replace(/\D/g, ''); 
      if (shouldSaveInfo) {
        localStorage.setItem(phoneKey, JSON.stringify({
          name: data.name,
          address: data.address,
          complement: data.complement || undefined
        }));
      } else {
        localStorage.removeItem(phoneKey);
      }
    } catch (error) {
        console.warn("Não foi possível acessar o localStorage ao salvar/remover:", error);
        toast({ title: texts.errorSavingData, description: texts.errorSavingDataDescription, variant: "destructive" });
    }

    toast({
      title: texts.detailsSaved,
      description: texts.yourInfoSaved,
    });
    router.push('/summary');
  };

  return (
    <MainLayout>
      <section className="py-8 max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="font-page-title font-semibold text-2xl">{texts.deliveryDetailsTitle}</CardTitle>
            <CardDescription>{texts.deliveryDetailsDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{texts.fullName}</FormLabel>
                      <FormControl>
                        <Input placeholder={texts.fullNamePlaceholder} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{texts.deliveryAddress}</FormLabel>
                      <FormControl>
                        <Input placeholder={texts.deliveryAddressPlaceholder} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="complement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{texts.complementLabel}</FormLabel>
                      <FormControl>
                        <Input placeholder={texts.complementPlaceholder} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 border border-yellow-700"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  {texts.saveAndProceed}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </section>
    </MainLayout>
  );
}
