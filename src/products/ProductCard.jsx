import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

function ProductCard({ productList }) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productList && productList.length > 0 ? (
          productList.map((product) => (
            <div
              key={product.id}
              className="relative border rounded-md shadow-sm bg-white overflow-hidden group transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {/* Wishlist Icon */}
              <button className="absolute top-2 right-2 text-gray-500 hover:text-red-500 z-10">
                <Heart size={22} />
              </button>

              {/* New Badge */}
              {product.isNew && (
                <span className="absolute top-2 left-2 bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded z-10">
                  New
                </span>
              )}

              {/* Product Image */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-contain mb-3"
              />

              {/* Product Info */}
              <div className="px-4 pb-4">
                <h5 className="text-sm font-bold text-center uppercase mb-1">
                  {product.name}
                </h5>
                <p className="text-xs text-gray-500 text-center">
                  {product.description}
                </p>
                <p className="text-center text-indigo-800 font-semibold mt-2 text-lg">
                  ₹{product.price}
                </p>
              </div>

              {/* View Details Button (visible on hover) */}
              <Link
                to={`/product-detail/${product.id}`}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 transform !bg-black text-white text-sm font-medium px-2 py-2 pt-3 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow hover:bg-gray-800"
              >
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p>No Products Found</p>
        )}
      </div>
    </>
  );
}

export default ProductCard;
