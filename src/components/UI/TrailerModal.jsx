import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Activity, Cpu, Zap, Binary, ShieldAlert, WifiHigh } from 'lucide-react';
import { SignalStrength, StatusBadge, HUDHeader } from './HUDStats';
import { audioService } from '../../services/audioService';

const TrailerModal = ({ isOpen, onClose, movie }) => {
    const [isDecoding, setIsDecoding] = useState(true);

    useEffect(() => {
        if (isOpen) {
            audioService.playScan();
            setIsDecoding(true);
            const timer = setTimeout(() => {
                audioService.playDecode();
                setIsDecoding(false);
            }, 2000);
            document.body.style.overflow = 'hidden';
            return () => clearTimeout(timer);
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    const handleClose = () => {
        audioService.playClick();
        onClose();
    };

    if (!movie) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-10"
                >
                    <div className="w-full max-w-6xl relative transmission-frame group">
                        {/* Header Stats */}
                        <div className="absolute -top-12 left-0 w-full flex justify-between items-end px-2">
                            <div className="flex gap-6 items-center">
                                <HUDHeader 
                                    title={movie.title} 
                                    statusText={isDecoding ? "DECODING_STREAM..." : "SIGNAL_LOCKED"} 
                                    color={isDecoding ? "pink" : "cyan"}
                                />
                                <div className="hidden lg:flex gap-4 mb-2 ml-4">
                                     <StatusBadge 
                                        status={isDecoding ? "PENETRATING" : "SECURE"} 
                                        color={isDecoding ? "pink" : "cyan"} 
                                    />
                                </div>
                            </div>
                            <button 
                                onClick={handleClose}
                                className="text-gray-400 hover:text-white transition-colors mb-4"
                            >
                                <X className="w-8 h-8" />
                            </button>
                        </div>

                        {/* Video Container */}
                        <div className="relative aspect-video bg-black overflow-hidden flex items-center justify-center">
                            {isDecoding ? (
                                <div className="flex flex-col items-center gap-6">
                                   <div className="relative">
                                       <Binary className="w-16 h-16 text-pink-neon animate-spin" />
                                       <motion.div 
                                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                                            transition={{ repeat: Infinity, duration: 1 }}
                                            className="absolute inset-0 border-2 border-pink-neon rounded-full"
                                       />
                                   </div>
                                   <div className="font-orbitron text-[10px] text-pink-neon animate-pulse tracking-[0.8em] uppercase text-center">Interpreting Data Stream...</div>
                                   <div className="w-64 h-1 bg-white/5 relative overflow-hidden rounded-full">
                                       <motion.div 
                                            initial={{ x: '-100%' }}
                                            animate={{ x: '100%' }}
                                            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                            className="absolute inset-0 bg-pink-neon shadow-[0_0_15px_#ff007a]"
                                       />
                                   </div>
                                </div>
                            ) : (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="w-full h-full"
                                >
                                    <iframe 
                                        src={`${movie.videoUrl}?autoplay=1&mute=0&controls=0&showinfo=0&rel=0&modestbranding=1`}
                                        title={movie.title}
                                        className="w-full h-full grayscale-[10%] opacity-90 transition-opacity duration-1000"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                    
                                    {/* HUD Overlays */}
                                    <div className="absolute inset-0 pointer-events-none border-[1px] border-white/5 m-4">
                                        <div className="absolute top-0 left-0 border-t-2 border-l-2 border-cyan-neon w-6 h-6" />
                                        <div className="absolute top-0 right-0 border-t-2 border-r-2 border-cyan-neon w-6 h-6" />
                                        <div className="absolute bottom-0 left-0 border-b-2 border-l-2 border-cyan-neon w-6 h-6" />
                                        <div className="absolute bottom-0 right-0 border-b-2 border-r-2 border-cyan-neon w-6 h-6" />
                                        
                                        {/* Dynamic Crosshair */}
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 opacity-20">
                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-1/2 bg-cyan-neon" />
                                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-1/2 bg-cyan-neon" />
                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/2 h-px bg-cyan-neon" />
                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-px bg-cyan-neon" />
                                        </div>
                                    </div>

                                    {/* Scanning Line */}
                                    <div className="absolute inset-x-0 top-0 h-[3px] bg-cyan-neon/20 shadow-[0_0_15px_#00f3ff] animate-scan-slow pointer-events-none opacity-50" />
                                </motion.div>
                            )}
                        </div>

                        {/* Footer Stats */}
                        <div className="absolute -bottom-16 left-0 w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-4 px-2">
                             <div className="space-y-3">
                                <div className="flex gap-4 text-[8px] font-black text-gray-500 uppercase tracking-widest border-l border-cyan-neon/40 pl-4">
                                    <div className="flex flex-col">
                                        <span className="text-white/20">Source_Node</span>
                                        <span>{movie.metadata?.uplinkPort || 'SEC.ARC'}</span>
                                    </div>
                                    <div className="flex flex-col border-l border-white/5 pl-4">
                                        <span className="text-white/20">Bitrate</span>
                                        <span className="text-cyan-neon">48.2 MBPS</span>
                                    </div>
                                    <div className="flex flex-col border-l border-white/5 pl-4">
                                        <span className="text-white/20">Protocol</span>
                                        <span>UDP_X_SECURE</span>
                                    </div>
                                </div>
                             </div>
                             
                             <div className="flex gap-10 items-end bg-black/40 border border-white/5 px-8 py-3 rounded-sm backdrop-blur-2xl">
                                <div className="flex flex-col gap-1">
                                    <span className="text-gray-600 text-[8px] font-black uppercase tracking-widest flex items-center gap-1"><Cpu className="w-3 h-3"/> AI_Confidence</span>
                                    <span className="text-pink-neon text-[10px] font-black font-orbitron">{movie.metadata?.aiConfidence || 'HIGH'}</span>
                                </div>
                                
                                <SignalStrength strength={isDecoding ? 20 : parseInt(movie.metadata?.signalStrength) || 88} color={isDecoding ? "pink" : "cyan"} />
                                
                                <div className="flex flex-col gap-1 border-l border-white/5 pl-8">
                                    <span className="text-gray-600 text-[8px] font-black uppercase tracking-widest">Archive_Status</span>
                                    <span className="text-white text-[10px] font-black">{movie.metadata?.archiveStatus || 'ACTIVE'}</span>
                                </div>
                             </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default TrailerModal;
