import React from 'react'
import { FaLocationArrow } from 'react-icons/fa6'
import BorderMagicButton from './ui/BorderMagicButton'
import { socialMedia } from '@/data'

const Footer = () => {
  return (
    <footer id="contact" className='w-full max-w-7xl mx-auto mt-20 mb-18 text-center flex flex-col gap-6'>
      <h2 className="lg:max-w-[45vw] self-center text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-5">
        Ready to take <span className="text-purple-500 dark:text-purple-300">your</span> digital presence to the next level?
      </h2>
      <p className='text-xs md:text-sm lg:text-base text-neutral-500 dark:text-neutral-300'>Reach out to me today and let&apos;s discuss how I can help you achieve your goals.</p>
      <a href="mailto:shanewestlife@outlook.com" className='mt-4 md:mt-8 w-fit self-center'>
        <BorderMagicButton
          title="Let's get in touch"
          icon={<FaLocationArrow />}
          position="right"
        />
      </a>

      <div className='mt-10 flex flex-col md:flex-row justify-between items-center gap-4'>
        <span>Copyright &#169; 2025 Shane</span>
        <ul className='flex justify-center items-center gap-4'>
          {socialMedia.map(({ id, img, link }) => (
            <li key={id} className='w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-zinc-700 dark:bg-zinc-800/75 rounded-lg border border-black-300'>
              <a href={link} target='_blank' className='w-full h-full flex justify-center items-center hover:scale-110 transition-transform duration-200'>
                <img src={img} alt={img} width={20} height={20} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}

export default Footer