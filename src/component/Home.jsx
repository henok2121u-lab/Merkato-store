import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, Star, ArrowRight, SlidersHorizontal } from 'lucide-react';

// MVP Mock Data matching requirement benchmarks
const CATEGORIES = ['All', 'Luxury Watches', 'Premium Leather', 'Fine Jewelry', 'Fragrances'];

const PRODUCTS = [
  {
    id: 1,
    name: 'The Chrono Imperial',
    category: 'Luxury Watches',
    price: 1250,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=500&auto=format&fit=crop&q=60',
    tag: 'Best Seller'
  },
  {
    id: 2,
    name: 'Noir Premium Tote',
    category: 'Premium Leather',
    price: 450,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop&q=60',
    tag: 'New'
  },
  {
    id: 3,
    name: 'Onyx Geometric Ring',
    category: 'Fine Jewelry',
    price: 890,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&auto=format&fit=crop&q=60',
    tag: 'Limited'
  },
  {
    id: 4,
    name: 'Oud Elixir Concentré',
    category: 'Fragrances',
    price: 290,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&auto=format&fit=crop&q=60',
    tag: 'Trending'
  }
];

export default function Home({ onSelectProduct }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#0A192F] text-white min-h-screen font-sans selection:bg-yellow-500 selection:text-[#0A192F]">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden px-4 pt-12 pb-20 md:px-8 md:py-32 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center md:text-left"
          >
            <span className="text-yellow-400 font-serif tracking-widest text-xs uppercase bg-gray-900 px-3 py-1.5 rounded-full border border-yellow-500">
              The MVP Collection
            </span>
            <h1 className="mt-6 font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight">
              Redefining <span className="text-yellow-400">Modern Luxury</span>
            </h1>
            <p className="mt-4 text-gray-400 text-sm sm:text-base max-w-md mx-auto md:mx-0 font-light leading-relaxed">
              Exquisite design meets everyday sophistication. Explore a curated showcase of world-class craftsmanship.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-yellow-500 text-[#0A192F] font-bold px-8 py-3.5 rounded-full text-sm shadow-xl flex items-center justify-center gap-2 hover:bg-yellow-400 transition-colors"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>

          {/* Hero Visual Frame */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 w-full max-w-sm md:max-w-none relative aspect-[4/5] rounded-2xl overflow-hidden border border-gray-800 shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80" 
              alt="Luxury Marketplace" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* 2. SEARCH & CATEGORIES */}
      <section className="px-4 py-8 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-gray-800 pb-6">
          
          {/* Search Box */}
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-900 text-sm pl-11 pr-4 py-3 rounded-full border border-gray-800 focus:border-yellow-500 focus:outline-none transition-all text-gray-200 placeholder-gray-500"
            />
          </div>

          {/* Categories Track */}
          <div className="w-full overflow-x-auto flex items-center gap-2 pb-2 md:pb-0">
            <SlidersHorizontal className="w-4 h-4 text-yellow-500 mr-2 flex-shrink-0 hidden sm:block" />
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
                  selectedCategory === cat 
                    ? 'bg-yellow-500 text-[#0A192F] shadow-md' 
                    : 'bg-gray-900 border border-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PRODUCT GRID */}
      <section className="px-4 py-8 md:px-8 max-w-7xl mx-auto pb-24">
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={product.id}
                className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden flex flex-col justify-between group transition-all duration-300 relative"
              >
                <div>
                  {/* Badge */}
                  <span className="absolute top-3 left-3 z-10 bg-[#0A192F] border border-yellow-500 text-yellow-400 font-bold text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-md">
                    {product.tag}
                  </span>

                  {/* Image Container (Interactive) */}
                  <div 
                    onClick={() => onSelectProduct && onSelectProduct(product)}
                    className="relative aspect-square bg-gray-950 overflow-hidden cursor-pointer"
                  >
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                  </div>

                  {/* Info Blocks */}
                  <div className="p-5 pb-0">
                    <span className="text-[11px] uppercase tracking-widest text-gray-500 font-medium">{product.category}</span>
                    <h3 
                      onClick={() => onSelectProduct && onSelectProduct(product)}
                      className="font-serif text-lg font-bold text-gray-100 tracking-wide mt-1 group-hover:text-yellow-400 transition-colors cursor-pointer"
                    >
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center gap-1.5 mt-2">
                      <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                      <span className="text-xs text-gray-300 font-semibold">{product.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Lower Action Row */}
                <div className="p-5 pt-4 mt-4 flex items-center justify-between border-t border-gray-800">
                  <div>
                    <span className="text-[10px] uppercase block tracking-wider text-gray-500">Price</span>
                    <span className="text-xl font-bold text-white font-mono">${product.price}</span>
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onSelectProduct && onSelectProduct(product)}
                    className="bg-yellow-500 text-[#0A192F] p-3 rounded-xl hover:bg-yellow-400 transition-colors"
                    aria-label="View product details"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Fallback Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 border border-dashed border-gray-800 rounded-2xl mt-4">
            <p className="text-gray-400 font-light">No luxury pieces match your current selection.</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="mt-4 text-xs text-yellow-400 underline tracking-wider uppercase font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

    </div>
  );
}