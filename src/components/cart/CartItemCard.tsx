"use client";

import Image from "next/image";
import type { CartItem } from "@/lib/types";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MinusCircle, PlusCircle, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface CartItemCardProps {
  item: CartItem;
}

export function CartItemCard({ item }: CartItemCardProps) {
  const { updateItemQuantity, removeFromCart } = useAppContext();

  const handleQuantityChange = (newQuantity: number) => {
    updateItemQuantity(item.id, newQuantity);
  };

  return (
    <Card className="mb-4 overflow-hidden">
      <CardContent className="md:p-4 p-2 flex items-center gap-1.5 md:gap-4">
        <div className="relative w-20 h-20 aspect-square rounded-md overflow-hidden hidden md:block">
          <Image
            src={item.imageUrl}
            alt={item.name}
            layout="fill"
            objectFit="cover"
            data-ai-hint={item.dataAiHint || "product image"}
          />
        </div>
        <div className="flex-grow">
          <h3 className="md:text-lg text-sm font-page-title font-semibold">
            {item.name}
          </h3>
          <p className="md:text-sm text-xs text-muted-foreground">
            R${item.price.toFixed(2)}
          </p>
        </div>
        <div className="flex items-center md:gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            <MinusCircle className="h-5 w-5" />
          </Button>
          <Input
            type="number"
            value={item.quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10))}
            className="md:w-16 w-10 text-center h-9 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            min="1"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleQuantityChange(item.quantity + 1)}
          >
            <PlusCircle className="h-5 w-5" />
          </Button>
        </div>
        <p className="md:text-md text-sm font-semibold w-24 text-right">
          R${(item.price * item.quantity).toFixed(2)}
        </p>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeFromCart(item.id)}
          className="text-destructive hover:text-destructive/80"
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </CardContent>
    </Card>
  );
}
