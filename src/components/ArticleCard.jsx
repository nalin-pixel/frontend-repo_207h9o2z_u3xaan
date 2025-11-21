export default function ArticleCard({ article }) {
  const date = article.published_at || article.created_at
  const when = date ? new Date(date).toLocaleDateString() : ''

  return (
    <a href={`/article/${article.slug}`} className="group block rounded-xl overflow-hidden border border-slate-800 bg-slate-800/40 hover:bg-slate-800/70 transition">
      {article.image_url && (
        <div className="h-48 w-full overflow-hidden">
          <img src={article.image_url} alt={article.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
      )}
      <div className="p-4">
        <div className="text-xs text-blue-300/70 mb-1">{article.category}</div>
        <h3 className="text-white font-semibold group-hover:text-blue-300">{article.title}</h3>
        {article.summary && <p className="text-blue-200/80 text-sm mt-1 line-clamp-2">{article.summary}</p>}
        <div className="text-xs text-blue-300/60 mt-3">{when} • {article.author}</div>
      </div>
    </a>
  )}
