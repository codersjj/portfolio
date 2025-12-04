import React, { useEffect } from 'react';
import { VideoConfig } from './types';

interface VideoModalProps {
    video: VideoConfig | null;
    onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
    useEffect(() => {
        // Lock body scroll when modal is open
        if (video) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [video]);

    if (!video) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 animate-in fade-in duration-500">
            <div className="relative w-full max-w-6xl aspect-video bg-black rounded-lg shadow-2xl overflow-hidden border border-white/10">

                {/* Close Button - Silky Animation */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 z-30 group flex items-center gap-2 outline-none"
                    aria-label="Close"
                >
                    <span className="text-white/0 group-hover:text-white/70 text-sm tracking-widest uppercase transition-all duration-500 transform translate-x-4 group-hover:translate-x-0 overflow-hidden font-serif">
                        Close
                    </span>
                    <div className="relative w-10 h-10 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm flex items-center justify-center group-hover:bg-amber-400 group-hover:border-amber-400 transition-all duration-500 ease-out shadow-lg">
                        <svg
                            className="w-5 h-5 text-white/80 group-hover:text-slate-900 transform group-hover:rotate-180 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </button>

                <video
                    src={video.url}
                    controls
                    autoPlay
                    playsInline
                    preload="auto"
                    className="w-full h-full object-contain"
                    controlsList="nodownload"
                    crossOrigin="anonymous"
                    poster={video.thumbnail}
                    // Mobile optimization attributes
                    x5-video-player-type="h5"
                    webkit-playsinline="true"
                >
                    Your browser does not support the video tag.
                </video>

                {/* Title Badge */}
                {/* <div className="absolute top-6 left-6 z-10 pointer-events-none">
          <h3 className="text-amber-100/90 font-serif tracking-[0.2em] text-lg bg-black/60 px-4 py-2 rounded-full border border-white/5 backdrop-blur-md">
            {video.title}
          </h3>
        </div> */}
            </div>
        </div>
    );
};

export default VideoModal;
