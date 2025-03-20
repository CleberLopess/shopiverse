import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(price);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

// Favoritos com localStorage
export const favorites = {
  getAll: (): number[] => {
    try {
      const favorites = localStorage.getItem("favorites");
      if (!favorites) return [];

      const favoritesArray = JSON.parse(favorites);
      return Array.isArray(favoritesArray) ? favoritesArray : [];
    } catch (error) {
      console.error("Erro ao obter favoritos:", error);
      return [];
    }
  },

  add: (productId: number): void => {
    try {
      const favorites = localStorage.getItem("favorites");
      const favoritesArray = favorites ? JSON.parse(favorites) : [];

      if (!Array.isArray(favoritesArray)) {
        localStorage.setItem("favorites", JSON.stringify([productId]));
        return;
      }

      if (!favoritesArray.includes(productId)) {
        favoritesArray.push(productId);
        localStorage.setItem("favorites", JSON.stringify(favoritesArray));
      }
    } catch (error) {
      console.error("Erro ao adicionar favorito:", error);
      localStorage.setItem("favorites", JSON.stringify([productId]));
    }
  },

  remove: (productId: number): void => {
    try {
      const favorites = localStorage.getItem("favorites");
      if (!favorites) return;

      const favoritesArray = JSON.parse(favorites);
      if (!Array.isArray(favoritesArray)) {
        localStorage.setItem("favorites", JSON.stringify([]));
        return;
      }

      const updatedFavorites = favoritesArray.filter(
        (id: number) => id !== productId
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error("Erro ao remover favorito:", error);
      localStorage.setItem("favorites", JSON.stringify([]));
    }
  },

  isFavorite: (productId: number): boolean => {
    try {
      const favorites = localStorage.getItem("favorites");
      if (!favorites) return false;

      const favoritesArray = JSON.parse(favorites);
      // Garante que favoritesArray seja um array
      if (!Array.isArray(favoritesArray)) return false;

      return favoritesArray.includes(productId);
    } catch (error) {
      console.error("Erro ao verificar favoritos:", error);
      return false;
    }
  },

  toggle: (productId: number): boolean => {
    const isFavorite = favorites.isFavorite(productId);

    if (isFavorite) {
      favorites.remove(productId);
      return false;
    } else {
      favorites.add(productId);
      return true;
    }
  },
};
