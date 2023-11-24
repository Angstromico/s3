import React from 'react'
import styleModal from '../../styleModal.module.scss'

interface Specifications {
  direction: string
  coordinates: string
  size: string
  scope: string
  credits: string
}

const SpecificationText = ({
  direction,
  coordinates,
  size,
  scope,
  credits,
}: Specifications) => {
  return (
    <div className={styleModal.specifications}>
      <h4>{direction}</h4>
      <h4>{coordinates}</h4>
      <h4>
        Size: <span>{size}</span>
      </h4>
      <h4>
        Scope: <span>{scope}</span>
      </h4>
      <h4>
        Credits: <span>{credits}</span>
      </h4>
    </div>
  )
}

export default SpecificationText
