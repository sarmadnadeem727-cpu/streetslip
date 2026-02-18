import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { Search, MapPin, Package, Truck, CheckCircle } from 'lucide-react';
import { PostExService, TrackingInfo } from '../services/PostExService';
import { BoxTruckLoader, PixelHeart, GlitchCross, NeonFloatingCrown } from '../components/PostExAnimations';

const TrackOrder: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [trackingNumber, setTrackingNumber] = useState(searchParams.get('tracking') || '');
    const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const queryTracking = searchParams.get('tracking');
        if (queryTracking) {
            setTrackingNumber(queryTracking);
            // Optional: Auto-trigger search? 
            // Better to let user click or auto-trigger if desired. 
            // Let's auto-trigger for better UX logic in a "scan" scenario.
            handleTrackAuto(queryTracking);
        }
    }, [searchParams]);

    const handleTrackAuto = async (num: string) => {
        setLoading(true);
        setError('');
        try {
            const info = await PostExService.trackOrder(num);
            setTrackingInfo(info);
        } catch (err) {
            setError("COULD NOT LOCATE PACKAGE IN THE VAULT.");
        } finally {
            setLoading(false);
        }
    };

    const handleTrack = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!trackingNumber.trim()) return;

        setLoading(true);
        setError('');
        setTrackingInfo(null);

        try {
            const info = await PostExService.trackOrder(trackingNumber);
            setTrackingInfo(info);
        } catch (err) {
            setError("COULD NOT LOCATE PACKAGE IN THE VAULT.");
        } finally {
            setLoading(false);
        }
    };

    const getStatusComponent = (code: string) => {
        switch (code) {
            case '0001': // At Merchant's Warehouse / Booked
                return <div className="flex flex-col items-center gap-4"><PixelHeart /><p className="text-[#ff0080] font-black uppercase">SECURED AT VAULT</p></div>;
            case '0003': // At PostEx Warehouse
                return <div className="flex flex-col items-center gap-4"><Package className="w-16 h-16 text-[#00ff88] animate-bounce" /><p className="text-[#00ff88] font-black uppercase">PROCESSING AT HUB</p></div>;
            case '0004': // On Route
                return <div className="flex flex-col items-center gap-4"><div className="scale-150"><BoxTruckLoader /></div><p className="text-[#00d4ff] font-black uppercase mt-12">EN ROUTE TO DROP</p></div>;
            case '0005': // Delivered
                return <div className="flex flex-col items-center gap-4"><NeonFloatingCrown /><p className="text-[#fbbf24] font-black uppercase tracking-widest text-xl glow-gold">OFFICIALLY COPPED</p></div>;
            case '0002': // Returned
            case '0006':
            case '0007':
                return <div className="flex flex-col items-center gap-4"><GlitchCross /><p className="text-red-500 font-clash uppercase">RETURNED TO BASE</p></div>;
            default:
                return <div className="flex flex-col items-center gap-4"><Package className="w-16 h-16 text-gray-500" /><p className="text-gray-500 font-bold uppercase">STATUS: {trackingInfo?.orderStatus}</p></div>;
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 bg-[#050505] flex flex-col items-center">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl w-full space-y-12 relative z-10"
            >
                <div className="text-center space-y-4">
                    <h1 className="text-5xl sm:text-7xl font-black italic uppercase tracking-widest text-white leading-none">HYPE TRACK</h1>
                    <p className="text-[#00ff88] font-bold tracking-[0.3em] uppercase text-xs">Locate Your Drop</p>
                </div>

                <form onSubmit={handleTrack} className="relative">
                    <input
                        type="text"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        placeholder="ENTER TRACKING NUMBER"
                        className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-6 text-white text-xl font-bold font-mono focus:border-[#00ff88] outline-none placeholder:text-gray-600 text-center uppercase tracking-widest"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="absolute right-2 top-2 bottom-2 bg-[#00ff88] text-black px-8 rounded-full font-black uppercase italic tracking-wider hover:bg-[#00d4ff] transition-colors disabled:opacity-50"
                    >
                        {loading ? 'SCANNING...' : <Search className="w-6 h-6" />}
                    </button>
                </form>

                <AnimatePresence mode="wait">
                    {loading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex justify-center py-20"
                        >
                            <BoxTruckLoader />
                        </motion.div>
                    )}

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-10"
                        >
                            <GlitchCross />
                            <p className="text-red-500 font-mono mt-4 font-bold">{error}</p>
                        </motion.div>
                    )}

                    {trackingInfo && !loading && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="glass p-8 sm:p-12 rounded-[3rem] border-white/10 bg-[#000]/40 backdrop-blur-xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00ff88] to-[#00d4ff]" />

                            <div className="flex justify-between items-start mb-12 opacity-50">
                                <div className="text-left">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#00ff88]">Order Ref</p>
                                    <p className="text-white font-mono">{trackingInfo.orderRefNumber}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#00ff88]">Tracking #</p>
                                    <p className="text-white font-mono">{trackingInfo.trackingNumber}</p>
                                </div>
                            </div>

                            <div className="py-10 flex justify-center">
                                {getStatusComponent(trackingInfo.messageCode)}
                            </div>

                            <div className="mt-12 pt-8 border-t border-white/10 text-center">
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.5em] mb-2">Current Status</p>
                                <p className="text-2xl sm:text-4xl text-white font-black italic uppercase tracking-wider">{trackingInfo.orderStatus}</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </motion.div>
        </div>
    );
};

export default TrackOrder;
