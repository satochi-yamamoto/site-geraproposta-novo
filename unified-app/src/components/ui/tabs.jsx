import React, { createContext, useContext, forwardRef } from 'react'

const TabsContext = createContext()

const Tabs = forwardRef(({ value, onValueChange, className = '', children, ...props }, ref) => {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div ref={ref} className={className} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
})

const TabsList = forwardRef(({ className = '', ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500 ${className}`}
      {...props}
    />
  )
})

const TabsTrigger = forwardRef(({ className = '', value, children, ...props }, ref) => {
  const context = useContext(TabsContext)
  const isActive = context?.value === value

  const handleClick = () => {
    context?.onValueChange?.(value)
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
        isActive 
          ? 'bg-white text-gray-950 shadow-sm' 
          : 'hover:bg-gray-200 hover:text-gray-900'
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  )
})

const TabsContent = forwardRef(({ className = '', value, children, ...props }, ref) => {
  const context = useContext(TabsContext)
  const isActive = context?.value === value

  if (!isActive) return null

  return (
    <div
      ref={ref}
      className={`mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
})

Tabs.displayName = 'Tabs'
TabsList.displayName = 'TabsList'
TabsTrigger.displayName = 'TabsTrigger'
TabsContent.displayName = 'TabsContent'

export { Tabs, TabsList, TabsTrigger, TabsContent }
