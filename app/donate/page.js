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
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 text-white w-full max-w-md rounded-xl shadow-lg p-6">

        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-4">
          Donate to {ngoName}
        </h1>

        {/* Donor Name */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Your Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={donorName}
            onChange={(e) => setDonorName(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* QR Code */}
        <DonationQRCode
          ngoName={ngoName}
          upiId={upiId}
          qrImage={qrImage}
          amount={amount}
          setAmount={setAmount}
        />

        {/* Payment Confirmation */}
        <div
          className={`mt-4 p-3 rounded flex items-center gap-2
          ${paidConfirmed ? 'bg-green-900' : 'bg-red-900'}`}
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

        {/* Status */}
        <p
          className={`mt-2 text-sm font-medium
          ${paidConfirmed ? 'text-green-400' : 'text-red-400'}`}
        >
          {paidConfirmed ? 'Payment Confirmed ✅' : 'Payment Not Confirmed ❌'}
        </p>

        {/* Generate Receipt */}
        {donorName && (
          <div className="mt-4">
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
