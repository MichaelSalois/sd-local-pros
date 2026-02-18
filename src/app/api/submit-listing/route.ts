import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      businessName,
      category,
      neighborhood,
      contactName,
      contactEmail,
      contactPhone,
      address,
      website,
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
        type: 'add',
        business_name: businessName,
        category: category || null,
        neighborhood: neighborhood || null,
        contact_name: contactName,
        contact_email: contactEmail,
        contact_phone: contactPhone || null,
        address: address || null,
        website: website || null,
        message: message || null,
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to submit listing. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Listing submitted successfully!', id: data.id },
      { status: 200 }
    );
  } catch (err) {
    console.error('Submit listing error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
