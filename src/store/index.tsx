import { create } from 'zustand'
import { type Lan } from '@/types'

type mutationFunc = (value: string) => void
type alphabetic = '' | 'a' | 'z'
type mutationAlphabetic = (value: alphabetic) => void

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
}))
