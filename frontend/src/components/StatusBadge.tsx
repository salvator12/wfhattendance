import React from 'react'

interface StatusBadgeProps {
    status: 'PENDING' | 'APPROVED' | 'REJECTED'
}

export const StatusBadge: React.FC<StatusBadgeProps> =({ status }) => {
    const styles = {
        PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-300',
        APPROVED: 'bg-green-100 text-green-800 border-green-300',
        REJECTED: 'bg-red-100 text-red-800 border-red-300'
    }

    return (
        <span
        className={`inline-flex items-center px-2.5 py-0.5 
        sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs 
        font-semibold border ${styles[status]}`}
        >
            {status}
        </span>
    )
}