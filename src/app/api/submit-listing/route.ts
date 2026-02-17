import { NextRequest, NextResponse } from 'next/server';

// ============================================================
// POST /api/submit-listing
// Handles "Add a Business" form submissions
// Sends alert via Zapier webhook (email + SMS)
// ============================================================

const ZAPIER_WEBHOOK_URL = process.env.ZAPIER_WEBHOOK_URL || '';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Basic validation
    const required = ['businessName', 'categorySlug', 'neighborhoodSlug', 'contactName', 'contactEmail'];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Prepare the submission data
    const submission = {
      type: 'add',
      businessName: body.businessName,
      categorySlug: body.categorySlug,
      neighborhoodSlug: body.neighborhoodSlug,
      contactName: body.contactName,
      contactEmail: body.contactEmail,
      contactPhone: body.phone || '',
      address: body.address || '',
      website: body.website || '',
      description: body.description || '',
      submittedAt: new Date().toISOString(),
      status: 'pending',
    };

    // TODO: When Supabase is set up, save to database here
    // const { data, error } = await supabase.from('submissions').insert(submission);

    // Send Zapier webhook alert (email + SMS notification)
    if (ZAPIER_WEBHOOK_URL) {
      try {
        await fetch(ZAPIER_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            alert_type: 'New Business Submission',
            business_name: submission.businessName,
            category: submission.categorySlug,
            neighborhood: submission.neighborhoodSlug,
            contact_name: submission.contactName,
            contact_email: submission.contactEmail,
            contact_phone: submission.contactPhone,
            website: submission.website,
            submitted_at: submission.submittedAt,
            message: `New business "${submission.businessName}" submitted for ${submission.categorySlug} in ${submission.neighborhoodSlug}. Contact: ${submission.contactName} (${submission.contactEmail})`,
          }),
        });
      } catch (webhookErr) {
        // Don't fail the request if webhook fails
        console.error('Zapier webhook failed:', webhookErr);
      }
    }

    return NextResponse.json({ success: true, message: 'Submission received' });
  } catch (err) {
    console.error('Submit listing error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
