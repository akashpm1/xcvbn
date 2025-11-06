"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function DonateForm({ onSubmit, onBack }) {
  const [data, setData] = useState({ name: "", quantity: "", location: "" });
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredNGOs, setFilteredNGOs] = useState([]);
  const [selectedNGO, setSelectedNGO] = useState(null);
  const [allNgos, setAllNgos] = useState([]);

  // Fetch all NGOs from backend
  useEffect(() => {
    let mounted = true;
    fetch("/api/ngos")
      .then((res) => res.json())
      .then((data) => {
        if (mounted && Array.isArray(data)) setAllNgos(data);
      })
      .catch(console.error);
    return () => {
      mounted = false;
    };
  }, []);

  function handleLocationChange(value) {
    setData({ ...data, location: value });
    if (value.trim().length > 0) {
      const filtered = allNgos.filter((n) =>
        n.location.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredNGOs(filtered);
      setShowDropdown(filtered.length > 0);
    } else {
      setShowDropdown(false);
      setFilteredNGOs([]);
    }
  }

  function selectNGO(ngo) {
    setSelectedNGO(ngo);
    setData({ ...data, location: ngo.location });
    setShowDropdown(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!selectedNGO) return alert("Sucessfull.");

    // Trigger the parent handler
    onSubmit({ donation: data, ngo: selectedNGO });

    // ✅ Show success alert
    alert(
      `Thank you, ${data.name}! Your donation of ${data.quantity} has been submitted to ${selectedNGO.organization}.`
    );
  }

  function contactNGO() {
    if (!selectedNGO) return alert("Please select an NGO to contact.");
    const phoneNumber = selectedNGO.contact.replace(/\D/g, ""); // numeric only
    window.open(
      `https://wa.me/${phoneNumber}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <h2 className="text-2xl font-semibold text-green-800 mb-4">
        Donate Food
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-sm text-gray-600">
          Your name
          <input
            required
            placeholder="e.g. Priya Rao"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="w-full border p-3 rounded mt-1"
          />
        </label>

        <label className="block text-sm text-gray-600">
          Quantity
          <input
            required
            placeholder="e.g. 50 meals"
            value={data.quantity}
            onChange={(e) => setData({ ...data, quantity: e.target.value })}
            className="w-full border p-3 rounded mt-1"
          />
        </label>

        <label className="block text-sm text-gray-600 relative">
          Location
          <input
            required
            placeholder="City, State"
            value={data.location}
            onChange={(e) => handleLocationChange(e.target.value)}
            className="w-full border p-3 rounded mt-1"
          />

          {showDropdown && (
            <div className="absolute left-0 right-0 mt-1 bg-white border rounded shadow max-h-48 overflow-auto z-50">
              {filteredNGOs.map((ngo) => (
                <div
                  key={ngo.id}
                  className="p-3 hover:bg-gray-50 cursor-pointer"
                  onClick={() => selectNGO(ngo)}
                >
                  <div className="font-medium text-green-800">
                    {ngo.organization}
                  </div>
                  <div className="text-sm text-gray-600">{ngo.location}</div>
                </div>
              ))}
            </div>
          )}
        </label>

        {selectedNGO && (
          <div className="p-3 bg-green-50 rounded border text-sm">
            <div className="font-medium">
              Selected NGO: {selectedNGO.organization}
            </div>
            <div className="text-gray-600">Contact: {selectedNGO.contact}</div>
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 rounded bg-gray-100"
          >
            Back
          </button>

          <motion.button
            type="button"
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 rounded bg-gradient-to-r from-green-600 to-emerald-500 text-white flex items-center gap-2"
            onClick={contactNGO}
          >
            Contact NGO
          </motion.button>


        </div>
      </form>
    </motion.section>
  );
}
