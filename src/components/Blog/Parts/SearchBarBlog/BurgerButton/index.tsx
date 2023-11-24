import React from 'react'
import tune from 'a/tune.png'

interface burgerOptions {
  showOptions: () => void
}

const BurgerButton = ({ showOptions }: burgerOptions) => {
  return (
    <button onClick={showOptions} type='button' aria-label='Main menu'>
      <img src={tune} alt='Blog Button' />
    </button>
  )
}

export default BurgerButton
