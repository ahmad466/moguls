'use client';

import { useState } from 'react';

const TWITTER_URL = 'https://twitter.com/moguls_nfts';
const PINNED_TWEET_URL = 'https://twitter.com/moguls_nfts/status/';

export function WhitelistForm() {
  const [wallet, setWallet] = useState('');
  const [email, setEmail] = useState('');
  const [twitter, setTwitter] = useState('');
  const [taskFollow, setTaskFollow] = useState(false);
  const [taskLike, setTaskLike] = useState(false);
  const [taskRetweet, setTaskRetweet] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle');
  const [message, setMessage] = useState('');

  const allTasksDone = taskFollow && taskLike && taskRetweet;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!/^0x[a-fA-F0-9]{40}$/.test(wallet)) {
      setStatus('err');
      setMessage('WALLET ADDRESS TIDAK VALID');
      return;
    }
    if (!allTasksDone) {
      setStatus('err');
      setMessage('SELESAIKAN SEMUA TASK DULU');
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('/api/whitelist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet, email, twitter, taskFollow, taskLike, taskRetweet }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal submit');

      setStatus('ok');
      setMessage('APPLICATION RECEIVED');
      setWallet(''); setEmail(''); setTwitter('');
      setTaskFollow(false); setTaskLike(false); setTaskRetweet(false);
    } catch (err: any) {
      setStatus('err');
      setMessage(err.message || 'TERJADI KESALAHAN');
    }
  }

  return (
    <div className="max-w-xl mx-auto border-4 border-black bg-exbr-panel shadow-[8px_8px_0_#000]">
      <div className="border-b-4 border-black px-4 py-3 flex items-center gap-2 bg-exbr-amber">
        <span className="w-3 h-3 bg-black" />
        <span className="w-3 h-3 bg-black" />
        <span className="w-3 h-3 bg-black" />
        <span className="font-pixel text-[10px] ml-2 text-black">MOGULS-WHITELIST.EXE</span>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        {/* Social tasks */}
        <div className="border-4 border-exbr-line p-4 space-y-3">
          <p className="font-pixel text-[10px] text-exbr-amber mb-2">COMPLETE TASKS</p>

          <label className="flex items-center gap-3 font-mono text-xs cursor-pointer">
            <input type="checkbox" checked={taskFollow} onChange={(e) => setTaskFollow(e.target.checked)} className="w-5 h-5 accent-exbr-amber" />
            <a href={TWITTER_URL} target="_blank" rel="noopener noreferrer" className="underline hover:text-exbr-amber" onClick={() => setTimeout(() => setTaskFollow(true), 300)}>
              1. Follow @MOGULS on X ↗
            </a>
          </label>

          <label className="flex items-center gap-3 font-mono text-xs cursor-pointer">
            <input type="checkbox" checked={taskLike} onChange={(e) => setTaskLike(e.target.checked)} className="w-5 h-5 accent-exbr-amber" />
            <a href={PINNED_TWEET_URL} target="_blank" rel="noopener noreferrer" className="underline hover:text-exbr-amber" onClick={() => setTimeout(() => setTaskLike(true), 300)}>
              2. Like pinned post ↗
            </a>
          </label>

          <label className="flex items-center gap-3 font-mono text-xs cursor-pointer">
            <input type="checkbox" checked={taskRetweet} onChange={(e) => setTaskRetweet(e.target.checked)} className="w-5 h-5 accent-exbr-amber" />
            <a href={PINNED_TWEET_URL} target="_blank" rel="noopener noreferrer" className="underline hover:text-exbr-amber" onClick={() => setTimeout(() => setTaskRetweet(true), 300)}>
              3. Retweet pinned post ↗
            </a>
          </label>
        </div>

        <div>
          <label className="font-pixel text-[10px] block mb-2 text-exbr-amber">WALLET ADDRESS *</label>
          <input type="text" value={wallet} onChange={(e) => setWallet(e.target.value)} placeholder="0x..." required
            className="w-full bg-black border-4 border-white/20 focus:border-exbr-amber outline-none px-3 py-3 text-white font-mono text-sm" />
        </div>

        <div>
          <label className="font-pixel text-[10px] block mb-2 text-exbr-amber">EMAIL</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com"
            className="w-full bg-black border-4 border-white/20 focus:border-exbr-amber outline-none px-3 py-3 text-white font-mono text-sm" />
        </div>

        <div>
          <label className="font-pixel text-[10px] block mb-2 text-exbr-amber">X / TWITTER HANDLE *</label>
          <input type="text" value={twitter} onChange={(e) => setTwitter(e.target.value)} placeholder="@yourhandle" required
            className="w-full bg-black border-4 border-white/20 focus:border-exbr-amber outline-none px-3 py-3 text-white font-mono text-sm" />
          <small className="text-white/40 font-mono text-[10px] block mt-1">Dipakai untuk cross-check manual task sosial di atas.</small>
        </div>

        <button type="submit" disabled={status === 'loading'}
          className="w-full font-pixel text-xs bg-exbr-amber text-black py-4 border-4 border-black shadow-[4px_4px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#000] transition-all disabled:opacity-50">
          {status === 'loading' ? 'SUBMITTING...' : 'SUBMIT APPLICATION'}
        </button>

        {status === 'ok' && <div className="border-4 border-exbr-green bg-exbr-green/10 text-exbr-green font-mono text-xs p-3">✓ {message}</div>}
        {status === 'err' && <div className="border-4 border-exbr-red bg-exbr-red/10 text-exbr-red font-mono text-xs p-3">✗ {message}</div>}
      </form>
    </div>
  );
}