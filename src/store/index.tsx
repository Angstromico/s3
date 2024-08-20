import { create } from 'zustand'
import { type Lan } from '@/types'

type mutationFunc = (value: string) => void
type alphabetic = '' | 'a' | 'z'
type mutationAlphabetic = (value: alphabetic) => void

export interface Inspections {
  title: string
  titulo: string
  engineer: { name: string }[]
  choosen?: number
  price?: number
}

interface SelectedDirection {
  province?: string
  cantons?: string
  districts?: string
}

interface InspectionDate {
  en: string
  es: string
}

interface Store {
  lang: Lan
  setLang: (value: Lan) => void
  blogInput: string
  setBlogInput: mutationFunc
  blogLabel: string
  setBlogLabel: mutationFunc
  blogList: string
  setBlogList: mutationFunc
  blogAlpha: alphabetic
  setBlogAlpha: mutationAlphabetic
  inspections: Inspections[]
  setInspections: (value: Inspections) => void
  removeInspection: (index: number) => void // Function to remove an element by index
  updateInspectionChoosen: (index: number, choosen: number) => void // Function to update the 'choosen' field
  selectedDirection: SelectedDirection
  setSelectedDirection: (value: SelectedDirection) => void
  uniqueEngineerNames: string[]
  choosenHour: string
  setChoosenHour: (value: string) => void
  totalPrice: number
  inspectionDate: InspectionDate
  setInspectionDate: (value: InspectionDate) => void
  directionPrice: number
  setDirectionPrice: (value: number) => void
}

const getUniqueEngineerNames = (inspections: Inspections[]): string[] => {
  const allNames = inspections.flatMap((inspection) =>
    inspection.engineer.map((eng) => eng.name)
  )
  return Array.from(new Set(allNames))
}

const calculateTotalPrice = (inspections: Inspections[]): number => {
  return inspections.reduce(
    (total, inspection) => total + (inspection.price || 0),
    0
  )
}

export const useBearStore = create<Store>((set) => ({
  lang: 'es-CR',
  setLang: (value) => set((state) => ({ lang: (state.lang = value) })),
  blogInput: '',
  setBlogInput: (value) =>
    set((state) => ({ blogInput: (state.blogInput = value) })),
  blogLabel: '',
  setBlogLabel: (value) =>
    set((state) => ({ blogLabel: (state.blogLabel = value) })),
  blogList: '',
  setBlogList: (value) =>
    set((state) => ({ blogList: (state.blogList = value) })),
  blogAlpha: '',
  setBlogAlpha: (value) =>
    set((state) => ({ blogAlpha: (state.blogAlpha = value) })),
  inspections: [],
  setInspections: (value) =>
    set((state) => {
      const updatedInspections = [...state.inspections, value]
      const uniqueEngineerNames = getUniqueEngineerNames(updatedInspections)
      const totalPrice = calculateTotalPrice(updatedInspections)
      return {
        inspections: updatedInspections,
        uniqueEngineerNames,
        totalPrice,
      }
    }),
  removeInspection: (index) =>
    set((state) => {
      const updatedInspections = state.inspections.filter((_, i) => i !== index)
      const uniqueEngineerNames = getUniqueEngineerNames(updatedInspections)
      const totalPrice = calculateTotalPrice(updatedInspections)
      return {
        inspections: updatedInspections,
        uniqueEngineerNames,
        totalPrice,
      }
    }),
  updateInspectionChoosen: (index, choosen) =>
    set((state) => {
      const updatedInspections = state.inspections.map((inspection, i) =>
        i === index ? { ...inspection, choosen } : inspection
      )
      const uniqueEngineerNames = getUniqueEngineerNames(updatedInspections)
      const totalPrice = calculateTotalPrice(updatedInspections)
      return {
        inspections: updatedInspections,
        uniqueEngineerNames,
        totalPrice,
      }
    }),
  selectedDirection: {},
  setSelectedDirection: (direction) =>
    set(() => ({
      selectedDirection: direction,
    })),
  uniqueEngineerNames: [],
  choosenHour: '1:20 p.m.',
  setChoosenHour: (value) => set({ choosenHour: value }),
  totalPrice: 0,
  inspectionDate: { en: '', es: '' },
  setInspectionDate: (value) =>
    set({
      inspectionDate: value,
    }),
  directionPrice: 0,
  setDirectionPrice: (value) => set({ directionPrice: value }),
}))
