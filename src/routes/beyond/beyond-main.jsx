import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import LoadingOverlay from '../../lib/components/loading-overlay.jsx';
import SplineMasking from '../../lib/components/spline-masking.jsx';
import Spline from '@splinetool/react-spline';



// ============================================
// CARD REFLECTION COMPONENT
// ============================================
const CardReflection = ({ card, isFront, cardSize }) => {
    if (!isFront) return null;
    
    return (
        <div 
            className="absolute pointer-events-none"
            style={{
                width: `${cardSize}px`,
                height: `${cardSize * 0.4}px`,
                bottom: `-${cardSize * 0.35}px`,
                left: 0,
                transform: 'scaleY(-1) perspective(500px) rotateX(30deg)',
                transformOrigin: 'top center',
            }}
        >
            <div 
                className="w-full h-full rounded-3xl overflow-hidden"
                style={{
                    background: `url(${card.image}) center center / cover`,
                    opacity: 0.25,
                    filter: 'blur(3px)',
                    maskImage: 'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.5) 100%)',
                    WebkitMaskImage: 'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.5) 100%)',
                }}
            />
        </div>
    );
};

// ============================================
// MAIN COMPONENT
// ============================================
const BeyondMain = () => {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [exitingIndex, setExitingIndex] = useState(null);
    const [passedCards, setPassedCards] = useState([]);
    const [splineLoaded, setSplineLoaded] = useState(false);
    
    // Mouse position for magnetic effect and parallax
    const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
    const [hoveredCard, setHoveredCard] = useState(null);
    


    useEffect(() => {
        setIsVisible(true);
    }, []);

    // Track mouse position for effects
    const handleMouseMove = useCallback((e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
    }, []);

    const cards = [
        {
            title: 'BOOKS',
            subtitle: 'Stories that shaped how I think.',
            image: 'https://res.cloudinary.com/dqqrrgdwd/image/upload/v1760170029/books_uoldj8.jpg',
            link: '/beyond/books',
        },
        {
            title: 'MUSIC',
            subtitle: 'Soundtracks to my moods.',
            image: 'https://res.cloudinary.com/dqqrrgdwd/image/upload/v1760170040/desk-music-black-and-white-technology-headphone-gadget-100901-pxhere.com_yeay0u.jpg',
            link: '/beyond/music',
        },
        {
            title: 'MOVIES',
            subtitle: 'Cinematic worlds I escape into.',
            image: 'https://res.cloudinary.com/dqqrrgdwd/image/upload/v1760170030/Movie_ogjjt6.jpg',
            link: '/beyond/movies',
        },
        {
            title: 'SPORTS & ADRENALINE',
            subtitle: 'The thrill side of me.',
            image: 'https://res.cloudinary.com/dqqrrgdwd/image/upload/v1760170028/F1_fne2yc.jpg',
            link: '/beyond/sports',
        },
        {
            title: 'RANDOM FACTS',
            subtitle: "Chaos you didn't ask for.",
            image: 'https://res.cloudinary.com/dqqrrgdwd/image/upload/v1760170029/BG_of_the_beyond_s5gpta.webp',
            link: '/beyond/random',
        },
    ];

    const totalCards = cards.length;
    const cardSize = 420;

    // Calculate magnetic tilt based on mouse position
    const getMagneticTilt = (cardIndex) => {
        if (hoveredCard !== cardIndex) return { rotateX: 0, rotateY: 0 };
        
        const tiltX = (mousePosition.y - 0.5) * -15;
        const tiltY = (mousePosition.x - 0.5) * 15;
        
        return { rotateX: tiltX, rotateY: tiltY };
    };

    // Calculate parallax offset for UI elements
    const getParallaxOffset = useCallback((intensity = 1) => {
        const offsetX = (mousePosition.x - 0.5) * 20 * intensity;
        const offsetY = (mousePosition.y - 0.5) * 10 * intensity;
        return { x: offsetX, y: offsetY };
    }, [mousePosition]);

    const getCardStyle = (cardIndex) => {
        const isPassed = passedCards.includes(cardIndex);
        const isCurrent = cardIndex === currentIndex;
        const isExiting = cardIndex === exitingIndex;
        const isOnRight = cardIndex % 2 === 0;
        const magneticTilt = getMagneticTilt(cardIndex);

        if (isExiting) {
            return {
                transform: `translateZ(300px) scale(1.2) rotateX(${magneticTilt.rotateX}deg) rotateY(${magneticTilt.rotateY}deg)`,
                opacity: 0,
                zIndex: 60,
                ...(isOnRight 
                    ? { right: '-5%', left: 'auto' }
                    : { left: '-5%', right: 'auto' }
                ),
                filter: 'none',
                pointerEvents: 'none',
            };
        }

        if (isPassed) {
            return {
                transform: 'translateZ(200px) scale(0.8)',
                opacity: 0,
                zIndex: 0,
                ...(isOnRight 
                    ? { right: '-50%', left: 'auto' }
                    : { left: '-50%', right: 'auto' }
                ),
                filter: 'blur(10px)',
                pointerEvents: 'none',
            };
        }

        if (isCurrent) {
            return {
                transform: `translateZ(0) scale(1) rotateX(${magneticTilt.rotateX}deg) rotateY(${magneticTilt.rotateY}deg)`,
                opacity: 1,
                zIndex: 50,
                ...(isOnRight 
                    ? { right: '8%', left: 'auto' }
                    : { left: '8%', right: 'auto' }
                ),
                filter: 'none',
                pointerEvents: 'auto',
            };
        }

        const depthLevel = cardIndex - currentIndex;

        if (depthLevel < 0) {
            return {
                transform: 'translateZ(-500px) scale(0.3)',
                opacity: 0,
                zIndex: 0,
                ...(isOnRight 
                    ? { right: '50%', left: 'auto' }
                    : { left: '50%', right: 'auto' }
                ),
                filter: 'blur(5px)',
                pointerEvents: 'none',
            };
        }

        const baseZ = -200 * depthLevel;
        const baseScale = 1 - depthLevel * 0.1;
        const baseOpacity = 0.8 - depthLevel * 0.12;

        return {
            transform: `translateZ(${baseZ}px) scale(${Math.max(baseScale, 0.5)}) rotateX(${magneticTilt.rotateX * 0.5}deg) rotateY(${magneticTilt.rotateY * 0.5}deg)`,
            opacity: Math.max(baseOpacity, 0.2),
            zIndex: 40 - depthLevel,
            ...(isOnRight 
                ? { right: '8%', left: 'auto' }
                : { left: '8%', right: 'auto' }
            ),
            filter: `blur(${depthLevel * 0.5}px)`,
            pointerEvents: depthLevel <= 3 ? 'auto' : 'none',
        };
    };

    const goToPrev = () => {
        if (isAnimating) return;
        if (passedCards.length === 0) return;

        setIsAnimating(true);

        const lastPassedCard = passedCards[passedCards.length - 1];
        setPassedCards(prev => prev.slice(0, -1));
        setCurrentIndex(lastPassedCard);

        setTimeout(() => {
            setIsAnimating(false);
        }, 1800);
    };

    const goToNext = () => {
        if (isAnimating) return;
        if (currentIndex >= totalCards - 1) return;

        const nextIndex = currentIndex + 1;
        travelToNext(nextIndex);
    };

    const travelToNext = (nextIndex) => {
        if (isAnimating) return;

        setIsAnimating(true);
        setExitingIndex(currentIndex);

        setPassedCards(prev => [...prev, currentIndex]);
        setCurrentIndex(nextIndex);

        setTimeout(() => {
            setExitingIndex(null);
            setIsAnimating(false);
        }, 1800);
    };

    const handleFrontCardClick = () => {
        navigate(cards[currentIndex].link);
    };

    const handleBackCardClick = (clickedIndex) => {
        if (isAnimating || clickedIndex <= currentIndex) return;
        if (passedCards.includes(clickedIndex)) return;
        travelToNext(clickedIndex);
    };

    const isLastCard = currentIndex === totalCards - 1;
    const isFirstCard = passedCards.length === 0;

    const parallax = getParallaxOffset();

    return (
        <div 
            ref={containerRef}
            className="h-screen text-white overflow-hidden relative" 
            style={{ perspective: '1400px' }}
            onMouseMove={handleMouseMove}
        >
            {/* Spline Background */}
            <div className="absolute inset-0">
                <Spline
                    scene="https://prod.spline.design/aBrOEZccG5o-XuUp/scene.splinecode"
                    className="w-full h-full"
                    onLoad={() => setSplineLoaded(true)}
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>



            {/* Header Section with Parallax */}
            <div 
                className={`absolute top-0 left-0 right-0 z-30 pt-8 flex flex-col items-center text-center transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
                }`}
                style={{
                    transform: isVisible 
                        ? `translate(${parallax.x * -0.5}px, ${parallax.y * -0.5}px)` 
                        : 'translateY(-32px)',
                }}
            >
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
                    <span className="text-white/60 text-xs uppercase tracking-[0.2em] font-medium">Beyond the Code</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">
                    EXPLORE <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/60">BEYOND</span>
                </h1>
                <p className="text-white/50 text-sm max-w-sm leading-relaxed">
                    Dive into the stories, sounds, and experiences that shape who I am.
                </p>
            </div>

            {/* Cards Container */}
            <div 
                className="absolute inset-0 flex items-end justify-center pb-32"
                style={{ transformStyle: 'preserve-3d' }}
            >
                {cards.map((card, index) => {
                    const isFront = index === currentIndex;
                    const style = getCardStyle(index);

                    return (
                        <div
                            key={index}
                            className="absolute cursor-pointer"
                            style={{
                                width: `${cardSize}px`,
                                height: `${cardSize}px`,
                                ...style,
                                transition: 'all 1.8s cubic-bezier(0.4, 0, 0.2, 1)',
                                transformStyle: 'preserve-3d',
                            }}
                            onClick={() => {
                                if (isFront && !isAnimating) {
                                    handleFrontCardClick();
                                } else if (!isFront && !isAnimating) {
                                    handleBackCardClick(index);
                                }
                            }}
                            onMouseEnter={() => setHoveredCard(index)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            {/* Card Reflection */}
                            <CardReflection card={card} isFront={isFront} cardSize={cardSize} />

                            <div 
                                className={`relative w-full h-full rounded-3xl overflow-hidden border transition-all duration-500 ${
                                    isFront 
                                        ? 'border-white/30 shadow-2xl hover:border-white/50' 
                                        : 'border-white/10 hover:border-white/30'
                                }`}
                                style={{
                                    boxShadow: isFront 
                                        ? '0 30px 60px -20px rgba(0, 0, 0, 0.6), 0 0 40px rgba(255,255,255,0.05)'
                                        : '0 15px 30px -10px rgba(0, 0, 0, 0.4)',
                                }}
                            >
                                <img
                                    src={card.image}
                                    alt={card.title}
                                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${
                                        isFront ? 'hover:scale-110' : ''
                                    }`}
                                />

                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                                {/* Shimmer effect on front card */}
                                {isFront && (
                                    <div 
                                        className="absolute inset-0 opacity-30 pointer-events-none"
                                        style={{
                                            background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%)',
                                            animation: 'shimmer 3s ease-in-out infinite',
                                        }}
                                    />
                                )}

                                {/* Dark overlay for back cards */}
                                {!isFront && (
                                    <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 hover:opacity-20" />
                                )}

                                {/* Card content */}
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <div className={`transition-all duration-300 ${isFront ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-70'}`}>
                                        <div className={`w-12 h-1 rounded-full mb-4 transition-all duration-300 ${
                                            isFront ? 'bg-white w-16' : 'bg-white/50'
                                        }`} />
                                        <h3 className={`font-black tracking-wide mb-2 transition-all duration-300 ${
                                            isFront ? 'text-2xl text-white' : 'text-xl text-white/80'
                                        }`}>
                                            {card.title}
                                        </h3>
                                        {isFront && (
                                            <p className="text-white/70 text-base">{card.subtitle}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Click hint for back cards */}
                                {!isFront && !isAnimating && (
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                        <div className="px-5 py-3 bg-white/20 backdrop-blur-sm rounded-full text-base font-medium">
                                            Click to view
                                        </div>
                                    </div>
                                )}

                                {/* Glow border for front card */}
                                {isFront && (
                                    <div className="absolute inset-0 rounded-3xl border-2 border-white/0 hover:border-white/40 transition-all duration-500" />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Navigation Buttons */}
            {!isFirstCard && (
                <div className="absolute inset-y-0 left-8 flex items-center z-50">
                    <button
                        onClick={goToPrev}
                        disabled={isAnimating}
                        className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed group"
                        style={{
                            boxShadow: '0 0 30px rgba(255,255,255,0.1)',
                        }}
                    >
                        <ChevronLeft className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
                    </button>
                </div>
            )}

            {!isLastCard && (
                <div className="absolute inset-y-0 right-8 flex items-center z-50">
                    <button
                        onClick={goToNext}
                        disabled={isAnimating}
                        className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed group"
                        style={{
                            boxShadow: '0 0 30px rgba(255,255,255,0.1)',
                        }}
                    >
                        <ChevronRight className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
                    </button>
                </div>
            )}

            {/* Bottom Quote with Parallax */}
            <div
                className={`absolute bottom-8 left-1/2 z-30 transition-all duration-1000 delay-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                    transform: `translateX(-50%) translate(${parallax.x}px, ${parallax.y}px)`,
                }}
            >
                <p className="text-white/60 text-sm italic text-center font-medium">
                    "Every story has a rhythm — this is mine."
                </p>
            </div>

            {/* CSS Animations */}
            <style>{`
                @keyframes floatParticle {
                    0%, 100% {
                        transform: translate(0, 0) rotate(0deg);
                        opacity: var(--opacity, 0.3);
                    }
                    25% {
                        transform: translate(10px, -20px) rotate(90deg);
                    }
                    50% {
                        transform: translate(-5px, -40px) rotate(180deg);
                        opacity: calc(var(--opacity, 0.3) * 1.5);
                    }
                    75% {
                        transform: translate(-15px, -20px) rotate(270deg);
                    }
                }

                @keyframes burstParticle {
                    0% {
                        transform: translate(-50%, -50%) rotate(var(--burst-angle)) translateX(0);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(-50%, -50%) rotate(var(--burst-angle)) translateX(var(--burst-distance));
                        opacity: 0;
                    }
                }

                @keyframes pulseGlow {
                    0%, 100% {
                        opacity: 0.6;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 1;
                        transform: scale(1.1);
                    }
                }

                @keyframes shimmer {
                    0% {
                        transform: translateX(-100%);
                    }
                    50%, 100% {
                        transform: translateX(100%);
                    }
                }

                @keyframes zoomOut {
                    0% {
                        transform: translateZ(0) scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: translateZ(400px) scale(1.5);
                        opacity: 0;
                    }
                }
            `}</style>

            <SplineMasking splineLoaded={splineLoaded} />

            {!splineLoaded && (
                <LoadingOverlay message="Preparing your beyond experience" />
            )}
        </div>
    );
};

export default BeyondMain;
