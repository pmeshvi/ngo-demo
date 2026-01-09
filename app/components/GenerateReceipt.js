'use client';
import { jsPDF } from 'jspdf';

export default function GenerateReceipt({ donorName, ngoName, amount, disabled }) {
  const generateReceipt = () => {
    if (disabled) {
      alert("You must confirm payment before generating the receipt!");
      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Donation Receipt", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.text(`Donor Name: ${donorName}`, 20, 40);
    doc.text(`NGO: ${ngoName}`, 20, 50);
    doc.text(`Amount: INR ${amount}`, 20, 60); // Use INR for safety
    doc.text(`Date: ${new Date().toLocaleString()}`, 20, 70);

    doc.text("Thank you for your donation!", 105, 100, { align: "center" });

    doc.save(`Receipt-${ngoName}-${Date.now()}.pdf`);
  };

  return (
    <button
      onClick={generateReceipt}
      disabled={disabled === false} // Disable if payment not confirmed
      className={`mt-4 px-4 py-2 rounded text-white ${
        disabled
          ? "bg-green-600 hover:bg-green-700"
          : "bg-gray-600 cursor-not-allowed"
      }`}
    >
      I Paid / Generate Receipt
    </button>
  );
}
