import { ngos } from "../../data/ngos"; // relative path to your NGO data

export async function GET() {
  // Use environment variable for production or localhost for dev
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  // Static pages that should be allowed
  const staticPages = [
    "",               // Home page
    "ngo-register",
    "donate",
    "volunteer-task",
    "proof-gallery",
    "sitemap-page"
  ];

  // Dynamic NGO pages
  const ngoUrls = ngos.map((ngo) => `/ngo/${ngo.slug}`);

  // Combine allowed URLs
  const allowedUrls = [...staticPages, ...ngoUrls];

  // Build robots.txt content dynamically
  const robotsTxt = `
User-agent: *
Disallow: /admin/
Disallow: /api/
Disallow: /user/profile
Disallow: /ngo-register

${allowedUrls.map((url) => `Allow: ${url}`).join("\n")}

Sitemap: ${baseUrl}/api/sitemap
`;

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
