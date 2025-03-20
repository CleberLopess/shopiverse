"use client";

import React from "react";
import Link from "next/link";
import { useProducts } from "@/hooks/useProducts";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import FadeIn from "@/components/animations/FadeIn";
import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
  const { products, isLoading, error } = useProducts();

  if (isLoading) {
    return (
      <div className="container-custom py-12">
        <div className="text-center">
          <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mx-auto"></div>
          <div className="h-4 w-64 bg-gray-200 rounded animate-pulse mx-auto mt-4"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
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
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-custom py-12 text-center">
        <h2 className="text-lg text-red-500">Falha ao carregar produtos</h2>
      </div>
    );
  }

  const featuredProducts = products?.slice(0, 8) || [];

  return (
    <section className="py-12 md:py-20">
      <div className="container-custom">
        <FadeIn direction="up">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-blue-50 text-primary rounded-full text-xs font-medium uppercase tracking-wider mb-3">
              Coleção em Destaque
            </span>
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
              Nossos Melhores Produtos
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Descubra nossa seleção de produtos premium, cuidadosamente
              escolhidos para você. Qualidade e estilo em nossa coleção em
              destaque.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/products">
            <Button variant="outline" className="group">
              Ver Todos os Produtos
              <ArrowRight
                size={16}
                className="ml-2 transform group-hover:translate-x-1 transition-transform"
              />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
