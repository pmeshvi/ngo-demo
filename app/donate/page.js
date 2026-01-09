'use client';

import { useState } from 'react';
import DonationQRCode from '../components/DonationQRCode';
import GenerateReceipt from '../components/GenerateReceipt';

export default function DonatePage() {
  const [donorName, setDonorName] = useState('');
  const [amount, setAmount] = useState(500); // Amount shared with QR code
  const [paidConfirmed, setPaidConfirmed] = useState(false); // ✅ Checkbox state

  const ngoName = "Helping Hands";
  const upiId = "your-gpay-upi@okaxis"; // Replace with your UPI ID
  const qrImage = null; // Or provide QR image path

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-4">
      
      {/* Donor Name Input */}
      <div className="mb-4 w-full max-w-sm">
        <label className="block mb-1 text-white font-medium">Your Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={donorName}
          onChange={(e) => setDonorName(e.target.value)}
          className="w-full px-2 py-1 rounded bg-gray-800 border border-gray-600 text-white focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* QR Code Component */}
      <DonationQRCode
        ngoName={ngoName}
        upiId={upiId}
        qrImage={qrImage}
        amount={amount}
        setAmount={setAmount} // Sync amount with parent
      />

      {/* Checkbox to confirm payment */}
      <div className="mt-4 flex items-center gap-2">
        <input
          type="checkbox"
          checked={paidConfirmed}
          onChange={() => setPaidConfirmed(!paidConfirmed)}
          className="w-4 h-4 accent-blue-500"
        />
        <span className="text-white text-sm">
          I confirm that I have paid ₹{amount} via UPI/GPay
        </span>
      </div>

      {/* Generate Receipt Button */}
      {donorName && (
        <GenerateReceipt
          donorName={donorName}
          ngoName={ngoName}
          amount={amount}
          disabled={!paidConfirmed} // Only active if checkbox checked
        />
      )}
    </div>
  );
}
