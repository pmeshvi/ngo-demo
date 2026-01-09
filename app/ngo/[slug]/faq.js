import { ngos } from '@/data/ngos';
import Chat from './Chat';

export default async function NGOFAQ({ params }) {
  const { slug } = params;
  const ngo = ngos.find((n) => n.slug === slug);

  if (!ngo) {
    return <h1>404: NGO Not Found</h1>;
  }

  return (
    <div style={{ padding: '40px', background: '#020617', color: '#fff', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>{ngo.name} FAQ</h1>
      <p style={{ marginBottom: '30px', color: '#94a3b8' }}>{ngo.description}</p>

      {/* Render Chat Component */}
      <Chat ngoSlug={slug} />
    </div>
  );
}
