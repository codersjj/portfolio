import { useState } from "react";
import useSound from "use-sound";
import { useMuteStore } from "@/providers/mute-store-provider";

const enableSoundUrl = "/sounds/enable-sound.mp3";
const disableSoundUrl = "/sounds/disable-sound.mp3";

export default function VolumeToggleIcon({ className = '' }: { className?: string }) {
  const [playEnableSound] = useSound(enableSoundUrl);
  const [playDisableSound] = useSound(disableSoundUrl);
  const { isMuted, setMuted } = useMuteStore((state) => state);

  const toggleMute = () => {
    if (isMuted) {
      playEnableSound();
    } else {
      playDisableSound();
    }

    setMuted(!isMuted);
  };

  return (
    <button
      onClick={toggleMute}
      className={`cursor-pointer group ${className}`}
    >
      {/* 音量图标容器 */}
      <div className={`relative w-6 h-6 flex items-center justify-center transition-all duration-300 ${
        isMuted ? 'group-hover:animate-[wiggle_0.4s_ease-in-out]' : ''
      }`}>
        {/* 扬声器基础形状 */}
        <svg
          className="w-6 h-6 transition-all duration-300"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 扬声器主体 - 镂空设计 */}
          <path
            d="M11 5L6 9H2V15H6L11 19V5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
            fill="none"
            className={`transition-all duration-500 ease-in-out ${
              isMuted ? 'transform translate-x-2' : ''
            }`}
          />

          {/* 音量波纹 - 第一层 */}
          <path
            d="M15.5 7.5C16.5 8.5 17 9.7 17 11C17 12.3 16.5 13.5 15.5 14.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className={`transition-all duration-300 ${
              isMuted
                ? "opacity-0 scale-75"
                : "opacity-100 scale-100 group-hover:animate-[wave_.5s_ease-in-out_1]"
            }`}
          />

          {/* 音量波纹 - 第二层 */}
          <path
            d="M18 4.5C19.5 6 20.5 8.2 20.5 11C20.5 13.8 19.5 16 18 17.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className={`transition-all duration-500 delay-75 ${
              isMuted
                ? "opacity-0 scale-75"
                : "opacity-70 scale-100 group-hover:animate-[wave_.5s_ease-in-out_1_0.2s]"
            }`}
          />
        </svg>

        {/* 点击波纹效果 */}
        <div className="absolute inset-0 rounded-full scale-0 group-active:scale-150 transition-transform duration-200"></div>
      </div>

      <style jsx>{`
        @keyframes wave {
          0%, 100% {
            opacity: 0.7;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.05);
          }
        }

        @keyframes wiggle {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-5deg);
            transform-origin: center;
          }
          75% {
            transform: rotate(5deg);
            transform-origin: center;
          }
        }
      `}</style>
    </button>
  );
}