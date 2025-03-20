"use client";

import React from "react";
import Link from "next/link";
import { Trash, Plus, Minus } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { CartItem as CartItemType } from "@/types";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      removeItem(product.id);
    }
  };

  const handleQuantityIncrease = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleRemove = () => {
    removeItem(product.id);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center py-6 border-b">
      {/* Product Image */}
      <div className="w-full sm:w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 mb-4 sm:mb-0">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-muted-foreground text-xs">No image</span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="sm:ml-4 flex-grow">
        <Link href={`/products/${product.id}`} className="block">
          <h3 className="font-medium hover:text-primary transition-colors">
            {product.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mt-1">
          {product.category?.name || "Category not available"}
        </p>
      </div>

      {/* Price */}
      <div className="text-right sm:w-24 flex-shrink-0 mt-2 sm:mt-0">
        <span className="font-medium">{formatPrice(product.price)}</span>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center mt-4 sm:mt-0 sm:ml-6">
        <div className="flex items-center border rounded-md">
          <button
            onClick={handleQuantityDecrease}
            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-primary transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus size={16} />
          </button>
          <span className="w-10 text-center">{quantity}</span>
          <button
            onClick={handleQuantityIncrease}
            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-primary transition-colors"
            aria-label="Increase quantity"
          >
            <Plus size={16} />
          </button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="ml-2 text-muted-foreground hover:text-destructive"
          onClick={handleRemove}
          aria-label="Remove item"
        >
          <Trash size={16} />
        </Button>
      </div>

      {/* Subtotal (Mobile) */}
      <div className="w-full mt-4 pt-4 border-t sm:hidden">
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Subtotal:</span>
          <span className="font-medium">
            {formatPrice(product.price * quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}
