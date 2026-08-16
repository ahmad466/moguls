import { Nav } from './components/Nav';
import { WhitelistForm } from './components/WhitelistForm';

const ROSTER = [
  { id: 1, rarity: 'RARE' },
  { id: 2, rarity: 'COMMON' },
  { id: 3, rarity: 'COMMON' },
  { id: 4, rarity: 'RARE' },
  { id: 5, rarity: 'COMMON' },
  { id: 6, rarity: 'LEGENDARY' },
];

const RARITY_COLOR: Record<string, string> = {
  COMMON: 'text-white/50',
  RARE: 'text-exbr-amber',
  LEGENDARY: 'text-exbr-violet',
};

export default function Home() {
  return (
    <main className="bg-exbr-bg min-h-screen text-white">
      {/* Ticker */}
      <div className="bg-black border-b-4 border-exbr-line overflow-hidden whitespace-nowrap py-2">
        <div className="inline-block font-mono text-xs animate-[scroll_25s_linear_infinite] pl-full">
          <span className="mx-8 text-exbr-green">▲ MOGULS SUPPLY 4,444</span>
          <span className="mx-8 text-exbr-green">▲ WHITELIST OPEN</span>
          <span className="mx-8 text-exbr-red">▼ MINT PRICE TBA</span>
          <span className="mx-8 text-exbr-green">▲ $MOGULS SUPPLY 1,000,000,000</span>
          <span className="mx-8 text-exbr-green">▲ NETWORK ROBINHOOD CHAIN</span>
        </div>
      </div>

      {/* Nav */}
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-24 text-center border-b-4 border-exbr-line scanlines">
        <span className="pixel-star" style={{ top: '15%', left: '8%', animationDelay: '0s' }} />
        <span className="pixel-star" style={{ top: '30%', left: '85%', animationDelay: '0.6s' }} />
        <span className="pixel-star" style={{ top: '70%', left: '12%', animationDelay: '1.2s' }} />
        <span className="pixel-star" style={{ top: '20%', left: '50%', animationDelay: '0.3s' }} />
        <span className="pixel-star" style={{ top: '80%', left: '75%', animationDelay: '0.9s' }} />
        <span className="pixel-star" style={{ top: '55%', left: '92%', animationDelay: '1.5s' }} />

        <img
          src="/images/roster-1.png"
          alt=""
          className="hidden md:block absolute w-24 h-24 left-[6%] top-[20%] border-4 border-exbr-line"
          style={{ animation: 'float 3.2s ease-in-out infinite' }}
        />
        <img
          src="/images/roster-3.png"
          alt=""
          className="hidden md:block absolute w-20 h-20 right-[8%] top-[15%] border-4 border-exbr-line"
          style={{ animation: 'float 2.6s ease-in-out infinite', animationDelay: '0.4s' }}
        />
        <img
          src="/images/roster-5.png"
          alt=""
          className="hidden md:block absolute w-16 h-16 right-[14%] bottom-[10%] border-4 border-exbr-line"
          style={{ animation: 'float 3.6s ease-in-out infinite', animationDelay: '0.8s' }}
        />

        <div className="relative z-10">
          <div className="inline-block font-pixel text-[10px] text-exbr-amber border-2 border-exbr-amber px-3 py-2 mb-8 animate-pulse">
            WHITELIST APPLICATIONS OPEN
          </div>
          <h1 className="font-pixel text-2xl md:text-4xl leading-relaxed mb-6">
            EVERY MOGUL<br />
            STARTS ON THE <span className="text-exbr-amber">FLOOR</span>
            <span
              className="inline-block w-3 md:w-5 h-6 md:h-9 bg-exbr-amber ml-2 align-middle"
              style={{ animation: 'blink 1s steps(1) infinite' }}
            />
          </h1>
          <p className="font-mono text-sm text-white/60 max-w-lg mx-auto mb-10">
            4,444 pixel-art executives clawing their way up the trading floor.
            Hold one, stake it, and start earning $MOGULS — the house currency
            of the whole operation.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a href="#whitelist" className="font-pixel text-xs bg-exbr-amber text-black px-6 py-4 border-4 border-black shadow-[4px_4px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#000] transition-all">
              CLAIM YOUR SEAT
            </a>
            <a href="#roster" className="font-pixel text-xs bg-transparent text-white px-6 py-4 border-4 border-exbr-line hover:border-exbr-amber transition-colors">
              MEET THE ROSTER
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-6 py-16 border-b-4 border-exbr-line">
        <div className="flex items-end justify-between flex-wrap gap-3 mb-10 max-w-5xl mx-auto">
          <h2 className="font-pixel text-sm">COMPANY PROFILE</h2>
          <span className="font-mono text-[10px] text-white/40">FILED — FORM MOGULS-1</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto border-4 border-exbr-line">
          <div className="p-6 border-b-4 md:border-b-0 md:border-r-4 border-exbr-line">
            <div className="font-pixel text-[10px] text-exbr-amber mb-3">THE COLLECTION</div>
            <p className="font-mono text-xs text-white/60 leading-relaxed">
              4,444 hand-drawn pixel executives, no two built alike. Every
              suit, stare, and side-glance is rolled from scratch — some
              come out common, some come out legendary.
            </p>
          </div>
          <div className="p-6 border-b-4 md:border-b-0 md:border-r-4 border-exbr-line">
            <div className="font-pixel text-[10px] text-exbr-amber mb-3">THE WHITELIST</div>
            <p className="font-mono text-xs text-white/60 leading-relaxed">
              A short line, ahead of the crowd. Apply free with your wallet
              and lock in a guaranteed seat before the public rush — and
              before price goes up.
            </p>
          </div>
          <div className="p-6">
            <div className="font-pixel text-[10px] text-exbr-amber mb-3">THE MINT</div>
            <p className="font-mono text-xs text-white/60 leading-relaxed">
              Price, date, and contract go out to whitelisted wallets first —
              always. The public only finds out after our own people already
              know.
            </p>
          </div>
        </div>
      </section>

      {/* Roster preview */}
      <section id="roster" className="px-6 py-16 border-b-4 border-exbr-line">
        <div className="flex items-end justify-between flex-wrap gap-3 mb-10 max-w-5xl mx-auto">
          <h2 className="font-pixel text-sm">MEET THE ROSTER</h2>
          <span className="font-mono text-[10px] text-white/40">6 OF 4,444</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 max-w-5xl mx-auto">
          {ROSTER.map((item) => (
            <div
              key={item.id}
              className="border-4 border-exbr-line bg-exbr-panel group hover:border-exbr-amber transition-colors"
            >
              <div className="overflow-hidden">
                <img
                  src={`/images/roster-${item.id}.png`}
                  alt={`MOGULS #${item.id}`}
                  className="w-full group-hover:scale-110 transition-transform duration-200"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>
              <div className="flex items-center justify-between px-2 py-2 border-t-4 border-exbr-line font-mono text-[10px]">
                <span className="text-white/50">#{String(item.id).padStart(4, '0')}</span>
                <span className={RARITY_COLOR[item.rarity]}>{item.rarity}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="px-6 py-16 border-b-4 border-exbr-line">
        <div className="flex items-end justify-between flex-wrap gap-3 mb-10 max-w-5xl mx-auto">
          <h2 className="font-pixel text-sm">ROADMAP</h2>
          <span className="font-mono text-[10px] text-white/40">QUARTERLY FILINGS</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 max-w-5xl mx-auto border-4 border-exbr-line">
          <div className="p-6 border-b-4 md:border-b-0 md:border-r-4 border-exbr-line">
            <div className="font-pixel text-[10px] text-exbr-amber mb-3">Q1</div>
            <h3 className="font-pixel text-xs mb-3 leading-relaxed">DOORS OPEN</h3>
            <p className="font-mono text-xs text-white/60 leading-relaxed">
              Whitelist applications go live. First 500 verified applicants
              lock in early-bird pricing.
            </p>
          </div>
          <div className="p-6 border-b-4 md:border-b-0 md:border-r-4 border-exbr-line">
            <div className="font-pixel text-[10px] text-exbr-amber mb-3">Q2</div>
            <h3 className="font-pixel text-xs mb-3 leading-relaxed">GO LIVE ON-CHAIN</h3>
            <p className="font-mono text-xs text-white/60 leading-relaxed">
              Contract deployed and verified. Whitelist mint window locked
              in and announced.
            </p>
          </div>
          <div className="p-6 border-b-4 md:border-b-0 md:border-r-4 border-exbr-line">
            <div className="font-pixel text-[10px] text-exbr-amber mb-3">Q3</div>
            <h3 className="font-pixel text-xs mb-3 leading-relaxed">TRADING FLOOR OPENS</h3>
            <p className="font-mono text-xs text-white/60 leading-relaxed">
              Remaining supply opens to the public. MOGULS lists on OpenSea.
            </p>
          </div>
          <div className="p-6">
            <div className="font-pixel text-[10px] text-exbr-amber mb-3">Q4</div>
            <h3 className="font-pixel text-xs mb-3 leading-relaxed">PUT IT TO WORK</h3>
            <p className="font-mono text-xs text-white/60 leading-relaxed">
              NFT staking goes live. Every Mogul in your wallet starts
              earning $MOGULS.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-6 py-16 border-b-4 border-exbr-line">
        <h2 className="font-pixel text-sm text-center mb-10">FAQ</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          <details className="border-4 border-exbr-line bg-exbr-panel p-5 group" open>
            <summary className="font-pixel text-xs cursor-pointer list-none flex justify-between items-center">
              DOES IT COST ANYTHING TO APPLY?
              <span className="text-exbr-amber group-open:hidden">+</span>
              <span className="text-exbr-amber hidden group-open:inline">−</span>
            </summary>
            <p className="font-mono text-xs text-white/60 mt-4 leading-relaxed">
              Zero. Applying for the whitelist is free — you only spend
              anything once you actually mint.
            </p>
          </details>

          <details className="border-4 border-exbr-line bg-exbr-panel p-5 group">
            <summary className="font-pixel text-xs cursor-pointer list-none flex justify-between items-center">
              WHEN DOES MINTING OPEN?
              <span className="text-exbr-amber group-open:hidden">+</span>
              <span className="text-exbr-amber hidden group-open:inline">−</span>
            </summary>
            <p className="font-mono text-xs text-white/60 mt-4 leading-relaxed">
              Announced here and on our socials once the contract is
              deployed and verified. Whitelisted wallets hear it first.
            </p>
          </details>

          <details className="border-4 border-exbr-line bg-exbr-panel p-5 group">
            <summary className="font-pixel text-xs cursor-pointer list-none flex justify-between items-center">
              HOW DOES $MOGULS STAKING WORK?
              <span className="text-exbr-amber group-open:hidden">+</span>
              <span className="text-exbr-amber hidden group-open:inline">−</span>
            </summary>
            <p className="font-mono text-xs text-white/60 mt-4 leading-relaxed">
              Stake your Mogul, and it earns $MOGULS for you while it sits
              in your wallet — out of a fixed 1,000,000,000 token supply.
              Full mechanics announced closer to Q4.
            </p>
          </details>

          <details className="border-4 border-exbr-line bg-exbr-panel p-5 group">
            <summary className="font-pixel text-xs cursor-pointer list-none flex justify-between items-center">
              WHERE DO I TRADE MOGULS AFTER MINT?
              <span className="text-exbr-amber group-open:hidden">+</span>
              <span className="text-exbr-amber hidden group-open:inline">−</span>
            </summary>
            <p className="font-mono text-xs text-white/60 mt-4 leading-relaxed">
              The collection lists on OpenSea the moment minting goes live.
            </p>
          </details>
        </div>
      </section>

      {/* Whitelist form */}
      <section id="whitelist" className="px-6 py-16">
        <h2 className="font-pixel text-sm text-center mb-2">
          CLAIM YOUR SEAT
        </h2>
        <p className="font-mono text-xs text-white/50 text-center mb-10">
          Free to apply. Guaranteed mint access if you're in.
        </p>
        <WhitelistForm />
      </section>

      {/* Footer */}
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
