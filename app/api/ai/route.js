import { getSystemContext } from '../../ai/systemContext';

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    const ctx = getSystemContext();
    const q = prompt.toLowerCase();

    if (q.includes('donation')) {
      return Response.json({
        answer: `Total donations collected so far are ₹${ctx.totalDonation}, used for education and food projects.`,
      });
    }

    if (q.includes('how many ngo')) {
      return Response.json({
        answer: `We are currently working with ${ctx.ngoCount} NGOs.`,
      });
    }

    if (q.includes('ngo list')) {
      return Response.json({
        answer: `Our NGOs include: ${ctx.ngos.map(n => n.name).join(', ')}`,
      });
    }

    return Response.json({
      answer: `I can help with NGO details, donations, and volunteer information.`,
    });
  } catch (error) {
    return Response.json(
      { answer: 'AI server error. Please try again.' },
      { status: 500 }
    );
  }
}
