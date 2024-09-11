"use client";
import * as React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 pt-24 text-white bg-[url('https://i.pinimg.com/564x/07/05/0c/07050c71b5cd7160ec9d07033b8f9b1f.jpg')] bg-no-repeat bg-cover bg-center">
      <h1 className="text-4xl font-bold mb-10 mt-12">Welcome to Health Aware!</h1>
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
            <h2 className="text-2xl font-semibold mb-4">Casual User</h2>
            <p className="mb-6 text-sky-100">
              Welcome to your personal medical assistant! Our chatbot helps you interpret your medical reports and answer your medical doubts with ease. Simply upload your reports, ask any medical questions, and receive quick, reliable answers. Designed for ease of use and backed by medical professionals, Health Aware provides accurate information and insights to help you understand your health better. Available 24/7, it's your go-to resource for maintaining health, managing conditions, and staying informed. Start now by clicking on the chatbot icon, uploading your reports, and typing your questions.
            </p>
          </div>
          <Link href="/casual" className="self-start mt-auto">
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
              Welcome to our advanced diagnostic tool for detecting tuberculosis bacilli, kidney stones, and leprosy. Designed for healthcare professionals, our tool provides precise and accurate analysis to aid in early diagnosis and treatment. Upload medical images and reports to receive detailed diagnostic insights. Combining cutting-edge technology with medical expertise, HealthHelper Enterprise ensures reliable results and improved patient outcomes. Enhance your diagnostic capabilities with our user-friendly, 24/7 service. Start using HealthHelper Enterprise today to transform your diagnostic processes.
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
