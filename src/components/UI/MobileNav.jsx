import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home as HomeIcon, Film, User, Settings } from 'lucide-react';

const MobileNav = () => {
    return (
        <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-50"
        >
            <div className="glass px-6 py-4 rounded-2xl border border-white/10 flex justify-between items-center box-glow relative overflow-hidden">
                {/* Visual Scanning Line */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-cyan-neon/20 animate-scan-slow" />

                <NavButton to="/" icon={<HomeIcon className="w-5 h-5" />} label="Home" />
                <NavButton to="/movies" icon={<Film className="w-5 h-5" />} label="Movies" />
                <NavButton to="/profile" icon={<User className="w-5 h-5" />} label="Profile" />
                <NavButton to="/admin" icon={<Settings className="w-5 h-5" />} label="Admin" />
            </div>
        </motion.div>
    );
};

const NavButton = ({ to, icon, label }) => (
    <NavLink 
        to={to}
        className={({ isActive }) => `
            flex flex-col items-center gap-1 transition-all
            ${isActive ? 'text-cyan-neon' : 'text-gray-500 hover:text-white'}
        `}
    >
        {({ isActive }) => (
            <>
                <div className={`relative ${isActive ? 'scale-110' : ''}`}>
                    {icon}
                    {isActive && (
                        <motion.div 
                            layoutId="mobile-active-indicator"
                            className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-pink-neon rounded-full"
                        />
                    )}
                </div>
                <span className="text-[8px] font-black uppercase tracking-widest">{label}</span>
            </>
        )}
    </NavLink>
);

export default MobileNav;
