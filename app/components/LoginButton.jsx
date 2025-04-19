'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/providers/AuthProvider';

const LoginButton = () => {
    const router = useRouter();
    const { user } = useAuth();
  return (
    <div>
        {user ? (
         <div 
         className="flex items-center justify-center w-10 h-10 rounded-full bg-[#2a2a2a] text-[#b0b0b0] font-medium cursor-pointer hover:bg-gray-700 transition-colors"
         title={user.email}
       >
         {user.email?.[0].toUpperCase()}
       </div>
        ) : (
       <button
            onClick={() => router.push('/login')}
            className="px-4 py-2 text-md font-medium text-white  rounded-lg  focus:outline-1 focus:ring-2 focus:ring-[#b0b0b0] focus:ring-offset-2 cursor-pointer"
          >
            Login
          </button>
        )}
    </div>
  )
}

export default LoginButton
