import React from 'react'

interface Props {
  error?: string
  type: 'text' | 'email' | 'tel'
  name: string
  value: string
  placeholder: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputField = (props: Props) => {
  return (
    <input
      className={`bg-[#2c2d2f] text-slate-200 placeholder-white opacity-60 rounded-lg ${props.error} p-6 mb-5 w-[90%] md:w-full text-2xl md:text-3xl border-transparent focus:border-transparent focus:ring-0`}
      type={props.type}
      name={props.name}
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.onChange}
    />
  )
}

export default InputField
