import { useState } from 'react'
import { motion } from 'framer-motion'

const Input = ({ label, type = 'text', value, onChange, placeholder }) => (
  <label className="block mb-4">
    <span className="text-sm text-slate-200/80">{label}</span>
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-slate-100 placeholder:text-slate-400/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
      autoComplete="off"
      required
    />
  </label>
)

const PasswordStrength = ({ password }) => {
  const criteria = [
    /.{8,}/.test(password),
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password)
  ]
  const score = criteria.filter(Boolean).length
  const colors = ['bg-slate-600','bg-red-500','bg-yellow-500','bg-amber-400','bg-lime-400','bg-emerald-500']
  return (
    <div className="mt-2">
      <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
        <div className={`h-full ${colors[score]} transition-all`} style={{ width: `${(score/5)*100}%` }} />
      </div>
      <p className="text-xs text-slate-300/70 mt-1">Strength: {['None','Very Weak','Weak','Fair','Good','Strong'][score]}</p>
    </div>
  )
}

export default function Auth() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      if (mode === 'register') {
        const res = await fetch(`${baseUrl}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, name: name || undefined })
        })
        const data = await res.json().catch(() => ({}))
        if (!res.ok) throw new Error(data?.detail || 'Registration failed')
        setSuccess('Account created. You can log in now.')
        setMode('login')
        setPassword('')
      } else {
        const res = await fetch(`${baseUrl}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data?.detail || 'Login failed')
        localStorage.setItem('tg_token', data.access_token)
        setSuccess('Logged in successfully.')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,200,83,0.15),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(255,214,0,0.12),transparent_45%)]" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">TradeGlass</h1>
          <p className="text-slate-300 mt-2">Secure access with a glassmorphism look and feel.</p>
        </div>

        <div className="mx-auto max-w-3xl grid md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl p-6">
            <div className="flex mb-6 w-full rounded-xl bg-white/5 p-1">
              <button onClick={() => setMode('login')} className={`flex-1 py-2 rounded-lg transition ${mode==='login' ? 'bg-white/20 text-white' : 'text-slate-300 hover:text-white'}`}>Login</button>
              <button onClick={() => setMode('register')} className={`flex-1 py-2 rounded-lg transition ${mode==='register' ? 'bg-white/20 text-white' : 'text-slate-300 hover:text-white'}`}>Register</button>
            </div>

            <form onSubmit={handleSubmit}>
              {mode === 'register' && (
                <Input label="Name" value={name} onChange={setName} placeholder="Your name" />
              )}
              <Input label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
              <Input label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" />
              {mode === 'register' && <PasswordStrength password={password} />}

              {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
              {success && <p className="mt-4 text-sm text-emerald-400">{success}</p>}

              <button disabled={loading} type="submit" className="mt-6 w-full py-3 rounded-xl bg-emerald-500/90 hover:bg-emerald-500 text-white font-semibold transition disabled:opacity-60">
                {loading ? 'Please wait…' : (mode === 'register' ? 'Create account' : 'Sign in')}
              </button>
              <p className="text-xs text-slate-400 mt-3 text-center">By continuing you agree to the Terms.</p>
            </form>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
            className="rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl p-6">
            <h3 className="text-white font-semibold text-lg">Benefits</h3>
            <ul className="mt-4 space-y-3 text-slate-300">
              <li>• Install as a PWA and go offline</li>
              <li>• Secure token-based access</li>
              <li>• Glassmorphic UI with smooth transitions</li>
              <li>• Ready for 2FA and WebAuthn</li>
            </ul>
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10">
              <p className="text-sm text-slate-300">Tip: After logging in, your session token is stored locally for API calls.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
