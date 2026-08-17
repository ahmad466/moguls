import { Nav } from './components/Nav';
import { Lobby3D } from './components/Lobby3D';

export default function Home() {
  return (
    <main className="bg-exbr-bg text-white h-screen flex flex-col overflow-hidden">
      {/* Ticker */}
      <div className="bg-black border-b-4 border-exbr-line overflow-hidden whitespace-nowrap py-2 flex-shrink-0">
        <div className="inline-block font-mono text-xs animate-[scroll_25s_linear_infinite] pl-full">
          <span className="mx-8 text-exbr-green">▲ MOGULS SUPPLY 4,444</span>
          <span className="mx-8 text-exbr-green">▲ WHITELIST OPEN</span>
          <span className="mx-8 text-exbr-red">▼ MINT PRICE TBA</span>
          <span className="mx-8 text-exbr-green">▲ $MOGULS SUPPLY 1,000,000,000</span>
          <span className="mx-8 text-exbr-green">▲ NETWORK ROBINHOOD CHAIN</span>
        </div>
      </div>

      <div className="flex-shrink-0">
        <Nav />
      </div>

      {/* Lobby fills all remaining space */}
      <div className="flex-1 min-h-0">
        <Lobby3D />
      </div>
    </main>
  );
}
