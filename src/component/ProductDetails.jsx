import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, ArrowLeft, ShieldCheck, Truck, RefreshCw, Plus, Minus } from 'lucide-react';

// Mock detailed product matching our grid collection selection
const SAMPLE_PRODUCT = {
  id: 1,
  name: 'The Chrono Imperial',
  category: 'Luxury Watches',
  price: 1250,
  rating: 4.9,
  reviewsCount: 142,
  availableStock: 7, // Checked against available stock requirements
  description: 'Engineered for the modern connoisseur, The Chrono Imperial blends timeless Swiss architecture with a striking geometric silhouette. Features an onyx dial matching perfectly alongside brushed surgical-grade stainless steel housings and sapphire crystal armor plating.',
  images: [
    'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&auto=format&fit=crop&q=80'
  ],
  specs: ['Sapphire Crystal Glass', 'Swiss Quartz Movement', '50m Water Resistant', '2-Year Warranty']
};

export default function ProductDetails({ onBack, onAddToCart }) {
  const [activeImage, setActiveImage] = useState(SAMPLE_PRODUCT.images[0]);
  const [quantity, setQuantity] = useState(1);

  // Cart counter limiters handling stock constraints
  const handleQuantityChange = (type) => {
    if (type === 'increase' && quantity < SAMPLE_PRODUCT.availableStock) {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="bg-[#0A192F] text-white min-h-screen font-sans selection:bg-yellow-500 selection:text-[#0A192F] pb-24">
      
      {/* Top Sticky Controller Utility */}
      <div className="px-4 py-4 max-w-7xl mx-auto flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-yellow-400 transition-colors py-2 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Marketplace</span>
        </button>
        <span className="text-xs text-yellow-500/60 font-mono tracking-widest uppercase">Item Luxury ID: #{SAMPLE_PRODUCT.id}</span>
      </div>

      {/* Main Grid Layout Frame (Mobile-First Stacked) */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 mt-4">
        
        {/* 1. PRODUCT IMAGES CAROUSEL SUITE */}
        <section className="flex flex-col gap-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full aspect-square bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden relative shadow-2xl"
          >
            <img 
              src={activeImage} 
              alt={SAMPLE_PRODUCT.name} 
              className="w-full h-full object-cover transition-all duration-700"
            />
            {SAMPLE_PRODUCT.availableStock <= 3 && (
              <span className="absolute top-4 right-4 bg-red-900/80 text-red-200 border border-red-500/30 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-md backdrop-blur-sm">
                Only {SAMPLE_PRODUCT.availableStock} Left In Stock
              </span>
            )}
          </motion.div>

          {/* Thumbnail Strip Selector */}
          <div className="grid grid-cols-3 gap-3">
            {SAMPLE_PRODUCT.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(img)}
                className={`aspect-square rounded-xl bg-gray-900 overflow-hidden border transition-all duration-300 ${
                  activeImage === img ? 'border-yellow-500 shadow-md shadow-yellow-500/10' : 'border-gray-800 opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </section>

        {/* 2. SPECIFICATIONS & TEXT METADATA */}
        <section className="flex flex-col justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-yellow-500 font-semibold">{SAMPLE_PRODUCT.category}</span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-gray-100 mt-2">
              {SAMPLE_PRODUCT.name}
            </h1>

            {/* Social Proof Rating Meta */}
            <div className="flex items-center gap-3 mt-3 pb-6 border-b border-gray-800/60">
              <div className="flex items-center gap-1 bg-yellow-500/10 px-2.5 py-1 rounded-md border border-yellow-500/20">
                <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                <span className="text-xs text-yellow-400 font-bold">{SAMPLE_PRODUCT.rating}</span>
              </div>
              <span className="text-xs text-gray-400 font-light">Based on {SAMPLE_PRODUCT.reviewsCount} premium client reviews</span>
            </div>

            {/* Detailed Descriptive Text */}
            <div className="mt-6">
              <h3 className="text-xs uppercase tracking-widest text-gray-400 font-semibold">The Narrative</h3>
              <p className="mt-2 text-gray-400 text-sm font-light leading-relaxed">
                {SAMPLE_PRODUCT.description}
              </p>
            </div>

            {/* Item Tech Specs */}
            <div className="mt-6">
              <h3 className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-3">Specifications</h3>
              <div className="grid grid-cols-2 gap-2">
                {SAMPLE_PRODUCT.specs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-2 bg-gray-900/60 border border-gray-800/60 px-3 py-2 rounded-xl text-xs font-light text-gray-300">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3. TRANSACTION ACTIONS CARD (Sticky Feeling Container) */}
          <div className="mt-8 bg-gray-900/40 border border-gray-800 p-6 rounded-2xl flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase block tracking-wider text-gray-500">Valuation Total</span>
                <span className="text-3xl font-bold text-white font-mono">${(SAMPLE_PRODUCT.price * quantity).toLocaleString()}</span>
              </div>

              {/* Quantity Micro-Counter Interactor */}
              <div className="flex items-center bg-gray-950 border border-gray-800 rounded-xl p-1">
                <button 
                  onClick={() => handleQuantityChange('decrease')}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  aria-label="Reduce units"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-mono font-bold text-sm text-yellow-400">{quantity}</span>
                <button 
                  onClick={() => handleQuantityChange('increase')}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  aria-label="Add units"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Master CTA - Add to Cart */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onAddToCart(SAMPLE_PRODUCT, quantity)}
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-[#0A192F] font-bold py-4 rounded-xl shadow-xl flex items-center justify-center gap-3 transition-transform"
            >
              <ShoppingCart className="w-5 h-5 stroke-[2.5]" />
              <span>Add {quantity} Item{quantity > 1 ? 's' : ''} To Cart</span>
            </motion.button>

            {/* Luxury Assurances Signals Footer */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-800/60 text-[10px] text-gray-400 text-center font-light tracking-wide">
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-yellow-500/60" />
                <span>100% Certified</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-yellow-500/60" />
                <span>Secure Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RefreshCw className="w-4 h-4 text-yellow-500/60" />
                <span>Premium Returns</span>
              </div>
            </div>
          </div>

        </section>

      </div>
    </div>
  );
}