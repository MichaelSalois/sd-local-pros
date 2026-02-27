import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { businessName, contactName, contactEmail, contactPhone, message } = body;

    await resend.emails.send({
      from: 'SD Local Pros <notifications@sdlocalpros.com>',
      to: 'michael@saloisdigital.com',
      subject: `🔔 New Claim Request — ${businessName}`,
      html: `
        <h2>New SD Local Pros Submission</h2>
        <hr>
        <p><strong>Type:</strong> claim_request</p>
        <p><strong>Business:</strong> ${businessName}</p>
        <p><strong>Contact:</strong> ${contactName}</p>
        <p><strong>Email:</strong> ${contactEmail}</p>
        <p><strong>Phone:</strong> ${contactPhone}</p>
        <p><strong>Message:</strong> ${message || 'None'}</p>
        <p><strong>Submitted:</strong> ${new Date().toISOString()}</p>
      `,
    });

    return NextResponse.json({ success: true, message: 'Claim request submitted successfully' });
  } catch (error) {
    console.error('Claim listing error:', error);
    return NextResponse.json({ success: false, message: 'Failed to submit claim request' }, { status: 500 });
  }
}