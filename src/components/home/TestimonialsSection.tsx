"use client";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { motion } from "framer-motion";

// Testimonials data with our branding colors
const testimonials = [
  {
    text: "This platform has transformed our SEO strategy. We've seen a 40% increase in organic traffic within just 3 months of using their backlink marketplace.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    name: "Sarah Johnson",
    role: "Marketing Director, TechSolutions"
  },
  {
    text: "Finding quality backlinks used to be a nightmare. Now it's a seamless process that takes minutes instead of weeks. Their platform is simply revolutionary.",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    name: "Michael Lewis",
    role: "SEO Specialist, CloudSavvy"
  },
  {
    text: "The analytics dashboard makes it easy to track ROI on every backlink. We can clearly see which links drive the most value for our business.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    name: "Amanda Reyes",
    role: "Digital Strategist, NextGen Agency"
  },
  {
    text: "We've tried numerous link building services, but this platform offers the highest quality opportunities at the most transparent pricing we've found.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    name: "David Chen",
    role: "Founder, Growth Hackers"
  },
  {
    text: "Our domain authority jumped from 35 to 62 in just 6 months. The quality of backlinks available on this marketplace is exceptional.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    name: "Emily Rodriguez",
    role: "SEO Director, Elevate Digital"
  },
  {
    text: "The platform's verification process ensures only high-quality sites are listed. This has saved us countless hours vetting potential link opportunities.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    name: "James Wilson",
    role: "Link Building Specialist, RankUp"
  },
  {
    text: "The customer support team is exceptional. They've helped us navigate complex link building strategies with expert guidance every step of the way.",
    image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    name: "Sofia Patel",
    role: "Content Manager, Buzz Media"
  },
  {
    text: "As an agency, we've been able to scale our link building services thanks to this marketplace. It's become an essential part of our SEO toolkit.",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    name: "Robert Taylor",
    role: "Agency Owner, Digital Dominance"
  },
  {
    text: "The reporting features make it easy to demonstrate value to our clients. We can show exactly how each backlink impacts their search performance.",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    name: "Lisa Morgan",
    role: "Client Success Manager, WebWorks"
  }
];

// Split testimonials into three columns
const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const TestimonialsSection = () => {
  return (
    <section className="bg-white py-16 md:py-20 relative overflow-hidden">
      {/* Background elements - subtle gradients that match our color palette */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-[#87c44d]/10 to-[#47b49e]/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-tl from-[#2ac37a]/10 to-[#47b49e]/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container max-w-[1200px] mx-auto px-6 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[700px] mx-auto text-center mb-10 md:mb-12 reveal-on-scroll"
        >
          <span className="inline-block bg-gradient-to-r from-[#2ac37a]/20 to-[#47b49e]/20 text-[#2ac37a] text-xs font-semibold px-4 py-1.5 rounded-full mb-3 uppercase tracking-wider">
            Testimonials
          </span>

          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4 text-[#1E293B]">
            Trusted by <span className="bg-gradient-to-r from-[#2ac37a] to-[#47b49e] bg-clip-text text-transparent">Leading Brands</span>
          </h2>
          
          <p className="mt-3 text-base md:text-lg text-[#334155] max-w-2xl mx-auto leading-relaxed">
            See what our customers say about their experience with our platform.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[640px] overflow-hidden">
          <TestimonialsColumn 
            testimonials={firstColumn} 
            duration={15} 
          />
          <TestimonialsColumn 
            testimonials={secondColumn} 
            className="hidden md:block" 
            duration={19} 
          />
          <TestimonialsColumn 
            testimonials={thirdColumn} 
            className="hidden lg:block" 
            duration={17} 
          />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 