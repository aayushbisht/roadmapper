'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SidebarToggle() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    const sidebar = document.querySelector('.sidebar');
    const main = document.querySelector('main');
    
    if (sidebar && main) {
      if (isSidebarOpen) {
        sidebar.classList.add('hidden');
        main.classList.remove('ml-80');
      } else {
        sidebar.classList.remove('hidden');
        main.classList.add('ml-80');
      }
    }
  };

  return (
    <button
      onClick={toggleSidebar}
      className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#2a2a2a] text-[#b0b0b0] hover:bg-[#303030] transition-colors cursor-pointer"
      title={isSidebarOpen ? "Hide sidebar" : "Show sidebar"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        {isSidebarOpen ? (
          <path
            fillRule="evenodd"
            d="M15.707 4.293a1 1 0 010 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        ) : (
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        )}
      </svg>
    </button>
  );
} 