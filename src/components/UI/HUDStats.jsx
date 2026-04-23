import React from 'react';
import { Activity, WifiHigh, Cpu, Binary, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Standardized Signal Strength Indicator
 */
export const SignalStrength = ({ strength = 80, bars = 5, color = "cyan" }) => {
    const colorClass = color === "cyan" ? "bg-cyan-neon" : "bg-pink-neon";
    const activeBars = Math.ceil((strength / 100) * bars);

    return (
        <div className="flex flex-col gap-1">
            <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest flex items-center gap-1">
                <WifiHigh className={`w-3 h-3 ${colorClass.replace('bg-', 'text-')}`} /> Signal_Strength
            </span>
            <div className="flex gap-1 items-end h-3">
                {[...Array(bars)].map((_, i) => (
                    <div 
                        key={i} 
                        className={`w-1 rounded-t-sm transition-all duration-500 ${i < activeBars ? colorClass : 'bg-white/10'}`} 
                        style={{ height: `${(i + 1) * (100 / bars)}%` }}
                    />
                ))}
            </div>
        </div>
    );
};

/**
 * Standardized Status Badge
 */
export const StatusBadge = ({ status = "ACTIVE", color = "cyan", animate = true }) => {
    const colorClasses = {
        cyan: "bg-cyan-neon/10 text-cyan-neon border-cyan-neon/30 shadow-[0_0_10px_rgba(0,243,255,0.1)]",
        pink: "bg-pink-neon/10 text-pink-neon border-pink-neon/30 shadow-[0_0_10px_rgba(255,0,122,0.1)]",
        yellow: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
        gray: "bg-white/5 text-gray-500 border-white/10"
    };

    return (
        <div className={`px-4 py-1.5 rounded-sm border text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2 ${colorClasses[color]}`}>
            {animate && <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${color === 'cyan' ? 'bg-cyan-neon' : color === 'pink' ? 'bg-pink-neon' : 'bg-current'}`} />}
            {status}
        </div>
    );
};

/**
 * Standardized Metadata Grid
 */
export const MetaGrid = ({ items = [] }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-4 border-y border-white/5">
            {items.map((item, i) => (
                <div key={i} className="flex flex-col gap-1">
                    <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest">{item.label}</span>
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider font-mono truncate">{item.value}</span>
                </div>
            ))}
        </div>
    );
};

/**
 * High-Tech Header with Activity Pulse
 */
export const HUDHeader = ({ title, statusText = "SECURE_UPLINK", color = "cyan" }) => {
    return (
        <div className="flex items-center gap-4 mb-8">
            <Activity className={`w-5 h-5 animate-pulse ${color === 'cyan' ? 'text-cyan-neon' : 'text-pink-neon'}`} />
            <div className="flex flex-col">
                <span className="text-[8px] font-black text-gray-600 uppercase tracking-[0.4em]">{statusText}</span>
                <h2 className={`font-orbitron font-black text-2xl uppercase tracking-tighter transition-all ${color === 'cyan' ? 'text-white group-hover:text-cyan-neon' : 'text-white'}`}>{title}</h2>
            </div>
        </div>
    );
};
