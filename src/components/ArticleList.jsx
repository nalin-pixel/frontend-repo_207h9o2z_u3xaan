import { useEffect, useState } from 'react'
import ArticleCard from './ArticleCard'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function ArticleList({ category, query }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    async function load() {
      try {
        setLoading(true)
        const url = new URL(`${API}/api/articles`)
        if (category) url.searchParams.set('category', category)
        if (query) url.searchParams.set('q', query)
        const res = await fetch(url, { signal: controller.signal })
        const data = await res.json()
        setItems(data.articles || [])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
    return () => controller.abort()
  }, [category, query])

  if (loading) return <p className="text-blue-300">Loading...</p>
  if (!items.length) return <p className="text-blue-300">No articles found.</p>

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {items.map(a => <ArticleCard key={a._id} article={a} />)}
    </div>
  )
}
