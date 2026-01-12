'use client';

export const dynamic = 'force-dynamic';

import dynamicImport from 'next/dynamic';

const MapComponent = dynamicImport(() => import('./MapComponent'), {
  ssr: false, // 🚫 disable server rendering completely
});

export default function SitemapPage() {
  return <MapComponent />;
}
