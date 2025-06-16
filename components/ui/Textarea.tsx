import { TextareaHTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
  resize?: boolean
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, resize = true, className, ...props }, ref) => {
    const textareaClasses = clsx(
      'w-full px-4 py-3 bg-gray-900 border rounded-lg text-white placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent',
      error 
        ? 'border-red-500 focus:ring-orange-500' 
        : 'border-gray-700 hover:border-gray-600',
      !resize && 'resize-none',
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
        <textarea
          ref={ref}
          className={textareaClasses}
          rows={4}
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

Textarea.displayName = 'Textarea'

export default Textarea