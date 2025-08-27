'use client'

import React, { useEffect, useState } from 'react';
import { Spotlight } from './ui/spotlight-new';
import ModeToggleButton from './ui/ModeToggleButton';
import VolumeToggleIcon from './ui/VolumeToggleIcon';


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
    <div className="w-full h-screen pt-36 pb-20">
      <div className='fixed top-6 right-6 flex gap-4'>
        <VolumeToggleIcon />
        <ModeToggleButton />
      </div>
      <Spotlight />
    </div>
  );
}

export default Hero;