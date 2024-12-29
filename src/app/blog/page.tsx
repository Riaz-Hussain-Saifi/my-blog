import { blogPosts } from '@/data/posts'
import Link from 'next/link'
import Image from 'next/image'
import HeroSection from '@/components/HeroSection'
import { Button } from '@/components/ui/button'
 
export default function BlogList() {
  return (
    <div>
      <HeroSection
        title="Our Blog"
        subtitle="Insights, tutorials, and updates from our team"
        imageUrl="/our-blog.jpeg"
        // Image should be 1920/1080
      />
      <section className="py-8 md:py-16 px-4 sm:px-6 lg:px-8">

        {/* Categories Filter */}
        <div className="mb-12 max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-4">
              {['All', 'Development', 'Design', 'Technology', 'Business'].map((category) => (
                <Button
                  key={category}
                  className="px-4 py-2 rounded-full border border-gray-300 hover:border-blue-500 hover:text-blue-500 transition-colors"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Grid */}
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Our Blog</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link 
                href={`/blog/${post.slug}`} 
                key={post.id}
                className="group"
              >
                <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative aspect-video">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                        {post.category}
                      </span>
                      <span className="text-sm text-gray-500">{post.date}</span>
                    </div>
                    <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex items-center">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <span className="ml-2 text-sm text-gray-500">
                        {post.author.name}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}