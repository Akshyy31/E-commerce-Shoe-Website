import { createContext, useState, useEffect, useContext } from "react";
import AuthContext from "./AuthContext";
import axios from "axios";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);

  const wishlistCount = wishlist.length;

  useEffect(() => {
    if (currentUser?.id) fetchWishlist();
  }, [currentUser]);

  const fetchWishlist = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/users/${currentUser.id}`
      );
      setWishlist(res.data.wishlist || []);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    }
  };

  const updateBackendWishlist = async (newWishlist) => {
    try {
      await axios.patch(`http://localhost:3000/users/${currentUser.id}`, {
        wishlist: newWishlist,
      });
    } catch (err) {
      console.error("Error updating wishlist:", err);
    }
  };

  const addToWishlist = async (product) => {
    if (!currentUser) return;

    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) return;

    const updatedWishlist = [...wishlist, product];
    setWishlist(updatedWishlist);
    updateBackendWishlist(updatedWishlist);
  };

  const removeFromWishlist = async (productId) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== productId);
    setWishlist(updatedWishlist);
    updateBackendWishlist(updatedWishlist);
  };

  const toggleWishlist = async (product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const clearWishlist = async () => {
    setWishlist([]);
    updateBackendWishlist([]);
  };

  const isInWishlist = (productId) =>
    wishlist.some((item) => item.id === productId);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        clearWishlist,
        isInWishlist,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContext;
