import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Navbar from './component/Navbar';
import Home from './component/Home';
import ProductDetails from './component/ProductDetails';
import ShoppingCart from './component/ShoppingCart';
import Checkout from './component/Checkout';
import OrderTracking from './component/OrderTracking';

import AdminDashboard from "./admin/Dashboard";





export default function App() {
  const navigate = useNavigate();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [activeOrder, setActiveOrder] = useState({
    id: null,
    status: 'Pending'
  });

  // ADD TO CART
  const handleAddToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prevCart, { ...product, quantity }];
    });

    setIsCartOpen(true);
  };

  // UPDATE QUANTITY
  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // REMOVE ITEM
  const handleRemoveItem = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== productId)
    );
  };

  // PLACE ORDER
  const handleOrderPlacement = () => {
    const generatedOrderId = `KM-${Math.floor(100000 + Math.random() * 900000)}`;

    setActiveOrder({
      id: generatedOrderId,
      status: 'Pending'
    });

    setCart([]);

    navigate('/tracking');

    // Simulate status updates (demo only)
    const statusCycle = ['Processing', 'Shipped', 'Delivered'];

    statusCycle.forEach((nextStatus, index) => {
      setTimeout(() => {
        setActiveOrder((prev) => ({
          ...prev,
          status: nextStatus
        }));
      }, (index + 1) * 6000);
    });
  };

  const totalCartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[#0A192F] text-white overflow-x-hidden antialiased">

      {/* Navbar */}
      <Navbar
        cartCount={totalCartCount}
        onCartClick={() => setIsCartOpen(true)}
      />

      {/* ROUTES */}
      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={
            <Home
              onSelectProduct={(product) => {
                setSelectedProduct(product);
                navigate(`/product/${product.id}`);
              }}
              onAddToCart={handleAddToCart}
            />
          }
        />

        {/* PRODUCT DETAILS */}
        <Route
          path="/product/:id"
          element={
            <ProductDetails
              product={selectedProduct}
              onBack={() => navigate('/')}
              onAddToCart={handleAddToCart}
            />
          }
        />

        {/* CHECKOUT */}
        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              onBack={() => navigate('/')}
              onClearCart={handleOrderPlacement}
            />
          }
        />

        {/* TRACKING */}
        <Route
          path="/tracking"
          element={
            <OrderTracking
              orderId={activeOrder.id}
              status={activeOrder.status}
              onBack={() => navigate('/')}
            />
          }
        />


       
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        

      </Routes>

      {/* CART DRAWER (global overlay) */}
      <AnimatePresence>
        {isCartOpen && (
          <ShoppingCart
            cart={cart}
            onClose={() => setIsCartOpen(false)}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onNavigateToCheckout={() => {
              setIsCartOpen(false);
              navigate('/checkout');
            }}
          />
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="bg-[#071120] text-gray-500 text-xs py-8 text-center border-t border-yellow-500/5 tracking-widest font-light">
        <p>© {new Date().getFullYear()} KE MERKATO. ALL RIGHTS RESERVED.</p>
      </footer>

    </div>
  );
}