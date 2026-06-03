import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck, CreditCard, ShoppingBag, CheckCircle } from 'lucide-react';

export default function Checkout({ cart, onBack, onClearCart }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const VAT = subtotal * 0.15; // 15% Standard luxury tax
  const finalTotal = subtotal + VAT;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) return;

    setIsSubmitting(true);

    // Simulate an API gateway processing latency delay
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderComplete(true);
    }, 2000);
  };

  // SUCCESS STATE SCREEN DISPLAY BREAKOUT
  if (orderComplete) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 text-center font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md bg-gray-900 border border-gray-800 p-8 rounded-2xl shadow-2xl space-y-6"
        >
          <div className="w-16 h-16 bg-yellow-500/10 border border-yellow-500/20 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-yellow-500 animate-pulse" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-serif font-bold text-white tracking-wide">Order Successfully Placed</h2>
            <p className="text-sm text-gray-400 font-light leading-relaxed">
              Thank you for choosing <span className="text-yellow-400 font-medium">KE MERKATO</span>, {formData.name}. Your luxury delivery allocation process has been initialized.
            </p>
          </div>
          <div className="bg-gray-950 p-4 rounded-xl border border-gray-800 text-left space-y-1.5 font-mono text-xs text-gray-400">
            <p><span className="text-gray-500">Recipient:</span> {formData.name}</p>
            <p><span className="text-gray-500">Contact:</span> {formData.phone}</p>
            <p><span className="text-gray-500">Destination:</span> {formData.address}</p>
            <p><span className="text-gray-500">Total Charged:</span> ${finalTotal.toLocaleString()}</p>
          </div>
          <button
            onClick={() => {
              onClearCart();
              onBack(); // Direct routing redirect back to front marketplace grid
            }}
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-[#0A192F] font-bold py-3.5 rounded-xl transition-all"
          >
            Return to Marketplace
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#0A192F] text-white min-h-screen font-sans pb-24">
      {/* Return Navigation Anchor */}
      <div className="px-4 py-4 max-w-7xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-yellow-400 transition-colors py-2 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Return to Cart Review</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-10 mt-2">
        {/* LEFT COLUMN: SECURE INTAKE DELIVERY FORM FORM */}
        <section className="lg:col-span-7 bg-gray-900/40 border border-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl h-fit">
          <h2 className="text-xl font-serif font-bold tracking-wide border-b border-gray-800 pb-4 mb-6 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-yellow-500" /> Secure Luxury Checkout
          </h2>

          <form onSubmit={handlePlaceOrder} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Customer Full Name *</label>
              <input 
                type="text" 
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Alexander Mercer"
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-500 text-gray-200 placeholder:text-gray-600 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Phone Number *</label>
              <input 
                type="tel" 
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="e.g., +1 (555) 019-2831"
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-500 text-gray-200 placeholder:text-gray-600 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Delivery Address *</label>
              <input 
                type="text" 
                name="address"
                required
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Street address, suite, floor"
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-500 text-gray-200 placeholder:text-gray-600 transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">City</label>
                <input 
                  type="text" 
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Paris"
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-500 text-gray-200 placeholder:text-gray-600 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Zip/Postal Code</label>
                <input 
                  type="text" 
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  placeholder="75001"
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-500 text-gray-200 placeholder:text-gray-600 transition-colors"
                />
              </div>
            </div>

            <div className="pt-4">
              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={isSubmitting || cart.length === 0}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-[#0A192F] font-bold py-4 rounded-xl shadow-xl flex items-center justify-center gap-2 disabled:opacity-40 transition-opacity"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-[#0A192F] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 stroke-[2.5]" />
                    <span>Place Order (${finalTotal.toLocaleString()})</span>
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </section>

        {/* RIGHT COLUMN: DYNAMIC ORDER SUMMARY LEDGER */}
        <section className="lg:col-span-5 space-y-6">
          <div className="bg-gray-950 border border-gray-800 p-6 rounded-2xl shadow-xl lg:sticky lg:top-6">
            <h3 className="text-sm font-serif font-bold uppercase tracking-wider text-gray-300 border-b border-gray-900 pb-3 mb-4 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-yellow-500" /> Order Summary
            </h3>

            {/* Micro-feed item scroll mapping */}
            <div className="max-h-60 overflow-y-auto divide-y divide-gray-900 pr-1 space-y-3 pb-3 mb-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3 pt-3 first:pt-0">
                  <div className="w-12 h-12 bg-gray-900 rounded-lg overflow-hidden flex-shrink-0 border border-gray-800">
                    <img src={item.image || item.images?.[0]} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-gray-300 truncate">{item.name}</h4>
                    <p className="text-[11px] text-gray-500 font-mono mt-0.5">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-yellow-400">
                    ${(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom aggregate ledger valuations */}
            <div className="space-y-2 border-t border-gray-900 pt-4 text-xs font-light text-gray-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-gray-200">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Luxury Vault Shipping</span>
                <span className="text-yellow-500 font-mono text-[10px] uppercase tracking-widest">Complimentary</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated VAT (15%)</span>
                <span className="font-mono text-gray-200">${VAT.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-medium text-gray-200 pt-3 border-t border-gray-900">
                <span>Total Valuation</span>
                <span className="text-lg font-serif font-bold text-white font-mono">${finalTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}