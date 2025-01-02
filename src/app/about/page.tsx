// src/app/about/page.tsx
"use client"
import { useState, useEffect } from 'react'
import HeroSection from '@/components/HeroSection'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const teamMembers = [
  {
    id: 1,
    name: 'Riaz Hussain',
    role: 'Website Creator',
    image: '/web-creater.jpeg',
    description: 'Full-stack developer with over 8 years of experience in creating innovative web solutions. Expert in modern web technologies and user-centric design principles.',
    socials: {
      linkedin: '#',
      github: '#',
      facebook: '#'
    }
  },
  {
    id: 2,
    name: 'Amber Perwaiz',
    role: 'Front-end Developer',
    image: '/Front-End.jpg',
    description: 'Passionate front-end developer specializing in creating responsive and interactive user interfaces. Proficient in React, Next.js, and modern CSS frameworks.',
    socials: {
      linkedin: '#',
      github: '#',
      codepen: '#'
    }
  },
  {
    id: 3,
    name: 'Waqar Ali',
    role: 'Sales & Marketing',
    image: '/sales-man.jpg',
    description: 'Strategic marketing professional with expertise in digital marketing, brand development, and sales optimization. Focused on driving growth and engagement.',
    socials: {
      linkedin: '#',
      twitter: '#',
      instagram: '#'
    }
  }
]

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTeamMember, setActiveTeamMember] = useState<number | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight
      const triggerPosition = window.innerHeight * 0.8
      setIsVisible(scrollPosition > triggerPosition)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen">
      <HeroSection
        title="About Us"
        subtitle="Meet the talented team behind our success"
        imageUrl="/about-us.jpeg"
      />

      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
        transition={{ duration: 0.6 }}
        className="py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                Our Story
              </h2>
              <div className="prose prose-lg">
                <p className="text-gray-600">
                  We started with a vision to create a platform that bridges the gap between technology and user experience. Our journey began with a small team of passionate individuals who believed in making web development more accessible and enjoyable.
                </p>
                <p className="text-gray-600">
                  Today, we&apos;ve grown into a dynamic team of professionals, each bringing unique expertise and perspectives to our work. Our commitment to innovation and quality continues to drive us forward as we help businesses and developers create exceptional web experiences.
                </p>
              </div>
            </div>
            <motion.div 
              className="relative rounded-xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/team-at-work.jpeg"
                alt="Our team at work"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                onHoverStart={() => setActiveTeamMember(member.id)}
              >
                <div className="relative h-72">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                    <p className="text-blue-300">{member.role}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{member.description}</p>
                  <div className="flex space-x-4">
                    {Object.entries(member.socials).map(([platform, link]) => (
                      <Link
                        key={platform}
                        href={link}
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="capitalize">{platform}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Want to Join Our Team?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            We&apos;re always looking for talented individuals who are passionate about web development and innovation. If you think you&apos;d be a great fit, we&apos;d love to hear from you.
          </p>
          <Link
            href="/careers"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-300"
          >
            View Open Positions
          </Link>
        </div>
      </section>
    </div>
  )
}

