import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate, animate, AnimatePresence, useScroll, useTime } from 'framer-motion';

// 1. RGB Glitch Title with Ghost Trail
export const RGBGlitchTitle = ({ text }: { text: string }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 100 };
    const ghostX = useSpring(mouseX, springConfig);
    const ghostY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX - window.innerWidth / 2);
            mouseY.set(e.clientY - window.innerHeight / 2);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const glitchVariants = {
        animate: {
            x: [0, -2, 2, -1, 0],
            y: [0, 1, -1, 2, 0],
            filter: [
                'drop-shadow(0px 0px 0px rgba(0,0,0,0))',
                'drop-shadow(-2px 0px #00ff88) drop-shadow(2px 0px #00d4ff)',
                'drop-shadow(2px 0px #00ff88) drop-shadow(-2px 0px #00d4ff)',
                'drop-shadow(0px 0px 0px rgba(0,0,0,0))'
            ],
            transition: {
                duration: 0.2,
                repeat: Infinity,
                repeatType: "mirror" as const
            }
        }
    };

    return (
        <div className="relative flex justify-center items-center select-none">
            {/* Ghost Shadows */}
            <motion.div
                style={{ x: useTransform(ghostX, (v) => v * 0.15), y: useTransform(ghostY, (v) => v * 0.15) }}
                className="absolute text-6xl sm:text-9xl font-black italic tracking-tight text-[#00ff88]/30 blur-sm pointer-events-none"
            >
                {text}
            </motion.div>
            <motion.div
                style={{ x: useTransform(ghostX, (v) => v * 0.08), y: useTransform(ghostY, (v) => v * 0.08) }}
                className="absolute text-6xl sm:text-9xl font-black italic tracking-tight text-[#00d4ff]/20 blur-md pointer-events-none"
            >
                {text}
            </motion.div>

            {/* Main Title */}
            <motion.h1
                variants={glitchVariants}
                animate="animate"
                className="text-5xl sm:text-9xl font-black italic tracking-tight text-white relative z-10"
            >
                {text}
            </motion.h1>
        </div>
    );
};

// 2. Graffiti Spotlight Background
export const GraffitiSpotlight = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const tags = ["STREET", "SLIPP", "TRUST", "DRIP", "NO CAP", "CLOUD", "VIBE"];

    return (
        <div className="absolute inset-0 z-0 bg-[#050505] overflow-hidden">
            {/* Base Graffiti Layer (Low Opacity) */}
            <div className="absolute inset-0 opacity-[0.03] flex flex-wrap gap-20 p-20 items-center justify-center pointer-events-none">
                {Array.from({ length: 20 }).map((_, i) => (
                    <span
                        key={i}
                        className="text-8xl sm:text-[15rem] font-black italic tracking-tighter rotate-[15deg] uppercase leading-none"
                    >
                        {tags[i % tags.length]}
                    </span>
                ))}
            </div>

            {/* Spotlight Layer */}
            <motion.div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                    background: useMotionTemplate`radial-gradient(200px circle at ${mouseX}px ${mouseY}px, rgba(0,255,136,0.15), transparent 80%)`,
                }}
            />

            <motion.div
                className="absolute inset-0 pointer-events-none z-20 flex flex-wrap gap-20 p-20 items-center justify-center"
                style={{
                    maskImage: useMotionTemplate`radial-gradient(200px circle at ${mouseX}px ${mouseY}px, black, transparent)`,
                }}
            >
                {Array.from({ length: 20 }).map((_, i) => (
                    <span
                        key={i}
                        className="text-8xl sm:text-[15rem] font-black italic tracking-tighter rotate-[15deg] uppercase leading-none text-transparent bg-clip-text bg-gradient-to-br from-[#00ff88] to-[#00d4ff] opacity-80"
                    >
                        {tags[i % tags.length]}
                    </span>
                ))}
            </motion.div>
        </div>
    );
};

// 3. Hype-Meter (Vertical Reactive Bar)
export const HypeMeter = () => {
    const mouseX = useMotionValue(0);
    const [hypeLevel, setHypeLevel] = useState(20);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const movement = Math.abs(e.movementX) + Math.abs(e.movementY);
            if (movement > 0) {
                setHypeLevel(prev => Math.min(100, prev + movement * 0.5));
            }
        };

        const interval = setInterval(() => {
            setHypeLevel(prev => Math.max(20, prev - 2));
        }, 50);

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="hidden sm:flex flex-col items-center gap-2 h-32 w-4">
            <div className="flex-1 w-2 bg-white/10 rounded-full overflow-hidden flex flex-col justify-end">
                <motion.div
                    animate={{ height: `${hypeLevel}%` }}
                    className="w-full bg-[#00ff88] shadow-[0_0_15px_#00ff88]"
                />
            </div>
            <span className="text-[8px] font-black text-[#00ff88] rotate-90 origin-center whitespace-nowrap uppercase tracking-widest">HYPE METER</span>
        </div>
    );
};

