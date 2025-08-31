import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { BackgroundGradientAnimation } from "./background-gradient-animation";
import { GridGlobe } from "./GridGlobe";

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
  header,
  icon,
  id,
  img,
  imgLightMode,
  imgClassName,
  spareImg,
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
  titleClassName?: string;
}) => {
  const { resolvedTheme } = useTheme();
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
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
  
  // 获取当前应该显示的图片
  const getCurrentImg = () => {
    if (!imgLightMode) return img;
    return resolvedTheme === 'light' ? imgLightMode : img;
  };
  
  const currentImg = getCurrentImg();

  return (
    <div
      className={cn(
        "relative group/bento shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded-3xl border border-neutral-200 bg-white overflow-hidden transition duration-200 hover:shadow-xl dark:border-white/[0.2] bg-[linear-gradient(90deg,#FAFAFA_0%,#FCFCFC_100%)] dark:bg-[linear-gradient(90deg,rgba(18,18,28,1)_0%,rgba(3,3,3,1)_100%)] dark:shadow-none",
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
        <div className={`absolute right-0 -bottom-5 ${id === 5 && 'w-full opacity-80'}`}>
          {spareImg && (
            <img
              src={spareImg}
              alt={spareImg}
              className="w-full h-full object-cover object-center"
            />
          )}
        </div>
        {id === 6 && (
          <BackgroundGradientAnimation>
            <div className="absolute z-10 flex justify-center items-center text-white font-bold"></div>
          </BackgroundGradientAnimation>
        )}
        <div className={cn(titleClassName, "relative flex flex-col p-5 lg:p-10 transition duration-200 group-hover/bento:translate-x-2 min-h-40 md:h-full")}>
          <div className="font-sans font-extralight text-xs md:text-sm lg:text-base text-neutral-600 dark:text-neutral-300">
            {description}
          </div>
          <div className="max-w-96 font-sans font-bold text-lg lg:text-3xl text-neutral-600 dark:text-neutral-200">
            {title}
          </div>
          {id === 2 && (
            <GridGlobe />
          )}
        </div>
      </div>
    </div>
  );
};
