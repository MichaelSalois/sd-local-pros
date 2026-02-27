import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    await resend.emails.send({
      from: 'SD Local Pros <notifications@sdlocalpros.com>',
      to: 'michael@saloisdigital.com',
      subject: `🔔 Contact Form — ${subject || 'General'}`,
      html: `
        <h2>New Contact Form Message</h2>
        <hr>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>Submitted:</strong> ${new Date().toISOString()}</p>
      `,
    });

    return NextResponse.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ success: false, message: 'Failed to send message' }, { status: 500 });
  }
}