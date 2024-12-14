import React from "react"; 
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What is Orecordify?",
      answer:
        "Orecordify is a SaaS platform tailored for businesses to manage and track customer orders directly from WhatsApp. It simplifies customer management and order tracking in a centralized dashboard.",
    },
    {
      question: "Who can use Orecordify?",
      answer:
        "Orecordify is perfect for small and medium-sized businesses, solo entrepreneurs, and online retailers who use WhatsApp for sales and want to streamline their operations.",
    },
    {
      question: "How does Orecordify integrate with WhatsApp?",
      answer:
        "With WhatsApp API integration, Orecordify collects customer details, order information, and communication history automatically. This ensures all data is accessible in one place for easy management.",
    },
    {
      question: "Is my data secure with Orecordify?",
      answer:
        "Absolutely. Orecordify prioritizes data security with end-to-end encryption and compliance with global data protection standards, ensuring your business and customer data is safe.",
    },
    {
      question: "What features does Orecordify provide?",
      answer:
        "Orecordify offers automated order tracking, customer profile management, real-time WhatsApp updates, multi-language support, and the ability to manage orders from a clean, intuitive dashboard.",
    },
    {
      question: "Is there a free plan or trial available?",
      answer:
        "Yes, Orecordify provides a free plan with up to 10 orders. This allows you to explore key features before upgrading to a premium plan for additional orders and advanced features.",
    },
    {
      question: "What happens if I exceed the free plan order limit?",
      answer:
        "If your account exceeds 10 orders, you will be prompted to upgrade to one of our premium plans to continue managing new orders seamlessly.",
    },
    {
      question: "How do I get started with Orecordify?",
      answer:
        "Simply sign up for an account, connect your WhatsApp business number, and start tracking and managing your customer orders effortlessly.",
    },
    {
      question: "Where can I get support?",
      answer:
        "Our support team is ready to assist you! Reach out via email at support@orecordify.com or use the live chat option on our website.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`faq-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQ;
