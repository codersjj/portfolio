'use client';

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { cn } from '@/lib/utils';

interface RotatedImageProps {
  src: string | StaticImageData;
  alt: string;
  width?: number;
  height?: number;
  mobileWidth?: number;
  mobileHeight?: number;
  rotation?: number;
  mobileRotation?: number;
  bottomOffset?: number;
  className?: string;
}

const RotatedImage: React.FC<RotatedImageProps> = ({
  src,
  alt,
  width = 464,
  height = 300,
  mobileWidth = 280,
  mobileHeight = 180,
  rotation = 3,
  mobileRotation = 2,
  bottomOffset = 0,
  className,
}) => {
  return (
    <div className={cn('relative', className)}>
      {/* 桌面端容器 */}
      <div
        className="hidden sm:block relative"
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
      >
        <div
          className="absolute top-0 left-0"
          style={{
            width: '100%',
            height: `calc(100% + ${bottomOffset}px)`,
            transform: `rotate(${rotation}deg)`,
            transformOrigin: 'center',
          }}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="rounded-[20px] w-full h-full object-cover"
          />
        </div>
      </div>

      {/* 移动端容器 */}
      <div
        className="block sm:hidden relative mx-auto max-w-full"
        style={{
          width: `${mobileWidth}px`,
          height: `${mobileHeight}px`,
        }}
      >
        <div
          className="absolute top-0 left-0"
          style={{
            width: '100%',
            height: `calc(100% + ${bottomOffset * 0.6}px)`,
            transform: `rotate(${mobileRotation}deg)`,
            transformOrigin: 'center',
          }}
        >
          <Image
            src={src}
            alt={alt}
            width={mobileWidth}
            height={mobileHeight}
            className="rounded-[15px] w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default RotatedImage;