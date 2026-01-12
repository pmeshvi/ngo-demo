"use client";

import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf"; // modern import
import { requiredDocuments } from "../data/requiredDocuments";

// Tick, Cross, Pending icons
const TickIcon = () => <span style={{ color: "green", fontWeight: "bold" }}>✔</span>;
const CrossIcon = () => <span style={{ color: "red", fontWeight: "bold" }}>✖</span>;
const PendingIcon = () => <span style={{ color: "orange", fontWeight: "bold" }}>⚠</span>;

export default function NgoRegisterForm() {
  const [ngoName, setNgoName] = useState("");
  const [email, setEmail] = useState("");
  const [files, setFiles] = useState({});   // store file info
  const [errors, setErrors] = useState({});
  const [previews, setPreviews] = useState({}); // store base64 previews for PDF

  // Read PDF text (client-side only)
  const readPdfText = async (file) => {
    if (typeof window === "undefined") return "";

    const buffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: buffer, disableWorker: true }).promise;

    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((item) => item.str).join(" ");
    }
    return text.toLowerCase();
  };

  // Validate PDF content
  const validatePdf = async (file, doc) => {
    const text = await readPdfText(file);
    if (!text) return "Cannot read PDF content";

    const keywordFound = doc.keywords.some((k) => text.includes(k));
    if (!keywordFound) return "Document content does not match required certificate";

    if (doc.regex && !doc.regex.test(text.toUpperCase()))
      return "Invalid or missing registration number";

    return null;
  };

  // Convert PDF file to base64 for preview
  const generatePreview = async (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
    });
  };

  // Handle file selection
  const handleFileChange = async (e, doc) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check duplicate (name + size)
    const existingFile = files[doc.key];
    if (existingFile && existingFile.name === file.name && existingFile.size === file.size) {
      setErrors({ ...errors, [doc.key]: "This file is already uploaded" });
      return;
    }

    // Check file type
    if (file.type !== "application/pdf") {
      setErrors({ ...errors, [doc.key]: "Only PDF files allowed" });
      setFiles({ ...files, [doc.key]: null });
      setPreviews({ ...previews, [doc.key]: null });
      return;
    }

    // Check file size
    if (file.size > 2 * 1024 * 1024) {
      setErrors({ ...errors, [doc.key]: "File must be under 2MB" });
      setFiles({ ...files, [doc.key]: null });
      setPreviews({ ...previews, [doc.key]: null });
      return;
    }

    // Validate content
    const contentError = await validatePdf(file, doc);
    if (contentError) {
      setErrors({ ...errors, [doc.key]: contentError });
      setFiles({ ...files, [doc.key]: null });
      setPreviews({ ...previews, [doc.key]: null });
    } else {
      const preview = await generatePreview(file);
      setErrors({ ...errors, [doc.key]: null });
      setFiles({ ...files, [doc.key]: file });
      setPreviews({ ...previews, [doc.key]: preview });
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
        maxWidth: 700,
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
            style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc", marginTop: 5 }}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ fontWeight: "bold" }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc", marginTop: 5 }}
          />
        </div>

        <h2 style={{ color: "#0f766e" }}>📄 Upload Documents</h2>

        {requiredDocuments.map((doc) => {
          const file = files[doc.key];
          const preview = previews[doc.key];
          const error = errors[doc.key];
          const statusIcon = error ? <CrossIcon /> : file ? <TickIcon /> : <PendingIcon />;

          return (
            <div
              key={doc.key}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 15,
                padding: 15,
                borderRadius: 8,
                backgroundColor: "#fff",
                border: error ? "1px solid red" : "1px solid #0f766e",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              }}
            >
              <div style={{ flex: 1 }}>
                <b>{doc.label}</b>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleFileChange(e, doc)}
                  style={{ marginTop: 5 }}
                />
                {file && (
                  <p style={{ fontSize: 12, marginTop: 5 }}>
                    {file.name} ({(file.size / 1024).toFixed(1)} KB)
                  </p>
                )}
                {error && <p style={{ color: "red", marginTop: 5 }}>{error}</p>}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 24 }}>
                {statusIcon}

                {/* PDF Preview */}
                {preview && (
                  <button
                    type="button"
                    onClick={() => window.open(preview, "_blank")}
                    style={{
                      padding: "5px 10px",
                      borderRadius: 6,
                      border: "1px solid #ccc",
                      backgroundColor: "#f0f0f0",
                      cursor: "pointer",
                      fontSize: 14,
                    }}
                  >
                    Preview
                  </button>
                )}
              </div>
            </div>
          );
        })}

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
