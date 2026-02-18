
import React from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { CartContextType } from '../types';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, Banknote, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';


const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useOutletContext<CartContextType>();

  const shipping = 0;
  const finalTotal = cartTotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-48 px-4 flex flex-col items-center justify-center text-center reveal">
        <div className="w-40 h-40 glass rounded-[3rem] flex items-center justify-center mb-12 animate-float">
          <ShoppingBag className="h-16 w-16 text-[#00ff88]" />
        </div>
        <h1 className="text-5xl sm:text-7xl font-black mb-8 tracking-tight uppercase italic">BAG IS EMPTY.</h1>
        <p className="text-2xl text-gray-500 mb-16 max-w-lg font-medium italic">Your feet deserve better. Secure the vibe with free shipping on all orders.</p>
        <Link
          to="/collection"
          className="px-16 py-8 neon-bg-gradient text-black font-black text-2xl rounded-[2.5rem] hover:scale-105 transition-all shadow-[0_0_50px_rgba(0,255,136,0.3)] uppercase italic"
        >
          Explore Drops
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 sm:pt-40 pb-32 px-4 max-w-7xl mx-auto reveal">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
        <div>
          <span className="text-[#00ff88] font-black text-xs tracking-[0.5em] uppercase mb-4 block">Ready to Flex?</span>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight uppercase italic">YOUR BAG</h1>
        </div>
        <div className="glass px-8 py-5 rounded-3xl flex items-center gap-4 border-[#00ff88]/20 bg-[#00ff88]/5">
          <Truck className="h-6 w-6 text-[#00ff88]" />
          <p className="font-black text-[#00ff88] uppercase tracking-widest text-xs italic">FREE LAUNCH WEEK SHIPPING ACTIVE!</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-8">
          {cart.map((item) => (
            <div key={item.cartId} className="group flex flex-col sm:flex-row gap-10 glass p-10 rounded-[3rem] border-white/5 hover:border-[#00ff88]/30 transition-all">
              <div className="w-full sm:w-48 aspect-square rounded-[2rem] overflow-hidden flex-shrink-0 relative">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              <div className="flex-1 flex flex-col justify-between py-2">
                <div>
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <Link to={`/product/${item.id}`} className="text-3xl font-black hover:text-[#00ff88] transition-colors uppercase tracking-tight italic">{item.name}</Link>
                    <p className="text-3xl font-black neon-text-gradient italic">Rs. {item.price * item.quantity}</p>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-6">
                    <div className="glass px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.2)]" style={{ backgroundColor: item.selectedColor.hex }} />
                      {item.selectedColor.name}
                    </div>
                    <div className="glass px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest">
                      Size {item.selectedSize}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-12">
                  <div className="flex items-center glass rounded-2xl border-white/10 overflow-hidden p-1">
                    <button
                      onClick={() => updateQuantity(item.cartId, -1)}
                      className="p-4 hover:bg-white/5 text-white transition-all rounded-xl disabled:opacity-20"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-5 w-5" />
                    </button>
                    <span className="px-10 font-black text-2xl">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.cartId, 1)}
                      className="p-4 hover:bg-white/5 text-white transition-all rounded-xl"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.cartId)}
                    className="p-5 glass rounded-2xl text-gray-500 hover:text-red-500 hover:bg-red-500/10 transition-all border-transparent hover:border-red-500/20"
                  >
                    <Trash2 className="h-7 w-7" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-4">
          <motion.div
            initial={{ opacity: 0, y: -20, scaleY: 0.95, transformOrigin: "top" }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="glass p-12 rounded-[3.5rem] sticky top-32 border-white/10"
          >
            <h2 className="text-3xl font-black mb-12 tracking-tight uppercase italic">Bag Total</h2>

            <div className="space-y-8 mb-10">
              <div className="flex justify-between text-gray-400 font-bold uppercase text-xs tracking-widest italic">
                <span>Subtotal</span>
                <span className="text-white font-black">Rs. {cartTotal}</span>
              </div>
              <div className="flex justify-between items-center text-gray-400 font-bold uppercase text-xs tracking-widest italic">
                <span className="flex items-center gap-2">Shipping <Sparkles className="h-3 w-3 text-[#00ff88]" /></span>
                <span className="text-[#00ff88] font-black tracking-[0.2em] italic uppercase">FREE LAUNCH</span>
              </div>
              <div className="flex justify-between items-center py-6 border-t border-white/5">
                <span className="text-2xl font-black uppercase tracking-tight italic">Total</span>
                <span className="text-5xl font-black neon-text-gradient italic">Rs. {finalTotal}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="w-full py-8 neon-bg-gradient text-black font-black text-2xl rounded-[2rem] hover:scale-[1.05] transition-all shadow-[0_0_40px_rgba(0,255,136,0.3)] flex items-center justify-center gap-4 uppercase italic"
            >
              Checkout <ArrowRight className="h-8 w-8" />
            </Link>

            <div className="mt-12 p-6 bg-white/5 rounded-3xl border border-white/5 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <Banknote className="h-5 w-5 text-[#00ff88]" />
                <span className="text-[10px] font-black uppercase tracking-widest">Cash on Delivery</span>
              </div>
              <div className="flex items-center gap-4">
                <Truck className="h-5 w-5 text-[#00d4ff]" />
                <span className="text-[10px] font-black uppercase tracking-widest italic">Free Shipping Unlocked</span>
              </div>
            </div>


          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
