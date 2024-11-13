
import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link'

const features = [
  {
    title: "Inventory Management",
    description: "Easily track and manage your inventory with real-time updates and alerts.",
    image: "/inventory.png"
  },
  {
    title: "Order Processing",
    description: "Streamline your order fulfillment process with our intuitive order management system.",
    image: "/orders.png"
  },
  {
    title: "Customer Management",
    description: "Keep track of customer information and order history in one centralized location.",
    image: "/customer.png"
  },
  {
    title: "Analytics Dashboard",
    description: "Gain valuable insights into your business performance with our comprehensive analytics.",
    image: "/anlytic.png"
  },
  {
    title: "Notes Board",
    description: "Write your own notes or diary ",
    image: "/notion.png"
  }
]
export default function FeaturesAndPricing() {
    
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
      <div className="grid gap-12 mb-16">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col md:flex-row items-center gap-8"
          >
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-semibold mb-4 text-green-600">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
            </div>
            <div className="w-full md:w-1/2 border-[#F5F5DC] border-solid ">
           
   <motion.img
        src={feature.image}
        alt={feature.title}
        width={400}
        height={300}
        initial={{ y: 0 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="rounded-lg shadow-[#F5F5DC] shadow-2xl "
        style={{ display: 'inline-block' }}
      />
            </div>
          </motion.div>
        ))}
      </div>

      <h2 className="text-3xl font-bold text-center mb-12">Pricing</h2>
      <div className="flex justify-center">
        <Card className="w-full max-w-md bg-[#F5F5DC]">
          <CardHeader>
            <CardTitle className="text-2xl">Orecordify Pro</CardTitle>
            <CardDescription>Perfect for small to medium businesses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-4">$10<span className="text-xl font-normal">/month</span></div>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                Unlimited inventory items
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                Unlimited customers
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                Full analytics dashboard
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                Email support
              </li>
            </ul>
          </CardContent>
          <CardFooter>
         <Link href="/subscription"> <Button className="w-full">Start Free Trial</Button></Link>  
          </CardFooter>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <h3 className="text-xl font-semibold mb-4">Free Trial</h3>
        <p className="text-gray-600 mb-2">Try Orecordify with no commitment</p>
        <ul className="space-y-2 mb-4">
          <li className="flex items-center justify-center">
            <Check className="mr-2 h-4 w-4 text-green-500" />
            10 free orders
          </li>
          <li className="flex items-center justify-center">
            <Check className="mr-2 h-4 w-4 text-green-500" />
            Basic features included
          </li>
          <li className="flex items-center justify-center">
            <X className="mr-2 h-4 w-4 text-red-500" />
            No credit card required
          </li>
        </ul>
        <Button variant="outline">Start Free Trial</Button>
      </div>
    </div>
  )
}