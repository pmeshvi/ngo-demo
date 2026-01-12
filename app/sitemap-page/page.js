'use client'; // important
// app/sitemap-page/page.js
export const dynamic = 'force-dynamic';

import MapComponent from './MapComponent';

export default function SitemapPage() {
  return <MapComponent />;
}
