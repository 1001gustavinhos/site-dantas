"use client";

import { useState, useMemo, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { ProductList } from "@/components/products/ProductList";
import { mockProducts } from "@/lib/products";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { HeroBanner } from "@/components/home/HeroBanner";
import {
  CATEGORIES,
  getCategoryDisplayName,
} from "@/lib/constants/productConstants";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
async function getProducts(): Promise<Product[]> {
  return Promise.resolve(mockProducts);
}
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    CATEGORIES.ALL.id
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load products:", error);
        setIsLoading(false);
      });
  }, []);

  const uniqueCategories = useMemo(() => {
    const categorySet = new Set<string>();
    // Maintain order: Empanadas first, then Castanhas, then others
    const orderedInternalNames = [
      CATEGORIES.EMPANADAS.internalName,
      CATEGORIES.CASTANHAS.internalName,
    ];

    products.forEach((product) => {
      if (product.category) {
        categorySet.add(product.category);
      }
    });

    const allProductCategories = Array.from(categorySet);

    return orderedInternalNames
      .filter((name) => allProductCategories.includes(name))
      .concat(
        allProductCategories.filter(
          (name) => !orderedInternalNames.includes(name)
        )
      );
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === CATEGORIES.ALL.id) {
      return products;
    }
    if (selectedCategory === CATEGORIES.EMPANADAS.id) {
      return products.filter(
        (p) => p.category === CATEGORIES.EMPANADAS.internalName
      );
    }
    if (selectedCategory === CATEGORIES.CASTANHAS.id) {
      return products.filter(
        (p) => p.category === CATEGORIES.CASTANHAS.internalName
      );
    }
    return products;
  }, [products, selectedCategory]);

  const handleScrollToCategory = (categoryId: string) => {
    // Always reset to 'All' category filter first
    setSelectedCategory(CATEGORIES.ALL.id);

    // Use setTimeout to allow the DOM to update after resetting the category
    setTimeout(() => {
      const element = document.getElementById(categoryId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        // Fallback or error handling if element not found after timeout
        // This might happen if categoryId is for a section that doesn't exist
        // or if the DOM update is slower than expected.
        console.warn(
          `Element with id '${categoryId}' not found for scrolling.`
        );
        // As a fallback, try scrolling to the top 'All products' section
        const allProductsElement = document.getElementById(CATEGORIES.ALL.id);
        allProductsElement?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 50); // 50ms delay, adjust if needed
  };

  const getCategoryIdFromInternalName = (
    internalName: string
  ): string | undefined => {
    if (internalName === CATEGORIES.EMPANADAS.internalName)
      return CATEGORIES.EMPANADAS.id;
    if (internalName === CATEGORIES.CASTANHAS.internalName)
      return CATEGORIES.CASTANHAS.id;
    return undefined;
  };

  if (isLoading) {
    return (
      <MainLayout>
        <LoadingSpinner text="Carregando produtos..." />
      </MainLayout>
    );
  }

  return (
    <>
      <MainLayout>
        <HeroBanner onScrollToCategory={handleScrollToCategory} />
        <section className="py-8" id={CATEGORIES.ALL.id}>
          {" "}
          {/* ID for "All Products" section for scrolling */}
          <div className="mb-8 overflow-x-auto">
            <div className="flex flex-nowrap justify-start gap-2 py-1 sm:gap-4">
              <Button
                size="sm"
                variant={
                  selectedCategory === CATEGORIES.ALL.id ? "default" : "outline"
                }
                onClick={() => setSelectedCategory(CATEGORIES.ALL.id)}
              >
                {CATEGORIES.ALL.displayName}
              </Button>
              <Button
                size="sm"
                variant={
                  selectedCategory === CATEGORIES.EMPANADAS.id
                    ? "default"
                    : "outline"
                }
                onClick={() => setSelectedCategory(CATEGORIES.EMPANADAS.id)}
              >
                {CATEGORIES.EMPANADAS.displayName}
              </Button>
              <Button
                size="sm"
                variant={
                  selectedCategory === CATEGORIES.CASTANHAS.id
                    ? "default"
                    : "outline"
                }
                onClick={() => setSelectedCategory(CATEGORIES.CASTANHAS.id)}
              >
                {CATEGORIES.CASTANHAS.displayName}
              </Button>
            </div>
          </div>
          {selectedCategory === CATEGORIES.ALL.id ? (
            uniqueCategories.map((categoryInternalName) => {
              const categoryId =
                getCategoryIdFromInternalName(categoryInternalName);
              if (!categoryId) return null; // Should not happen with current setup
              return (
                <div
                  key={categoryInternalName}
                  id={categoryId}
                  className="mb-12 scroll-mt-28"
                >
                  <h2 className="text-2xl font-page-title font-semibold mb-6 text-primary border-b-2 border-primary pb-2">
                    {getCategoryDisplayName(categoryInternalName)}
                  </h2>
                  <ProductList
                    products={products.filter(
                      (p) => p.category === categoryInternalName
                    )}
                  />
                </div>
              );
            })
          ) : (
            <div>
              {selectedCategory === CATEGORIES.EMPANADAS.id && (
                <div id={CATEGORIES.EMPANADAS.id} className="scroll-mt-28">
                  <h2 className="text-2xl font-page-title font-semibold mb-6 text-primary border-b-2 border-primary pb-2">
                    {CATEGORIES.EMPANADAS.displayName}
                  </h2>
                  <ProductList products={filteredProducts} />
                </div>
              )}
              {selectedCategory === CATEGORIES.CASTANHAS.id && (
                <div id={CATEGORIES.CASTANHAS.id} className="scroll-mt-28">
                  <h2 className="text-2xl font-page-title font-semibold mb-6 text-primary border-b-2 border-primary pb-2">
                    {CATEGORIES.CASTANHAS.displayName}
                  </h2>
                  <ProductList products={filteredProducts} />
                </div>
              )}
            </div>
          )}
          {filteredProducts.length === 0 &&
            selectedCategory !== CATEGORIES.ALL.id && (
              <p className="text-center text-muted-foreground mt-8">
                Nenhum produto encontrado para esta categoria.
              </p>
            )}
        </section>
        <Button
          asChild
          variant="outline"
          size="xl"
          className="bg-primary flex justify-center font-sans mx-auto max-w-sm text-white text-lg hover:bg-primary/60"
        >
          <Link href="/cart">
            <ShoppingCart className="mr-4 size-6" />
            Ir para o Carrinho
          </Link>
        </Button>
      </MainLayout>
    </>
  );
}
