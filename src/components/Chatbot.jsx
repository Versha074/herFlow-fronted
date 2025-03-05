import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false); // New state for maximization
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const userId = "67c5e2852a40474f71166da0"; // Replace with a unique user identifier

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

    // Function to toggle chat visibility
    const toggleChat = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setIsMaximized(false); // Reset maximization when opening
        }
    };

    // Function to toggle maximization
    const toggleMaximize = () => {
        setIsMaximized(!isMaximized);
    };

    // Function to handle user input and start chat with backend
    const startChat = async () => {
        if (!input.trim()) return;

        const userMessage = { text: input, sender: "user" };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:5000/api/chat/start", {
                userId,
                message: input,
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

    // Handle "Enter" key press
    const handleKeyPress = (e) => {
        if (e.key === "Enter") startChat();
    };

    return (
        <div className="fixed bottom-5 right-5 z-50">
            {/* Chat Button */}
            <button
                onClick={toggleChat}
                className="bg-pink-400 text-white p-4 rounded-full shadow-lg hover:bg-pink-500 transition-all"
            >
                💬
            </button>

            {/* Chat Box */}
            {isOpen && (
                <div
                    className={`bg-pink-100 shadow-lg rounded-lg fixed bottom-20 right-5 flex flex-col border border-pink-300 transition-all ${
                        isMaximized ? "w-[80vw] h-[80vh]" : "w-80 h-96"
                    }`}
                >
                    {/* Header with Maximize/Minimize Buttons */}
                    <div className="bg-pink-400 text-white p-3 font-semibold text-center rounded-t-lg flex justify-between items-center">
                        <span>Chat with us!</span>
                        <div>
                            <button
                                onClick={toggleMaximize}
                                className="text-white hover:text-gray-200 mx-2"
                            >
                                {isMaximized ? "🗗" : "🗖"} {/* Maximize/Minimize icons */}
                            </button>
                            <button
                                onClick={toggleChat}
                                className="text-white hover:text-gray-200"
                            >
                                ✖️ {/* Close button */}
                            </button>
                        </div>
                    </div>

                    {/* Chat Messages */}
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

                    {/* Input Area */}
                    <div className="flex border-t p-2 bg-pink-100">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Type a message..."
                            className="flex-1 p-2 border rounded-lg bg-white text-black"
                        />
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