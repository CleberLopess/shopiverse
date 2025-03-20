"use client";

import React from "react";
import { redirect } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { User, Package, Heart, LogOut } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export default function UserDashboardPage() {
  const { user, isAuthenticated, logout, loading } = useAuth();

  // If not authenticated, redirect to login
  if (!loading && !isAuthenticated) {
    redirect("/login");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container-custom py-20 flex-grow">
          <div className="animate-pulse space-y-8">
            <div className="h-8 w-48 bg-gray-200 rounded mx-auto"></div>
            <div className="max-w-3xl mx-auto bg-gray-100 rounded-lg h-64"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-16">
        <div className="container-custom py-12">
          <FadeIn direction="up">
            <h1 className="text-3xl font-bold mb-8">Minha Conta</h1>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <FadeIn direction="left" className="lg:col-span-1">
              <div className="bg-white rounded-lg border overflow-hidden">
                <div className="p-6 text-center border-b">
                  <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 border">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-secondary flex items-center justify-center">
                        <User size={32} className="text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <h2 className="font-medium">{user?.name}</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {user?.email}
                  </p>
                </div>

                <nav className="p-4">
                  <ul className="space-y-1">
                    <li>
                      <a
                        href="#profile"
                        className="flex items-center gap-3 px-4 py-2 rounded-md bg-primary/10 text-primary font-medium"
                      >
                        <User size={18} />
                        Perfil
                      </a>
                    </li>
                    <li>
                      <a
                        href="#orders"
                        className="flex items-center gap-3 px-4 py-2 rounded-md text-muted-foreground hover:bg-gray-50"
                      >
                        <Package size={18} />
                        Pedidos
                      </a>
                    </li>
                    <li>
                      <Link
                        href="/favorites"
                        className="flex items-center gap-3 px-4 py-2 rounded-md text-muted-foreground hover:bg-gray-50"
                      >
                        <Heart size={18} />
                        Favoritos
                      </Link>
                    </li>

                    <li>
                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-2 rounded-md text-red-500 hover:bg-red-50"
                      >
                        <LogOut size={18} />
                        Sair
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </FadeIn>

            {/* Main Content */}
            <FadeIn direction="right" className="lg:col-span-3">
              <div className="bg-white rounded-lg border p-6">
                <h2 className="text-xl font-medium mb-6" id="profile">
                  Informações do Perfil
                </h2>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="fullName" className="text-sm font-medium">
                        Nome Completo
                      </label>
                      <Input
                        id="fullName"
                        type="text"
                        className="w-full px-3 py-2 border rounded-md"
                        defaultValue={user?.name}
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        className="w-full px-3 py-2 border rounded-md"
                        defaultValue={user?.email}
                        disabled
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">
                        Telefone
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="(11) 99999-9999"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="role" className="text-sm font-medium">
                        Função
                      </label>
                      <Input
                        id="role"
                        type="text"
                        className="w-full px-3 py-2 border rounded-md"
                        defaultValue={user?.role}
                        disabled
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4 pt-4 border-t">
                      Informações de Endereço
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label
                          htmlFor="address"
                          className="text-sm font-medium"
                        >
                          Endereço
                        </label>
                        <Input
                          id="address"
                          type="text"
                          className="w-full px-3 py-2 border rounded-md"
                          placeholder="Rua Exemplo, 123"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="city" className="text-sm font-medium">
                          Cidade
                        </label>
                        <Input
                          id="city"
                          type="text"
                          className="w-full px-3 py-2 border rounded-md"
                          placeholder="São Paulo"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="state" className="text-sm font-medium">
                          Estado
                        </label>
                        <Input
                          id="state"
                          type="text"
                          className="w-full px-3 py-2 border rounded-md"
                          placeholder="SP"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="zip" className="text-sm font-medium">
                          CEP
                        </label>
                        <Input
                          id="zip"
                          type="text"
                          className="w-full px-3 py-2 border rounded-md"
                          placeholder="00000-000"
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <label
                          htmlFor="country"
                          className="text-sm font-medium"
                        >
                          País
                        </label>
                        <select
                          id="country"
                          className="w-full px-3 py-2 border rounded-md bg-white cursor-pointer"
                          defaultValue="BR"
                        >
                          <option value="BR">Brasil</option>
                          <option value="US">Estados Unidos</option>
                          <option value="CA">Canadá</option>
                          <option value="PT">Portugal</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button type="button">Salvar Alterações</Button>
                  </div>
                </form>
              </div>

              {/* Orders Section */}
              <div className="bg-white rounded-lg border p-6 mt-8" id="orders">
                <h2 className="text-xl font-medium mb-6">Pedidos Recentes</h2>

                <div className="bg-gray-50 rounded-md p-12 text-center">
                  <Package
                    size={48}
                    className="mx-auto mb-4 text-muted-foreground"
                  />
                  <h3 className="text-lg font-medium mb-2">
                    Nenhum pedido ainda
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Quando você fizer pedidos, eles aparecerão aqui para você
                    acompanhar.
                  </p>
                  <Button asChild>
                    <Link href="/products">Começar a Comprar</Link>
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
