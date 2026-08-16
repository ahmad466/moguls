import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Pakai SERVICE ROLE KEY di sini (bukan anon key) supaya query count ini
// bisa jalan meski RLS aktif dan anon key tidak diberi izin SELECT.
// Aman karena route ini jalan di server, key ini TIDAK PERNAH dikirim ke browser.
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

export async function GET() {
  try {
    const { count, error } = await supabaseAdmin
      .from('whitelist')
      .select('*', { count: 'exact', head: true });

    if (error) throw error;

    return NextResponse.json({ count: count ?? 0 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}