import React, { useState } from 'react'
import trash from '/trash.png'
import { useBearStore } from '@/store'
import SelectService from './SelectService'
import AddInspections from '../AddInspections'
import EngineersGrid from '@/components/EngineersGrid'

interface Props {
  changeSchedule: () => void
  selectedPhrase: string
  addInspection: string
  scheduleTitle: string
}

const ChosenEngineer = ({
  changeSchedule,
  selectedPhrase,
  addInspection,
  scheduleTitle,
}: Props) => {
  const { lang, inspections, removeInspection } = useBearStore()
  const [openDialog, setOpenDialog] = useState(false)

  const changeDialog = () => setOpenDialog(false)

  const toTrash = (i: number) => {
    removeInspection(i)
    if (inspections.length === 1) {
      changeSchedule()
    }
  }

  return (
    <div className='w-full max-w-6xl justify-start gap-6 items-start'>
      {inspections.map((inspect, i) => {
        const { title, titulo, engineer } = inspect

        return (
          <div
            key={i}
            className='w-full flex gap-3 my-8 flex-wrap flex-col md:flex-row'
          >
            <div className='w-[95%] md:w-[40%] flex gap-3 md:gap-0'>
              <p className='bg-white text-blackS3 w-full h-20 px-4 text-lg sm:text-xl md:text-2xl rounded-lg min-w-[113px] font-swiss721-bold font-bold flex items-center'>
                {lang === 'en' ? title : titulo}
              </p>
              <img
                onClick={() => toTrash(i)}
                className='cursor-pointer md:hidden'
                src={trash}
                alt='Cubo de basura'
              />
            </div>
            <div className='w-[95%] md:w-[50%] flex gap-3'>
              <SelectService
                engineer={engineer}
                selectedPhrase={selectedPhrase}
                j={i}
              />
              <img
                onClick={() => toTrash(i)}
                className={`cursor-pointer hidden md:block ${
                  openDialog ? '' : 'z-50'
                }`}
                src={trash}
                alt='Cubo de basura'
              />
            </div>
          </div>
        )
      })}
      <AddInspections
        setOpenDialog={setOpenDialog}
        text={addInspection}
        behind={openDialog}
      />
      <div className='w-full'>
        {openDialog && (
          <dialog
            open
            className='fixed z-[1000] bg-transparent inset-0 flex items-center justify-center w-full h-screen'
          >
            <div className='fixed inset-0 bg-gradient-to-b from-blackS3/70 to-black/70 backdrop-blur-sm'></div>
            <div className='relative p-4 rounded-lg z-10 w-full flex flex-col items-center gap-5'>
              <h3 className='text-white mb-16 text-2xl sm:text-3xl md:text-4xl'>
                {scheduleTitle}
              </h3>
              <EngineersGrid changeSchedule={changeDialog} />
              <button
                className='mb-4 p-4  bg-blackS3 text-white rounded-md mt-10 font-bold'
                onClick={() => setOpenDialog(false)}
              >
                {lang === 'en' ? 'Come back' : 'Volver atrás'}
              </button>
            </div>
          </dialog>
        )}
      </div>
    </div>
  )
}
export default ChosenEngineer
