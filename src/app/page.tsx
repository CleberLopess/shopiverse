"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FeaturedProducts from "@/components/compositions/FeaturedProducts";
import CategoryList from "@/components/compositions/CategoryList";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ShoppingBag,
  Truck,
  Shield,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative h-[80vh] min-h-[500px] flex items-center">
          <div className="absolute inset-0 -z-10">
            <img
              src="https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Imagem de fundo"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
          </div>

          <div className="container-custom z-10">
            <div className="max-w-2xl">
              <FadeIn delay={100} direction="up">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-medium uppercase tracking-wider mb-4">
                  Nova Coleção
                </span>
              </FadeIn>

              <FadeIn delay={200} direction="up">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight text-white mb-6">
                  Eleve Seu Estilo com Nossos Produtos Mais Recentes
                </h1>
              </FadeIn>

              <FadeIn delay={300} direction="up">
                <p className="text-white/90 text-lg mb-8 max-w-xl">
                  Descubra nossa seleção de produtos premium projetados para o
                  estilo de vida moderno.
                </p>
              </FadeIn>

              <FadeIn delay={400} direction="up">
                <Button asChild size="lg" className="group">
                  <Link href="/products">
                    Comprar Agora
                    <ArrowRight
                      size={16}
                      className="ml-2 transform group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </Button>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <FadeIn direction="up">
              <div className="text-center mb-12">
                <span className="inline-block px-3 py-1 bg-blue-50 text-primary rounded-full text-xs font-medium uppercase tracking-wider mb-3">
                  Navegar
                </span>
                <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                  Compre por Categoria
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Encontre exatamente o que você está procurando navegando por
                  nossas categorias de produtos cuidadosamente organizadas.
                </p>
              </div>
            </FadeIn>

            <CategoryList />

            <div className="text-center mt-12">
              <Button asChild variant="outline" className="group">
                <Link href="/categories">
                  Ver Todas as Categorias
                  <ArrowRight
                    size={16}
                    className="ml-2 transform group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <FeaturedProducts />

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FadeIn delay={100} className="text-center p-6">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
                  <Truck size={20} className="text-primary" />
                </div>
                <h3 className="font-medium mb-2">Frete Grátis</h3>
                <p className="text-sm text-muted-foreground">
                  Frete grátis em todos os pedidos acima de R$250
                </p>
              </FadeIn>

              <FadeIn delay={200} className="text-center p-6">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
                  <RefreshCw size={20} className="text-primary" />
                </div>
                <h3 className="font-medium mb-2">Devolução Fácil</h3>
                <p className="text-sm text-muted-foreground">
                  Política de devolução de 30 dias para sua tranquilidade
                </p>
              </FadeIn>

              <FadeIn delay={300} className="text-center p-6">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
                  <Shield size={20} className="text-primary" />
                </div>
                <h3 className="font-medium mb-2">Pagamento Seguro</h3>
                <p className="text-sm text-muted-foreground">
                  Suas informações de pagamento sempre estão seguras
                </p>
              </FadeIn>

              <FadeIn delay={400} className="text-center p-6">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag size={20} className="text-primary" />
                </div>
                <h3 className="font-medium mb-2">Produtos de Qualidade</h3>
                <p className="text-sm text-muted-foreground">
                  Produtos premium selecionados para seu estilo de vida
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <FadeIn direction="up">
                <span className="inline-block px-3 py-1 bg-blue-50 text-primary rounded-full text-xs font-medium uppercase tracking-wider mb-3">
                  Fique Atualizado
                </span>
                <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                  Assine Nossa Newsletter
                </h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Cadastre-se para receber atualizações sobre novos produtos,
                  ofertas especiais e muito mais.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Seu endereço de email"
                    className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm"
                  />
                  <Button className="h-10">Assinar</Button>
                </div>

                <p className="text-xs text-muted-foreground mt-4">
                  Ao assinar, você concorda com nossa Política de Privacidade e
                  Termos de Serviço.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
