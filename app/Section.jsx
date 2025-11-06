import React from 'react'

const Section = () => {
  return (
    <div>
        <section>
            <h2 className="text-2xl font-semibold text-green-800 mb-4">Register Your NGO</h2>
            <form onSubmit={handleNGOSubmit} className="space-y-4">
              <input
                required
                placeholder="Organization name"
                value={ngoData.organization}
                onChange={(e) => setNGoData({ ...ngoData, organization: e.target.value })}
                className="w-full border p-3 rounded"
              />
              <input
                required
                placeholder="Contact (phone or email)"
                value={ngoData.contact}
                onChange={(e) => setNGoData({ ...ngoData, contact: e.target.value })}
                className="w-full border p-3 rounded"
              />
              <input
                required
                placeholder="Location"
                value={ngoData.location}
                onChange={(e) => setNGoData({ ...ngoData, location: e.target.value })}
                className="w-full border p-3 rounded"
              />

              <div className="flex gap-3">
                <button type="button" onClick={reset} className="px-4 py-2 rounded bg-gray-100">Back</button>
                <button type="submit" className="px-4 py-2 rounded bg-green-600 text-white">Register NGO</button>
              </div>
            </form>
          </section>
    </div>
  )
}

export default Section
