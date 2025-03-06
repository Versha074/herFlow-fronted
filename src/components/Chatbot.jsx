// Frontend (Chatbot.jsx)
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { getCycleByUserId } from "../api/cycleApi";
// import { getDecodedToken } from "../utils/auth";

export default function Chatbot() {
    const getDecodedToken = () => {
        try {
            // Check if token exists in local storage (common approach)
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");
            console.log(token)
            if (!token) {
                console.warn("No token found in storage");
                return null;
            }

            // Decode the token
            const decodedToken = jwtDecode(token);
            console.log(decodedToken);
            // Validate token expiration
            const currentTime = Date.now() / 1000; // Convert to seconds
            if (decodedToken.exp && decodedToken.exp < currentTime) {
                console.warn("Token has expired");
                localStorage.removeItem("token"); // Clear expired token
                return null;
            }

            return decodedToken;
        } catch (error) {
            console.error("Token decoding failed:", error);
            return null;
        }
    };
    const [cycleData, setCycleData] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isSpeechSupported, setIsSpeechSupported] = useState(true);
    const recognition = useRef(null);
    const token = getDecodedToken();
    const userId = token?.id;

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

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                // Fetch chat history
                const chatResponse = await axios.get(`http://localhost:5000/api/chat/history/${userId}`);
                setMessages(chatResponse.data);

                // Fetch cycle data
                const cycleResponse = await getCycleByUserId(userId);
                setCycleData(cycleResponse);
            } catch (error) {
                console.error("Initial data load error:", error);
                setMessages([{
                    text: "Welcome! I can help with cycle-related queries. Please ensure your cycle data is updated.",
                    sender: "bot"
                }]);
            }
        };

        if (userId) fetchInitialData();
    }, [userId]);
    const toggleMaximize = () => setIsMaximized(!isMaximized);
    const toggleChat = () => {
        setIsOpen(!isOpen);
        if (!isOpen) setIsMaximized(false);
    };

    const sendMessage = async (messageText) => {
        if (!messageText.trim() || !userId) return;

        const userMessage = { text: messageText, sender: "user" };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        const cycleData = await getCycleByUserId(userId);
        console.log(cycleData)

        try {
            const response = await axios.post("http://localhost:5000/api/chat/start", {
                userId,
                message: messageText,
                cycleData // Send cycle data with the message
            });
            setMessages(response.data.messages);
        } catch (error) {
            console.error("Chat error:", error);
            const errorMessage = {
                text: "I'm having trouble responding right now. Please try again later.",
                sender: "bot"
            };
            setMessages(prev => [...prev, errorMessage]);
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


    // Rest of the component remains the same as provided in the question
    // Only update the sendMessage function and add cycle data handling

    return (
        // Existing JSX structure remains the same
        <div className="fixed bottom-5 right-5 z-50">
            <button
                onClick={toggleChat}
                className="bg-pink-400 text-white p-4 rounded-full shadow-lg hover:bg-pink-500 transition-all"
            >
                💬
            </button>

            {isOpen && (
                <div
                    className={`bg-pink-100 shadow-lg rounded-lg fixed bottom-20 right-5 flex flex-col border border-pink-300 transition-all ${isMaximized ? "w-[80vw] h-[80vh]" : "w-80 h-96"
                        }`}
                >
                    <div className="bg-pink-400 text-white p-3 font-semibold text-center rounded-t-lg flex justify-between items-center">
                        <span>Pookies AI</span>
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
                                className={`p-2 my-1 max-w-[80%] rounded-lg ${msg.sender === "bot"
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
                                className={`ml-2 p-2 rounded-lg ${isListening ? "bg-red-500" : "bg-pink-400"
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