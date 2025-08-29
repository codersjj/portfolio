'use client'

import React, { useEffect, useState } from 'react';
import { FaLocationArrow } from 'react-icons/fa6';
import { Spotlight } from './ui/spotlight-new';
import ModeToggleButton from './ui/ModeToggleButton';
import VolumeToggleIcon from './ui/VolumeToggleIcon';
import { BackgroundRippleEffect } from './ui/background-ripple-effect';
import { TextGenerateEffect } from './ui/text-generate-effect';
import BorderMagicButton from './ui/BorderMagicButton';

import { CometCard } from "@/components/ui/comet-card";

const words = 'Transforming Concepts into Seamless User Experiences'

const Hero = () => {
  const [mounted, setMounted] = useState(false)

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Avoid rendering during SSR to prevent hydration mismatch
    return null
  }

  return (
    <div className="w-full h-screen pt-24 pb-20">
      <Spotlight />
      <div className="relative flex min-h-screen w-full flex-col items-center justify-start overflow-hidden">
        <BackgroundRippleEffect />

        <CometCard className='absolute z-20 top-10'>
          <img src="https://avatars.githubusercontent.com/u/44868357?v=4" alt="avatar" className='w-50 rounded-full cursor-pointer' />
        </CometCard>

        <div className="mt-60 w-full">
          <TextGenerateEffect words={words} className='relative z-10 text-center' filter={true} duration={1.5} />
          <p className="relative z-10 mx-auto mt-4 max-w-6xl text-center text-base md:text-xl lg:text-2xl text-neutral-800 dark:text-neutral-500">
            Hi, I'm Shane, a front-end developer specializing in crafting engaging and intuitive web experiences.
          </p>
        </div>
        <a href="#about" className='mt-8'>
          <BorderMagicButton
            title='View My Work'
            icon={<FaLocationArrow />}
            position='right'
          />
        </a>
      </div>
    </div>
  );
}

export default Hero;