import { React, useContext } from "react";
import Login from "../components/Login";
import AuthContext from "../contextapi/AuthContext";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";

function Navbar1() {
  const { currentUser, logoutUser } = useContext(AuthContext);

  return (
    <div>
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <a href="#" className="font-bold text-lg text-black">
                Urban-Foot
              </a>
            </div>

            <div className="md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>

                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>

                <svg
                  className="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* <!-- Desktop Menu --> */}
            <div className="text-black hidden md:ml-6 md:flex md:items-center">
              <div className="flex space-x-8">
                <Link
                  to={'/'}
                  className="!text-black hover:text-indigo-600 px-3 py-2 text-sm font-medium"
                >
                  Home
                </Link>
                  <Link
                  to={'/productlist'}
                  className="!text-black  px-3 py-2 text-sm font-medium"
                >
                  products
                </Link>
                <Link
                  to='/cartpage'
                  className="text-gray-900 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
                >
                  <ShoppingCart size={24} color="black" />
                </Link>
                <a
                  href="#"
                  className="text-gray-500 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
                >
                  <Heart size={24} color="black" />
                </a>

                {/* <!-- Login Dropdown --> */}
                <div className="relative group">
                  {currentUser ? (
                    <div className="relative group">
                      <div className="flex items-center cursor-pointer px-3 py-2 text-sm font-medium text-white bg-black rounded-full">
                        Hi, {currentUser.username}
                      </div>

                      {/* Dropdown menu */}
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                        <a
                          href=""
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {currentUser.username}
                        </a>

                        <div className="border-t border-gray-200 my-1"></div>
                      </div>
                    </div>
                  ) : (
                    <Login />
                  )}

                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Action
                    </a>
                    <button
                      onClick={logoutUser}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-full"
                    >
                      Log out
                    </button>
                    <div className="border-t border-gray-200 my-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:hidden hidden" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
            <a
              href="#"
              className="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Home
            </a>
            <a
              href="#"
              className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Shop
            </a>
            <a
              href="#"
              className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Login
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar1;
