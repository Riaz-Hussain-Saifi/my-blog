// src/app/blog/[slug]/page.tsx
import { blogPosts } from '@/data/posts'
import { notFound } from 'next/navigation'
import BlogPostClient from './BlogPostClient'
import { Metadata } from 'next'
import { BlogPost } from '@/types/blog'

type Props = {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found'
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      authors: [post.author.name],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title
        }
      ]
    }
  }
}

export default function Page({ params }: Props) {
  const post: BlogPost | undefined = blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    console.error(`Blog post with slug "${params.slug}" not found.`)
    return notFound()
  }

  return <BlogPostClient post={post} />
}