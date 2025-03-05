import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isSpeechSupported, setIsSpeechSupported] = useState(true);
    const userId = "67c5e2852a40474f71166da0";
    const recognition = useRef(null);

    // Initialize speech recognition
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognition.current = new SpeechRecognition();
            recognition.current.continuous = false;
            recognition.current.interimResults = false;
            recognition.current.lang = 'en-US';

            recognition.current.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                sendMessage(transcript);
                setIsListening(false);
            };

            recognition.current.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                setIsListening(false);
            };

            recognition.current.onend = () => {
                setIsListening(false);
            };
        } else {
            setIsSpeechSupported(false);
        }
    }, []);

    // Fetch chat history on component mount
    useEffect(() => {
        const fetchChatHistory = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/chat/history/${userId}`);
                setMessages(response.data);
            } catch (error) {
                console.error("Error fetching chat history:", error);
            }
        };
        fetchChatHistory();
    }, [userId]);

    const toggleChat = () => {
        setIsOpen(!isOpen);
        if (!isOpen) setIsMaximized(false);
    };

    const toggleMaximize = () => setIsMaximized(!isMaximized);

    const sendMessage = async (messageText) => {
        if (!messageText.trim()) return;

        const userMessage = { text: messageText, sender: "user" };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:5000/api/chat/start", {
                userId,
                message: messageText,
            });
            setMessages(response.data.messages);
        } catch (error) {
            console.error("Error starting chat:", error);
            const errorMessage = { text: "Sorry, something went wrong. Please try again.", sender: "bot" };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    const startChat = () => sendMessage(input);

    const handleKeyPress = (e) => {
        if (e.key === "Enter") startChat();
    };

    const toggleListening = () => {
        if (isListening) {
            recognition.current.stop();
        } else {
            recognition.current.start();
        }
        setIsListening(!isListening);
    };

    return (
        <div className="fixed bottom-5 right-5 z-50">
            <button
                onClick={toggleChat}
                className="bg-pink-400 text-white p-4 rounded-full shadow-lg hover:bg-pink-500 transition-all"
            >
                💬
            </button>

            {isOpen && (
                <div
                    className={`bg-pink-100 shadow-lg rounded-lg fixed bottom-20 right-5 flex flex-col border border-pink-300 transition-all ${
                        isMaximized ? "w-[80vw] h-[80vh]" : "w-80 h-96"
                    }`}
                >
                    <div className="bg-pink-400 text-white p-3 font-semibold text-center rounded-t-lg flex justify-between items-center">
                        <span>Chat with us!</span>
                        <div>
                            <button
                                onClick={toggleMaximize}
                                className="text-white hover:text-gray-200 mx-2"
                            >
                                {isMaximized ? "🗗" : "🗖"}
                            </button>
                            <button
                                onClick={toggleChat}
                                className="text-white hover:text-gray-200"
                            >
                                ✖️
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 p-3 overflow-y-auto bg-pink-50">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`p-2 my-1 max-w-[80%] rounded-lg ${
                                    msg.sender === "bot"
                                        ? "bg-pink-400 text-white self-start"
                                        : "bg-pink-200 text-black self-end ml-auto"
                                }`}
                            >
                                {msg.text}
                            </div>
                        ))}
                        {loading && (
                            <div className="p-2 my-1 max-w-[80%] rounded-lg bg-pink-400 text-white self-start">
                                Typing...
                            </div>
                        )}
                    </div>

                    <div className="flex border-t p-2 bg-pink-100">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Type a message..."
                            className="flex-1 p-2 border rounded-lg bg-white text-black"
                        />
                        {isSpeechSupported && (
                            <button
                                onClick={toggleListening}
                                className={`ml-2 p-2 rounded-lg ${
                                    isListening ? "bg-red-500" : "bg-pink-400"
                                } text-white hover:bg-pink-500`}
                            >
                                🎤
                            </button>
                        )}
                        <button
                            onClick={startChat}
                            className="bg-pink-400 text-white px-4 py-2 rounded-lg ml-2 hover:bg-pink-500"
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}