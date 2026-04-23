import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import FloatingCard from '../components/UI/FloatingCard';
import TrailerModal from '../components/UI/TrailerModal';
import { movieService } from '../services/movieService';
import { Play, Cpu, Zap, Activity, Binary } from 'lucide-react';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const fetchMovies = async () => {
        const data = await movieService.getAllMovies();
        setMovies(data);
        setLoading(false);
    };
    fetchMovies();
  }, []);

  const heroMovie = movies[0];

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 md:pt-32 pb-20 px-4 md:px-6 min-h-screen text-white w-full max-w-7xl mx-auto overflow-hidden"
    >
      {/* Cinematic Hero Section */}
      {!loading && heroMovie && (
        <section className="relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 mb-24 md:mb-48 min-h-[60vh] md:min-h-[70vh]">
          {/* Parallax Background Text */}
          <motion.div 
            style={{ y: y1, opacity }}
            className="hidden lg:block absolute -left-20 top-20 text-[10vw] font-black text-white/[0.03] select-none pointer-events-none font-orbitron whitespace-nowrap"
          >
            SYSTEM ONLINE // UPLINK ACTIVE
          </motion.div>

          <div className="flex-1 space-y-6 md:space-y-8 relative z-10 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-cyan-neon font-bold text-[10px] md:text-xs tracking-[0.4em] uppercase">
                <Activity className="w-3 h-3 md:w-4 md:h-4 animate-pulse" /> Live Transmission
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-8xl font-orbitron font-black leading-none uppercase tracking-tighter">
                <span className="block overflow-hidden">
                    <motion.span 
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] }}
                        className="block"
                    >Experience</motion.span>
                </span>
                <span className="block overflow-hidden relative">
                    <motion.span 
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.6, 0.05, -0.01, 0.9] }}
                        className="block bg-clip-text text-transparent bg-gradient-to-r from-cyan-neon via-white to-pink-neon"
                    >Anti-Gravity</motion.span>
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-cyan-neon/30 -translate-y-1/2 pointer-events-none hidden md:block"></div>
                </span>
                <span className="block overflow-hidden">
                    <motion.span 
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.6, 0.05, -0.01, 0.9] }}
                        className="block"
                    >Cinema.</motion.span>
                </span>
            </h1>

            <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
                className="text-gray-400 text-sm md:text-lg max-w-md border-l-2 border-cyan-neon pl-4 md:pl-6 py-1 md:py-2 mx-auto md:mx-0"
            >
              Access the most immersive sci-fi clusters and blockbuster simulations in the known galaxy.
            </motion.p>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2 }}
                className="flex gap-4 pt-2 md:pt-4 flex-wrap justify-center md:justify-start"
            >
              <Link to={`/movie/${heroMovie._id}`} className="cyber-border inline-flex items-center justify-center px-6 md:px-10 py-3 md:py-4 bg-cyan-neon text-black font-black uppercase text-[10px] md:text-sm tracking-widest hover:bg-white transition-all box-glow group">
                Purchase Access
              </Link>
              <button 
                onClick={() => setSelectedMovie(heroMovie)}
                className="inline-flex items-center justify-center px-6 md:px-10 py-3 md:py-4 glass border border-white/10 font-bold hover:bg-white/5 transition-all gap-2 group text-[10px] md:text-sm"
              >
                <Play className="w-4 h-4 md:w-5 md:h-5 text-pink-neon" fill="currentColor" /> <span className="glitch-hover">Scan Trailer</span>
              </button>
            </motion.div>
          </div>

          {/* Hero Poster */}
          <motion.div 
            style={{ y: y2 }}
            className="flex-1 relative w-full aspect-[2/3] md:aspect-[3/4] max-w-[280px] md:max-w-md hidden sm:block"
          >
             <div className="absolute -inset-4 border border-cyan-neon/20 rounded-3xl animate-pulse hidden md:block" />
             <div className="absolute -top-10 -right-10 text-cyan-neon font-black opacity-10 hidden lg:block text-8xl font-orbitron uppercase">Sector.H</div>
             
             <FloatingCard className="w-full h-full p-2 border-2 border-cyan-neon/30 ml-auto overflow-hidden group">
               <img 
                 src={heroMovie.posterPath} 
                 alt={heroMovie.title}
                 className="w-full h-full object-cover rounded-xl grayscale-[50%] group-hover:grayscale-0 transition-all duration-700"
               />
               
               <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6 glass p-4 md:p-6 rounded-xl border border-white/10 flex justify-between items-center transform transition-transform group-hover:translate-y-[-5px]">
                 <div className="max-w-[70%]">
                   <h3 className="font-bold text-sm md:text-xl font-orbitron tracking-tight truncate uppercase">{heroMovie.title}</h3>
                   <div className="flex items-center gap-1 md:gap-2 mt-1 md:mt-2">
                       <span className="text-[8px] md:text-[10px] bg-cyan-neon/20 text-cyan-neon px-1.5 md:px-2 py-0.5 rounded border border-cyan-neon/30 font-bold uppercase">{heroMovie.metadata?.aiConfidence || 'AI.CONF'}</span>
                       <span className="text-[8px] md:text-[10px] bg-pink-neon/20 text-pink-neon px-1.5 md:px-2 py-0.5 rounded border border-pink-neon/30 font-bold uppercase">{heroMovie.metadata?.archiveStatus || 'STATUS'}</span>
                   </div>
                 </div>
                 <div className="flex flex-col items-center bg-black/60 rounded-lg p-2 md:p-3 border border-white/10 shrink-0">
                   <Zap className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 mb-1" />
                   <span className="text-white text-[10px] md:text-xs font-black">{heroMovie.voteAverage?.toFixed(1)}</span>
                 </div>
               </div>
             </FloatingCard>
          </motion.div>
        </section>
      )}

      {/* Gritty Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16 md:mb-32 relative">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 glass px-3 md:px-4 py-0.5 md:py-1 border border-white/10 text-[8px] md:text-[10px] font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">
              End Transmission // Section 0-{movies.length}
          </div>
      </div>

      {/* Now Showing Grid */}
      <section className="relative">
        <div className="absolute -left-20 top-0 w-40 h-full bg-cyan-neon/5 blur-[100px] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex justify-between items-end mb-10 md:mb-16"
        >
          <div className="space-y-1 md:space-y-2">
            <h2 className="text-2xl md:text-4xl font-orbitron font-black uppercase tracking-tighter">Current Sectors</h2>
            <div className="flex items-center gap-2">
                <div className="w-8 md:w-12 h-[2px] bg-cyan-neon shadow-[0_0_10px_#00f3ff]"></div>
                <span className="text-[8px] md:text-[10px] font-black text-cyan-neon uppercase tracking-widest">In Rotation</span>
            </div>
          </div>
          <Link to="/movies" className="glass px-4 md:px-6 py-1.5 md:py-2 text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-cyan-neon hover:text-black transition-all">
            Full Archive →
          </Link>
        </motion.div>

        {loading ? (
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-10">
               {[...Array(8)].map((_, i) => (
                   <div key={i} className="h-[280px] md:h-[450px] rounded-2xl bg-white/5 animate-pulse border border-white/5" />
               ))}
           </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-10">
            {movies.slice(1).map((movie, index) => (
              <Link to={`/movie/${movie._id}`} key={movie._id} className="block group relative">
                <FloatingCard delay={index * 0.05} className="h-[280px] md:h-[450px] relative overflow-hidden p-0 border border-white/10 group-hover:border-white/30">
                  <img 
                    src={movie.posterPath} 
                    alt={movie.title}
                    className="w-full h-full object-cover rounded-xl transition-all duration-700 group-hover:scale-105 group-hover:rotate-1 grayscale-[30%] group-hover:grayscale-0"
                    loading="lazy"
                  />
                  
                  {/* Heavy Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-space-950 via-space-950/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="absolute bottom-0 w-full p-3 md:p-6 space-y-2 md:space-y-4">
                    <div className="flex gap-2 items-center">
                        <span className="text-[8px] font-black text-cyan-neon uppercase tracking-tighter bg-cyan-neon/10 px-1 border border-cyan-neon/20">Sec.{movie.metadata?.uplinkPort || 'UNK'}</span>
                    </div>
                    <h3 className="font-black text-xs md:text-xl font-orbitron leading-none uppercase tracking-tighter truncate md:whitespace-normal">{movie.title}</h3>
                    
                    <div className="flex items-center gap-2 md:gap-4 text-[8px] md:text-[10px] font-bold text-gray-500">
                        <span className="flex items-center gap-1 text-yellow-400/80"><Zap className="w-2 md:w-3 h-2 md:h-3" /> {movie.voteAverage?.toFixed(1)}</span>
                        <span className="hidden sm:inline font-black uppercase text-pink-neon/60">{movie.metadata?.signalStrength || '??%'} Strength</span>
                    </div>

                    <div className="flex gap-2 pt-2 md:pt-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all">
                        <button className="flex-1 py-1.5 md:py-3 bg-white text-black rounded-sm text-[8px] md:text-xs font-black uppercase tracking-widest hover:bg-cyan-neon transition-colors">
                            Initialize
                        </button>
                    </div>
                  </div>
                </FloatingCard>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Trailer Modal Integration */}
      <TrailerModal 
        isOpen={!!selectedMovie} 
        onClose={() => setSelectedMovie(null)} 
        movie={selectedMovie} 
      />
    </motion.div>
  );
};

export default Home;
