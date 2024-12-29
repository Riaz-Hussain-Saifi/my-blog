import HeroSection from '@/components/HeroSection'
import Image from 'next/image'
import Link from 'next/link'

const teamMembers = [
  {
    id: 1,
    name: 'Riaz Hussain',
    role: 'Website Creator',
    image: '/web-creater.jpeg',
    description: 'Full-stack developer with over 8 years of experience in creating innovative web solutions. Expert in modern web technologies and user-centric design principles.',
    socials: {
      linkedin: 'https://www.linkedin.com/in/riaz-hussain-saifi',
      github: 'https://github.com/Riaz-Hussain-Saifi',
      facebook: 'https://www.facebook.com/RiazSaifiDeveloper'
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
  return (
    <div>
      <HeroSection
        title="About Us"
        subtitle="Meet the talented team behind our success"
        imageUrl="/about-us.jpeg"   
        // Image should be 1920/1080
      />

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                We started with a vision to create a platform that bridges the gap between technology and user experience. Our journey began with a small team of passionate individuals who believed in making web development more accessible and enjoyable.
              </p>
              <p className="text-gray-600 mb-4">
                Today, we've grown into a dynamic team of professionals, each bringing unique expertise and perspectives to our work. Our commitment to innovation and quality continues to drive us forward as we help businesses and developers create exceptional web experiences.
              </p>
            </div>
            <div className="relative">
              <Image
                src="/team-at-work.jpeg"
                alt="Our team at work"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div 
                key={member.id} 
                className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <div className="relative h-72">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Want to Join Our Team?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals who are passionate about web development and innovation. If you think you'd be a great fit, we'd love to hear from you.
          </p>
          <Link
            href="/careers"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Open Positions
          </Link>
        </div>
      </section>
    </div>
  )
}