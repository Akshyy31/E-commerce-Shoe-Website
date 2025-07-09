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
  const [selectedColor, setSelectedColor] = useState("gray");

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
      <div className="min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Images */}
        <div className="flex gap-4">
  <div className="w-1/2 h-[400px] border rounded overflow-hidden">
    <img
      src={product.image}
      alt={product.name}
      className="w-full h-full object-cover"
    />
  </div>
  <div className="w-1/2 h-[400px] border rounded overflow-hidden">
    <img
      src={product.image}
      alt={product.name}
      className="w-full h-full object-cover"
    />
  </div>
</div>

        {/* Product Info */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {product.name}
          </h2>
          <p className="text-sm text-gray-600 mb-2">{product.description}</p>
          <p className="text-2xl font-bold text-gray-800">
            ₹ {Number(product.price).toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">MRP incl. of all taxes</p>

          
          


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

          {/* Quantity Dropdown */}
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-1">Quantity</p>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border px-3 py-2 rounded w-24"
            >
              {[...Array(10).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {String(num + 1).padStart(2, "0")}
                </option>
              ))}
            </select>
          </div>

          {/* Add to Cart & Wishlist */}
          <div className="flex gap-4 mt-6 ">
            <button
              onClick={handleAddToCart}
              className="w-1/2 bg-red-600 hover:bg-red-700 text-white py-3 rounded font-semibold"
            >
              ADD TO CART
            </button>
            <button className="w-1/2 border border-teal-600 text-teal-700 hover:bg-teal-50 py-3 rounded font-semibold">
              ♡ ADD TO WISHLIST
            </button>
          </div>

          <Login
            show={showLoginModal}
            handleClose={() => setShowLoginModal(false)}
            hideIcon={true}
          />

          
         
        </div>
      </div>
    </div>
    </div>
  );
}

export default ProductDetail;
