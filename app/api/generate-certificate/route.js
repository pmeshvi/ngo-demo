import { NextResponse } from "next/server";
import jsPDF from "jspdf";
import fs from "fs";
import path from "path";

export async function POST(req) {
  const { volunteerName, taskName, companyName } = await req.json();

  const doc = new jsPDF("landscape", "px", "a4");
  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();

  // Border
  doc.setDrawColor(0, 123, 255);
  doc.setLineWidth(4);
  doc.rect(20, 20, width - 40, height - 40);

  // Logo (optional)
  const logoPath = path.join(process.cwd(), "public/images/logo.png");
  try {
    const logoData = fs.readFileSync(logoPath, { encoding: "base64" });
    doc.addImage(`data:image/png;base64,${logoData}`, "PNG", width/2 - 50, 30, 100, 100);
  } catch (err) {
    console.log("Logo not found, skipping");
  }

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(30);
  doc.text("Certificate of Completion", width / 2, 160, { align: "center" });

  // Subtitle
  doc.setFont("helvetica", "normal");
  doc.setFontSize(18);
  doc.text("This is proudly presented to", width / 2, 200, { align: "center" });

  // Volunteer Name
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text(volunteerName, width / 2, 240, { align: "center" });

  // Task Name
  doc.setFont("helvetica", "normal");
  doc.setFontSize(18);
  doc.text("For successfully completing the task:", width / 2, 280, { align: "center" });
  doc.setFontSize(20);
  doc.text(taskName, width / 2, 310, { align: "center" });

  // Company / NGO Name
  doc.setFontSize(16);
  doc.text(`Issued by: ${companyName}`, width / 2, 360, { align: "center" });

  // Date
  doc.text(`Date: ${new Date().toLocaleDateString()}`, width / 2, 390, { align: "center" });

  // Optional Signature
  const signPath = path.join(process.cwd(), "public/images/signature.png");
  try {
    const signData = fs.readFileSync(signPath, { encoding: "base64" });
    doc.addImage(`data:image/png;base64,${signData}`, "PNG", width - 200, height - 120, 150, 50);
    doc.setFontSize(12);
    doc.text("Authorized Signature", width - 125, height - 50, { align: "center" });
  } catch (err) {
    console.log("Signature not found, skipping");
  }

  // Return PDF
  const pdfBytes = doc.output("arraybuffer");
  return new NextResponse(pdfBytes, { headers: { "Content-Type": "application/pdf" } });
}
