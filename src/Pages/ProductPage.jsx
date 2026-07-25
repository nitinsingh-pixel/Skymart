import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import axios from "axios";
import { Search, X, Loader2 } from "lucide-react";
import ProductCard from "../components/ProductCard";

const ProductPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category") || "all";

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("https://fakestoreapi.com/products");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let updated = [...products];

    if (selectedCategory && selectedCategory !== "all") {
      const targetCat = selectedCategory.toLowerCase().trim();
      updated = updated.filter((item) => {
        const itemCat = item.category.toLowerCase().trim();
        return itemCat === targetCat || itemCat.includes(targetCat) || targetCat.includes(itemCat);
      });
    }

    if (searchQuery.trim() !== "") {
      updated = updated.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortBy === "low-to-high") {
      updated.sort((a, b) => a.price - b.price);
    } else if (sortBy === "high-to-low") {
      updated.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      updated.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
    }

    setFilteredProducts(updated);
  }, [products, selectedCategory, searchQuery, sortBy]);

  const handleCategoryChange = (catValue) => {
    if (catValue === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", catValue);
    }
    setSearchParams(searchParams);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSortBy("featured");
    setSearchParams({});
  };

  const categories = [
    { label: "All", value: "all" },
    { label: "Electronics", value: "electronics" },
    { label: "Clothing", value: "clothing" },
    { label: "Men's Clothing", value: "men's clothing" },
    { label: "Women's Clothing", value: "women's clothing" },
    { label: "Jewelery", value: "jewelery" }
  ];

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-zinc-400 space-y-4">
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-[#ccff00]/30 blur-2xl animate-pulse" />
          <Loader2 className="w-12 h-12 animate-spin text-[#ccff00] relative z-10" />
        </div>
        <p className="text-xs uppercase tracking-widest font-bold text-zinc-400 animate-pulse">
          Loading Products...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070709] text-white p-4 sm:p-8 lg:p-12 max-w-7xl mx-auto space-y-8 font-sans flex flex-col justify-between">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">All Products</h1>
          <p className="text-xs text-zinc-400 font-medium">
            {filteredProducts.length} products found {selectedCategory !== "all" ? `in ${selectedCategory}` : ""}
          </p>
        </div>

        <div className="bg-[#121214] border border-zinc-800/80 rounded-2xl p-4 flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 text-white pl-11 pr-4 py-3 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#ccff00] transition"
            />
          </div>

          <div className="flex items-center space-x-3 w-full md:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 text-white px-4 py-3 rounded-xl text-xs font-bold focus:outline-none focus:border-[#ccff00] transition cursor-pointer flex-1 md:flex-none capitalize"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value} className="bg-zinc-900 text-white">
                  {cat.label}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 text-white px-4 py-3 rounded-xl text-xs font-bold focus:outline-none focus:border-[#ccff00] transition cursor-pointer flex-1 md:flex-none"
            >
              <option value="featured" className="bg-zinc-900 text-white">Featured</option>
              <option value="low-to-high" className="bg-zinc-900 text-white">Price: Low to High</option>
              <option value="high-to-low" className="bg-zinc-900 text-white">Price: High to Low</option>
              <option value="rating" className="bg-zinc-900 text-white">Highest Rated</option>
            </select>

            {(selectedCategory !== "all" || searchQuery !== "" || sortBy !== "featured") && (
              <button
                type="button"
                onClick={clearFilters}
                className="bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 px-3 py-3 rounded-xl text-xs font-bold flex items-center space-x-1 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>

        {selectedCategory !== "all" && (
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center space-x-1.5 bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] text-xs font-bold px-3 py-1 rounded-full capitalize">
              <span>{selectedCategory}</span>
              <X
                className="w-3 h-3 cursor-pointer hover:text-white"
                onClick={() => handleCategoryChange("all")}
              />
            </span>
          </div>
        )}

        {filteredProducts.length === 0 ? (
          <div className="bg-[#121214] border border-zinc-800/80 rounded-3xl p-12 text-center space-y-4">
            <p className="text-zinc-400 text-sm font-semibold">No products found matching your filters.</p>
            <button
              type="button"
              onClick={clearFilters}
              className="bg-[#ccff00] text-black font-extrabold px-6 py-2.5 rounded-xl text-xs transition cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:grid-cols-5 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      <footer className="pt-8 mt-12 border-t border-zinc-800/80 text-center space-y-1">
        <h3 className="text-xl font-extrabold text-[#ccff00] tracking-tight">
          SkyMart
        </h3>
        <p className="text-xs text-zinc-500 font-medium">
          © 2026 SkyMart - Built with React + Redux + TanStack Query
        </p>
      </footer>
    </div>
  );
};

export default ProductPage;