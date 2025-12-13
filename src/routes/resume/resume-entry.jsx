import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spline from '@splinetool/react-spline';

const ResumeEntry = () => {
    const navigate = useNavigate();
    const [splineLoaded, setSplineLoaded] = useState(false);

    return (
        <div className="bg-black text-white min-h-screen">
            <main className="relative w-full h-screen overflow-hidden bg-black">
                <div className="absolute inset-0 z-0">
                    <Spline
                        scene="https://prod.spline.design/CR14wstmPsHYmPZv/scene.splinecode"
                        onLoad={() => setSplineLoaded(true)}
                    />
                </div>

                <div className="absolute inset-0 z-[5] flex items-center justify-center pointer-events-none pt-80">
                    <button
                        onClick={() => navigate('/resume/details')}
                        className="pointer-events-auto group relative overflow-hidden rounded-full px-6 py-3 backdrop-blur-2xl bg-white/5 border border-white/10 shadow-lg hover:bg-white/10 hover:border-white/20 transition-all duration-300 ease-out hover:scale-105 active:scale-95"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>

                        <span className="relative text-white font-medium text-sm tracking-wide drop-shadow">
                            SEE RESUME
                        </span>

                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
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
                            Loading Interactive Experience...
                        </p>
                        <p className="text-sm" style={{ color: '#7B7B7B' }}>
                            Preparing the resume experience
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResumeEntry;
