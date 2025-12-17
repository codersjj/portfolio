import React, { useRef, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Gift, Play, Star } from "lucide-react";
import { APP_CONSTANTS, BLESSING_CARDS } from "./constants";
import VideoModal from "./VideoModal";
import { VideoConfig } from "./types";
import MemoriesCardsSection from "./MemoriesCardsSection";

gsap.registerPlugin(ScrollTrigger);

interface MainJourneyProps {
  startAnimation: boolean;
  onVideoStateChange: (isPlaying: boolean) => void;
}

const MainJourney: React.FC<MainJourneyProps> = ({
  startAnimation,
  onVideoStateChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // Changed state to hold the full video config object or null
  const [currentVideo, setCurrentVideo] = useState<VideoConfig | null>(null);
  const [giftOpened, setGiftOpened] = useState(false);

  // Refs for animation targeting
  const scene1Ref = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scene2Ref = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const wishSectionRef = useRef<HTMLDivElement>(null);
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const scene4Ref = useRef<HTMLDivElement>(null);
  const giftRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!startAnimation) return;

    const ctx = gsap.context(() => {
      // Scene 1: Welcome - Parallax Text
      gsap.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: scene1Ref.current,
            start: "top center",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      // Scene 3: Wishes Gathering - Fly In
      const words = gsap.utils.toArray(".wish-word");
      gsap.from(words, {
        opacity: 0,
        scale: 0.5,
        y: 100,
        x: (index: number) => (index % 2 === 0 ? -100 : 100),
        rotation: (index: number) => Math.random() * 20 - 10,
        stagger: 0.1,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: wishSectionRef.current,
          start: "top 70%", // 顶部到达屏幕 60% 处开始 (更晚开始，元素更靠上)
          end: "bottom 70%", // 底部到达屏幕 1/4 处结束
          scrub: 1,
        },
      });

      gsap.from(".video-card", {
        scale: 0.8,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: videoSectionRef.current,
          start: "top 70%", // 顶部到达屏幕 60% 处开始
          end: "bottom 20%", // 底部到达屏幕 1/4 处结束
          scrub: 1,
        },
      });

      // Scene 4: Gift - Floating
      if (giftRef.current && !giftOpened) {
        gsap.to(giftRef.current, {
          y: -20,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [startAnimation, giftOpened]);

  const handleOpenGift = () => {
    setGiftOpened(true);
    // Simple manual GSAP for click interaction
    gsap.to(".gift-lid", {
      rotation: -45,
      y: -50,
      x: 20,
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
    });
    gsap.to(".gift-light", {
      opacity: 1,
      scale: 30,
      duration: 1.5,
      ease: "power2.out",
    });
    gsap.fromTo(
      ".final-message",
      { opacity: 0, scale: 0.5, y: 50 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        delay: 0.5,
        ease: "back.out(1.2)",
      }
    );
  };

  const playVideo = (type: "wishes" | "journey") => {
    if (type === "wishes") {
      setCurrentVideo({
        id: "wishes",
        title: "老师与同学的祝福",
        url: APP_CONSTANTS.VIDEOS.WISHES,
        thumbnail: APP_CONSTANTS.VIDEOS.WISHES_THUMB,
      });
    } else {
      setCurrentVideo({
        id: "journey",
        title: "学习之旅记录",
        url: APP_CONSTANTS.VIDEOS.JOURNEY,
        thumbnail: APP_CONSTANTS.VIDEOS.JOURNEY_THUMB,
      });
    }
    // Notify App to pause music
    onVideoStateChange(true);
  };

  const handleCloseVideo = () => {
    setCurrentVideo(null);
    // Notify App to resume music
    onVideoStateChange(false);

    // 修复：移动端全屏播放视频返回后，GSAP 动画失效的问题
    // 需要刷新 ScrollTrigger 以重新计算位置，延迟执行确保 DOM 和滚动位置已恢复
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
  };

  if (!startAnimation) return null;

  return (
    <div ref={containerRef} className="relative z-10 w-full overflow-hidden">
      {/* SCENE 1: WELCOME */}
      <section
        ref={scene1Ref}
        className="min-h-screen flex flex-col justify-center items-center relative px-6"
      >
        <h1 ref={titleRef} className="text-center">
          <span className="block text-xl md:text-2xl text-amber-200/80 mb-4 font-light tracking-[0.2em] uppercase">
            Happy Birthday
          </span>
          <span className="block text-5xl md:text-7xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-200 to-amber-500 pb-2">
            {APP_CONSTANTS.TARGET_NAME}
          </span>
          <span className="block mt-8 w-24 h-1 bg-amber-400/50 mx-auto rounded-full"></span>
        </h1>
        <div className="absolute bottom-10 animate-bounce text-slate-500">
          <span className="text-xs tracking-widest uppercase">Scroll Down</span>
        </div>
      </section>

      {/* SCENE 2: MEMORIES & CARDS */}
      <section
        ref={scene2Ref}
        className="min-h-screen flex flex-col justify-center items-center py-20 px-4 bg-gradient-to-b from-transparent to-slate-900/50"
      >
        <MemoriesCardsSection cardsRef={cardsRef} />
      </section>

      {/* SCENE 3: WISHES & VIDEOS */}
      <section className="min-h-screen flex flex-col justify-center items-center py-10 px-4 relative">
        {/* Rotating background elements */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none overflow-hidden">
          <div className="w-[800px] h-[800px] rounded-full border border-amber-400/30 animate-[spin_60s_linear_infinite]"></div>
          <div className="absolute w-[500px] h-[500px] rounded-full border border-amber-400/20 animate-[spin_40s_linear_infinite_reverse]"></div>
        </div>

        <div ref={wishSectionRef} className="relative z-10 text-center pb-36">
          <h2 className="text-3xl md:text-5xl font-serif text-slate-200 mb-8">
            <span className="wish-word inline-block mx-2">愿你</span>
            <span className="wish-word inline-block mx-2 text-amber-400">
              岁岁
            </span>
            <span className="wish-word inline-block mx-2">常欢愉</span>
          </h2>
          <h2 className="text-2xl md:text-4xl font-serif text-slate-300 mb-8">
            <span className="wish-word inline-block mx-2">万事</span>
            <span className="wish-word inline-block mx-2 text-amber-400">
              皆胜意
            </span>
          </h2>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-2xl mt-8">
            {[
              "健康",
              "快乐",
              "自由",
              "暴富",
              "美丽",
              "平安",
              "智慧",
              "从容",
            ].map((word, i) => (
              <span
                key={i}
                className="wish-word inline-block px-4 py-2 bg-white/5 rounded-full border border-white/10 text-amber-200/80 text-sm md:text-base backdrop-blur-sm"
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        <div
          ref={videoSectionRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl px-4 relative z-10"
        >
          {/* Video Card 1 */}
          <div
            className="video-card group relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-amber-500/20 cursor-pointer"
            onClick={() => playVideo("wishes")}
          >
            <img
              src={APP_CONSTANTS.IMAGES.VIDEO_THUMB_1}
              alt="Blessings"
              className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 group-hover:scale-105 transform"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 backdrop-blur-sm flex items-center justify-center border border-amber-400/50 group-hover:bg-amber-500/40 transition-all mb-4">
                <Play className="w-6 h-6 text-amber-100 fill-current ml-1" />
              </div>
              <span className="text-amber-100 font-serif tracking-widest text-lg">
                老师与同学的祝福
              </span>
            </div>
          </div>

          {/* Video Card 2 */}
          <div
            className="video-card group relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-amber-500/20 cursor-pointer"
            onClick={() => playVideo("journey")}
          >
            <img
              src={APP_CONSTANTS.IMAGES.VIDEO_THUMB_2}
              alt="Journey"
              className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 group-hover:scale-105 transform"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 backdrop-blur-sm flex items-center justify-center border border-amber-400/50 group-hover:bg-amber-500/40 transition-all mb-4">
                <Play className="w-6 h-6 text-amber-100 fill-current ml-1" />
              </div>
              <span className="text-amber-100 font-serif tracking-widest text-lg">
                学习之旅记录
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SCENE 4: FINAL GIFT */}
      <section
        ref={scene4Ref}
        className="scene-5 min-h-screen flex flex-col justify-center items-center relative px-4"
      >
        <div ref={giftRef} className="relative flex flex-col items-center">
          {/* Glow Light Effect */}
          <div className="gift-light absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-amber-200 rounded-full blur-[80px] opacity-0 pointer-events-none z-0"></div>

          {!giftOpened ? (
            <div
              onClick={handleOpenGift}
              className="gift-box relative top-25 cursor-pointer group z-10 transform transition-transform hover:scale-105"
            >
              <div className="gift-lid absolute -top-8 left-0 w-40 h-12 bg-amber-500 rounded-lg shadow-lg z-20 flex justify-center items-center border-b-4 border-amber-600">
                <div className="w-40 h-2 bg-amber-300/30 absolute top-2"></div>
                <div className="w-8 h-8 bg-yellow-300 rounded-full shadow-md border-2 border-yellow-400"></div>
              </div>
              <div className="w-40 h-32 bg-gradient-to-br from-amber-600 to-amber-700 rounded-b-lg shadow-2xl flex justify-center items-center border border-amber-500/50">
                <Gift className="w-12 h-12 text-amber-200 opacity-50" />
              </div>
              <p className="mt-8 text-amber-200 animate-pulse text-center font-serif tracking-widest">
                点击打开
              </p>
            </div>
          ) : (
            <div className="final-message relative z-20 text-center p-8 bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-amber-400/50 shadow-[0_0_50px_rgba(251,191,36,0.2)] max-w-lg mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500 mb-6">
                生日快乐！
              </h3>
              <div className="text-base md:text-lg text-slate-200 leading-8 font-light space-y-4">
                <p>金爽，感谢你来到这个世界。</p>
                <p>
                  愿未来的日子，
                  <br />
                  不仅有诗和远方，更有触手可及的温暖。
                </p>
                <p>
                  这只是一个小小的网页，
                  <br />
                  但装满了我大大的祝福。
                </p>
              </div>
              <div className="mt-8 text-3xl animate-bounce">🎂 ✨ 🎁</div>
            </div>
          )}
        </div>
      </section>

      {/* Video Modal Component */}
      <VideoModal video={currentVideo} onClose={handleCloseVideo} />
    </div>
  );
};

export default MainJourney;
