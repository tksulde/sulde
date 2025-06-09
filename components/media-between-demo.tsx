'use client'

import React from 'react'

import useScreenSize from '@/hooks/use-screen-size'
import MediaBetweenText from './ui/media-between-text'

const elements = [
  {
    src: 'https://cdn.cosmos.so/53454cbe-a4ec-4782-923f-a82d70e12645.mp4',
    left: 'Tim',
    right: 'Rodenböker',
    url: 'https://www.instagram.com/tim_rodenbroeker/',
  },
  {
    src: 'https://cdn.cosmos.so/499ddb3b-57cf-4c07-996c-f797fadf64ab.mp4',
    left: 'Simon ',
    right: 'Alexander-Adams',
    url: 'https://www.instagram.com/polyhop/',
  },
  {
    src: 'https://cdn.cosmos.so/444e4a2a-45a6-477f-b342-6b6bc9a7c53b.mp4',
    left: 'Andreion',
    right: 'de Castro',
    url: 'https://www.instagram.com/andreiongd/',
  },
  {
    src: 'https://cdn.cosmos.so/f533f1a8-9f67-4360-b395-7abc8594cac9.mp4',
    left: 'Lorraine',
    right: 'Li',
    url: 'https://www.instagram.com/lorrr.l/',
  },
]

export default function MediaBetweenTextScrollDemo() {
  const ref = React.useRef<HTMLDivElement>(null)
  const screenSize = useScreenSize()

  return (
    <div
      className="bg-background h-[60svh] w-full items-center justify-center overflow-auto border"
      ref={ref}
    >
      <div className="relative flex h-full w-full">
        <h3 className="absolute bottom-4 left-4 w-64 text-5xl tracking-wide sm:bottom-12 sm:left-12 sm:text-8xl">
          today's inspo
        </h3>
        <p className="absolute right-4 bottom-4 sm:right-12 sm:bottom-12">
          Scroll down ↓
        </p>
      </div>

      <div className="mt-24 flex h-full w-full flex-col items-center justify-center space-y-12 px-6 text-6xl">
        {elements.map((element, index) => (
          <a href={element.url} target="_blank" rel="noreferrer" key={index}>
            <MediaBetweenText
              key={index}
              firstText={element.left}
              secondText={element.right}
              mediaUrl={element.src}
              mediaType="video"
              triggerType="inView"
              useInViewOptionsProp={{
                once: false,
                amount: 1,
                root: ref,
                margin: '-5% 0px -0% 0px',
              }}
              //   containerRef={ref}
              mediaContainerClassName="w-full h-[40px] sm:h-[80px] overflow-hidden mx-1 sm:mx-3 mt-1 sm:mt-4"
              className="flex cursor-pointer flex-row items-center justify-center text-lg font-light sm:text-4xl"
              animationVariants={{
                initial: { width: 0 },
                animate: {
                  width: screenSize.lessThan('sm') ? '40px' : '100px',
                  transition: {
                    duration: 1,
                    type: 'spring',
                    bounce: 0,
                    delay: 0.1,
                  },
                },
              }}
            />
          </a>
        ))}
      </div>
    </div>
  )
}
