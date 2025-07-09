import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Api } from "../commonapi/api";
import AuthContext from "../contextapi/AuthContext";
import CartContext from "../contextapi/CartContext";
import Navbar1 from "../Navbar/Navbar1";
import Login from "../components/Login";
import { toast } from "react-toastify";

function ProductDetail() {
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState("UK 6");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await Api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!currentUser) {
      setShowLoginModal(true);
      return;
    }
    addToCart(product, quantity);
    toast.success(`${quantity} item(s) added to cart.`);
  };

  return (
    <div className="bg-amber-100 min-h-screen">
      <Navbar1 />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar - Filters mimic */}
          <aside className="md:col-span-1 bg-amber-100 p-3 rounded shadow h-fit sticky top-24">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Product Filters</h2>
            <div className="text-sm space-y-2">
              <p>Category: <strong>{product.category}</strong></p>
              <p>Brand: <strong>{product.brand}</strong></p>
              <p>Price: <strong>₹{product.price}</strong></p>
            </div>
          </aside>

          {/* Product Detail View */}
          <main className="md:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 bg-amber-100">
              {/* Product Images */}
              <div className="space-y-4 bg-amber-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[400px] object-contain bg-amber-100 p-4 rounded shadow"
                />
                <div className="grid grid-cols-3 gap-2   bg-amber-100">
                  <img src={product.image1} className="h-24 object-contain bg-white p-2 rounded" alt="alt" />
                  <img src={product.image2} className="h-24 object-contain bg-white p-2 rounded" alt="alt" />
                  <img src={product.image3} className="h-24 object-contain bg-white p-2 rounded" alt="alt" />
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-4">
                <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
                <p className="text-sm text-gray-600">{product.description}</p>
                <div className="text-lg font-semibold text-black">₹ {Number(product.price).toLocaleString()}</div>

                {/* Size Selection */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Select Size</label>
                  <div className="flex flex-wrap gap-2">
                    {["35", "36", "37", "38", "39", "40", "41", "42"].map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`border px-4 py-1 rounded-full text-sm ${selectedSize === size ? "bg-black text-white" : "bg-white text-black"}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="text-sm font-medium text-gray-700">Quantity</label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="mt-1 border px-3 py-2 rounded w-24"
                  >
                    {[...Array(10).keys()].map((n) => (
                      <option key={n + 1} value={n + 1}>
                        {String(n + 1).padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleAddToCart}
                    className="w-1/2 bg-red-600 hover:bg-red-700 text-white py-3 rounded font-semibold"
                  >
                    ADD TO CART
                  </button>
                  <button className="w-1/2 border border-gray-400 text-gray-700 hover:bg-gray-100 py-3 rounded font-semibold">
                    ♡ ADD TO WISHLIST
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      <Login
        show={showLoginModal}
        handleClose={() => setShowLoginModal(false)}
        hideIcon={true}
      />
    </div>
  );
}

export default ProductDetail;
