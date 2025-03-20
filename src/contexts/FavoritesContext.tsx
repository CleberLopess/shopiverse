"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import { Product } from "../types";
import { toast } from "sonner";

// Types
interface FavoritesState {
  items: Product[];
}

type FavoritesAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "LOAD_FAVORITES"; payload: FavoritesState };

interface FavoritesContextType extends FavoritesState {
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

// Initial State
const initialState: FavoritesState = {
  items: [],
};

// Reducer
const favoritesReducer = (state: FavoritesState, action: FavoritesAction): FavoritesState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) return state;

      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }
    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    }
    case "LOAD_FAVORITES":
      return action.payload;
    default:
      return state;
  }
};

// Create Context
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// Provider Component
export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  // Load favorites from localStorage on initial render
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      try {
        const parsedFavorites = JSON.parse(savedFavorites);
        dispatch({ type: "LOAD_FAVORITES", payload: parsedFavorites });
      } catch (error) {
        console.error("Failed to parse favorites from localStorage:", error);
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(state));
  }, [state]);

  // Context value
  const value: FavoritesContextType = {
    ...state,
    addToFavorites: (product) => {
      dispatch({ type: "ADD_ITEM", payload: product });
      toast.success(`${product.title} adicionado aos favoritos`);
    },
    removeFromFavorites: (id) => {
      dispatch({ type: "REMOVE_ITEM", payload: id });
      toast.success("Produto removido dos favoritos");
    },
    isFavorite: (id) => state.items.some((item) => item.id === id),
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

// Custom hook
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}; 