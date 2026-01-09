'use client';
import { useState } from 'react';

export default function Chat({ ngoSlug }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input) return;

    // Add user message to chat
    const userMessage = { type: 'user', text: input };
    setMessages([...messages, userMessage]);

    // Call server API to get AI response
    const res = await fetch(`/api/faq/${ngoSlug}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: input }),
    });

    const data = await res.json();

    // Add AI response
    setMessages((prev) => [...prev, { type: 'ai', text: data.answer }]);
    setInput('');
  };

  return (
    <div style={{ maxWidth: '600px' }}>
      <div style={{ minHeight: '300px', padding: '20px', background: '#0f172a', borderRadius: '12px', overflowY: 'auto' }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: '15px', textAlign: msg.type === 'user' ? 'right' : 'left' }}>
            <span
              style={{
                display: 'inline-block',
                padding: '10px',
                borderRadius: '12px',
                background: msg.type === 'user' ? '#1e3a8a' : '#374151',
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', marginTop: '15px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about donations or events..."
          style={{ flex: 1, padding: '10px', borderRadius: '8px 0 0 8px', border: 'none' }}
        />
        <button
          onClick={sendMessage}
          style={{ padding: '10px 20px', border: 'none', borderRadius: '0 8px 8px 0', background: '#2563eb', color: '#fff' }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
