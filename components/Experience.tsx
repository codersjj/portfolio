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
        {workExperience.map(({ id, title, desc, thumbnail }) => (
          <Button
            key={id}
            borderRadius='1.5rem'
            duration={Math.floor(Math.random() * 8000) + 10000}
            // style={{
            //   //   add these two
            //   //   you can generate the color from here https://cssgradient.io/
            //   background: "rgb(4,7,29)",
            //   backgroundImage:
            //     "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
            //   // add this border radius to make it more rounded so that the moving border is more realistic
            //   borderRadius: `calc(1.75rem* 0.96)`,
            // }}
            // remove bg-white dark:bg-slate-900
            className="flex-1 text-black dark:text-white border-neutral-200 dark:border-slate-800"
          >
            <div className="flex lg:flex-row flex-col lg:items-center p-3 py-6 md:p-5 lg:p-10 gap-2">
              <img
                src={thumbnail}
                alt={thumbnail}
                className="lg:w-32 md:w-20 w-16"
              />
              <div className="lg:ms-5">
                <h1 className="text-start text-xl md:text-2xl font-bold">
                  {title}
                </h1>
                <p className="text-start mt-3 font-semibold text-gray-500 dark:text-gray-400 ">
                  {desc}
                </p>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </section>
  )
}

export default Experience