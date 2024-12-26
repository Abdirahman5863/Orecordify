"use client"
// pages/index.js
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Providers } from '@/components/Providers';
import Appbar from '@/components/Appbar';
import { FaTiktok, FaInstagram } from "react-icons/fa";


import { motion } from 'framer-motion'
// import  {Instagram, Linkedin, Youtube, } from 'lucide-react'

import FeaturesAndPricing from '@/components/features-&-pricing';
import FAQ from '@/components/Faq';






export default function Home() {

  return (
    <div className="min-h-screen">
      <Appbar />
      {/* Navbar */}


      {/* Hero Section */}
      <main>
        <section className="container mx-auto px-6 py-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-3xl font-bold mb-4 text-gray-900"
          >
            Orecordify: Revolutionize Your Business Productivity Today
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg mb-8 text-gray-600"
          >
            Discover how Orecordify can transform your business with seamless inventory management, efficient order processing, and comprehensive customer data tracking. Leverage powerful analytics to drive insights and elevate your business operations.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/admin">
            <Button >  Start Free - Maximize Your Productivity Now!
            

            </Button>
            </Link>
          </motion.div>
        </section>


        <FeaturesAndPricing />
        <FAQ />
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
            <div>
              <ul className="flex space-x-4">

                <Link href="https://www.tiktok.com/@orecordify">
                  <FaTiktok className="w-6 h-6 text-gray-600 hover:text-gray-800" /></Link>
                <Link href="https://www.instagram.com/Orecordify">

                  <FaInstagram className="w-6 h-6 text-gray-600 hover:text-gray-800" />
                </Link>
              </ul>
            </div>
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
