import { Nav } from '../components/Nav';

const PREVIEW_NFTS = [1, 2, 3, 4];

export default function StakingPage() {
  return (
    <main className="bg-exbr-bg min-h-screen text-white">
      <Nav />

      <section className="px-6 py-14 border-b-4 border-exbr-line">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h1 className="font-pixel text-xl md:text-3xl mb-4">STAKING</h1>
          <p className="font-mono text-xs md:text-sm text-white/60 max-w-lg mx-auto">
            Stake your MOGUL, earn $MOGUL while it sits in your wallet.
            Opens right after the 4,444 collection sells out.
          </p>
        </div>

        {/* Hero graphic with lock badge stamped on top */}
        <div className="relative max-w-2xl mx-auto mb-12">
          <div className="grid grid-cols-4 border-4 border-exbr-line">
            {PREVIEW_NFTS.map((n) => (
              <img
                key={n}
                src={`/images/roster-${n}.png`}
                alt=""
                className="w-full"
                style={{ imageRendering: 'pixelated' }}
              />
            ))}
          </div>
          <div
            className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-exbr-amber text-black font-pixel text-[10px] md:text-xs px-4 py-3 border-4 border-black shadow-[4px_4px_0_#000]"
            style={{ transform: 'rotate(8deg)' }}
          >
            🔒 SOON
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-6">
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

        {/* NFT grid to stake — disabled */}
        <div className="border-4 border-exbr-line bg-exbr-panel p-5 max-w-5xl mx-auto mb-6">
          <div className="font-pixel text-[10px] text-white/50 mb-4">YOUR MOGULS</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PREVIEW_NFTS.map((n) => (
              <div key={n} className="border-4 border-exbr-line bg-exbr-bg opacity-50">
                <img src={`/images/roster-${n}.png`} alt="" className="w-full" style={{ imageRendering: 'pixelated' }} />
                <div className="p-2">
                  <button
                    disabled
                    title="Staking opens after sellout"
                    className="w-full font-pixel text-[9px] bg-exbr-line text-white/40 py-2 border-4 border-black cursor-not-allowed"
                  >
                    LOCKED
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Claim button — disabled */}
        <div className="max-w-5xl mx-auto">
          <button
            disabled
            title="Staking opens after sellout"
            className="w-full font-pixel text-xs bg-exbr-line text-white/40 py-4 border-4 border-black cursor-not-allowed mb-4"
          >
            CLAIM 0 $MOGULS
          </button>
          <p className="font-mono text-[10px] text-white/40 text-center">
            Haven't got a Mogul yet?{' '}
            <a href="/#whitelist" className="text-exbr-amber underline">
              Apply for the whitelist
            </a>{' '}
            before the seats run out.
          </p>
        </div>
      </section>

      <footer className="px-6 py-10 border-t-4 border-exbr-line flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-pixel text-[10px]">
          MOG<span className="text-exbr-amber">ULS</span>
        </div>
        <div className="flex gap-6 font-mono text-xs text-white/50">
          <a href="#" target="_blank" className="hover:text-white">X / Twitter</a>
          <a href="#" target="_blank" className="hover:text-white">Discord</a>
          <a href="#" target="_blank" className="hover:text-white">OpenSea</a>
        </div>
        <div className="font-mono text-[10px] text-white/30">© 2026 MOGULS. Not investment advice.</div>
      </footer>
    </main>
  );
}
