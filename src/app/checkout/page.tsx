"use client";

import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState, useMemo } from "react";
import { Loader2 } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { checkoutPageTexts as texts } from "@/lib/constants/checkoutPageTexts";
import {
  PhoneStepSchema,
  type PhoneStepFormValues,
} from "@/lib/schemas/checkoutSchemas";
import { formatPhoneNumber } from "@/lib/utils";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

export default function CheckoutPhonePage() {
  const router = useRouter();
  const { user, getTotalItems } = useAppContext();
  const [isClient, setIsClient] = useState(false);

  const initialFormattedPhone = useMemo(() => {
    return formatPhoneNumber(user?.phone || "");
  }, [user?.phone]);

  const form = useForm<PhoneStepFormValues>({
    resolver: zodResolver(PhoneStepSchema),
    defaultValues: {
      phone: initialFormattedPhone,
      saveInfo: user?.phone
        ? !!localStorage.getItem(user.phone.replace(/\D/g, ""))
        : false,
    },
  });

  useEffect(() => {
    setIsClient(true);
    sessionStorage.removeItem("checkoutPhoneNumber");
    sessionStorage.removeItem("checkoutSaveInfo");
  }, []);

  useEffect(() => {
    const rawUserPhone = user?.phone || "";
    const newlyFormatted = formatPhoneNumber(rawUserPhone);
    if (form.getValues("phone") !== newlyFormatted && newlyFormatted !== "") {
      form.setValue("phone", newlyFormatted, {
        shouldValidate: true,
        shouldDirty: true,
      });
      if (isClient) {
        const cleanedUserPhone = newlyFormatted.replace(/\D/g, "");
        if (cleanedUserPhone.length >= 10) {
          try {
            const storedData = localStorage.getItem(cleanedUserPhone);
            form.setValue("saveInfo", !!storedData);
          } catch (error) {
            form.setValue("saveInfo", false);
          }
        }
      }
    }
  }, [user?.phone, form, isClient]);

  const watchedPhone = form.watch("phone");
  useEffect(() => {
    if (isClient && watchedPhone) {
      const cleanedPhone = watchedPhone.replace(/\D/g, "");
      if (cleanedPhone.length >= 10) {
        try {
          const storedData = localStorage.getItem(cleanedPhone);
          form.setValue("saveInfo", !!storedData);
        } catch (error) {
          console.warn("Não foi possível acessar o localStorage:", error);
          form.setValue("saveInfo", false);
        }
      } else {
        if (form.getValues("saveInfo")) {
          form.setValue("saveInfo", false);
        }
      }
    }
  }, [isClient, watchedPhone, form]);

  useEffect(() => {
    if (isClient && getTotalItems() === 0 && !user) {
      router.push("/cart");
    }
  }, [isClient, getTotalItems, user, router]);

  if (!isClient || (getTotalItems() === 0 && !user)) {
    return <LoadingSpinner text={texts.loading} fullPageLayout={true} />;
  }

  const handlePhoneInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldOnChange: (value: string) => void
  ) => {
    const formatted = formatPhoneNumber(event.target.value);
    fieldOnChange(formatted);
  };

  const onSubmit: SubmitHandler<PhoneStepFormValues> = (data) => {
    try {
      sessionStorage.setItem("checkoutPhoneNumber", data.phone);
      sessionStorage.setItem("checkoutSaveInfo", JSON.stringify(data.saveInfo));
    } catch (error) {
      console.warn("Não foi possível acessar o sessionStorage:", error);
    }
    router.push("/checkout/user-details");
  };

  return (
    <MainLayout>
      <section className="py-8 max-w-lg mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="font-page-title font-semibold text-2xl">
              {texts.contactInfoTitle}
            </CardTitle>
            <CardDescription>{texts.contactInfoDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{texts.phoneNumber}</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder={texts.phoneNumberPlaceholder}
                          {...field}
                          onChange={(e) =>
                            handlePhoneInputChange(e, field.onChange)
                          }
                          maxLength={15} // (XX) XXXXX-XXXX
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="saveInfo"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id="saveInfo"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <Label htmlFor="saveInfo" className="cursor-pointer">
                          {texts.saveInfoCheckboxLabel}
                        </Label>
                      </div>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground text-lg hover:bg-primary/90 border"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  {texts.continueButton}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </section>
    </MainLayout>
  );
}
