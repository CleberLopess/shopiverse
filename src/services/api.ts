
import { Product, Category, User } from "../types";

const API_URL = "https://api.escuelajs.co/api/v1";

// Helper function for API requests
const request = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  try {
    const url = `${API_URL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
};

// Products
export const getProducts = (): Promise<Product[]> => {
  return request<Product[]>("/products");
};

export const getProductById = (id: number): Promise<Product> => {
  return request<Product>(`/products/${id}`);
};

export const getProductsByCategory = (categoryId: number): Promise<Product[]> => {
  return request<Product[]>(`/categories/${categoryId}/products`);
};

// Categories
export const getCategories = (): Promise<Category[]> => {
  return request<Category[]>("/categories");
};

// Authentication
export const login = (email: string, password: string): Promise<{ access_token: string }> => {
  return request<{ access_token: string }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

export const register = (user: {
  name: string;
  email: string;
  password: string;
  avatar: string;
}): Promise<User> => {
  return request<User>("/users", {
    method: "POST",
    body: JSON.stringify(user),
  });
};

export const getUserProfile = (): Promise<User> => {
  const token = localStorage.getItem("token");
  return request<User>("/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
