import { useEffect, useRef } from 'react'
import useScreenSize from '@/hooks/use-screen-size'
import MediaBetweenText, {
  MediaBetweenTextRef,
} from '@/components/ui/media-between-text'
import { cn } from '@/lib/utils'

export default function Preview() {
  const ref = useRef<MediaBetweenTextRef>(null)
  // const [isOpen, setIsOpen] = useState(true)
  const screenSize = useScreenSize()

  useEffect(() => {
    ref.current?.animate()
  }, [])

  return (
    <div className="bg-background flex flex-col items-start justify-center">
      <MediaBetweenText
        firstText="Munkhsuld "
        secondText="Bayaraa"
        mediaUrl={
          'https://cdn.cosmos.so/47c0223f-c704-4d5a-8b47-c48262ebe301?format=jpeg'
        }
        mediaType="image"
        triggerType="ref"
        ref={ref}
        mediaContainerClassName="w-full h-[60px] sm:h-[100px] overflow-hidden pt-1"
        className={cn(
          'font-calendas flex cursor-pointer flex-col items-center justify-center text-3xl font-light sm:text-7xl',
        )}
        leftTextClassName=""
        rightTextClassName="italic"
        animationVariants={{
          initial: {
            width: screenSize.lessThan('sm') ? '160px' : '280px',
            height: 0,
            transition: { duration: 0.7, ease: [0.944, 0.008, 0.147, 1.002] },
          },
          animate: {
            width: screenSize.lessThan('sm') ? '200px' : '330px',
            height: screenSize.lessThan('sm') ? '200px' : '300px',
            transition: { duration: 0.7, ease: [0.944, 0.008, 0.147, 1.002] },
          },
        }}
      />
    </div>
  )
}
