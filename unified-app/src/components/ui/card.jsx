import { forwardRef } from 'react'

const Card = forwardRef(({ className = '', ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}
      {...props}
    />
  )
})

const CardHeader = forwardRef(({ className = '', ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`flex flex-col space-y-1.5 p-6 ${className}`}
      {...props}
    />
  )
})

const CardTitle = forwardRef(({ className = '', ...props }, ref) => {
  return (
    <h3
      ref={ref}
      className={`text-lg font-semibold leading-none tracking-tight text-gray-900 ${className}`}
      {...props}
    />
  )
})

const CardDescription = forwardRef(({ className = '', ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={`text-sm text-gray-600 ${className}`}
      {...props}
    />
  )
})

const CardContent = forwardRef(({ className = '', ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`p-6 pt-0 ${className}`}
      {...props}
    />
  )
})

const CardFooter = forwardRef(({ className = '', ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`flex items-center p-6 pt-0 ${className}`}
      {...props}
    />
  )
})

Card.displayName = 'Card'
CardHeader.displayName = 'CardHeader'
CardTitle.displayName = 'CardTitle'
CardDescription.displayName = 'CardDescription'
CardContent.displayName = 'CardContent'
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
