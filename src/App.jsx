import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Categories from './components/Categories'
import ArticleList from './components/ArticleList'
import ArticlePage from './components/ArticlePage'

function HomeView() {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const q = params.get('q') || ''
  const [category, setCategory] = useState('')

  useEffect(() => {
    // Reset category when search changes
    setCategory('')
  }, [q])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]" />
      <Navbar />
      <main className="relative max-w-6xl mx-auto px-4 py-8">
        <section className="flex items-baseline justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Top Stories</h1>
            {q && <p className="text-blue-300/80 mt-1">Search results for "{q}"</p>}
          </div>
        </section>

        <section className="mb-8">
          <Categories active={category} onSelect={setCategory} />
        </section>

        <ArticleList category={category} query={q} />
      </main>
      <footer className="relative border-t border-slate-800/70 py-6 mt-10">
        <div className="max-w-6xl mx-auto px-4 text-blue-300/70 text-sm">
          © {new Date().getFullYear()} Blue News
        </div>
      </footer>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/article/:slug" element={<ArticlePage />} />
    </Routes>
  )
}

export default App
