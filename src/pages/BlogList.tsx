import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, Calendar, ArrowLeft } from 'lucide-react'

interface PostMeta {
  slug: string
  title: string
  metaDescription: string
  coverImage: string
  publishedAt: string
  readingTime: number
  tags: string[]
}

export function BlogList() {
  const [posts, setPosts] = useState<PostMeta[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/blog/posts/_index.json')
      .then((r) => r.json())
      .then((data: PostMeta[]) => {
        const sorted = [...data].sort(
          (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        )
        setPosts(sorted)
      })
      .catch(() => setPosts([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-black pt-28 pb-20">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        {/* Back to home */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-white-dim hover:text-accent transition-colors mb-10"
        >
          <ArrowLeft size={16} />
          Volver al inicio
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-display)] text-white mb-4">
            Blog{' '}
            <span className="text-gradient-accent">Aima Legacy</span>
          </h1>
          <p className="text-lg text-white-dim max-w-2xl">
            Automatizacion, IA y estrategia para negocios locales. Articulos
            generados con inteligencia artificial y verificados por humanos.
          </p>
        </motion.div>

        {/* Posts grid */}
        {loading ? (
          <div className="grid gap-8 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-2xl bg-black-card border border-white/[0.06] p-6 animate-pulse">
                <div className="h-48 bg-white/[0.04] rounded-xl mb-4" />
                <div className="h-6 bg-white/[0.06] rounded w-3/4 mb-3" />
                <div className="h-4 bg-white/[0.04] rounded w-full mb-2" />
                <div className="h-4 bg-white/[0.04] rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-xl text-white-dim mb-4">Todavia no hay articulos publicados.</p>
            <p className="text-white-muted">
              Los primeros articulos se generaran automaticamente. Vuelve pronto.
            </p>
          </motion.div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {posts.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group block rounded-2xl bg-black-card border border-white/[0.06] hover:border-accent/20 transition-all duration-300 overflow-hidden hover:shadow-[0_0_40px_rgba(212,175,55,0.06)]"
                >
                  {post.coverImage && (
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black-card to-transparent" />
                    </div>
                  )}
                  <div className="p-6">
                    {/* Tags */}
                    {post.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent/80 border border-accent/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <h2 className="text-xl font-bold text-white group-hover:text-accent transition-colors duration-200 mb-3 font-[family-name:var(--font-display)] line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-sm text-white-dim line-clamp-3 mb-4">
                      {post.metaDescription}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-xs text-white-muted">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar size={13} />
                          {new Date(post.publishedAt).toLocaleDateString('es-ES', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={13} />
                          {post.readingTime} min
                        </span>
                      </div>
                      <span className="flex items-center gap-1 text-accent/60 group-hover:text-accent transition-colors">
                        Leer <ArrowRight size={13} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
