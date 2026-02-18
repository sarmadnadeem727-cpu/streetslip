import React, { useMemo, useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Product, CartContextType } from '../types';
import ProductCard from '../components/ProductCard';
import { ALL_PRODUCTS } from '../constants';
import { SlidersHorizontal, X } from 'lucide-react';

const Collection: React.FC = () => {
  const { addToCart, showToast } = useOutletContext<CartContextType>();
  const [filterPrice, setFilterPrice] = useState<'all' | 'low' | 'high'>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    showToast("FREE SHIPPING FOR LAUNCH WEEK 🚀", undefined, 8000);
  }, []);

  const products = useMemo(() => {
    let data = [...ALL_PRODUCTS];

    if (filterPrice === 'low') {
      return data.sort((a, b) => a.price - b.price);
    }
    if (filterPrice === 'high') {
      return data.sort((a, b) => b.price - a.price);
    }
    return data;
  }, [filterPrice]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="w-full min-h-screen pt-20">
      {/* Hero Banner - Spacing Reduced */}
      <div className="w-full pt-16 pb-6 px-4 border-b border-white/5 bg-gradient-to-b from-[#00ff88]/5 to-transparent">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
        >
          <div>
            <div className="text-sm sm:text-base font-bold text-[#00ff88] mb-2 uppercase tracking-[0.6em] text-left">The Vault</div>
            <h1 className="text-5xl sm:text-7xl md:text-[9rem] font-black tracking-widest uppercase italic leading-[0.9] sm:leading-[0.8] text-left">THE DROPS</h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all group"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#00ff88]" />
              <span className="text-xs font-bold uppercase tracking-widest">Filter</span>
            </button>
            <div className="px-4 py-2 border border-white/10 rounded-full">
              <span className="text-xs font-bold text-[#00ff88] tracking-widest">{products.length} ITEMS</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Grid - Moved Up */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12"
        >
          {products.map((p) => (
            <motion.div key={p.id} variants={itemVariants}>
              <ProductCard product={p} onAddToCart={addToCart} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Filter Drawer - Slide Effect */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 z-[70] bg-[#0A0A0A] border-l border-white/10 p-8 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-black italic uppercase tracking-wider">FILTERS</h2>
                <button onClick={() => setIsFilterOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-[#00ff88] uppercase tracking-[0.2em] mb-4">Sort By Price</h3>
                  {['all', 'low', 'high'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setFilterPrice(type as any)}
                      className={`w-full text-left px-5 py-4 rounded-xl border transition-all uppercase tracking-wider text-sm font-bold ${filterPrice === type
                        ? 'bg-white text-black border-white'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30'
                        }`}
                    >
                      {type === 'all' ? 'Featured' : type === 'low' ? 'Price: Low to High' : 'Price: High to Low'}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Collection;