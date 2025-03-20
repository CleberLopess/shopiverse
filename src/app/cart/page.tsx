"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowRight, Trash } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import FadeIn from "@/components/animations/FadeIn";
import CartItem from "@/components/compositions/CartItem";

export default function CartPage() {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);

    // Simulate checkout process
    setTimeout(() => {
      alert(
        "Este é um site de e-commerce de demonstração. A funcionalidade de checkout não está implementada."
      );
      setIsCheckingOut(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-16">
        <div className="container-custom py-12">
          <FadeIn direction="up">
            <h1 className="text-3xl font-bold mb-8">Carrinho de Compras</h1>
          </FadeIn>

          {items.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <FadeIn
                  direction="up"
                  className="bg-white rounded-lg border p-6"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-medium">
                      Itens no Carrinho ({totalItems})
                    </h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={clearCart}
                    >
                      <Trash size={16} className="mr-2" />
                      Limpar Carrinho
                    </Button>
                  </div>

                  <div className="divide-y">
                    {items.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </div>
                </FadeIn>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <FadeIn
                  direction="up"
                  delay={100}
                  className="bg-white rounded-lg border p-6 sticky top-24"
                >
                  <h2 className="text-lg font-medium mb-6">Resumo do Pedido</h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Frete</span>
                      <span>Grátis</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Impostos</span>
                      <span>{formatPrice(totalPrice * 0.1)}</span>
                    </div>
                    <div className="h-px bg-gray-200 my-4"></div>
                    <div className="flex justify-between font-medium text-lg">
                      <span>Total</span>
                      <span>{formatPrice(totalPrice * 1.1)}</span>
                    </div>
                  </div>

                  <Button
                    className="w-full gap-2"
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                  >
                    {isCheckingOut ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Processando...
                      </div>
                    ) : (
                      <>
                        Finalizar Compra
                        <ArrowRight size={16} />
                      </>
                    )}
                  </Button>

                  <div className="mt-6">
                    <Link
                      href="/products"
                      className="text-sm text-primary hover:underline flex items-center justify-center"
                    >
                      <ArrowRight size={16} className="mr-2 rotate-180" />
                      Continuar Comprando
                    </Link>
                  </div>
                </FadeIn>
              </div>
            </div>
          ) : (
            <FadeIn direction="up" className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 flex items-center justify-center rounded-full mx-auto mb-4">
                <ShoppingCart size={24} className="text-muted-foreground" />
              </div>
              <h2 className="text-xl font-medium mb-2">
                Seu carrinho está vazio
              </h2>
              <p className="text-muted-foreground mb-8">
                Parece que você ainda não adicionou nenhum produto ao seu
                carrinho.
              </p>
              <Link href="/products">
                <Button>Começar a Comprar</Button>
              </Link>
            </FadeIn>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
