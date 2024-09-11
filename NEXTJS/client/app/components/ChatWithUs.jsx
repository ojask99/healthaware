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
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
                        <path d="M21 2H3C1.9 2 1 2.9 1 4v14c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zM19 16h-8v-2h8v2zm0-4h-12v-2h12v2zm0-4h-12V6h12v2z"/>
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
