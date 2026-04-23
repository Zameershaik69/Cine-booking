import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingCard from '../components/UI/FloatingCard';
import { 
    CheckCircle2, 
    Loader2, 
    Calendar, 
    Clock, 
    MapPin, 
    CreditCard, 
    ArrowRight, 
    ArrowLeft,
    ShieldCheck,
    Cpu,
    Zap
} from 'lucide-react';

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

const DATES = [
    { label: 'FRI', date: 'APR 18', full: '2026-04-18' },
    { label: 'SAT', date: 'APR 19', full: '2026-04-19' },
    { label: 'SUN', date: 'APR 20', full: '2026-04-20' },
    { label: 'MON', date: 'APR 21', full: '2026-04-21' },
];

const TIMES = ['10:00', '13:30', '16:45', '19:15', '22:30'];

const LOCATIONS = [
    { id: 'ALPHA', name: 'Alpha Sector Hub', type: 'IMAX_QUBIT' },
    { id: 'NEBULA', name: 'Nebula Lounge', type: 'ZERO_G' },
    { id: 'CORE', name: 'Planetary Core', type: '4DX_MAG' },
];

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const passedMovie = location.state?.mockMovie;
    
    const [step, setStep] = useState('schedule'); // schedule, seats, payment, success
    const [show, setShow] = useState(null);
    const [selectedDate, setSelectedDate] = useState(DATES[0]);
    const [selectedTime, setSelectedTime] = useState(TIMES[2]);
    const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
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
            if (selectedSeats.length < 6) {
                setSelectedSeats([...selectedSeats, seatId]);
            }
        }
    };

    const handleCheckout = async () => {
        setProcessing(true);
        // Simulate high-tech encryption delay
        setTimeout(() => {
            setProcessing(false);
            setStep('success');
            setSuccess(true);
        }, 2500);
    };

    if (loading) return (
        <div className="pt-32 flex flex-col justify-center items-center min-h-screen gap-6">
            <div className="relative w-20 h-20">
                <div className="absolute inset-0 border-t-2 border-cyan-neon border-solid rounded-full animate-spin"></div>
                <div className="absolute inset-2 border-b-2 border-pink-neon border-solid rounded-full animate-spin-slow opacity-50"></div>
            </div>
            <span className="font-orbitron text-[10px] tracking-[0.5em] text-cyan-neon uppercase animate-pulse">Uplinking to Core...</span>
        </div>
    );

    const totalAmount = selectedSeats.length * (show?.price || 15);
    const movieTitle = passedMovie?.title || show?.movie?.title || "Unknown Transmission";

    const StepIndicator = () => (
        <div className="flex justify-center items-center gap-4 mb-12">
            {['schedule', 'seats', 'payment'].map((s, idx) => (
                <div key={s} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-sm flex items-center justify-center text-[10px] font-black border transition-all ${
                        step === s ? 'bg-cyan-neon border-cyan-neon text-black box-glow' : 
                        idx < ['schedule', 'seats', 'payment'].indexOf(step) ? 'bg-white/10 border-white/20 text-white' : 'bg-transparent border-white/5 text-gray-700'
                    }`}>
                        0{idx + 1}
                    </div>
                    {idx < 2 && <div className={`w-8 h-[1px] ${idx < ['schedule', 'seats', 'payment'].indexOf(step) ? 'bg-cyan-neon' : 'bg-white/5'}`}></div>}
                </div>
            ))}
        </div>
    );

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pt-32 pb-24 px-6 min-h-screen text-white w-full max-w-6xl mx-auto"
        >
            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-5xl font-orbitron font-black uppercase tracking-tighter mb-2">
                    Booking_ <span className="text-cyan-neon">{movieTitle}</span>
                </h1>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em]">Sector Access System // Version 4.0.2</p>
            </div>

            {!success && <StepIndicator />}

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Main Action Area */}
                <div className="flex-1 min-h-[500px]">
                    <AnimatePresence mode="wait">
                        {step === 'schedule' && (
                            <motion.div 
                                key="schedule"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-10"
                            >
                                {/* Date Selection */}
                                <section className="space-y-4">
                                    <h3 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-cyan-neon">
                                        <Calendar className="w-4 h-4" /> 01// Temporal Synchronization
                                    </h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {DATES.map(d => (
                                            <button 
                                                key={d.full}
                                                onClick={() => setSelectedDate(d)}
                                                className={`p-4 border rounded-sm transition-all text-left group ${
                                                    selectedDate.full === d.full ? 'bg-cyan-neon border-cyan-neon text-black' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                                                }`}
                                            >
                                                <span className="block text-[10px] font-black uppercase opacity-60">{d.label}</span>
                                                <span className="block text-xl font-orbitron font-black">{d.date}</span>
                                            </button>
                                        ))}
                                    </div>
                                </section>

                                {/* Time Selection */}
                                <section className="space-y-4">
                                    <h3 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-cyan-neon">
                                        <Clock className="w-4 h-4" /> 02// Burst Selection
                                    </h3>
                                    <div className="flex flex-wrap gap-4">
                                        {TIMES.map(t => (
                                            <button 
                                                key={t}
                                                onClick={() => setSelectedTime(t)}
                                                className={`px-8 py-3 border rounded-sm transition-all font-orbitron font-black text-sm ${
                                                    selectedTime === t ? 'bg-pink-neon border-pink-neon text-white shadow-[0_0_15px_#ff007a]' : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                                                }`}
                                            >
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </section>

                                {/* Location Selection */}
                                <section className="space-y-4">
                                    <h3 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-cyan-neon">
                                        <MapPin className="w-4 h-4" /> 03// Spatial Coordinates
                                    </h3>
                                    <div className="space-y-3">
                                        {LOCATIONS.map(loc => (
                                            <button 
                                                key={loc.id}
                                                onClick={() => setSelectedLocation(loc)}
                                                className={`w-full flex justify-between items-center p-5 border rounded-sm transition-all ${
                                                    selectedLocation.id === loc.id ? 'bg-white/10 border-cyan-neon/50' : 'bg-white/5 border-white/5 hover:bg-white/10'
                                                }`}
                                            >
                                                <div className="text-left">
                                                    <span className="block text-sm font-black uppercase tracking-widest">{loc.name}</span>
                                                    <span className="text-[9px] text-gray-500 font-bold uppercase">{loc.type}</span>
                                                </div>
                                                {selectedLocation.id === loc.id && <div className="w-2 h-2 bg-cyan-neon rounded-full animate-pulse shadow-[0_0_8px_#00f3ff]"></div>}
                                            </button>
                                        ))}
                                    </div>
                                </section>

                                <button 
                                    onClick={() => setStep('seats')}
                                    className="cyber-border w-full py-5 bg-cyan-neon text-black font-black uppercase tracking-widest text-xs flex justify-center items-center gap-3 hover:bg-white transition-all box-glow"
                                >
                                    Access Seating Grid <ArrowRight className="w-4 h-4" />
                                </button>
                            </motion.div>
                        )}

                        {step === 'seats' && (
                            <motion.div 
                                key="seats"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-8"
                            >
                                <button onClick={() => setStep('schedule')} className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase hover:text-white transition-colors">
                                    <ArrowLeft className="w-3 h-3" /> Reconfigure Schedule
                                </button>

                                <FloatingCard className="p-4 md:p-12 border border-white/5 bg-space-950/20 relative overflow-hidden">
                                     {/* Screen Graphic */}
                                    <div className="w-full h-12 bg-gradient-to-t from-cyan-neon/20 to-transparent rounded-t-[100px] border-b-[2px] border-cyan-neon/40 mb-16 relative flex items-center justify-center">
                                        <span className="text-[8px] font-black text-cyan-neon/50 tracking-[0.6em] uppercase">Visual Field Alpha</span>
                                    </div>

                                    {/* Seats Grid */}
                                    <div className="grid grid-cols-5 gap-3 max-w-sm mx-auto mb-10">
                                        {show.seats.map(seat => {
                                            let baseClass = "w-10 h-10 md:w-12 md:h-12 rounded-sm border flex items-center justify-center text-[10px] font-black transition-all cursor-pointer font-orbitron ";
                                            if (seat.status === 'booked') baseClass += "bg-white/5 border-white/5 text-transparent cursor-not-allowed opacity-20";
                                            else if (selectedSeats.includes(seat.seatId)) baseClass += "bg-cyan-neon border-cyan-neon text-black shadow-[0_0_15px_#00f3ff]";
                                            else baseClass += "bg-transparent border-white/10 text-gray-600 hover:border-white/40";

                                            return (
                                                <div key={seat.seatId} className={baseClass} onClick={() => toggleSeat(seat.seatId, seat.status)}>
                                                    {seat.status !== 'booked' && seat.seatId}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div className="flex justify-center gap-8 text-[8px] font-black uppercase text-gray-600 border-t border-white/5 pt-8">
                                        <div className="flex items-center gap-2"><div className="w-2 h-2 border border-white/20"></div> Available</div>
                                        <div className="flex items-center gap-2"><div className="w-2 h-2 bg-cyan-neon"></div> Selected</div>
                                        <div className="flex items-center gap-2"><div className="w-2 h-2 bg-white/5 opacity-30"></div> Occupied</div>
                                    </div>
                                </FloatingCard>

                                <button 
                                    onClick={() => setStep('payment')}
                                    disabled={selectedSeats.length === 0}
                                    className={`cyber-border w-full py-5 font-black uppercase tracking-widest text-xs flex justify-center items-center gap-3 transition-all ${
                                        selectedSeats.length === 0 ? 'bg-white/5 text-gray-700 cursor-not-allowed' : 'bg-pink-neon text-white hover:bg-white hover:text-black pink-glow'
                                    }`}
                                >
                                    Proceed to Payment <CreditCard className="w-4 h-4" />
                                </button>
                            </motion.div>
                        )}

                        {step === 'payment' && (
                            <motion.div 
                                key="payment"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-10"
                            >
                                <button onClick={() => setStep('seats')} className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase hover:text-white transition-colors">
                                    <ArrowLeft className="w-3 h-3" /> Reallocate Seats
                                </button>

                                <div className="space-y-6">
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-cyan-neon">04// Transaction Decryption</h3>
                                    
                                    <FloatingCard className="p-8 border border-white/10 bg-gradient-to-br from-white/5 to-transparent">
                                        <div className="space-y-8">
                                            <div className="flex items-center gap-6">
                                                <div className="w-16 h-10 bg-white/10 rounded flex items-center justify-center">
                                                    <div className="w-8 h-6 bg-yellow-500/20 rounded-sm border border-yellow-500/40"></div>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                                        <motion.div 
                                                            initial={{ width: 0 }} 
                                                            animate={{ width: '100%' }} 
                                                            transition={{ duration: 2, repeat: Infinity }}
                                                            className="h-full bg-cyan-neon shadow-[0_0_10px_#00f3ff]"
                                                        ></motion.div>
                                                    </div>
                                                    <span className="text-[8px] font-black text-gray-500 uppercase mt-2 block tracking-widest">Secure Uplink Established</span>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="block text-[8px] font-black text-gray-600 uppercase">Card Identity</label>
                                                    <div className="bg-black/40 border border-white/10 p-4 font-orbitron text-xs">**** **** **** 8852</div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="block text-[8px] font-black text-gray-600 uppercase">Auth Code</label>
                                                    <div className="bg-black/40 border border-white/10 p-4 font-orbitron text-xs">***</div>
                                                </div>
                                            </div>
                                        </div>
                                    </FloatingCard>

                                    <div className="flex items-center gap-3 p-4 bg-yellow-500/5 border border-yellow-500/10 rounded-sm">
                                        <ShieldCheck className="w-4 h-4 text-yellow-500" />
                                        <span className="text-[9px] font-bold text-yellow-500/80 uppercase tracking-wider">Payments are handled via secure quantum-encrypted tunnels.</span>
                                    </div>
                                </div>

                                <button 
                                    onClick={handleCheckout}
                                    disabled={processing}
                                    className="cyber-border w-full py-5 bg-cyan-neon text-black font-black uppercase tracking-widest text-xs flex justify-center items-center gap-3 hover:bg-white transition-all box-glow"
                                >
                                    {processing ? <><Loader2 className="animate-spin w-4 h-4"/> Decrypting Transaction...</> : 'Confirm Reservation'}
                                </button>
                            </motion.div>
                        )}

                        {step === 'success' && (
                            <motion.div 
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center text-center space-y-12 py-10"
                            >
                                <div className="space-y-4">
                                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto border border-green-500/30">
                                        <CheckCircle2 className="w-10 h-10 text-green-400" />
                                    </div>
                                    <h2 className="text-4xl md:text-6xl font-orbitron font-black text-white uppercase tracking-tighter relative">
                                        ACCESS <span className="text-green-400">SECURED</span>
                                        <div className="absolute -inset-1 bg-green-500/10 blur-xl opacity-20 animate-pulse"></div>
                                    </h2>
                                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">Uplink Status: Synchronized // No Anomalies</p>
                                </div>

                                {/* Holographic Ticket Display */}
                                <div className="relative group">
                                    <div className="absolute -inset-20 bg-cyan-neon/10 blur-[120px] rounded-full opacity-50 pointer-events-none"></div>
                                    
                                    <motion.div 
                                        initial={{ rotateY: -15, rotateX: 10 }}
                                        animate={{ rotateY: 15, rotateX: -10 }}
                                        transition={{ duration: 6, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                                        className="relative preserve-3d"
                                    >
                                        <div className="relative glass p-1.5 border border-white/20 rounded-xl shadow-[0_0_50px_rgba(0,243,255,0.15)] overflow-hidden">
                                            {/* Digital Scanline Overlay */}
                                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none z-10 opacity-30"></div>
                                            
                                            <img 
                                                src="/C:/Users/windows/.gemini/antigravity/brain/6434a2d4-d86f-4e56-8fd7-a387952c38c6/cinesnap_boarding_pass_1776529606407.png" 
                                                alt="Boarding Pass" 
                                                className="w-full max-w-sm rounded-lg"
                                            />
                                            
                                            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-neon/10 via-transparent to-pink-neon/10 pointer-events-none"></div>
                                        </div>
                                    </motion.div>
                                    
                                    {/* HUD Elements around ticket */}
                                    <div className="absolute -top-10 -right-10 hidden lg:block">
                                        <div className="flex flex-col items-end gap-2 border-r border-cyan-neon/30 pr-4 py-2">
                                            <span className="text-[8px] font-black text-cyan-neon uppercase">Visual_ID</span>
                                            <span className="text-[10px] font-orbitron font-black text-white">{Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-6 w-full justify-center pt-8">
                                    <button onClick={() => navigate('/profile')} className="cyber-border px-12 py-5 bg-white/5 text-white font-black uppercase text-xs tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                                        <Cpu className="w-4 h-4" /> View Flight Logs
                                    </button>
                                    <button className="cyber-border px-12 py-5 bg-cyan-neon text-black font-black uppercase text-xs tracking-widest box-glow hover:bg-white transition-all flex items-center justify-center gap-3">
                                        <Zap className="w-4 h-4" /> Download Pass
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Sidebar Summary */}
                {!success && (
                    <div className="w-full lg:w-96 shrink-0">
                        <FloatingCard className="p-8 border border-white/10 bg-space-950/60 sticky top-32">
                            <h3 className="text-xl font-orbitron font-black uppercase tracking-tighter border-b border-white/5 pb-4 mb-6 flex justify-between items-center">
                                Manifest 
                                <Cpu className="w-4 h-4 text-cyan-neon" />
                            </h3>
                            
                            <div className="space-y-6 mb-10">
                                <div className="space-y-1">
                                    <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Movie_Objective</span>
                                    <p className="text-sm font-black uppercase">{movieTitle}</p>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Chronos</span>
                                        <p className="text-[10px] font-black uppercase text-cyan-neon">{selectedDate.date} @ {selectedTime}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Sector_Coord</span>
                                        <p className="text-[10px] font-black uppercase text-pink-neon">{selectedLocation.id}</p>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Allocated_Units</span>
                                    <p className="text-xs font-black uppercase text-white">{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'WAITING_'}</p>
                                </div>

                                <div className="h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent"></div>
                                
                                <div className="flex justify-between items-end">
                                    <div>
                                        <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Valuation_Net</span>
                                        <p className="text-3xl font-orbitron font-black text-cyan-neon">${totalAmount}</p>
                                    </div>
                                    <div className="bg-cyan-neon/10 border border-cyan-neon/30 px-2 py-1 rounded-sm text-[8px] font-black text-cyan-neon uppercase">Secure_Link</div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <div className={`w-1.5 h-1.5 rounded-full ${selectedSeats.length > 0 ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                                    <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">
                                        {selectedSeats.length > 0 ? 'System_Ready' : 'Incomplete_Data'}
                                    </span>
                                </div>
                            </div>
                        </FloatingCard>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Checkout;
