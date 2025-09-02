import React from 'react'
import { BentoGrid, BentoGridItem } from './ui/bento-grid'
import { gridItems } from '@/data'

const Grid = () => {
  return (
    <section id='about' className='pt-20'>
      <BentoGrid>
        {gridItems.map(({ id, title, description, className, img, imgLightMode, imgClassName, spareImg, spareImgLightMode, titleClassName }) => (
          <BentoGridItem
            key={id}
            id={id}
            title={title}
            description={description}
            className={className}
            img={img}
            imgLightMode={imgLightMode}
            imgClassName={imgClassName}
            spareImg={spareImg}
            spareImgLightMode={spareImgLightMode}
            titleClassName={titleClassName}
          />
        ))}
      </BentoGrid>
    </section>
  )
}

export default Grid