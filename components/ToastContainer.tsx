import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, ShoppingBag, Zap } from 'lucide-react';

export interface Toast {
    id: string;
    message: string;
    type: 'success' | 'info';
    action?: { label: string; onClick: () => void };
}

interface ToastContainerProps {
    toasts: Toast[];
    removeToast: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, removeToast }) => {
    return (
        <div className="fixed top-24 right-4 z-[100] flex flex-col gap-3 pointer-events-none">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <motion.div
                        key={toast.id}
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 50, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="pointer-events-auto bg-black/80 backdrop-blur-md border border-[#00ff88]/50 p-4 rounded-2xl shadow-[0_10px_40px_rgba(0,255,136,0.15)] flex items-start gap-4 min-w-[320px] max-w-sm"
                    >
                        <div className="bg-[#00ff88]/10 p-2 rounded-full shrink-0 border border-[#00ff88]/20">
                            <CheckCircle className="h-5 w-5 text-[#00ff88]" />
                        </div>
                        <div className="flex-1 pt-0.5">
                            <p className="text-white text-2xl font-black uppercase tracking-wide leading-tight mb-1 font-sans">{toast.message}</p>
                            {toast.action && (
                                <button
                                    onClick={toast.action.onClick}
                                    className="mt-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#00ff88] hover:text-white transition-colors flex items-center gap-1.5 bg-[#00ff88]/10 px-3 py-1.5 rounded-lg border border-[#00ff88]/20 hover:bg-[#00ff88]/20"
                                >
                                    {toast.action.label} <ShoppingBag className="h-3 w-3" />
                                </button>
                            )}
                        </div>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="text-gray-500 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
                        >
                            <X className="h-4 w-4" />
                        </button>

                        {/* Progress Bar (Optical illusion of time) */}
                        <motion.div
                            initial={{ width: "100%" }}
                            animate={{ width: "0%" }}
                            transition={{ duration: 3, ease: "linear" }}
                            className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#00ff88]/30 rounded-full"
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default ToastContainer;
