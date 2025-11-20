import Spline from '@splinetool/react-spline'

export default function Hero(){
  return (
    <section className="relative grid md:grid-cols-2 gap-6 items-center">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Trade smarter with glass clarity
        </h1>
        <p className="text-white/80">Real‑time charts, AI‑driven signals, and a fluid glass UI built for speed.</p>
        <div className="flex gap-3">
          <a href="#dash" className="px-5 py-3 rounded-xl bg-[#00C853] text-black font-semibold hover:brightness-95">Open Dashboard</a>
          <a href="#install" className="px-5 py-3 rounded-xl border border-white/30 bg-white/10 hover:bg-white/15">Install PWA</a>
        </div>
      </div>
      <div className="h-[320px] sm:h-[420px] md:h-[520px] rounded-3xl overflow-hidden bg-white/5 border border-white/20 backdrop-blur-xl">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
    </section>
  )
}
