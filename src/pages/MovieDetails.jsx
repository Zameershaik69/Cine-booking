import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, Star, Users, Zap, Binary } from 'lucide-react';

const MOCK_MOVIE_DB = {
    'm1': {
        _id: 'm1',
        title: "Interstellar Resurgence",
        overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival. When they return, they find the galaxy changed forever.",
        posterPath: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=600&auto=format&fit=crop",
        backdropPath: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1200",
        releaseDate: "2026-11-05",
        voteAverage: 9.4,
        runtime: 169,
        genres: ["Sci-Fi", "Adventure", "Drama"],
        director: "Christopher Nolan",
        cast: ["Matthew McConaughey", "Anne Hathaway"]
    },
    'm2': {
        _id: 'm2',
        title: "Blade Runner: 2049",
        overview: "A young blade runner's discovery of a long-buried secret leads him to track down a former blade runner who's been missing for thirty years.",
        posterPath: "https://images.unsplash.com/photo-1618519764620-7403abdbdee9?q=80&w=600&auto=format&fit=crop",
        backdropPath: "https://images.unsplash.com/photo-1618519764620-7403abdbdee9?q=80&w=1200",
        releaseDate: "2017-10-06",
        voteAverage: 8.4,
        runtime: 164,
        genres: ["Sci-Fi", "Action", "Mystery"],
        director: "Denis Villeneuve",
        cast: ["Ryan Gosling", "Harrison Ford"]
    },
    'm3': {
        _id: 'm3',
        title: "Dune: Prophecy",
        overview: "The secret origins of the Bene Gesserit are revealed in a war-torn galaxy.",
        posterPath: "https://images.unsplash.com/photo-1506466010722-395aa2bef877?q=80&w=600&auto=format&fit=crop",
        backdropPath: "https://images.unsplash.com/photo-1506466010722-395aa2bef877?q=80&w=1200",
        releaseDate: "2024-11-17",
        voteAverage: 8.8,
        runtime: 155,
        genres: ["Sci-Fi", "Epic", "Adventure"]
    },
    // Adding fallbacks for others to ensure no broken pages
    'default': {
        _id: 'm_def',
        title: "Cosmic Transmission",
        overview: "Data log missing for this sector. Transmission interrupted by nebula interference.",
        posterPath: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop",
        backdropPath: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200",
        releaseDate: "2026-01-01",
        voteAverage: 7.2,
        runtime: 120,
        genres: ["Sci-Fi", "Digital Archive"]
    }
};

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            const data = MOCK_MOVIE_DB[id] || { ...MOCK_MOVIE_DB['default'], title: id.startsWith('m') ? "Classified Sector" : "External Feed" }; 
            setMovie(data);
            setLoading(false);
        }, 600);
        return () => clearTimeout(timer);
    }, [id]);

    if (loading) return (
        <div className="pt-32 flex flex-col justify-center items-center min-h-screen gap-4">
            <div className="w-12 h-12 border-t-2 border-cyan-neon border-solid rounded-full animate-spin box-glow"></div>
            <span className="font-orbitron text-[10px] tracking-[0.4em] text-gray-500 uppercase">Synchronizing Data...</span>
        </div>
    );

    if (!movie) return <div className="pt-32 text-center text-white min-h-screen font-orbitron">SIGNAL LOST</div>;

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
            </div>

            {/* Content Container */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 relative -mt-24 md:-mt-48 z-10">
                <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                    
                    {/* Left: Poster - Responsive scaling */}
                    <motion.div 
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="w-full md:w-1/3 max-w-[280px] md:max-w-sm mx-auto md:mx-0 shrink-0"
                    >
                        <div className="rounded-2xl overflow-hidden glass border border-white/10 shadow-2xl shadow-cyan-neon/20 relative">
                            <img src={movie.posterPath} alt={movie.title} className="w-full object-cover" />
                            <div className="absolute top-4 right-4 glass px-3 py-1 rounded-sm border border-cyan-neon/30 text-[10px] font-black font-orbitron text-cyan-neon uppercase tracking-widest">
                                Sector.Active
                            </div>
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
                        <h1 className="text-4xl md:text-7xl font-orbitron font-black mb-6 uppercase tracking-tighter leading-none">{movie.title}</h1>
                        
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

                        <div className="flex justify-center md:justify-start pt-4">
                            <Link 
                                to="/checkout" 
                                state={{ showId: 'show_mock_123', mockMovie: movie }}
                                className="cyber-border inline-flex items-center justify-center gap-3 px-12 py-5 bg-pink-neon text-white font-black uppercase tracking-[0.2em] text-xs md:text-sm hover:bg-white hover:text-black transition-all pink-glow group"
                            >
                                <Users className="w-5 h-5"/> Initiate Reservation
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default MovieDetails;
