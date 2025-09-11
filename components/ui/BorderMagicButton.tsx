import React from 'react'
import { cn } from '@/lib/utils';

const BorderMagicButton = ({
  title,
  icon,
  position = 'right',
  handleClick,
  className = '',
  otherClasses = '',
}: {
  title: string;
  icon?: React.ReactNode;
  position?: 'left' | 'right';
  handleClick?: () => void;
  className?: string;
  otherClasses?: string;
}) => {
  return (
    <button
      className={cn('relative inline-flex h-12 overflow-hidden rounded-xl p-[2px] focus:outline-none shadow-lg transition-all duration-200 hover:scale-[1.03] hover:shadow-xl', className)}
      onClick={handleClick}
    >
      {/* 渐变边框适配 light/dark mode */}
      <span
        className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,theme(colors.violet.300)_0%,theme(colors.indigo.500)_50%,theme(colors.violet.300)_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"
      />
      <span
        className={cn('relative z-10 inline-flex gap-2 h-full w-full cursor-pointer items-center justify-center rounded-[10px] px-4 py-2 sm:px-6 sm:py-1 text-base sm:text-sm font-medium transition-colors duration-200 bg-white dark:bg-slate-950 text-slate-900 dark:text-white hover:bg-violet-100 dark:hover:bg-slate-900', otherClasses)}
      >
        {position === 'left' && icon}
        {title}
        {position === 'right' && icon}
      </span>
    </button>
  );
};

export default BorderMagicButton