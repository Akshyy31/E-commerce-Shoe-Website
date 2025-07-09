// CartContext.jsx
import { createContext, useState, useContext, useEffect } from "react";
import AuthContext from "./AuthContext";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  const cartCount = cart.length; //het the cart length as count  for unique product

  // Fetch cart from backend on login

  useEffect(() => {
    if (currentUser?.id) fetchCart();
  }, [currentUser]);

  const fetchCart = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/users/${currentUser.id}`
      );
      setCart(res.data.cart || []);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  const updateBackendCart = async (newCart) => {
    if (!currentUser) return;
    try {
      await axios.patch(`http://localhost:3000/users/${currentUser.id}`, {
        cart: newCart,
      });
    } catch (err) {
      console.error("Error syncing cart:", err);
    }
  };


  // add to cart 

  const addToCart = async (product, quantity = 1) => {
    if (!currentUser) return;
    try {
      const { data } = await axios.get(
        `http://localhost:3000/users/${currentUser.id}`
      );
      const existingCart = data.cart || [];

      const updatedCart = existingCart.some((item) => item.id === product.id)
        ? existingCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        : [...existingCart, { ...product, quantity }];

      await updateBackendCart(updatedCart);
      setCart(updatedCart);
    } catch (err) {
      console.error("Add to cart failed:", err);
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    updateBackendCart(updatedCart);
    
  };

  const updateCartItem = (productId, newQuantity) => {
    const updatedCart =
      newQuantity <= 0
        ? cart.filter((item) => item.id !== productId)
        : cart.map((item) =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
          );
    setCart(updatedCart);
    updateBackendCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
    updateBackendCart([]);
  };

  const increment = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    updateBackendCart(updatedCart);
  };

  const decrement = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
    updateBackendCart(updatedCart);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartItem,
        cartCount,
        clearCart,
        increment,
        decrement,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
