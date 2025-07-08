import React, { useContext } from "react";
import CartContext from "../contextapi/CartContext";
import Navbar1 from "../Navbar/Navbar1";
import { Link } from "react-router-dom";

function Cart() {
  
  const { cart, increment, decrement, removeFromCart, clearCart } =
    useContext(CartContext);

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div>
      <Navbar1 />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center text-gray-600">
            <p>Your cart is empty.</p>
            <Link
              to="/productlist"
              className="inline-block mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div>
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border rounded-lg p-4 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <h2 className="text-lg font-semibold">{item.name}</h2>
                      <p className="text-sm text-gray-600">
                        ₹{item.price} × {item.quantity} = ₹
                        {item.price * item.quantity}
                      </p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => decrement(item.id)}
                          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-lg font-bold"
                        >
                          −
                        </button>
                        <span className="px-4 text-lg">{item.quantity}</span>
                        <button
                          onClick={() => increment(item.id)}
                          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-lg font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Cart Footer */}
            <div className="mt-6 border-t pt-4 flex justify-between items-center">
              <p className="text-xl font-bold">Total: ₹{totalPrice}</p>
              <div className="flex gap-4">
                <button
                  onClick={clearCart}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  Clear Cart
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
