"use client";
import React, { useState } from "react";
import Image from "next/image";
import Navbar from "./components/Navbar";
import DonateForm from "./components/DonateForm";
import NGOForm from "./components/NGOForm";
import Success from "./components/Success";

export default function Page() {
  const [selectedOption, setSelectedOption] = useState(null); // 'donate' | 'ngo' | null
  const [submitted, setSubmitted] = useState(null);

  const handleDonateSubmit = (payload) => setSubmitted({ type: "donate", data: payload });
  const handleNgoSubmit = (data) => setSubmitted({ type: "ngo", data });
  const reset = () => {
    setSelectedOption(null);
    setSubmitted(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Navbar onDonate={() => setSelectedOption("donate")} onRegister={() => setSelectedOption("ngo")} />

      <main className="flex items-center justify-center p-6">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-8">
          {/* Header: logo + short intro */}
          <div className="flex items-center gap-4 mb-6">
            <Image src="/logo.svg" alt="FoodShare logo" width={56} height={56} />
            <div>
              <h1 className="text-2xl font-bold text-green-800">FoodShare</h1>
              <p className="text-gray-600">Connect surplus food from events and organizations to people in need — fast, safe, and community-driven.</p>
            </div>
          </div>

          {/* role choice removed from initial view — use Navbar buttons to open forms */}

          {selectedOption === "donate" && !submitted && (
            <DonateForm onSubmit={handleDonateSubmit} onBack={() => setSelectedOption(null)} />
          )}

          {selectedOption === "ngo" && !submitted && (
            <NGOForm onSubmit={handleNgoSubmit} onBack={() => setSelectedOption(null)} />
          )}

          {submitted ? (
            <Success submitted={submitted} onDone={reset} />
          ) : null}
        </div>
      </main>
    </div>
  );
}

