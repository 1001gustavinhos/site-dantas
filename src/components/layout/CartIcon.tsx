"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export function CartIcon() {
  const { getTotalItems } = useAppContext();
  const totalItems = getTotalItems();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Button
      asChild
      variant="outline"
      size="lg"
      className="relative border-none text-foreground bg-background hover:bg-primary hover:text-background"
    >
      <Link href="/cart" aria-label="Ver carrinho de compras">
        {isClient ? (
          <>
            <ShoppingCart className="h-7 w-7" /> {/* Increased icon size */}
            {totalItems > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs rounded-full bg-red-600 text-white"
                aria-label={`${totalItems} ${
                  totalItems === 1 ? "item no carrinho" : "itens no carrinho"
                }`}
              >
                {totalItems}
              </Badge>
            )}
          </>
        ) : (
          // Placeholder to maintain layout and prevent layout shift
          <div className="h-7 w-7" />
        )}
      </Link>
    </Button>
  );
}
