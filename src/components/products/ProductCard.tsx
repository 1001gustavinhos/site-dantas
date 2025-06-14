"use client";

import Image from "next/image";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppContext } from "@/context/AppContext";
// import { toast } from "@/hooks/use-toast"; // Toasts removed
import { ShoppingCart, MinusCircle, PlusCircle, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { productCardTexts as texts } from "@/lib/constants/productCardTexts";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { cart, addToCart, updateItemQuantity, removeFromCart } =
    useAppContext();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log(
        `ProductCard: Loading image for "${product.name}" from URL: "${product.imageUrl}"`
      );
    }
  }, [product.name, product.imageUrl]);

  const cartItem = cart.find((item) => item.id === product.id);

  const handleAddToCart = () => {
    addToCart(product);
    // toast({ // Removed toast
    //   title: texts.addedToCart,
    //   description: texts.productAdded(product.name),
    // });
  };

  const handleIncrement = () => {
    if (cartItem) {
      updateItemQuantity(product.id, cartItem.quantity + 1);
      // toast({ // Removed toast
      //   title: texts.quantityUpdated,
      //   description: texts.quantityIncreased(product.name),
      // });
    }
  };

  const handleDecrement = () => {
    if (cartItem) {
      const newQuantity = cartItem.quantity - 1;
      updateItemQuantity(product.id, newQuantity);

      // if (newQuantity === 0) { // Removed toast
      //   toast({
      //     title: texts.itemRemoved,
      //     description: texts.productRemoved(product.name),
      //   });
      // } else {
      //   toast({
      //     title: texts.quantityUpdated,
      //     description: texts.quantityDecreased(product.name),
      //   });
      // }
    }
  };

  const handleRemoveCompletely = () => {
    if (cartItem) {
      removeFromCart(product.id);
      // toast({ // Removed toast
      //   title: texts.itemRemoved,
      //   description: texts.productRemoved(product.name),
      // });
    }
  };

  return (
    <Card className="overflow-hidden mx-3 md:mx-0 transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 flex flex-col h-full">
      <CardHeader className="p-0">
        <div className="md:aspect-[4/3] aspect-[3/2]  relative w-full bg-muted/30">
          {isClient ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              data-ai-hint={product.dataAiHint || "imagem do produto"}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
              {texts.imagePlaceholder}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col">
        <CardTitle className="text-lg font-semibold">{product.name}</CardTitle>
        <p className="text-xl font-normal text-primary mt-auto">
          R${product.price.toFixed(2)}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {isClient ? (
          cartItem ? (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-1">
                <Button
                  size="icon"
                  onClick={handleDecrement}
                  aria-label={texts.decreaseQuantity}
                  className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full"
                >
                  <MinusCircle className="h-5 w-5" />
                </Button>
                <span
                  className="text-lg font-medium w-8 text-center"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {cartItem.quantity}
                </span>
                <Button
                  size="icon"
                  onClick={handleIncrement}
                  aria-label={texts.increaseQuantity}
                  className="bg-accent text-accent-foreground hover:bg-accent/90  rounded-full"
                >
                  <PlusCircle className="h-5 w-5" />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRemoveCompletely}
                className="text-destructive hover:text-destructive/80"
                aria-label={texts.removeFromCart}
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <Button
              onClick={handleAddToCart}
              className="w-full bg-accent lg:text-base text-accent-foreground hover:bg-accent/90  rounded-lg"
            >
              <ShoppingCart className="mr-2 h-5 w-5" /> {texts.addToCart}
            </Button>
          )
        ) : (
          <Button
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg"
            disabled
          >
            <div className="h-4 w-4 mr-2 animate-pulse bg-black/20 rounded-sm" />{" "}
            {texts.addToCart}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
