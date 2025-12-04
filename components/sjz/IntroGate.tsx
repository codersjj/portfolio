import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, ArrowRight, Lock } from 'lucide-react';
import { APP_CONSTANTS } from './constants';

interface IntroGateProps {
    onUnlock: () => void;
}

const IntroGate: React.FC<IntroGateProps> = ({ onUnlock }) => {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isUnlocking, setIsUnlocking] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const particlesRef = useRef<HTMLDivElement>(null);

    // Auto focus
    useEffect(() => {
        const timer = setTimeout(() => {
            inputRef.current?.focus();
        }, 1200);
        return () => clearTimeout(timer);
    }, []);

    // Particles Effect
    useEffect(() => {
        if (!particlesRef.current) return;

        const createParticle = () => {
            if (!particlesRef.current) return;
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
            particle.style.animationDelay = Math.random() * 2 + 's';
            particlesRef.current.appendChild(particle);

            setTimeout(() => {
                if (particle.parentNode === particlesRef.current) {
                    particlesRef.current?.removeChild(particle);
                }
            }, 5000);
        };

        const interval = setInterval(createParticle, 300);
        return () => clearInterval(interval);
    }, []);

    const handleSubmit = () => {
        const trimmedName = name.trim();

        if (trimmedName === APP_CONSTANTS.TARGET_NAME) {
            setIsUnlocking(true);

            // Success animation sequence
            setTimeout(() => {
                onUnlock();
            }, 1500);
        } else if (trimmedName) {
            // Error animation
            setError(true);
            setTimeout(() => setError(false), 600);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSubmit();
    };

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 overflow-hidden">
            {/* Background Layer */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Main Halo */}
                {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-purple-500/10 via-blue-500/5 to-transparent rounded-full animate-pulse-slow"></div> */}

                {/* Secondary Halos */}
                {/* <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-gradient-radial from-amber-500/10 to-transparent rounded-full animate-float"></div>
                <div className="absolute bottom-1/3 right-1/3 w-[300px] h-[300px] bg-gradient-radial from-pink-500/10 to-transparent rounded-full animate-float-delayed"></div> */}

                {/* Particles Container */}
                {/* <div ref={particlesRef} className="absolute inset-0"></div> */}
            </div>

            {/* Main Content */}
            <div className={`relative z-10 transition-all duration-700 ${isUnlocking ? 'scale-110 opacity-0' : 'scale-100 opacity-100'}`}>
                {/* Lock Icon */}
                <div className={`flex justify-center mb-8 transition-all duration-500 ${isFocused ? 'scale-110 rotate-12' : 'scale-100 rotate-0'}`}>
                    <div className="relative">
                        <Lock className={`w-12 h-12 transition-all duration-500 ${isFocused ? 'text-amber-400' : 'text-slate-400'}`} />
                        {isFocused && (
                            <div className="absolute inset-0 animate-ping">
                                <Lock className="w-12 h-12 text-amber-400 opacity-30" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Title */}
                <h1 className={`text-4xl md:text-6xl font-serif mb-4 tracking-widest text-center transition-all duration-700 animate-fade-in ${isFocused ? 'text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200' : 'text-amber-100/80'
                    }`}>
                    你是？
                </h1>

                {/* Subtitle */}
                <p className="text-slate-400 text-center mb-12 tracking-[0.3em] text-sm animate-fade-in-delayed opacity-0">
                    轻轻说出你的名字
                </p>

                {/* Input Container */}
                <div className={`relative w-full max-w-md px-4 transition-all duration-300 ${error ? 'animate-shake' : ''}`}>
                    {/* Input Background Glow */}
                    <div className={`absolute inset-0 rounded-2xl transition-all duration-500 ${isFocused ? 'bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-amber-500/20 blur-xl scale-105' : 'bg-transparent'
                        }`}></div>

                    {/* Input Field Wrapper */}
                    <div className="relative">
                        <input
                            ref={inputRef}
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            placeholder="在此输入"
                            className={`w-full bg-slate-800/40 backdrop-blur-xl border-2 rounded-2xl outline-none px-6 py-4 text-center text-xl md:text-2xl tracking-[0.2em] transition-all duration-300 placeholder-slate-500/50 font-serif ${error
                                ? 'border-red-400/60 text-red-200 shadow-[0_0_30px_rgba(248,113,113,0.3)]'
                                : isFocused
                                    ? 'border-amber-400/60 text-amber-100 shadow-[0_0_30px_rgba(251,191,36,0.2)]'
                                    : 'border-slate-700/30 text-slate-300 shadow-[0_0_20px_rgba(0,0,0,0.3)]'
                                }`}
                        />

                        {/* Submit Button */}
                        <button
                            onClick={handleSubmit}
                            disabled={!name.trim() || isUnlocking}
                            className={`absolute right-3 top-1/2 -translate-y-1/2 rounded-xl p-2.5 transition-all duration-300 ${name.trim() && !isUnlocking
                                ? 'text-amber-400 hover:text-amber-300 hover:bg-amber-400/10 hover:scale-110 cursor-pointer'
                                : 'text-slate-600 cursor-not-allowed'
                                }`}
                        >
                            <ArrowRight className={`w-6 h-6 transition-transform duration-300 ${name.trim() ? 'translate-x-0' : '-translate-x-1'}`} />
                        </button>

                        {/* Input Decoration Line */}
                        <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent transition-all duration-500 ${isFocused ? 'w-full opacity-100' : 'w-0 opacity-0'
                            }`}></div>
                    </div>

                    {/* Error Message */}
                    <div className={`absolute -bottom-12 left-0 right-0 text-center transition-all duration-300 ${error ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                        }`}>
                        <p className="text-red-400/90 text-sm tracking-wider flex items-center justify-center gap-2">
                            <Sparkles className="w-4 h-4 animate-spin" />
                            <span>名字不对哦，再想想？</span>
                            <Sparkles className="w-4 h-4 animate-spin" />
                        </p>
                    </div>
                </div>

                {/* Footer Hint */}
                <div className={`mt-16 text-center transition-all duration-300 ${isFocused ? 'opacity-0' : 'opacity-100'}`}>
                    <p className="text-slate-500/50 text-xs tracking-[0.4em] uppercase animate-pulse-subtle">
                        Only You Know
                    </p>
                </div>
            </div>

            {/* Unlock Overlay */}
            {isUnlocking && (
                <div className="absolute inset-0 z-20 flex items-center justify-center animate-unlock-overlay">
                    <div className="absolute inset-0 bg-gradient-radial from-amber-400/30 via-purple-500/20 to-transparent animate-expand"></div>
                    <Sparkles className="w-20 h-20 text-amber-400 animate-spin-slow" />
                </div>
            )}

            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes fade-in-delayed {
                    0%, 30% { opacity: 0; transform: translateY(20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }

                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-10px) rotate(-1deg); }
                    75% { transform: translateX(10px) rotate(1deg); }
                }

                @keyframes float {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(20px, -20px); }
                }

                @keyframes float-delayed {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(-20px, 20px); }
                }

                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
                    50% { opacity: 0.5; transform: translate(-50%, -50%) scale(1.05); }
                }

                @keyframes pulse-subtle {
                    0%, 100% { opacity: 0.5; }
                    50% { opacity: 0.3; }
                }

                @keyframes expand {
                    from { transform: scale(0); opacity: 1; }
                    to { transform: scale(3); opacity: 0; }
                }

                @keyframes unlock-overlay {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                .animate-fade-in {
                    animation: fade-in 0.8s ease-out forwards;
                }

                .animate-fade-in-delayed {
                    animation: fade-in-delayed 1.2s ease-out forwards;
                }

                .animate-shake {
                    animation: shake 0.4s ease-in-out;
                }

                .animate-float {
                    animation: float 8s ease-in-out infinite;
                }

                .animate-float-delayed {
                    animation: float-delayed 10s ease-in-out infinite;
                }

                .animate-pulse-slow {
                    animation: pulse-slow 4s ease-in-out infinite;
                }

                .animate-pulse-subtle {
                    animation: pulse-subtle 3s ease-in-out infinite;
                }

                .animate-expand {
                    animation: expand 1.5s ease-out forwards;
                }

                .animate-unlock-overlay {
                    animation: unlock-overlay 0.5s ease-out forwards;
                }

                .animate-spin-slow {
                    animation: spin-slow 2s linear infinite;
                }

                .bg-gradient-radial {
                    background: radial-gradient(circle, var(--tw-gradient-stops));
                }

                .particle {
                    position: absolute;
                    width: 2px;
                    height: 2px;
                    background: rgba(251, 191, 36, 0.6);
                    border-radius: 50%;
                    pointer-events: none;
                    animation: particle-rise linear forwards;
                }

                @keyframes particle-rise {
                    0% {
                        bottom: 0;
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        bottom: 100%;
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    );
};

export default IntroGate;
