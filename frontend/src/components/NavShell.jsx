import { useState } from 'react'
import { Menu, Settings, Home, LineChart, Newspaper, BarChart3, BriefcaseBusiness, Globe2, Wallet, Bell } from 'lucide-react'

export default function NavShell({ children, onInstallClick }) {
  const [leftOpen, setLeftOpen] = useState(false)
  const [rightOpen, setRightOpen] = useState(false)

  return (
    <div className="min-h-screen text-white bg-[radial-gradient(1200px_600px_at_10%_-10%,rgba(255,214,0,0.18),transparent),radial-gradient(1000px_500px_at_110%_10%,rgba(0,200,83,0.15),transparent)] relative overflow-hidden">
      {/* glass gradient backdrop */}
      <div className="pointer-events-none absolute inset-0 backdrop-blur-xl"></div>

      {/* top bar */}
      <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3 md:px-6">
        <button onClick={() => setLeftOpen(v=>!v)} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20">
          <Menu size={18}/> <span className="hidden sm:inline">Menu</span>
        </button>
        <div className="text-lg font-semibold tracking-tight"><span className="text-[#00C853]">Trade</span><span className="text-[#FFD600]">Glass</span></div>
        <div className="flex items-center gap-2">
          <button onClick={onInstallClick} className="px-3 py-2 rounded-xl bg-[#00C853] text-black font-medium hover:brightness-95">Install</button>
          <button onClick={() => setRightOpen(v=>!v)} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20">
            <Settings size={18}/> <span className="hidden sm:inline">Settings</span>
          </button>
        </div>
      </header>

      {/* left nav */}
      <aside className={`fixed top-16 left-3 z-20 transition-all duration-300 ${leftOpen ? 'w-56' : 'w-14'} `}>
        <div className="rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl p-2">
          <NavItem icon={<Home size={18}/>} label="Home" open={leftOpen}/>
          <NavItem icon={<LineChart size={18}/>} label="Dashboard" open={leftOpen}/>
          <NavItem icon={<BarChart3 size={18}/>} label="Technical" open={leftOpen}/>
          <NavItem icon={<BriefcaseBusiness size={18}/>} label="Fundamental" open={leftOpen}/>
          <NavItem icon={<Newspaper size={18}/>} label="News" open={leftOpen}/>
          <NavItem icon={<Globe2 size={18}/>} label="Calendar" open={leftOpen}/>
          <NavItem icon={<Wallet size={18}/>} label="Trading" open={leftOpen}/>
        </div>
      </aside>

      {/* right settings */}
      <aside className={`fixed top-16 right-3 z-20 transition-all duration-300 ${rightOpen ? 'w-64' : 'w-14'}`}>
        <div className="rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl p-3 space-y-3">
          <div className="flex items-center gap-2"><Bell size={18}/> <span className={`${rightOpen? 'opacity-100':'opacity-0'} transition-opacity`}>Notifications</span></div>
          <div className={`${rightOpen? 'opacity-100':'opacity-0'} transition-opacity text-sm text-white/80`}>
            • Theme: Glassmorphism<br/>• Colors: white, green, yellow
          </div>
        </div>
      </aside>

      {/* mobile bottom bar */}
      <div className="fixed bottom-3 left-0 right-0 mx-auto w-[95%] md:hidden z-30">
        <div className="flex justify-around rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl p-2">
          <Home />
          <LineChart />
          <BarChart3 />
          <Newspaper />
        </div>
      </div>

      {/* main */}
      <main className="pt-20 px-4 md:px-6 pb-24 max-w-[1400px] mx-auto">
        {children}
      </main>
    </div>
  )
}

function NavItem({ icon, label, open }){
  return (
    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/10">
      <span className="shrink-0">{icon}</span>
      <span className={`${open? 'opacity-100':'opacity-0'} transition-opacity`}>{label}</span>
    </button>
  )
}
