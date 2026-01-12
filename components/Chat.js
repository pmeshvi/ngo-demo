'use client';
import { useState } from 'react';

export default function Chat({ context }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: input,
          context,
        }),
      });

      const data = await res.json();

      const aiMessage = {
        role: 'ai',
        text: data.answer || 'Sorry, I could not understand.',
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: 'ai', text: '⚠️ AI service not responding.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.chatBox}>
      <h3 style={{ marginBottom: '10px' }}>🤖 AI NGO Assistant</h3>

      {/* Chat Messages */}
      <div style={styles.messages}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              background: msg.role === 'user' ? '#2563eb' : '#1e293b',
            }}
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div style={{ ...styles.message, background: '#1e293b' }}>
            AI is typing...
          </div>
        )}
      </div>

      {/* Input */}
      <div style={styles.inputWrapper}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about donations, impact, events..."
          style={styles.input}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} style={styles.sendBtn}>
          ➤
        </button>
      </div>
    </div>
  );
}

const styles = {
  chatBox: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    background: '#0f172a',
    borderRadius: '16px',
    padding: '16px',
    border: '1px solid #1e293b',
    color: '#fff',
    height: '100%',
  },
  messages: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flex: 1,
    overflowY: 'auto',
    marginBottom: '12px',
    paddingRight: '4px',
  },
  message: {
    padding: '10px 14px',
    borderRadius: '14px',
    fontSize: '14px',
    maxWidth: '80%',
    wordBreak: 'break-word',
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    background: '#1e293b',
    borderRadius: '999px',
    padding: '8px 12px',
    marginTop: 'auto',
  },
  input: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: '#fff',
    fontSize: '14px',
    padding: '8px',
  },
  sendBtn: {
    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
    border: 'none',
    color: '#fff',
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    cursor: 'pointer',
    fontSize: '16px',
    marginLeft: '8px',
  },
};
