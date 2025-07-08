import React, { useEffect, useState } from "react";
import Navbar1 from "../Navbar/Navbar1";
import { Api } from "../commonapi/api";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

function ProductList() {
  const [productList, SetProductList] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await Api.get("/products");
        SetProductList(res.data); // Adjust based on API structure
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  console.log(productList);

  return (
    <div>
      <Navbar1 />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Product List</h1>
        <ProductCard productList={productList} />
      </div>
    </div>
  );
}

export default ProductList;
