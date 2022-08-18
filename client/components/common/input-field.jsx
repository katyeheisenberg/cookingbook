import React from 'react'

const Input = ({
  id,
  label,
  onChange,
  onKeyPress,
  value = '',
  type = 'text'
}) => {
  const submit = (e) => {
    if (e.code === 'Enter' || e.which === 13) {
      onKeyPress()
    }
  }
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="font-semibold text-xs ml-2">
        {label}
      </label>
      <input
        id={id}
        value={value}
        type={type}
        placeholder="product"
        className="pl-7 pr-12 sm:text-sm rounded-full border border-green-300 placeholder-white antialiased bg-gradient-to-tl from-green-500 to-teal-800 outline-inherit text-emerald-200 font-mono font-semibold"
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={(event) => submit(event)}
      />
    </div>
  )
}

export default Input
