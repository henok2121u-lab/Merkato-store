import React, { useState } from 'react';

// Mock Data for MVP Validation
const CATEGORIES = ['All', 'Electronics', 'Fashion', 'Home & Living', 'Essentials'];

const MOCK_PRODUCTS = [
  { id: 1, name: 'Premium Leather Boots', category: 'Fashion', price: '2,400 ETB', image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=500&q=80', stock: 5 },
  { id: 2, name: 'Wireless Noise-Canceling Headphones', category: 'Electronics', price: '4,500 ETB', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80', stock: 12 },
  { id: 3, name: 'Minimalist Ergonomic Chair', category: 'Home & Living', price: '8,900 ETB', image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=500&q=80', stock: 3 },
  { id: 4, name: 'Smart Fitness Watch Series 5', category: 'Electronics', price: '3,200 ETB', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80', stock: 0 }, // Out of stock example
  { id: 5, name: 'Vintage Denim Jacket', category: 'Fashion', price: '1,850 ETB', image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=500&q=80', stock: 8 },
  { id: 6, name: 'Hydro-Insulated Water Flask', category: 'Essentials', price: '950 ETB', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=500&q=80', stock: 25 },
];

const HomePage = ({ onAddToCart }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter Logic matching Search & Category criteria
  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 text-[#0A192F] font-sans pb-16">
      
      {/* 1. Hero & Search Banner Section */}
      <section className="relative bg-[#0A192F] text-white py-20 px-4 overflow-hidden">
        {/* Subtle Floating Decorative Orbs */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-5 right-10 w-80 h-80 bg-yellow-400/5 rounded-full blur-2xl animate-bounce duration-[8s]"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <span className="text-yellow-400 font-bold uppercase tracking-widest text-sm inline-block animate-fade-in">
            Welcome to Merkato Store
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Discover Exceptional Products, <br />
            Delivered Straight To Your Door.
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
            Your neighborhood MVP marketplace. Safe browsing, fast discovery, and hassle-free Cash on Delivery.
          </p>

          {/* Search Bar Feature */}
          <div className="max-w-md mx-auto pt-4">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search products by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-5 pr-12 py-3.5 bg-[#112240] border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-yellow-400 transition-colors">
                <svg className="w-5 h-5 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Live Interactive Product Categories Row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <h2 className="text-xl font-bold tracking-tight text-[#0A192F]">Browse Categories</h2>
          <span className="text-xs text-gray-400 font-medium bg-gray-100 px-2.5 py-1 rounded-full">
            {filteredProducts.length} items found
          </span>
        </div>
        
        <div className="flex space-x-2 overflow-x-auto pt-4 pb-2 no-scrollbar scroll-smooth">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-300 transform active:scale-95 ${
                selectedCategory === category
                  ? 'bg-yellow-400 text-[#0A192F] shadow-md shadow-yellow-400/20 translate-y-[-2px]'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-yellow-400 hover:text-[#0A192F]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* 3. Dynamic Product Listing Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <svg className="w-12 h-12 mx-auto text-gray-300 stroke-current fill-none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="mt-4 text-gray-500 font-medium">No products match your current filters.</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="mt-2 text-sm text-yellow-600 font-bold hover:underline"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => {
              const isOutOfStock = product.stock === 0;

              return (
                <div 
                  key={product.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1"
                >
                  {/* Product Image Wrapper */}
                  <div className="relative aspect-square bg-gray-100 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    
                    {/* Floating Badge Tag */}
                    <span className="absolute top-3 left-3 bg-[#0A192F] text-white text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded-md z-10">
                      {product.category}
                    </span>

                    {/* Stock Alert Overlay */}
                    {isOutOfStock && (
                      <div className="absolute inset-0 bg-[#0A192F]/70 backdrop-blur-xs flex items-center justify-center z-10">
                        <span className="text-yellow-400 font-bold uppercase tracking-wider text-xs border-2 border-yellow-400 px-3 py-1 rounded-md rotate-[-5deg]">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Product Details Block */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="font-bold text-base text-[#0A192F] line-clamp-2 group-hover:text-yellow-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">
                        {!isOutOfStock ? `Available Stock: ${product.stock} items` : 'Restocking soon'}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-lg font-extrabold text-[#0A192F]">
                        {product.price}
                      </span>
                      
                      {/* Dynamic Add to Cart Button */}
                      <button
                        disabled={isOutOfStock}
                        onClick={() => onAddToCart && onAddToCart(product)}
                        className={`p-2.5 rounded-xl transition-all duration-300 flex items-center justify-center ${
                          isOutOfStock 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-yellow-400 text-[#0A192F] hover:bg-[#0A192F] hover:text-white hover:rotate-[360deg]'
                        }`}
                        aria-label="Add to cart"
                      >
                        <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                          <circle cx="9" cy="21" r="1"></circle>
                          <circle cx="20" cy="21" r="1"></circle>
                          <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;