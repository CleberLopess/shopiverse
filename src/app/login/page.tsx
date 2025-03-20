"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Lock, Mail } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  
  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Por favor, preencha o email e a senha');
      return;
    }
    
    try {
      await login(email, password);
    } catch (err) {
      setError('Falha no login. Verifique suas credenciais.');
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <FadeIn className="w-full max-w-md">
          <div className="bg-white rounded-lg border shadow-sm p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">Bem-vindo de Volta</h1>
              <p className="text-muted-foreground">
                Entre na sua conta para continuar
              </p>
            </div>
            
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-md mb-6 text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-10 pl-10 pr-3 py-2 bg-transparent border rounded-md"
                    placeholder="seu@email.com"
                    required
                  />
                  <Mail size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="password" className="text-sm font-medium">
                    Senha
                  </label>
                  <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                    Esqueceu a senha?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-10 pl-10 pr-3 py-2 bg-transparent border rounded-md"
                    placeholder="••••••••"
                    required
                  />
                  <Lock size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Entrando...
                  </div>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>
            
            <div className="text-center mt-8">
              <p className="text-sm text-muted-foreground">
                Não tem uma conta?{' '}
                <Link href="/register" className="text-primary font-medium hover:underline">
                  Cadastre-se
                </Link>
              </p>
            </div>
            
            <div className="mt-6 pt-6 border-t text-center">
              <p className="text-xs text-muted-foreground">
                Para fins de demonstração, você pode usar:
                <br />
                <code className="bg-gray-100 p-1 rounded text-xs mt-1 inline-block">
                  email: john@mail.com
                  <br />
                  senha: changeme
                </code>
              </p>
            </div>
          </div>
        </FadeIn>
      </main>
      
      <Footer />
    </div>
  );
}
