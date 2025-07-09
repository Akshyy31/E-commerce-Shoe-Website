import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  const [selectedSize, setSelectedSize] = useState("35");

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
    <div>
      <Navbar1 />
      <div className="max-w-4xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[400px] object-contain border rounded"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold uppercase">{product.name}</h1>

          <p className="text-xl font-semibold text-gray-900">
            ₹ {Number(product.price).toLocaleString()}
          </p>
          <p className="text-gray-500 text-sm">Tax included.</p>

          {/* Size Selector */}
          <div>
            <h3 className="font-semibold text-gray-800">Size</h3>
            <div className="flex gap-2 flex-wrap mt-2">
              {["35", "36", "37", "38", "39", "40", "41", "42"].map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 rounded-full border ${
                    selectedSize === size
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Quantity</h3>
            <div className="flex items-center w-32 border rounded overflow-hidden">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="w-10 py-2 text-xl bg-gray-100 hover:bg-gray-200"
              >
                −
              </button>
              <div className="w-12 text-center">{quantity}</div>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="w-10 py-2 text-xl bg-gray-100 hover:bg-gray-200"
              >
                +
              </button>
            </div>
          </div>

          {/* Stock status */}
          {product.stock === 1 ? (
            <p className="text-sm text-red-600 font-semibold">
              1 left in stock
            </p>
          ) : (
            <p
              className={`text-sm font-semibold ${
                product.stock > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </p>
          )}

          {/* Delivery Info */}
          <p className="text-sm font-medium text-gray-700 tracking-wide">
            NEXT DAY SHIPPING | FREE DELIVERY | COD AVAILABLE
          </p>

          <Login
            show={showLoginModal}
            handleClose={() => setShowLoginModal(false)}
            hideIcon={true}
          />

          {/* Buttons */}
          <div className="space-y-3 mt-6">
            <button
              onClick={handleAddToCart}
              className="w-full border border-black text-black py-3 font-medium hover:bg-black hover:text-white transition"
            >
              Add to cart
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
