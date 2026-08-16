import { Nav } from '../components/Nav';
import { StakingSidebar } from '../components/StakingSidebar';

const PREVIEW_NFTS = [1, 2, 3, 4];

export default function StakingPage() {
  return (
    <main className="bg-exbr-bg min-h-screen text-white">
      <Nav />

      <div className="flex flex-col md:flex-row">
        <StakingSidebar />

        <div className="flex-1 px-6 py-10 md:py-14">
          <div className="max-w-4xl mx-auto mb-10">
            <h1 className="font-pixel text-lg md:text-2xl mb-3">STAKING</h1>
            <p className="font-mono text-xs md:text-sm text-white/60">
              Stake your Mogul, earn $MOGULS while it sits in your wallet.
              Opens right after the 4,444 collection sells out.
            </p>
          </div>

          {/* Hero graphic with lock badge stamped on top */}
          <div className="relative max-w-2xl mb-12">
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mb-6">
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

          {/* Your Moguls — empty state */}
          <div className="border-4 border-exbr-line bg-exbr-panel p-5 max-w-4xl mb-6">
            <div className="font-pixel text-[10px] text-white/50 mb-6">YOUR MOGULS</div>
            <div className="flex flex-col items-center justify-center text-center py-12 px-6 border-4 border-dashed border-exbr-line">
              <div className="text-3xl mb-4 opacity-40">🗂</div>
              <p className="font-pixel text-xs text-white/50 mb-2">NO MOGULS FOUND</p>
              <p className="font-mono text-[11px] text-white/40 max-w-xs">
                Connect a wallet holding a MOGULS NFT to see it here, or apply
                for the whitelist if you don't have one yet.
              </p>
              <a
                href="/#whitelist"
                className="mt-6 font-pixel text-[10px] bg-exbr-amber text-black px-4 py-3 border-4 border-black shadow-[3px_3px_0_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#000] transition-all"
              >
                APPLY FOR WHITELIST
              </a>
            </div>
          </div>

          {/* Claim button — disabled */}
          <div className="max-w-4xl">
            <button
              disabled
              title="Staking opens after sellout"
              className="w-full font-pixel text-xs bg-exbr-line text-white/40 py-4 border-4 border-black cursor-not-allowed"
            >
              CLAIM 0 $MOGULS
            </button>
          </div>
        </div>
      </div>

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
