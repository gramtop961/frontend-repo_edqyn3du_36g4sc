import { useEffect, useState } from 'react'
import NavShell from './components/NavShell'
import Hero from './components/Hero'
import MarketTicker from './components/MarketTicker'

function App() {
  // PWA install prompt
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [installed, setInstalled] = useState(false)

  useEffect(() => {
    const beforeInstall = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }
    const installedHandler = () => setInstalled(true)

    window.addEventListener('beforeinstallprompt', beforeInstall)
    window.addEventListener('appinstalled', installedHandler)

    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstall)
      window.removeEventListener('appinstalled', installedHandler)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') setInstalled(true)
    setDeferredPrompt(null)
  }

  return (
    <NavShell onInstallClick={handleInstall}>
      <div className="space-y-6">
        <MarketTicker />
        <Hero />

        {/* Quick cards */}
        <section id="dash" className="grid md:grid-cols-3 gap-4">
          {[
            { title: 'Interactive Dashboard', desc: '3D widgets, drag & resize, real-time streaming', color: 'from-white/30 to-white/5' },
            { title: 'Technical Analysis', desc: 'Indicators, patterns, multi-timeframe sync', color: 'from-[#00C853]/30 to-white/5' },
            { title: 'News & Sentiment', desc: 'Real-time news with sentiment scoring', color: 'from-[#FFD600]/30 to-white/5' }
          ].map((c,i)=> (
            <div key={i} className={`rounded-2xl border border-white/20 bg-gradient-to-br ${c.color} backdrop-blur-xl p-5 hover:translate-y-[-2px] transition`}> 
              <h3 className="font-semibold">{c.title}</h3>
              <p className="text-white/80 text-sm">{c.desc}</p>
              <a href="#" className="inline-block mt-3 text-[#00C853] font-medium">Open →</a>
            </div>
          ))}
        </section>
      </div>
    </NavShell>
  )
}

export default App
