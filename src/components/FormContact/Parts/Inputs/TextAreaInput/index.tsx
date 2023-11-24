import React from 'react'

interface Props {
  error?: string
  name: string
  value: string
  placeholder: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}
const TextAreaInput = (props: Props) => {
  return (
    <textarea
      name={props.name}
      className={`opacity-60 bg-[#2c2d2f] text-slate-200 placeholder-white rounded-lg ${props.error} w-[92%] md:w-[102%] resize-none p-4 text-2xl md:text-3xl border-transparent focus:border-transparent focus:ring-0`}
      cols={30}
      rows={10}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
    ></textarea>
  )
}

export default TextAreaInput
