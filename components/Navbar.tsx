import React from 'react';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { Link, useOutletContext } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CartContextType } from '../types';

interface NavbarProps {
  toggleMenu: () => void;
  cartCount: number;
}

const DripParams = {
  cartX: () => window.innerWidth - 50, // Approx cart position
  cartY: 35
};

const Navbar: React.FC<NavbarProps> = ({ toggleMenu, cartCount }) => {
  const [drops, setDrops] = React.useState<{ id: number, x: number, y: number }[]>([]);

  React.useEffect(() => {
    const handleDrip = (e: CustomEvent) => {
      const { x, y } = e.detail;
      const id = Date.now();
      setDrops(prev => [...prev, { id, x, y }]);
      setTimeout(() => {
        setDrops(prev => prev.filter(d => d.id !== id));
      }, 1000);
    };

    window.addEventListener('trigger-drip' as any, handleDrip as any);
    return () => window.removeEventListener('trigger-drip' as any, handleDrip as any);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Left: Hamburger with larger target */}
            <button
              onClick={toggleMenu}
              className="group p-4 -ml-4 text-white transition-all focus:outline-none flex items-center gap-2"
              aria-label="Open Menu"
            >
              <Menu className="h-6 w-6 group-hover:text-[#00ff88] transition-colors" />
              <span className="hidden sm:inline-block text-xs font-black uppercase tracking-[0.3em]">Menu</span>
            </button>

            {/* Center: Brand */}
            <Link to="/" className="flex items-center gap-1 group py-4">
              <span className="text-xl sm:text-2xl font-black italic text-white tracking-tight">STREET</span>
              <span className="text-xl sm:text-2xl font-black italic tracking-tight bg-gradient-to-r from-[#00ff88] to-[#00d4ff] bg-clip-text text-transparent group-hover:tracking-widest transition-all duration-500">SLIPP</span>
            </Link>

            {/* Right: Cart with larger target */}
            <Link to="/cart" className="relative p-4 -mr-4 text-white transition-all glass rounded-2xl border border-white/10 hover:border-[#00ff88]/50 overflow-visible">
              <motion.div
                key={cartCount}
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.4 }}
              >
                <ShoppingBag className="h-6 w-6" />
              </motion.div>

              <AnimatePresence>
                {/* Visual +1 feedback when cart updates (simplified check, assumes count increases) */}
                <motion.span
                  key={`plus - ${cartCount} `}
                  initial={{ opacity: 0, y: 0, x: 0 }}
                  animate={{ opacity: [0, 1, 0], y: -30 }}
                  transition={{ duration: 0.8 }}
                  className="absolute top-0 right-0 text-[#00ff88] font-black text-sm pointer-events-none"
                >
                  +1
                </motion.span>
              </AnimatePresence>

              {cartCount > 0 && (
                <span className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#00ff88] text-xs font-black text-black ring-2 ring-black">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* Drip Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100]">
        {drops.map(drop => (
          <motion.div
            key={drop.id}
            initial={{ x: drop.x, y: drop.y, opacity: 1, scale: 1 }}
            animate={{ x: DripParams.cartX(), y: DripParams.cartY, opacity: 0, scale: 0.2 }}
            transition={{ duration: 0.6, ease: "backIn" }}
            className="absolute w-4 h-4 bg-[#00ff88] rounded-full shadow-[0_0_20px_#00ff88]"
            style={{ borderRadius: "0 50% 50% 50%", rotate: 45 }}
          />
        ))}
      </div>
    </>
  );
};

export default Navbar;
