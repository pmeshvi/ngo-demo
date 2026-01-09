import { ngos } from "../../data/ngos"; // use relative path

export async function GET(request) {
  const baseUrl = "http://localhost:3000"; // Replace with your domain

  // Static pages
  const staticPages = [
    "",
    "ngo-register",
    "donate",
    "events",
    "volunteer-task",
    "sitemap-page",
    "proof-gallery"
  ];

  // Generate sitemap entries for static pages
  const staticUrls = staticPages
    .map((page) => {
      return `
      <url>
        <loc>${baseUrl}/${page}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>`;
    })
    .join("");

  // Generate sitemap entries for dynamic NGO pages
  const ngoUrls = ngos
    .map((ngo) => {
      return `
      <url>
        <loc>${baseUrl}/ngo/${ngo.slug}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
      </url>`;
    })
    .join("");

  // Combine all URLs into sitemap format
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticUrls}
    ${ngoUrls}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}
