import React, { useCallback, useEffect, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import {
  NextButton,
  PrevButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import serverUrl from '../../Services/serverUrl'
import { useNavigate } from 'react-router-dom'

const TWEEN_FACTOR_BASE = 0.2

const EmblaCarousel = (props) => {
  const { vehicleData } = props
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const tweenFactor = useRef(0)
  const tweenNodes = useRef([])
  const navigate = useNavigate()

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  const handleNavigate = ()=>{
    const token = sessionStorage.getItem("token")
    if(token){
      navigate('/vehicles')
    }else{
      navigate('/login')
    }
  }

  const setTweenNodes = useCallback((emblaApi) => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector('.embla__parallax__layer')
    })
  }, [])

  const setTweenFactor = useCallback((emblaApi) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length
  }, [])

  const tweenParallax = useCallback((emblaApi, eventName) => {
    const engine = emblaApi.internalEngine()
    const scrollProgress = emblaApi.scrollProgress()
    const slidesInView = emblaApi.slidesInView()
    const isScrollEvent = eventName === 'scroll'

    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress
      const slidesInSnap = engine.slideRegistry[snapIndex]

      // slidesInSnap.forEach((slideIndex) => {
      //   if (isScrollEvent && !slidesInView.includes(slideIndex)) return

      //   if (engine.options.loop) {
      //     engine.slideLooper.loopPoints.forEach((loopItem) => {
      //       const target = loopItem.target()

      //       if (slideIndex === loopItem.index && target !== 0) {
      //         const sign = Math.sign(target)

      //         if (sign === -1) {
      //           diffToTarget = scrollSnap - (1 + scrollProgress)
      //         }
      //         if (sign === 1) {
      //           diffToTarget = scrollSnap + (1 - scrollProgress)
      //         }
      //       }
      //     })
      //   }

      //   const translate = diffToTarget * (-1 * tweenFactor.current) * 100
      //   const tweenNode = tweenNodes.current[slideIndex]
      //   tweenNode.style.transform = `translateX(${translate}%)`
      // })
    })
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    setTweenNodes(emblaApi)
    setTweenFactor(emblaApi)
    tweenParallax(emblaApi)

    emblaApi
      .on('reInit', setTweenNodes)
      .on('reInit', setTweenFactor)
      .on('reInit', tweenParallax)
      .on('scroll', tweenParallax)
      .on('slideFocus', tweenParallax)
  }, [emblaApi, tweenParallax])

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {
            vehicleData.length > 0 ?
              vehicleData.map((item) => (
                <div onClick={()=>handleNavigate()} key={item._id} className="embla__slide">
                  <div className="embla__parallax">
                    <div className="embla__parallax__layer">
                      <img
                        className="embla__slide__img embla__parallax__img"
                        src={`${serverUrl}/uploads/${item?.image}`}
                        alt="Your alt text"
                      />
                      <div className="embla_slide_content">
                        <h3 className='text-dark'>{item.make}-{item.model}</h3>
                        <h2 className='text-danger'>{item.rate} Rs</h2>
                      </div>
                    </div>
                  </div>
                </div>
              ))
              :
              <div className="text-center text-Danger">No data available</div>
          }

        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel
