import React from "react";
import { Link } from "react-router-dom";
function ProductCard({ productList }) {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productList
          ? productList.map((product) => (
              <div
                key={product.id}
                className="flex flex-col border p-4 rounded shadow h-full"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover mb-2 rounded"
                />
                <h5 className="text-lg font-semibold">{product.name}</h5>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {product.description}
                </p>
                <p className="font-bold mt-2">{'\u20B9'}{product.price}</p>
                <Link
                  to={`/product-detail/${product.id}`}
                  className="mt-auto  px-4 py-2 rounded-md  text-center block font-medium transition"
                >
                  More Details
                </Link>
              </div>
            ))
          : "No Products"}
      </div>
    </div>
  );
}

export default ProductCard;
