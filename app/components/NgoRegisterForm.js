"use client";

import { useState } from "react";
import { requiredDocuments } from "../data/requiredDocuments";

// Tick and cross icons
const TickIcon = () => <span style={{ color: "green", fontWeight: "bold" }}>✔</span>;
const CrossIcon = () => <span style={{ color: "red", fontWeight: "bold" }}>✖</span>;

export default function NgoRegisterForm() {
  const [ngoName, setNgoName] = useState("");
  const [email, setEmail] = useState("");
  const [files, setFiles] = useState({});
  const [errors, setErrors] = useState({});

  // Use legacy PDF.js build
  const readPdfText = async (file) => {
    if (typeof window === "undefined") return "";

    const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf");

    // ⚡ No worker required for legacy build
    pdfjsLib.GlobalWorkerOptions.workerSrc = null;

    const buffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;

    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((item) => item.str).join(" ");
    }
    return text.toLowerCase();
  };

  const validatePdf = async (file, doc) => {
    const text = await readPdfText(file);
    if (!text) return "Cannot read PDF content";

    const keywordFound = doc.keywords.some((k) => text.includes(k));
    if (!keywordFound) return "Document content does not match required certificate";

    if (doc.regex && !doc.regex.test(text.toUpperCase()))
      return "Invalid or missing registration number";

    return null;
  };

  const handleFileChange = async (e, doc) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setErrors({ ...errors, [doc.key]: "Only PDF files allowed" });
      setFiles({ ...files, [doc.key]: null });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setErrors({ ...errors, [doc.key]: "File must be under 2MB" });
      setFiles({ ...files, [doc.key]: null });
      return;
    }

    const contentError = await validatePdf(file, doc);

    if (contentError) {
      setErrors({ ...errors, [doc.key]: contentError });
      setFiles({ ...files, [doc.key]: null });
    } else {
      setErrors({ ...errors, [doc.key]: null });
      setFiles({ ...files, [doc.key]: file });
    }
  };

  const isFormValid =
    ngoName &&
    email &&
    requiredDocuments.every((doc) => files[doc.key] && !errors[doc.key]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("NGO Registered Successfully (Documents Verified)");
  };

  return (
    <div
      style={{
        maxWidth: 650,
        margin: "40px auto",
        padding: 25,
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        backgroundColor: "#f9f9f9",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#0f766e" }}>🏢 NGO Registration</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontWeight: "bold" }}>NGO Name</label>
          <input
            value={ngoName}
            onChange={(e) => setNgoName(e.target.value)}
            required
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 6,
              border: "1px solid #ccc",
              marginTop: 5,
            }}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ fontWeight: "bold" }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 6,
              border: "1px solid #ccc",
              marginTop: 5,
            }}
          />
        </div>

        <h2 style={{ color: "#0f766e" }}>📄 Upload Documents</h2>

        {requiredDocuments.map((doc) => (
          <div
            key={doc.key}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 15,
              padding: 10,
              borderRadius: 8,
              backgroundColor: "#fff",
              border: errors[doc.key] ? "1px solid red" : "1px solid #0f766e",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            }}
          >
            <div>
              <b>{doc.label}</b>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileChange(e, doc)}
                style={{ marginTop: 5 }}
              />
              {errors[doc.key] && (
                <p style={{ color: "red", margin: "5px 0 0 0" }}>{errors[doc.key]}</p>
              )}
            </div>

            <div style={{ fontSize: 24 }}>
              {files[doc.key] && !errors[doc.key] ? <TickIcon /> : <CrossIcon />}
            </div>
          </div>
        ))}

        <button
          disabled={!isFormValid}
          style={{
            width: "100%",
            padding: 12,
            marginTop: 20,
            background: isFormValid ? "#0f766e" : "#ccc",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontSize: 16,
            cursor: isFormValid ? "pointer" : "not-allowed",
          }}
        >
          Submit NGO
        </button>
      </form>
    </div>
  );
}
