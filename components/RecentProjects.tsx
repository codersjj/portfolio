'use client'

import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { projects } from '@/data'
import { PinContainer } from './ui/3d-pin'

const RecentProjects = () => {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section id="projects" className='pt-20'>
      <h2 className='text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center mb-5'>
        A small selection of {' '}
        <span className='text-purple-500 dark:text-purple-300'>recent projects</span>
      </h2>
      <div className='flex flex-wrap justify-center items-center gap-x-24 gap-y-4 sm:gap-y-8 p-4'>
        {projects.map(({ id, title, des, img, iconLists, link }) => (
          <div key={id} className='flex justify-center items-center w-[80vw] sm:w-142.5 h-[28rem] sm:h-[35rem] md:h-[40rem]'>
            <PinContainer
              title='Visit'
              href={link}
              className='flex flex-col gap-2 sm:gap-4'
            >
              <div className='relative flex flex-col gap-5 w-[80vw] sm:w-142.5 min-h-[28vh] sm:h-[40vh] bg-[#13162d] rounded-3xl overflow-hidden'>
                <div className='flex justify-center items-end'>
                  <img src="/bg.png" alt="background img" />
                </div>
                <img
                  alt={title}
                  src={img}
                  className='absolute z-10 bottom-0 left-1/2 -translate-x-1/2'
                />
              </div>
              <h3 className='text-lg md:text-xl lg:text-2xl font-semibold line-clamp-1'>{title}</h3>
              <p className='max-w-xl text-xs line-clamp-2 sm:text-sm lg:text-base text-neutral-600 dark:text-[#BEC1DD]'>
                {des}
              </p>
              <div className='flex justify-between items-center'>
                <ul>
                  {iconLists.map((icon, idx) => {
                    // 简化逻辑：直接处理图标显示
                    let displayIcon: string
                    
                    if (Array.isArray(icon)) {
                      // 对于有多个版本的图标（如 Next.js），根据主题选择
                      // Light mode 用深色图标，Dark mode 用浅色图标
                      displayIcon = resolvedTheme === 'light' ? icon[1] : icon[0]
                    } else {
                      // 对于单一图标，直接使用
                      displayIcon = icon
                    }

                    return (
                      <li
                        key={`icon-${idx}`}
                        className='inline-flex p-2 border border-black/[.2] dark:border-white/[.2] rounded-full bg-white dark:bg-black'
                        title={displayIcon}
                        style={{
                          transform: `translateX(-${2 + idx * 6}px)`,
                        }}
                      >
                        <img 
                          src={displayIcon} 
                          alt={displayIcon} 
                          className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 object-contain ${
                            !Array.isArray(icon) ? 'dark:invert' : ''
                          }`}
                        />
                      </li>
                    )
                  })}
                </ul>
                <p className='flex gap-4 items-center py-2 md:py-4'>
                  <span className='text-purple-500 dark:text-purple-300'>Check Live Site</span>
                  <img src="/arrow.svg" alt="arrow" />
                </p>
              </div>
            </PinContainer>
          </div>
        ))}
      </div>
    </section>
  )
}

export default RecentProjects