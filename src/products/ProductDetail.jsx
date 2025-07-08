import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Api } from "../commonapi/api";
import AuthContext from "../contextapi/AuthContext";
import Navbar1 from "../Navbar/Navbar1";
import CartContext from "../contextapi/CartContext";
import { useNavigate } from "react-router-dom";
import Login from "../components/Login";
import { toast } from "react-toastify";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { addToCart, increment, decrement } = useContext(CartContext);
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1); // local state for display
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Fetch product by ID
  useEffect(() => {
    const productDetailById = async () => {
      try {
        const res = await Api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    productDetailById();
  }, [id]);

  // Add to cart logic
  const handleAddToCart = () => {
    if (!currentUser) {
      // alert("Please login first to add to cart");
      //   toast.warning("Please login first to add to cart");
      setShowLoginModal(true);
      return;
    } else {
      addToCart(product);
      toast.success(`${quantity} item added to the cart`);
    }
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
    increment(product.id); // from context
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
      decrement(product.id); // from context
    }
  };

  return (
    <div>
      <Navbar1 />

      <div className="text-center py-6">
        <hr className="my-4 border-gray-300 w-1/3 mx-auto" />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start bg-white shadow-md rounded-lg">
        {/* Product Image */}
        <div className="w-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[400px] object-contain rounded-md border"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              {product.name}
            </h2>

            <p className="text-gray-600 text-sm mb-4">{product.description}</p>

            <p className="text-lg font-semibold text-gray-700 mb-1">
              Price: ₹{product.price}
            </p>

            {product.stock > 0 ? (
              <p className="text-green-600 font-semibold mb-4">In Stock</p>
            ) : (
              <p className="text-red-600 font-semibold mb-4">Out of Stock</p>
            )}
          </div>

          {/* Add to Cart Controls */}
          <div className="flex justify-between mt-6 gap-4">
            <div className="flex items-center border rounded">
              <button
                onClick={handleDecrement}
                className="px-3 py-1 text-lg font-bold bg-gray-200 hover:bg-gray-300"
              >
                −
              </button>
              <span className="px-4 py-1 text-lg font-medium">{quantity}</span>
              <button
                onClick={handleIncrement}
                className="px-3 py-1 text-lg font-bold bg-gray-200 hover:bg-gray-300"
              >
                +
              </button>
            </div>
            <Login
              show={showLoginModal}
              handleClose={() => setShowLoginModal(false)}
              hideIcon={true}
            />
            <button
              onClick={handleAddToCart}
              className="w-40 bg-black text-white font-medium py-2 rounded transition duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
