'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';

// Map slug to page content
const pageData = {
  'donate': {
    title: 'Donate Now',
    description: 'Support NGOs with instant UPI & QR',
    link: '/donate',
  },
  'volunteer-task': {
    title: 'Volunteer',
    description: 'Join NGOs and help on ground',
    link: '/volunteer-task',
  },
  'proof-gallery': {
    title: 'Donation Proof Gallery',
    description: 'See how donations are actually used',
    link: '/proof-gallery',
    slug: 'proof-gallery',
  },
  'sitemap-page': {
    title: 'Website Sitemap',
    description: 'Explore all pages of the NGO platform',
    link: '/sitemap-page',
  },
};

export default function DynamicPage() {
  const { slug } = useParams();
  const page = pageData[slug];

  if (!page) {
    return (
      <div style={{ padding: 40, color: '#fff', background: '#020617', minHeight: '100vh' }}>
        <h1>404 - Page Not Found</h1>
        <Link href="/">Go Home</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: 40, color: '#fff', background: '#020617', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '32px', marginBottom: 10 }}>{page.title}</h1>
      <p style={{ marginBottom: 20, color: '#94a3b8' }}>{page.description}</p>
      <Link href={page.link} style={{ color: '#38bdf8' }}>
        Open {page.title}
      </Link>
    </div>
  );
}
