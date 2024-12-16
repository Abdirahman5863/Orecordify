import { motion } from "framer-motion";

const features = [
  {
    title: "Inventory Management",
    description: "Easily track and manage your inventory with real-time updates and alerts.",
    image: "/inventorys.png",
  },
  {
    title: "Order Processing",
    description: "Streamline your order fulfillment process with our intuitive order management system.",
    image: "/orders.png",
  },
  {
    title: "Customer Management",
    description: "Keep track of customer information and order history in one centralized location.",
    image: "/customerss.png",
  },
  {
    title: "Analytics Dashboard",
    description: "Gain valuable insights into your business performance with our comprehensive analytics.",
    image: "/analytics.png",
  },
  {
    title: "Notes Taking",
    description: "Take notes and keep track of important information with our easy-to-use note-taking feature.",
    image: "/notes.png",
  },
];

export default function FeaturesAndPricing() {
  return (
    <section className=" py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Key Features
        </h2>
        <div className="grid gap-12 mb-16">
          {features.map((feature, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col md:flex-row items-center gap-8 bg-white shadow-lg  shadow-[#fafada] rounded-lg p-6"
            >
              <div className="w-full md:w-1/2">
                <h3 className="text-2xl font-semibold mb-4 text-green-600">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
              <motion.div
                className="w-full md:w-1/2 flex justify-center"
                initial={{ y: 0 }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.img
                  src={feature.image}
                  alt={`${feature.title} illustration`}
                  className="rounded-lg shadow-lg"
                  width={400}
                  height={300}
                />
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
