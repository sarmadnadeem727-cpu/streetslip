
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Send, CheckCircle2, Mail, Music2 } from 'lucide-react';
import { SOCIAL_LINKS, ALL_PRODUCTS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

// TikTok custom SVG for high precision
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setEmail('');
    setTimeout(() => setIsSubscribed(false), 5000);
  };

  return (
    <footer className="bg-black border-t border-white/10 pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-20 mb-32">

          <div className="md:col-span-6 space-y-10">
            <Link to="/" className="flex items-center gap-1 group pr-6">
              <span className="text-4xl sm:text-5xl font-black italic text-white bebas uppercase">STREET</span>
              <span className="text-4xl sm:text-5xl font-black italic bg-gradient-to-r from-[#00ff88] to-[#00d4ff] bg-clip-text text-transparent group-hover:tracking-widest transition-all duration-500 bebas uppercase">SLIPP</span>
            </Link>
            <p className="text-gray-400 text-xl leading-relaxed max-w-md font-medium italic">
              Step into the future of urban lounge. Engineered for the streets, crafted for the clouds. Pure comfort, zero compromise.
            </p>
            <div className="flex items-center gap-4 text-[#00ff88]">
              <Mail className="h-6 w-6" />
              <span className="text-lg font-bold uppercase tracking-widest bebas">streetslipp@gmail.com</span>
            </div>
            <div className="flex space-x-8">
              <motion.a whileHover={{ y: -5, color: '#00ff88' }} href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-white transition-all"><Instagram className="h-8 w-8" /></motion.a>
              <motion.a whileHover={{ y: -5, color: '#3b5998' }} href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="text-white transition-all"><Facebook className="h-8 w-8" /></motion.a>
              <motion.a whileHover={{ y: -5, color: '#00d4ff' }} href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="text-white transition-all">
                <TikTokIcon className="h-8 w-8" />
              </motion.a>
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-[#00ff88] font-black text-lg uppercase tracking-widest mb-12 bebas">Connect</h4>
            <ul className="space-y-6 text-gray-400 font-bold uppercase tracking-widest text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">Our Vibe</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Hit Us Up</Link></li>
              <li><Link to="/reviews" className="hover:text-white transition-colors">Vibe Check</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-white font-black text-lg uppercase tracking-widest mb-8 bebas">Join The movement</h4>

            <p className="text-gray-400 mb-8 text-lg font-medium italic leading-relaxed">
              "We're not just selling slides. We're providing a trust-worthy portal to comfort."
            </p>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mb-10">
              <Link
                to="/collection"
                onClick={() => window.scrollTo(0, 0)}
                className="w-full block text-center py-4 bg-white text-black font-black uppercase italic tracking-widest rounded-full hover:bg-[#00ff88] transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                Explore The Drops
              </Link>
            </motion.div>

            {/* Miniature Product Marquee */}
            <div className="relative overflow-hidden w-full h-24 mask-image-gradient">
              <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

              <motion.div
                className="flex gap-4 absolute"
                animate={{ x: [0, -500] }}
                transition={{
                  repeat: Infinity,
                  duration: 15,
                  ease: "linear",
                  repeatType: "loop"
                }}
              >
                {[...ALL_PRODUCTS, ...ALL_PRODUCTS, ...ALL_PRODUCTS].map((product, idx) => (
                  <Link to={`/product/${product.id}`} key={`${product.id}-${idx}`} className="block w-20 h-20 flex-shrink-0 group relative rounded-xl overflow-hidden border border-white/10 hover:border-[#00ff88] transition-colors">
                    <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-[10px] font-bold text-[#00ff88] tech-mono">Rs.{product.price}</span>
                    </div>
                  </Link>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-gray-500 font-bold uppercase text-[10px] tracking-[0.4em] italic">
          <p>© 2026 STREETSLIPP. ALL RIGHTS RESERVED. THE ONLY VIBE THAT MATTERS.</p>
          <div className="flex gap-10">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
