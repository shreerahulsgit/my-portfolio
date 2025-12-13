import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spline from '@splinetool/react-spline';

const BeyondEntry = () => {
    const navigate = useNavigate();
    const [splineLoaded, setSplineLoaded] = useState(false);

    return (
        <div className="bg-black text-white min-h-screen">
            <main className="relative w-full h-screen overflow-hidden bg-black">
                <div className="absolute inset-0 z-0">
                    <Spline
                        scene="https://prod.spline.design/r8nWpxQAvsU04S0A/scene.splinecode"
                        onLoad={() => {
                            setSplineLoaded(true);
                        }}
                    />
                </div>

                <div className="absolute top-12 left-0 right-0 z-10 flex justify-center">
                    <h1 className="text-white text-4xl md:text-5xl font-bold tracking-wider drop-shadow-2xl">
                        WELCOME TO BEYOND THE PORTFOLIO
                    </h1>
                </div>

                <div
                    className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                    style={{
                        marginLeft: '-120px',
                        marginTop: '47px',
                    }}
                >
                    <button
                        onClick={() => navigate('/beyond/overview')}
                        className="group relative rounded-2xl px-10 py-4 bg-transparent border-none outline-none focus:outline-none focus:ring-0 hover:scale-105 active:scale-95 transition-all duration-300 ease-out"
                    >
                        <span className="relative text-white font-semibold text-lg tracking-widest drop-shadow-lg"></span>
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
                            Entering the beyond portfolio experience
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BeyondEntry;
