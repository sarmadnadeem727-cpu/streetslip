import React from 'react';
import { motion } from 'framer-motion';

// 1. Kinetic Box Truck Loader
export const BoxTruckLoader = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="relative w-32 h-20">
                {/* Speed Lines */}
                <motion.div
                    animate={{ x: [-100, 100], opacity: [0, 1, 0] }}
                    transition={{ duration: 0.2, repeat: Infinity, ease: "linear" }}
                    className="absolute top-2 -left-10 w-20 h-0.5 bg-[#00d4ff]/50 blur-sm"
                />
                <motion.div
                    animate={{ x: [-100, 100], opacity: [0, 1, 0] }}
                    transition={{ duration: 0.3, repeat: Infinity, ease: "linear", delay: 0.1 }}
                    className="absolute bottom-2 -left-20 w-32 h-0.5 bg-[#00ff88]/50 blur-sm"
                />

                {/* Truck Body */}
                <motion.div
                    animate={{ y: [0, -1, 1, 0], x: [0, 0.5, -0.5, 0] }}
                    transition={{ duration: 0.1, repeat: Infinity, ease: "linear" }} // Jitter
                    className="w-full h-full relative"
                >
                    <svg viewBox="0 0 100 60" className="w-full h-full drop-shadow-[0_0_15px_rgba(0,212,255,0.5)]">
                        {/* Cab */}
                        <path d="M70 20 L90 20 L95 35 L95 50 L70 50 Z" fill="#00d4ff" />
                        {/* Cargo Box */}
                        <rect x="5" y="10" width="65" height="40" fill="#050505" stroke="#00d4ff" strokeWidth="2" />
                        {/* Slipp Tag */}
                        <text x="10" y="35" fontFamily="Arial" fontWeight="900" fontSize="14" fill="#00ff88" style={{ fontStyle: 'italic' }}>SLIPP</text>
                        {/* Wheels */}
                        <circle cx="25" cy="50" r="6" fill="#111" stroke="#00ff88" strokeWidth="2" />
                        <circle cx="80" cy="50" r="6" fill="#111" stroke="#00ff88" strokeWidth="2" />
                    </svg>
                </motion.div>
            </div>
            <p className="text-[#00d4ff] tech-mono text-xs font-bold uppercase tracking-widest animate-pulse">
                SECURING LOGISTICS...
            </p>
        </div>
    );
};

// 2. Pixel Heart (Status 0001)
export const PixelHeart = () => {
    return (
        <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
            className="text-[#ff0080]"
        >
            <svg viewBox="0 0 24 24" className="w-16 h-16 fill-current">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
        </motion.div>
    );
};

// 3. Glitch Cross (Status Failed/Returned)
export const GlitchCross = () => {
    return (
        <div className="relative w-16 h-16">
            <motion.div
                animate={{ x: [-2, 2, -2], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 0.1, repeat: Infinity }}
                className="absolute inset-0 text-red-500"
            >
                <svg viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg>
            </motion.div>
            <motion.div
                animate={{ x: [2, -2, 2], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 0.1, repeat: Infinity }}
                className="absolute inset-0 text-white mix-blend-overlay"
            >
                <svg viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg>
            </motion.div>
        </div>
    );
};

// 4. Thermal Printer Status
export const ThermalPrinterReceipt = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="relative overflow-hidden w-full max-w-md mx-auto">
            {/* Printer Head */}
            <div className="absolute top-0 left-0 w-full h-8 bg-[#111] z-20 shadow-xl border-b border-gray-800 flex items-center justify-center">
                <div className="w-3/4 h-1 bg-[#222]"></div>
            </div>

            {/* Paper */}
            <motion.div
                initial={{ y: -200 }}
                animate={{ y: 0 }}
                transition={{ duration: 1.5, ease: "linear" }} // Standard linear easing to prevent crashes
                className="pt-8 pb-4 relative z-10"
            >
                <div className="bg-white text-black p-6 font-mono shadow-[0_5px_15px_rgba(0,0,0,0.5)] receipt-jagged">
                    {children}
                </div>
            </motion.div>
        </div>
    );
};

// 5. Neon Floating Crown (Status 0005 - Delivered)
export const NeonFloatingCrown = () => {
    return (
        <div className="relative w-32 h-32 flex items-center justify-center">
            <motion.div
                animate={{ y: [-10, 10, -10], rotate: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
            >
                <svg viewBox="0 0 100 80" className="w-24 h-24 drop-shadow-[0_0_20px_rgba(255,215,0,0.8)]">
                    <path
                        d="M10 70 L90 70 L90 50 L70 50 L70 30 L50 30 L50 20 L30 20 L30 40 L10 40 Z"
                        fill="none"
                        stroke="#FFD700"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        className="animate-pulse"
                    />
                    <path
                        d="M20 40 L20 20 L40 20 L40 40 M60 40 L60 20 L80 20 L80 40"
                        fill="none"
                        stroke="#FFD700"
                        strokeWidth="1"
                        opacity="0.5"
                    />
                    <circle cx="50" cy="15" r="3" fill="#00ff88" className="animate-ping" />
                    <circle cx="20" cy="15" r="2" fill="#00d4ff" />
                    <circle cx="80" cy="15" r="2" fill="#00d4ff" />
                </svg>
            </motion.div>

            {/* Glow Halo */}
            <motion.div
                animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.1, 0.4, 0.1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-[#FFD700]/20 blur-2xl rounded-full"
            />

            {/* Confetti Particles */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-[#00ff88]"
                    initial={{ opacity: 0, y: 0, x: 0 }}
                    animate={{ opacity: [0, 1, 0], y: -40, x: (i - 2) * 20 }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                />
            ))}
        </div>
    );
};
