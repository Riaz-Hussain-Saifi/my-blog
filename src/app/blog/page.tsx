// src/app/blog/page.tsx
"use client"
import { useState } from 'react'
import { blogPosts } from '@/data/posts'
import Link from 'next/link'
import Image from 'next/image'
import HeroSection from '@/components/HeroSection'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function BlogList() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const categories = ['All', 'Development', 'Design', 'Technology', 'Business']
  
  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory)

  return (
    <div>
      <HeroSection
        title="Our Blog"
        subtitle="Insights, tutorials, and updates from our team"
        imageUrl="/our-blog.jpeg"
      />
      
      <section className="py-8 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 overflow-x-auto">
            <div className="flex gap-4 min-w-max">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full transition-colors duration-300 ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`} className="group block">
                  <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="relative aspect-video">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                          {post.category}
                        </span>
                        <time className="text-sm text-gray-500">{post.date}</time>
                      </div>
                      <h2 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center">
                        <Image
                          src={post.author.avatar}
                          alt={post.author.name}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                        <span className="ml-2 text-sm text-gray-500">
                          {post.author.name}
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}