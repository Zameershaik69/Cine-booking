import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import FloatingCard from '../components/UI/FloatingCard';
import { BarChart3, Film, Calendar, Users, PlusCircle, Activity, ShieldAlert, Cpu, Binary, WifiHigh, Terminal as TerminalIcon } from 'lucide-react';

const MOCK_STATS = {
    totalRevenue: 34500,
    totalBookings: 1205,
    totalMovies: 12,
    totalShows: 48,
    uplinkStrength: "99.8%",
    nodeId: "GAMMA-01-NODE",
    uptime: "1,244h 12m"
};

const MOCK_BOOKINGS = [
    { _id: 'b1', user: { name: "Alice Void", email: "alice@space.com" }, show: { movie: { title: "Interstellar Resurgence" } }, seats: ["A1", "A2"], totalAmount: 30, status: "confirmed" },
    { _id: 'b2', user: { name: "Bob Quazar", email: "bob@nova.net" }, show: { movie: { title: "Solar Flare" } }, seats: ["C5"], totalAmount: 18, status: "pending" },
    { _id: 'b3', user: { name: "Charlie Orbit", email: "char@link.co" }, show: { movie: { title: "Nebula Raiders" } }, seats: ["B1", "B2", "B3"], totalAmount: 45, status: "confirmed" }
];

const MOCK_LOGS = [
    { time: "03:42:11", event: "UPLINK_SECURE", target: "USER_8829", status: "OK" },
    { time: "03:41:05", event: "SECTOR_SYNC", target: "CORE_ARC", status: "WARN" },
    { time: "03:40:55", event: "RESERVATION_INIT", target: "MOV_01", status: "OK" },
    { time: "03:39:22", event: "AUTHENTICATION", target: "ADMIN_ROOT", status: "OK" },
    { time: "03:38:00", event: "SIGNAL_INTERFERE", target: "NEBULA_WEST", status: "ERR" }
];

