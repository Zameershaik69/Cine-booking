import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingCard from '../components/UI/FloatingCard';
import { CheckCircle2, User, Loader2 } from 'lucide-react';
import api from '../services/api';

const MOCK_SHOW = {
    _id: 'show_mock_123',
    price: 15,
    movie: {
        title: "Interstellar Resurgence"
    },
    seats: [
        { seatId: "A1", status: "available" }, { seatId: "A2", status: "booked" }, { seatId: "A3", status: "available" }, { seatId: "A4", status: "available" },
        { seatId: "A5", status: "available" }, { seatId: "B1", status: "available" }, { seatId: "B2", status: "locked" }, { seatId: "B3", status: "locked" },
        { seatId: "B4", status: "available" }, { seatId: "B5", status: "available" }, { seatId: "C1", status: "available" }, { seatId: "C2", status: "available" },
        { seatId: "C3", status: "available" }, { seatId: "C4", status: "available" }, { seatId: "C5", status: "available" }
    ]
};

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const passedMovie = location.state?.mockMovie;
    
    // Override the show's movie title if we navigated from a specific movie
    if (passedMovie && MOCK_SHOW.movie.title !== passedMovie.title) {
        MOCK_SHOW.movie.title = passedMovie.title;
    }

    const [show, setShow] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        // Mock loading the show layout
        const timer = setTimeout(() => {
            setShow(MOCK_SHOW);
            setLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const toggleSeat = (seatId, status) => {
        if (status !== 'available') return;
        if (selectedSeats.includes(seatId)) {
            setSelectedSeats(selectedSeats.filter(s => s !== seatId));
        } else {
            if (selectedSeats.length < 6) { // Max 6 seats
                setSelectedSeats([...selectedSeats, seatId]);
            }
        }
    };

    const handleMockCheckout = async () => {
        if (selectedSeats.length === 0) return;
        setProcessing(true);

        // Simulate Razorpay/Backend Processing delay
        setTimeout(() => {
            setProcessing(false);
            setSuccess(true);
            
            // Navigate away after showing success
            setTimeout(() => {
                navigate('/profile');
            }, 2500);
            
        }, 2000);
    };

    if (loading) return (
        <div className="pt-32 flex justify-center items-center min-h-screen">
            <div className="w-16 h-16 border-t-4 border-pink-neon border-solid rounded-full animate-spin"></div>
        </div>
    );

    const totalAmount = selectedSeats.length * show.price;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="pt-32 pb-20 px-6 min-h-screen text-white w-full max-w-4xl mx-auto"
        >
            <h1 className="text-4xl md:text-5xl font-orbitron font-black text-center mb-10 uppercase tracking-tighter">
                Sector: <span className="text-cyan-neon">{show.movie.title}</span>
            </h1>

            {!success ? (
                <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                    {/* Seat Map */}
                    <div className="flex-1">
                        <FloatingCard className="p-4 md:p-8 border border-white/5 bg-space-950/20 relative overflow-hidden">
                            {/* Animated scanning line overlay */}
                            <div className="absolute inset-x-0 top-0 h-[1px] bg-cyan-neon/10 animate-scan-slow opacity-30" />

                            {/* Screen Graphic */}
                            <div className="w-full h-16 bg-gradient-to-t from-cyan-neon/30 to-transparent rounded-t-[100px] border-b-[2px] border-cyan-neon mb-16 shadow-[0_15px_40px_rgba(6,182,212,0.2)] relative flex items-center justify-center">
                                <span className="text-[10px] font-black text-cyan-neon tracking-[0.6em] uppercase opacity-60">Visual Projection Field</span>
                            </div>

                            {/* Seats Grid - Scaling for mobile */}
                            <div className="grid grid-cols-5 gap-2 md:gap-3 max-w-sm mx-auto mb-10">
                                {show.seats.map(seat => {
                                    let baseClass = "w-10 h-10 md:w-12 md:h-12 rounded-sm border flex items-center justify-center text-[10px] font-black transition-all cursor-pointer font-orbitron ";
                                    
                                    if (seat.status === 'booked') {
                                        baseClass += "bg-white/5 border-white/5 text-transparent cursor-not-allowed overflow-hidden grayscale opacity-20";
                                    } else if (seat.status === 'locked') {
                                        baseClass += "bg-yellow-500/10 border-yellow-500/30 text-yellow-500/50 cursor-not-allowed animate-pulse";
                                    } else if (selectedSeats.includes(seat.seatId)) {
                                        baseClass += "bg-pink-neon border-pink-neon text-white shadow-[0_0_20px_#ff007a] scale-110 rotate-3";
                                    } else {
                                        baseClass += "bg-transparent border-white/10 text-gray-600 hover:border-cyan-neon hover:text-cyan-neon hover:bg-cyan-neon/5";
                                    }

                                    return (
                                        <div 
                                            key={seat.seatId} 
                                            className={baseClass}
                                            onClick={() => toggleSeat(seat.seatId, seat.status)}
                                        >
                                            {seat.status !== 'booked' && seat.seatId}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Legend */}
                            <div className="flex flex-wrap justify-center gap-6 mt-12 text-[9px] font-black uppercase tracking-widest text-gray-600 border-t border-white/5 pt-8">
                                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm border border-white/20"></div> Available</div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-pink-neon"></div> Selected</div>
                                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-white/10 opacity-30"></div> Occupied</div>
                            </div>
                        </FloatingCard>
                    </div>

                    {/* Summary Sidebar */}
                    <div className="w-full md:w-80 shrink-0">
                        <FloatingCard className="p-8 border border-white/5 sticky top-32 bg-space-950/40">
                            <h3 className="text-xl font-orbitron font-black uppercase tracking-tighter border-b border-white/5 pb-4 mb-6">MANIFEST</h3>
                            
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-500">
                                    <span>Allocated Sectors</span>
                                    <span className="text-white font-black">{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'NONE_'}</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-500">
                                    <span>Unit Valuation</span>
                                    <span className="text-white font-black">${show.price}</span>
                                </div>
                                <div className="w-full h-px bg-white/5 my-4"></div>
                                <div className="flex justify-between items-center text-sm font-black uppercase tracking-[0.2em]">
                                    <span className="text-gray-400">Total Net</span>
                                    <span className="text-2xl text-pink-neon font-orbitron font-black">${totalAmount}</span>
                                </div>
                            </div>

                            <button 
                                onClick={handleMockCheckout}
                                disabled={selectedSeats.length === 0 || processing}
                                className={`cyber-border w-full py-5 rounded-sm font-black uppercase tracking-widest text-xs flex justify-center items-center gap-3 transition-all ${
                                    selectedSeats.length === 0 
                                    ? 'bg-white/5 text-gray-700 cursor-not-allowed opacity-50' 
                                    : 'bg-cyan-neon text-black hover:bg-white box-glow cursor-pointer'
                                }`}
                            >
                                {processing ? <><Loader2 className="animate-spin w-4 h-4"/> Uplinking Data...</> : 'Initialize Transaction'}
                            </button>
                        </FloatingCard>
                    </div>

                            <button 
                                onClick={handleMockCheckout}
                                disabled={selectedSeats.length === 0 || processing}
                                className={`w-full py-4 rounded-xl font-bold text-lg flex justify-center items-center gap-2 transition-all ${
                                    selectedSeats.length === 0 
                                    ? 'bg-white/5 text-gray-500 cursor-not-allowed' 
                                    : 'bg-cyan-neon text-black hover:bg-cyan-400 box-glow cursor-pointer'
                                }`}
                            >
                                {processing ? <><Loader2 className="animate-spin w-5 h-5"/> Uplinking...</> : 'Confirm Payment'}
                            </button>
                        </FloatingCard>
                    </div>
                </div>
            ) : (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                >
                    <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6 border border-green-500/50">
                        <CheckCircle2 className="w-12 h-12 text-green-400" />
                    </div>
                    <h2 className="text-4xl font-orbitron font-bold text-green-400 mb-4">Booking Secured!</h2>
                    <p className="text-xl text-gray-300">Your anti-gravity pass is locked in.</p>
                    <p className="text-sm text-gray-500 mt-2">Redirecting to flight logs...</p>
                </motion.div>
            )}
        </motion.div>
    );
};

export default Checkout;
