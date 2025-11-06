"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const FAQ = [
  { question: "How can I donate food?", answer: "🍽️ You can donate food by filling out the donation form and selecting an NGO near you. Our system will connect you directly with the NGO!" },
  { question: "How do I register my NGO?", answer: "🏢 Click the 'Register NGO' button in the navbar and provide your NGO details including name, contact, and location." },
  { question: "What types of donations are accepted?", answer: "🥫 We accept cooked meals, packaged food, and non-perishable items like grains, canned food, and snacks." },
  { question: "Can I donate anonymously?", answer: "🤫 Yes! You can choose not to provide your personal details in the donation form. Your donation will still reach those in need." },
  { question: "How is the donation delivered?", answer: "🚚 Once you submit your donation, the selected NGO will contact you to arrange pickup or delivery." },
  { question: "who is anush?", answer: "ragigudda don" },
];

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { text: "👋 Hello! I am FoodShare Assistant. How can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, typing]);

  // 🎙️ Speak text using browser's speech synthesis
  const speakText = (text) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel(); // stop previous speech
      const utterance = new SpeechSynthesisUtterance(text.replace(/[\u{1F600}-\u{1F64F}]/gu, "")); // remove emojis
      utterance.lang = "en-US";
      utterance.rate = 1;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const sendMessage = (text, sender = "user") => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { text, sender }]);
    setInput("");

    if (sender === "user") {
      const matched = FAQ.find(
        (faq) => faq.question.toLowerCase() === text.toLowerCase()
      );

      setTyping(true);

      setTimeout(() => {
        setTyping(false);
        const botResponse = matched
          ? matched.answer
          : "❓ Sorry, I don't have an answer for that. Please select one of the questions below.";

        // 💬 Add bot message
        setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);
        speakText(botResponse); // 🔊 Speak the bot's reply
      }, 800);
    }
  };

  return (
    <div className="flex flex-col h-full w-full p-4 bg-white rounded-lg shadow-lg border border-gray-200">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto mb-2 space-y-3">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-end gap-2 ${
              msg.sender === "bot" ? "self-start" : "self-end flex-row-reverse"
            }`}
          >
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">
              {msg.sender === "bot" ? "🤖" : "🙋"}
            </div>
            <div
              className={`p-3 rounded-lg ${
                msg.sender === "bot"
                  ? "bg-green-100 text-green-900 max-w-[80%] break-words"
                  : "bg-green-600 text-white max-w-[70%] break-words"
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}

        {typing && (
          <div className="flex items-center gap-2 self-start">
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">
              🤖
            </div>
            <div className="p-2 bg-green-100 text-green-900 rounded-lg">Typing...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Predefined questions */}
      <div className="flex flex-wrap gap-2 mb-2">
        {FAQ.map((faq, idx) => (
          <button
            key={idx}
            className="px-3 py-1 text-sm bg-green-50 hover:bg-green-100 border border-green-200 rounded-md transition shadow-sm"
            onClick={() => sendMessage(faq.question)}
          >
            {faq.question}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Type your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
        />
        <button
          onClick={() => sendMessage(input)}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
