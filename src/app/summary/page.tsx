"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardProps,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Edit3, PackageCheck } from "lucide-react";
import {
  generateWhatsappMessage,
  type GenerateWhatsappMessageInput,
} from "@/ai/flows/generate-whatsapp-message";
import { toast } from "@/hooks/use-toast";
import { summaryPageTexts as texts } from "@/lib/constants/summaryPageTexts";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

const STORE_PHONE_NUMBER = "5511995182883";

const CardOutline: React.FC<CardProps & { children: React.ReactNode }> = ({
  children,
  ...props
}) => <Card {...props}>{children}</Card>;

export default function SummaryPage() {
  const router = useRouter();
  const { cart, user, getTotalPrice } = useAppContext(); // Removed clearCart from here
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isConfirmingOrder, setIsConfirmingOrder] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (
      isClient &&
      !isConfirmingOrder &&
      cart.length === 0 &&
      user &&
      user.name
    ) {
      router.push("/cart");
    }
  }, [isClient, cart, user, router, isConfirmingOrder]);

  if (
    !isClient ||
    !user ||
    !user.name ||
    !user.address ||
    !user.phone ||
    (cart.length === 0 && !user?.name)
  ) {
    return <LoadingSpinner text={texts.loading} fullPageLayout={true} />;
  }

  const totalPrice = getTotalPrice();
  const orderItemsForAI = cart.map(
    (item) =>
      `${item.name} (x${item.quantity}) - R$${(
        item.price * item.quantity
      ).toFixed(2)}`
  );

  const handleConfirmOrder = async () => {
    setIsLoading(true);
    setIsConfirmingOrder(true);

    if (!user || !user.name || !user.address || !user.phone) {
      toast({
        title: texts.errorUserMissingTitle,
        description: texts.errorUserMissing,
        variant: "destructive",
      });
      setIsLoading(false);
      setIsConfirmingOrder(false);
      router.push("/checkout");
      return;
    }
    if (cart.length === 0) {
      toast({
        title: "Carrinho Vazio",
        description:
          "Seu carrinho está vazio. Adicione itens antes de prosseguir.",
        variant: "destructive",
      });
      setIsLoading(false);
      setIsConfirmingOrder(false);
      router.push("/cart");
      return;
    }

    const userAddressString = `${user.address}${
      user.complement ? `, ${user.complement}` : ""
    }`;

    const aiInput: GenerateWhatsappMessageInput = {
      userName: user.name,
      userPhone: STORE_PHONE_NUMBER,
      userAddress: userAddressString,
      orderItems: orderItemsForAI,
      orderTotal: totalPrice,
    };

    try {
      const result = await generateWhatsappMessage(aiInput);

      sessionStorage.setItem("whatsappUrl", result.whatsappUrl);
      sessionStorage.setItem("whatsappMessage", result.whatsappMessage);

      router.push("/order-placed");
      // clearCart(); // REMOVED FROM HERE
    } catch (error) {
      console.error(texts.errorWhatsappGeneration, error);
      toast({
        title: texts.errorConfirmationFailed,
        description: texts.errorWhatsappGenerationMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      if (
        typeof window !== "undefined" &&
        window.location.pathname === "/summary"
      ) {
        setIsConfirmingOrder(false);
      }
    }
  };

  return (
    <MainLayout>
      <section className="py-8 max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="font-page-title font-semibold text-2xl">
              {texts.orderSummary}
            </CardTitle>
            <CardDescription>{texts.reviewDetails}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-page-title font-semibold text-lg mb-2">
                {texts.shippingDetails}
              </h3>
              <CardOutline className="bg-yellow-100/50 dark:bg-yellow-900/20 p-4 rounded-md space-y-1 border border-yellow-300 dark:border-yellow-700/50">
                <p>
                  <strong>{texts.nameLabel}</strong> {user.name}
                </p>
                <p>
                  <strong>{texts.phoneLabel}</strong> {user.phone}
                </p>
                <p>
                  <strong>{texts.addressLabel}</strong> {user.address}
                </p>
                {user.complement && (
                  <p>
                    <strong>{texts.complementLabel}</strong> {user.complement}
                  </p>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="mt-2 border-yellow-600 text-yellow-700 hover:bg-yellow-500/10 hover:text-yellow-800 dark:border-yellow-500 dark:text-yellow-400 dark:hover:bg-yellow-600/20 dark:hover:text-yellow-300"
                >
                  <Link href="/checkout/user-details">
                    <Edit3 className="mr-2 h-4 w-4" /> {texts.editDetails}
                  </Link>
                </Button>
              </CardOutline>
            </div>

            <Separator />

            <div>
              <h3 className="font-page-title font-semibold text-lg mb-2">
                {texts.items}
              </h3>
              <ul className="space-y-2">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center p-2 border rounded-md bg-card"
                  >
                    <span>
                      {item.name} (x{item.quantity})
                    </span>
                    <span>R${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            <div className="flex justify-between font-bold text-xl">
              <span>{texts.totalValue}</span>
              <span>R${totalPrice.toFixed(2)}</span>
            </div>
            <Alert>
              <PackageCheck className="size-5" />
              <AlertTitle>{texts.readyToOrder}</AlertTitle>
              <AlertDescription>{texts.whatsappMessageInfo}</AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleConfirmOrder}
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground text-lg hover:bg-primary/90 border"
            >
              {isLoading ? (
                <Loader2 className="mr-2 size-5 animate-spin" />
              ) : (
                <PackageCheck className="mr-2 size-6" />
              )}
              {texts.confirmOrderAndProceed}
            </Button>
          </CardFooter>
        </Card>
      </section>
    </MainLayout>
  );
}
