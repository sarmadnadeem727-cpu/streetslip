import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const BlueprintGrid = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [gridRef, setGridRef] = useState<HTMLDivElement | null>(null);
    const [nearestIntersection, setNearestIntersection] = useState<{ x: number, y: number } | null>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!gridRef) return;
            const rect = gridRef.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            setMousePos({ x, y });

            // Calculate nearest 50px intersection
            const gridSize = 50;
            const snapX = Math.round(x / gridSize) * gridSize;
            const snapY = Math.round(y / gridSize) * gridSize;
            setNearestIntersection({ x: snapX, y: snapY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [gridRef]);

    return (
        <div ref={setGridRef} className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Base Grid */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
                }}
            />

            {/* Dynamic Intersection Marker */}
            {nearestIntersection && (
                <motion.div
                    className="absolute"
                    animate={{ x: nearestIntersection.x - 6, y: nearestIntersection.y - 6 }}
                    transition={{ duration: 0 }} // Instant snap
                >
                    {/* Crosshair "+" Marker */}
                    <div className="relative w-3 h-3 flex items-center justify-center">
                        <div className="absolute w-full h-[1px] bg-[#00ff88] shadow-[0_0_5px_#00ff88]" />
                        <div className="absolute h-full w-[1px] bg-[#00ff88] shadow-[0_0_5px_#00ff88]" />
                    </div>

                    {/* Coordinates Label */}
                    <div className="absolute top-3 left-3 text-[10px] font-mono text-[#00ff88] whitespace-nowrap bg-[#050505] px-2 py-1 border border-[#00ff88] shadow-[0_0_10px_rgba(0,255,136,0.3)] z-50">
                        DRIP_VERIFIED // SEC_{Math.floor(nearestIntersection.x / 50).toString().padStart(2, '0')}
                    </div>
                </motion.div>
            )}

            {/* Peripheral HUD Elements */}
            <div className="absolute bottom-4 left-4 text-[10px] sm:text-xs font-mono text-white/30 uppercase tracking-widest">
                <div>SYS.STATUS: ONLINE</div>
                <div>GRID.OPACITY: 5%</div>
            </div>
            <div className="absolute top-4 right-4 text-[10px] sm:text-xs font-mono text-white/30 uppercase tracking-widest text-right">
                <div>TARGET.LOCK: ACTIVE</div>
                <div>RENDER.MODE: VECTOR</div>
            </div>
        </div>
    );
};
