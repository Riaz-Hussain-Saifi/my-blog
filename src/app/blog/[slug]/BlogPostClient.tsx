// src/app/blog/[slug]/BlogPostClient.tsx
"use client"
import { useState, useEffect } from 'react'
import CommentSection from '@/components/CommentSection'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Share2, Bookmark, Heart } from 'lucide-react'
import { BlogPost } from '@/types/blog'

export default function BlogPostClient({ post }: { post: BlogPost }) {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [readingTime, setReadingTime] = useState(0)

  useEffect(() => {
    const wordCount = post.content.trim().split(/\s+/).length
    setReadingTime(Math.ceil(wordCount / 200))
  }, [post])

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    }
  }

  return (
    <motion.article 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16"
    >
      <div className="mb-8">
        <Link
          href="/blog"
          className="text-blue-600 hover:text-blue-700 inline-flex items-center"
        >
          ← Back to Blog
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="relative aspect-video">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="p-6 md:p-8">
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                {post.category}
              </span>
              <time className="text-gray-500 text-sm">{post.date}</time>
              <span className="text-gray-500 text-sm">
                {readingTime} min read
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <span className="ml-3 text-gray-700 font-medium">
                  By {post.author.name}
                </span>
              </div>
              
              <div className="flex gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsLiked(!isLiked)}
                  className={isLiked ? 'text-red-500' : 'text-gray-500'}
                >
                  <Heart className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={isBookmarked ? 'text-blue-500' : 'text-gray-500'}
                >
                  <Bookmark className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleShare}
                  className="text-gray-500"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
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
        </div>
      </div>

      <div className="mt-12 bg-white rounded-xl shadow-lg p-6 md:p-8">
        <CommentSection postId={post.id} />
      </div>
    </motion.article>
  )
}