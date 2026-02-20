import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q');

  if (!query || query.length < 2) {
    return NextResponse.json({ businesses: [] });
  }

  const { data, error } = await supabase
    .from('businesses')
    .select('id, name, category_slug, neighborhood_slug, phone, address')
    .eq('status', 'approved')
    .ilike('name', `%${query}%`)
    .order('review_count', { ascending: false })
    .limit(8);

  if (error) {
    console.error('Search error:', error);
    return NextResponse.json({ businesses: [] });
  }

  return NextResponse.json({ businesses: data });
}
