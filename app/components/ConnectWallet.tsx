'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';

export function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="font-mono text-[10px] md:text-xs border-4 border-exbr-green bg-exbr-green/10 text-exbr-green px-2 md:px-3 py-2 whitespace-nowrap">
          {address?.slice(0, 4)}...{address?.slice(-3)}
        </div>
        <button
          onClick={() => disconnect()}
          aria-label="Disconnect wallet"
          className="font-pixel text-[10px] bg-transparent text-white/70 px-2 md:px-3 py-2 border-4 border-exbr-line hover:border-exbr-red hover:text-exbr-red transition-colors flex-shrink-0"
        >
          <span className="md:hidden">✕</span>
          <span className="hidden md:inline">DISCONNECT</span>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => connect({ connector: connectors[0] })}
      disabled={isPending}
      className="font-pixel text-[10px] bg-exbr-amber text-black px-3 md:px-4 py-3 border-4 border-black shadow-[3px_3px_0_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#000] transition-all disabled:opacity-50 whitespace-nowrap flex-shrink-0"
    >
      {isPending ? '...' : 'CONNECT'}
    </button>
  );
}
