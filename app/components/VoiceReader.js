'use client';
import { useRouter } from 'next/navigation';

export default function VoiceReader({ text }) {
  const router = useRouter();

  // 🔊 Text to Speech
  const speakText = () => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'en-IN';
    speech.rate = 1;
    window.speechSynthesis.speak(speech);
  };

  // 🎙️ Speech to Action (Voice Commands)
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Voice recognition not supported in this browser');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.continuous = false;

    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript.toLowerCase();
      console.log('Voice Command:', command);

      if (command.includes('donate')) {
        router.push('/donate');
      } 
      else if (command.includes('volunteer')) {
        router.push('/volunteer-task');
      } 
      else if (command.includes('sitemap')) {
        router.push('/sitemap-page');
      } 
      else if (command.includes('gallery')) {
        router.push('/proof-gallery');
      } 
      else {
        alert('Command not recognized');
      }
    };

    recognition.start();
  };

  return (
    <div style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
      <button onClick={speakText} style={btnStyle}>
        🔊 Read Page
      </button>

     
    </div>
  );
}

const btnStyle = {
  padding: '10px 18px',
  background: '#16a34a',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
};
