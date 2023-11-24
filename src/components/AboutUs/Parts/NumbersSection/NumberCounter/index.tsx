import React, { useEffect, useState } from 'react'

interface NumberCounterProps {
  targetNumber: number
  time: number
}

const NumberCounter = ({ targetNumber, time }: NumberCounterProps) => {
  const [currentNumber, setCurrentNumber] = useState<number>(0)

  useEffect(() => {
    const startTime = Date.now()
    const endTime = startTime + time // 5 seconds
    const increment = targetNumber / (time / 100) // increment by 1/50th of the target number each 100ms

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(1, elapsed / time) // calculate the progress as a percentage between 0 and 1
      const newNumber = Math.floor(progress * targetNumber)

      setCurrentNumber(newNumber)

      if (newNumber >= targetNumber) {
        clearInterval(interval) // stop the interval when we reach the target number
      }
    }, 100)

    return () => clearInterval(interval) // clear the interval when the component unmounts
  }, [targetNumber])

  return <>{currentNumber}</>
}

export default NumberCounter
