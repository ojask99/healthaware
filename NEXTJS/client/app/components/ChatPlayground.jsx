import { useState, useRef } from 'react';

export default function ChatPlayground() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [file, setFile] = useState(null);
    const [loadingMessage, setLoadingMessage] = useState(null);
    const fileInputRef = useRef(null);

    const cleanResponse = (response) => {
        let cleanedResponse = response
            .replace(/(?:\r\n|\r|\n)/g, '<br>')
            .replace(/\s{2,}/g, ' ')
            .trim();
        cleanedResponse = cleanedResponse
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/(\d+\.?\d*)\s*([a-zA-Z%]+)/g, '$1 <span class="text-gray-600">$2</span>');
        return cleanedResponse;
    };

    const handleSend = async () => {
        if (input.trim()) {
            const newMessages = [...messages, { text: input, sender: 'user', file: file ? URL.createObjectURL(file) : null }];
            setMessages(newMessages);
            setInput('');
            setLoadingMessage({ sender: 'ai', text: 'Loading...' });

            const formData = new FormData();
            if (file) {
                formData.append('pdf', file);
            }
            formData.append('text', input);

            try {
                const response = await fetch('http://localhost:5000/chatbot', {
                    method: 'POST',
                    body: formData,
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                const cleanedMessage = cleanResponse(data.response);
                setMessages([...newMessages, { text: cleanedMessage, sender: 'ai' }]);
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingMessage(null);
            }
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        fileInputRef.current.value = '';
    };

    const handleFileCancel = () => {
        setFile(null);
        fileInputRef.current.value = '';
    };

    return (
        <div className="flex flex-col h-full bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
            <div className="flex items-center p-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-xl font-semibold shadow-md rounded-t-lg">
    <div
        className="cursor-pointer mr-3 p-2 rounded-full bg-white text-blue-700 w-8 h-8 flex items-center justify-center hover:bg-blue-200 transition-all duration-200 transform hover:scale-110"
        onClick={() => window.location.reload()}
    >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
    </div>
    <p className="m-0 flex-grow text-center">Chat with AI</p>
</div>

            <div className="flex-1 p-4 overflow-y-auto">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-3`}>
                        <div
                            className={`p-3 rounded-lg text-sm max-w-[70%] ${msg.sender === 'user' ? 'bg-blue-200 text-blue-800' : 'bg-gray-200 text-gray-800'}`}
                        >
                            <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                            {msg.file && (
                                <div className="mt-2">
                                    <a href={msg.file} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                        View PDF
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {loadingMessage && (
                    <div className="flex justify-start mb-3">
                        <div className="p-3 rounded-lg text-sm max-w-[70%] bg-gray-200 text-gray-800">
                            {loadingMessage.text}
                        </div>
                    </div>
                )}
            </div>
            <div className="p-4 bg-gray-100 border-t border-gray-200">
                <div className="flex flex-col items-start gap-2">
                    <div className="flex items-center gap-2 w-full">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            className="flex-1 p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder:text-gray-500"
                            placeholder="Type a message..."
                        />

                        <label className="relative inline-block">
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={handleFileChange}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                ref={fileInputRef}
                            />
                            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-300 transition-colors duration-300">
                                Choose File
                            </button>
                        </label>
                        <button
                            onClick={handleSend}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Send
                        </button>
                    </div>
                    {file && (
                        <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                            <p className="truncate">{file.name}</p>
                            <button onClick={handleFileCancel} className="text-red-600 hover:underline">Cancel</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
