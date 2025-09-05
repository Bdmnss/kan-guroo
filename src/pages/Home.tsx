import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/products";
import { useEffect, useState } from "react";
import SearchInput from "../components/SearchInput";
import CategoryDropdown from "../components/CategoryDropdown";
import SortDropdown from "../components/SortDropdown";
import { useDebounce } from "../hooks/useDebounce";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../api/useProducts";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);
  const [sortOrder, setSortOrder] = useState<"default" | "asc" | "desc">(
    "default",
  );
  const [sortOpen, setSortOpen] = useState(false);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const limit = 9;

  const { data, isPending, isError } = useQuery({
    queryKey: ["products", selectedCategory, debouncedSearch, page, sortOrder],
    queryFn: () =>
      fetchProducts(selectedCategory, debouncedSearch, page, limit, sortOrder),
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  console.log("Products data:", data);

  useEffect(() => {
    let url = "/products";
    const params = new URLSearchParams();
    if (selectedCategory && selectedCategory !== "All") {
      params.set("category", selectedCategory);
    }
    if (debouncedSearch) params.set("search", debouncedSearch);
    if (sortOrder !== "default") params.set("sort", sortOrder);
    if (params.toString()) url += `?${params.toString()}`;
    navigate(url, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, debouncedSearch, sortOrder]);

  const currentCategory =
    selectedCategory && selectedCategory !== "All"
      ? categories.find((c: { slug: string }) => c.slug === selectedCategory)
          ?.name || selectedCategory
      : null;

  return (
    <div className="bg-light flex min-h-screen flex-col items-center py-20 transition-colors duration-500 dark:bg-dark">
      {currentCategory && (
        <div className="container w-full max-w-7xl">
          <nav className="mb-4 w-full bg-orange px-4 text-sm text-white">
            <ol className="flex items-center space-x-2">
              <li>
                <a href="/" className="text-white hover:underline">
                  Home
                </a>
              </li>

              <>
                <li>
                  <span className="mx-2">{">"}</span>
                </li>
                <li className="text-white">{currentCategory}</li>
              </>
            </ol>
          </nav>
        </div>
      )}

      <div className="container mb-8 flex w-full max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <SearchInput search={search} setSearch={setSearch} />
        <CategoryDropdown
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categoryOpen={categoryOpen}
          setCategoryOpen={setCategoryOpen}
        />
        <SortDropdown
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          sortOpen={sortOpen}
          setSortOpen={setSortOpen}
        />
      </div>
    </div>
  );
};

export default Home;
