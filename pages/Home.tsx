import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { ArrowRight, PlayCircle, Zap, Flame, Lock, MessageSquare, ShieldCheck, Truck, Sparkles, Star, Waves } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useVelocity, useAnimationFrame, useMotionValue } from 'framer-motion';

import { CartContextType } from '../types';
import ProductCard from '../components/ProductCard';
import { ALL_PRODUCTS, TRENDING_PRODUCTS } from '../constants';
import { VHSOverlay } from '../components/HeroEffects';
import { RGBGlitchTitle, GraffitiSpotlight, HypeMeter, HypeZipTie, SprayCanIcon, FloatingCrown, MagneticIconWrapper, SmolderingPulsator, HeatHazeDef, BoomboxIcon } from '../components/StreetCultureEffects';

const MagneticWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.5);
    y.set((clientY - centerY) * 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="w-full flex justify-center cursor-pointer"
    >
      {children}
    </motion.div>
  );
};

const InteractiveTitle = ({ text, className = "text-white", hoverColors = ["#00d4ff", "#00ff88", "#d946ef"] }: { text: string, className?: string, hoverColors?: string[] }) => {
  return (
    <span className="inline-flex flex-wrap justify-center gap-1">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          whileHover={{
            y: -15,
            rotate: Math.random() * 10 - 5,
            scale: 1.1,
            color: hoverColors[Math.floor(Math.random() * hoverColors.length)],
            textShadow: "0 0 25px currentColor"
          }}
          whileTap={{ scale: 0.9, color: "#ff0080" }}
          transition={{ type: "spring", stiffness: 300 }}
          className={`inline-block cursor-pointer select-none ${className}`}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};

const Home: React.FC = () => {
  const { addToCart, showToast } = useOutletContext<CartContextType>();
  const { scrollY } = useScroll();
  const [marqueeSpeed, setMarqueeSpeed] = React.useState(20);
  const [isBrandingHovered, setIsBrandingHovered] = React.useState(false);

  const yParallax = useTransform(scrollY, [0, 1000], [0, 300]);
  const scaleHero = useTransform(scrollY, [0, 500], [1, 0.9]);

  const handleShopClick = () => {
    setMarqueeSpeed(2); // Super fast burst
    setTimeout(() => setMarqueeSpeed(20), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 20 } }
  };

  const marqueeText = "FREE SHIPPING FOR LAUNCH WEEK ONLY • TRUST THE DRIP • SECURED COD BY POSTEX • LIMITED DROPS LIVE NOW • FREE SHIPPING FOR LAUNCH WEEK ONLY • ";

  return (
    <div className="w-full relative min-h-screen">
      {/* Moving Tag Marquee */}
      <div className="fixed top-16 left-0 w-full z-[30] overflow-hidden bg-white/5 backdrop-blur-md border-b border-white/10 py-3">
        <div
          className="animate-marquee whitespace-nowrap"
          style={{ animationDuration: `${marqueeSpeed}s` } as React.CSSProperties}
        >
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.5em] text-[#00ff88] px-4 italic">
            {marqueeText}{marqueeText}
          </span>
        </div>
      </div>

      {/* Magnetic Background Parallax */}
      <motion.div style={{ y: yParallax }} className="bg-street-text">STREET</motion.div>

      {/* Street Culture Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 pt-16 pb-32 sm:pb-60 bg-[#050505]">
        <GraffitiSpotlight />
        <VHSOverlay />

        <div className="relative z-10 text-center max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, ease: "linear" }}
            className="inline-flex items-center gap-3 px-6 sm:px-8 py-2.5 sm:py-3 border border-[#00ff88]/30 bg-[#00ff88]/5 rounded-full mb-8 sm:mb-10"
          >
            <div className="w-5 h-5 text-[#00ff88]">
              <Sparkles className="w-full h-full animate-pulse" />
            </div>
            <span className="text-[#00ff88] font-mono font-bold text-[10px] sm:text-sm tracking-[0.2em] uppercase">VERIFIED AUTHENTIC • POSTEX COD</span>
          </motion.div>

          <div className="flex justify-center items-center gap-4 sm:gap-8 mb-10 sm:mb-14 relative z-20">
            <HypeMeter />
            <div className="relative">
              <RGBGlitchTitle text="STREET SLIPP" />
            </div>
            <HypeZipTie />
          </div>

          <p className="relative z-20 text-base sm:text-2xl text-gray-300 mb-8 sm:mb-12 font-medium max-w-3xl mx-auto leading-relaxed px-6 tracking-wide italic">
            Elevate your lounge game. <br className="hidden sm:block" />
            Engineered for the <span className="text-[#00ff88] font-bold">concrete jungle</span>, crafted for the <span className="text-[#00d4ff] font-bold">clouds</span>. <br />
            <span className="uppercase font-black tracking-widest text-white not-italic">No cap, just pure comfort.</span>
          </p>

          <div className="relative z-20 flex justify-center">
            <Link to="/collection" onClick={handleShopClick}>
              <motion.div
                whileHover={{
                  scale: 1.15,
                  boxShadow: "0 0 50px rgba(0,255,136,0.6)",
                  y: -10
                }}
                whileTap={{ scale: 0.9 }}
                className="px-10 py-5 bg-white text-black font-black text-2xl sm:text-4xl flex items-center justify-center gap-3 transition-all rounded-full shadow-[0_0_30px_rgba(255,255,255,0.3)] group hover:bg-[#00ff88]"
              >
                <span className="font-mono tracking-wider italic uppercase">Shop The Drop</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Drop Section */}
      <section className="py-24 sm:py-40 relative overflow-hidden bg-gradient-to-r from-[#000000] to-[#001a33] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Link to="/product/vortex-shadow" className="block group cursor-pointer">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#00d4ff]/10 rounded-full blur-[80px]" />
              <div className="glass p-4 rounded-[4rem] relative z-10 transition-transform duration-500 group-hover:scale-[1.02]">
                <img
                  src="/images/phantom-blue.jpg"
                  alt="Vortex Shadow Core Blue"
                  className="w-full h-full object-cover rounded-[3rem] shadow-2xl"
                />
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div>
              <span className="text-[#00d4ff] font-black text-sm tracking-[0.5em] uppercase mb-4 block">Blue Core Innovation</span>
              <h2 className="text-6xl sm:text-8xl font-black italic uppercase tracking-tight leading-none mb-8">
                THE <span className="text-[#00d4ff]">PHANTOM</span> BLUE
              </h2>
              <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed font-medium italic mb-10">
                The singular, high-voltage 'Core Blue' article. Engineered for impact and powered by our 'Aqua-Cloud' foam core. No distractions, just elite street style.
              </p>
            </div>

            <div className="flex flex-wrap gap-8 items-center">
              <div className="flex items-center gap-4 px-6 py-4 glass rounded-3xl border-[#00d4ff]/20">
                {/* <Ticket className="h-6 w-6 text-[#00d4ff]" /> */}
                <span className="text-xs font-black uppercase tracking-widest italic text-gray-300">Pure Monochromatic Core</span>
              </div>
              <div className="flex items-center gap-4 px-6 py-4 glass rounded-3xl border-[#00d4ff]/20">
                {/* <SprayCan className="h-6 w-6 text-[#00d4ff]" /> */}
                <span className="text-xs font-black uppercase tracking-widest italic text-gray-300">Blue-Cloud Comfort</span>
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/product/vortex-shadow"
                className="px-12 py-7 bg-[#00d4ff] text-black font-black text-2xl rounded-full transition-all inline-flex items-center gap-5 shadow-[0_20px_50px_rgba(0,212,255,0.3)] uppercase italic"
              >
                Secure The Pair <ArrowRight className="h-7 w-7" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Collection Preview / High Heat Section */}
      <section className="py-20 sm:py-32 px-4 relative z-10 bg-[#050505] border-t border-white/5 overflow-hidden">
        <SmolderingPulsator />
        <HeatHazeDef />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 sm:mb-24 gap-12 relative">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              className="relative z-10 flex flex-col items-center md:items-start gap-8"
            >
              {/* Floating Badges */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="flex gap-3"
              >
                <span className="px-4 py-1.5 bg-[#ff4d4d] text-white text-[10px] font-bold rounded-full transform -rotate-6 shadow-[0_0_20px_#ff4d4d]">
                  25% OFF
                </span>
                <span className="px-4 py-1.5 bg-[#ff8c00] text-black text-[10px] font-bold rounded-full transform rotate-3 shadow-[0_0_20px_#ff8c00]">
                  NEW DROP
                </span>
              </motion.div>

              <div className="flex items-center gap-6 sm:gap-10">
                <div style={{ filter: 'url(#heat-haze)' }}>
                  <RGBGlitchTitle text="HIGH HEAT" />
                </div>
                <MagneticIconWrapper>
                  <div className="p-4 glass rounded-[2rem] bg-white/5 border-white/10">
                    <BoomboxIcon />
                  </div>
                </MagneticIconWrapper>
              </div>
            </motion.div>

            <div className="flex flex-col items-center md:items-end gap-6">
              <HypeMeter />
              <Link to="/collection" className="px-10 py-5 rounded-full bg-white text-black font-black uppercase text-sm tracking-[0.3em] hover:bg-[#ff4d4d] hover:text-white transition-all flex items-center gap-3 group shadow-2xl">
                OPEN THE VAULT <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-14"
          >
            {TRENDING_PRODUCTS.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} onAddToCart={addToCart} enableFlare={true} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Brand Identity / Elite Comfort Section */}
      <section className="py-24 sm:py-32 relative overflow-hidden text-center bg-[#050505] border-y border-white/5 px-4">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-5xl mx-auto space-y-16 sm:space-y-24"
        >
          <div className="flex flex-col items-center">
            <RGBGlitchTitle text="ELITE COMFORT" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-20 items-center justify-items-center">
            {/* Hype Meter Artifact */}
            <motion.div variants={itemVariants} className="flex flex-col items-center gap-6">
              <MagneticIconWrapper>
                <div className="p-8 glass rounded-[2.5rem] bg-[#00ff88]/5 border-[#00ff88]/20">
                  <HypeMeter />
                </div>
              </MagneticIconWrapper>
              <div className="text-center">
                <p className="text-[#00ff88] font-bold text-xs tracking-[0.4em] uppercase mb-2">Energy Level</p>
                <p className="text-white font-black italic uppercase tracking-widest text-lg">Hype-Meter</p>
              </div>
            </motion.div>

            {/* Spray Can Artifact */}
            <motion.div variants={itemVariants} className="flex flex-col items-center gap-6">
              <MagneticIconWrapper>
                <div className="p-8 glass rounded-[2.5rem] bg-[#00d4ff]/5 border-[#00d4ff]/20">
                  <SprayCanIcon />
                </div>
              </MagneticIconWrapper>
              <div className="text-center">
                <p className="text-[#00d4ff] font-bold text-xs tracking-[0.4em] uppercase mb-2">Street Vandal</p>
                <p className="text-white font-black italic uppercase tracking-widest text-lg">Drip Can</p>
              </div>
            </motion.div>

            {/* Crown Artifact */}
            <motion.div variants={itemVariants} className="flex flex-col items-center gap-6">
              <MagneticIconWrapper>
                <div className="p-8 glass rounded-[2.5rem] bg-[#fbbf24]/5 border-[#fbbf24]/20">
                  <FloatingCrown />
                </div>
              </MagneticIconWrapper>
              <div className="text-center">
                <p className="text-[#fbbf24] font-bold text-xs tracking-[0.4em] uppercase mb-2">Authentic</p>
                <p className="text-white font-black italic uppercase tracking-widest text-lg">Elite Status</p>
              </div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
            <p className="text-xl sm:text-3xl text-gray-300 leading-relaxed font-medium italic mb-8 sm:mb-12">
              Secure payment at the door. <br className="hidden sm:block" />
              Delivered by <span className="text-[#00ff88] font-bold">PostEX</span>. <br />
              <span className="uppercase font-black text-white not-italic tracking-widest leading-normal">
                Zero risk, total transparency. <br />
                The way streetwear should be.
              </span>
            </p>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
