import React from 'react'
import { workExperience } from '@/data'
import { Button } from './ui/moving-border'

const Experience = () => {
  return (
    <section id="experience" className='mt-20 mb-10'>
      <h2 className='text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center mb-10 md:mb-20'>
        My {' '}
        <span className='text-purple-500 dark:text-purple-300'>work experience</span>
      </h2>
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-8'>
        {workExperience.map(({ id, title, desc, thumbnail, className }) => (
          <Button
            key={id}
            borderRadius='1.5rem'
            duration={Math.floor(Math.random() * 8000) + 10000}
            className='flex justify-center items-center gap-3 md:gap-6 p-4 md:p-8 cursor-pointer'
          >
            <img src={thumbnail} alt="thumbnail" className='w-16 md:w-20 lg:w-32' />
            <div className='flex flex-col gap-2 md:gap-4 text-left'>
              <h4 className='text-lg md:text-xl font-bold'>{title}</h4>
              <p className='text-sm md:text-base text-gray-500 dark:text-gray-400 font-semibold'>{desc}</p>
            </div>
          </Button>
        ))}
      </div>
    </section>
  )
}

export default Experience