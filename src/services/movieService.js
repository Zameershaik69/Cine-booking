/**
 * Movie Service - Data Abstraction Layer
 * Handles fetching movies from mock source or potential API
 */

const MOCK_MOVIES = [
    {
        _id: 'm1',
        title: "Interstellar Resurgence",
        overview: "A team of explorers return through the wormhole to save a dying star system. As they discover that time is not their only enemy.",
        posterPath: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=600&auto=format&fit=crop",
        backdropPath: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1200",
        releaseDate: "2026-11-05",
        voteAverage: 9.4,
        runtime: 169,
        genres: ["Sci-Fi", "Adventure", "Drama"],
        director: "Christopher Nolan",
        cast: ["Matthew McConaughey", "Anne Hathaway"],
        videoUrl: "https://www.youtube.com/embed/zSWdZVtXT7E",
        metadata: {
            signalStrength: "98%",
            archiveStatus: "SECURE/ALPHA",
            aiConfidence: "OPTIMAL",
            uplinkPort: "SEC-88"
        }
    },
    {
        _id: 'm2',
        title: "Blade Runner: 2049",
        overview: "A young blade runner's discovery of a long-buried secret leads him to track down a former blade runner.",
        posterPath: "https://images.unsplash.com/photo-1618519764620-7403abdbdee9?q=80&w=600&auto=format&fit=crop",
        backdropPath: "https://images.unsplash.com/photo-1618519764620-7403abdbdee9?q=80&w=1200",
        releaseDate: "2017-10-06",
        voteAverage: 8.4,
        runtime: 164,
        genres: ["Sci-Fi", "Action", "Mystery"],
        director: "Denis Villeneuve",
        cast: ["Ryan Gosling", "Harrison Ford"],
        videoUrl: "https://www.youtube.com/embed/gCcx85zbxz4",
        metadata: {
            signalStrength: "82%",
            archiveStatus: "VAL-02/BETA",
            aiConfidence: "STABLE",
            uplinkPort: "SEC-42"
        }
    },
    {
        _id: 'm3',
        title: "Dune: Prophecy",
        overview: "The secret origins of the Bene Gesserit are revealed in a war-torn galaxy.",
        posterPath: "https://images.unsplash.com/photo-1506466010722-395aa2bef877?q=80&w=600&auto=format&fit=crop",
        backdropPath: "https://images.unsplash.com/photo-1506466010722-395aa2bef877?q=80&w=1200",
        releaseDate: "2024-11-17",
        voteAverage: 8.8,
        runtime: 155,
        genres: ["Sci-Fi", "Epic", "Adventure"],
        videoUrl: "https://www.youtube.com/embed/wayHEnV_y9g",
        metadata: {
            signalStrength: "91%",
            archiveStatus: "AN-03/GAMMA",
            aiConfidence: "CRITICAL",
            uplinkPort: "SEC-DUNE"
        }
    },
    {
        _id: 'm4',
        title: "Arrival: First Signal",
        overview: "Linguist Louise Banks leads an elite team of investigators when gigantic spaceships touch down around the world.",
        posterPath: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop",
        releaseDate: "2016-11-11",
        voteAverage: 7.9,
        videoUrl: "https://www.youtube.com/embed/tFMo3UJ4B4g",
        metadata: {
            signalStrength: "76%",
            archiveStatus: "LNK-04/DELTA",
            aiConfidence: "MODERATE",
            uplinkPort: "SEC-7V"
        }
    },
    {
        _id: 'm5',
        title: "The Matrix: Neo",
        overview: "A new era of human-machine interface begins as the binary code evolves.",
        posterPath: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=600&auto=format&fit=crop",
        releaseDate: "2021-12-22",
        voteAverage: 6.7,
        videoUrl: "https://www.youtube.com/embed/vKQi3bBA1y8",
        metadata: {
            signalStrength: "99%",
            archiveStatus: "SYS-05/EPSILON",
            aiConfidence: "SYNTHETIC",
            uplinkPort: "SEC-BIN"
        }
    },
    {
        _id: 'm6',
        title: "Oblivion Protocol",
        overview: "A veteran assigned to extract Earth's remaining resources begins to question what he knows about his mission.",
        posterPath: "https://images.unsplash.com/photo-1446776811953-b23d5732194f?q=80&w=600&auto=format&fit=crop",
        releaseDate: "2013-04-19",
        voteAverage: 7.0,
        videoUrl: "https://www.youtube.com/embed/XmIIgE7eSak",
        metadata: {
            signalStrength: "64%",
            archiveStatus: "OBS-06/ZETA",
            aiConfidence: "DEGRADED",
            uplinkPort: "SEC-OBL"
        }
    },
    {
        _id: 'm7',
        title: "Solaris Echo",
        overview: "Psychologist Kris Kelvin travels to a space station to investigate a series of mysterious deaths.",
        posterPath: "https://images.unsplash.com/photo-1635393040182-3e742416b048?q=80&w=600&auto=format&fit=crop",
        releaseDate: "2025-03-22",
        voteAverage: 8.2,
        videoUrl: "https://www.youtube.com/embed/R4X2QkK1nS4",
        metadata: {
            signalStrength: "88%",
            archiveStatus: "HST-07/ETA",
            aiConfidence: "ECHO_LOCK",
            uplinkPort: "SEC-SOL"
        }
    },
    {
        _id: 'm8',
        title: "Ad Astra: Void",
        overview: "Astronaut Roy McBride undertakes a mission to the outer edges of the solar system.",
        posterPath: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=600&auto=format&fit=crop",
        releaseDate: "2019-09-20",
        voteAverage: 6.5,
        videoUrl: "https://www.youtube.com/embed/P6AaSMfXHbA",
        metadata: {
            signalStrength: "72%",
            archiveStatus: "DRK-08/THETA",
            aiConfidence: "VOID_EST",
            uplinkPort: "SEC-AA"
        }
    },
    {
        _id: 'm9',
        title: "Ghost In Shell",
        overview: "In the near future, Major is the first of her kind: A human saved from a terrible crash.",
        posterPath: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop",
        releaseDate: "2017-03-31",
        voteAverage: 6.3,
        videoUrl: "https://www.youtube.com/embed/G4VmJcZR0Yg",
        metadata: {
            signalStrength: "94%",
            archiveStatus: "SHL-09/IOTA",
            aiConfidence: "GHOST_SYNC",
            uplinkPort: "SEC-SHELL"
        }
    },
    {
        _id: 'm10',
        title: "Tron: Ares",
        overview: "A highly sophisticated Program, Ares, is sent from the digital world into the real world.",
        posterPath: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop",
        releaseDate: "2025-10-10",
        voteAverage: 9.1,
        videoUrl: "https://www.youtube.com/embed/v-R6Xv5mZ4M",
        metadata: {
            signalStrength: "100%",
            archiveStatus: "GRID-10/KAPPA",
            aiConfidence: "ARES_LOAD",
            uplinkPort: "SEC-GRID"
        }
    },
    {
        _id: 'm11',
        title: "Moonlight Drift",
        overview: "Two lovers on different lunar bases try to connect through quantum telepathy.",
        posterPath: "https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=600&auto=format&fit=crop",
        releaseDate: "2026-01-01",
        voteAverage: 8.9,
        videoUrl: "https://www.youtube.com/embed/PZ_6T8W7a_8",
        metadata: {
            signalStrength: "85%",
            archiveStatus: "LUN-11/LAMBDA",
            aiConfidence: "DRIFT_SET",
            uplinkPort: "SEC-MOON"
        }
    },
    {
        _id: 'm12',
        title: "Project Hail Mary",
        overview: "Ryland Grace is the sole survivor on a desperate, last-chance mission.",
        posterPath: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=600&auto=format&fit=crop",
        releaseDate: "2026-06-15",
        voteAverage: 9.5,
        videoUrl: "https://www.youtube.com/embed/PZ_6T8W7a_8",
        metadata: {
            signalStrength: "97%",
            archiveStatus: "STR-12/MU",
            aiConfidence: "STELLAR_PH",
            uplinkPort: "SEC-PHM"
        }
    }
];

export const movieService = {
    getAllMovies: async () => {
        // Simulate API delay
        return new Promise((resolve) => {
            setTimeout(() => resolve(MOCK_MOVIES), 800);
        });
    },

    getMovieById: async (id) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const movie = MOCK_MOVIES.find(m => m._id === id);
                resolve(movie || null);
            }, 500);
        });
    },

    searchMovies: async (query) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (!query) return resolve([]);
                const filtered = MOCK_MOVIES.filter(m => 
                    m.title.toLowerCase().includes(query.toLowerCase()) ||
                    m.overview.toLowerCase().includes(query.toLowerCase()) ||
                    m.genres?.some(g => g.toLowerCase().includes(query.toLowerCase()))
                );
                resolve(filtered);
            }, 400);
        });
    }
};
