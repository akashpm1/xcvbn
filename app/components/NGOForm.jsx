"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function NGOForm({ onSubmit, onBack }) {
  const [data, setData] = useState({ organization: "", contact: "", location: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Basic validation
    if (!data.organization || !data.contact || !data.location) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/ngo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok) throw new Error(json?.error || "Failed to register NGO");

      // Pass response to parent
      if (onSubmit) onSubmit(json);
    } catch (err) {
      setError(err.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <h2 className="text-2xl font-semibold text-green-800 mb-4">Register Your NGO</h2>

      <form onSubmit={submit} className="space-y-4">
        <label className="block text-sm text-gray-600">
          Organization Name
          <input
            required
            placeholder="e.g. Helping Hands Foundation"
            value={data.organization}
            onChange={(e) => setData({ ...data, organization: e.target.value })}
            className="w-full border p-3 rounded mt-1"
            disabled={loading}
          />
        </label>

        <label className="block text-sm text-gray-600">
          Contact
          <input
            required
            placeholder="Email or phone"
            value={data.contact}
            onChange={(e) => setData({ ...data, contact: e.target.value })}
            className="w-full border p-3 rounded mt-1"
            disabled={loading}
          />
        </label>

        <label className="block text-sm text-gray-600">
          Location
          <input
            required
            placeholder="City, State"
            value={data.location}
            onChange={(e) => setData({ ...data, location: e.target.value })}
            className="w-full border p-3 rounded mt-1"
            disabled={loading}
          />
        </label>

        {error && <div className="text-sm text-red-600">{error}</div>}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 rounded bg-gray-100"
            disabled={loading}
          >
            Back
          </button>
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="px-4 py-2 rounded bg-gradient-to-r from-green-600 to-emerald-500 text-white"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register NGO"}
          </motion.button>
        </div>
      </form>
    </motion.section>
  );
}
