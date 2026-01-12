'use client';

import { jsPDF } from 'jspdf';

export default function GenerateReceipt({
  donorName,
  ngoName,
  amount,
  disabled
}) {
  const generatePDF = () => {
    if (disabled) return;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Donation Receipt', 70, 20);

    doc.setFontSize(12);
    doc.text(`Donor Name: ${donorName}`, 20, 40);
    doc.text(`NGO Name: ${ngoName}`, 20, 50);

    // ✅ FIXED AMOUNT (NO ₹ SYMBOL)
    doc.text(`Amount Donated: Rs. ${amount}`, 20, 60);

    doc.text('Payment Mode: UPI / QR', 20, 70);
    doc.text('Status: Payment Confirmed', 20, 80);

    const date = new Date().toLocaleDateString();
    doc.text(`Date: ${date}`, 20, 90);

    doc.text('Thank you for supporting our NGO!', 20, 110);

    doc.save(`Donation_Receipt_${donorName}.pdf`);
  };

  return (
    <div className="mt-4 w-full max-w-sm">
      <button
        onClick={generatePDF}
        disabled={disabled}
        className={`w-full py-2 rounded font-semibold
          ${disabled ? 'bg-gray-600' : 'bg-green-600 hover:bg-green-700'}
        `}
      >
        Generate Receipt (PDF)
      </button>
      
    </div>
  );
}
