export async function POST(req, { params }) {
  const { slug } = params;
  const { question } = await req.json();

  // Example: simple hardcoded responses (replace with AI API later)
  const faqDatabase = {
    'child-education': {
      'how is my donation used': 'Your donation provides books and tuition for underprivileged children.',
      'where is the next volunteer event': 'The next event is at Sunshine School on 20th Jan.',
    },
    'food-donation': {
      'how is my donation used': 'Your donation helps feed 100 people in need today.',
      'where is the next volunteer event': 'The next event is at City Food Bank on 15th Jan.',
    },
  };

  const lowerQuestion = question.toLowerCase();
  const answer = faqDatabase[slug]?.[lowerQuestion] || 'Sorry, I do not have the answer.';

  return new Response(JSON.stringify({ answer }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
