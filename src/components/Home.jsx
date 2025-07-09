import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import Navbar1 from "../Navbar/Navbar1";
import ProductCard from "../products/ProductCard";
import { Api } from "../commonapi/api";
import { Heart } from "lucide-react";
import HeroBanner from "./HeroBanner";

function Home() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      axios
        .get(`http://localhost:3000/users/${userId}`)
        .then((res) => setUser(res.data))
        .catch((err) => console.error("Error fetching user", err));
    }
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/products/")
      .then((res) => setProducts(res.data.slice(0, 4)))
      .catch((err) => console.log(err.message));
  }, []);

  console.log(user);
  console.log(products);

  return (
    <div>
      <Navbar1 />
        <HeroBanner/>
      {/* FEATURED PRODUCTS */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-center mb-8">Featured Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products && products.length > 0 ? (
            products.slice(0, 4).map((product) => (
              <div
                key={product.id}
                className="relative group bg-white border rounded-xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                {/* Wishlist */}
                <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500 z-10">
                  <Heart size={18} />
                </button>

                {/* New Badge */}
                {product.isNew && (
                  <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded shadow">
                    NEW
                  </span>
                )}

                {/* Image */}
                <div className="bg-gray-100 h-40 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-32 object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Info */}
                <div className="px-4 py-3 text-center">
                  <h5 className="text-sm font-medium text-gray-800 mb-1">
                    {product.name}
                  </h5>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-indigo-700 font-bold text-base mt-1">
                    ₹{product.price}
                  </p>
                  <Link
                    to={`/product-detail/${product.id}`}
                    className="inline-block mt-3 text-xs font-medium text-white bg-black px-4 py-1.5 rounded hover:bg-gray-800 transition"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No Products Found
            </p>
          )}
        </div>

        {/* VIEW FULL COLLECTION */}
        <div className="flex justify-center mt-10">
          <Link
            to="/productlist"
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition text-sm font-medium"
          >
            View Full Collection
          </Link>
        </div>
      </div>

      {/* ----------------footer----------------- */}

      {/* <Footer /> */}
    </div>
  );
}

export default Home;
