
import React from 'react';
import { X, Instagram, Facebook } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { SOCIAL_LINKS } from '../constants';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}


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

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/' },
    { name: "The Drop", path: '/collection' },
    { name: 'Our Vibe', path: '/about' },
    { name: 'Hit Us Up', path: '/contact' },
    { name: 'Vibe Check', path: '/reviews' },
  ];

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/95 backdrop-blur-xl z-[60] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 left-0 h-full w-[85vw] sm:w-[400px] bg-[#050505] border-r border-white/10 z-[70] transform transition-transform duration-500 cubic-bezier(0.77, 0, 0.175, 1) ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full p-6 sm:p-14">
          <div className="flex justify-between items-center mb-16">
            <Link to="/" onClick={onClose} className="flex items-center gap-1 group">
              <span className="text-2xl font-black italic text-white tracking-tight uppercase bebas">STREET</span>
              <span className="text-2xl font-black italic tracking-tight bg-gradient-to-r from-[#00ff88] to-[#00d4ff] bg-clip-text text-transparent group-hover:tracking-widest transition-all duration-500 uppercase bebas">SLIPP</span>
            </Link>
            <button onClick={onClose} className="p-4 bg-white/5 rounded-2xl text-gray-300 hover:text-white transition-all" aria-label="Close Menu">
              <X className="h-8 w-8" />
            </button>
          </div>

          <nav className="flex-1 space-y-6">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={onClose}
                className={`group block text-3xl sm:text-6xl font-black transition-all duration-300 bebas uppercase tracking-wider ${location.pathname === link.path ? 'neon-text-gradient translate-x-4' : 'text-gray-600 hover:text-white hover:translate-x-4'}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="pt-12 border-t border-white/10">
            <p className="text-[#00ff88] mb-8 text-sm font-bold uppercase tracking-[0.4em]">The Movement</p>
            <div className="flex space-x-8">
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#00ff88] transition-transform hover:scale-125 p-2"><Instagram className="h-8 w-8" /></a>
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#3b5998] transition-transform hover:scale-125 p-2"><Facebook className="h-8 w-8" /></a>
              <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#00d4ff] transition-transform hover:scale-125 p-2"><TikTokIcon className="h-8 w-8" /></a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
