import React from 'react';

const ShoppingCart = ({ cartItems, onUpdateQuantity, onRemoveItem, onProceedToCheckout }) => {
  
  // Calculate Subtotal dynamic value
  const subtotal = cartItems.reduce((acc, item) => {
    // Helper to extract numerical value from strings like "2,400 ETB"
    const numericPrice = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
    return acc + (numericPrice * item.quantity);
  }, 0);

  const deliveryFee = subtotal > 0 ? 150 : 0; // Simple manual delivery fee setting as per MVP spec
  const totalAmount = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-gray-50 text-[#0A192F] font-sans pb-16 pt-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header Label */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-5 mb-8">
          <h1 className="text-2xl font-black tracking-tight text-[#0A192F] uppercase">
            Your Shopping Cart <span className="text-yellow-400 font-black">.</span>
          </h1>
          <span className="text-sm font-semibold bg-[#0A192F] text-white px-3 py-1 rounded-xl">
            {cartItems.reduce((sum, item) => sum + item.quantity, 0)} Items
          </span>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart View State */
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300 shadow-xs animate-fade-in">
            <svg className="w-16 h-16 mx-auto text-gray-300 stroke-current fill-none stroke-1.5" viewBox="0 0 24 24">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"></path>
            </svg>
            <p className="mt-4 text-gray-500 font-bold">Your shopping cart is currently empty.</p>
            <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">Add items from the marketplace directory to begin your validation purchase checkout.</p>
          </div>
        ) : (
          /* Active Cart Grid System */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Left Side: Product Items List Block */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div 
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 shadow-xs hover:shadow-md transition-all duration-300 group"
                >
                  {/* Product Details Section */}
                  <div className="flex items-center space-x-4 w-full sm:w-auto">
                    <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 relative">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[#0A192F] line-clamp-1 group-hover:text-yellow-600 transition-colors">{item.name}</h3>
                      <p className="text-xs text-gray-400 mt-0.5">{item.category}</p>
                      <p className="text-sm font-extrabold text-[#0A192F] mt-1">{item.price}</p>
                    </div>
                  </div>

                  {/* Quantity Actions & Remove Interactions wrapper */}
                  <div className="flex items-center justify-between sm:justify-end space-x-6 w-full sm:w-auto mt-4 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                    
                    {/* Multiplier Toggles */}
                    <div className="flex items-center bg-gray-100 rounded-xl p-1 border border-gray-200/60">
                      <button 
                        onClick={() => item.quantity > 1 ? onUpdateQuantity(item.id, item.quantity - 1) : onRemoveItem(item.id)}
                        className="w-8 h-8 flex items-center justify-center font-bold text-gray-500 hover:text-[#0A192F] rounded-lg hover:bg-white transition-all active:scale-90"
                      >
                        -
                      </button>
                      <span className="w-10 text-center text-xs font-black text-[#0A192F]">
                        {item.quantity}
                      </span>
                      <button 
                        disabled={item.quantity >= item.stock}
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className={`w-8 h-8 flex items-center justify-center font-bold rounded-lg transition-all active:scale-90 ${
                          item.quantity >= item.stock 
                            ? 'text-gray-300 cursor-not-allowed' 
                            : 'text-gray-500 hover:text-[#0A192F] hover:bg-white'
                        }`}
                      >
                        +
                      </button>
                    </div>

                    {/* Trash Execution Button */}
                    <button 
                      onClick={() => onRemoveItem(item.id)}
                      className="text-gray-400 hover:text-red-500 p-2 rounded-xl hover:bg-red-50/60 transition-colors"
                      aria-label="Remove item"
                    >
                      <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                    </button>
                  </div>

                </div>
              ))}
            </div>

            {/* Right Side: Invoice Summary Card Block */}
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-yellow-400"></div>
              
              <h2 className="text-lg font-black text-[#0A192F] mb-4 tracking-tight uppercase">Order Summary</h2>
              
              <div className="space-y-3.5 text-sm pb-4 border-b border-gray-100">
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Subtotal</span>
                  <span className="text-[#0A192F] font-bold">{subtotal.toLocaleString()} ETB</span>
                </div>
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Delivery Fee</span>
                  <span className="text-[#0A192F] font-bold">{deliveryFee} ETB</span>
                </div>
              </div>

              <div className="flex justify-between items-center py-4 mb-6">
                <span className="text-base font-bold text-[#0A192F]">Total Amount</span>
                <span className="text-xl font-extrabold text-[#0A192F] tracking-tight">
                  {totalAmount.toLocaleString()} ETB
                </span>
              </div>

              {/* Action Trigger Link */}
              <button
                onClick={onProceedToCheckout}
                className="w-full bg-[#0A192F] hover:bg-yellow-400 text-white hover:text-[#0A192F] py-3.5 rounded-2xl font-bold transition-all duration-300 shadow-md hover:shadow-yellow-400/20 flex items-center justify-center space-x-2 active:scale-[0.98]"
              >
                <span>Proceed to Checkout</span>
                <svg className="w-4 h-4 fill-none stroke-current stroke-2 animate-pulse" viewBox="0 0 24 24">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>

              <p className="text-[10px] text-center text-gray-400 mt-4 font-medium uppercase tracking-wider">
                ⚡ Cash On Delivery Mode Active ⚡
              </p>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;