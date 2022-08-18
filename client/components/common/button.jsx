import React from 'react'

const Button = ({ name, onClick }) => {
  return (
    <button
      type="button"
      className="inline-block px-6 py-2.5 mt-1 ml-2 bg-green-900 text-white antialiased font-mono font-semibold text-sm leading-tight uppercase rounded-md shadow-md hover:bg-teal-600 hover:shadow-lg focus:bg-emerald-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-teal-500 active:shadow-lg transition duration-150 ease-in-out"
      onClick={onClick}
    >
      {name}
    </button>
  )
}

export default Button
