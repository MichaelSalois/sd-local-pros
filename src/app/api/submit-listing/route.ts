import { NextRequest, NextResponse } from 'next/server';
import { supabase, submitBusinessListing } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      businessName,
      categorySlug,
      categoryOther,
      neighborhoodSlug,
      address,
      phone,
      website,
      contactName,
      contactEmail,
      contactPhone,
      description,
      message,
    } = body;

    // Validate required fields
    if (!businessName || !categorySlug || !neighborhoodSlug || !contactName || !contactEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 1. Save to businesses table (status: pending)
    const result = await submitBusinessListing({
      name: businessName,
      categorySlug: categorySlug === 'other' ? 'other' : categorySlug,
      categoryOther: categorySlug === 'other' ? categoryOther : undefined,
      neighborhoodSlug,
      address: address || '',
      phone: phone || '',
      website: website || '',
      contactName,
      contactEmail,
      contactPhone: contactPhone || '',
      description: description || message || '',
    });

    if (!result.success) {
      console.error('Supabase insert error:', result.error);
    }

    // 2. Also save to form_submissions table (legacy tracking)
    await supabase.from('form_submissions').insert({
      type: 'add',
      business_name: businessName,
      category: categorySlug === 'other' ? `other: ${categoryOther}` : categorySlug,
      neighborhood: neighborhoodSlug,
      contact_name: contactName,
      contact_email: contactEmail,
      contact_phone: contactPhone || '',
      address: address || '',
      website: website || '',
      message: description || message || '',
      status: 'pending',
    });

    // 3. Fire Zapier webhook for email/SMS notification
    const webhookUrl = process.env.ZAPIER_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'new_business_submission',
            businessName,
            category: categorySlug === 'other' ? `Other: ${categoryOther}` : categorySlug,
            neighborhood: neighborhoodSlug,
            contactName,
            contactEmail,
            contactPhone: contactPhone || 'Not provided',
            address: address || 'Not provided',
            website: website || 'Not provided',
            description: description || message || 'Not provided',
            submittedAt: new Date().toISOString(),
          }),
        });
      } catch (webhookError) {
        console.error('Zapier webhook error:', webhookError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Submit listing error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}