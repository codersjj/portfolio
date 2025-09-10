import { useTheme } from "next-themes";
import { useState, useEffect, useRef } from "react";
import Lottie from "react-lottie";
import { IoCopyOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";
import { BackgroundGradientAnimation } from "./background-gradient-animation";
import { GridGlobe } from "./GridGlobe";
import animationData from '@/data/confetti.json'
import BorderMagicButton from "./BorderMagicButton";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 gap-4 lg:gap-8",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  id,
  img,
  imgLightMode,
  imgClassName,
  spareImg,
  spareImgLightMode,
  titleClassName
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  id?: number;
  img?: string;
  imgLightMode?: string;
  imgClassName?: string;
  spareImg?: string;
  spareImgLightMode?: string;
  titleClassName?: string;
}) => {
  const { resolvedTheme } = useTheme();
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // 预加载图片
  useEffect(() => {
    if (!img && !imgLightMode) {
      setImagesLoaded(true);
      return;
    }
    
    const imagesToPreload = [img, imgLightMode].filter(Boolean);
    let loadedCount = 0;
    
    imagesToPreload.forEach((src) => {
      if (src) {
        const image = new Image();
        image.onload = () => {
          loadedCount++;
          if (loadedCount === imagesToPreload.length) {
            setImagesLoaded(true);
          }
        };
        image.onerror = () => {
          loadedCount++;
          if (loadedCount === imagesToPreload.length) {
            setImagesLoaded(true);
          }
        };
        image.src = src;
      }
    });
  }, [img, imgLightMode]);
  
  // 组件卸载时清理定时器
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  // 获取当前应该显示的图片
  const getCurrentImg = () => {
    if (!imgLightMode) return img;
    return resolvedTheme === 'light' ? imgLightMode : img;
  };
  
  // 获取当前应该显示的 spareImg
  const getCurrentSpareImg = () => {
    if (!spareImgLightMode) return spareImg;
    return resolvedTheme === 'light' ? spareImgLightMode : spareImg;
  };
  
  const currentImg = getCurrentImg();
  const currentSpareImg = getCurrentSpareImg();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('shanewestlife@outlook.com')

    // 清除之前的定时器（如果存在）
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setIsCopied(true);
    
    // 3秒后自动重置状态，允许用户重新复制
    timeoutRef.current = setTimeout(() => {
      setIsCopied(false);
      timeoutRef.current = null;
    }, 2000);
  }

  return (
    <div
      className={cn(
        "relative group/bento shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded-3xl border border-black/[0.1] bg-white overflow-hidden transition duration-200 hover:shadow-xl dark:border-white/[0.2] bg-[linear-gradient(90deg,#FAFAFA_0%,#FCFCFC_100%)] dark:bg-[linear-gradient(90deg,rgba(18,18,28,1)_0%,rgba(3,3,3,1)_100%)] dark:shadow-none",
        className,
      )}
    >
      <div className={`w-full h-full ${id === 6 && "flex justify-center"}`}>
        <div className="absolute w-full h-full">
          {currentImg && imagesLoaded && (
            <>
              {/* 如果有双图片模式，显示两张图片用于平滑切换 */}
              {imgLightMode && img && imgLightMode !== img ? (
                <>
                  <img
                    src={img}
                    alt={img}
                    className={cn(
                      imgClassName, 
                      "object-cover object-center transition-opacity duration-1300 ease-in-out absolute inset-0",
                      resolvedTheme === 'light' ? 'opacity-0' : 'opacity-100'
                    )}
                  />
                  <img
                    src={imgLightMode}
                    alt={imgLightMode}
                    className={cn(
                      imgClassName, 
                      "object-cover object-center transition-opacity duration-1300 ease-in-out absolute inset-0",
                      resolvedTheme === 'light' ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </>
              ) : (
                <img
                  src={currentImg}
                  alt={currentImg}
                  className={cn(
                    imgClassName, 
                    "object-cover object-center transition-opacity duration-300 ease-in-out",
                    imagesLoaded ? 'opacity-100' : 'opacity-0'
                  )}
                />
              )}
            </>
          )}
          {/* 加载占位符 */}
          {!imagesLoaded && currentImg && (
            <div className={cn(
              imgClassName,
              "bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-900 animate-pulse"
            )} />
          )}
        </div>
        <div className={`absolute right-0 -bottom-5 ${id === 4 && 'w-[208px] h-[96]'} ${id === 5 && 'w-full opacity-80'}`}>
          {(spareImg || spareImgLightMode) && (
            <>
              {/* 如果有双 spareImg 模式，显示两张图片用于平滑切换 */}
              {spareImgLightMode && spareImg && spareImgLightMode !== spareImg ? (
                <>
                  <img
                    src={spareImg}
                    alt={spareImg}
                    className={cn(
                      "w-full h-full object-cover object-center transition-opacity duration-1300 ease-in-out absolute inset-0",
                      resolvedTheme === 'light' ? 'opacity-0' : 'opacity-100'
                    )}
                  />
                  <img
                    src={spareImgLightMode}
                    alt={spareImgLightMode}
                    className={cn(
                      "w-full h-full object-cover object-center transition-opacity duration-1300 ease-in-out absolute inset-0",
                      resolvedTheme === 'light' ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </>
              ) : currentSpareImg && (
                <img
                  src={currentSpareImg}
                  alt={currentSpareImg}
                  className="w-full h-full object-cover object-center transition-opacity duration-300 ease-in-out"
                />
              )}
            </>
          )}
        </div>
        {id === 6 && (
          <BackgroundGradientAnimation />
        )}
        <div className={cn(titleClassName, "relative flex flex-col p-5 lg:p-10 transition duration-200 group-hover/bento:translate-x-2 min-h-40 md:h-full")}>
          <div className="font-sans font-extralight text-xs md:text-sm lg:text-base text-neutral-600 dark:text-neutral-300">
            {description}
          </div>
          <div className={`${id === 6 && 'md:mt-3 lg:mt-0'} max-w-96 font-sans font-bold text-lg lg:text-2xl text-neutral-600 dark:text-neutral-200`}>
            {title}
          </div>
          {id === 2 && (
            <GridGlobe />
          )}
          {id === 3 && (
            <div className="absolute right-0 flex gap-1 lg:gap-5 w-fit">
              <div className="relative -top-4 flex flex-col gap-3 lg:gap-8">
                {["JavaScript", "TypeScript", "React"].map((tech) => (
                  <span key={tech} className="bg-[#f5f7ff] dark:bg-[#101321] text-center text-xs md:text-sm lg:text-base font-medium p-2 lg:p-4 rounded">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="relative -bottom-4 flex flex-col gap-3 lg:gap-8">
                {["Vue", "Node.js", "Next.js"].map((tech) => (
                  <span key={tech} className="bg-[#f5f7ff] dark:bg-[#101321] text-center text-xs md:text-sm lg:text-base font-medium p-2 lg:p-4 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
          {id === 6 && (
            <div className="relative">
              <div className="absolute -bottom-50 right-0">
                <Lottie
                  options={{
                    loop: false,
                    autoplay: false,
                    animationData,
                    rendererSettings: {
                      preserveAspectRatio: 'xMidYMid slice'
                    }
                  }}
                  isStopped={!isCopied}
                />

                <BorderMagicButton
                  title={isCopied ? "Email copied" : "Copy my email"}
                  icon={<IoCopyOutline />}
                  position="left"
                  className="-top-32"
                  handleClick={handleCopyEmail}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
