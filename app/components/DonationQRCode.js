'use client';
import { QRCodeCanvas } from 'qrcode.react';

export default function DonationQRCode({ ngoName, upiId, qrImage, amount, setAmount }) {
  const quickAmounts = [100, 500, 1000];

  const getUpiQRCode = () =>
    `upi://pay?pa=${upiId}&pn=${encodeURIComponent(ngoName)}&am=${amount}&cu=INR`;

  return (
    <div className="p-4 rounded shadow-md w-full max-w-sm mx-auto bg-gray-800 text-white border border-gray-700">
      <h2 className="text-xl font-bold mb-2">{ngoName} Donation</h2>

      {/* Amount input */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Enter Amount (₹)</label>
        <input
          type="number"
          min="1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border px-2 py-1 w-full rounded bg-gray-900 text-white border-gray-600 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Quick buttons */}
      <div className="flex gap-2 mb-4">
        {quickAmounts.map((amt) => (
          <button
            key={amt}
            onClick={() => setAmount(amt)}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            ₹{amt}
          </button>
        ))}
      </div>

      {/* QR Code */}
      <div className="mb-2 text-center p-2 bg-gray-900 rounded inline-block">
        {qrImage ? (
          <img src={qrImage} alt={`${ngoName} QR Code`} className="mx-auto w-48 h-48" />
        ) : (
          <QRCodeCanvas value={getUpiQRCode()} size={200} bgColor="#1f2937" fgColor="#ffffff" />
        )}
      </div>

      <p className="text-sm text-gray-300 text-center mt-2">
        Scan this QR code with any UPI app to donate ₹{amount} to {ngoName}.
      </p>
    </div>
  );
}
