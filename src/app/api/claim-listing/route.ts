import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      businessName,
      contactName,
      contactEmail,
      contactPhone,
      message,
    } = body;

    // Basic validation
    if (!businessName || !contactName || !contactEmail) {
      return NextResponse.json(
        { error: 'Business name, contact name, and email are required.' },
        { status: 400 }
      );
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('form_submissions')
      .insert({
        type: 'claim',
        business_name: businessName,
        contact_name: contactName,
        contact_email: contactEmail,
        contact_phone: contactPhone || null,
        message: message || null,
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to submit claim. Please try again.' },
        { status: 500 }
      );
    }

    // Fire Zapier webhook for email/SMS notification
    const webhookUrl = process.env.ZAPIER_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'claim_request',
            businessName,
            contactName,
            contactEmail,
            contactPhone: contactPhone || 'Not provided',
            message: message || 'Not provided',
            submittedAt: new Date().toISOString(),
          }),
        });
      } catch (webhookError) {
        console.error('Zapier webhook error:', webhookError);
      }
    }

    return NextResponse.json(
      { success: true, message: 'Claim submitted successfully!', id: data.id },
      { status: 200 }
    );
  } catch (err) {
    console.error('Claim listing error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}