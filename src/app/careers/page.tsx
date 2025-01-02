// src/app/careers/page.tsx
'use client'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

const positions = [
  {
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time'
  },
  {
    title: 'Content Writer',
    department: 'Content',
    location: 'Hybrid',
    type: 'Full-time'
  },
  {
    title: 'UX Designer',
    department: 'Design',
    location: 'On-site',
    type: 'Full-time'
  }
]

export default function CareersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          We&apos;re looking for passionate individuals to help us build the future of content creation.
        </p>
        <p>It&apos;s a great place to work!</p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {positions.map((position, index) => (
          <motion.div
            key={position.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h3 className="text-xl font-semibold mb-2">{position.title}</h3>
            <div className="space-y-2 mb-4">
              <p className="text-gray-600">Department: {position.department}</p>
              <p className="text-gray-600">Location: {position.location}</p>
              <p className="text-gray-600">Type: {position.type}</p>
            </div>
            <Button className="w-full hover:bg-blue-600">Apply Now</Button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
