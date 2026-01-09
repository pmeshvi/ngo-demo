'use client';
import { useState } from 'react';
import jsPDF from 'jspdf';

export default function VolunteerTaskPage() {
  const [taskCompleted, setTaskCompleted] = useState(false);

  // Demo data
  const volunteerName = 'Rahul Patel';
  const eventName = 'Food Distribution Drive';
  const ngoName = 'Helping Hands NGO';
  const ngoCity = 'Anand, Gujarat';
  const issueDate = new Date().toLocaleDateString();

  const generateCertificate = () => {
    // A4 size in mm → 210 x 297
    const pdf = new jsPDF('portrait', 'mm', 'a4');

    // Border
    pdf.setLineWidth(1);
    pdf.rect(10, 10, 190, 277);

    // NGO Name (Top)
    pdf.setFont('times', 'bold');
    pdf.setFontSize(24);
    pdf.text(ngoName, 105, 40, { align: 'center' });

    pdf.setFontSize(12);
    pdf.setFont('times', 'normal');
    pdf.text(ngoCity, 105, 48, { align: 'center' });

    // Title
    pdf.setFontSize(22);
    pdf.setFont('times', 'bold');
    pdf.text('Certificate of Appreciation', 105, 70, { align: 'center' });

    // Body text
    pdf.setFontSize(14);
    pdf.setFont('times', 'normal');

    pdf.text(
      `This is to certify that`,
      105,
      100,
      { align: 'center' }
    );

    pdf.setFont('times', 'bold');
    pdf.setFontSize(18);
    pdf.text(volunteerName, 105, 115, { align: 'center' });

    pdf.setFont('times', 'normal');
    pdf.setFontSize(14);
    pdf.text(
      `has successfully completed the volunteer activity`,
      105,
      130,
      { align: 'center' }
    );

    pdf.setFont('times', 'bold');
    pdf.text(`"${eventName}"`, 105, 145, { align: 'center' });

    pdf.setFont('times', 'normal');
    pdf.text(
      `organized by ${ngoName}.`,
      105,
      160,
      { align: 'center' }
    );

    // Footer
    pdf.setFontSize(12);
    pdf.text(`Date of Issue: ${issueDate}`, 30, 210);
    pdf.text('Authorized Signature', 150, 210);

    pdf.line(145, 205, 190, 205); // Signature line

    pdf.text('NGO Coordinator', 150, 220);

    // Save PDF
    pdf.save('Volunteer-Certificate.pdf');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg w-full max-w-md">
        <h1 className="text-xl font-bold mb-4">Volunteer Event</h1>

        <p><b>Volunteer:</b> {volunteerName}</p>
        <p><b>Event:</b> {eventName}</p>
        <p><b>NGO:</b> {ngoName}</p>

        {!taskCompleted ? (
          <button
            onClick={() => setTaskCompleted(true)}
            className="mt-4 w-full bg-green-600 py-2 rounded"
          >
            Mark Event as Completed
          </button>
        ) : (
          <>
            <p className="mt-4 text-green-400 font-semibold text-center">
              ✅ Task Completed
            </p>

            <button
              onClick={generateCertificate}
              className="mt-3 w-full bg-blue-600 py-2 rounded"
            >
              Download Certificate
            </button>
          </>
        )}
      </div>
    </div>
  );
}
