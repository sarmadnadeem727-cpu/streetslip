
import React from 'react';
import { Instagram, Send, Phone, MapPin, Facebook } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';

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

const Contact: React.FC = () => {
  return (
    <div className="pt-24 sm:pt-32 pb-32 px-4 max-w-7xl mx-auto reveal">
      <div className="text-center mb-32">
        <span className="text-[#00ff88] font-black text-xs tracking-[0.5em] uppercase mb-8 block">Connect With The Fam</span>
        <h1 className="text-5xl sm:text-7xl md:text-[10rem] font-black tracking-widest mb-12 uppercase italic bebas leading-none">HIT US UP.</h1>
        <p className="text-2xl text-gray-400 max-w-2xl mx-auto font-medium italic tracking-wide">
          Need help? Got a vibe to share? Or just wanna talk tech? We're listening.
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-12">
        <div className="glass p-6 sm:p-12 rounded-[2rem] sm:rounded-[3rem] border-white/5 space-y-6 sm:space-y-10">
          <h2 className="text-3xl font-black uppercase tracking-widest italic bebas">Direct Lines</h2>
          <div className="space-y-8">
            <a href="https://wa.me/923248866737" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 sm:gap-8 group cursor-pointer">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#00ff88]/10 rounded-2xl flex items-center justify-center group-hover:bg-[#00ff88] group-hover:text-black transition-all shrink-0">
                <Phone className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs font-black text-gray-500 uppercase tracking-widest mb-1">WhatsApp / Call</p>
                <p className="text-lg sm:text-2xl font-black tracking-wider truncate">+92 324 8866737</p>
              </div>
            </a>
            <a href="mailto:streetslipp@gmail.com" className="flex items-center gap-4 sm:gap-8 group cursor-pointer">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#00d4ff]/10 rounded-2xl flex items-center justify-center group-hover:bg-[#00d4ff] group-hover:text-black transition-all shrink-0">
                <Send className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Email The Squad</p>
                <p className="text-lg sm:text-2xl font-black tracking-wider truncate">streetslipp@gmail.com</p>
              </div>
            </a>
            <a href="https://maps.google.com/?q=Lahore,Pakistan" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 sm:gap-8 group cursor-pointer">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#ff0080]/10 rounded-2xl flex items-center justify-center group-hover:bg-[#ff0080] group-hover:text-black transition-all shrink-0">
                <MapPin className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Headquarters</p>
                <p className="text-lg sm:text-2xl font-black tracking-wider truncate">Lahore, PK</p>
              </div>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="glass p-8 rounded-[2.5rem] flex flex-col items-center gap-4 hover:border-[#00ff88]/30 transition-all group">
            <Instagram className="h-8 w-8 text-[#00ff88] group-hover:scale-125 transition-transform" />
            <span className="font-black text-[10px] uppercase tracking-[0.4em]">Insta</span>
          </a>
          <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="glass p-8 rounded-[2.5rem] flex flex-col items-center gap-4 hover:border-[#3b5998]/30 transition-all group">
            <Facebook className="h-8 w-8 text-[#3b5998] group-hover:scale-125 transition-transform" />
            <span className="font-black text-[10px] uppercase tracking-[0.4em]">FB</span>
          </a>
          <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="glass p-8 rounded-[2.5rem] flex flex-col items-center gap-4 hover:border-[#00d4ff]/30 transition-all group">
            <TikTokIcon className="h-8 w-8 text-white group-hover:text-[#00d4ff] group-hover:scale-125 transition-all" />
            <span className="font-black text-[10px] uppercase tracking-[0.4em]">TikTok</span>
          </a>
        </div>
      </div>
    </div >
  );
};

export default Contact;
