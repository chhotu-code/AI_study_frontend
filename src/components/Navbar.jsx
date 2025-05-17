import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const userEmail = localStorage.getItem("userEmail");

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    window.location.href = "/login";
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 50 }}
      className="bg-gray-900 text-white p-4 md:p-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl md:text-2xl lg:text-3xl font-bold">
          AI Study Assistant
        </Link>

        {/* Hamburger Button - Mobile Only */}
        <div className="md:hidden">
          <button onClick={handleMenuToggle}>
            <i className="fa-solid fa-bars text-2xl"></i>
          </button>
        </div>

        {/* Links - Tablet / Desktop */}
        <div className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8 text-[1rem] md:text-[1.1rem] lg:text-[1.2rem]">
          <Link to="/about" className="hover:text-purple-300">
            About
          </Link>
          <Link to="/features" className="hover:text-purple-300">
            Features
          </Link>
          <Link to="/contact" className="hover:text-purple-300">
            Contact
          </Link>
          <Link to="/quiz-generator" className="hover:text-purple-300">
            Quiz Generator
          </Link>
          <div className="relative">
            <button onClick={handleMenuToggle} className="flex items-center">
              <i className="fa-solid fa-user text-xl"></i>
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 bg-gray-800 text-white mt-2 py-3 px-5 rounded-lg shadow-xl w-48 sm:w-56 transition-all duration-300 opacity-100 z-10">
                {userEmail ? (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-400">
                      Logged in as: {userEmail}
                    </p>
                    <button
                      onClick={handleLogout}
                      className="w-full text-red-500 hover:text-red-400 text-sm font-medium py-2 px-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="block text-sm text-purple-300 hover:text-purple-400 font-medium py-2 px-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  >
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-2">
          <Link
            to="/about"
            className="hover:text-purple-300"
            onClick={handleMenuToggle}
          >
            About
          </Link>
          <Link
            to="/features"
            className="hover:text-purple-300"
            onClick={handleMenuToggle}
          >
            Features
          </Link>
          <Link
            to="/contact"
            className="hover:text-purple-300"
            onClick={handleMenuToggle}
          >
            Contact
          </Link>
          <Link
            to="/quiz-generator"
            className="hover:text-purple-300"
            onClick={handleMenuToggle}
          >
            Quiz Generator
          </Link>
          {userEmail ? (
            <div className="mt-2">
              <p className="text-sm mb-1">Logged in as: {userEmail}</p>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="text-red-500 hover:underline text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-sm text-purple-300 hover:underline mt-2"
              onClick={handleMenuToggle}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </motion.nav>
  );
}

export default NavBar;
