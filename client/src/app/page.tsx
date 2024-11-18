"use client"
// pages/index.js
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Providers } from '@/components/Providers';
import Appbar from '@/components/Appbar';


import { motion } from 'framer-motion'
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'

import FeaturesAndPricing from '@/components/features-&-pricing';




const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/orecordify' },
  { icon: Instagram, href: 'https://www.instagram.com/Orecordify' },
  { icon: Youtube, href: 'https://www.youtube.com/orecordify' },
  { icon: Linkedin, href: 'https://www.linkedin.com/company/orecordify' },
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
            className="text-4xl md:text-3xl font-bold mb-4 text-gray-900"
          >
      Transform Your Business with Orecordify: The Ultimate Productivity Solution
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg mb-8 text-gray-600"
          >
            Maximize your business potential with Orecordify, the all-in-one productivity app for small and medium-sized businesses. Streamline operations, manage inventory, process orders, track customer data, and gain insights through powerful analytics—all in one user-friendly platform. Join the future of business productivity today!
</motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/admin" className="bg-green-500 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-green-600 transition duration-300">
              Get Started - it's free
            </Link>
          </motion.div>
        </section>
        <FeaturesAndPricing />
        <div className="flex justify-center items-center py-12 ">
      <Card className="w-full max-w-sm  bg-[#fafada]">
        <CardHeader>
          <CardTitle className="text-center">Support Orecordify</CardTitle>
          <CardDescription className="text-center">
            Help us improve and maintain Orecordify. Your contribution is highly appreciated!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action="https://www.paypal.com/donate"
            method="post"
            target="_blank"
            className="flex flex-col items-center"
          >
            <input type="hidden" name="business" value="flexyman2020@gmail.com" />
            <input type="hidden" name="no_recurring" value="0" />
            <input type="hidden" name="item_name" value="Support Orecordify" />
            <input type="hidden" name="currency_code" value="USD" />
            <Button
              type="submit"
              variant="default"
              className="bg-green-500 text-white hover:bg-green-600 focus:ring-green-400"
            >
              Donate with PayPal
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>

        

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
