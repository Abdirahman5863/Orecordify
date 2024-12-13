import React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What is Orceordify?",
      answer:
        "Orceordify is a platform designed to help businesses manage customer orders efficiently. It integrates tools like WhatsApp API to streamline order tracking and customer management.",
    },
    {
      question: "Who can use Orceordify?",
      answer:
        "Orceordify is ideal for small and medium-sized businesses, entrepreneurs using WhatsApp for sales, and retailers looking to streamline their order management.",
    },
    {
      question: "How does Orceordify integrate with WhatsApp?",
      answer:
        "Using the WhatsApp API, Orceordify captures customer details and orders directly from messages, allowing management from a centralized dashboard.",
    },
    {
      question: "Is my data secure on Orceordify?",
      answer:
        "Yes! Orceordify uses robust encryption and secure servers to ensure your data is safe, complying with global data protection standards.",
    },
    {
      question: "What features does Orceordify offer?",
      answer:
        "Key features include automated order tracking, customer profile management, multi-language support, and WhatsApp integration for real-time updates.",
    },
    {
      question: "Is there a free trial available?",
      answer:
        "Yes, we offer a free trial so you can explore Orceordify’s features before committing to a subscription plan.",
    },
    {
      question: "What happens if I exceed 10 orders on the free plan?",
      answer:
        "If your account exceeds 10 orders, you will receive a prompt to upgrade to a premium plan to continue accessing all features.",
    },
    {
      question: "How do I get started with Orceordify?",
      answer:
        "Sign up for an account, connect your WhatsApp business number, and start managing your customer orders seamlessly!",
    },
    {
      question: "Where can I contact support?",
      answer:
        "You can reach our support team at support@orceordify.com or use the live chat option on our website.",
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
