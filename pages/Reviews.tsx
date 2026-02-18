import React, { useState } from 'react';
import { MOCK_REVIEWS } from '../constants';
import { Star, CheckCircle, MessageSquare, ShieldCheck, TrendingUp, X, User, Send, Edit3, Instagram, Facebook, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Review } from '../types';
import { SOCIAL_LINKS } from '../constants';

// Custom Icons
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.3 8.33 8.33 0 0 1 3.8.9L21 3.5Z" />
    <path d="M12.9 8.2a3.7 3.7 0 0 1 2.9 2.9" />
  </svg>
);

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
  const [showModal, setShowModal] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    const review: Review = {
      id: Date.now().toString(),
      user: `${newReview.name} @${newReview.name.toLowerCase().replace(/\s+/g, '_')}`,
      rating: newReview.rating,
      comment: newReview.comment,
      date: "Just now",
      verified: false
    };
    setReviews([review, ...reviews]);
    setShowModal(false);
    setNewReview({ name: '', rating: 5, comment: '' });
  };

  return (
    <div className="pt-32 pb-32 px-4 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-24">
        <span className="text-[#00ff88] font-bold text-sm tracking-[0.6em] uppercase mb-8 block">The Streets Voice</span>
        <h1 className="text-5xl sm:text-7xl md:text-[10rem] font-extrabold mb-6 sm:mb-10 tracking-widest uppercase italic flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 leading-none">
          VIBE CHECK <ShieldCheck className="h-10 w-10 sm:h-16 sm:w-16 text-[#00ff88]" />
        </h1>
        <p className="text-xl sm:text-3xl text-gray-400 font-medium italic max-w-3xl mx-auto px-4">Real experiences from the concrete jungle. High contrast, low ego.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12 mb-20 sm:mb-32">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass p-8 sm:p-16 rounded-[2.5rem] sm:rounded-[5rem] text-center flex flex-col items-center justify-center border-white/10 shadow-2xl relative overflow-hidden">
          <p className="text-[10px] sm:text-sm text-gray-500 font-bold uppercase tracking-[0.5em] mb-4 sm:mb-6">Global Rating</p>
          <p className="text-8xl sm:text-[12rem] font-extrabold mb-4 sm:mb-6 neon-text-gradient italic leading-none tracking-tight">4.9</p>
          <div className="flex gap-2 sm:gap-4 text-[#00ff88] mb-6 sm:mb-10">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-8 w-8 sm:h-12 sm:w-12 fill-current" />)}
          </div>
          <p className="text-gray-400 font-bold uppercase tracking-[0.3em] text-xs sm:text-lg flex items-center gap-3">
            <TrendingUp className="h-4 w-4 sm:h-6 sm:w-6" /> 1,400+ Verified Checks
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="glass p-8 sm:p-16 rounded-[2.5rem] sm:rounded-[5rem] space-y-6 sm:space-y-10 border-white/10">
          {[5, 4, 3, 2, 1].map((stars, idx) => (
            <div key={stars} className="flex items-center gap-10">
              <span className="text-xl font-bold w-6 text-gray-500">{stars}</span>
              <div className="flex-1 h-5 bg-white/5 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} whileInView={{ width: stars === 5 ? '85%' : stars === 4 ? '10%' : '2%' }} transition={{ duration: 1.5, delay: 0.5 + idx * 0.1 }} className="h-full neon-bg-gradient" />
              </div>
              <span className="text-base text-gray-400 font-bold tracking-widest">{stars === 5 ? '85%' : stars === 4 ? '10%' : '2%'}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="space-y-12">
        <AnimatePresence mode='popLayout'>
          {reviews.map((review, idx) => (
            <motion.div key={review.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: idx * 0.1 }} className="glass p-6 sm:p-14 rounded-[2rem] sm:rounded-[5rem] border-white/10 hover:border-[#00ff88]/30 transition-all group relative overflow-hidden">
              <div className="flex flex-col sm:flex-row justify-between items-start mb-6 sm:mb-10 gap-4">
                <div className="flex items-center gap-8">
                  <div className="w-20 h-20 rounded-3xl glass flex items-center justify-center border-white/10 group-hover:border-[#00ff88]/50 transition-colors shadow-xl">
                    <User className="h-10 w-10 text-[#00ff88]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-4 mb-3">
                      <span className="font-extrabold text-3xl uppercase italic tracking-tight group-hover:text-[#00ff88] transition-colors">{review.user}</span>
                      {review.verified && <CheckCircle className="h-6 w-6 text-[#00ff88]" />}
                    </div>
                    <div className="flex gap-2 text-[#00ff88]">
                      {Array.from({ length: review.rating }).map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                    </div>
                  </div>
                </div>
                <span className="text-sm text-gray-500 font-bold uppercase tracking-[0.4em] mt-4">{review.date}</span>
              </div>
              <p className="text-gray-200 text-2xl sm:text-3xl leading-relaxed font-medium italic">"{review.comment}"</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-20 sm:mt-32 glass p-6 sm:p-12 rounded-[2rem] sm:rounded-[4rem] text-center sm:text-left bg-gradient-to-br from-[#00ff88]/5 to-[#00d4ff]/5 border-white/10 relative overflow-hidden shadow-2xl"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 sm:gap-16">
          <div className="flex-1 space-y-4 sm:space-y-6">
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase italic tracking-widest leading-tight">Wanna drop a feedback?</h2>
            <p className="text-base sm:text-xl text-gray-400 font-medium italic max-w-xl">Share your experience with the squad. Your word is law here.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowModal(true)}
              className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-white text-black font-extrabold rounded-2xl transition-all text-lg sm:text-xl shadow-2xl uppercase tracking-widest italic flex items-center justify-center gap-3"
            >
              <Edit3 className="h-5 w-5 sm:h-6 sm:w-6" /> Leave a Review
            </motion.button>
          </div>

          <div className="w-full lg:w-auto p-6 sm:p-10 glass rounded-3xl border-white/5 bg-white/5 space-y-6">
            <p className="text-[10px] sm:text-xs text-center text-[#00ff88] font-bold uppercase tracking-[0.4em]">Connect with the squad</p>
            <div className="grid grid-cols-2 sm:flex sm:flex-row gap-4 sm:gap-6">
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 p-4 glass rounded-2xl hover:bg-[#00ff88]/20 transition-all group">
                <Instagram className="h-6 w-6 sm:h-8 sm:w-8 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] uppercase font-bold tracking-widest">Insta</span>
              </a>
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 p-4 glass rounded-2xl hover:bg-[#3b5998]/20 transition-all group">
                <Facebook className="h-6 w-6 sm:h-8 sm:w-8 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] uppercase font-bold tracking-widest">FB</span>
              </a>
              <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 p-4 glass rounded-2xl hover:bg-[#00d4ff]/20 transition-all group">
                <TikTokIcon className="h-6 w-6 sm:h-8 sm:w-8 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] uppercase font-bold tracking-widest">TikTok</span>
              </a>
              <a href={`https://wa.me/${SOCIAL_LINKS.whatsapp.replace('+', '')}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 p-4 glass rounded-2xl hover:bg-[#25D366]/20 transition-all group">
                <WhatsAppIcon className="h-6 w-6 sm:h-8 sm:w-8 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] uppercase font-bold tracking-widest">Chat</span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Review Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={() => setShowModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }} className="relative w-full max-w-2xl glass p-16 rounded-[5rem] border-white/20">
              <button onClick={() => setShowModal(false)} className="absolute top-10 right-10 p-4 hover:bg-white/10 rounded-2xl transition-all"><X className="h-10 w-10" /></button>
              <h3 className="text-5xl font-extrabold mb-16 uppercase italic tracking-tight text-white">NEW VIBE CHECK</h3>
              <form onSubmit={handleSubmitReview} className="space-y-10">
                <div className="space-y-4">
                  <label className="text-sm font-bold uppercase tracking-[0.4em] text-gray-500 ml-6">Your Name</label>
                  <input required type="text" value={newReview.name} onChange={(e) => setNewReview({ ...newReview, name: e.target.value })} placeholder="Alex Vibe" className="w-full bg-white/5 border border-white/10 rounded-3xl px-10 py-6 text-white focus:border-[#00ff88] outline-none text-xl font-bold" />
                </div>
                <div className="space-y-4">
                  <label className="text-sm font-bold uppercase tracking-[0.4em] text-gray-500 ml-6">Rating</label>
                  <div className="flex gap-6 px-4">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button key={star} type="button" onClick={() => setNewReview({ ...newReview, rating: star })} className={`transition-all transform hover:scale-125 ${newReview.rating >= star ? 'text-[#00ff88] scale-110' : 'text-gray-700'}`}><Star className={`h-12 w-12 ${newReview.rating >= star ? 'fill-current' : ''}`} /></button>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-sm font-bold uppercase tracking-[0.4em] text-gray-500 ml-6">Your Experience</label>
                  <textarea required rows={4} value={newReview.comment} onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })} placeholder="Tell the fam about the drip..." className="w-full bg-white/5 border border-white/10 rounded-3xl px-10 py-6 text-white focus:border-[#00ff88] outline-none text-xl font-bold resize-none" />
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full py-10 bg-[#00ff88] text-black font-extrabold text-3xl rounded-[2.5rem] flex items-center justify-center gap-6 shadow-2xl italic tracking-widest uppercase">Post Vibe <Send className="h-8 w-8" /></motion.button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Reviews;