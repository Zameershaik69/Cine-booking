import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import FloatingCard from '../components/UI/FloatingCard';
import { BarChart3, Film, Calendar, Users, PlusCircle, Activity } from 'lucide-react';

const MOCK_STATS = {
    totalRevenue: 34500,
    totalBookings: 1205,
    totalMovies: 12,
    totalShows: 48
};

const MOCK_BOOKINGS = [
    { _id: 'b1', user: { name: "Alice Void", email: "alice@space.com" }, show: { movie: { title: "Interstellar Resurgence" } }, seats: ["A1", "A2"], totalAmount: 30, status: "confirmed" },
    { _id: 'b2', user: { name: "Bob Quazar", email: "bob@nova.net" }, show: { movie: { title: "Solar Flare" } }, seats: ["C5"], totalAmount: 18, status: "pending" },
    { _id: 'b3', user: { name: "Charlie Orbit", email: "char@link.co" }, show: { movie: { title: "Nebula Raiders" } }, seats: ["B1", "B2", "B3"], totalAmount: 45, status: "confirmed" }
];

const AdminDashboard = () => {
    // Force admin role for the UI prototype regardless of who logs in
    const { user } = useContext(AuthContext); 
    const isMockAdmin = user !== null;

    const [stats, setStats] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('stats');

    useEffect(() => {
        if (isMockAdmin) {
            setTimeout(() => {
                setStats(MOCK_STATS);
                setBookings(MOCK_BOOKINGS);
                setLoading(false);
            }, 800);
        }
    }, [isMockAdmin]);

    if (!user) {
        return (
            <div className="pt-40 text-center">
                <h1 className="text-3xl font-orbitron text-red-500">ACCESS DENIED</h1>
                <p className="text-gray-400 mt-4">Please log in to view the mock prototype dashboard.</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="pt-40 flex flex-col justify-center items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-cyan-neon box-glow"></div>
                <span className="font-orbitron text-[10px] tracking-[0.4em] uppercase text-gray-500">Syncing Admin Node...</span>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-20 px-6 w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full md:w-64 space-y-4">
                <div className="glass p-6 rounded-2xl border border-white/5 space-y-2 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-cyan-neon/20"></div>
                    <button 
                        onClick={() => setActiveTab('stats')}
                        className={`w-full flex items-center gap-3 px-4 py-4 rounded-sm font-black uppercase tracking-widest text-[10px] transition-all ${activeTab === 'stats' ? 'bg-cyan-neon text-black shadow-[0_0_15px_#00f3ff]' : 'hover:bg-white/5 text-gray-400'}`}
                    >
                        <BarChart3 className="w-4 h-4" /> Analytics
                    </button>
                    <button 
                        onClick={() => setActiveTab('bookings')}
                        className={`w-full flex items-center gap-3 px-4 py-4 rounded-sm font-black uppercase tracking-widest text-[10px] transition-all ${activeTab === 'bookings' ? 'bg-cyan-neon text-black shadow-[0_0_15px_#00f3ff]' : 'hover:bg-white/5 text-gray-400'}`}
                    >
                        <Activity className="w-4 h-4" /> Bookings
                    </button>
                    <div className="pt-4 border-t border-white/5">
                        <button className="w-full flex items-center gap-3 px-4 py-4 rounded-sm text-[10px] uppercase font-black tracking-widest text-gray-600 cursor-not-allowed">
                            <PlusCircle className="w-4 h-4" /> Add Movie
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 space-y-12">
                <div className="flex justify-between items-center border-b border-white/5 pb-6">
                    <h1 className="text-4xl font-orbitron font-black uppercase tracking-tighter">System Console</h1>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-cyan-neon/60 tracking-widest uppercase">
                        <div className="w-2 h-2 bg-cyan-neon rounded-full animate-pulse"></div> Node: Gamma-01
                    </div>
                </div>

                {activeTab === 'stats' && stats && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard icon={<BarChart3 className="text-cyan-neon"/>} label="Revenue" value={`$${stats.totalRevenue}`} />
                        <StatCard icon={<Users className="text-pink-neon"/>} label="Tickets" value={stats.totalBookings} />
                        <StatCard icon={<Film className="text-purple-400"/>} label="Movies" value={stats.totalMovies} />
                        <StatCard icon={<Calendar className="text-blue-400"/>} label="Shows" value={stats.totalShows} />
                    </motion.div>
                )}

                {activeTab === 'bookings' && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass rounded-2xl border border-white/5 overflow-hidden relative">
                        {/* Digital Scanline Filter */}
                        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_4px] opacity-20"></div>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[600px] relative z-10">
                                <thead className="bg-white/5 border-b border-white/10">
                                    <tr>
                                        <th className="px-8 py-5 text-[10px] font-black font-orbitron uppercase tracking-[0.2em] text-gray-500">User Data</th>
                                        <th className="px-8 py-5 text-[10px] font-black font-orbitron uppercase tracking-[0.2em] text-gray-500">Resource</th>
                                        <th className="px-8 py-5 text-[10px] font-black font-orbitron uppercase tracking-[0.2em] text-gray-500">Sectors</th>
                                        <th className="px-8 py-5 text-[10px] font-black font-orbitron uppercase tracking-[0.2em] text-gray-500">Valuation</th>
                                        <th className="px-8 py-5 text-[10px] font-black font-orbitron uppercase tracking-[0.2em] text-gray-500">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.map(booking => (
                                        <tr key={booking._id} className="border-b border-white/5 hover:bg-cyan-neon/5 transition-colors group">
                                            <td className="px-8 py-5">
                                                <div className="text-sm font-black uppercase tracking-tighter text-white">{booking.user?.name}</div>
                                                <div className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mt-1">{booking.user?.email}</div>
                                            </td>
                                            <td className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-gray-300">{booking.show?.movie?.title}</td>
                                            <td className="px-8 py-5 text-xs font-mono text-cyan-neon/80">{booking.seats.join(', ')}</td>
                                            <td className="px-8 py-5 text-sm font-black text-pink-neon">+${booking.totalAmount}</td>
                                            <td className="px-8 py-5">
                                                <span className={`px-3 py-1.5 rounded-sm text-[9px] font-black uppercase tracking-widest border ${booking.status === 'confirmed' ? 'bg-green-500/10 text-green-400 border-green-500/30' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'}`}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

const StatCard = ({ icon, label, value }) => (
    <FloatingCard className="p-8 border border-white/5 group hover:border-cyan-neon/30 transition-all overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-neon to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="flex items-center gap-5">
            <div className="p-4 rounded-sm bg-white/5 border border-white/10 group-hover:border-cyan-neon/30 transition-colors">{icon}</div>
            <div>
                <div className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">{label}</div>
                <div className="text-3xl font-black font-orbitron mt-2 tracking-tighter">{value}</div>
            </div>
        </div>
    </FloatingCard>
);

export default AdminDashboard;
