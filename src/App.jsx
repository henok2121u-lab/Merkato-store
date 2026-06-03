import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './component/Navbar';
import Home from './component/Home';
import ProductDetails from './component/ProductDetails';
import ShoppingCart from './component/ShoppingCart';
import Checkout from './component/Checkout';
import OrderTracking from './component/OrderTracking';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // App routing switch state ('marketplace', 'checkout', or 'tracking')
  const [currentView, setCurrentView] = useState('marketplace');
  
  // Active transaction tracking parameters
  const [activeOrder, setActiveOrder] = useState({
    id: null,
    status: 'Pending'
  });

  // 1. ADD PRODUCTS WORKFLOW
  const handleAddToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
    // Trigger slide-out tray automatically for optimal UX confirmation
    setIsCartOpen(true);
  };

  // 2. UPDATE QUANTITIES WORKFLOW
  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item))
    );
  };

  // 3. REMOVE PRODUCTS WORKFLOW
  const handleRemoveItem = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // 4. POST-CHECKOUT FULL ORDER INITIATION
  const handleOrderPlacement = () => {
    const generatedOrderId = `KM-${Math.floor(100000 + Math.random() * 900000)}`;
    
    // Instantiate tracking data framework starting at 'Pending'
    setActiveOrder({
      id: generatedOrderId,
      status: 'Pending'
    });
    
    // Wipe local checkout state and swap routing over onto tracking monitor
    setCart([]);
    setCurrentView('tracking');

    // DEV ENGINE: Cycles through remaining status states sequentially for demo purposes
    const statusCycle = ['Processing', 'Shipped', 'Delivered'];
    statusCycle.forEach((nextStatus, index) => {
      setTimeout(() => {
        setActiveOrder(prev => ({ ...prev, status: nextStatus }));
      }, (index + 1) * 6000); // Transitions to a new phase every 6 seconds
    });
  };

  // Compute absolute items inside the cart array stack
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0A192F] text-white overflow-x-hidden antialiased">
      
      {/* Navigation Header - Passing total count handler */}
      <Navbar 
        cartCount={totalCartCount} 
        onCartClick={() => setIsCartOpen(true)} 
      />

      {/* Main content routing switch matrix */}
      <main className="transition-all duration-300">
        {currentView === 'tracking' ? (
          <OrderTracking 
            orderId={activeOrder.id}
            status={activeOrder.status}
            onBack={() => {
              setCurrentView('marketplace');
              setSelectedProduct(null);
            }}
          />
        ) : currentView === 'checkout' ? (
          <Checkout 
            cart={cart}
            onBack={() => setCurrentView('marketplace')}
            onClearCart={handleOrderPlacement} // Direct placement handler link
          />
        ) : selectedProduct ? (
          <ProductDetails 
            product={selectedProduct} 
            onBack={() => setSelectedProduct(null)} 
            onAddToCart={handleAddToCart}
          />
        ) : (
          <Home 
            onSelectProduct={(product) => setSelectedProduct(product)} 
            onAddToCart={handleAddToCart}
          />
        )}
      </main>

      {/* Shopping Cart Drawer Slider Overlay Layer */}
      <AnimatePresence>
        {isCartOpen && (
          <ShoppingCart 
            cart={cart}
            onClose={() => setIsCartOpen(false)}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onNavigateToCheckout={() => {
              setIsCartOpen(false);
              setCurrentView('checkout');
            }}
          />
        )}
      </AnimatePresence>

      <footer className="bg-[#071120] text-gray-500 text-xs py-8 text-center border-t border-yellow-500/5 tracking-widest font-light">
        <p>© {new Date().getFullYear()} KE MERKATO. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}