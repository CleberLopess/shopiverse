"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { useCategory } from "@/contexts/CategoryContext";
import ProductCard from "@/components/compositions/ProductCard";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, X } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

function ProductsContent() {
  const searchParams = useSearchParams();
  const { selectedCategory, setSelectedCategory } = useCategory();

  const { products, isLoading: productsLoading } = useProducts();
  const { categories, isLoading: categoriesLoading } = useCategories();

  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);

  // Update selectedCategory when URL changes
  useEffect(() => {
    const categoryFromUrl = searchParams?.get("category");
    setSelectedCategory(categoryFromUrl ? parseInt(categoryFromUrl, 10) : null);
  }, [searchParams, setSelectedCategory]);

  // Filter products based on selected filters
  const filteredProducts = products?.filter((product) => {
    // Filter by category
    if (selectedCategory && product.category.id !== selectedCategory) {
      return false;
    }

    // Filter by search query
    if (
      searchQuery &&
      !product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !product.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Filter by price range
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }

    return true;
  });

  const resetFilters = () => {
    setSelectedCategory(null);
    setSearchQuery("");
    setPriceRange([0, 1000]);
  };

  return (
    <main className="flex-grow pt-16">
      {/* Header */}
      <section className="bg-gray-50 py-12">
        <div className="container-custom">
          <FadeIn direction="up">
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Todos os Produtos
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Navegue por nossa coleção de produtos premium. Use os filtros
              para encontrar exatamente o que você está procurando.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Filters and Products */}
      <section className="py-12">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="w-full flex items-center justify-center gap-2"
              >
                <SlidersHorizontal size={16} />
                {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
              </Button>
            </div>

            {/* Filters Sidebar */}
            <aside
              className={`w-full lg:w-64 lg:block ${
                showFilters ? "block" : "hidden"
              }`}
            >
              <div className="sticky top-24 bg-white p-6 rounded-lg border space-y-8">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Filtros</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetFilters}
                      className="text-xs"
                    >
                      Limpar Tudo
                    </Button>
                  </div>

                  {/* Search */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium mb-2">Busca</h4>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Buscar produtos..."
                        className="w-full h-9 px-3 py-2 bg-transparent border rounded-md"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Search
                        size={16}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                      />
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium mb-2">Categorias</h4>
                    {categoriesLoading ? (
                      <div className="animate-pulse space-y-2">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className="h-6 bg-gray-200 rounded"
                          ></div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div
                          className={`text-sm py-1 px-2 rounded cursor-pointer hover:bg-gray-50 transition-colors ${
                            selectedCategory === null
                              ? "bg-primary/10 text-primary font-medium"
                              : ""
                          }`}
                          onClick={() => setSelectedCategory(null)}
                        >
                          Todas as Categorias
                        </div>
                        {categories?.map((category) => (
                          <div
                            key={category.id}
                            className={`text-sm py-1 px-2 rounded cursor-pointer hover:bg-gray-50 transition-colors ${
                              selectedCategory === category.id
                                ? "bg-primary/10 text-primary font-medium"
                                : ""
                            }`}
                            onClick={() => setSelectedCategory(category.id)}
                          >
                            {category.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Price Range */}
                  <div>
                    <h4 className="text-sm font-medium mb-2">
                      Faixa de Preço
                    </h4>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span>R${priceRange[0]}</span>
                        <span>R${priceRange[1]}</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={1000}
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([
                            priceRange[0],
                            parseInt(e.target.value),
                          ])
                        }
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-grow">
              {/* Active Filters */}
              {(selectedCategory !== null ||
                searchQuery ||
                priceRange[0] > 0 ||
                priceRange[1] < 1000) && (
                <div className="mb-6 flex flex-wrap gap-2">
                  {selectedCategory !== null &&
                    categories?.find((c) => c.id === selectedCategory) && (
                      <div className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                        Categoria:{" "}
                        {
                          categories.find((c) => c.id === selectedCategory)
                            ?.name
                        }
                        <button
                          onClick={() => setSelectedCategory(null)}
                          className="ml-2 text-gray-500 hover:text-gray-700"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    )}

                  {searchQuery && (
                    <div className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                      Busca: {searchQuery}
                      <button
                        onClick={() => setSearchQuery("")}
                        className="ml-2 text-gray-500 hover:text-gray-700"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}

                  {(priceRange[0] > 0 || priceRange[1] < 1000) && (
                    <div className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                      Preço: R${priceRange[0]} - R${priceRange[1]}
                      <button
                        onClick={() => setPriceRange([0, 1000])}
                        className="ml-2 text-gray-500 hover:text-gray-700"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {productsLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-lg overflow-hidden"
                    >
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
              ) : filteredProducts && filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product, index) => (
                    <FadeIn key={product.id} delay={index * 0.1}>
                      <ProductCard product={product} index={index} />
                    </FadeIn>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    Nenhum produto encontrado com os filtros selecionados.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Suspense fallback={<div>Carregando...</div>}>
        <ProductsContent />
      </Suspense>
      <Footer />
    </div>
  );
}
