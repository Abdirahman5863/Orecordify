"use client"
// pages/index.js
import Link from 'next/link';


import { Providers } from '@/components/Providers';
import Appbar from '@/components/Appbar';


import { motion } from 'framer-motion'
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'

import Image from 'next/image'

import FeaturesAndPricing from '@/components/features-&-pricing';




const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/orecordify' },
  { icon: Instagram, href: 'https://www.instagram.com/Orecordify' },
  { icon: Youtube, href: 'https://www.youtube.com/orecordify' },
  { icon: Linkedin, href: 'https://www.linkedin.com/company/orecordify' },
]

const testimonials = [
  {
    name: "John Doe",
    role: "Small Business Owner",
    content: "Orecordify has transformed the way we manage our orders. It's intuitive, efficient, and has saved us countless hours.",
    image: "/placeholder.svg?height=100&width=100"
  },
  {
    name: "Jane Smith",
    role: "E-commerce Manager",
    content: "The analytics feature in Orecordify has given us invaluable insights into our business. Highly recommended!",
    image: "/placeholder.svg?height=100&width=100"
  },
  {
    name: "Mike Johnson",
    role: "Startup Founder",
    content: "As we scaled our business, Orecordify scaled with us. The customer support is top-notch, always there when we need them.",
    image: "/placeholder.svg?height=100&width=100"
  }
]

export default function Home() {

  return (
    <div className="min-h-screen">
      <Appbar />
      {/* Navbar */}


      {/* Hero Section */}
      <main>
        <section className="container mx-auto px-6 py-16 text-center ">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-gray-900"
          >
            Seamlessly Manage Your Customers Orders
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl mb-8 text-gray-600"
          >
            Orecordify helps you stay on top of your orders with ease and efficiency. Start now and make order management simple.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/admin" className="bg-green-500 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-green-600 transition duration-300">
              Get Started
            </Link>
          </motion.div>
        </section>

        {/* <section className=" py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className=" bg-[#F5F5DC] p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                  onHoverStart={() => setHoveredFeature(index)}
                  onHoverEnd={() => setHoveredFeature(null)}
                >
                  <feature.icon className="h-12 w-12 text-green-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                  <motion.div
                    className="w-full h-1 bg-green-500 mt-4"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: hoveredFeature === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section> */}

        {/* <section className=" py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Pricing Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  className=" bg-[#F5F5DC] rounded-lg shadow-md overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold mb-4">{plan.name}</h3>
                    <div className="flex items-baseline mb-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-gray-500 ml-1">{plan.period}</span>
                    </div>
                    <ul className="mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center mb-2">
                          <Check className="h-5 w-5 text-green-500 mr-2" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4  bg-[#F5F5DC]">
                    <Link 
                      href="/signup" 
                      className="block text-center bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300"
                    >
                      {plan.cta}
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-8">
              <p className="text-gray-600">Save 20% with annual billing</p>
              <p className="text-lg font-semibold">$120 per year for Pro plan</p>
            </div>
          </div>
        </section> */}
        <FeaturesAndPricing />

        <section className=" py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className=" bg-[#F5F5DC] p-6 rounded-lg shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-center mb-4">
                    <Image src='/customer.jpeg' alt={testimonial.name} width={50} height={50} className="rounded-full mr-4" />
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700">&quot;{testimonial.content}&quot;</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#fafada] py-8">
        <div className="container mx-auto px-6">
          <div className="flex justify-center space-x-6 mb-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className=" hover:text-green-300 transition-colors duration-300"
              >
                <link.icon className="h-6 w-6" />
                <span className="sr-only">{link.icon.name}</span>
              </a>
            ))}
          </div>
          <div className="text-center">
            <p className="text-green-400">&copy; 2024 Orecordify. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
export const App = () => {
  <Providers>
    <Home />
  </Providers>

}
