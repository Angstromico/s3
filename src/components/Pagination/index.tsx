import React, { useState } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

interface Props {
  arrLength: number
  itemsPerPage: number
  setChosen: (value: number) => void
}

const Pagination = ({ arrLength, itemsPerPage, setChosen }: Props) => {
  const [currentPage, setCurrentPage] = useState(0)

  function createNumberArray(num: number) {
    return Array.from({ length: num }, (_, index) => index + 1)
  }
  const items = createNumberArray(arrLength)

  const handlePageClick = (selected: number) => {
    setCurrentPage(selected)
    setChosen(selected)
  }
  const changePage = (num: 1 | -1) => {
    const plusOrMinus =
      num === 1 ? currentPage + 1 >= arrLength : currentPage <= 0

    if (plusOrMinus) {
      setCurrentPage(currentPage)
      setChosen(currentPage)
    } else {
      setCurrentPage(currentPage + num)
      setChosen(currentPage + num)
    }
  }
  let currentItems: React.JSX.Element[] = []

  const startIndex = Math.floor(currentPage / itemsPerPage) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, items.length)

  currentItems = items.map((item, index) => {
    const isActive = currentPage === item - 1
    const isHidden = index < startIndex || index >= endIndex

    return (
      <li
        style={{
          color: isActive ? '#d2bb3f' : 'black',
          display: isHidden ? 'none' : 'block',
        }}
        onClick={() => handlePageClick(index)}
        key={index}
      >
        {item}
      </li>
    )
  })

  return (
    <div className='pagination'>
      <div onClick={() => changePage(-1)} className='arrow'>
        <MdKeyboardArrowLeft />
      </div>
      <ul>{currentItems}</ul>
      <div className='arrow' onClick={() => changePage(1)}>
        <MdKeyboardArrowRight />
      </div>
    </div>
  )
}

export default Pagination