// 4. Hype ZipTie (Animated Security Tag)
export const HypeZipTie = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="relative cursor-pointer w-12 h-12 sm:w-20 sm:h-20"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            animate={isHovered ? {
                x: [0, -2, 2, -1, 1, 0],
                rotate: [0, -5, 5, -3, 3, 0],
            } : {}}
            transition={{ duration: 0.1, repeat: isHovered ? Infinity : 0 }}
        >
            <svg viewBox="0 0 24 24" className={`w-full h-full ${isHovered ? 'text-[#00ff88]' : 'text-white/40'}`}>
                <path fill="none" stroke="currentColor" strokeWidth="2" d="M7,10 L7,14 L17,14 L17,10 M17,10 L7,10 M12,4 L12,10 M7,14 A5,5 0 0,0 17,14" />
                <rect x="10" y="2" width="4" height="4" fill="currentColor" />
            </svg>

            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 2 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="absolute inset-0 pointer-events-none"
                    >
                        {Array.from({ length: 8 }).map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ x: 0, y: 0 }}
                                animate={{ x: (i % 2 === 0 ? 1 : -1) * 20, y: (i < 4 ? 1 : -1) * 20 }}
                                transition={{ duration: 0.3 }}
                                className="absolute top-1/2 left-1/2 w-1 h-1 bg-[#00ff88] rounded-full blur-[1px]"
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// 5. Spray Can Icon (Wiggles and releases particles)
export const SprayCanIcon = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="relative cursor-pointer w-12 h-12 sm:w-20 sm:h-20"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            animate={isHovered ? {
                rotate: [0, -10, 10, -10, 10, 0],
                x: [0, -1, 1, -1, 1, 0]
            } : {}}
            transition={{ duration: 0.3, repeat: isHovered ? Infinity : 0 }}
        >
            <svg viewBox="0 0 24 24" className={`w-full h-full ${isHovered ? 'text-[#00ff88]' : 'text-white/40'}`}>
                <path fill="currentColor" d="M16 10V8h-2V4h-4v4H8v2h8zM9 11v11h6V11H9z" />
                <path fill="currentColor" d="M12 2a1 1 0 100 2 1 1 0 000-2z" opacity="0.5" />
            </svg>

            <AnimatePresence>
                {isHovered && (
                    <div className="absolute top-0 right-0 pointer-events-none">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
                                animate={{
                                    x: 20 + Math.random() * 30,
                                    y: -20 - Math.random() * 30,
                                    opacity: 0,
                                    scale: 1.5
                                }}
                                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                                className="absolute w-2 h-2 bg-[#00ff88] rounded-full blur-[2px]"
                            />
                        ))}
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// 6. Floating Crown (Bobbing and smooth)
export const FloatingCrown = () => {
    return (
        <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-12 h-12 sm:w-20 sm:h-20 text-[#fbbf24] drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]"
        >
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5ZM19 19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V18H19V19Z" />
            </svg>
        </motion.div>
    );
};

// 7. Magnetic Icon Wrapper (Pulls toward cursor within 50px)
export const MagneticIconWrapper = ({ children }: { children: React.ReactNode }) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, { stiffness: 150, damping: 15 });
    const springY = useSpring(y, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e: MouseEvent) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const distance = Math.sqrt(Math.pow(clientX - centerX, 2) + Math.pow(clientY - centerY, 2));

        if (distance < 100) {
            const magX = (clientX - centerX) * 0.3;
            const magY = (clientY - centerY) * 0.3;
            x.set(magX);
            y.set(magY);
        } else {
            x.set(0);
            y.set(0);
        }
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <motion.div ref={ref} style={{ x: springX, y: springY }}>
            {children}
        </motion.div>
    );
};

// 8. Heat Haze SVG Filter
export const HeatHazeDef = () => {
    return (
        <svg className="absolute w-0 h-0">
            <defs>
                <filter id="heat-haze">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.01 0.05"
                        numOctaves="2"
                        result="noise"
                    >
                        <animate
                            attributeName="baseFrequency"
                            dur="2s"
                            values="0.01 0.05;0.01 0.1;0.01 0.05"
                            repeatCount="indefinite"
                        />
                    </feTurbulence>
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="noise"
                        scale="8"
                        xChannelSelector="R"
                        yChannelSelector="G"
                    />
                </filter>
            </defs>
        </svg>
    );
};

// 9. Bass-Thumping Boombox (Pixel-art style pulse)
export const BoomboxIcon = () => {
    return (
        <motion.div
            animate={{
                scale: [1, 1.1, 1],
                rotate: [-1, 1, -1]
            }}
            transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: "easeInOut"
            }}
            className="w-16 h-16 sm:w-24 sm:h-24 text-white p-2"
        >
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 6H3c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-1 12H4V8h16v10zM12 10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM5 10c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm14 0c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z" />
            </svg>
        </motion.div>
    );
};

// 10. Smoldering Pulsator Background
export const SmolderingPulsator = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <motion.div
                animate={{
                    opacity: [0.1, 0.3, 0.1],
                    scale: [1, 1.2, 1]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute inset-0 bg-gradient-radial from-[#ff4d4d]/20 via-[#ff8c00]/5 to-transparent blur-[100px]"
            />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay" />
        </div>
    );
};
