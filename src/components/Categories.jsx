import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Categories({ active, onSelect }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API}/api/categories`)
        const data = await res.json()
        setItems(data.categories || [])
      } catch (e) {
        console.error(e)
      }
    }
    load()
  }, [])

  return (
    <div className="flex gap-2 flex-wrap">
      <button onClick={() => onSelect('')} className={`px-3 py-1 rounded-full text-sm border ${!active ? 'bg-blue-600 text-white border-blue-500' : 'border-slate-700 text-blue-200 hover:bg-slate-800'}`}>All</button>
      {items.map(c => (
        <button key={c._id} onClick={() => onSelect(c.slug)} className={`px-3 py-1 rounded-full text-sm border ${active === c.slug ? 'bg-blue-600 text-white border-blue-500' : 'border-slate-700 text-blue-200 hover:bg-slate-800'}`}>
          {c.name}
        </button>
      ))}
    </div>
  )
}
