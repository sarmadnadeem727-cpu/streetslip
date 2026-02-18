import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VectorTitleProps {
    text: string;
}

export const VectorTitle: React.FC<VectorTitleProps> = ({ text }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [animationComplete, setAnimationComplete] = useState(false);

    return (
        <div
            className="relative cursor-crosshair select-none"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <svg className="w-full h-[100px] sm:h-[180px] overflow-visible">
                {/* 1. Wireframe Construction (Always visible as base, or animate out) */}
                <motion.text
                    x="50%"
                    y="50%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    className="text-6xl sm:text-9xl font-black italic tracking-tight"
                    fill="transparent"
                    stroke="#00d4ff"
                    strokeWidth="1px"
                    strokeDasharray="1000"
                    strokeDashoffset="1000"
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 1.5, ease: "linear" }}
                    onAnimationComplete={() => setAnimationComplete(true)}
                >
                    {text}
                </motion.text>

                {/* 2. Solid Fill Snap (Visible after animation completes, hides on hover) */}
                {animationComplete && (
                    <motion.text
                        x="50%"
                        y="50%"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        className="text-6xl sm:text-9xl font-black italic tracking-tight"
                        fill="white"
                        stroke="none"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: isHovered ? 0 : [0, 1, 0, 1, 1], // Glitch flicker in
                            x: isHovered ? 0 : [0, -2, 2, 0] // Positional glitch
                        }}
                        transition={{ duration: 0.2, times: [0, 0.2, 0.4, 0.6, 1] }}
                    >
                        {text}
                    </motion.text>
                )}
            </svg>
        </div>
    );
};
