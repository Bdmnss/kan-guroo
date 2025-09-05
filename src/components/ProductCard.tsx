import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaHeart, FaShoppingCart, FaRegHeart } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

import type { Product } from "../types/types";
import { useFavoritesStore } from "../stores/favoritesStore";
import { useCartStore } from "../stores/cartStore";

export default function ProductCard({ product }: { product: Product }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  const { addToCart, setCartOpen } = useCartStore();

  const navigate = useNavigate();
  const favorite = isFavorite(product.id);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!localStorage.getItem("fake_token")) {
      navigate("/login");
      return;
    }
    if (favorite) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    setCartOpen(true);
  };

  const slug = `${product.title.replace(/\s+/g, "-").toLowerCase()}-${product.price}-${product.id}`;

  return (
    <Link to={`/products/${slug}`} className="block h-full">
      <div className="dark:bg-charcoal group relative flex h-full transform cursor-pointer flex-col rounded-lg bg-white p-4 shadow-md transition-all duration-300 hover:scale-105">
        <div className="absolute left-4 top-4 z-10 flex flex-col gap-2 lg:hidden">
          <button
            onClick={handleAddToCart}
            className="hover:bg-orangeLight flex items-center gap-2 rounded bg-orange px-3 py-2 text-white shadow transition"
            title="Add to Cart"
          >
            <FaShoppingCart />
          </button>
          <button
            onClick={handleFavorite}
            className={twMerge(
              "flex items-center gap-2 rounded px-3 py-2 shadow transition",
              favorite && "hover:bg-orangeLight bg-orange text-white",
              !favorite &&
                "hover:bg-orangeLight bg-white text-orange hover:text-white",
            )}
            title={favorite ? "Remove from Favorites" : "Add to Favorites"}
          >
            {favorite ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
        <div className="relative mb-4 flex items-center justify-center">
          {!imgLoaded && (
            <div className="dark:bg-charcoal absolute inset-0 z-10 flex items-center justify-center bg-white">
              <span className="h-8 w-8 animate-spin rounded-full border-2 border-orange border-t-transparent" />
            </div>
          )}
          <img
            src={product.thumbnail}
            alt={product.title}
            className={twMerge(
              "size-40 self-center rounded object-cover transition-opacity duration-300",
              imgLoaded && "opacity-100",
              !imgLoaded && "opacity-0",
            )}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold text-black transition-colors duration-500 dark:text-white">
              {product.title}
            </h3>
            <p className="text-lg font-bold text-orange">
              ${product.price.toFixed(2)}
            </p>
          </div>
          <div className="flex items-center">
            <span className="mr-1 text-yellow-400">★</span>
            <span className="text-base text-black transition-colors duration-500 dark:text-white">
              {product.rating}
            </span>
          </div>
        </div>
        <div className="absolute left-0 top-0 hidden h-full w-full flex-col items-center justify-center gap-4 rounded-lg bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 lg:flex">
          <button
            className="hover:bg-orangeLight flex items-center gap-2 rounded bg-orange px-4 py-2 text-white shadow transition"
            title="Add to Cart"
            onClick={handleAddToCart}
          >
            <FaShoppingCart />
            Add to Cart
          </button>
          <button
            onClick={handleFavorite}
            className={twMerge(
              "flex items-center gap-2 rounded px-4 py-2 shadow transition",
              favorite && "hover:bg-orangeLight bg-orange text-white",
              !favorite &&
                "hover:bg-orangeLight bg-white text-orange hover:text-white",
            )}
            title={favorite ? "Remove from Favorites" : "Add to Favorites"}
          >
            {favorite ? <FaHeart /> : <FaRegHeart />}
            {favorite ? "Remove Favorite" : "Favorite"}
          </button>
        </div>
      </div>
    </Link>
  );
}