const AdminDashboard = () => {
    const { user } = useContext(AuthContext); 
    const isMockAdmin = user !== null;

    const [stats, setStats] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('stats');
    const [terminalLogs, setTerminalLogs] = useState([]);

    useEffect(() => {
        if (isMockAdmin) {
            setTimeout(() => {
                setStats(MOCK_STATS);
                setBookings(MOCK_BOOKINGS);
                setTerminalLogs(MOCK_LOGS);
                setLoading(false);
            }, 800);
        }
    }, [isMockAdmin]);

    if (!user) {
        return (
            <div className="pt-40 flex flex-col items-center justify-center min-h-[60vh] gap-8">
                <ShieldAlert className="w-20 h-20 text-red-500 animate-pulse" />
                <div className="text-center space-y-4">
                    <h1 className="text-5xl font-orbitron font-black text-red-500 tracking-tighter uppercase glitch-text" data-text="ACCESS DENIED">ACCESS DENIED</h1>
                    <p className="text-gray-500 font-bold uppercase tracking-[0.4em]">Biometric signal mismatch. Termination likely.</p>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="pt-40 flex flex-col justify-center items-center gap-4 min-h-[60vh]">
                <div className="w-16 h-16 border-t-2 border-cyan-neon border-solid rounded-full animate-spin box-glow"></div>
                <span className="font-orbitron text-[10px] tracking-[0.5em] uppercase text-gray-500 flex items-center gap-2">
                    <Activity className="w-4 h-4 animate-pulse" /> Decrypting Admin Node...
                </span>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-32 px-4 md:px-6 w-full max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 relative">
                 <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <span className="bg-cyan-neon text-black px-3 py-1 text-[8px] font-black uppercase tracking-widest">Root.Admin</span>
                        <div className="h-[1px] w-20 bg-white/10 hidden md:block" />
                        <span className="text-gray-500 text-[8px] font-bold uppercase tracking-widest flex items-center gap-2 italic">
                            <WifiHigh className="w-3 h-3 text-cyan-neon" /> Uplink: {stats?.uplinkStrength}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-7xl font-orbitron font-black uppercase tracking-tighter leading-none glitch-text" data-text="TERMINAL CONSOLE">TERMINAL CONSOLE</h1>
                 </div>

                 <div className="flex flex-col items-end gap-2 text-right">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-cyan-neon tracking-widest uppercase">
                        <div className="w-2 h-2 bg-cyan-neon rounded-full animate-pulse shadow-[0_0_10px_#00f3ff]"></div> Node: {stats?.nodeId}
                    </div>
                    <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Server_Uptime: {stats?.uptime}</span>
                 </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Console */}
                <div className="w-full md:w-72 space-y-6">
                    <div className="glass p-6 rounded-2xl border border-white/5 space-y-2 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1 h-full bg-cyan-neon/30 group-hover:bg-cyan-neon transition-colors"></div>
                        
                        <button 
                            onClick={() => setActiveTab('stats')}
                            className={`w-full flex items-center justify-between px-6 py-4 rounded-sm transition-all relative ${activeTab === 'stats' ? 'bg-cyan-neon text-black font-black' : 'hover:bg-white/5 text-gray-400 font-bold'}`}
                        >
                            <div className="flex items-center gap-4">
                                <BarChart3 className="w-4 h-4" /> 
                                <span className="uppercase text-[10px] tracking-widest">Analytics</span>
                            </div>
                            {activeTab === 'stats' && <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-black rounded-full animate-pulse"></div>}
                        </button>

                        <button 
                            onClick={() => setActiveTab('bookings')}
                            className={`w-full flex items-center justify-between px-6 py-4 rounded-sm transition-all relative ${activeTab === 'bookings' ? 'bg-cyan-neon text-black font-black' : 'hover:bg-white/5 text-gray-400 font-bold'}`}
                        >
                            <div className="flex items-center gap-4">
                                <Activity className="w-4 h-4" /> 
                                <span className="uppercase text-[10px] tracking-widest">Bookings</span>
                            </div>
                            {activeTab === 'bookings' && <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-black rounded-full animate-pulse"></div>}
                        </button>

                        <div className="pt-4 border-t border-white/5 space-y-2">
                            <button className="w-full flex items-center gap-4 px-6 py-4 rounded-sm text-[10px] uppercase font-black tracking-widest text-gray-600 cursor-not-allowed italic">
                                <PlusCircle className="w-4 h-4" /> Add Movie_Sect
                            </button>
                            <button className="w-full flex items-center gap-4 px-6 py-4 rounded-sm text-[10px] uppercase font-black tracking-widest text-gray-600 cursor-not-allowed italic">
                                <Cpu className="w-4 h-4" /> Maintenance
                            </button>
                        </div>
                    </div>

                    {/* Live Terminal Log Preview */}
                    <div className="glass p-6 rounded-2xl border border-white/5 space-y-4">
                        <div className="flex items-center gap-2 text-[10px] font-black text-cyan-neon uppercase tracking-widest">
                            <TerminalIcon className="w-3 h-3" /> System_Logs
                        </div>
                        <div className="space-y-4 font-mono text-[8px] uppercase">
                            {terminalLogs.map((log, i) => (
                                <div key={i} className="flex gap-4 border-l border-white/5 pl-3 py-1">
                                    <span className="text-gray-600">{log.time}</span>
                                    <div className="flex-1">
                                        <span className="text-white font-bold">{log.event}</span>
                                        <p className="text-gray-500 truncate">{log.target}</p>
                                    </div>
                                    <span className={log.status === 'OK' ? 'text-green-500' : log.status === 'ERR' ? 'text-red-500' : 'text-yellow-500'}>
                                        [{log.status}]
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main View Area */}
                <div className="flex-1 min-w-0">
                    <AnimatePresence mode="wait">
                        {activeTab === 'stats' ? (
                            <motion.div 
                                key="stats"
                                initial={{ opacity: 0, scale: 0.98 }} 
                                animate={{ opacity: 1, scale: 1 }} 
                                exit={{ opacity: 0, scale: 0.98 }}
                                className="space-y-8"
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                                    <StatCard icon={<BarChart3 />} label="Total Valuation" value={`$${stats?.totalRevenue}`} color="cyan" />
                                    <StatCard icon={<Users />} label="Uplink Count" value={stats?.totalBookings} color="pink" />
                                    <StatCard icon={<Film />} label="Sector Density" value={stats?.totalMovies} color="purple" />
                                    <StatCard icon={<Calendar />} label="Cycle Length" value={stats?.totalShows} color="blue" />
                                </div>

                                {/* Placeholder for visualization */}
                                <div className="glass p-8 rounded-2xl border border-white/5 aspect-[16/6] min-h-[300px] flex items-center justify-center relative overflow-hidden">
                                     <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(0,243,255,0.2),transparent_70%)]" />
                                     <div className="flex flex-col items-center gap-4 grayscale">
                                        <Activity className="w-12 h-12 text-cyan-neon animate-pulse" />
                                        <span className="text-[10px] font-black text-gray-500 tracking-[0.5em] uppercase italic">Visualizing Pulse...</span>
                                     </div>
                                     <div className="absolute bottom-4 left-4 flex gap-4">
                                        {[...Array(20)].map((_, i) => (
                                            <motion.div 
                                                key={i} 
                                                animate={{ height: [10, 40, 20, 60, 15] }}
                                                transition={{ repeat: Infinity, duration: 2, delay: i * 0.1 }}
                                                className="w-1 bg-cyan-neon/20 h-10" 
                                            />
                                        ))}
                                     </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="bookings"
                                initial={{ opacity: 0, x: 20 }} 
                                animate={{ opacity: 1, x: 0 }} 
                                exit={{ opacity: 0, x: -20 }}
                                className="glass rounded-2xl border border-white/5 overflow-hidden relative shadow-2xl"
                            >
                                {/* Digital Scanline Filter Overlay */}
                                <div className="absolute inset-x-0 top-0 h-[300%] w-full bg-gradient-to-b from-cyan-neon/0 via-cyan-neon/[0.03] to-cyan-neon/0 animate-scan-slow pointer-events-none z-20"></div>
                                
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse min-w-[600px] relative z-10">
                                        <thead className="bg-white/5 border-b border-white/10">
                                            <tr>
                                                <th className="px-8 py-6 text-[10px] font-black font-orbitron uppercase tracking-[0.3em] text-gray-600">Access_ID</th>
                                                <th className="px-8 py-6 text-[10px] font-black font-orbitron uppercase tracking-[0.3em] text-gray-600">Resource_Alloc</th>
                                                <th className="px-8 py-6 text-[10px] font-black font-orbitron uppercase tracking-[0.3em] text-gray-600">Sector</th>
                                                <th className="px-8 py-6 text-[10px] font-black font-orbitron uppercase tracking-[0.3em] text-gray-600">Valuation</th>
                                                <th className="px-8 py-6 text-[10px] font-black font-orbitron uppercase tracking-[0.3em] text-gray-600">Stat</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bookings.map((booking, idx) => (
                                                <tr key={booking._id} className="border-b border-white/5 hover:bg-cyan-neon/5 transition-colors group">
                                                    <td className="px-8 py-6">
                                                        <div className="text-sm font-black uppercase tracking-tighter text-white group-hover:text-cyan-neon transition-colors">{booking.user?.name}</div>
                                                        <div className="text-[8px] font-bold text-gray-600 uppercase tracking-widest mt-1 opacity-50">{booking.user?.email}</div>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">{booking.show?.movie?.title}</span>
                                                    </td>
                                                    <td className="px-8 py-6 text-[10px] font-mono font-black text-cyan-neon/80">{booking.seats.join('_')}</td>
                                                    <td className="px-8 py-6">
                                                        <div className="text-sm font-black text-pink-neon/80 font-orbitron">+{booking.totalAmount}.00</div>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <span className={`px-4 py-1 flex items-center justify-center w-max rounded-sm text-[8px] font-black uppercase tracking-widest border ${booking.status === 'confirmed' ? 'bg-cyan-neon/10 text-cyan-neon border-cyan-neon/30 shadow-[0_0_10px_rgba(0,243,255,0.1)]' : 'bg-white/5 text-gray-600 border-white/10'}`}>
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
                    </AnimatePresence>
                </div>
            </div>

            {/* Terminal Footer */}
            <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[8px] font-black text-gray-700 uppercase tracking-[0.5em] gap-4">
                <div className="flex items-center gap-4">
                    <ShieldAlert className="w-3 h-3 text-cyan-neon" /> 
                    <span>Secure Admin Cluster v.4.0 // Encryption High</span>
                </div>
                <div className="flex gap-10">
                    <span>Protocol: SSH_CINESNAP</span>
                    <span>Last Uplink: 03:42:12_UTC</span>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ icon, label, value, color }) => {
    const colorMap = {
        cyan: 'text-cyan-neon border-cyan-neon/20',
        pink: 'text-pink-neon border-pink-neon/20',
        purple: 'text-purple-400 border-purple-400/20',
        blue: 'text-blue-400 border-blue-400/20'
    };

    return (
        <FloatingCard className="p-10 border border-white/5 group hover:border-cyan-neon/30 transition-all overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                {React.cloneElement(icon, { size: 60 })}
            </div>
            <div className="space-y-4 relative z-10 text-center lg:text-left">
                <div className={`w-max mx-auto lg:mx-0 p-3 rounded-sm bg-white/5 border ${colorMap[color]} group-hover:scale-110 transition-transform`}>
                    {React.cloneElement(icon, { size: 24, className: colorMap[color].split(' ')[0] })}
                </div>
                <div>
                    <div className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em] mb-1">{label}</div>
                    <div className="text-4xl font-black font-orbitron tracking-tighter text-white group-hover:text-cyan-neon transition-colors">{value}</div>
                </div>
                {/* Micro Chart Mockup */}
                <div className="flex items-end gap-1 h-2 opacity-20 group-hover:opacity-40 mt-4 transition-opacity">
                    {[1, 2, 3, 4, 3, 5, 2].map((h, i) => (
                        <div key={i} className="flex-1 bg-white h-full" style={{ height: `${h * 20}%` }} />
                    ))}
                </div>
            </div>
        </FloatingCard>
    );
};

export default AdminDashboard;
