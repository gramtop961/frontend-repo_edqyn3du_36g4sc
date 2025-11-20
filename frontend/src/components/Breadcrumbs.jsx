import { Link, useLocation } from 'react-router-dom'

export default function Breadcrumbs(){
  const { pathname } = useLocation()
  const parts = pathname.split('/').filter(Boolean)
  const crumbs = parts.map((p, i) => ({
    name: p.charAt(0).toUpperCase() + p.slice(1).replace('-', ' '),
    path: '/' + parts.slice(0, i+1).join('/')
  }))
  return (
    <nav className="text-sm text-white/80 mb-3">
      <Link to="/" className="hover:text-[#FFD600]">Home</Link>
      {crumbs.map((c, i) => (
        <span key={i}> <span className="text-white/40">/</span> <Link to={c.path} className="hover:text-[#FFD600]">{c.name}</Link></span>
      ))}
    </nav>
  )
}
