import { useFavoritesStore } from "../stores/favoritesStore";
import ProductsGrid from "../components/ProductsGrid";
import { useEffect, useState } from "react";

const Favorites = () => {
  const favorites = useFavoritesStore((state) => state.favorites);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("fake_token")) {
      window.location.href = "/login?redirect=/favorites";
    } else {
      setChecked(true);
    }
  }, []);

  if (!checked) return null;

  return (
    <div className="bg-light flex min-h-screen flex-col items-center py-20 transition-colors duration-500 dark:bg-dark">
      <h1 className="mb-6 text-5xl font-extrabold text-black drop-shadow-lg transition-colors duration-500 dark:text-white">
        Favorites
      </h1>
      <ProductsGrid products={favorites} />
    </div>
  );
};

export default Favorites;
