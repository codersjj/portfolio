'use client'

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import useSound from 'use-sound';
import { useMuteStore } from "@/providers/mute-store-provider";

const switchOnSoundUrl = '/sounds/switch-on.mp3'
const switchOffSoundUrl = '/sounds/switch-off.mp3'

export default function ModeToggleButton({ className = '' }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const { isMuted } = useMuteStore(state => state);

  const [playSwitchOn] = useSound(switchOnSoundUrl, {
    soundEnabled: !isMuted
  });
  const [playSwitchOff] = useSound(switchOffSoundUrl, {
    soundEnabled: !isMuted
  });

  const [isDark, setIsDark] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [canHover, setCanHover] = useState(false);

  // 检测设备是否支持 hover
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      setCanHover(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
    }
  }, []);

  // 初始化主题
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setIsDark(shouldBeDark);

    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isTransitioning) return; // 防止重复点击

    setIsTransitioning(true);

    if (isDark) {
      playSwitchOn();
    } else {
      playSwitchOff();
    }

    // 立即切换主题状态和DOM
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }

    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // 监听动画完成事件，使用更可靠的回调
  useEffect(() => {
    if (!isTransitioning) return;

    // 计算最长的动画时间：最后一个光线(560ms延迟) + 动画持续时间(600ms) = 1160ms
    // 加上一些缓冲时间
    const totalAnimationTime = 300;

    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, totalAnimationTime);

    return () => clearTimeout(timer);
  }, [isTransitioning]);

  return (
    <button
      onClick={toggleTheme}
      {...(canHover ? {
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false)
      } : {})}
      disabled={isTransitioning}
      className={`cursor-pointer ${
        isDark
          ? 'text-gray-300 hover:text-yellow-200'
          : 'text-black hover:text-yellow-500'
      } ${className}`}
    >
      <svg
        width="1.25rem"
        height="1.25rem"
        viewBox="0 0 24 24"
        className="transition-colors duration-300"
        style={{
          transform: 'rotate(40deg)',
          position: 'relative',
          overflow: 'visible',
          strokeWidth: '2px'
        }}
      >
        <defs>
          <style>
            {`
              @keyframes sunRayBounce {
                0%, 100% { transform: scale(1) rotate(0deg); }
                25% { transform: scale(1.1) rotate(-2deg); }
                50% { transform: scale(1.05) rotate(1deg); }
                75% { transform: scale(1.15) rotate(-1deg); }
              }

              @keyframes moonWiggle {
                0%, 100% { transform: translateX(0) rotate(0deg); }
                25% { transform: translateX(-0.8px) rotate(-1deg); }
                50% { transform: translateX(0.8px) rotate(0deg); }
                75% { transform: translateX(-0.5px) rotate(1deg); }
              }

              @keyframes sunRayEnter {
                0% {
                  transform: scale(0) rotate(-180deg);
                  opacity: 0;
                }
                50% {
                  transform: scale(1.3) rotate(-90deg);
                  opacity: 0.8;
                }
                100% {
                  transform: scale(1) rotate(0deg);
                  opacity: 1;
                }
              }

              // @keyframes moonFadeOut {
              //   0% {
              //     opacity: 1;
              //     transform: scale(1) rotate(0deg);
              //   }
              //   100% {
              //     opacity: 0;
              //     transform: scale(0.3) rotate(180deg);
              //   }
              // }

              @keyframes sunCoreEnter {
                0% {
                  transform: scale(0);
                  opacity: 0;
                }
                100% {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            `}
          </style>
        </defs>

        {/* 太阳的遮罩定义 */}
        <mask id="sun-dot-mask">
          <rect x="-10" y="-10" width="44" height="44" fill="#FFF"></rect>
          <circle r="6" cx="12" cy="12" fill="#000"></circle>
        </mask>

        {/* 月亮的遮罩定义 */}
        <mask id="moon-cutout-mask">
          <rect x="0" y="0" width="24" height="24" fill="#FFF"></rect>
          <circle cx="12" cy="4" r="8" fill="#000"></circle>
        </mask>
        <mask id="moon-crescent-mask">
          <rect x="0" y="0" width="24" height="24" fill="#000"></rect>
          <circle r="10.5" cx="12" cy="12" fill="#FFF"></circle>
        </mask>

        {/* 太阳光线 - Light Mode */}
        {!isDark && (
          <g mask="url(#sun-dot-mask)">
            {[
              { cx: 22, cy: 12, delay: 0 },      // 右
              { cx: 19.0711, cy: 19.0711, delay: 80 }, // 右下
              { cx: 12, cy: 22, delay: 160 },    // 下
              { cx: 4.9289, cy: 19.0711, delay: 240 }, // 左下
              { cx: 2, cy: 12, delay: 320 },     // 左
              { cx: 4.9289, cy: 4.9289, delay: 400 }, // 左上
              { cx: 12, cy: 2, delay: 480 },     // 上
              { cx: 19.0711, cy: 4.9289, delay: 560 } // 右上
            ].map((ray, index) => (
              <circle
                key={index}
                cx={ray.cx}
                cy={ray.cy}
                r="1.5"
                fill="currentColor"
                style={{
                  transformOrigin: '12px 12px',
                  opacity: isTransitioning ? 0 : 1,
                  transform: isTransitioning ? 'scale(0)' : 'scale(1)',
                  animationName: isTransitioning
                    ? 'sunRayEnter'
                    : isHovered
                      ? 'sunRayBounce'
                      : 'none',
                  animationDuration: isTransitioning ? '0.6s' : isHovered ? '0.8s' : '0s',
                  animationTimingFunction: isTransitioning ? 'ease-out' : isHovered ? 'cubic-bezier(0.4, 0, 0.6, 1)' : 'linear',
                  animationIterationCount: isTransitioning ? '1' : isHovered ? 'infinite' : '1',
                  animationDirection: isTransitioning ? 'normal' : isHovered ? 'alternate' : 'normal',
                  animationFillMode: isTransitioning ? 'forwards' : isHovered ? 'both' : 'none',
                  animationDelay: isTransitioning
                    ? `${ray.delay}ms`
                    : isHovered
                      ? `${index * 100}ms`
                      : '0ms'
                }}
              />
            ))}
          </g>
        )}

        {/* 太阳核心 - Light Mode */}
        {!isDark && (
          <circle
            cx="12"
            cy="12"
            r="5"
            fill="currentColor"
            style={{
              transformOrigin: 'center',
              opacity: isTransitioning ? 0 : 1,
              transform: isTransitioning ? 'scale(0)' : 'scale(1)',
              animationName: isTransitioning ? 'sunCoreEnter' : 'none',
              animationDuration: isTransitioning ? '0.4s' : '0s',
              animationTimingFunction: isTransitioning ? 'ease-out' : 'linear',
              animationIterationCount: '1',
              animationDirection: 'normal',
              animationFillMode: isTransitioning ? 'forwards' : 'none',
              animationDelay: isTransitioning ? '200ms' : '0ms'
            }}
          />
        )}

        {/* 月亮 - Dark Mode */}
        {isDark && (
          <>
            <g mask="url(#moon-cutout-mask)">
              <circle
                cx="12"
                cy="12"
                stroke="currentColor"
                fill="none"
                r="9.5"
                style={{
                  transformOrigin: '12px 12px',
                  opacity: isTransitioning ? 1 : 1,
                  animationName: isTransitioning
                    ? 'moonFadeOut'
                    : isHovered
                      ? 'none'
                      : 'none',
                  animationDuration: isTransitioning ? '0.3s' : isHovered ? '1.2s' : '0s',
                  animationTimingFunction: isTransitioning ? 'ease-in' : isHovered ? 'ease-in-out' : 'linear',
                  animationIterationCount: isTransitioning ? '1' : isHovered ? 'infinite' : '1',
                  animationDirection: 'normal',
                  animationFillMode: isTransitioning ? 'forwards' : 'none',
                  animationDelay: '0ms'
                }}
              />
            </g>

            <g mask="url(#moon-crescent-mask)">
              <circle
                cx="12"
                cy="4"
                r="8"
                stroke="currentColor"
                fill="none"
                style={{
                  transformOrigin: '12px 12px',
                  opacity: isTransitioning ? 1 : 1,
                  animationName: isTransitioning
                    ? 'moonFadeOut'
                    : isHovered
                      ? 'moonWiggle'
                      : 'none',
                  animationDuration: isTransitioning ? '0.3s' : isHovered ? '1.2s' : '0s',
                  animationTimingFunction: isTransitioning ? 'ease-in' : isHovered ? 'ease-in-out' : 'linear',
                  animationIterationCount: isTransitioning ? '1' : isHovered ? 'infinite' : '1',
                  animationDirection: 'normal',
                  animationFillMode: isTransitioning ? 'forwards' : 'none',
                  animationDelay: isHovered ? '0.2s' : '0s'
                }}
              />
            </g>
          </>
        )}
      </svg>
    </button>
  );
}