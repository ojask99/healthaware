'use client';
import { useState } from 'react';
import ChatPlayground from './ChatPlayground';

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleChat = () => setIsOpen(!isOpen);

    return (
        <div>
            {/* Button to toggle chat */}
            <div className="fixed bottom-5 right-5 z-50">
                <div className="flex items-center justify-center bg-blue-500 p-3 rounded-full cursor-pointer" onClick={toggleChat}>
                    <svg
                        stroke="white"
                        fill="white"
                        strokeWidth="0"
                        viewBox="0 0 1024 1024"
                        height="24px"
                        width="24px"
                        xmlns="http://www.w3.org/2000/svg"
                        className="transform rotate-90"
                    >
                        <path d="M877.1 238.7L770.6 132.3c-13-13-30.4-20.3-48.8-20.3s-35.8 7.2-48.8 20.3L558.3 246.8c-13 13-20.3 30.5-20.3 48.9 0 18.5 7.2 35.8 20.3 48.9l89.6 89.7a405.46 405.46 0 0 1-86.4 127.3c-36.7 36.9-79.6 66-127.2 86.6l-89.6-89.7c-13-13-30.4-20.3-48.8-20.3a68.2 68.2 0 0 0-48.8 20.3L132.3 673c-13 13-20.3 30.5-20.3 48.9 0 18.5 7.2 35.8 20.3 48.9l106.4 106.4c22.2 22.2 52.8 34.9 84.2 34.9 6.5 0 12.8-.5 19.2-1.6 132.4-21.8 263.8-92.3 369.9-198.3C818 606 888.4 474.6 910.4 342.1c6.3-37.6-6.3-76.3-33.3-103.4zm-37.6 91.5c-19.5 117.9-82.9 235.5-178.4 331s-213 158.9-330.9 178.4c-14.8 2.5-30-2.5-40.8-13.2L184.9 721.9 295.7 611l119.8 120 .9.9 21.6-8a481.29 481.29 0 0 0 285.7-285.8l8-21.6-120.8-120.7 110.8-110.9 104.5 104.5c10.8 10.8 15.8 26 13.3 40.8z"></path>
                    </svg>
                    <p className="ml-2 text-white">Chat with AI</p>
                </div>
            </div>

            {/* Modal and backdrop */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-40">
                    <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-md" onClick={toggleChat}></div>
                    <div className="relative bg-white rounded-lg shadow-lg w-[90%] h-[80%] max-w-[800px]">
                        <ChatPlayground />
                    </div>
                </div>
            )}
        </div>
    );
}
