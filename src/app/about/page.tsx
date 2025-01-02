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

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 500)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection
        title="About Us"
        subtitle="Meet the team behind the blog"
        imagePath="/about-hero.jpg"
      />

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Our Team
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              We&apos;re a passionate team dedicated to creating engaging content and building amazing web experiences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: isVisible ? 1 : 0, 
                  y: isVisible ? 0 : 20 
                }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="relative h-64">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-sm text-blue-600 mb-4">{member.role}</p>
                  <p className="text-gray-600 mb-4">{member.description}</p>
                  <div className="flex space-x-4">
                    {Object.entries(member.socials).map(([platform, url]) => (
                      <Link
                        key={platform}
                        href={url}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">{platform}</span>
                        <i className={`fab fa-${platform} text-xl`}></i>
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-8">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We strive to create engaging and informative content that helps our readers stay up-to-date with the latest trends in technology and web development. Our goal is to make complex topics accessible and enjoyable for everyone.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
