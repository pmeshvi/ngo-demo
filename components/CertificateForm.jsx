"use client";

export default function CertificateForm({ volunteerName, taskName, companyName }) {
  const handleGenerate = async () => {
    const res = await fetch("/api/generate-certificate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ volunteerName, taskName, companyName }),
    });
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${volunteerName}_certificate.pdf`;
    link.click();
  };

  return (
    <button
      onClick={handleGenerate}
      className="px-4 py-2 bg-blue-600 text-white rounded"
    >
      Generate Certificate
    </button>
  );
}
