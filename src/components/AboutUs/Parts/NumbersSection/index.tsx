import React, { useState, useEffect, useRef } from 'react'
import NumberCounter from './NumberCounter'

export interface NumbersInfo {
  title: string
  number: number
  type: string
}

const NumbersSection = ({ title, number, type }: NumbersInfo) => {
  const ref = useRef<HTMLDivElement>(null) // Create a ref to the component

  const [isVisible, setIsVisible] = useState(false) // State to track if the component is visible

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      // Create a new IntersectionObserver
      const [entry] = entries // Get the first entry in the array of entries

      if (entry.isIntersecting) {
        // Check if the entry is intersecting
        setIsVisible(true) // Set the state to true if the entry is intersecting
      }
    })

    if (ref.current) {
      // Check if the ref to the component exists
      observer.observe(ref.current) // Observe the component
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current) // Stop observing the component when the component is unmounted
      }
    }
  }, [ref])

  return (
    <div className='card' ref={ref}>
      <div className='title'>{title}</div>
      <div className='number'>
        +{' '}
        {isVisible ? (
          <NumberCounter targetNumber={number} time={2000} />
        ) : (
          number
        )}
      </div>
      <div className='subtitle'>{type}</div>
    </div>
  )
}

export default NumbersSection
