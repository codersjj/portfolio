import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Heart, Sparkles } from "lucide-react";
import { APP_CONSTANTS, BLESSING_CARDS } from "./constants";

gsap.registerPlugin(ScrollTrigger);

interface MemoriesCardsSectionProps {
  cardsRef: React.RefObject<HTMLDivElement | null>;
}

const MemoriesCardsSection: React.FC<MemoriesCardsSectionProps> = ({
  cardsRef,
}) => {
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const photo1Ref = useRef<HTMLDivElement>(null);
  const photo2Ref = useRef<HTMLDivElement>(null);
  const photo3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = [card1Ref.current, card2Ref.current, card3Ref.current];
    const photos = [photo1Ref.current, photo2Ref.current, photo3Ref.current];

    // Set initial state - completely off-screen (increased distance)
    gsap.set(cards, {
      x: -400, // 更远的初始位置，确保在屏幕外
      opacity: 0,
      rotateY: -20,
    });

    gsap.set(photos, {
      x: 400, // 更远的初始位置，确保在屏幕外
      opacity: 0,
      rotateY: 20,
    });

    // Create a single timeline for sequential animation that follows scroll
    const mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: cardsRef.current,
        start: "top 80%", // 顶部进入屏幕 20% 处开始
        end: "bottom 90%", // 底部到达屏幕底部 10% 处结束 (确保完全进入时动画已完成)
        scrub: 1,
      },
    });

    // Animate elements one by one with smooth overlap: Card1 -> Photo1 -> Card2 -> Photo2 -> Card3 -> Photo3
    mainTimeline
      // Card 1
      .to(card1Ref.current, {
        x: 0,
        opacity: 1,
        rotateY: 0,
        duration: 0.9,
        ease: "power2.out",
      })
      // Photo 1 - 开始时间重叠，创造流畅衔接
      .to(
        photo1Ref.current,
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.9,
          ease: "power2.out",
        },
        "-=0.3"
      ) // 负延迟：在前一个动画结束前0.3秒就开始
      // Card 2
      .to(
        card2Ref.current,
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.9,
          ease: "power2.out",
        },
        "-=0.3"
      )
      // Photo 2
      .to(
        photo2Ref.current,
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.9,
          ease: "power2.out",
        },
        "-=0.3"
      )
      // Card 3
      .to(
        card3Ref.current,
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.9,
          ease: "power2.out",
        },
        "-=0.3"
      )
      // Photo 3
      .to(
        photo3Ref.current,
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.9,
          ease: "power2.out",
        },
        "-=0.3"
      );

    // Cleanup function - only kill this specific ScrollTrigger
    return () => {
      if (mainTimeline.scrollTrigger) {
        mainTimeline.scrollTrigger.kill();
      }
      mainTimeline.kill();
    };
  }, [cardsRef]);

  return (
    <div
      ref={cardsRef}
      className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full"
    >
      {/* Column 1: Card + Photo */}
      <div className="md:col-span-1 flex flex-col gap-8">
        {/* Blessing Card 1 */}
        <div ref={card1Ref} className="blessing-card group relative">
          {/* Animated gradient border */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 rounded-2xl opacity-30 group-hover:opacity-60 blur-sm transition-all duration-500 animate-gradient-xy"></div>

          {/* Card content */}
          <div className="relative p-8 bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden">
            {/* Floating particles effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-4 right-4 w-2 h-2 bg-amber-400/40 rounded-full animate-float-slow"></div>
              <div className="absolute bottom-8 left-6 w-1.5 h-1.5 bg-yellow-300/30 rounded-full animate-float-delayed"></div>
              <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-amber-300/20 rounded-full animate-float"></div>
            </div>

            {/* Icon badge */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center shadow-xl transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
              <Star className="w-5 h-5 text-slate-900 fill-current animate-pulse" />
            </div>

            {/* Card title */}
            <h3
              className={`text-3xl font-serif mb-3 text-transparent bg-clip-text bg-gradient-to-r ${BLESSING_CARDS[0].color} relative z-10 group-hover:scale-105 transition-transform duration-300`}
            >
              {BLESSING_CARDS[0].title}
            </h3>

            {/* Card description */}
            <p className="text-slate-300 text-base font-light leading-relaxed relative z-10 group-hover:text-slate-200 transition-colors duration-300">
              {BLESSING_CARDS[0].desc}
            </p>

            {/* Decorative corner accent */}
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-amber-500/10 to-transparent rounded-tl-full"></div>
          </div>
        </div>

        {/* Photo 1 */}
        <div ref={photo1Ref} className="blessing-card group relative">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

          <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden shadow-2xl transform rotate-2 group-hover:rotate-0 transition-all duration-700">
            {/* Image overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-slate-900/20 z-10 opacity-60 group-hover:opacity-30 transition-opacity duration-700"></div>

            {/* Border frame */}
            <div className="absolute inset-0 border-4 border-white/10 group-hover:border-amber-400/30 rounded-2xl z-20 transition-colors duration-700"></div>

            {/* Image */}
            <img
              src={APP_CONSTANTS.IMAGES.PORTRAIT_1}
              alt="Memory 1"
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out"
            />

            {/* Sparkle effect on hover */}
            <div className="absolute top-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <Sparkles className="w-6 h-6 text-amber-300 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Column 2: Card + Photo */}
      <div className="md:col-span-1 flex flex-col gap-8">
        {/* Blessing Card 2 */}
        <div ref={card2Ref} className="blessing-card group relative">
          {/* Animated gradient border */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 rounded-2xl opacity-30 group-hover:opacity-60 blur-sm transition-all duration-500 animate-gradient-xy"></div>

          {/* Card content */}
          <div className="relative p-8 bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden">
            {/* Floating particles effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-6 left-8 w-2 h-2 bg-amber-400/40 rounded-full animate-float"></div>
              <div className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-yellow-300/30 rounded-full animate-float-slow"></div>
              <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-amber-300/20 rounded-full animate-float-delayed"></div>
            </div>

            {/* Icon badge */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-xl transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
              <Heart className="w-5 h-5 text-slate-900 fill-current animate-pulse" />
            </div>

            {/* Card title */}
            <h3
              className={`text-3xl font-serif mb-3 text-transparent bg-clip-text bg-gradient-to-r ${BLESSING_CARDS[1].color} relative z-10 group-hover:scale-105 transition-transform duration-300`}
            >
              {BLESSING_CARDS[1].title}
            </h3>

            {/* Card description */}
            <p className="text-slate-300 text-base font-light leading-relaxed relative z-10 group-hover:text-slate-200 transition-colors duration-300">
              {BLESSING_CARDS[1].desc}
            </p>

            {/* Decorative corner accent */}
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-yellow-500/10 to-transparent rounded-tl-full"></div>
          </div>
        </div>

        {/* Photo 2 */}
        <div ref={photo2Ref} className="blessing-card group relative">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

          <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden shadow-2xl transform -rotate-2 group-hover:rotate-0 transition-all duration-700">
            {/* Image overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-slate-900/20 z-10 opacity-60 group-hover:opacity-30 transition-opacity duration-700"></div>

            {/* Border frame */}
            <div className="absolute inset-0 border-4 border-white/10 group-hover:border-amber-400/30 rounded-2xl z-20 transition-colors duration-700"></div>

            {/* Image */}
            <img
              src={APP_CONSTANTS.IMAGES.PORTRAIT_2}
              alt="Memory 2"
              className="w-full h-full object-cover object-bottom transform group-hover:scale-110 transition-transform duration-1000 ease-out"
            />

            {/* Heart effect on hover */}
            <div className="absolute top-4 left-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <Heart className="w-6 h-6 text-rose-300 animate-pulse fill-current" />
            </div>
          </div>
        </div>
      </div>

      {/* Column 3: Card + Photo */}
      <div className="md:col-span-1 flex flex-col gap-8">
        {/* Blessing Card 3 */}
        <div ref={card3Ref} className="blessing-card group relative">
          {/* Animated gradient border */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-400 rounded-2xl opacity-30 group-hover:opacity-60 blur-sm transition-all duration-500 animate-gradient-xy"></div>

          {/* Card content */}
          <div className="relative p-8 bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden">
            {/* Floating particles effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-8 right-6 w-2 h-2 bg-orange-400/40 rounded-full animate-float-delayed"></div>
              <div className="absolute bottom-6 left-4 w-1.5 h-1.5 bg-yellow-300/30 rounded-full animate-float"></div>
              <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-amber-300/20 rounded-full animate-float-slow"></div>
            </div>

            {/* Icon badge */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center shadow-xl transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
              <Sparkles className="w-5 h-5 text-slate-900 fill-current animate-pulse" />
            </div>

            {/* Card title */}
            <h3
              className={`text-3xl font-serif mb-3 text-transparent bg-clip-text bg-gradient-to-r ${BLESSING_CARDS[2].color} relative z-10 group-hover:scale-105 transition-transform duration-300`}
            >
              {BLESSING_CARDS[2].title}
            </h3>

            {/* Card description */}
            <p className="text-slate-300 text-base font-light leading-relaxed relative z-10 group-hover:text-slate-200 transition-colors duration-300">
              {BLESSING_CARDS[2].desc}
            </p>

            {/* Decorative corner accent */}
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-orange-500/10 to-transparent rounded-tl-full"></div>
          </div>
        </div>

        {/* Photo 3 - New addition */}
        <div ref={photo3Ref} className="blessing-card group relative">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

          <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden shadow-2xl transform rotate-1 group-hover:rotate-0 transition-all duration-700">
            {/* Image overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-slate-900/20 z-10 opacity-60 group-hover:opacity-30 transition-opacity duration-700"></div>

            {/* Border frame */}
            <div className="absolute inset-0 border-4 border-white/10 group-hover:border-amber-400/30 rounded-2xl z-20 transition-colors duration-700"></div>

            {/* Image */}
            <img
              src={APP_CONSTANTS.IMAGES.PORTRAIT_3}
              alt="Memory 3"
              className="w-full h-full object-cover object-[50%_-30px] transform group-hover:scale-110 transition-transform duration-1000 ease-out"
            />

            {/* Sparkles effect on hover */}
            <div className="absolute bottom-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <Sparkles className="w-6 h-6 text-orange-300 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoriesCardsSection;
