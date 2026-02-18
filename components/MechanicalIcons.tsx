import React from 'react';
import { motion } from 'framer-motion';

// Turbine: Revs up to blur when active
export const Turbine = ({ isActive = false }: { isActive?: boolean }) => (
    <motion.svg
        viewBox="0 0 24 24"
        className="w-full h-full text-current"
        animate={{ rotate: 360 }}
        transition={{ duration: isActive ? 0.2 : 2, ease: "linear", repeat: Infinity }} // 0.2s = fast blur, 2s = idle
    >
        <path fill="currentColor" d="M12,11C12.44,8.19 13.88,5.7 15.82,4C14.05,5.1 12.69,6.76 12,8.74C11.31,6.76 9.95,5.1 8.18,4C10.12,5.7 11.56,8.19 12,11M13,12C16.5,12 19.58,13.81 21.09,16.5C18.4,17.21 15.65,16.89 13.29,15.68C14.73,14.86 16.5,14 16.5,14C15.11,14.54 12,15.11 12,15.11L12.03,15.09C9.72,13.84 6.94,14.15 5,16.5C6.46,13.81 9.54,12 13,12Z" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
    </motion.svg>
);

// ZipTie: Clicks/Tightens when active
export const ZipTie = ({ isActive = false }: { isActive?: boolean }) => {
    return (
        <motion.svg
            viewBox="0 0 24 24"
            className="w-full h-full text-current"
            animate={isActive ? "tighten" : "idle"}
        >
            <motion.path
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                d="M7,10 L7,14 L17,14 L17,10 M17,10 L7,10 M12,4 L12,10 M7,14 A5,5 0 0,0 17,14"
                variants={{
                    idle: { d: "M7,10 L7,14 L17,14 L17,10 M17,10 L7,10 M12,4 L12,10 M7,14 A5,5 0 0,0 17,14" },
                    tighten: { d: "M7,10 L7,12 L17,12 L17,10 M17,10 L7,10 M12,4 L12,10 M7,12 A5,5 0 0,0 17,12" } // Shorten loop
                }}
                transition={{ duration: 0.1, ease: "steps(2)" }} // Mechanical snap
            />
            <rect x="10" y="2" width="4" height="4" fill="currentColor" />
        </motion.svg>
    );
}

// PressureGauge: Jitters randomly, more intense when active
export const PressureGauge = ({ isActive = false }: { isActive?: boolean }) => {
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-full h-full text-current">
                <path fill="none" stroke="currentColor" strokeWidth="2" d="M3,12 A9,9 0 1,1 21,12" strokeDasharray="4 2" />
                <path fill="none" stroke="currentColor" strokeWidth="2" d="M3,12 L5,12 M19,12 L21,12 M12,3 L12,5" />
            </svg>
            {/* Needle */}
            <motion.div
                className="absolute w-[2px] h-[40%] bg-current bottom-[50%] left-1/2 origin-bottom"
                animate={{ rotate: isActive ? [-45, 45, -20, 90, -45] : [-10, 10, -5, 15, -10] }}
                transition={{ duration: isActive ? 0.2 : 2, ease: "steps(5)", repeat: Infinity }}
            />
        </div>
    );
}
