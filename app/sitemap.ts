import type { MetadataRoute } from 'next'
import { WEBSITE_URL } from '@/lib/constants'
import { BLOG_POSTS } from './data'

export default function sitemap(): MetadataRoute.Sitemap {
  const blogEntries = BLOG_POSTS.map((post) => ({
    url: `${WEBSITE_URL}${post.link}`,
    lastModified: new Date(),
  }))

  return [
    {
      url: WEBSITE_URL,
      lastModified: new Date(),
    },
    ...blogEntries,
  ]
}
