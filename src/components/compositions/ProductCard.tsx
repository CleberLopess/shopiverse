"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { formatPrice, truncateText, favorites } from "@/lib/utils";
import { Product } from "@/types";
import { Heart, HeartOff } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import FadeIn from "@/components/animations/FadeIn";

interface ProductCardProps {
  product: Product;
  index: number;
  onFavoriteToggle?: () => void;
}

export default function ProductCard({
  product,
  index,
  onFavoriteToggle,
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    setIsFavorite(favorites.isFavorite(product.id));
  }, [product.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    const newFavoriteState = favorites.toggle(product.id);
    setIsFavorite(newFavoriteState);

    if (newFavoriteState) {
      toast.success(`${product.title} adicionado aos favoritos!`);
    } else {
      toast.warning(`${product.title} removido dos favoritos.`);
    }

    onFavoriteToggle?.(); // Notify parent component about the change
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    toast.success(`${product.title} adicionado ao carrinho!`);
  };

  return (
    <FadeIn key={product.id} delay={index * 50}>
      <Link
        href={`/products/${product.id}`}
        className="group relative block overflow-hidden rounded-lg"
      >
        {/* Product Image */}
        <div className="relative h-64 md:h-72 overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Product Details */}
        <div className="p-4 bg-white">
          {/* Category */}
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            {product.category.name}
          </p>

          {/* Title and Price */}
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">
              {truncateText(product.title, 30)}
            </h3>
            <span className="font-bold text-primary">
              {formatPrice(product.price)}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground mt-2">
            {truncateText(product.description, 60)}
          </p>
        </div>

        {/* Actions: Add to Cart and Favorite */}
        <div className="absolute top-2 right-2 flex gap-2 z-10">
          <button
            onClick={toggleFavorite}
            className={`p-2 rounded-full transition-colors ${
              isFavorite ? "bg-red-500 text-white" : "bg-white/80 text-black"
            }`}
            aria-label={
              isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"
            }
          >
            {isFavorite ? <Heart size={16} /> : <HeartOff size={16} />}
          </button>
        </div>
        <button
          onClick={handleAddToCart}
          className="absolute left-0 bottom-0 right-0 p-3 bg-primary text-white text-sm font-medium rounded-b-lg transition-transform duration-300 translate-y-full group-hover:translate-y-0"
        >
          Adicionar ao Carrinho
        </button>
      </Link>
    </FadeIn>
  );
}
