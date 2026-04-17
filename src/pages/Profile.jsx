import React, { useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import FloatingCard from '../components/UI/FloatingCard';
import { Ticket, Film, Calendar, LogOut, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// Using api if backend was connected, but we will mock it for UI-only demonstration
import api from '../services/api'; 

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

        // Mocking a fetch for user's past bookings to showcase the UI design
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
                         poster: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=200&auto=format&fit=crop'
                     },
                     {
                         id: 'BKG-88124',
                         movie: 'Dune: Part Three',
                         date: '2026-04-01T18:30:00Z',
                         seats: ['F12'],
                         amount: 15,
                         status: 'past',
                         poster: 'https://images.unsplash.com/photo-1446776811953-b23d5732194f?q=80&w=200&auto=format&fit=crop'
                     }
                 ]);
                 setLoading(false);
             }, 1500);
        };

        fetchBookings();
    }, [user, navigate]);

    if (!user) return null;

    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="pt-32 pb-20 px-6 min-h-screen text-white w-full max-w-5xl mx-auto"
        >
            <div className="flex flex-col md:flex-row gap-8">
                {/* Left Sidebar - Profile Summary */}
                <div className="w-full md:w-1/3 space-y-6">
                    <FloatingCard className="p-8 border border-white/5 flex flex-col items-center text-center relative overflow-hidden bg-space-950/40">
                        {/* Biometric Scan Visual */}
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-neon/20 animate-scan-slow opacity-40"></div>
                        
                        <div className="w-24 h-24 rounded-sm bg-white/5 mb-6 p-1 relative border border-white/10 group">
                            <div className="absolute -inset-2 border border-cyan-neon/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="w-full h-full bg-space-950 rounded-sm flex items-center justify-center text-4xl font-orbitron font-black text-cyan-neon">
                                {user.name.charAt(0)}
                            </div>
                        </div>

                        <div className="mb-6 space-y-1">
                            <h2 className="text-2xl font-orbitron font-black uppercase tracking-tighter text-white">{user.name}</h2>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">Alias: {user.name.split(' ')[0]}_01</p>
                        </div>
                        
                        <div className="w-full h-px bg-white/5 mb-8"></div>

                        <div className="w-full space-y-4 mb-10">
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                <span className="text-gray-500 flex items-center gap-2"><Ticket className="w-3 h-3 text-cyan-neon"/> Tickets</span>
                                <span className="text-pink-neon">12_ACTV</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                <span className="text-gray-500 flex items-center gap-2"><Film className="w-3 h-3 text-cyan-neon"/> Archive</span>
                                <span className="text-gray-400">05_PASS</span>
                            </div>
                        </div>

                        <button 
                            onClick={logout}
                            className="cyber-border w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] text-red-500/60 hover:text-red-400 hover:bg-red-500/5 transition-all cursor-pointer"
                        >
                            Terminate_Session
                        </button>
                    </FloatingCard>
                </div>

                {/* Right Area - Booking History */}
                <div className="w-full md:w-2/3">
                    <h2 className="text-3xl font-orbitron font-black uppercase tracking-tighter mb-6 flex items-center gap-3">
                        <div className="w-2 h-8 bg-cyan-neon shadow-[0_0_10px_#00f3ff]"></div>
                        Flight Logs
                    </h2>

                    {loading ? (
                        <div className="glass p-12 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-gray-500">
                            <Loader2 className="w-12 h-12 animate-spin text-cyan-neon mb-6" />
                            <p className="font-orbitron text-xs tracking-[0.3em] uppercase">Decrypting Transaction Archives...</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {bookings.map((booking, idx) => (
                                <motion.div 
                                    key={booking.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="glass p-6 rounded-2xl border border-white/5 flex flex-col sm:flex-row gap-6 hover:border-cyan-neon/40 transition-all group relative overflow-hidden"
                                >
                                    {/* Scanline Overlay */}
                                    <div className="absolute inset-x-0 top-0 h-[1px] bg-cyan-neon/20 group-hover:bg-cyan-neon/50 transition-colors" />

                                    <div className="w-full sm:w-28 shrink-0 aspect-[2/3] sm:aspect-square overflow-hidden rounded-lg border border-white/10">
                                        <img src={booking.poster} alt={booking.movie} className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-500" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-black text-2xl font-orbitron text-white uppercase tracking-tighter line-height-none">{booking.movie}</h3>
                                                <span className={`text-[10px] font-black uppercase px-3 py-1 rounded border ${booking.status === 'confirmed' ? 'bg-cyan-neon/10 text-cyan-neon border-cyan-neon/30' : 'bg-white/5 text-gray-500 border-white/10'}`}>
                                                    {booking.status}
                                                </span>
                                            </div>
                                            <div className="text-xs font-bold text-gray-500 space-y-1 uppercase tracking-widest">
                                                <p className="flex items-center gap-2"><Calendar className="w-3 h-3 text-cyan-neon"/> {new Date(booking.date).toDateString()}</p>
                                                <p className="text-[10px] opacity-60">ID:// {booking.id} • SECTORS:// {booking.seats.join(', ')}</p>
                                            </div>
                                        </div>
                                        <div className="mt-6 flex justify-between items-center border-t border-white/5 pt-4">
                                            <span className="font-black text-xl font-orbitron text-pink-neon">${booking.amount}</span>
                                            {booking.status === 'confirmed' && (
                                                <button className="cyber-border px-6 py-2 bg-white/5 hover:bg-cyan-neon hover:text-black text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer">
                                                    Download Pass
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default Profile;
