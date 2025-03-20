
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../services/api";

export const useCategories = () => {
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return {
    categories,
    isLoading,
    error,
  };
};
