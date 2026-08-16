const MENU = [
  { label: 'OVERVIEW', icon: '▣', active: true },
  { label: 'YOUR COLLECTION', icon: '🖼' },
  { label: 'STAKE', icon: '🔒' },
  { label: 'SWAP', icon: '⇄' },
  { label: 'HISTORY', icon: '☰' },
  { label: 'SETTINGS', icon: '⚙' },
];

export function StakingSidebar() {
  return (
    <aside className="w-full md:w-56 flex-shrink-0 border-b-4 md:border-b-0 md:border-r-4 border-exbr-line bg-exbr-panel">
      <div className="px-5 py-5 border-b-4 border-exbr-line hidden md:block">
        <div className="font-pixel text-[10px] text-white/40">DASHBOARD</div>
      </div>
      <nav className="flex md:flex-col overflow-x-auto md:overflow-visible">
        {MENU.map((item) => (
          <button
            key={item.label}
            disabled={!item.active}
            title={item.active ? undefined : 'Coming soon'}
            className={`flex items-center gap-3 px-5 py-4 font-pixel text-[10px] whitespace-nowrap flex-shrink-0 border-b-4 md:border-b-4 border-r-4 md:border-r-0 border-exbr-line text-left transition-colors ${
              item.active
                ? 'bg-exbr-amber text-black'
                : 'text-white/30 cursor-not-allowed'
            }`}
          >
            <span>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
