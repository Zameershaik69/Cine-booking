import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, Star, Users, Zap, Binary, Activity, ShieldCheck, WifiHigh } from 'lucide-react';
import { movieService } from '../services/movieService';
import TrailerModal from '../components/UI/TrailerModal';

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showTrailer, setShowTrailer] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const data = await movieService.getMovieById(id);
            const all = await movieService.getAllMovies();
            setMovie(data);
            setRelated(all.filter(m => m._id !== id).slice(0, 4));
            setLoading(false);
            window.scrollTo(0, 0);
        };
        fetchData();
    }, [id]);

    if (loading) return (
        <div className="pt-32 flex flex-col justify-center items-center min-h-screen gap-4">
            <div className="w-12 h-12 border-t-2 border-cyan-neon border-solid rounded-full animate-spin box-glow"></div>
            <span className="font-orbitron text-[10px] tracking-[0.4em] text-gray-500 uppercase">Synchronizing Data Stream...</span>
        </div>
    );

    if (!movie) return <div className="pt-32 text-center text-white min-h-screen font-orbitron">SIGNAL LOST: SECTOR {id}</div>;

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen w-full text-white relative pb-32"
        >
            {/* Massive Backdrop Hero */}
            <div className="relative w-full h-[40vh] md:h-[70vh] overflow-hidden">
                <img 
                    src={movie.backdropPath || movie.posterPath} 
                    alt={movie.title}
                    className="w-full h-full object-cover scale-110 blur-[2px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-space-950 via-space-950/70 to-transparent"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(2,4,10,0.8))]"></div>
                
                {/* HUD Overlay */}
                <div className="absolute top-32 left-8 md:left-20 hidden md:flex flex-col gap-6 border-l border-white/10 pl-6">
                    <div className="flex flex-col">
                        <span className="text-gray-500 text-[8px] font-black uppercase tracking-widest">Signal_Strength</span>
                        <span className="text-cyan-neon font-orbitron text-xl font-black">{movie.metadata?.signalStrength || '88%'}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-500 text-[8px] font-black uppercase tracking-widest">Archive_Status</span>
                        <span className="text-pink-neon font-orbitron text-sm font-black">{movie.metadata?.archiveStatus || 'ACTIVE'}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-500 text-[8px] font-black uppercase tracking-widest">Uplink_Port</span>
                        <span className="text-white font-orbitron text-sm font-black">{movie.metadata?.uplinkPort || 'SEC.X'}</span>
                    </div>
                </div>
            </div>

            {/* Content Container */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 relative -mt-24 md:-mt-48 z-10">
                <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                    
                    {/* Left: Poster */}
                    <motion.div 
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="w-full md:w-1/3 max-w-[280px] md:max-w-sm mx-auto md:mx-0 shrink-0"
                    >
                        <div className="rounded-2xl overflow-hidden glass border border-white/10 shadow-2xl shadow-cyan-neon/20 relative group">
                            <img src={movie.posterPath} alt={movie.title} className="w-full object-cover" />
                            <div className="absolute top-4 right-4 glass px-3 py-1 rounded-sm border border-cyan-neon/30 text-[10px] font-black font-orbitron text-cyan-neon uppercase tracking-widest">
                                Sector.Active
                            </div>
                            <button 
                                onClick={() => setShowTrailer(true)}
                                className="absolute inset-0 bg-space-950/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                            >
                                <Zap className="w-12 h-12 text-cyan-neon animate-pulse" />
                            </button>
                        </div>
                    </motion.div>

                    {/* Right: Info */}
                    <motion.div 
                        initial={{ x: 30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="flex-1 pt-4 md:pt-12 text-center md:text-left"
                    >
                        <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                            <span className="text-cyan-neon font-bold text-[10px] uppercase tracking-[0.4em] flex items-center gap-2">
                                <Activity className="w-4 h-4" /> Live_Uplink
                            </span>
                            <span className="h-px w-12 bg-white/10"></span>
                            <span className="text-gray-500 font-bold text-[10px] uppercase tracking-[0.4em]">Conf: {movie.metadata?.aiConfidence || 'HIGH'}</span>
                        </div>

                        <h1 className="text-4xl md:text-7xl font-orbitron font-black mb-6 uppercase tracking-tighter leading-none glitch-text" data-text={movie.title}>{movie.title}</h1>
                        
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-6 text-[10px] md:text-xs text-gray-400 mb-8 font-black uppercase tracking-widest">
                            <span className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-sm"><Zap className="w-3 h-3 text-yellow-400"/> {movie.voteAverage?.toFixed(1)}</span>
                            <span className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-sm"><Clock className="w-3 h-3 text-cyan-neon"/> {movie.runtime || 120} min</span>
                            <span className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-sm"><Calendar className="w-3 h-3 text-pink-neon"/> {new Date(movie.releaseDate).getFullYear()}</span>
                        </div>

                        <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-10">
                            {movie.genres?.map(g => (
                                <span key={g} className="px-3 py-1 bg-cyan-neon/10 border border-cyan-neon/20 text-[9px] font-black uppercase tracking-widest text-cyan-neon">{g}</span>
                            ))}
                        </div>

                        <div className="space-y-6 mb-12">
                            <div className="flex items-center justify-center md:justify-start gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                <Binary className="w-3 h-3" /> Data.Synopsis
                            </div>
                            <p className="text-gray-400 text-base md:text-xl leading-relaxed max-w-3xl border-l-2 border-white/10 pl-6 mx-auto md:mx-0">
                                {movie.overview}
                            </p>
                        </div>

                        <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-black uppercase tracking-widest max-w-2xl">
                            {movie.director && <div><span className="text-gray-600 block mb-2">Command// Director</span> <span className="text-white text-sm">{movie.director}</span></div>}
                            {movie.cast && <div><span className="text-gray-600 block mb-2">Personnel// Lead</span> <span className="text-white text-sm">{movie.cast.join(', ')}</span></div>}
                        </div>

                        <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 pt-4">
                            <Link 
                                to="/checkout" 
                                state={{ showId: 'show_mock_123', mockMovie: movie }}
                                className="cyber-border inline-flex items-center justify-center gap-3 px-12 py-5 bg-pink-neon text-white font-black uppercase tracking-[0.2em] text-xs md:text-sm hover:bg-white hover:text-black transition-all pink-glow group"
                            >
                                <Users className="w-5 h-5"/> Initiate Reservation
                            </Link>
                            <button 
                                onClick={() => setShowTrailer(true)}
                                className="glass inline-flex items-center justify-center gap-3 px-12 py-5 border border-white/10 text-white font-black uppercase tracking-[0.2em] text-xs md:text-sm hover:bg-white/5 transition-all"
                            >
                                <Zap className="w-5 h-5 text-cyan-neon"/> Scan Trailer
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Related Transmissions */}
                <section className="mt-32 pt-20 border-t border-white/5">
                    <div className="flex justify-between items-end mb-12">
                        <div className="space-y-2">
                             <h2 className="text-2xl md:text-3xl font-orbitron font-black uppercase tracking-tighter">Related Transmissions</h2>
                             <div className="w-12 h-1 bg-cyan-neon"></div>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {related.map(m => (
                            <Link key={m._id} to={`/movie/${m._id}`} className="group space-y-4">
                                <div className="aspect-[2/3] overflow-hidden glass border border-white/5 group-hover:border-cyan-neon/30 transition-all">
                                    <img src={m.posterPath} alt={m.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-orbitron font-black text-xs uppercase truncate group-hover:text-cyan-neon transition-colors">{m.title}</h4>
                                    <span className="text-[8px] font-bold text-gray-600 uppercase tracking-widest">Sector.{m.metadata?.uplinkPort || 'UNK'}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>

            {/* Trailer Modal */}
            <TrailerModal isOpen={showTrailer} onClose={() => setShowTrailer(false)} movie={movie} />
        </motion.div>
    );
};

export default MovieDetails;
