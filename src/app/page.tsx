"use client";

import { useState, useMemo, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { ProductList } from "@/components/products/ProductList";
import { mockProducts } from "@/lib/products";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  CATEGORIES,
  getCategoryDisplayName,
} from "@/lib/constants/productConstants";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

async function getProducts(): Promise<Product[]> {
  return Promise.resolve(mockProducts);
}

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
    products.forEach((product) => {
      if (product.category) {
        categorySet.add(product.category);
      }
    });
    return Array.from(categorySet);
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

  if (isLoading) {
    return (
      <MainLayout>
        <LoadingSpinner text="Carregando produtos..." />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="py-8">
        <div className="mb-8 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          <div className="flex flex-nowrap justify-start gap-2 py-1 sm:justify-center sm:gap-4 ">
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
          uniqueCategories.map((categoryName) => (
            <div key={categoryName} className="mb-12">
              <h2 className="text-2xl font-page-title font-semibold mb-6 text-primary border-b-2 border-primary pb-2">
                {getCategoryDisplayName(categoryName)}
              </h2>
              <ProductList
                products={products.filter((p) => p.category === categoryName)}
              />
            </div>
          ))
        ) : (
          <div>
            {selectedCategory === CATEGORIES.EMPANADAS.id && (
              <>
                <h2 className="text-2xl font-page-title font-semibold mb-6 text-primary border-b-2 border-primary pb-2">
                  {CATEGORIES.EMPANADAS.displayName}
                </h2>
                <ProductList products={filteredProducts} />
              </>
            )}
            {selectedCategory === CATEGORIES.CASTANHAS.id && (
              <>
                <h2 className="text-2xl font-page-title font-semibold mb-6 text-primary border-b-2 border-primary pb-2">
                  {CATEGORIES.CASTANHAS.displayName}
                </h2>
                <ProductList products={filteredProducts} />
              </>
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
    </MainLayout>
  );
}
