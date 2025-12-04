"use client";

import React, { useState } from 'react';
import { gsap } from 'gsap';
import IntroGate from '@/components/sjz/IntroGate';
import Background from '@/components/sjz/Background';
import MainJourney from '@/components/sjz/MainJourney';
import MusicPlayer from '@/components/sjz/MusicPlayer';
import './styles.css';

const Page: React.FC = () => {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [startJourney, setStartJourney] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    const handleUnlock = () => {
        // Create a transition effect from Gate to Main
        setIsUnlocked(true);

        // Wait for gate fade out logic (which is handled partly in IntroGate, 
        // but we trigger the main content readiness here)
        gsap.delayedCall(0.5, () => {
            setStartJourney(true);
        });
    };

    return (
        <div className="sjz-container relative min-h-screen w-full bg-slate-900 text-slate-100 overflow-x-hidden selection:bg-amber-500/30">
            <Background />

            {!isUnlocked && (
                <IntroGate onUnlock={handleUnlock} />
            )}

            {/* Play music only if unlocked AND video is NOT playing */}
            <MusicPlayer shouldPlay={isUnlocked && !isVideoPlaying} />

            <div className={`transition-opacity duration-1000 ${startJourney ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <MainJourney
                    startAnimation={startJourney}
                    onVideoStateChange={setIsVideoPlaying}
                />
            </div>

            {/* Footer / Copyright */}
            {startJourney && (
                <footer className="w-full text-center py-6 text-slate-600 text-xs font-serif tracking-widest relative z-10">
                    DESIGNED FOR ZHANG JINSHUANG
                </footer>
            )}
        </div>
    );
};

export default Page;
