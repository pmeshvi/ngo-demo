'use client';

import { useState } from 'react';
import DonationQRCode from '../components/DonationQRCode';
import GenerateReceipt from '../components/GenerateReceipt';

export default function DonatePage() {
  const [donorName, setDonorName] = useState('');
  const [amount, setAmount] = useState(500);
  const [paidConfirmed, setPaidConfirmed] = useState(false);

  const ngoName = "Helping Hands";
  const upiId = "your-gpay-upi@okaxis";
  const qrImage = null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-gray-900 to-slate-900 flex items-center justify-center p-4">
      
      <div className="bg-slate-800/90 backdrop-blur w-full max-w-md rounded-2xl shadow-2xl p-6 border border-slate-700">

        {/* Header */}
        <h1 className="text-2xl font-bold text-center mb-1 text-indigo-300">
          Donate to {ngoName}
        </h1>
        <p className="text-center text-sm text-slate-400 mb-5">
          Your contribution creates real impact 🌱
        </p>

        {/* Donor Name */}
        <div className="mb-4">
          <label className="block text-sm mb-1 text-slate-300">
            Donor Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            value={donorName}
            onChange={(e) => setDonorName(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* QR Section */}
        <div className="bg-slate-900 rounded-xl p-4 border border-slate-700">
          <DonationQRCode
            ngoName={ngoName}
            upiId={upiId}
            qrImage={qrImage}
            amount={amount}
            setAmount={setAmount}
          />
        </div>

        {/* Payment Confirmation */}
        <div
          className={`mt-4 p-3 rounded-xl flex items-center gap-2 border
          ${
            paidConfirmed
              ? 'bg-green-950 border-green-700'
              : 'bg-red-950 border-red-700'
          }`}
        >
          <input
            type="checkbox"
            checked={paidConfirmed}
            onChange={(e) => setPaidConfirmed(e.target.checked)}
            className="w-4 h-4 accent-green-500"
          />
          <span className="text-sm">
            I confirm payment of <b>Rs. {amount}</b>
          </span>
        </div>

        {/* Status Text */}
        <p
          className={`mt-2 text-sm font-semibold
          ${paidConfirmed ? 'text-green-400' : 'text-red-400'}`}
        >
          {paidConfirmed ? 'Payment Confirmed ✔' : 'Payment Not Confirmed ✖'}
        </p>

        {/* Generate Receipt */}
        {donorName && (
          <div className="mt-5">
            <GenerateReceipt
              donorName={donorName}
              ngoName={ngoName}
              amount={amount}
              disabled={!paidConfirmed}
            />
          </div>
        )}
      </div>
    </div>
  );
}
