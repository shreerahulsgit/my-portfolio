import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spline from '@splinetool/react-spline';

const SkillsEntry = () => {
    const navigate = useNavigate();
    const [splineLoaded, setSplineLoaded] = useState(false);

    return (
        <div className="bg-black text-white min-h-screen">
            <main className="relative w-full h-screen overflow-hidden bg-black">
                <div className="absolute inset-0 z-10">
                    <Spline
                        scene="https://prod.spline.design/bFKbEXmvDBJsP-cB/scene.splinecode"
                        onLoad={() => {
                            setSplineLoaded(true);
                        }}
                        onError={() => {
                            setSplineLoaded(true);
                        }}
                        style={{
                            width: '100%',
                            height: '100%',
                            pointerEvents: 'auto',
                            touchAction: 'manipulation',
                            userSelect: 'none',
                        }}
                    />
                </div>

                <div
                    className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
                    style={{
                        marginLeft: '-10px',
                        marginTop: '220px',
                    }}
                >
                    <button
                        onClick={() => navigate('/skills/details')}
                        className="group relative overflow-hidden rounded-3xl px-6 py-2.5 backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl hover:bg-white/15 hover:border-white/30 transition-all duration-300 ease-out hover:scale-105 active:scale-95 pointer-events-auto"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <span className="relative text-white font-semibold text-sm tracking-widest drop-shadow-lg">
                            ENTER
                        </span>
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    </button>
                </div>
            </main>

            {!splineLoaded && (
                <div
                    className="fixed inset-0 backdrop-blur-md z-[100] flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(34, 34, 34, 0.5)' }}
                >
                    <div
                        className="flex flex-col items-center p-8 rounded-3xl backdrop-blur-xl"
                        style={{
                            backgroundColor: 'rgba(248, 248, 248, 0.1)',
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            borderColor: 'rgba(248, 248, 248, 0.2)',
                        }}
                    >
                        <div
                            className="w-16 h-16 border-2 rounded-full animate-spin mb-6"
                            style={{
                                borderColor: 'rgba(248, 248, 248, 0.2)',
                                borderTopColor: 'rgba(248, 248, 248, 0.8)',
                            }}
                        ></div>
                        <p
                            className="text-lg font-medium mb-2"
                            style={{ color: '#F8F8F8' }}
                        >
                            Loading Skills Experience...
                        </p>
                        <p className="text-sm" style={{ color: '#7B7B7B' }}>
                            Entering the skills experience
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SkillsEntry;
