'use client';
import React, { useState } from 'react';

export default function DonationTracker() {
  // Example NGO data
  const [ngos, setNgos] = useState([
    { name: 'Helping Hands', goal: 50000, raised: 23500 },
    { name: 'Save Earth', goal: 75000, raised: 40000 },
    { name: 'Food For All', goal: 100000, raised: 75000 },
  ]);

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">NGO Donation Tracker</h1>
      
      {ngos.map((ngo, index) => {
        const percentage = Math.min((ngo.raised / ngo.goal) * 100, 100);

        return (
          <div key={index} className="mb-6 p-4 bg-gray-800 rounded-lg shadow">
            <h2 className="text-lg font-semibold">{ngo.name}</h2>
            <p className="text-sm mb-2">
              Raised: ₹{ngo.raised.toLocaleString()} / Goal: ₹{ngo.goal.toLocaleString()}
            </p>
            
            {/* Progress bar container */}
            <div className="w-full bg-gray-700 h-4 rounded">
              {/* Progress */}
              <div
                className="h-4 bg-green-500 rounded"
                style={{ width: `${percentage}%`, transition: 'width 0.5s ease-in-out' }}
              ></div>
            </div>
            
            <p className="text-right text-sm mt-1">{percentage.toFixed(1)}%</p>
          </div>
        );
      })}
    </div>
  );
}
