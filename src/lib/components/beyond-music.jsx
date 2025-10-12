import { useState, useEffect } from 'react';
import { Music, Play, Pause, Sunrise, Sunset, Moon, Cloud } from 'lucide-react';

const BeyondMusic = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [hoveredMood, setHoveredMood] = useState(null);

  const quotes = [
    "When words fail, music speaks.",
    "The rhythm of life is a powerful beat.",
    "Turn up the volume of your dreams."
  ];

  const moods = [
    { 
      icon: Sunrise, 
      title: "Morning Vibes", 
      emoji: "🌅", 
      color: "from-yellow-400 to-orange-500",
      glow: "shadow-yellow-500/50",
      link: "#morning-playlist"
    },
    { 
      icon: Sunset, 
      title: "Evening Drive", 
      emoji: "🌇", 
      color: "from-orange-500 to-pink-600",
      glow: "shadow-orange-500/50",
      link: "#evening-playlist"
    },
    { 
      icon: Moon, 
      title: "Midnight Coding", 
      emoji: "🌌", 
      color: "from-blue-500 to-purple-600",
      glow: "shadow-purple-500/50",
      link: "#midnight-playlist"
    },
    { 
      icon: Cloud, 
      title: "Chill Focus", 
      emoji: "☁️", 
      color: "from-cyan-400 to-blue-500",
      glow: "shadow-cyan-500/50",
      link: "#chill-playlist"
    }
  ];

  const albums = [
    { title: "Neon Dreams", artist: "Synthwave", color: "from-purple-600 to-pink-500" },
    { title: "Digital Rain", artist: "Lofi Beats", color: "from-blue-600 to-cyan-500" },
    { title: "Code Flow", artist: "Ambient", color: "from-green-600 to-teal-500" },
    { title: "Night Drive", artist: "Electronic", color: "from-indigo-600 to-purple-500" },
    { title: "Focus Mode", artist: "Classical", color: "from-orange-600 to-red-500" },
    { title: "Cosmic Waves", artist: "Space", color: "from-violet-600 to-fuchsia-500" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-purple-950 opacity-80"></div>
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-500 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10">
        <section className="min-h-screen flex flex-col items-center justify-center px-6 relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <Music className="w-96 h-96 text-blue-500 animate-pulse" />
          </div>
          
          <div className="text-center space-y-6 relative z-10">
            <h1 className="text-7xl md:text-9xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent animate-pulse">
              My Soundscape
            </h1>
            <p className="text-2xl md:text-3xl text-gray-400 font-light tracking-wide">
              Every beat tells a story.
            </p>
            
            <div className="flex gap-2 justify-center mt-12">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 bg-gradient-to-t from-blue-500 to-purple-500 rounded-full"
                  style={{
                    height: '60px',
                    animation: `pulse ${0.5 + i * 0.1}s ease-in-out infinite alternate`
                  }}
                ></div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="max-w-2xl mx-auto">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-500 group">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl shadow-lg group-hover:shadow-purple-500/50 transition-all duration-500 group-hover:scale-105"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-1">Midnight Dreams</h3>
                  <p className="text-gray-400 mb-4">Synthetic Echoes</p>
                  
                  <div className="flex gap-1 h-12 items-end mb-4">
                    {[...Array(30)].map((_, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-blue-500 to-purple-500 rounded-full"
                        style={{
                          height: `${20 + Math.random() * 80}%`,
                          animation: isPlaying ? `pulse ${0.5 + Math.random() * 0.5}s ease-in-out infinite alternate` : 'none'
                        }}
                      ></div>
                    ))}
                  </div>

                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    <span>{isPlaying ? 'Pause' : 'Play'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-20">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Mood Zones
          </h2>
          
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {moods.map((mood, idx) => (
              <a
                key={idx}
                href={mood.link}
                onMouseEnter={() => setHoveredMood(idx)}
                onMouseLeave={() => setHoveredMood(null)}
                className="group relative"
              >
                <div className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 h-64 flex flex-col items-center justify-center text-center transition-all duration-500 hover:bg-white/10 ${hoveredMood === idx ? `shadow-2xl ${mood.glow}` : 'shadow-lg'}`}>
                  <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {mood.emoji}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{mood.title}</h3>
                  <div className={`h-1 w-16 bg-gradient-to-r ${mood.color} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="px-6 py-20">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            My Collection
          </h2>
          
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {albums.map((album, idx) => (
              <div
                key={idx}
                className="group cursor-pointer"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="relative aspect-square">
                  <div className={`absolute inset-0 bg-gradient-to-br ${album.color} rounded-2xl transform group-hover:scale-105 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-2xl group-hover:shadow-purple-500/50`}>
                    <div className="absolute inset-0 bg-black/20 rounded-2xl"></div>
                  </div>
                  <div className="absolute inset-0 backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Music className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <p className="text-sm font-medium truncate">{album.title}</p>
                  <p className="text-xs text-gray-500 truncate">{album.artist}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="max-w-4xl mx-auto text-center min-h-[200px] flex items-center justify-center">
            <div className="relative">
              {quotes.map((quote, idx) => (
                <p
                  key={idx}
                  className={`text-3xl md:text-5xl font-light italic transition-all duration-1000 absolute inset-0 ${
                    currentQuote === idx ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    "{quote}"
                  </span>
                  <div className="h-1 w-32 mx-auto mt-6 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full"></div>
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20 text-center">
          <div className="inline-block">
            <p className="text-2xl md:text-3xl text-gray-400 font-light animate-pulse">
              Let the music play
              <span className="inline-block ml-2 text-blue-500">♪</span>
            </p>
            <div className="h-px w-full mt-4 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default BeyondMusic;
