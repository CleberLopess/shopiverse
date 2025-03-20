"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useProductById } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart, ArrowLeft, Heart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { formatPrice, favorites } from "@/lib/utils";
import FadeIn from "@/components/animations/FadeIn";
import { toast } from "sonner";

export default function ProductDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  const numericId = id ? parseInt(id, 10) : 0;
  const { product, isLoading, error } = useProductById(numericId);
  const { addItem } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (numericId) {
      setIsFavorite(favorites.isFavorite(numericId));
    }
  }, [numericId]);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      toast.success(`${product.title} adicionado ao carrinho!`);
    }
  };

  const handleToggleFavorite = () => {
    if (product) {
      const newStatus = favorites.toggle(product.id);
      setIsFavorite(newStatus);

      toast.success(
        `${product.title} ${
          newStatus ? "adicionado aos" : "removido dos"
        } favoritos!`
      );
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-8">
        <div className="h-6 w-32 bg-gray-200 rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-96 bg-gray-200 rounded"></div>
          <div className="space-y-4">
            <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
            <div className="h-6 w-1/4 bg-gray-200 rounded"></div>
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
            <div className="h-10 w-full bg-gray-200 rounded mt-8"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center">
        <h2 className="text-xl text-red-500 mb-4">
          Erro ao carregar o produto
        </h2>
        <Button asChild>
          <Link href="/products">
            <ArrowLeft size={16} className="mr-2" />
            Voltar para Produtos
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumbs */}
      <div className="mb-8">
        <nav className="flex items-center text-sm">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Início
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <Link
            href="/products"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Produtos
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <Link
            href={`/products?category=${product.category.id}`}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {product.category.name}
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <span className="text-foreground font-medium">{product.title}</span>
        </nav>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <FadeIn direction="left" className="space-y-4">
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            {product.images && product.images.length > 0 ? (
              <img
                src={product.images[activeImage]}
                alt={product.title}
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-muted-foreground">
                  Imagem não disponível
                </span>
              </div>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {product.images && product.images.length > 1 && (
            <div className="flex space-x-2 mt-4">
              {product.images.map((image, i) => (
                <button
                  key={i}
                  className={`relative w-16 h-16 rounded-md overflow-hidden border-2 ${
                    i === activeImage ? "border-primary" : "border-transparent"
                  }`}
                  onClick={() => setActiveImage(i)}
                >
                  <img
                    src={image}
                    alt={`${product.title} miniatura ${i + 1}`}
                    className="w-full h-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          )}
        </FadeIn>

        {/* Product Info */}
        <FadeIn direction="right" className="flex flex-col">
          <span className="text-sm text-muted-foreground mb-2">
            {product.category.name}
          </span>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <div className="text-2xl font-medium text-primary mb-6">
            {formatPrice(product.price)}
          </div>

          <div className="prose text-muted-foreground mb-8">
            <p>{product.description}</p>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center mb-6">
            <span className="mr-4 font-medium">Quantidade</span>
            <div className="flex items-center border rounded-md">
              <button
                onClick={decreaseQuantity}
                className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-primary transition-colors"
                aria-label="Diminuir quantidade"
              >
                <Minus size={16} />
              </button>
              <span className="w-12 text-center">{quantity}</span>
              <button
                onClick={increaseQuantity}
                className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-primary transition-colors"
                aria-label="Aumentar quantidade"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={handleAddToCart} className="flex-1 gap-2">
              <ShoppingCart size={16} />
              Adicionar ao Carrinho
            </Button>
            <Button
              variant="outline"
              className={`flex-1 gap-2 ${
                isFavorite ? "text-red-500 border-red-200 hover:bg-red-50" : ""
              }`}
              onClick={handleToggleFavorite}
            >
              <Heart size={16} className={isFavorite ? "fill-current" : ""} />
              {isFavorite
                ? "Remover dos Favoritos"
                : "Adicionar à Lista de Desejos"}
            </Button>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
