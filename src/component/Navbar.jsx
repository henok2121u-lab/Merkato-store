import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, User, Menu, X, ChevronRight } from 'lucide-react';
import { Link } from "react-router-dom";

export default function Navbar({ cartCount = 0, onCartClick }) {
  const [isOpen, setIsOpen] = useState(false);

  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  };

  const linkVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: "Products", path: "/products" },
    { name: "Tracking", path: "/tracking" },
    { name: "Admin", path: "./admin/dashboard" }
  ];

  return (
    <nav className="relative bg-[#0A192F] text-white px-4 py-4 md:px-8 border-b border-yellow-500/20 shadow-xl z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center">
            <span className="text-[#0A192F] font-black">M</span>
          </div>

          <span className="font-serif text-xl font-bold tracking-widest text-transparent bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text">
            KE MERKATO
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="hover:text-yellow-400 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {/* Cart */}
          <button onClick={onCartClick} className="relative">
            <ShoppingCart className="w-6 h-6" />

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          {/* Sign in */}
          <Link
            to="/login"
            className="hidden sm:flex items-center gap-2 bg-yellow-500 text-black px-4 py-1 rounded-full"
          >
            <User className="w-4 h-4" />
            Sign In
          </Link>

          {/* Mobile menu */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 bg-[#0A192F] pt-24 px-6 z-40 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  variants={linkVariants}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className="flex justify-between text-xl text-gray-200 border-b border-gray-800 pb-3"
                  >
                    {item.name}
                    <ChevronRight />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}