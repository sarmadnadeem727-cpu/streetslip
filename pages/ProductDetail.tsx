import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import { ALL_PRODUCTS } from '../constants';
import { Product, CartContextType } from '../types';
import { Star, ShieldCheck, ChevronLeft, ShoppingBag, Zap, Ruler, Truck, Banknote, Percent, X } from 'lucide-react';

import { motion, AnimatePresence } from 'framer-motion';

const SizeGuideModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const sizeData = [
    { eur: 35, uk: 2.5, us: 3.5 },
    { eur: 36, uk: 3.5, us: 4.5 },
    { eur: 37, uk: 4, us: 5 },
    { eur: 38, uk: 5, us: 6 },
    { eur: 39, uk: 5.5, us: 6.5 },
    { eur: 40, uk: 6.5, us: 7.5 },
    { eur: 41, uk: 7, us: 8 },
    { eur: 42, uk: 8, us: 9 },
    { eur: 43, uk: 9, us: 10 },
    { eur: 44, uk: 10, us: 11 },
    { eur: 45, uk: 10.5, us: 11.5 },
    { eur: 46, uk: 11, us: 12 },
    { eur: 47, uk: 12, us: 13 },
    { eur: 48, uk: 13, us: 14 },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="relative w-full max-w-4xl glass p-4 sm:p-12 rounded-[2rem] sm:rounded-[4rem] border-white/20 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-8 sm:right-8 p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all z-20"
            >
              <X className="h-6 w-6 text-white" />
            </button>

            <div className="mb-8 pr-12">
              <div className="flex items-center gap-3 mb-2">
                <Ruler className="h-6 w-6 text-[#00ff88]" />
                <h3 className="text-3xl sm:text-5xl font-extrabold italic uppercase tracking-tight text-white">Size Guide</h3>
              </div>
              <p className="text-sm sm:text-lg text-gray-400 font-medium italic">Universal fit chart for the StreetSlipp squad.</p>
            </div>

            <div className="flex-grow overflow-y-auto flex flex-col min-h-0">
              <div className="bg-white/5 p-4 rounded-2xl mb-4 flex items-center gap-3 sm:hidden shrink-0">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#00d4ff]">Scroll table to see more sizes</span>
              </div>

              <div className="overflow-x-auto no-scrollbar border border-white/5 rounded-3xl bg-black/40">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="py-5 px-6 text-[10px] font-black uppercase tracking-[0.3em] text-[#00ff88] italic sticky left-0 bg-black/90 backdrop-blur-lg z-10">EUR</th>
                      {sizeData.map(d => <th key={d.eur} className="py-5 px-4 text-sm font-black text-white italic text-center">{d.eur}</th>)}
                    </tr>
                  </thead>
                  <tbody className="font-medium italic">
                    <tr className="border-b border-white/5">
                      <td className="py-5 px-6 text-[10px] font-black uppercase tracking-[0.3em] text-[#00d4ff] sticky left-0 bg-black/90 backdrop-blur-lg z-10">UK</td>
                      {sizeData.map(d => <td key={d.eur} className="py-5 px-4 text-sm text-gray-400 text-center">{d.uk}</td>)}
                    </tr>
                    <tr className="bg-white/[0.02]">
                      <td className="py-5 px-6 text-[10px] font-black uppercase tracking-[0.3em] text-[#ff0080] sticky left-0 bg-black/90 backdrop-blur-lg z-10">US (M)</td>
                      {sizeData.map(d => <td key={d.eur} className="py-5 px-4 text-sm text-gray-400 text-center">{d.us}</td>)}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-4 sm:mt-8 p-4 sm:p-6 bg-[#050505] rounded-3xl border border-[#00ff88]/20 shrink-0 relative z-20">
              <div className="flex items-start gap-4">
                <Zap className="h-5 w-5 text-[#00ff88] mt-1 hidden sm:block" />
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  <span className="text-[#00ff88] font-black uppercase tracking-widest mr-2">Vibe Check:</span>
                  Running between sizes? Go 1 size up for that loose street look. The padded straps will mold to your fit after the first day of wear.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const ProductDetail: React.FC = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useOutletContext<CartContextType>();

  const product = ALL_PRODUCTS.find(p => p.id === productId);
  const imgRef = useRef<HTMLDivElement>(null);

  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || { name: '', hex: '' });

  const getImagesForColor = (colorHex: string) => {
    if (product?.colorImages && product.colorImages[colorHex]) {
      return product.colorImages[colorHex];
    }
    return product?.images || [];
  };

  const [activeImg, setActiveImg] = useState(getImagesForColor(selectedColor.hex)[0] || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || 0);
  const [currentImages, setCurrentImages] = useState(getImagesForColor(selectedColor.hex));
  const [isAdding, setIsAdding] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setSelectedSize(product.sizes[0]);
      window.scrollTo(0, 0);
    }
  }, [productId]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const newImages = getImagesForColor(selectedColor.hex);
    setCurrentImages(newImages);
    setActiveImg(newImages[0] || '');
  }, [selectedColor]);

  if (!product) {
    return <div className="pt-32 text-center h-screen font-black text-2xl uppercase italic">Drop not found.</div>;
  }

  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isMobile) return;
    let animationFrame: number;
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const animate = () => {
      setCurrentPos(prev => ({
        x: lerp(prev.x, targetPos.x, 0.1),
        y: lerp(prev.y, targetPos.y, 0.1)
      }));
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [targetPos, isMobile]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile || !imgRef.current) return;
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setTargetPos({ x, y });
  };

  const handleMouseLeave = () => {
    setTargetPos({ x: 0, y: 0 });
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, selectedSize, selectedColor.hex);
    setTimeout(() => setIsAdding(false), 1500);
  };

  const handleBuyNow = () => {
    const buyNowItem = {
      ...product,
      selectedSize,
      selectedColor,
      quantity: 1,
      cartId: `buynow-${product.id}-${Date.now()}`,
      image: activeImg
    };
    // Navigate to checkout with the buy now item state
    navigate('/checkout', { state: { buyNowItem } });
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="pt-24 sm:pt-32 pb-20 px-4 max-w-7xl mx-auto">
      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />

      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate(-1)}
        className="group flex items-center gap-3 text-gray-500 hover:text-[#00ff88] mb-8 sm:mb-12 transition-all font-black uppercase text-[10px] sm:text-xs tracking-[0.4em]"
      >
        <ChevronLeft className="h-4 w-4" /> Back To Vault
      </motion.button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24">
        {/* Left: Enhanced 3D Gallery */}
        <div className="space-y-6 sm:space-y-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            ref={imgRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="aspect-square glass rounded-[2.5rem] sm:rounded-[4rem] overflow-hidden group perspective-1000 relative border-white/5 cursor-crosshair shadow-2xl"
          >
            <div
              className="w-full h-full transition-transform duration-75 ease-out"
              style={{
                transform: isMobile ? 'none' : `rotateY(${currentPos.x * 25}deg) rotateX(${currentPos.y * -25}deg) scale(1.05)`,
                transformStyle: 'preserve-3d'
              }}
            >
              <img
                src={activeImg}
                alt={product.name}
                className="w-full h-full object-cover shadow-2xl drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              />
            </div>
            {!isMobile && (
              <div className="absolute top-8 left-8 glass px-5 py-2 rounded-2xl flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#00ff88] rounded-full animate-ping" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">3D Interactive</span>
              </div>
            )}
          </motion.div>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x px-2">
            {currentImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImg(img)}
                className={`w-20 h-20 sm:w-28 sm:h-28 rounded-2xl sm:rounded-3xl overflow-hidden border-2 flex-shrink-0 transition-all transform hover:scale-105 snap-center ${activeImg === img ? 'border-[#00ff88]' : 'border-transparent opacity-40 hover:opacity-100'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* More From The Vault (Static Grid) */}
          <div className="pt-8 border-t border-white/5">
            <h4 className="text-white font-black text-lg uppercase tracking-widest mb-6 italic">More From The Vault</h4>
            <div className="grid grid-cols-2 gap-4">
              {ALL_PRODUCTS.filter(p => p.id !== product.id).slice(0, 4).map((p) => (
                <Link to={`/product/${p.id}`} key={p.id} className="group relative aspect-square rounded-3xl overflow-hidden border border-white/10 hover:border-[#00ff88] transition-all">
                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                    <span className="text-xs font-black text-white uppercase leading-tight mb-2">{p.name}</span>
                    <span className="text-sm font-bold text-[#00ff88] tech-mono">Rs.{p.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center mt-4 lg:mt-0"
        >
          <div className="mb-8 sm:mb-12">
            <div className="flex flex-wrap items-center gap-4 mb-6 sm:mb-8">
              <div className="flex gap-1 text-[#00ff88]">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-3 w-3 sm:h-4 sm:h-4 fill-current" />)}
              </div>
              <span className="text-gray-600 text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-2">
                <ShieldCheck className="h-3 w-3" /> Authentic Quality
              </span>
              {discountPercent > 0 && (
                <span className="bg-[#ff0080] text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-2 shadow-lg italic">
                  <Percent className="h-3 w-3" /> {discountPercent}% OFF DROP
                </span>
              )}
            </div>
          </div>
          <div className="relative group">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl lg:text-9xl font-extrabold mb-4 sm:mb-6 tracking-widest leading-[0.9] italic uppercase relative z-10"
            >
              {product.name}
            </motion.h1>
          </div>
          <div className="flex flex-col mb-4">
            {product.originalPrice && (
              <span className="text-xl text-gray-500 line-through font-bold">Rs. {product.originalPrice}</span>
            )}
            <p className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#00ff88] italic">Rs. {product.price}</p>
          </div>


          <div className="space-y-10 sm:space-y-16 mb-12 sm:mb-20">
            {/* Colors */}
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-6">Drip Variant: <span className="text-white tracking-[0.2em]">{selectedColor.name}</span></p>
              <div className="flex gap-6 sm:gap-8 flex-wrap">
                {product.colors.map((c) => {
                  const isBlackWhite = product.id === 'nike-street' && c.hex === '#000000';
                  return (
                    <button
                      key={c.hex}
                      onClick={() => setSelectedColor(c)}
                      className={`group relative w-12 h-12 sm:w-16 sm:h-16 rounded-full transition-all p-1 ring-2 ring-offset-[6px] sm:ring-offset-[8px] ring-offset-[#000] shadow-xl ${selectedColor.hex === c.hex ? 'ring-[#00ff88] scale-110' : 'ring-white/20 opacity-50 hover:opacity-100'} ${isBlackWhite ? 'border-2 border-white' : ''}`}
                    >
                      <div
                        className={`w-full h-full rounded-full border-2 ${isBlackWhite ? 'border-white' : 'border-white/20'}`}
                        style={{ backgroundColor: c.hex }}
                      />
                      {isBlackWhite && (
                        <div className="absolute inset-0 rounded-full border border-white opacity-50" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <div className="flex justify-between mb-6 items-end">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-500">Pick EU Size</p>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#00ff88] hover:text-white transition-colors italic border-b border-[#00ff88]/50 pb-1"
                >
                  <Ruler className="h-3 w-3" /> Size Guide
                </button>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 sm:gap-4">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`h-12 sm:h-16 rounded-xl sm:rounded-2xl font-black text-sm sm:text-lg transition-all border-2 ${selectedSize === s ? 'bg-white text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.2)]' : 'glass border-white/5 hover:border-white/20'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <motion.button
                onClick={handleAddToCart}
                disabled={isAdding}
                whileHover={{ scale: 1.05, rotate: [0, -1, 1, -1, 0] }}
                whileTap={{ scale: 0.95 }}
                className={`flex-1 py-4 sm:py-10 rounded-full font-black text-lg sm:text-2xl flex items-center justify-center gap-4 transition-all shadow-2xl ${isAdding ? 'bg-gray-800' : 'glass border-[#00ff88] text-[#00ff88] hover:bg-[#00ff88]/10 uppercase italic tracking-tight'}`}
              >
                {isAdding ? <Zap className="animate-pulse h-6 w-6" /> : (
                  <>
                    <ShoppingBag className="h-6 w-6 sm:h-8 sm:h-8" /> Add to Bag
                  </>
                )}
              </motion.button>

              <button
                onClick={handleBuyNow}
                className="flex-[1.5] py-4 sm:py-10 bg-[#00ff88] text-black rounded-full font-black text-lg sm:text-2xl flex items-center justify-center gap-4 transition-all transform hover:scale-[1.02] active:scale-95 shadow-[0_0_50px_rgba(0,255,136,0.3)] uppercase italic tracking-tight"
              >
                <Zap className="h-6 w-6 sm:h-8" /> Buy Now with COD
              </button>
            </div>
          </div>

          {/* Contextual Trust Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 p-8 sm:p-12 glass rounded-[2.5rem] sm:rounded-[3.5rem] border-white/5">
            <div className="flex items-center sm:flex-col sm:items-center sm:text-center gap-4">
              <Banknote className="h-8 w-8 sm:h-10 sm:w-10 text-[#00ff88] shrink-0" />
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1 text-[#00ff88]">Pay on Delivery</p>
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest leading-tight">Fast and secure. COD Partner: PostEX.</p>
              </div>
            </div>
            <div className="flex items-center sm:flex-col sm:items-center sm:text-center gap-4">
              <Truck className="h-8 w-8 sm:h-10 sm:w-10 text-[#00d4ff] shrink-0" />
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1 text-[#00d4ff]">FREE SHIPPING</p>
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest leading-tight">PostEX Urban Delivery: 4-6 Days</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div >
    </div >
  );
};

export default ProductDetail;
