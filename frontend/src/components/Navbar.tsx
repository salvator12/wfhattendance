import React from 'react';
import { LogOut, User as UserIcon } from 'lucide-react';

interface NavbarProps {
  title: string;
  userName: string;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ title, userName, onLogout }) => {
    return(
        <nav className='bg-white shadow-sm border-b px-4 sm:px-8 py-3
        sm:py-4 flex justify-between items-center sticky top-0 z-10
        '>
            <h1 className='text-base sm:text-xl font-bold text-gray-900 tracking-light truncate'>
                {title}
            </h1>
            <div className="flex items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium
                    text-gray-600 bg-gray-100 sm:bg-transparent px-2.5 py-1 sm:p-0 rounded-full
                ">
                    <UserIcon size={14} className='sm:hidden text-gray-500'/>
                    <span className='truncate max-w-27.5 sm:max-w-none'>Halo, {userName}</span>
                </div>
                <button
                    onClick={onLogout}
                    className='flex items-center gap-1 text-xs sm:text-sm text-red-600 hover:text-red-700
                    font-semibold px-2.5 py-1.5 rounded-lg hover:bg-red-50 transition'
                >
                    <LogOut size={16}/>
                    <span className='hidden sm:inline'></span>
                </button>
            </div>
        </nav>
    )
}