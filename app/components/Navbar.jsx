"use client";
import React, { useState } from "react";
import Image from "next/image";
import Chatbot from "./Chatbot"; // import your chatbot component

export default function Navbar({ onDonate, onRegister }) {
  const [showChatbot, setShowChatbot] = useState(false);

  const toggleChatbot = () => setShowChatbot(!showChatbot);

  return (
    <>
      <nav className="w-full bg-white/50 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            <div className="flex items-center gap-3 cursor-pointer" onClick={toggleChatbot}>
              <Image src="/logo.svg" alt="FoodShare" width={44} height={44} />
              <div>
                <div className="text-lg font-bold text-green-800">FoodShare</div>
                <div className="text-xs text-gray-500">
                  Share a meal, spread a smile — together we can turn leftovers into hope.
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onRegister}
                className="hidden sm:inline-block px-3 py-1 rounded-md border text-sm text-green-700 hover:bg-green-50"
              >
                Register NGO
              </button>
              <button
                onClick={onDonate}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow"
              >
                Donate
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Chatbot modal */}
      {showChatbot && (
        <div className="fixed bottom-5 right-5 w-80 h-96 bg-white border shadow-lg rounded-lg z-50">
          <Chatbot />
        </div>
      )}
    </>
  );
}
