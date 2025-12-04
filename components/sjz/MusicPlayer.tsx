import React, { useState, useEffect, useRef } from 'react';
import { Music, VolumeX } from 'lucide-react';
import { APP_CONSTANTS } from './constants';

interface MusicPlayerProps {
    shouldPlay: boolean;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ shouldPlay }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio(APP_CONSTANTS.BGM_URL);
            audioRef.current.loop = true;
            audioRef.current.volume = 0.4;
        }

        if (shouldPlay) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    setIsPlaying(true);
                }).catch(error => {
                    console.log("Auto-play prevented:", error);
                    setIsPlaying(false);
                });
            }
        } else {
            // Pause if shouldPlay becomes false (e.g. video is open)
            if (audioRef.current) {
                audioRef.current.pause();
                setIsPlaying(false);
            }
        }
    }, [shouldPlay]);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    // Even if paused by video, we might want to keep the button visible but showing mute state
    // But per requirements, we just follow the prop control. 
    // If !shouldPlay (gate locked), we return null. 
    // If !shouldPlay (video open), we probably still want to hide it or just show muted.
    // Given the component returns null if !shouldPlay, the button will disappear during video.
    // This is cleaner for the UI focus on video.
    if (!audioRef.current && !shouldPlay) return null; // Initial state check
    // If the gate is locked, strictly return null.
    // If gate unlocked but video playing (shouldPlay=false), we can decide to hide or show.
    // For now, let's keep the existing logic: if !shouldPlay, return null.
    if (!shouldPlay && !audioRef.current?.src) return null;

    // Modified return condition to allow button to exist but be 'off' if we wanted, 
    // but to be safe and consistent with previous code:
    if (!shouldPlay && !isPlaying) return null;

    return (
        <button
            onClick={togglePlay}
            className="fixed top-6 right-6 z-50 p-3 rounded-full bg-slate-800/50 backdrop-blur-md border border-amber-400/20 text-amber-200 hover:bg-slate-700/50 hover:scale-110 transition-all duration-300 group"
        >
            <div className="relative">
                {isPlaying ? (
                    <>
                        <Music className="w-6 h-6 animate-pulse" />
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                        </span>
                    </>
                ) : (
                    <VolumeX className="w-6 h-6 opacity-60" />
                )}
            </div>
        </button>
    );
};

export default MusicPlayer;
