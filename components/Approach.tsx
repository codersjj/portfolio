import React from 'react'
import { AnimatePresence, motion } from "motion/react";
import { CanvasRevealEffect } from './ui/canvas-reveal-effect';
import BorderMagicButton from './ui/BorderMagicButton';
import { useHover, useTouch } from '@/hooks/useTouch';
import { useDebounce } from '@/hooks/useDebounce';

const Approach = () => {
  return (
    <section className='my-20'>
      <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-5 text-center">
        My{' '}
        <span className='text-purple-500 dark:text-purple-300'>approach</span>
      </h2>
      <div className="py-20 flex flex-col lg:flex-row items-center justify-center bg-white dark:bg-black w-full gap-4 mx-auto px-8">
        <Card
          title="Strategy & Planning"
          description="We'll collaborate to map out your website's goals, target audience, and key functionalities. We'll discuss things like site structure, navigation, and content requirements."
          icon={<PhaseIcon order='1' />}
        >
          <CanvasRevealEffect
            animationSpeed={5.1}
            containerClassName="bg-emerald-900"
          />
        </Card>
        <Card
          title="Design & Prototyping"
          description="Once the plan is approved, I'll translate our ideas into visual concepts. Starting with low-fidelity wireframes and evolving into a high-fidelity interactive prototype for your review."
          icon={<PhaseIcon order='2' />}
        >
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-pink-900"
            colors={[
              [255, 166, 158],
              [221, 255, 247],
            ]}
            dotSize={4}
          />
          {/* Radial gradient for the cute fade */}
          <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
        </Card>
        <Card
          title="Development & Launch"
          description="This is where the magic happens! Based on the approved design, I'll translate everything into functional code, building your website from the ground up."
          icon={<PhaseIcon order='3' />}
        >
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-sky-600"
            colors={[[125, 211, 252]]}
          />
        </Card>
      </div>
    </section>
  )
}

const Card = ({
  title,
  description,
  icon,
  children,
}: {
  title: string;
  description?: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
}) => {
  const [touched, setTouched] = React.useState(false);
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const { isHovered, handleMouseEnter, handleMouseLeave, isTouchDevice } = useHover();
  
  // 使用安全的 debounce hook 来防止内存泄漏
  const debouncedSetTransitioning = useDebounce(() => {
    setIsTransitioning(false);
  }, 200);
  
  const handleInteraction = React.useCallback(() => {
    if (!isTransitioning) {
      setTouched(!touched);
      setIsTransitioning(true);
      debouncedSetTransitioning();
    }
  }, [touched, isTransitioning, debouncedSetTransitioning]);
  
  const handleClick = (e: React.MouseEvent) => {
    if (isTouchDevice) {
      // 在移动设备上，onClick 事件就足够了
      // 它会在 touchend 后自动触发，不需要额外处理
      // 这样避免了被动事件监听器的 preventDefault 警告
      handleInteraction();
    }
  };
  
  // 注意：不使用 onTouchStart，因为现代浏览器将其设为被动事件
  // 使用 onClick 更简洁且兼容性更好
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      if (isTouchDevice) {
        handleInteraction();
      }
    }
  };
  
  const isActive = isTouchDevice ? touched : isHovered;
  
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className="approach-card border border-black/[0.2] group/canvas-card flex items-center justify-center dark:border-white/[0.2] max-w-sm w-full mx-auto p-4 relative h-[30rem] cursor-pointer transition-all duration-200 select-none"
      role="button"
      tabIndex={0}
      aria-label={`${title} - ${isTouchDevice ? 'Tap to view details' : 'Hover to view details'}`}
    >
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full w-full absolute inset-0"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 px-5">
        <div
          // add this for making it center
          // absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]
          className={`text-center transition duration-200 min-w-40 mx-auto flex items-center justify-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ${
            isActive 
              ? '-translate-y-4 opacity-0' 
              : 'translate-y-0 opacity-100'
          }`}
        >
          {icon}
        </div>
        <h2
          // change text-3xl, add text-center
          className={`text-center text-3xl relative z-10 text-black dark:text-white mt-4 font-bold transition duration-200 ${
            isActive 
              ? 'opacity-100 text-white -translate-y-2' 
              : 'opacity-0 translate-y-0'
          }`}
        >
          {title}
        </h2>
        {/* add this one for the description */}
        <p
          className={`text-sm relative z-10 mt-4 text-center transition duration-200 dark:text-[#E4ECFF] ${
            isActive 
              ? 'opacity-100 text-white -translate-y-2' 
              : 'opacity-0 translate-y-0'
          }`}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

const PhaseIcon = ({ order }: { order: string }) => {
  return (
    <BorderMagicButton
      title={`Phase ${order}`}
      className='h-auto rounded-full'
      otherClasses='text-xl md:text-2xl font-bold px-6 py-3 text-purple-500 dark:text-purple-300 rounded-full'
    />
  );
};

const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};

export default Approach