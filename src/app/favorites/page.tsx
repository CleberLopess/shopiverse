"use client";

import React, { useState, useEffect } from "react";
import { useProducts } from "@/hooks/useProducts";
import { favorites } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Link from "next/link";
import { Product } from "@/types";
import FadeIn from "@/components/animations/FadeIn";
import ProductCard from "@/components/compositions/ProductCard";

export default function FavoritesPage() {
  const { products, isLoading } = useProducts();
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [_, setFavoriteIds] = useState<number[]>([]);

  useEffect(() => {
    // Get favorite product IDs from localStorage
    const ids = favorites.getAll();
    setFavoriteIds(ids);

    // Filter products to only include favorites
    if (products) {
      const favProducts = products.filter((product) =>
        ids.includes(product.id)
      );
      setFavoriteProducts(favProducts);
    }
  }, [products]);

  // Update favorites when a product is un-favorited
  const updateFavorites = () => {
    const ids = favorites.getAll();
    setFavoriteIds(ids);

    if (products) {
      const favProducts = products.filter((product) =>
        ids.includes(product.id)
      );
      setFavoriteProducts(favProducts);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-16">
        <section className="bg-gray-50 py-12">
          <div className="container-custom">
            <FadeIn direction="up">
              <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Meus Favoritos
              </h1>
              <p className="text-muted-foreground max-w-2xl">
                Aqui estão os produtos que você salvou como favoritos.
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="py-12">
          <div className="container-custom">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg overflow-hidden">
                    <div className="h-48 bg-gray-200 animate-pulse"></div>
                    <div className="p-4">
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse mt-2"></div>
                      <div className="h-4 w-full bg-gray-200 rounded animate-pulse mt-4"></div>
                      <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mt-2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : favoriteProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {favoriteProducts.map((product, index) => (
                  <FadeIn key={product.id} delay={index * 0.1}>
                    <ProductCard
                      product={product}
                      index={index}
                      onFavoriteToggle={() => updateFavorites()}
                    />
                  </FadeIn>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Heart
                  size={48}
                  className="mx-auto text-muted-foreground mb-4"
                />
                <h3 className="text-xl font-medium mb-2">
                  Você ainda não tem favoritos
                </h3>
                <p className="text-muted-foreground mb-6">
                  Adicione produtos aos favoritos clicando no ícone de coração
                  nos produtos que você gosta.
                </p>
                <Link href="/products">
                  <Button>Ver Produtos</Button>
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
