// src/data/posts.ts
export const blogPosts = [
    {
      id: '1',
      title: 'Getting Started with Next.js',
      excerpt: 'Learn how to build modern web applications with Next.js and React',
      content: `
        Next.js is a powerful framework for building React applications. It provides features like server-side rendering, static site generation, and API routes out of the box.
  
        In this comprehensive guide, we'll explore:
        1. Setting up your first Next.js project
        2. Understanding file-based routing
        3. Working with dynamic routes
        4. Implementing API routes
        5. Optimizing images and performance
  
        Let's dive deep into each of these topics and learn how to build scalable applications with Next.js.
      `,
      date: '24-08-2024',
      category: 'Development',
      image: '/Nextjs.png',
      slug: 'getting-started-with-nextjs',
      author: {
        name: 'Riaz Hussain',
        avatar: '/myself.jpg'
      }
    },
    {
      id: '2',
      title: 'Mastering Tailwind CSS',
      excerpt: 'A comprehensive guide to using Tailwind CSS in your projects',
      content: `
        Tailwind CSS has revolutionized the way we style web applications. This utility-first CSS framework provides unprecedented flexibility and speed in development.
  
        Key topics we'll cover:
        1. Setting up Tailwind in your project
        2. Understanding utility classes
        3. Creating custom configurations
        4. Building responsive designs
        5. Best practices and optimization
  
        By the end of this guide, you'll be confident in using Tailwind CSS for your projects.
      `,
      date: '06-02-2024',
      category: 'CSS',
      image: '/TailwindCSS.png',
      slug: 'mastering-tailwind-css',
      author: {
        name: 'Amber Perwaiz',
        avatar: '/Front-End.jpg'
      }
    },
    // We can add more posts as needed
  ]






  