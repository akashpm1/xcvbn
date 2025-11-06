"use client";
import React from "react";
import { motion } from "framer-motion";

const card = {
  hidden: { opacity: 0, y: 12 },
  enter: { opacity: 1, y: 0 },
  hover: { scale: 1.03, translateY: -4 },
};

export default function RoleChoice({ onSelect }) {
  return (
    <section className="text-center">
      <h1 className="text-3xl font-bold text-green-800 mb-3">How would you like to participate?</h1>
      <p className="text-gray-600 mb-6">Choose a role below to get started.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.button
          onClick={() => onSelect("donate")}
          initial="hidden"
          animate="enter"
          whileHover="hover"
          variants={card}
          className="p-6 rounded-xl bg-gradient-to-br from-emerald-50 to-white border border-gray-100 shadow-md text-left hover:shadow-xl transition"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white rounded-full shadow-sm">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h4l3 9 4-18 3 9h4" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-green-700">Donate Food</h2>
              <p className="text-gray-600 mt-1">Share surplus meals from events and help people nearby.</p>
            </div>
          </div>
        </motion.button>

        <motion.button
          onClick={() => onSelect("ngo")}
          initial="hidden"
          animate="enter"
          whileHover="hover"
          variants={card}
          className="p-6 rounded-xl bg-gradient-to-br from-emerald-50 to-white border border-gray-100 shadow-md text-left hover:shadow-xl transition"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white rounded-full shadow-sm">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-green-700">Register NGO</h2>
              <p className="text-gray-600 mt-1">Add your organization to receive food donations and volunteers.</p>
            </div>
          </div>
        </motion.button>
      </div>
    </section>
  );
}
