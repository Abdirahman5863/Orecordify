import React, { useState } from "react";
import { Accordion, AccordionItem } from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs: FAQItem[] = [
    {
      question: "What is Orecordify?",
      answer:
        "Orecordify is a SaaS application designed to streamline inventory management, order processing, customer management, and analytics for small to medium-sized businesses."
    },
    {
      question: "How does Orecordify help with inventory management?",
      answer:
        "Orecordify allows businesses to keep track of their stock levels, automate inventory updates, and receive alerts when stock is low, ensuring efficient inventory management."
    },
    {
      question: "What are the key features of Orecordify?",
      answer:
        "Key features include inventory management, order processing, customer management, analytics, and subscription-based access."
    },
    {
      question: "Is Orecordify accessible from anywhere?",
      answer:
        "Yes, Orecordify is accessible from any location with an internet connection, allowing you to manage your business operations on the go."
    },
    {
      question: "What is the current pricing model for Orecordify?",
      answer:
        "Currently, Orecordify is free to use. However, there is a donation button available for those who wish to support the project. In the future, there will be a subscription plan available at $10 per month."
    },
    {
      question: "How can I contact support for Orecordify?",
      answer:
        "For support, you can reach out to our customer service team via email or through the contact form on our website."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto p-6 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h2>
      <Accordion type="single" className="space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem value="" key={index} className="border rounded-lg">
            <div
              onClick={() => toggleFAQ(index)}
              className="cursor-pointer p-4 flex justify-between items-center bg-[#fafada]  hover:bg-gray-50 transition duration-200"
            >
              <span className="font-medium text-lg">{faq.question}</span>
              <span>{activeIndex === index ? "-" : "+"}</span>
            </div>
            {activeIndex === index && (
              <div className="p-4 bg-gray-50 text-gray-700">{faq.answer}</div>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQ;
