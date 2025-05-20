"use client";

import { Faq3 } from "@/components/ui/faq3";

const backLinkFAQs = [
  {
    id: "faq-1",
    question: "What types of websites are in your marketplace?",
    answer: "Our marketplace includes a wide variety of websites across numerous niches, all vetted for quality and domain authority. You can filter by category, metrics, and more to find the perfect fit for your SEO strategy.",
  },
  {
    id: "faq-2",
    question: "How much do backlinks cost?",
    answer: "Backlink prices vary depending on the domain authority, traffic, and niche of the website. We offer transparent pricing for each listing, with options to fit various budgets and SEO needs.",
  },
  {
    id: "faq-3",
    question: "Are these backlinks Google-compliant?",
    answer: "Yes, we focus on high-quality, editorially relevant backlinks that adhere to Google's webmaster guidelines to ensure long-term SEO value and protect your website from penalties.",
  },
  {
    id: "faq-4",
    question: "How long does it take to get a backlink placed?",
    answer: "Placement times can vary, typically ranging from a few days to a couple of weeks, depending on the publisher's editorial process. You can track the status of your order in your dashboard.",
  },
  {
    id: "faq-5",
    question: "Do you offer a money-back guarantee?",
    answer: "We guarantee placement for your ordered backlinks. If a link is not placed as agreed upon, we offer a replacement or a full refund for that specific link.",
  },
  {
    id: "faq-6",
    question: "Can I choose the anchor text for my backlinks?",
    answer: "Yes, in most cases you can specify your preferred anchor text. However, some publishers may require editorial discretion to ensure the links appear natural and provide maximum SEO benefit.",
  },
  {
    id: "faq-7",
    question: "Will you help me develop a backlink strategy?",
    answer: "Absolutely! Our Pro and Enterprise plans include strategy sessions with our SEO experts who can help you create a customized backlink plan based on your specific business goals and competitive landscape.",
  },
];

const FAQSection = () => {
  return (
    <section className="bg-white relative overflow-hidden py-16 md:py-20">
      {/* Background elements - subtle gradients that match our color palette */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-[#87c44d]/10 to-[#47b49e]/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-tl from-[#2ac37a]/10 to-[#47b49e]/5 rounded-full blur-3xl"></div>
      
      <Faq3 
        heading="Frequently Asked Questions" 
        description="Everything you need to know about our backlink marketplace."
        items={backLinkFAQs}
        supportHeading="Still have questions?"
        supportDescription="Can't find what you're looking for? Our team is here to help with any questions you might have about our backlink marketplace."
        supportButtonText="Contact Us"
        supportButtonUrl="/contact"
      />
    </section>
  );
};

export default FAQSection; 