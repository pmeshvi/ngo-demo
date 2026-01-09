"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";

export default function DonationReceipt() {
  const [donorName, setDonorName] = useState("");
  const [ngoName, setNgoName] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [donationDate, setDonationDate] = useState("");

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) setAmount(value);
  };

  const cleanText = (text) => text.replace(/[^a-zA-Z0-9\s.,-]/g, "");

  // Format date to dd/mm/yyyy
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const generateReceipt = () => {
    // Validate all fields
    if (!donorName || !ngoName || !amount || !paymentMethod || !donationDate) {
      alert("Please fill all fields before generating the receipt.");
      return;
    }

    const dateToUse = formatDate(donationDate);

    const doc = new jsPDF("portrait", "px", "a4");
    const width = doc.internal.pageSize.getWidth();
    const height = doc.internal.pageSize.getHeight();

    // Border
    doc.setDrawColor(30, 64, 175);
    doc.setLineWidth(4);
    doc.rect(20, 20, width - 40, height - 40);

    // Header
    doc.setFillColor(30, 64, 175);
    doc.rect(20, 20, width - 40, 80, "F");

    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.text("Donation Receipt", width / 2, 65, { align: "center" });

    // Donation Details
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.text(`Donor Name     : ${cleanText(donorName)}`, 50, 140);
    doc.text(`Payment Method : ${cleanText(paymentMethod)}`, 50, 180);
    doc.text(`NGO Name       : ${cleanText(ngoName)}`, 50, 220);
    doc.text(`Donation Date  : ${dateToUse}`, 50, 260);

    // Amount Highlight
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text(`Donation Amount: Rs. ${parseFloat(amount).toFixed(2)}`, 50, 300);

    // Thank you note
    doc.setFont("helvetica", "italic");
    doc.setFontSize(14);
    doc.text("Thank you for your generous contribution!", width / 2, 350, {
      align: "center",
    });

    // Signature
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("Authorized Signature", width - 150, height - 60);
    doc.line(width - 200, height - 50, width - 50, height - 50);

    // Save PDF
    doc.save(`donation_receipt.pdf`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-lg">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-700">
          Generate Donation Receipt
        </h1>

        <div className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Donor Name *"
            value={donorName}
            onChange={(e) => setDonorName(e.target.value)}
            className="p-4 border border-blue-300 rounded-2xl bg-blue-50 text-gray-900 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <input
            type="text"
            placeholder="NGO Name *"
            value={ngoName}
            onChange={(e) => setNgoName(e.target.value)}
            className="p-4 border border-blue-300 rounded-2xl bg-blue-50 text-gray-900 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <input
            type="text"
            placeholder="Donation Amount *"
            value={amount}
            onChange={handleAmountChange}
            className="p-4 border border-blue-300 rounded-2xl bg-blue-50 text-gray-900 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <input
            type="text"
            placeholder="Payment Method (UPI/Card/Cash) *"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="p-4 border border-blue-300 rounded-2xl bg-blue-50 text-gray-900 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <input
            type="date"
            value={donationDate}
            onChange={(e) => setDonationDate(e.target.value)}
            className="p-4 border border-blue-300 rounded-2xl bg-blue-50 text-gray-900 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <button
            onClick={generateReceipt}
            className="mt-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl hover:from-indigo-600 hover:to-blue-600 transition-shadow shadow-lg"
          >
            Generate Receipt
          </button>
        </div>
      </div>
    </div>
  );
}
