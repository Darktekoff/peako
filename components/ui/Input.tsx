import { InputHTMLAttributes, forwardRef, useState } from 'react'
import { clsx } from 'clsx'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    
    const inputClasses = clsx(
      'w-full px-4 py-3 bg-gray-900 border rounded-lg text-white placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent',
      error 
        ? 'border-red-500 focus:ring-red-500' 
        : 'border-gray-700 hover:border-gray-600',
      className
    )
    
    return (
      <div className="space-y-2">
        {label && (
          <label className={clsx(
            'block text-sm font-medium transition-colors',
            error ? 'text-red-400' : 'text-gray-300'
          )}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={inputClasses}
          onFocus={(e) => {
            setIsFocused(true)
            props.onFocus?.(e)
          }}
          onBlur={(e) => {
            setIsFocused(false)
            props.onBlur?.(e)
          }}
          {...props}
        />
        {(error || helperText) && (
          <p className={clsx(
            'text-sm',
            error ? 'text-red-400' : 'text-gray-500'
          )}>
            {error || helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input