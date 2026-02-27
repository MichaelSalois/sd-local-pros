import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { businessName, contactName, contactEmail, phone, categorySlug, neighborhoodSlug, address, website, description } = body;

    await resend.emails.send({
      from: 'SD Local Pros <notifications@sdlocalpros.com>',
      to: 'michael@saloisdigital.com',
      subject: `🔔 New Business Submission — ${businessName}`,
      html: `
        <h2>New SD Local Pros Submission</h2>
        <hr>
        <p><strong>Type:</strong> new_listing</p>
        <p><strong>Business:</strong> ${businessName}</p>
        <p><strong>Contact:</strong> ${contactName}</p>
        <p><strong>Email:</strong> ${contactEmail}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Category:</strong> ${categorySlug || 'Not specified'}</p>
        <p><strong>Neighborhood:</strong> ${neighborhoodSlug || 'Not specified'}</p>
        <p><strong>Address:</strong> ${address || 'Not provided'}</p>
        <p><strong>Website:</strong> ${website || 'Not provided'}</p>
        <p><strong>Description:</strong> ${description || 'None'}</p>
        <p><strong>Submitted:</strong> ${new Date().toISOString()}</p>
      `,
    });

    return NextResponse.json({ success: true, message: 'Listing submitted successfully' });
  } catch (error) {
    console.error('Submit listing error:', error);
    return NextResponse.json({ success: false, message: 'Failed to submit listing' }, { status: 500 });
  }
}