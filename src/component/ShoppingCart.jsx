import { motion } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export default function ShoppingCart({ cart, onClose, onUpdateQuantity, onRemoveItem, onNavigateToCheckout }) {
  
  // Calculate aggregate cart total valuation
  const totalCartPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop blur overlay layer */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div 
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
          className="w-screen max-w-md bg-[#0A192F] border-l border-gray-800 text-white flex flex-col shadow-2xl"
        >
          {/* Header Panel */}
          <div className="px-6 py-5 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-yellow-500" />
              <h2 className="text-lg font-serif font-bold tracking-wide">Your Vault Collection</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-900 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Core Interactive Product Feed */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-60 py-20">
                <ShoppingBag className="w-12 h-12 stroke-[1] text-gray-500 mb-4 animate-pulse" />
                <p className="text-sm font-light text-gray-400">Your shopping cart is currently empty.</p>
                <button 
                  onClick={onClose}
                  className="mt-4 text-xs text-yellow-500 underline uppercase tracking-wider font-semibold"
                >
                  Continue Browsing
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center gap-4 bg-gray-900/50 border border-gray-800 p-3 rounded-xl relative group"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 bg-gray-950 rounded-lg overflow-hidden flex-shrink-0 border border-gray-800">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>

                  {/* Metadata Stack */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-serif font-bold text-gray-200 truncate pr-6">
                      {item.name}
                    </h4>
                    <p className="text-xs text-gray-500 font-light mt-0.5">{item.category}</p>
                    <span className="text-sm font-mono font-bold text-yellow-400 block mt-1">
                      ${item.price.toLocaleString()}
                    </span>

                    {/* Micro-Counter Interactor for Quantity Upgrades */}
                    <div className="flex items-center bg-gray-950 border border-gray-800 rounded-lg p-0.5 w-max mt-2">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-gray-400 hover:text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center font-mono text-xs font-semibold text-gray-300">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-gray-400 hover:text-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Absolute Positioning Delete Node */}
                  <button 
                    onClick={() => onRemoveItem(item.id)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-400 transition-colors opacity-80 lg:opacity-0 lg:group-hover:opacity-100 p-1"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Checkout Calculations Panel Footer */}
          {cart.length > 0 && (
            <div className="p-6 bg-gray-950 border-t border-gray-800 space-y-4">
              <div className="flex items-center justify-between text-sm text-gray-400 font-light">
                <span>Shipping & Insurance</span>
                <span className="text-yellow-500 font-mono text-xs uppercase tracking-widest">Complimentary</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-900">
                <span className="text-sm font-medium text-gray-300">Estimated Valuation Total</span>
                <span className="text-2xl font-serif font-bold text-white font-mono">
                  ${totalCartPrice.toLocaleString()}
                </span>
              </div>

              {/* Secure Checkout Screen Routing CTA Button */}
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onNavigateToCheckout}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-[#0A192F] font-bold py-4 rounded-xl shadow-xl flex items-center justify-center gap-2 mt-2 transition-transform"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}