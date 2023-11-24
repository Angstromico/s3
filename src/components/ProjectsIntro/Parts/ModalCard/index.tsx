import React, { useEffect } from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { type ProjectInfo } from '@/types'
import { useFunctions } from '@/hooks'
import styleModal from './styleModal.module.scss'
import SpecificationText from './Parts/SpecificationText'
import ModalRibbon from './Parts/ModalRibbon'
import ModalContainer from './Parts/containers/ModalContainer'
import { useProjectsFunctions } from '../Projectsfunctions'
import CarouselContainer from './Parts/containers/CarouselContainer'

export interface ModalProps extends ProjectInfo {
  onClose: () => void
}

const ModalCard: React.FC<ModalProps> = ({
  date,
  title,
  images,
  direction,
  coordinates,
  size,
  scope,
  credits,
  content,
  onClose,
}) => {
  const { generateImgSrc } = useFunctions()
  const { modalOut } = useProjectsFunctions()

  useEffect(() => {
    modalOut(onClose)
  }, [onClose, modalOut])

  return (
    <ModalContainer>
      <ModalRibbon date={date} title={title} onClose={onClose} />
      <CarouselContainer>
        <div className={styleModal.carousel}>
          <Carousel
            showStatus={false}
            autoPlay
            infiniteLoop
            showIndicators={false}
            showThumbs={false}
            showArrows={true}
          >
            {images.data.map((image, index) => (
              <div key={index}>
                <img
                  src={generateImgSrc(image.attributes.url)}
                  alt={`Image ${index + 1}`}
                />
              </div>
            ))}
          </Carousel>

          <SpecificationText
            direction={direction}
            coordinates={coordinates}
            size={size}
            scope={scope}
            credits={credits}
          />

          <p>{content}</p>
        </div>
      </CarouselContainer>
    </ModalContainer>
  )
}

export default ModalCard
