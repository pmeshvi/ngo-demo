export const requiredDocuments = [
  {
    key: "pan",
    label: "PAN Card",
    keywords: ["income tax", "permanent account number", "pan"],
    regex: /[A-Z]{5}[0-9]{4}[A-Z]/,
  },
  {
    key: "certificate12A",
    label: "12A Certificate",
    keywords: ["12a", "income tax act", "registration"],
    regex: /12A|12AA/i,
  },
  {
    key: "certificate80G",
    label: "80G Certificate",
    keywords: ["80g", "donation", "income tax act"],
    regex: /80G/i,
  },
];
