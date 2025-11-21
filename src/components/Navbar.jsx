import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') || '')

  const onSubmit = (e) => {
    e.preventDefault()
    const q = query.trim()
    const next = q ? `/?q=${encodeURIComponent(q)}` : '/'
    navigate(next)
  }

  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-slate-900/70 border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
        <a href="/" className="flex items-center gap-2">
          <img src="/flame-icon.svg" className="w-8 h-8" alt="Logo" />
          <span className="text-white font-bold text-xl">Blue News</span>
        </a>
        <form onSubmit={onSubmit} className="ml-auto w-full max-w-md">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full bg-slate-800/70 text-blue-100 placeholder-blue-300/50 rounded-lg pl-10 pr-4 py-2 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300/70">🔎</span>
          </div>
        </form>
      </div>
    </header>
  )
}
