'use client';
import jsPDF from 'jspdf';

export default function Certificate({ eventTitle, volunteerName }) {
  const generateCertificate = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [500, 350]
    });

    doc.setFillColor(240, 240, 240);
    doc.rect(0, 0, 500, 350, "F");

    doc.setFontSize(24);
    doc.text("Certificate of Participation", 250, 80, { align: "center" });

    doc.setFontSize(16);
    doc.text(`This is to certify that`, 250, 140, { align: "center" });

    doc.setFontSize(20);
    doc.text(`${volunteerName}`, 250, 180, { align: "center" });

    doc.setFontSize(16);
    doc.text(`has participated in`, 250, 220, { align: "center" });

    doc.setFontSize(20);
    doc.text(`${eventTitle}`, 250, 260, { align: "center" });

    doc.setFontSize(14);
    doc.text("Thank you for your valuable contribution!", 250, 300, { align: "center" });

    doc.save(`${volunteerName}-${eventTitle}-Certificate.pdf`);
  };

  return (
    <button
      onClick={generateCertificate}
      style={{
        background: '#38bdf8',
        color: '#000',
        padding: '8px 16px',
        borderRadius: '6px',
        marginTop: '10px',
        cursor: 'pointer',
      }}
    >
      Download Certificate
    </button>
  );
}
