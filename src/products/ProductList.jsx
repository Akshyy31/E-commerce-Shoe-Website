import React, { useEffect, useState } from "react";
import Navbar1 from "../Navbar/Navbar1";
import { Api } from "../commonapi/api";
import ProductCard from "./ProductCard";

function ProductList() {
  const [productList, SetProductList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // 🧠 Filter logic
  const filteredProducts = productList.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // 📦 Fetch products on load
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await Api.get("/products");
        SetProductList(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar1 />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>

        {/* Layout: Sidebar + Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="md:col-span-1 bg-white p-5 rounded shadow h-fit sticky top-24">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Filters</h2>

            {/* Search Input */}
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">
                Search
              </label>
              <input
                type="text"
                placeholder="Search products..."
                className="border px-3 py-2 rounded w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border px-3 py-2 rounded w-full"
              >
                <option value="All">All</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>
          </aside>

          {/* Products Display */}
          <main className="md:col-span-3">
            {filteredProducts.length > 0 ? (
              <ProductCard productList={filteredProducts} />
            ) : (
              <p className="text-gray-600 text-center">No products found.</p>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
