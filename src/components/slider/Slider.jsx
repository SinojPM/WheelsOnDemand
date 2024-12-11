import React from 'react'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import useEmblaCarousel from 'embla-carousel-react'
import VehicleCard from '../VehicleCard'

const Slider = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  return (
    <section className="slider">
      <div className="slider__viewport" ref={emblaRef}>
        <div className="slider__container">
          {slides.map((car,index) => (
            <div className="slider__slide" key={index}>
              <VehicleCard vehicle={{_id:car?.vehicleId,make:car?.make,model:car?.model,image:car?.image,rate:car?.rate}}/>
            </div>
          ))}
        </div>
      </div>

      <div className="slider__controls">
        <div className="slider__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="slider__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'slider__dot'.concat(
                index === selectedIndex ? ' slider__dot--selected' : ''
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Slider
