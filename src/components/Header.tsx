"use client";

import { useState } from "react";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would filter products or update URL parameters
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-md border-b border-gray-200/50 shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 py-3 md:py-5 flex flex-col items-center">
        
        {/* Logo and Channel Info */}
        <div className="flex flex-col items-center mb-3 md:mb-4">
          <div className="text-2xl md:text-3xl font-bold tracking-tight text-primary flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform duration-300">
            <span className="bg-primary text-white p-1 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 md:w-8 md:h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.809c0-.66-.262-1.29-.728-1.757l-5.35-5.35a2.5 2.5 0 00-3.536 0L2.09 8.052c-.466.467-.728 1.097-.728 1.757V21m19.36 0h-3.64m0 0V10.5M10.5 21v-7.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21" />
              </svg>
            </span>
            Premium Finds
          </div>
          <p className="text-xs md:text-sm text-gray-500 font-medium mt-1">@premiumfinds</p>
        </div>

        {/* Search Section */}
        <form 
          onSubmit={handleSearch}
          className="w-full md:w-[900px] max-w-full relative group"
        >
          <input 
            type="text" 
            placeholder="Search Products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-3 md:py-4 pl-5 pr-14 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 text-sm md:text-base group-hover:shadow-md"
          />
          <button 
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
            aria-label="Search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
        </form>

      </div>
    </header>
  );
}
