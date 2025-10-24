import { useState } from 'react'

export default function Collapse({ title, children, isItToBeOpen=true }) {
  const [isOpen, setIsOpen] = useState(isItToBeOpen)

  const toggle = () => setIsOpen(!isOpen)

  return (
    <div className="border rounded mb-4 shadow">
      <div
        className="cursor-pointer flex justify-between items-center p-4 bg-blue-600 text-white rounded-t"
        onClick={toggle}
      >
        <h2 className="text-lg font-bold">{title}</h2>
        <span>{isOpen ? '−' : '+'}</span>
      </div>
      {isOpen && <div className="p-4 bg-white">{children}</div>}
    </div>
  )
}
