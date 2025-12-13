import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spline from '@splinetool/react-spline';

const ContactEntry = () => {
    const navigate = useNavigate();
    const [splineLoaded, setSplineLoaded] = useState(false);

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <main className="relative w-full h-screen overflow-hidden bg-black">
                <div className="absolute inset-0 z-0">
                    <Spline
                        scene="https://prod.spline.design/IwR5rpxcV-2dAiRa/scene.splinecode"
                        onLoad={() => setSplineLoaded(true)}
                    />
                </div>

                <div className="absolute inset-0 z-[5] flex items-center justify-center pointer-events-none">
                    <button
                        onClick={() => navigate('/contact/form')}
                        className="pointer-events-auto relative rounded-2xl w-48 h-20 min-w-48 min-h-20 flex-shrink-0 bg-transparent flex items-center justify-center outline-none focus:outline-none border-none focus:border-none ring-0 focus:ring-0"
                    >
                        <span className="relative text-white font-medium text-lg tracking-wide drop-shadow-lg"></span>
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
                            Entering the contact form experience
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactEntry;
