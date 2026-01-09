import { ngos } from '../../data/ngos';
import { donations } from '../../data/donations';
import Chat from '../../components/Chat'; // ✅ ADDED

// Next.js App Router page must be async to unwrap params
export default async function NGODetail({ params }) {
  const { slug } = await params; // unwrap promise
  const ngo = ngos.find((n) => n.slug === slug);

  if (!ngo) return <p>NGO not found</p>;

  // Get donations for this NGO
  const ngoDonations = donations.filter((d) => d.ngoSlug === slug);

  // ✅ UPDATED: AI-style Impact Stories (still dynamic, not static)
  const impactStories = ngoDonations.map((d) => {
    return `✨ Thanks to your generous donation of ₹${d.amount}, ${d.beneficiaries} individuals received support through the "${d.project}" initiative on ${d.date}. Your contribution created real impact on the ground.`;
  });

  return (
    <div
      style={{
        padding: '20px',
        background: '#020617',
        color: '#fff',
        minHeight: '100vh',
      }}
    >
      <h1 style={{ fontSize: '28px' }}>{ngo.name}</h1>
      <p>{ngo.description}</p>

      <h2 style={{ marginTop: '30px' }}>💡 Impact Stories</h2>

      {impactStories.length > 0 ? (
        <ul>
          {impactStories.map((story, index) => (
            <li
              key={index}
              style={{
                marginBottom: '10px',
                background: '#0f172a',
                padding: '10px',
                borderRadius: '8px',
              }}
            >
              {story}
            </li>
          ))}
        </ul>
      ) : (
        <p>No donations yet.</p>
      )}   
    </div>
  );
}

// Dynamic metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const ngo = ngos.find((n) => n.slug === slug);
  return {
    title: ngo ? ngo.name : 'NGO Not Found',
    description: ngo ? ngo.description : 'Details about this NGO',
  };
}
