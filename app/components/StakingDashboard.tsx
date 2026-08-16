const PREVIEW_NFTS = [1, 2, 3, 4];

export function StakingDashboard() {
  return (
    <div className="relative max-w-5xl mx-auto">
      {/* Dashboard content (visually built, but locked) */}
      <div className="pointer-events-none select-none opacity-40 blur-[1px]">
        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="border-4 border-exbr-line bg-exbr-panel p-4">
            <div className="font-mono text-[10px] text-white/50 mb-2">TOTAL VALUE LOCKED</div>
            <div className="font-pixel text-sm text-exbr-amber">0</div>
          </div>
          <div className="border-4 border-exbr-line bg-exbr-panel p-4">
            <div className="font-mono text-[10px] text-white/50 mb-2">YOUR STAKED</div>
            <div className="font-pixel text-sm text-exbr-amber">0</div>
          </div>
          <div className="border-4 border-exbr-line bg-exbr-panel p-4">
            <div className="font-mono text-[10px] text-white/50 mb-2">PENDING REWARDS</div>
            <div className="font-pixel text-sm text-exbr-green">0 $MOGULS</div>
          </div>
          <div className="border-4 border-exbr-line bg-exbr-panel p-4">
            <div className="font-mono text-[10px] text-white/50 mb-2">EST. APY</div>
            <div className="font-pixel text-sm text-exbr-violet">TBA</div>
          </div>
        </div>

        {/* NFT grid to stake */}
        <div className="border-4 border-exbr-line bg-exbr-panel p-5 mb-6">
          <div className="font-pixel text-[10px] text-white/50 mb-4">YOUR MOGULS</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PREVIEW_NFTS.map((n) => (
              <div key={n} className="border-4 border-exbr-line bg-exbr-bg">
                <img src={`/images/roster-${n}.png`} alt="" className="w-full" style={{ imageRendering: 'pixelated' }} />
                <div className="p-2">
                  <button className="w-full font-pixel text-[9px] bg-exbr-amber text-black py-2 border-4 border-black">
                    STAKE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Claim button */}
        <button className="w-full font-pixel text-xs bg-exbr-green text-black py-4 border-4 border-black">
          CLAIM 0 $MOGULS
        </button>
      </div>

      {/* Lock overlay */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="border-4 border-exbr-amber bg-exbr-bg/95 px-8 py-10 text-center max-w-md shadow-[8px_8px_0_#000]">
          <div className="text-3xl mb-4">🔒</div>
          <div className="font-pixel text-sm text-exbr-amber mb-4">STAKING — COMING SOON</div>
          <p className="font-mono text-xs text-white/60 leading-relaxed">
            $MOGULS token launches once the full 4,444 collection sells out.
            Staking opens right after — join the whitelist now so you're
            holding a Mogul before it does.
          </p>
        </div>
      </div>
    </div>
  );
}
