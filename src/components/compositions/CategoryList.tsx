import { useCategories } from "@/hooks/useCategories";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "../animations/FadeIn";
import { useCategory } from "@/contexts/CategoryContext";

export default function CategoryList() {
  const { categories, isLoading, error } = useCategories();
  const { setSelectedCategory } = useCategory();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="relative h-36 bg-gray-200 rounded-lg animate-pulse"
          ></div>
        ))}
      </div>
    );
  }

  if (error || !categories || categories.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        Nenhuma categoria disponível
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {categories.map((category, index) => (
        <FadeIn
          key={category.id}
          delay={index * 75}
          className="relative rounded-lg overflow-hidden group"
        >
          <Link
            href={`/products?category=${category.id}`}
            className="block h-40 md:h-48"
            onClick={() => setSelectedCategory(category.id)}
          >
            {/* Image with overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors z-10"></div>
            <Image
              width={500}
              height={500}
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />

            {/* Category name */}
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="text-center">
                <span className="text-white font-medium text-sm md:text-base bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full">
                  {category.name}
                </span>
              </div>
            </div>
          </Link>
        </FadeIn>
      ))}
    </div>
  );
}
