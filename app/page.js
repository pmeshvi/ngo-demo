'use client';
import { useState } from 'react';
import Link from 'next/link';
import { translations } from './utils/translations';
import LanguageSwitcher from './components/LanguageSwitcher';
import { ngos } from './data/ngos';
import Chat from './components/Chat'; // AI Chat component

export default function HomePage() {
  const [lang, setLang] = useState('en');
  const t = translations[lang];

  return (
    <div style={styles.pageWrapper}>
      {/* Left Main Content */}
      <div style={styles.mainContent}>
        <LanguageSwitcher setLang={setLang} />

        <h1 style={styles.title}>{t.title}</h1>
        <p style={styles.subtitle}>{t.subtitle}</p>

        <div style={styles.cardGrid}>
          <Link href="/proof-gallery" style={styles.card}>
            <h2>📷 {t.gallery}</h2>
            <p>{t.galleryDesc}</p>
          </Link>

          <Link href="/donate" style={styles.card}>
            <h2>💰 {t.donate}</h2>
            <p>{t.donateDesc}</p>
          </Link>

          <Link href="/volunteer-task" style={styles.card}>
            <h2>🤝 {t.volunteer}</h2>
            <p>{t.volunteerDesc}</p>
          </Link>

          <Link href="/sitemap-page" style={styles.card}>
            <h2>🗺️ {t.sitemap}</h2>
            <p>{t.sitemapDesc}</p>
          </Link>

          <Link href="/events" style={styles.card}>
            <h2>📅 {t.events}</h2>
            <p>{t.eventsDesc}</p>
          </Link>

          <Link href="/ngo-register" style={styles.card}>
            <h2>📝 {t.registerNgo}</h2>
            <p>{t.registerNgoDesc}</p>
          </Link>

        </div>

        <h2 style={{ marginTop: '40px', fontSize: '24px' }}>{t.ngosSection}</h2>
        <div style={styles.cardGrid}>
          {ngos.map((ngo) => (
            <Link key={ngo.slug} href={`/ngo/${ngo.slug}`} style={styles.card}>
              <h2>🏢 {t[ngo.nameKey]}</h2>
              <p>{t[ngo.descKey]}</p>
            </Link>
          ))}
        </div>

        {/* Mobile AI Chat (below content) */}
        <div style={styles.mobileChat}>
          <Chat context={{ ngos }} />
        </div>
      </div>

      {/* Desktop Sidebar AI Chat */}
      <div style={styles.sidebar}>
        <Chat context={{ ngos }} />
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    display: 'flex',
    flexDirection: 'row',
    background: '#020617',
    minHeight: '100vh',
    color: '#fff',
  },

  mainContent: {
    flex: 1,
    padding: '40px',
  },

  sidebar: {
    width: '400px',
    padding: '20px',
    borderLeft: '1px solid #1e293b',
    position: 'sticky',
    top: 0,
    height: '100vh',
    background: '#020617',
    overflowY: 'auto',
    display: 'block',

    // Hide on small screens
    '@media (maxWidth: 768px)': {
      display: 'none',
    },
  },

  mobileChat: {
    display: 'none',

    // Show only on small screens
    '@media (maxWidth: 768px)': {
      display: 'block',
      marginTop: '30px',
      background: '#0f172a',
      padding: '20px',
      borderRadius: '12px',
    },
  },

  title: { fontSize: '32px', marginBottom: '10px' },
  subtitle: { color: '#94a3b8', marginBottom: '30px' },

  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  },

  card: {
    background: '#0f172a',
    padding: '20px',
    borderRadius: '12px',
    textDecoration: 'none',
    color: '#fff',
  },
};
