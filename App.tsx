
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Collection from './pages/Collection';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import Reviews from './pages/Reviews';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import TrackOrder from './pages/TrackOrder';
import { CartItem, Product, CartContextType } from './types';
import ToastContainer, { Toast } from './components/ToastContainer';
import { motion } from 'framer-motion';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};



const Layout: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('streetslipp_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    localStorage.setItem('streetslipp_cart', JSON.stringify(cart));
  }, [cart]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const showToast = (message: string, action?: { label: string; onClick: () => void }, duration = 4000) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => {
      // Prevent duplicates
      if (prev.some(t => t.message === message)) return prev;
      return [...prev, { id, message, type: 'success', action, duration }];
    });
    setTimeout(() => removeToast(id), duration);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addToCart = (product: Product, size: number, colorHex: string) => {
    const color = product.colors.find(c => c.hex === colorHex) || product.colors[0];
    const cartId = `${product.id}-${size}-${color.hex}`;
    setCart(prev => {
      const existing = prev.find(item => item.cartId === cartId);
      if (existing) {
        return prev.map(item =>
          item.cartId === cartId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, {
        ...product,
        selectedSize: size,
        selectedColor: color,
        quantity: 1,
        cartId,
        image: product.images[0]
      }];
    });
    showToast(`Added ${product.name} to bag`, { label: "VIEW BAG", onClick: () => navigate('/cart') });
  };

  const removeFromCart = (cartId: string) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (cartId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.cartId === cartId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const contextValue: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
    isMenuOpen,
    toggleMenu,
    showToast
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <Navbar toggleMenu={toggleMenu} cartCount={cartCount} />
      <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <main className="flex-grow bg-[#050505] relative z-10">
        <Outlet context={contextValue} />
      </main>

      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="collection" element={<Collection />} />
          <Route path="product/:productId" element={<ProductDetail />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="track-order" element={<TrackOrder />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-of-service" element={<TermsOfService />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
