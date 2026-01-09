'use client';
import { useState } from 'react';

export default function DonationProofGallery() {
  const [proofs, setProofs] = useState([]);
  const [message, setMessage] = useState('');

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);

    const newProofs = files.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type.startsWith('video') ? 'video' : 'image',
    }));

    setProofs((prev) => [...prev, ...newProofs]);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Donation Proof Gallery</h1>

      <p style={styles.desc}>
        Share proof of how donations are used to build donor trust
      </p>

      {/* Message */}
      <input
        type="text"
        placeholder="Example: Your donation helped feed 120 people today"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={styles.input}
      />

      {/* Upload */}
      <input
        type="file"
        multiple
        accept="image/*,video/*"
        onChange={handleUpload}
        style={styles.file}
      />

      {/* Message Display */}
      {message && (
        <div style={styles.messageBox}>
          ❤️ {message}
        </div>
      )}

      {/* Gallery */}
      <div style={styles.grid}>
        {proofs.map((item, index) => (
          <div key={index} style={styles.card}>
            {item.type === 'image' ? (
              <img src={item.url} alt="Proof" style={styles.media} />
            ) : (
              <video src={item.url} controls style={styles.media} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '30px',
    background: '#0f172a',
    minHeight: '100vh',
    color: '#fff',
  },
  title: {
    fontSize: '28px',
    marginBottom: '10px',
  },
  desc: {
    color: '#cbd5f5',
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '6px',
    border: 'none',
  },
  file: {
    marginBottom: '20px',
    color: '#fff',
  },
  messageBox: {
    background: '#1e293b',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '20px',
    fontSize: '16px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '15px',
  },
  card: {
    background: '#1e293b',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  media: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
};
