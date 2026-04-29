import { useEffect } from 'react'

interface PageMeta {
  title: string
  description: string
  canonical: string
  ogImage?: string
  noindex?: boolean
}

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attr, name)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function setCanonical(url: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', url)
}

export function usePageMeta({ title, description, canonical, ogImage, noindex }: PageMeta) {
  useEffect(() => {
    document.title = title
    setMeta('description', description)
    setCanonical(canonical)
    setMeta('og:title', title, 'property')
    setMeta('og:description', description, 'property')
    setMeta('og:url', canonical, 'property')
    if (ogImage) setMeta('og:image', ogImage, 'property')
    setMeta('twitter:title', title)
    setMeta('twitter:description', description)
    setMeta('twitter:url', canonical)
    if (ogImage) setMeta('twitter:image', ogImage)
    setMeta('robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')
  }, [title, description, canonical, ogImage, noindex])
}
