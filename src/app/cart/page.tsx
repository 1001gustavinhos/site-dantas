
"use client";

import Link from 'next/link';
import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { CartItemCard } from '@/components/cart/CartItemCard';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cartPageTexts as texts } from '@/lib/constants/cartPageTexts';

export default function CartPage() {
  const { cart, getTotalPrice, getTotalItems, clearCart } = useAppContext();
  const [showClearCartDialog, setShowClearCartDialog] = useState(false);
  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  const handleClearCart = () => {
    clearCart();
    setShowClearCartDialog(false);
  };

  if (totalItems === 0) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-page-title font-semibold mb-4">{texts.emptyCartTitle}</h1>
          <p className="text-muted-foreground mb-6">{texts.emptyCartMessage}</p>
          <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 border-yellow-700">
            <Link href="/">{texts.continueShopping}</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="py-8">
        <h1 className="text-3xl font-page-title font-semibold mb-8 text-primary">{texts.yourCart}</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {cart.map((item) => (
              <CartItemCard key={item.id} item={item} />
            ))}
          </div>
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="font-page-title font-semibold">{texts.orderSummary}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>{texts.subtotal(totalItems)}</span>
                  <span>R${totalPrice.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>{texts.total}</span>
                  <span>R${totalPrice.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 border-yellow-700"
                >
                  <Link href="/checkout">{texts.goToCheckout}</Link>
                </Button>
              </CardFooter>
            </Card>

            <div className="mt-6">
              <AlertDialog open={showClearCartDialog} onOpenChange={setShowClearCartDialog}>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="w-full text-destructive border-destructive hover:bg-destructive/10">
                    <Trash2 className="mr-2 h-4 w-4" />
                    {texts.clearCartButton}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{texts.clearCartDialogTitle}</AlertDialogTitle>
                    <AlertDialogDescription>
                      {texts.clearCartDialogDescription}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>{texts.cancel}</AlertDialogCancel>
                    <AlertDialogAction onClick={handleClearCart} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                      {texts.confirmClear}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

          </div>
        </div>
      </section>
    </MainLayout>
  );
}
