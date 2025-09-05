import {
  getAllProducts,
  getProductsByCategory,
  getSortedProducts,
  searchProducts,
} from "./products";

export const fetchProducts = async (
  category: string,
  search: string,
  page = 1,
  limit = 9,
  sortOrder: "default" | "asc" | "desc" = "default",
) => {
  if (search && search.trim() !== "") {
    return await searchProducts(search, page, limit, sortOrder);
  }
  if (category && category !== "All") {
    return await getProductsByCategory(category, page, limit, sortOrder);
  }
  if (sortOrder === "asc" || sortOrder === "desc") {
    return await getSortedProducts(sortOrder, page, limit);
  }
  return await getAllProducts(page, limit);
};
