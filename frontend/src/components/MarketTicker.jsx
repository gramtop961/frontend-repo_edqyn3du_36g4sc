import { useEffect, useState } from 'react'

const symbols = ['AAPL','MSFT','GOOGL','AMZN','TSLA']

export default function MarketTicker(){
  const [quotes, setQuotes] = useState([])

  useEffect(() => {
    const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    async function load(){
      try{
        const qs = await Promise.all(symbols.map(async s => {
          const r = await fetch(`${base}/market/overview?symbol=${s}`)
          const d = await r.json()
          const q = d?.['Global Quote'] || {}
          return { s, price: q['05. price'] || '—', change: q['10. change percent'] || '—' }
        }))
        setQuotes(qs)
      }catch(e){
        setQuotes(symbols.map(s=>({s, price:'—', change:'—'})))
      }
    }
    load()
    const id = setInterval(load, 15000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl">
      <div className="flex gap-8 animate-[ticker_20s_linear_infinite] whitespace-nowrap p-3">
        {quotes.concat(quotes).map((q,i)=> (
          <div key={i} className="flex items-center gap-2 text-sm">
            <span className="font-semibold">{q.s}</span>
            <span className="text-white/80">{q.price}</span>
            <span className={`${String(q.change).startsWith('-')? 'text-red-400':'text-[#00C853]'}`}>{q.change}</span>
          </div>
        ))}
      </div>
      <style>{`@keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
    </div>
  )
}
