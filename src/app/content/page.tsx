import HeroSection from '@/components/HeroSection'
import Link from 'next/link'
import Image from 'next/image'

export default function Content() {
  const categories = [
    {
      title: 'Technology',
      description: 'Latest updates in tech world',
      image: '/technology.jpeg',
    },
    {
      title: 'Design',
      description: 'UI/UX and graphic design insights',
      image: '/design.jpeg',
    },
    {
      title: 'Development',
      description: 'Programming and software development',
      image: '/deployment.webp',
    },
    {
      title: 'Business',
      description: 'Business strategies and insights',
      image: '/bisness.jpeg',
    },
    {
      title: 'Marketing',
      description: 'Digital marketing trends',
      image: '/marketing.jpg',
    },
    {
      title: 'Lifestyle',
      description: 'Work-life balance and productivity',
      image: '/lifestyle.jpeg',
    },
  ]

  return (
    <div>
      <HeroSection
        title="Explore Our Content"
        subtitle="Discover articles and resources across various categories"
        imageUrl="/content-hero.png"
        // Image should be 1920/1080
      />

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <Image
                  src={category.image}
                  alt={category.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <Link
                    href={`/blog?category=${category.title.toLowerCase()}`}
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                  >
                    Explore {category.title}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Want to Contribute?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Share your knowledge and expertise with our community. We're always
            looking for new contributors to help us create valuable content.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  )
}