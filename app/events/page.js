'use client';
import { events } from '../utils/events';
import EventCard from '../components/EventCard';

export default function EventsPage() {
  return (
    <div style={{
      minHeight: '100vh',
      padding: '40px',
      background: '#020617',
      color: '#fff',
    }}>
      <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>Upcoming Events</h1>
      {events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

