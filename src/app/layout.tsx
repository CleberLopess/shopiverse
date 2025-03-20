import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { CategoryProvider } from "@/contexts/CategoryContext";
import QueryProvider from "@/providers/QueryProvider";
import type { Metadata } from "next";
import "@/styles/global.css";

export const metadata: Metadata = {
  title: "Shopiverse",
  description: "E-commerce",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <QueryProvider>
          <AuthProvider>
            <CartProvider>
              <FavoritesProvider>
                <CategoryProvider>
                  <TooltipProvider>
                    {children}
                    <Toaster />
                  </TooltipProvider>
                </CategoryProvider>
              </FavoritesProvider>
            </CartProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
