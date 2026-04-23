import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Zap, Activity, Cpu, Binary } from 'lucide-react';
import { Link } from 'react-router-dom';
import { movieService } from '../../services/movieService';
import { StatusBadge, HUDHeader } from './HUDStats';
import { audioService } from '../../services/audioService';

const SearchOverlay = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isScanning, setIsScanning] = useState(false);
    const [hasFoundMatches, setHasFoundMatches] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            audioService.playClick();
            inputRef.current?.focus();
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
            setQuery('');
            setResults([]);
            setHasFoundMatches(false);
        }
    }, [isOpen]);

    useEffect(() => {
        const handleSearch = async () => {
            if (query.trim().length > 1) {
                setIsScanning(true);
                setHasFoundMatches(false);
                audioService.playScan();
                
                const data = await movieService.searchMovies(query);
                
                // Intentional "Sector Scan" delay for immersion
                setTimeout(() => {
                    setResults(data);
                    setIsScanning(false);
                    if (data.length > 0) {
                        setHasFoundMatches(true);
                        audioService.playDecode();
                    }
                }, 800); 
            } else {
                setResults([]);
                setHasFoundMatches(false);
            }
        };

        const timer = setTimeout(handleSearch, 300);
        return () => clearTimeout(timer);
    }, [query]);

    // Decoding text effect logic
    const DecodingText = ({ text }) => {
        const [display, setDisplay] = useState('');
        const chars = '!<>-_\\/[]{}—=+*^?#________';

        useEffect(() => {
            let i = 0;
            const target = text.toUpperCase();
            const interval = setInterval(() => {
                if (i >= target.length) {
                    setDisplay(target);
                    clearInterval(interval);
                    return;
                }
                const randomPart = Array(target.length - i).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join('');
                setDisplay(target.substring(0, i) + randomPart);
                i++;
            }, 30);
            return () => clearInterval(interval);
        }, [text]);

        return <span>{display}</span>;
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    className="fixed inset-0 z-[100] flex flex-col items-center bg-black/95 backdrop-blur-2xl p-6 md:p-20 overflow-y-auto"
                >
                    {/* Background Grid FX */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(rgba(0,243,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

                    {/* Header */}
                    <div className="w-full max-w-4xl flex justify-between items-center mb-12 relative z-10">
                        <HUDHeader title="DATABASE SCAN" statusText="UPLINK: ACTIVE // SECTOR_SEARCH" />
                        <button 
                            onClick={onClose}
                            className="p-3 hover:bg-white/10 rounded-full transition-all text-gray-400 hover:text-white mb-6"
                        >
                            <X className="w-8 h-8" />
                        </button>
                    </div>

                    {/* Search Input Area */}
                    <div className="w-full max-w-4xl relative z-10 mb-12">
                        <div className="relative group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-8 h-8 text-cyan-neon/30 group-focus-within:text-cyan-neon transition-colors" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    if (e.target.value.length > 0) audioService.playHover();
                                }}
                                placeholder="INITIALIZE SCAN..."
                                className="w-full bg-white/5 border-b border-white/10 focus:border-cyan-neon p-7 pl-20 text-3xl md:text-6xl font-orbitron font-black uppercase tracking-tighter outline-none transition-all placeholder:text-white/5"
                            />
                            {/* Animated Underline */}
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                className="absolute bottom-0 left-0 h-[1px] bg-cyan-neon shadow-[0_0_15px_#00f3ff]"
                            />
                        </div>
                        
                        <div className="mt-6 flex justify-between items-center px-2">
                            <div className="flex gap-6">
                                <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest flex items-center gap-2">
                                    <Cpu className="w-3.5 h-3.5" /> Core.Arc: Active
                                </span>
                                <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest flex items-center gap-2">
                                    <Binary className="w-3.5 h-3.5" /> Protocol: AES-X
                                </span>
                            </div>
                            <StatusBadge 
                                status={isScanning ? "SCANNING_CLUSTER..." : hasFoundMatches ? "MATCHES_RESOLVED" : "AWAITING_INPUT"} 
                                color={isScanning ? "pink" : hasFoundMatches ? "cyan" : "gray"}
                            />
                        </div>
                    </div>

                    {/* Results Grid */}
                    <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                        <AnimatePresence>
                            {!isScanning && results.map((movie, idx) => (
                                <motion.div
                                    key={movie._id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                                >
                                    <Link 
                                        to={`/movie/${movie._id}`}
                                        onClick={() => {
                                            audioService.playClick();
                                            onClose();
                                        }}
                                        onMouseEnter={() => audioService.playHover()}
                                        className="flex gap-6 p-5 glass border border-white/5 hover:border-cyan-neon group overflow-hidden relative transition-all"
                                    >
                                        {/* Scanline Effect on Hover */}
                                        <div className="absolute inset-x-0 top-0 h-[2px] bg-cyan-neon/30 -translate-y-[100%] group-hover:translate-y-[1000%] transition-all duration-700 ease-linear pointer-events-none"></div>

                                        <div className="w-24 h-36 shrink-0 relative overflow-hidden rounded-sm border border-white/10 group-hover:border-cyan-neon/30 transition-colors">
                                            <img src={movie.posterPath} alt={movie.title} className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-500" />
                                            <div className="absolute inset-0 bg-space-950/20 group-hover:bg-transparent transition-colors"></div>
                                        </div>
                                        <div className="flex-1 space-y-4 pt-1">
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-orbitron font-black text-xl leading-none group-hover:text-cyan-neon transition-colors">
                                                    <DecodingText text={movie.title} />
                                                </h3>
                                                <span className="text-[10px] font-black text-pink-neon flex items-center gap-1">
                                                    <Zap className="w-3.5 h-3.5" /> {movie.voteAverage}
                                                </span>
                                            </div>
                                            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest line-clamp-2 leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity">
                                                {movie.overview}
                                            </p>
                                            <div className="flex gap-3">
                                                {movie.genres?.slice(0, 2).map(g => (
                                                    <span key={g} className="text-[8px] font-black uppercase tracking-widest px-3 py-1 border border-white/5 rounded-sm bg-white/5 group-hover:border-cyan-neon/20 transition-colors">
                                                        {g}
                                                    </span>
                                                ))}
                                                <span className="ml-auto text-[8px] font-black text-gray-700 uppercase tracking-widest">
                                                    Sector.{movie.metadata?.uplinkPort || 'UNK'}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {/* Scanning State Visual */}
                        {isScanning && (
                            <div className="col-span-full py-32 flex flex-col items-center gap-8">
                                <div className="relative">
                                    <Activity className="w-20 h-20 text-pink-neon animate-pulse" />
                                    <motion.div 
                                        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                        className="absolute inset-0 border-2 border-pink-neon rounded-full"
                                    />
                                </div>
                                <div className="space-y-2 text-center">
                                    <div className="font-orbitron text-xl font-black text-cyan-neon animate-pulse tracking-[0.5em] uppercase">Sector Deep Scan In Progress</div>
                                    <div className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Penetrating Archive Clusters...</div>
                                </div>
                            </div>
                        )}

                        {/* Empty State */}
                        {query.length > 2 && results.length === 0 && !isScanning && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full py-32 text-center"
                            >
                                <div className="text-pink-neon font-orbitron font-black text-2xl mb-4 tracking-tighter">DATA FRAGMENT NOT FOUND</div>
                                <p className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.5em]">Sector {query} returned void signal. Database mismatch.</p>
                            </motion.div>
                        )}
                    </div>

                    {/* Footer Info */}
                    <div className="mt-auto pt-20 w-full max-w-4xl flex justify-between items-center text-[8px] font-black text-gray-800 uppercase tracking-[0.6em] pb-10">
                        <span>Terminal://Search_Interface.v.3.1_Refined</span>
                        <div className="flex gap-6">
                             <span>Nodes: CLUSTER-GAMMA</span>
                             <span>Enc: AES-256</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SearchOverlay;
