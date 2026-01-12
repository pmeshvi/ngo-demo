'use client';
import Chat from '@/components/Chat';

export default function HomePage() {
  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      <div style={{ flex: 1 }}>
        <h1>Welcome to Our NGO</h1>
        <p>Ask any question about our programs, donations, and volunteering.</p>
      </div>

      <div style={{ width: "400px" }}>
        <Chat />
      </div>
    </div>
  );
}
