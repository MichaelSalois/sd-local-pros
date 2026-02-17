import { NextRequest, NextResponse } from 'next/server';

// ============================================================
// POST /api/claim-listing
// Handles "Claim Your Listing" form submissions
// Sends alert via Zapier webhook (email + SMS)
// ============================================================

const ZAPIER_WEBHOOK_URL = process.env.ZAPIER_WEBHOOK_URL || '';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const required = ['businessName', 'contactName', 'contactEmail', 'contactPhone'];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const submission = {
      type: 'claim',
      businessName: body.businessName,
      contactName: body.contactName,
      contactEmail: body.contactEmail,
      contactPhone: body.contactPhone,
      message: body.message || '',
      submittedAt: new Date().toISOString(),
      status: 'pending',
    };

    // TODO: Save to Supabase when set up

    if (ZAPIER_WEBHOOK_URL) {
      try {
        await fetch(ZAPIER_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            alert_type: 'Listing Claim Request',
            business_name: submission.businessName,
            contact_name: submission.contactName,
            contact_email: submission.contactEmail,
            contact_phone: submission.contactPhone,
            submitted_at: submission.submittedAt,
            message: `Claim request for "${submission.businessName}" from ${submission.contactName} (${submission.contactEmail}, ${submission.contactPhone})`,
          }),
        });
      } catch (webhookErr) {
        console.error('Zapier webhook failed:', webhookErr);
      }
    }

    return NextResponse.json({ success: true, message: 'Claim request received' });
  } catch (err) {
    console.error('Claim listing error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
