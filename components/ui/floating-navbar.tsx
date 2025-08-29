"use client";
import React, { JSX, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";
import { type IconType } from "react-icons";


export const FloatingNav = ({
  navItems,
  className,
  onVisibleChange,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: IconType;
  }[];
  className?: string;
  onVisibleChange?: (visible: boolean) => void;
}) => {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;
      let newVisible: boolean;
      if (scrollYProgress.get() < 0.05) {
        newVisible = false;
      } else {
        newVisible = direction < 0;
      }
      // 只有在 visible 变为 true 时立即触发 TopNavigation 隐藏
      if (onVisibleChange && newVisible) {
        onVisibleChange(true);
      }
      setVisible(newVisible);
    }
  });

  return (
    <AnimatePresence
      mode="wait"
    >
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        exit={{
          y: -100,
          opacity: 0,
          transition: { duration: 0.2 }
        }}
        transition={{
          duration: 0.2,
        }}
        onAnimationComplete={() => {
          // 只有在消失动画完成时才触发 TopNavigation 显示
          if (onVisibleChange && !visible) {
            onVisibleChange(false);
          }
        }}
        className={cn(
          "flex max-w-fit fixed top-4 sm:top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-4 pl-4 sm:pr-8 sm:pl-8 py-2 sm:py-4 items-center justify-center space-x-2 sm:space-x-4",
          className
        )}
      >
        {navItems.map((navItem: any, idx: number) => (
          <a
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
            )}
          >
            {navItem.icon ? (
              <>
                <span className="block sm:hidden text-lg">
                  <navItem.icon />
                </span>
                <span className="hidden sm:block text-xs sm:text-sm">{navItem.name}</span>
              </>
            ) : (
              <span className="block text-xs sm:text-sm">{navItem.name}</span>
            )}
          </a>
        ))}
        {/* <button className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full">
          <span>Login</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
        </button> */}
      </motion.div>
    </AnimatePresence>
  );
};
