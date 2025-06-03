import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ShoppingCart,
  UserPlus,
  LogIn,
  LogOut,
  Lock,
} from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import MarqueeBanner from "./MarqueeBanner";



const Navbar = () => {
  const { user, logout } = useUserStore();
  const { cart } = useCartStore();
  const isAdmin = user?.role === "admin";

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/collections", label: "Collections" },
    { to: "/about", label: "About" },
  ];

  const toggleMobileMenu = () => setMobileMenuOpen((open) => !open);
  const handleLinkClick = () => setMobileMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 w-full  bg-black bg-opacity-95 backdrop-blur-md shadow-md z-40 border-b border-[#2c2c2e]">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-2xl font-bold text-white flex items-center space-x-2"
          onClick={handleLinkClick}
        >
          E-Commerce
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex space-x-6 items-center">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-gray-300 hover:text-white transition-colors duration-200 border-b-2 pb-1 ${
                  isActive
                    ? "border-white"
                    : "border-transparent hover:border-white"
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          {user && (
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `relative flex items-center text-gray-300 hover:text-white transition-colors duration-200 border-b-2 pb-1 ${
                  isActive
                    ? "border-black"
                    : "border-transparent hover:border-black"
                }`
              }
            >
              <ShoppingCart size={20} className="mr-1" />
              {cart.length}
            </NavLink>
          )}

          {isAdmin && (
            <NavLink
              to="/secret-dashboard"
              className="bg-[#2c2c2e] hover:bg-[#3a3a3c] text-white px-3 py-1 rounded-md font-medium flex items-center transition-colors duration-200"
            >
              <Lock size={18} className="mr-1" />
              Dashboard
            </NavLink>
          )}

          {user ? (
            <button
              onClick={() => {
                logout();
                handleLinkClick();
              }}
              className="bg-[#2c2c2e] hover:bg-[#3a3a3c] text-white py-2 px-4 rounded-md flex items-center transition-colors duration-200"
            >
              <LogOut size={18} />
              <span className="ml-2">Log Out</span>
            </button>
          ) : (
            <>
              <NavLink
                to="/signup"
                onClick={handleLinkClick}
                className="bg-white hover:bg-gray-600 hover:text-white text-black py-2 px-4 rounded-md flex items-center transition-colors duration-200"
              >
                <UserPlus size={18} className="mr-2" />
                Sign Up
              </NavLink>
              <NavLink
                to="/login"
                onClick={handleLinkClick}
                className="bg-[#2c2c2e] hover:bg-[#3a3a3c] text-white py-2 px-4 rounded-md flex items-center transition-colors duration-200"
              >
                <LogIn size={18} className="mr-2" />
                Login
              </NavLink>
            </>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMobileMenu}
          className="sm:hidden text-white text-3xl focus:outline-none"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? "×" : "☰"}
        </button>
      </div>
      <MarqueeBanner />

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav
          className="sm:hidden min-h-[500px] fixed inset-0 z-50 flex flex-col pt-12 items-center space-y-8 text-xl font-light bg-black text-white"
        >
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `px-3 py-1 border-b-2 ${
                  isActive ? "border-[#d8c1a1]" : "border-transparent"
                } hover:text-[#d8c1a1] transition-colors duration-200`
              }
            >
              {label}
            </NavLink>
          ))}

          {user && (
            <NavLink
              to="/cart"
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `relative flex items-center px-3 py-1 border-b-2 ${
                  isActive ? "border-[#d8c1a1]" : "border-transparent"
                } hover:text-[#d8c1a1] transition-colors duration-200`
              }
            >
              <ShoppingCart size={24} className="mr-1" />
              Cart ({cart.length})
            </NavLink>
          )}

          {isAdmin && (
            <NavLink
              to="/secret-dashboard"
              onClick={handleLinkClick}
              className="bg-[#2c2c2e] hover:bg-[#3a3a3c] text-white px-4 py-2 rounded-md font-medium flex items-center transition-colors duration-200"
            >
              <Lock className="mr-2" size={20} />
              Dashboard
            </NavLink>
          )}

          {user ? (
            <button
              onClick={() => {
                logout();
                handleLinkClick();
              }}
              className="bg-[#2c2c2e] hover:bg-[#3a3a3c] text-white py-2 px-6 rounded-md flex items-center transition-colors duration-200"
            >
              <LogOut size={20} />
              <span className="ml-2">Log Out</span>
            </button>
          ) : (
            <>
              <NavLink
                to="/signup"
                onClick={handleLinkClick}
                className="bg-white hover:bg-gray-600 hover:text-white text-black py-2 px-6 rounded-md flex items-center transition-colors duration-200"
              >
                <UserPlus className="mr-2" size={20} />
                Sign Up
              </NavLink>
              <NavLink
                to="/login"
                onClick={handleLinkClick}
                className="bg-[#2c2c2e] hover:bg-[#3a3a3c] text-white py-2 px-6 rounded-md flex items-center transition-colors duration-200"
              >
                <LogIn className="mr-2" size={20} />
                Login
              </NavLink>
            </>
          )}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
