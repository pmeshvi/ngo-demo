'use client';
import { useState } from 'react';
import Certificate from './Certificate';

export default function EventCard({ event }) {
  const [joined, setJoined] = useState(false);
  const volunteerName = "John Doe"; // Demo purpose

  return (
    <div style={{
      background: '#0f172a',
      color: '#fff',
      padding: '20px',
      borderRadius: '12px',
      marginBottom: '20px',
    }}>
      <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>{event.title}</h3>
      <p style={{ marginBottom: '10px' }}>{event.date}</p>
      <p>{event.description}</p>
      
      {!joined ? (
        <button
          onClick={() => setJoined(true)}
          style={{
            background: '#38bdf8',
            color: '#000',
            padding: '8px 16px',
            borderRadius: '6px',
            marginTop: '10px',
            cursor: 'pointer',
          }}
        >
          Join Event
        </button>
      ) : (
        <>
          <p style={{ marginTop: '10px', color: '#4ade80' }}>✅ Joined</p>
          <Certificate eventTitle={event.title} volunteerName={volunteerName} />
        </>
      )}
    </div>
  );
}
