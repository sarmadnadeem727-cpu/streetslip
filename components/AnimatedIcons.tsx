import React from 'react';
import { motion, useTime, useTransform } from 'framer-motion';

// --- INDUSTRIAL ICONS (Preserved) ---
export const Turbine: React.FC<{ className?: string }> = ({ className }) => {
    const time = useTime();
    const rotate = useTransform(time, [0, 1000], [0, 360], { clamp: false });

    return (
        <motion.div className={className} style={{ rotate }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 12c0-3 2.5-3 3.5-6 .6-1.7-1-2-1.5-1-.5.9-2 2-2 7z" />
                <path d="M12 12c3 0 3 2.5 6 3.5 1.7.6 2-1 1-1.5-.9-.5-2-2-7-2z" />
                <path d="M12 12c0 3-2.5 3-3.5 6-.6 1.7 1 2 1.5 1 .5-.9 2-2 2-7z" />
                <path d="M12 12c-3 0-3-2.5-6-3.5-1.7-.6-2 1-1 1.5.9.5 2 2 7 2z" />
                <circle cx="12" cy="12" r="2" />
            </svg>
        </motion.div>
    );
};

export const Piston: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <div className={className}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="overflow-visible">
                <path d="M7 4h10v6h-10z" className="opacity-50" />
                <path d="M9 22h6" />
                <motion.g
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <rect x="8" y="4" width="8" height="6" rx="1" fill="currentColor" fillOpacity="0.2" />
                    <line x1="12" y1="10" x2="12" y2="22" />
                    <circle cx="12" cy="16" r="1.5" fill="currentColor" />
                </motion.g>
            </svg>
        </div>
    );
};

export const VaultHandle: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <motion.div
            className={className}
            whileHover={{ rotate: 90 }}
            transition={{ duration: 0.8, type: "spring" }}
        >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" className="opacity-30" />
                <circle cx="12" cy="12" r="2" />
                <path d="M12 14v8" />
                <path d="M12 10V2" />
                <path d="M14 12h8" />
                <path d="M10 12H2" />
                <circle cx="12" cy="2" r="1" fill="currentColor" />
                <circle cx="22" cy="12" r="1" fill="currentColor" />
                <circle cx="12" cy="22" r="1" fill="currentColor" />
                <circle cx="2" cy="12" r="1" fill="currentColor" />
            </svg>
        </motion.div>
    );
};

export const SpeedLines: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <div className={`${className} overflow-hidden relative`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-full h-full">
                <motion.path
                    d="M2 8h10"
                    animate={{ x: [-24, 24] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                />
                <motion.path
                    d="M4 12h16"
                    animate={{ x: [-24, 24] }}
                    transition={{ duration: 0.6, repeat: Infinity, ease: "linear", delay: 0.2 }}
                />
                <motion.path
                    d="M0 16h8"
                    animate={{ x: [-24, 24] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear", delay: 0.4 }}
                />
            </svg>
        </div>
    );
};

// --- URBAN ICONS (Preserved) ---
export const Lighter: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <div className={className}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="overflow-visible">
                <rect x="6" y="11" width="12" height="10" rx="2" />
                <motion.path
                    d="M6 11h12V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v5z"
                    style={{ originX: 0, originY: 1 }}
                    animate={{ rotate: -45 }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 2 }}
                />
                <motion.path
                    d="M12 2c0 0-3 2.5-3 5s3 2 3 4c0-2 3-1.5 3-4S12 2 12 2z"
                    fill="#00d4ff"
                    stroke="none"
                    animate={{ scale: [0.8, 1.2, 0.9], opacity: [0.6, 1, 0.7] }}
                    transition={{ duration: 0.1, repeat: Infinity }}
                />
            </svg>
        </div>
    );
};

export const SprayCan: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <motion.div
            className={className}
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
        >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="overflow-visible">
                <rect x="6" y="8" width="12" height="14" rx="2" />
                <path d="M6 8l2-5h8l2 5" />
                <path d="M12 3v-2" />
                <motion.circle
                    cx="18" cy="2" r="1" fill="#00ff88" stroke="none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0], x: [0, 5], y: [0, -5] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.2 }}
                />
                <motion.circle
                    cx="16" cy="4" r="1.5" fill="#00d4ff" stroke="none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0], x: [0, 8], y: [0, -2] }}
                    transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0.1 }}
                />
            </svg>
        </motion.div>
    );
};

export const ZipTie: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <motion.div
            className={className}
            whileHover={{ rotate: 15 }}
        >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10 10 10 0 0 1-10-10" />
                <rect x="8" y="2" width="8" height="6" rx="1" fill="currentColor" fillOpacity="0.2" />
                <path d="M12 8v8" />
                <path d="M10 16l4-4" />
                <path d="M10 12l4-4" />
            </svg>
        </motion.div>
    );
};

export const Ticket: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <div className={`${className} overflow-hidden`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" />
                <motion.path
                    d="M6 12h12"
                    strokeDasharray="2 2"
                    animate={{ x: [-2, 0] }}
                    transition={{ duration: 0.2, repeat: Infinity, ease: "linear" }}
                />
                <path d="M6 8h4" />
                <path d="M6 16h8" />
            </svg>
        </div>
    );
};
