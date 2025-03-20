"use client";

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <div className="container-custom py-12">
          <FadeIn direction="up" className="text-center">
            <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
            <h2 className="text-2xl font-medium mb-4">Página não encontrada</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Desculpe, a página que você está procurando não existe ou foi movida.
            </p>
            <Link href="/">
              <Button>
                <Home size={16} className="mr-2" />
                Voltar para a Home
              </Button>
            </Link>
          </FadeIn>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
