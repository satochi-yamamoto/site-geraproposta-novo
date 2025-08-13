import React, { forwardRef } from 'react'
import { ChevronDown } from 'lucide-react'

const Select = forwardRef(({ children, value, onValueChange, ...props }, ref) => {
  return (
    <div className="relative">
      {children}
    </div>
  )
})

const SelectTrigger = forwardRef(({ className = '', children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={`flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  )
})

const SelectContent = forwardRef(({ className = '', children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`absolute top-full left-0 z-50 w-full mt-1 rounded-md border border-gray-300 bg-white shadow-lg ${className}`}
      {...props}
    >
      {children}
    </div>
  )
})

const SelectItem = forwardRef(({ className = '', children, value, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`relative flex cursor-pointer select-none items-center rounded-sm py-2 px-3 text-sm text-gray-900 hover:bg-gray-100 focus:bg-gray-100 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
})

const SelectValue = forwardRef(({ placeholder, ...props }, ref) => {
  return (
    <span ref={ref} className="text-gray-500" {...props}>
      {placeholder}
    </span>
  )
})

Select.displayName = 'Select'
SelectTrigger.displayName = 'SelectTrigger'
SelectContent.displayName = 'SelectContent'
SelectItem.displayName = 'SelectItem'
SelectValue.displayName = 'SelectValue'

export { Select, SelectTrigger, SelectContent, SelectItem, SelectValue }
