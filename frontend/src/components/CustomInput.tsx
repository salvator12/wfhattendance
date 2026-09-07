import React, {type InputHTMLAttributes} from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    error?: string 
}

export const CustomInput: React.FC<InputProps> = ({ label, error, className = '', ...props}) => {
    return (
        <div className="w-full">
            <label className='block text-sm font-medium text-gray-700 mb-1'>
                {label}
            </label>
            <input
                className={`w-full px-3.5 sm:px-4 sm:py-2 text-base sm:text-sm
                border rounded-xl sm:rounded-lg focus:ring-2 focus:ring-blue-500 
                focus:outline-none transition duration-150 ${
                error ? 'border-red-500 bg-red-50/30' : 'border-gray-300'
                } ${className}`}
                {...props}
            />
            {error && <p className='text-red-500 text-xs mt-1'>{error}</p>}
        </div>
    )
}
