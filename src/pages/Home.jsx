import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import FloatingCard from '../components/UI/FloatingCard';
import { Play, Cpu, Zap, Activity } from 'lucide-react';

const MOCK_MOVIES = [
    {
        _id: 'm1',
        title: "Interstellar Resurgence",
        overview: "A team of explorers return through the wormhole.",
        posterPath: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=600&auto=format&fit=crop",
        backdropPath: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1200",
        releaseDate: "2026-11-05",
        voteAverage: 9.4
    },
    {
        _id: 'm2',
        title: "Nebula Raiders",
        overview: "Space pirates hijack a quantum freighter.",
        posterPath: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=600&auto=format&fit=crop",
        releaseDate: "2026-12-15",
        voteAverage: 8.1
    },
    {
        _id: 'm3',
        title: "Event Horizon: Origins",
        overview: "The secret creation of the first gravity drive.",
        posterPath: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop",
        releaseDate: "2026-10-31",
        voteAverage: 7.5
    },
    {
        _id: 'm4',
        title: "Solar Flare",
        overview: "Earth faces a devastating ejection.",
        posterPath: "https://images.unsplash.com/photo-1446776811953-b23d5732194f?q=80&w=600&auto=format&fit=crop",
        releaseDate: "2026-09-01",
        voteAverage: 8.8
    },
    {
        _id: 'm5',
        title: "Quantum Leap",
        overview: "Racing across dimensions to save humanity.",
        posterPath: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=600&auto=format&fit=crop",
        releaseDate: "2026-08-12",
        voteAverage: 9.0
    }
];

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => {
        setMovies(MOCK_MOVIES);
        setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const heroMovie = movies[0];

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20 px-6 min-h-screen text-white w-full max-w-7xl mx-auto overflow-hidden"
    >
      {/* Cinematic Hero Section */}
      {!loading && heroMovie && (
        <section className="relative flex flex-col md:flex-row items-center justify-between gap-12 mb-48 min-h-[70vh]">
          {/* Parallax Background Text */}
          <motion.div 
            style={{ y: y1, opacity }}
            className="absolute -left-20 top-20 text-[10vw] font-black text-white/[0.03] select-none pointer-events-none font-orbitron whitespace-nowrap"
          >
            SYSTEM ONLINE // UPLINK ACTIVE
          </motion.div>

          <div className="flex-1 space-y-8 relative z-10">
            <div className="flex items-center gap-2 text-cyan-neon font-bold text-xs tracking-[0.4em] uppercase">
                <Activity className="w-4 h-4 animate-pulse" /> Live Transmission
            </div>
            
            <h1 className="text-6xl md:text-8xl font-orbitron font-black leading-none uppercase">
                <span className="block overflow-hidden">
                    <motion.span 
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] }}
                        className="block"
                    >Experience</motion.span>
                </span>
                <span className="block overflow-hidden relative">
                    <motion.span 
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.6, 0.05, -0.01, 0.9] }}
                        className="block bg-clip-text text-transparent bg-gradient-to-r from-cyan-neon via-white to-pink-neon"
                    >Anti-Gravity</motion.span>
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-cyan-neon/30 -translate-y-1/2 pointer-events-none"></div>
                </span>
                <span className="block overflow-hidden">
                    <motion.span 
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.6, 0.05, -0.01, 0.9] }}
                        className="block"
                    >Cinema.</motion.span>
                </span>
            </h1>

            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-gray-400 text-lg max-w-md border-l-2 border-cyan-neon pl-6 py-2"
            >
              Access the most immersive sci-fi clusters and blockbuster simulations in the known galaxy.
            </motion.p>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="flex gap-4 pt-4 flex-wrap"
            >
              <Link to={`/movie/${heroMovie._id}`} className="cyber-border inline-flex items-center justify-center px-10 py-4 bg-cyan-neon text-black font-black uppercase tracking-widest hover:bg-white transition-all box-glow group">
                Purchase Access
              </Link>
              <button className="inline-flex items-center justify-center px-10 py-4 glass border border-white/10 font-bold hover:bg-white/5 transition-all gap-2 group">
                <Play className="w-5 h-5 text-pink-neon" fill="currentColor" /> <span className="glitch-hover">Scan Trailer</span>
              </button>
            </motion.div>
          </div>

          {/* Interactive Parallax Hero Poster */}
          <motion.div 
            style={{ y: y2 }}
            className="flex-1 relative w-full aspect-[3/4] max-w-md hidden md:block"
          >
             <div className="absolute -inset-4 border border-cyan-neon/20 rounded-3xl animate-pulse" />
             <div className="absolute -top-10 -right-10 text-cyan-neon opacity-20"><Cpu className="w-20 h-20" /></div>
             
             <FloatingCard className="w-full h-full p-2 border-2 border-cyan-neon/30 ml-auto overflow-hidden">
               <img 
                 src={heroMovie.posterPath} 
                 alt={heroMovie.title}
                 className="w-full h-full object-cover rounded-xl grayscale-[50%] hover:grayscale-0 transition-all duration-700"
               />
               
               <div className="absolute bottom-6 left-6 right-6 glass p-6 rounded-xl border border-white/10 flex justify-between items-center">
                 <div>
                   <h3 className="font-bold text-xl font-orbitron tracking-tight">{heroMovie.title}</h3>
                   <div className="flex items-center gap-2 mt-2">
                       <span className="text-[10px] bg-cyan-neon/20 text-cyan-neon px-2 py-0.5 rounded border border-cyan-neon/30 font-bold">UHD-4K</span>
                       <span className="text-[10px] bg-pink-neon/20 text-pink-neon px-2 py-0.5 rounded border border-pink-neon/30 font-bold">ATMOS</span>
                   </div>
                 </div>
                 <div className="flex flex-col items-center bg-black/60 rounded-lg p-3 border border-white/10">
                   <Zap className="w-4 h-4 text-yellow-400 mb-1" />
                   <span className="text-white text-xs font-black">{heroMovie.voteAverage?.toFixed(1)}</span>
                 </div>
               </div>
             </FloatingCard>
          </motion.div>
        </section>
      )}

      {/* Gritty Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-32 relative">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 glass px-4 py-1 border border-white/10 text-[10px] font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">
              End Transmission // Section 01
          </div>
      </div>

      {/* Now Showing Grid */}
      <section className="relative">
        <div className="absolute -left-20 top-0 w-40 h-full bg-cyan-neon/5 blur-[100px] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex justify-between items-end mb-16"
        >
          <div className="space-y-2">
            <h2 className="text-4xl font-orbitron font-black uppercase tracking-tighter">Current Sectors</h2>
            <div className="flex items-center gap-2">
                <div className="w-12 h-[2px] bg-cyan-neon shadow-[0_0_10px_#00f3ff]"></div>
                <span className="text-[10px] font-black text-cyan-neon uppercase tracking-widest">In Rotation</span>
            </div>
          </div>
          <Link to="/movies" className="glass px-6 py-2 text-xs font-bold uppercase tracking-widest hover:bg-cyan-neon hover:text-black transition-all">
            Full Archive →
          </Link>
        </motion.div>

        {loading ? (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
               {[...Array(8)].map((_, i) => (
                   <div key={i} className="h-96 rounded-2xl bg-white/5 animate-pulse border border-white/5 relative overflow-hidden">
                       <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                   </div>
               ))}
           </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {movies.slice(1).map((movie, index) => (
              <Link to={`/movie/${movie._id}`} key={movie._id} className="block group relative">
                <FloatingCard delay={index * 0.1} className="h-[450px] relative overflow-hidden p-0 border border-white/10 group-hover:border-white/30">
                  <img 
                    src={movie.posterPath} 
                    alt={movie.title}
                    className="w-full h-full object-cover rounded-xl transition-all duration-700 group-hover:scale-105 group-hover:rotate-1 grayscale-[30%] group-hover:grayscale-0"
                    loading="lazy"
                  />
                  {/* Digital Grain Overlay */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                  
                  {/* Heavy Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-space-950 via-space-950/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="absolute bottom-0 w-full p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-black text-xl font-orbitron leading-none uppercase tracking-tighter">{movie.title}</h3>
                    </div>
                    
                    <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400">
                        <span className="flex items-center gap-1 text-yellow-400/80"><Zap className="w-3 h-3" /> {movie.voteAverage?.toFixed(1)}</span>
                        <span>{new Date(movie.releaseDate).getFullYear()}</span>
                    </div>

                    <button className="w-full py-3 mt-4 bg-transparent border border-white/20 hover:bg-white hover:text-black rounded-lg text-xs font-black uppercase tracking-widest transition-all opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 cursor-pointer">
                      Initialize Booking
                    </button>
                  </div>
                </FloatingCard>
              </Link>
            ))}
          </div>
        )}
      </section>
    </motion.div>
  );
};

export default Home;
