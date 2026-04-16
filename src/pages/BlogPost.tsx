import { useState, useEffect, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, Calendar, Share2 } from 'lucide-react'
import DOMPurify from 'dompurify'

interface PostData {
  slug: string
  title: string
  metaDescription: string
  coverImage: string
  publishedAt: string
  readingTime: number
  tags: string[]
  htmlContent: string
}

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<PostData | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug || !SLUG_RE.test(slug)) { setNotFound(true); setLoading(false); return }
    fetch(`/blog/posts/${encodeURIComponent(slug)}.json`)
      .then((r) => {
        if (!r.ok) throw new Error('Not found')
        return r.json()
      })
      .then((data: PostData) => setPost(data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [slug])

  useEffect(() => {
    if (post) {
      document.title = `${post.title} — Aima Legacy Blog`
      const desc = document.querySelector('meta[name="description"]')
      if (desc) desc.setAttribute('content', post.metaDescription)
    }
    return () => {
      document.title = 'Aima Legacy — Automatizacion con IA para Negocios Locales en Espana'
    }
  }, [post])

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-28 pb-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 animate-pulse">
          <div className="h-4 bg-white/[0.06] rounded w-32 mb-10" />
          <div className="h-10 bg-white/[0.06] rounded w-3/4 mb-4" />
          <div className="h-4 bg-white/[0.04] rounded w-1/2 mb-8" />
          <div className="h-64 bg-white/[0.04] rounded-2xl mb-8" />
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-4 bg-white/[0.04] rounded" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen bg-black pt-28 pb-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Articulo no encontrado</h1>
          <p className="text-white-dim mb-8">Este articulo no existe o ha sido eliminado.</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-black font-semibold hover:bg-accent-light transition-colors"
          >
            <ArrowLeft size={16} />
            Volver al blog
          </Link>
        </div>
      </div>
    )
  }

  const shareUrl = `https://aimalegacy.es/blog/${post.slug}`

  return (
    <div className="min-h-screen bg-black pt-28 pb-20">
      <article className="mx-auto max-w-3xl px-6 lg:px-8">
        {/* Back */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-white-dim hover:text-accent transition-colors mb-10"
        >
          <ArrowLeft size={16} />
          Todos los articulos
        </Link>

        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent/80 border border-accent/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-[family-name:var(--font-display)] leading-tight">
            {post.title}
          </h1>

          {/* Meta row */}
          <div className="flex items-center gap-4 text-sm text-white-muted mb-8">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {new Date(post.publishedAt).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {post.readingTime} min de lectura
            </span>
            <button
              onClick={() => navigator.clipboard.writeText(shareUrl)}
              className="flex items-center gap-1.5 hover:text-accent transition-colors cursor-pointer ml-auto"
              title="Copiar enlace"
            >
              <Share2 size={14} />
              Compartir
            </button>
          </div>

          {/* Cover image */}
          {post.coverImage && (
            <div className="rounded-2xl overflow-hidden mb-10 border border-white/[0.06]">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}
        </motion.header>

        {/* Article body — rendered from HTML generated by n8n, sanitized against XSS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.htmlContent, { ALLOWED_TAGS: ['h1','h2','h3','h4','h5','h6','p','a','ul','ol','li','strong','em','code','pre','blockquote','img','br','hr','span','div','table','thead','tbody','tr','th','td','figure','figcaption'], ALLOWED_ATTR: ['href','src','alt','title','class','id','target','rel','width','height','loading'], ADD_ATTR: ['target'], FORBID_TAGS: ['script','iframe','object','embed','form','input','style'], FORBID_ATTR: ['onerror','onload','onclick','onmouseover'] }) }}
        />

        {/* Footer CTA */}
        <div className="mt-16 p-8 rounded-2xl bg-black-card border border-accent/10 text-center">
          <h2 className="text-2xl font-bold text-white mb-3 font-[family-name:var(--font-display)]">
            Quieres automatizar tu negocio?
          </h2>
          <p className="text-white-dim mb-6">
            Solicita un diagnóstico estratégico y descubre cómo la IA
            puede ahorrarte +10h a la semana.
          </p>
          <a
            href="/#contacto"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-accent via-accent-light to-accent text-black font-semibold shadow-[0_4px_20px_rgba(212,175,55,0.3)] hover:shadow-[0_4px_50px_rgba(212,175,55,0.5)] transition-all duration-300"
          >
            Solicitar Diagnostico
          </a>
        </div>
      </article>
    </div>
  )
}
