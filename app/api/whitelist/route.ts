import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_ANON_KEY as string
);

export async function POST(req: Request) {
  try {
    const { wallet, email, twitter, taskFollow, taskLike, taskRetweet } = await req.json();

    if (!/^0x[a-fA-F0-9]{40}$/.test(wallet)) {
      return NextResponse.json({ error: 'Wallet address tidak valid' }, { status: 400 });
    }
    if (!taskFollow || !taskLike || !taskRetweet) {
      return NextResponse.json({ error: 'Selesaikan semua task sosial dulu' }, { status: 400 });
    }

    const normalizedWallet = wallet.toLowerCase();

    const { error } = await supabase.from('whitelist').insert([{
      wallet: normalizedWallet,
      email: email || null,
      twitter: twitter || null,
      task_follow: taskFollow,
      task_like: taskLike,
      task_retweet: taskRetweet,
    }]);

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'Wallet address ini sudah terdaftar' }, { status: 409 });
      }
      throw error;
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Gagal menyimpan data' }, { status: 500 });
  }
}