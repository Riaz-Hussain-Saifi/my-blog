
import { blogPosts } from '@/data/posts'
import CommentSection from '@/components/CommentSection'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
      <div className="mb-8">
        <Link
          href="/blog"
          className="text-blue-600 hover:text-blue-700 inline-flex items-center"
        >
          ← Back to Blog
        </Link>
      </div>

      <div className="relative aspect-video mb-8">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover rounded-lg"
          priority
        />
      </div>

      <header className="mb-8">
        <div className="flex flex-wrap gap-4 mb-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
            {post.category}
          </span>
          <span className="text-gray-500 text-sm">{post.date}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center">
          <Image
            src={post.author.avatar}
            alt={post.author.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="ml-2 text-gray-700">By {post.author.name}</span>
        </div>
      </header>

      <div className="prose prose-lg max-w-none mb-12">
        {post.content.split('\n').map((paragraph, index) => (
          paragraph.trim() && (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          )
        ))}
      </div>

      <div className="border-t border-gray-200 pt-8">
        <CommentSection postId={post.id} />
      </div>
    </article>
  )
}
