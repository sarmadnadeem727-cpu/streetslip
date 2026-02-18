import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { ShoppingCart, ArrowUpRight, Flame, Sparkles, Percent } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: number, color: string) => void;
  enableFlare?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, enableFlare = false }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  // Glitch Effect Loop
  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 5000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Trigger Drip Animation
    const event = new CustomEvent('trigger-drip', {
      detail: { x: e.clientX, y: e.clientY }
    });
    window.dispatchEvent(event);

    onAddToCart(product, product.sizes[0], product.colors[0].hex);
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      className="relative group w-full cursor-pointer perspective-1000"
      onClick={() => navigate(`/product/${product.id}`)}
      whileHover={{ scale: 1.05, z: 50, transition: { type: "spring", stiffness: 400, damping: 10 } }}
    >
      <div
        style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}
        className="absolute inset-0 pointer-events-none rounded-[4rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] group-hover:shadow-[0_40px_100px_rgba(0,255,136,0.3)] transition-shadow duration-500"
      />

      {/* Holographic Sheen Overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-20 rounded-[4rem]">
        <motion.div
          className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg]"
          initial={{ x: '-150%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ mixBlendMode: 'overlay' }}
        />
      </div>

      {/* High Heat Lens Flare */}
      {enableFlare && (
        <div className="absolute inset-0 overflow-hidden rounded-[4rem] pointer-events-none z-30">
          <motion.div
            className="absolute -top-[50%] -bottom-[50%] w-[40px] bg-white/60 blur-2xl"
            initial={{ left: "-100%", opacity: 0 }}
            whileHover={{ left: "200%", opacity: [0, 1, 0] }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            style={{ rotate: 25 }}
          />
        </div>
      )}

      <AnimatePresence>
        {isHovered && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 pointer-events-none z-[15] rounded-[4rem] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00ff88]/5 to-[#00d4ff]/5" />
            <div className="absolute top-0 left-0 w-full h-1 bg-[#00ff88] opacity-50 blur-[2px] animate-pulse" />
            <div className="scanline" />
            {/* VHS Timestamp Overlay */}
            <div className="absolute top-8 right-8 text-white/80 font-mono text-[10px] tracking-[0.2em] animate-pulse drop-shadow-md flex flex-col items-end gap-1">
              <span>PLAY ▸</span>
              <span>00:00:12</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-8 left-8 z-20 flex flex-col gap-3" style={{ transform: "translateZ(50px)" }}>
        {discountPercent > 0 && (
          <span className="bg-[#ff0080] text-white text-xs font-extrabold px-5 py-2 rounded-2xl uppercase tracking-widest flex items-center gap-2 shadow-lg italic">
            <Percent className="h-3 w-3" /> {discountPercent}% OFF
          </span>
        )}
        {product.isNew && (
          <span className="bg-[#00d4ff]/10 border border-[#00d4ff]/30 text-[#00d4ff] text-xs font-black uppercase tracking-widest px-5 py-2 rounded-2xl backdrop-blur-md flex items-center shadow-lg italic">
            <span className="w-2 h-2 rounded-full bg-[#00d4ff] animate-pulse mr-2 shadow-[0_0_10px_#00d4ff]" />
            New Drop
          </span>
        )}
        {product.isHot && (
          <span className="bg-[#ff4d4d]/10 border border-[#ff4d4d]/30 text-[#ff4d4d] text-xs font-black uppercase tracking-widest px-5 py-2 rounded-2xl backdrop-blur-md flex items-center shadow-lg italic">
            <span className="w-2 h-2 rounded-full bg-[#ff4d4d] animate-pulse mr-2 shadow-[0_0_10px_#ff4d4d]" />
            High Heat
          </span>
        )}
      </div>

      <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden bg-black/5">
        <motion.img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          animate={isGlitching ? { x: [-5, 5, -5, 0], filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(0deg)"] } : {}}
          transition={{ duration: 0.2 }}
          style={{ transform: "translateZ(20px)" }}
        />
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ scale: 0, rotate: 45 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 45 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute bottom-5 right-5 z-[40]"
              style={{ transform: "translateZ(80px)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleQuickAdd}
                className="bg-[#00ff88] text-black p-3.5 rounded-full shadow-[0_5px_20px_rgba(0,255,136,0.4)] hover:bg-white hover:scale-110 transition-all duration-300 group/btn"
                title="Quick Add"
              >
                <ShoppingCart className="h-5 w-5 group-hover/btn:animate-bounce" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-12 relative z-10" style={{ transform: "translateZ(60px)" }}>
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-3xl font-extrabold tracking-widest group-hover:text-[#00ff88] transition-colors uppercase italic leading-none bebas">{product.name}</h3>
          <ArrowUpRight className="h-6 w-6 text-gray-500 group-hover:text-[#00ff88] transition-all" />
        </div>
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through font-bold mb-1 tech-mono">Rs. {product.originalPrice}</span>
            )}
            <p className="text-2xl font-extrabold neon-text-gradient italic tracking-tight uppercase leading-none tech-mono">Rs. {product.price}</p>
          </div>
          <div className="flex -space-x-4">
            {product.colors.map((c) => (
              <div
                key={c.hex}
                className="w-8 h-8 rounded-full border-2 border-white/40 shadow-xl ring-1 ring-white/20"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;