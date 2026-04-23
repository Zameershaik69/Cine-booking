import React, { useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import FloatingCard from '../components/UI/FloatingCard';
import { Ticket, Film, Calendar, LogOut, Loader2, ShieldCheck, Activity, Fingerprint, Zap, Landmark, Cpu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SignalStrength, StatusBadge, MetaGrid } from '../components/UI/HUDStats';
import { audioService } from '../services/audioService';

const Profile = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/');
            return;
        }

        const fetchBookings = () => {
             setTimeout(() => {
                 setBookings([
                     {
                         id: 'BKG-99281',
                         movie: 'Interstellar Resurgence',
                         date: '2026-05-12T20:00:00Z',
                         seats: ['A4', 'A5'],
                         amount: 30,
                         status: 'confirmed',
                         poster: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=200&auto=format&fit=crop',
                         sector: 'CORE_SECTOR_A',
                         signal: 98
                     },
                     {
                         id: 'BKG-88124',
                         movie: 'Blade Runner: 2049',
                         date: '2026-04-01T18:30:00Z',
                         seats: ['F12'],
                         amount: 15,
                         status: 'past',
                         poster: 'https://images.unsplash.com/photo-1618519764620-7403abdbdee9?q=80&w=200&auto=format&fit=crop',
                         sector: 'OUTER_RIM_F',
                         signal: 72
                     }
                 ]);
                 setLoading(false);
             }, 1500);
        };

        fetchBookings();
    }, [user, navigate]);

    const handleLogout = () => {
        audioService.playClick();
        logout();
    };

    if (!user) return null;

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-32 pb-32 px-4 md:px-6 min-h-screen text-white w-full max-w-7xl mx-auto"
        >
            <div className="flex flex-col lg:flex-row gap-12">
                {/* Left Sidebar - Biometric Identity */}
                <div className="w-full lg:w-1/3 space-y-8">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="w-5 h-5 text-cyan-neon" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic">Clearance: Level_7</span>
                        </div>
                        <StatusBadge status="IDENTIFIED" color="cyan" />
                    </div>

                    <FloatingCard className="p-10 border border-white/5 flex flex-col items-center text-center relative overflow-hidden bg-space-950/40 group">
                        {/* High-Tech Scanline Animation */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                             <motion.div 
                                animate={{ top: ['0%', '100%', '0%'] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className="absolute w-full h-[1px] bg-cyan-neon/30 shadow-[0_0_15px_#00f3ff] z-10" 
                             />
                        </div>
                        
                        <div className="w-32 h-32 rounded-sm bg-white/5 mb-8 p-1 relative border border-white/10 group-hover:border-cyan-neon/40 transition-colors">
                            <div className="absolute -inset-4 border border-cyan-neon/10 opacity-40 group-hover:opacity-100 transition-opacity"></div>
                            <div className="w-full h-full bg-space-950 rounded-sm flex items-center justify-center relative overflow-hidden">
                                <span className="text-5xl font-orbitron font-black text-white group-hover:text-cyan-neon transition-colors z-10">{user.name.charAt(0)}</span>
                                <Fingerprint className="absolute bottom-[-10px] right-[-10px] w-20 h-20 text-white/5 rotate-12" />
                            </div>
                        </div>

                        <div className="mb-8 space-y-2">
                            <h2 className="text-3xl font-orbitron font-black uppercase tracking-tighter text-white glitch-text" data-text={user.name}>{user.name}</h2>
                            <div className="flex items-center justify-center gap-3">
                                <Activity className="w-3 h-3 text-cyan-neon animate-pulse" />
                                <span className="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em] font-mono">ALIAS:// {user.name.split(' ')[0].toUpperCase()}_X24</span>
                            </div>
                        </div>
                        
                        <div className="w-full h-px bg-white/5 mb-8"></div>

                        <div className="w-full space-y-8 mb-12">
                            <div className="flex justify-between items-end">
                                <div className="flex flex-col items-start gap-1">
                                    <span className="text-gray-600 text-[8px] font-black uppercase tracking-widest flex items-center gap-1"><Ticket className="w-3 h-3"/> Active_Uplinks</span>
                                    <span className="text-cyan-neon font-orbitron text-xl leading-none">02</span>
                                </div>
                                <SignalStrength strength={94} />
                            </div>
                            
                            <MetaGrid items={[
                                { label: "ARCHIVE_DEPTH", value: "14_TB" },
                                { label: "CREDITS", value: "8.42K" },
                                { label: "NODE_LOC", value: "DELTA_9" },
                                { label: "UPTIME", value: "99.9%" }
                            ]} />
                        </div>

                        <button 
                            onClick={handleLogout}
                            onMouseEnter={() => audioService.playHover()}
                            className="w-full py-5 text-[10px] font-black uppercase tracking-[0.4em] text-red-500 border border-red-500/20 hover:bg-red-500/10 transition-all cursor-pointer flex items-center justify-center gap-3"
                        >
                            <LogOut className="w-4 h-4" /> TERMINATE_SESSION
                        </button>
                    </FloatingCard>

                    {/* Meta Info */}
                    <div className="glass p-6 rounded-2xl border border-white/5">
                        <div className="flex items-center gap-3 mb-4 border-b border-white/5 pb-4">
                            <Cpu className="w-4 h-4 text-gray-600" />
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">System_Diagnostics</span>
                        </div>
                        <div className="text-[8px] font-black text-gray-600 uppercase tracking-[0.5em] space-y-2">
                            <p>ENCRYPTION: AES_256_RSA</p>
                            <p>LAST_SYNC: {new Date().toLocaleTimeString()}</p>
                            <p>STABILITY: SECURE_PHASE</p>
                        </div>
                    </div>
                </div>

                {/* Right Area - Flight Logs */}
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-end mb-10">
                        <div className="space-y-4">
                             <div className="flex items-center gap-2 text-[10px] font-black text-cyan-neon uppercase tracking-[0.4em]">
                                <span className="w-8 h-px bg-cyan-neon"></span> SESSION_DATA
                             </div>
                            <h2 className="text-4xl md:text-6xl font-orbitron font-black uppercase tracking-tighter flex items-center gap-4">
                                FLIGHT LOGS
                            </h2>
                        </div>
                        <div className="hidden md:flex flex-col items-end gap-1">
                             <div className="flex items-center gap-2 text-[10px] font-black text-cyan-neon uppercase tracking-widest">
                                <Activity className="w-4 h-4" /> Real-time_Stream
                             </div>
                             <span className="text-[8px] font-bold text-gray-600 uppercase tracking-widest">Buffer_Stable: 94%</span>
                        </div>
                    </div>

                    {loading ? (
                        <div className="glass p-20 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-gray-500 relative overflow-hidden">
                            <div className="absolute inset-x-0 top-0 h-[3px] bg-cyan-neon/20 animate-scan"></div>
                            <Loader2 className="w-16 h-16 animate-spin text-cyan-neon mb-8" />
                            <p className="font-orbitron text-xs tracking-[0.5em] uppercase text-cyan-neon/60 animate-pulse">Decrypting Identity Archives...</p>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            <AnimatePresence>
                                {bookings.map((booking, idx) => (
                                    <motion.div 
                                        key={booking.id}
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.2 }}
                                        className="glass p-8 rounded-2xl border border-white/5 flex flex-col md:flex-row gap-8 hover:border-cyan-neon/30 shadow-xl group relative overflow-hidden transition-all"
                                        onMouseEnter={() => audioService.playHover()}
                                    >
                                        {/* Decode Animation Layer */}
                                        <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-white/5 pointer-events-none group-hover:text-cyan-neon/10 transition-colors hidden md:block">
                                            {idx % 2 === 0 ? '01001011 01010100' : '11001001 00110011'}
                                        </div>

                                        <div className="w-full md:w-40 shrink-0 aspect-[2/3] overflow-hidden rounded-sm border border-white/10 relative group-hover:border-cyan-neon/50 transition-colors shadow-2xl">
                                            <img src={booking.poster} alt={booking.movie} className="w-full h-full object-cover grayscale-[60%] group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" />
                                            <div className="absolute inset-0 bg-cyan-neon/5 opacity-0 group-hover:opacity-100 transition-opacity mix-blend-overlay"></div>
                                        </div>

                                        <div className="flex-1 flex flex-col justify-between pt-2">
                                            <div>
                                                <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
                                                    <div className="space-y-1">
                                                        <h3 className="font-black text-3xl md:text-4xl font-orbitron text-white uppercase tracking-tighter leading-none group-hover:text-cyan-neon transition-colors">{booking.movie}</h3>
                                                        <div className="flex items-center gap-4">
                                                            <span className="text-[10px] font-black text-pink-neon uppercase tracking-widest">{booking.sector}</span>
                                                            <div className="h-px w-8 bg-white/10"></div>
                                                            <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Uplink_EST</span>
                                                        </div>
                                                    </div>
                                                    <StatusBadge 
                                                        status={booking.status} 
                                                        color={booking.status === 'confirmed' ? "cyan" : "gray"} 
                                                        animate={booking.status === 'confirmed'} 
                                                    />
                                                </div>
                                                
                                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-[10px] font-black uppercase tracking-widest text-gray-500 mb-8 font-mono">
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-2 text-cyan-neon/60"><Calendar className="w-3 h-3" /> Date</div>
                                                        <div className="text-white text-xs">{new Date(booking.date).toLocaleDateString()}</div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-2 text-pink-neon/60"><Zap className="w-3 h-3" /> Seat</div>
                                                        <div className="text-white text-xs">SEC_{booking.seats.join('_')}</div>
                                                    </div>
                                                    <div className="space-y-2 lg:col-span-2">
                                                        <SignalStrength strength={booking.signal} color={idx === 0 ? "cyan" : "pink"} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-4 flex flex-col sm:flex-row justify-between items-center bg-white/5 border border-white/5 p-6 rounded-sm gap-6">
                                                <div className="flex items-end gap-2">
                                                    <span className="text-[10px] font-black text-gray-600 uppercase mb-1">Fee:</span>
                                                    <span className="font-black text-3xl font-orbitron text-pink-neon">${booking.amount}.00</span>
                                                </div>
                                                {booking.status === 'confirmed' && (
                                                    <button 
                                                        onClick={() => audioService.playClick()}
                                                        className="cyber-border w-full sm:w-max px-12 py-4 bg-cyan-neon/5 hover:bg-cyan-neon hover:text-black text-[10px] font-black uppercase tracking-[0.2em] transition-all cursor-pointer shadow-lg group-hover:shadow-cyan-neon/20"
                                                    >
                                                        Download_Pass
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default Profile;
;
