import React, { useContext, useState } from "react";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { ShoppingCart, Heart } from "lucide-react";
import Login from "./Login";
import AuthContext from "../contextapi/AuthContext";

function Navbar() {
  const { currentUser, logoutUser } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 md:h-24 items-center">
          {/* Logo and mobile menu button */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-black">
              <h1>Urben-Foot</h1>
            </div>
          </div>

          {/* Search Input - Hidden on mobile */}
          <div className="hidden md:flex mx-4 flex-1 max-w-lg">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products"
                className="w-full px-4 py-2 md:py-3 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-black focus:outline-none"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>

          {/* Desktop Right Menu */}
          <div className="hidden md:flex items-center gap-4">
            {/* Shopping Cart */}
            <button
              className="p-2 text-gray-700 hover:text-blue-600 transition-colors relative"
              aria-label="Shopping cart"
            >
              <ShoppingCart size={24} />
              {/* Optional cart counter */}
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </button>

            {/* Wishlist */}
            <button
              className="p-2 text-gray-700 hover:text-blue-600 border-0 transition-colors"
              aria-label="Wishlist"
            >
              <Heart size={24} />

              
              
            </button>

            {/* User Section */}
            {currentUser ? (
              <div className="relative ml-2">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center gap-2 focus:outline-none hover:bg-gray-100 px-3 py-1 rounded-full transition-colors"
                  aria-expanded={showDropdown}
                >
                  <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
                    Hi, {currentUser.username}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      showDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                    <button
                      onClick={logoutUser}
                      className="w-full text-left px-4 py-3 text-gray-800 hover:bg-gray-50 transition-colors text-sm"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="ml-2">
                <Login />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white pb-4 px-4">
          {/* Mobile Search */}
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products"
                className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* Mobile Menu Items */}
          <div className="flex flex-col space-y-4">
            <button className="flex items-center text-black hover:text-blue-600">
              <ShoppingCart size={20} className="mr-2" />
              Cart
            </button>
            <button className="flex items-center text-black hover:text-blue-600">
              <Heart size={20} className="mr-2" />
              Wishlist
            </button>
            {currentUser ? (
              <>
                <div className="flex items-center text-black">
                  <span className="bg-blue-600 px-3 py-1 rounded-full text-sm text-white">
                    Hi, {currentUser.username}
                  </span>
                </div>
                <button
                  onClick={logoutUser}
                  className="text-left text-black hover:text-blue-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <Login mobileView />
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
