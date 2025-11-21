import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function ArticlePage() {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const res = await fetch(`${API}/api/articles/${slug}`)
        if (!res.ok) throw new Error('Not found')
        const data = await res.json()
        setArticle(data)
      } catch (e) {
        setArticle(null)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [slug])

  if (loading) return <div className="p-6 text-blue-300">Loading...</div>
  if (!article) return <div className="p-6 text-blue-300">Article not found.</div>

  const when = article.published_at || article.created_at
  const dateStr = when ? new Date(when).toLocaleString() : ''

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]" />
      <div className="relative max-w-4xl mx-auto px-4 py-6">
        <Link to="/" className="text-blue-300">← Back</Link>
        <article className="mt-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white">{article.title}</h1>
          <div className="text-blue-300/70 mt-2 text-sm">{article.category} • {dateStr} • {article.author}</div>
          {article.image_url && (
            <img src={article.image_url} alt={article.title} className="w-full h-72 object-cover rounded-xl mt-4 border border-slate-800" />
          )}
          <div className="prose prose-invert max-w-none mt-6 text-blue-100/90">
            {article.content}
          </div>
        </article>
      </div>
    </div>
  )
}
