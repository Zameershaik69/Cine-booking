import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../../context/AuthContext';
import FloatingCard from '../UI/FloatingCard';

const Login = ({ onClose }) => {
    const { login, register } = useContext(AuthContext);
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            if (isLogin) {
                await login(email, password);
            } else {
                await register(name, email, password);
            }
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Authentication failed');
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-space-950/80 backdrop-blur-md px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="w-full max-w-md relative"
            >
                {/* Visual Scanning Effect for Modal */}
                <div className="absolute -inset-[2px] bg-gradient-to-t from-cyan-neon/20 to-transparent border border-white/10 rounded-2xl pointer-events-none"></div>

                <FloatingCard className="w-full p-8 border border-white/5 bg-space-950/40 relative overflow-hidden">
                    {/* Animated Scanline overlay */}
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-cyan-neon/30 animate-scan-slow opacity-20" />
                    
                    <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors z-20">
                        <span className="font-orbitron text-xs">EXIT_</span>
                    </button>

                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-orbitron font-black uppercase tracking-tighter mb-2">
                            {isLogin ? 'Uplink' : 'Join'}
                        </h2>
                        <div className="flex justify-center items-center gap-2 text-[10px] font-bold text-cyan-neon/60 tracking-widest uppercase">
                            <div className="w-1.5 h-1.5 bg-cyan-neon rounded-full animate-pulse shadow-[0_0_8px_#00f3ff]"></div>
                            Status: Secure Access
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border-l-2 border-red-500 text-red-500 p-4 mb-8 text-[10px] font-black uppercase tracking-widest animate-pulse">
                            Error: {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {!isLogin && (
                            <div className="space-y-2">
                                <label className="block text-[10px] font-black text-gray-600 uppercase tracking-widest pl-1">01// Identity_Alias</label>
                                <input 
                                    type="text" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    required 
                                    className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white font-orbitron text-sm focus:outline-none focus:border-cyan-neon focus:bg-cyan-neon/5 transition-all"
                                    placeholder="ENTER_NAME..."
                                />
                            </div>
                        )}
                        <div className="space-y-2">
                            <label className="block text-[10px] font-black text-gray-600 uppercase tracking-widest pl-1">02// Comms_Frequency</label>
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                                className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-4 text-white font-orbitron text-sm focus:outline-none focus:border-cyan-neon focus:bg-cyan-neon/5 transition-all"
                                placeholder="COORD@NET..."
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-[10px] font-black text-gray-600 uppercase tracking-widest pl-1">03// Decryption_Key</label>
                            <input 
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                                className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-4 text-white font-orbitron text-sm focus:outline-none focus:border-cyan-neon focus:bg-cyan-neon/5 transition-all"
                                placeholder="********"
                            />
                        </div>
                        
                        <button type="submit" className="cyber-border w-full py-4 mt-6 bg-cyan-neon text-black font-black uppercase tracking-widest text-xs hover:bg-white transition-all box-glow">
                            {isLogin ? 'Initialize Connection' : 'Register Signature'}
                        </button>
                    </form>

                    <div className="mt-10 pt-6 border-t border-white/5">
                        <p className="text-center text-[9px] font-black text-gray-600 uppercase tracking-[0.2em] cursor-pointer hover:text-cyan-neon transition-colors" onClick={() => setIsLogin(!isLogin)}>
                            {isLogin ? "Lost clearance? Request New Auth." : "Existing signature found? Log in."}
                        </p>
                    </div>
                </FloatingCard>
            </motion.div>
        </div>
    );
};

export default Login;
