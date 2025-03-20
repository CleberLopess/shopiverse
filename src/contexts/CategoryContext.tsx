"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface CategoryContextType {
  selectedCategory: number | null;
  setSelectedCategory: (categoryId: number | null) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined
);

export function CategoryProvider({ children }: { children: ReactNode }) {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  return (
    <CategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error("useCategory deve ser usado dentro de um CategoryProvider");
  }
  return context;
}
