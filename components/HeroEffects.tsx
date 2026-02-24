import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, animate } from 'framer-motion';

// 1. VHS Overlay Effect
export const VHSOverlay = () => {
    return (
        <div className="absolute inset-0 pointer-events-none z-[5] overflow-hidden mix-blend-overlay opacity-30">
            {/* Static Noise */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-150 contrast-150 animate-grain" />

            {/* Scanning Line */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-[20%] animate-scanline" />

            {/* CRT Scanlines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[2] bg-[length:100%_4px,3px_100%] pointer-events-none" />
        </div>
    );
};

// 2. Liquid Ripple Definitions (SVG Filter)
export const LiquidRippleDef = () => {
    return (
        <svg className="absolute w-0 h-0">
            <defs>
                <filter id="liquid-ripple">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.01 0.01"
                        numOctaves="2"
                        result="noise"
                    >
                        <animate
                            attributeName="baseFrequency"
                            dur="10s"
                            values="0.01 0.01;0.02 0.03;0.01 0.01"
                            repeatCount="indefinite"
                        />
                    </feTurbulence>
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="noise"
                        scale="20"
                        xChannelSelector="R"
                        yChannelSelector="G"
                    >
                        <animate
                            attributeName="scale"
                            dur="5s"
                            values="0;30;0"
                            repeatCount="indefinite"
                            begin="2s"
                        />
                    </feDisplacementMap>
                </filter>
            </defs>
        </svg>
    );
};

// 3. Graffiti Reveal (Flashlight Effect)
export const GraffitiReveal = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
            style={{
                background: useMotionTemplate`radial-gradient(250px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.15), transparent 80%)`,
                maskImage: useMotionTemplate`radial-gradient(200px circle at ${mouseX}px ${mouseY}px, black, transparent)`
            }}
        >
            {/* Hidden Graffiti Art - Using large text as placeholder for graffiti */}
            <h1 className="text-[20rem] font-black text-[#222] rotate-12 opacity-80 select-none blur-sm pointer-events-none">
                SLIPP
            </h1>
            <div className="absolute inset-0 bg-[url('/images/graffiti-texture.png')] opacity-20 mix-blend-overlay" />
        </motion.div>
    );
};

// 4. Magnetic Vibrating Button
// 4. Magnetic Vibrating Button (Quantized Mechanical Snap)
export const MagneticVibratingButton = ({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) => {
    const ref = useRef<HTMLButtonElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        // Calculate raw distance
        const rawX = (clientX - centerX) * 0.4;
        const rawY = (clientY - centerY) * 0.4;

        // QUANTIZE: Snap to 5px grid for mechanical feel
        const snapSize = 5;
        const snappedX = Math.round(rawX / snapSize) * snapSize;
        const snappedY = Math.round(rawY / snapSize) * snapSize;

        x.set(snappedX);
        y.set(snappedY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            ref={ref}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x, y }}
            whileHover={{
                scale: 1.05,
                transition: { duration: 0.1, ease: "linear" } // Instant mechanical scale
            }}
            whileTap={{ scale: 0.95 }}
            className="relative px-12 py-6 bg-white text-black font-extrabold text-3xl sm:text-5xl transition-all flex items-center justify-center gap-4 shadow-[0_0_30px_rgba(255,255,255,0.4)] border-2 border-white uppercase italic overflow-hidden group hover:bg-[#00ff88] hover:text-black hover:border-[#00ff88] hover:shadow-[0_0_50px_#00ff88]"
        >
            {/* Tech Plate Corners */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-black" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-black" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-black" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-black" />

            <span className="relative z-10 flex items-center gap-4">{children}</span>
        </motion.button>
    );
};
