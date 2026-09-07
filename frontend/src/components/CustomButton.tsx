import React, { type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    variant?: 'primary' | 'success' | 'danger'
    isLoading?: boolean
}

export const CustomButton: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    isLoading = false,
    disabled,
    className = '',
    type='submit',
    ...props
}) => {
    const variantStyles = {
        primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-100',
        success: 'bg-green-600 hover:bg-green-700 text-white shadow-green-100',
        danger: 'bg-red-600 hover:bg-red-700 text-white shadow-red-100',
    }

    return (
        <button
            type={type} 
            disabled={disabled || isLoading}
            className={`w-full py:3 sm:py-2.5 px-4 rounded-xl sm:rounded-lg 
            font-semibold text-sm sm:text-base shadow-sm transition duration-200
            active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none ${variantStyles[variant]} ${className}
            `}
            {...props}
        >
        {isLoading ? 'Processing...' : children}
        </button>
    )
}