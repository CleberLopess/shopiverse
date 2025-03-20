"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import { CartState, Product, CartItem } from "../types";
import { toast } from "sonner";

// Actions
type CartAction =
  | { type: "ADD_ITEM"; payload: { product: Product; quantity: number } }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartState };

// Context Type
interface CartContextType extends CartState {
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

// Initial State
const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

// Reducer
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        // Update quantity if item exists
        const updatedItems = state.items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );

        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems + quantity,
          totalPrice: state.totalPrice + product.price * quantity,
        };
      } else {
        // Add new item
        const newItem: CartItem = {
          id: product.id,
          product,
          quantity,
        };

        return {
          ...state,
          items: [...state.items, newItem],
          totalItems: state.totalItems + quantity,
          totalPrice: state.totalPrice + product.price * quantity,
        };
      }
    }
    case "REMOVE_ITEM": {
      const itemToRemove = state.items.find(
        (item) => item.id === action.payload
      );

      if (!itemToRemove) return state;

      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
        totalItems: state.totalItems - itemToRemove.quantity,
        totalPrice:
          state.totalPrice - itemToRemove.product.price * itemToRemove.quantity,
      };
    }
    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload;
      const itemToUpdate = state.items.find((item) => item.id === id);

      if (!itemToUpdate) return state;

      const quantityDifference = quantity - itemToUpdate.quantity;

      const updatedItems = state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );

      return {
        ...state,
        items: updatedItems,
        totalItems: state.totalItems + quantityDifference,
        totalPrice:
          state.totalPrice + itemToUpdate.product.price * quantityDifference,
      };
    }
    case "CLEAR_CART":
      return initialState;
    case "LOAD_CART":
      return action.payload;
    default:
      return state;
  }
};

// Create Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider Component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: "LOAD_CART", payload: parsedCart });
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  // Context value
  const value: CartContextType = {
    ...state,
    addItem: (product, quantity = 1) => {
      dispatch({ type: "ADD_ITEM", payload: { product, quantity } });
      toast.success(`${product.title} added to cart`);
    },
    removeItem: (id) => {
      dispatch({ type: "REMOVE_ITEM", payload: id });
      toast.success("Item removed from cart");
    },
    updateQuantity: (id, quantity) => {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
    },
    clearCart: () => {
      dispatch({ type: "CLEAR_CART" });
      toast.success("Cart cleared");
    },
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
