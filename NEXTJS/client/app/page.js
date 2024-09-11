"use client";
import * as React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 text-white bg-[url('https://i.pinimg.com/564x/07/05/0c/07050c71b5cd7160ec9d07033b8f9b1f.jpg')] bg-no-repeat bg-cover bg-center">
      <h1 className="text-4xl font-bold mb-10">Welcome to Health Aware!</h1>
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* First Div */}
        <div 
          className="flex flex-col bg-sky-900/50 backdrop-blur-sm rounded-3xl p-6 hover:shadow-xl transition-shadow duration-300"
          style={{
            WebkitBoxShadow: '9px 16px 22px 0px rgba(0,0,0,0.75)',
            MozBoxShadow: '9px 16px 22px 0px rgba(0,0,0,0.75)',
            boxShadow: '9px 16px 22px 0px rgba(0,0,0,0.75)'
          }}
        >
          <div className="flex-grow">
            <h2 className="text-2xl font-semibold mb-4">Casual</h2>
            <p className="mb-6 text-sky-100">
              <strong>Lorem ipsum dolor sit amet,</strong> consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>
          <Link href="/tb" className="self-start mt-auto">
            <button className="rounded-full bg-sky-500 text-white hover:bg-sky-600 transition-colors py-2 px-6 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-green-300">
              Explore
            </button>
          </Link>
        </div>

        {/* Second Div */}
        <div 
          className="flex flex-col bg-sky-900/50 backdrop-blur-sm rounded-3xl p-6 hover:shadow-xl transition-shadow duration-300"
          style={{
            WebkitBoxShadow: '9px 16px 22px 0px rgba(0,0,0,0.75)',
            MozBoxShadow: '9px 16px 22px 0px rgba(0,0,0,0.75)',
            boxShadow: '9px 16px 22px 0px rgba(0,0,0,0.75)'
          }}
        >
          <div className="flex-grow">
            <h2 className="text-2xl font-semibold mb-4">Enterprise</h2>
            <p className="mb-6 text-sky-100">
              <strong>Lorem ipsum dolor sit amet,</strong> consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>
          <Link href="/enterprise" className="self-start mt-auto">
            <button className="rounded-full bg-sky-500 text-white hover:bg-sky-600 transition-colors py-2 px-6 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-green-300">
              Explore
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
