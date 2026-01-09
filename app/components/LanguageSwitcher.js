export default function LanguageSwitcher({ setLang }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <button onClick={() => setLang('en')} style={btnStyle}>EN</button>
      <button onClick={() => setLang('hi')} style={btnStyle}>HI</button>
      <button onClick={() => setLang('gu')} style={btnStyle}>GU</button>
    </div>
  );
}

const btnStyle = {
  marginRight: '10px',
  padding: '8px 12px',
  background: '#0f172a',
  color: '#fff',
  border: '1px solid #94a3b8',
  borderRadius: '6px',
  cursor: 'pointer',
};
