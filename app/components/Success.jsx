"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Success({ submitted, onDone }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="py-8">
      <div className="mx-auto w-40 h-40 rounded-full bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center shadow-md">
        <motion.svg initial={{ rotate: -45 }} animate={{ rotate: 0 }} className="w-20 h-20 text-green-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <motion.path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </motion.svg>
      </div>

      <div className="text-center mt-6">
        <h3 className="text-xl font-semibold text-green-800">All set</h3>
        {submitted.type === "donate" ? (
          <div className="space-y-2">
            <p className="text-gray-700 mt-2">Thanks — your donation by <strong>{submitted.data.donation?.name || submitted.data.name}</strong> has been noted.</p>
            {submitted.data.ngo ? (
              <div className="text-gray-700">We will contact <strong>{submitted.data.ngo.organization}</strong> at <strong>{submitted.data.ngo.contact}</strong>.</div>
            ) : null}
          </div>
        ) : (
          <p className="text-gray-700 mt-2">Organization <strong>{submitted.data.organization}</strong> is now registered.</p>
        )}

        <div className="mt-5">
          <button onClick={onDone} className="px-4 py-2 rounded bg-green-600 text-white">Done</button>
        </div>
      </div>
    </motion.div>
  );
}
