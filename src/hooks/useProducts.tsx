import { useQuery } from "@tanstack/react-query";
import {
  getProducts,
  getProductById,
  getProductsByCategory,
} from "../services/api";

export const useProducts = () => {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return {
    products,
    isLoading,
    error,
  };
};

export const useProductById = (id: number) => {
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });

  return {
    product,
    isLoading,
    error,
  };
};

export const useProductsByCategory = (categoryId: number) => {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", "category", categoryId],
    queryFn: () => getProductsByCategory(categoryId),
    enabled: !!categoryId,
  });

  return {
    products,
    isLoading,
    error,
  };
};
