import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, User, Menu, X, ChevronRight } from 'lucide-react';

export default function Navbar({ cartCount = 0, onCartClick }) {
  const [isOpen, setIsOpen] = useState(false);

  // Animation variants for the mobile menu overlay
  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 30, staggerChildren: 0.2 }
    }
  };

  const linkVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <nav className="relative bg-[#0A192F] text-white px-4 py-4 md:px-8 border-b border-yellow-500/20 shadow-xl z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left Side: Brand Logo & Name */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          {/* Animated Premium Hex Shield Logo */}
          <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl shadow-[0_0_15px_rgba(234,179,8,0.3)] group-hover:scale-105 transition-transform duration-300">
            <span className="text-[#0A192F] font-black text-xl tracking-wider">M</span>
            <div className="absolute inset-0 rounded-xl border border-white/20 animate-pulse" />
          </div>
          
          {/* Company Name */}
          <span className="font-serif text-xl font-bold tracking-widest bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent">
            KE MERKATO
          </span>
        </motion.div>

        {/* Desktop Navigation Links (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-8 font-medium tracking-wide text-sm text-gray-300">
          {['Home', 'Categories', 'Products', 'Tracking'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="relative hover:text-yellow-400 transition-colors duration-300 before:content-[''] before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-[2px] before:bg-yellow-400 before:transition-all before:duration-300 hover:before:w-full"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Right Side: Action Icons & Mobile Menu Button */}
        <div className="flex items-center gap-2 md:gap-4">
          
          {/* Cart Button with Hover Bounce & Dynamic Counter Badge */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCartClick}
            className="relative p-2.5 rounded-full hover:bg-yellow-500/10 text-gray-300 hover:text-yellow-400 transition-colors duration-300 group"
            aria-label="Shopping Cart"
          >
            <ShoppingCart className="w-6 h-6" />
            
            {/* Dynamic Counter Badge - Only loads or animations play if items exist */}
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-yellow-500 text-[#0A192F] font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-md animate-bounce">
                {cartCount}
              </span>
            )}
          </motion.button>

          {/* Luxury Account/Sign In Button */}
          <motion.button 
            whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(234, 179, 8, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-[#0A192F] font-semibold px-5 py-2 rounded-full text-sm shadow-lg border border-yellow-400/20 transition-all"
          >
            <User className="w-4 h-4" />
            <span>Sign In</span>
          </motion.button>

          {/* Mobile Menu Trigger */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-yellow-400 focus:outline-none z-50"
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </motion.button>
        </div>
      </div>

      {/* Luxury Full-Screen Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 bg-[#0A192F] bg-opacity-98 pt-24 px-6 z-40 md:hidden flex flex-col justify-between pb-12 border-b-4 border-yellow-500"
          >
            {/* Navigation List */}
            <div className="flex flex-col gap-6">
              {['Home', 'Categories', 'Products', 'Order Tracking'].map((item, index) => (
                <motion.a
                  variants={linkVariants}
                  transition={{ delay: index * 0.05 }}
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between text-2xl font-light tracking-widest text-gray-200 hover:text-yellow-400 border-b border-gray-800 pb-3 transition-colors group"
                >
                  <span>{item}</span>
                  <ChevronRight className="w-5 h-5 text-yellow-500/40 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all" />
                </motion.a>
              ))}
            </div>

            {/* Bottom Account Action for Mobile Layout */}
            <motion.div 
              variants={linkVariants}
              className="w-full sm:hidden"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-[#0A192F] font-bold py-4 rounded-xl shadow-lg"
              >
                <User className="w-5 h-5" />
                <span>Sign In to Your Account</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}