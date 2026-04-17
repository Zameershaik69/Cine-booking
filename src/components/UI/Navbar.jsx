import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Film, User, Search, LogOut } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import Login from '../Auth/Login';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [showLogin, setShowLogin] = useState(false);
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 w-full z-50 p-4"
    >
      <div className="glass px-8 py-3 max-w-7xl mx-auto flex justify-between items-center cyber-border border-white/5 relative group overflow-hidden">
        {/* Animated Scanning Line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-cyan-neon/30 -translate-y-full group-hover:translate-y-[40px] transition-transform duration-[2s] ease-linear pointer-events-none"></div>

        <Link to="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: 180, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Film className="w-8 h-8 text-cyan-neon" />
          </motion.div>
          <span className="font-orbitron font-black text-2xl tracking-tighter uppercase text-white">
            Cine<span className="text-cyan-neon group-hover:text-pink-neon transition-colors">Snap</span>
          </span>
        </Link>
        
        <div className="hidden md:flex gap-10 items-center font-black uppercase text-[10px] tracking-[0.2em]">
          <Link to="/" className="text-cyan-neon hover:text-white transition-colors">Sector.Home</Link>
          <Link to="/movies" className="text-gray-400 hover:text-cyan-neon transition-colors">Movies.Arc</Link>
          <button className="text-gray-400 hover:text-cyan-neon transition-colors cursor-not-allowed">Theatres.Map</button>
          {user && user.role === 'admin' && (
            <Link to="/admin" className="text-pink-neon hover:text-white font-black transition-colors flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-pink-neon rounded-full animate-pulse"></span> Terminal.Console
            </Link>
          )}
        </div>

        <div className="flex items-center gap-6">
          <button className="p-2 hover:bg-cyan-neon/10 rounded-sm transition-all cursor-pointer text-gray-400 hover:text-cyan-neon">
            <Search className="w-5 h-5" />
          </button>
          
          {user ? (
            <div className="flex items-center gap-4 border-l border-white/10 pl-4">
              <Link to="/profile" className="text-[10px] font-black uppercase tracking-widest text-white hidden sm:block hover:text-cyan-neon transition-colors cursor-pointer">
                ID:// {user.name}
              </Link>
              <button onClick={logout} className="p-2 hover:bg-red-500/10 rounded-sm transition-colors cursor-pointer text-gray-500 hover:text-red-400">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button onClick={() => setShowLogin(true)} className="cyber-border px-6 py-2 bg-white/5 text-[10px] font-black uppercase tracking-widest hover:bg-cyan-neon hover:text-black transition-all cursor-pointer">
              Initialize
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showLogin && <Login onClose={() => setShowLogin(false)} />}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
