'use client';

import AnalyticsDashboard from "@/components/home/AnalyticsDashboard";
import FAQSection from "@/components/home/FAQSection";
import FeaturesGlowingGrid from "@/components/home/FeaturesGlowingGrid";
import Hero from "@/components/home/Hero";
import LogoCarouselSection from "@/components/home/LogoCarouselSection";
import MediaBacklinks from "@/components/home/MediaBacklinks";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import { Footer } from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Cta11 } from "@/components/ui/shadcnblocks-com-cta11";
import { usePageContent } from "@/hooks/use-page-content";
import {
    AnalyticsDashboardSection as AnalyticsDashboardSectionType,
    CTASection as CTASectionType,
    FAQSection as FAQSectionType,
    FeaturesSection as FeaturesSectionType,
    HeroSection as HeroSectionType,
    LogoCarouselSection as LogoCarouselSectionType,
    MediaBacklinksSection as MediaBacklinksSectionType,
    TestimonialsSection as TestimonialsSectionType
} from "@/types/content";

import {
    ArrowRight,
    BarChart,
    CheckCircle,
    Search,
    ShieldCheck
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

// Scroll reveal hook (can be added back if complex animations are needed beyond simple class-based ones)
// For now, we'll rely on simple Tailwind transitions and potential CSS animations if needed.
/*
function useScrollReveal() {
  useEffect(() => {
    // ... (implementation) ...
  }, []);
}
*/

export default function Home() {
  // useScrollReveal(); // Call if using the hook
  const { page, isLoading } = usePageContent({ slug: 'home' });
  
  useEffect(() => {
    // Basic scroll reveal for elements with .reveal-on-scroll
    // More advanced staggering can be done with Intersection Observer if needed
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.1 }); 

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  // Render dynamic sections based on page data if available, otherwise fallback to static components
  const renderSections = () => {
    if (!page || !page.sections || page.sections.length === 0) {
      // Fallback to static layout
      return (
        <>
          {/* Hero Section */}
          <Hero />

          {/* Logo Carousel Section */}
          <div className="mt-8 md:mt-12">
            <LogoCarouselSection />
          </div>

          {/* Media Backlinks Section */}
          <div className="mt-16 md:mt-20">
            <MediaBacklinks />
          </div>

          {/* Features Glowing Grid Section */}
          <div className="mt-16 md:mt-24">
            <FeaturesGlowingGrid />
          </div>

          {/* How It Works Section - Based on Anic Digital Style Guide */}
          <section className="py-12 md:py-16 bg-white relative overflow-hidden mt-16 md:mt-24">
            {/* Background elements - enhanced gradients */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-[#87c44d]/20 to-[#47b49e]/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-tl from-[#2ac37a]/20 to-[#47b49e]/10 rounded-full blur-3xl"></div>
            
            <div className="container max-w-[1200px] mx-auto px-4 md:px-6 relative z-10">
              <div className="text-center mb-10 md:mb-12 reveal-on-scroll">
                <span className="inline-block bg-gradient-to-r from-[#2ac37a]/20 to-[#47b49e]/20 text-[#2ac37a] text-xs font-semibold px-4 py-1.5 rounded-full mb-3 uppercase tracking-wider">
                  Simple Process
                </span>
                <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                  How <span className="bg-gradient-to-r from-[#2ac37a] to-[#47b49e] bg-clip-text text-transparent">It Works</span>
                </h2>
                <p className="mt-3 text-base md:text-lg text-[#334155] max-w-2xl mx-auto leading-relaxed">
                  Our simple process makes building quality backlinks easier than ever before.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
                {[ 
                  { 
                    step: "01", 
                    icon: <Search className="w-7 h-7" />, 
                    title: "Find Quality Opportunities", 
                    description: "Search our marketplace with advanced filters to find high-authority websites tailored to your niche.",
                    color: "#2ac37a",
                    gradient: "from-[#2ac37a] to-[#47b49e]"
                  },
                  { 
                    step: "02", 
                    icon: <ShieldCheck className="w-7 h-7" />, 
                    title: "Secure Placements", 
                    description: "Purchase backlinks directly. We guarantee placements with transparent pricing and secure transactions.",
                    color: "#47b49e",
                    gradient: "from-[#47b49e] to-[#87c44d]"
                  },
                  { 
                    step: "03", 
                    icon: <BarChart className="w-7 h-7" />, 
                    title: "Track Performance", 
                    description: "Monitor the impact of your backlinks on your SEO with our detailed analytics and comprehensive reports.",
                    color: "#87c44d",
                    gradient: "from-[#87c44d] to-[#2ac37a]"
                  },
                  { 
                    step: "04", 
                    icon: <CheckCircle className="w-7 h-7" />, 
                    title: "Grow Your Authority", 
                    description: "Watch your domain authority and organic traffic increase as your backlink profile strengthens over time.",
                    color: "#2ac37a",
                    gradient: "from-[#2ac37a] to-[#47b49e]"
                  },
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className="reveal-on-scroll" 
                    style={{transitionDelay: `${index * 0.1}s`}}
                  >
                    <div 
                      className="h-full rounded-xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 p-5 flex flex-col group border-2"
                      style={{ 
                        borderColor: index === hoveredCard ? item.color : 'rgba(229, 231, 235, 0.8)'
                      }}
                      onMouseEnter={() => setHoveredCard(index)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <div className="relative z-10">
                        <div className="flex items-start mb-4">
                          <div className="relative flex-shrink-0">
                            <div className="w-14 h-14 rounded-full flex items-center justify-center group-hover:scale-105 transition-all duration-300 bg-gradient-to-r opacity-80 group-hover:opacity-100" 
                               style={{ backgroundImage: `linear-gradient(to right, ${item.color}30, ${item.color}15)` }}>
                              <div style={{ color: item.color }}>
                                {item.icon}
                              </div>
                            </div>
                            <span className="absolute -top-2 -right-2 bg-white text-[#2ac37a] text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#2ac37a] shadow-sm">{item.step}</span>
                          </div>
                          <h4 className="text-lg font-bold text-[#1E293B] ml-4 mt-1 group-hover:text-[#2ac37a] transition-colors duration-300">{item.title}</h4>
                        </div>
                        <p className="text-sm text-[#334155] leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-12 reveal-on-scroll" style={{animationDelay: '0.4s'}}>
                <Link 
                  href="/services" 
                  className="inline-flex items-center px-6 py-3 rounded-lg text-base font-medium text-white bg-gradient-to-r from-[#2ac37a] to-[#47b49e] hover:from-[#47b49e] hover:to-[#2ac37a] shadow-md transition-all duration-300 transform hover:scale-105"
                >
                  Learn more about our services <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </div>
            </div>
          </section>

          {/* Analytics Dashboard Section */}
          <div 
            className="relative overflow-hidden py-12 md:py-16 mt-12 md:mt-16" 
            style={{ backgroundColor: "rgba(241, 245, 249, 0.3)" }} // Light blue-gray at 30% opacity
          >
            {/* Connecting element from previous section */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-10 bg-gradient-to-b from-white to-transparent"></div>
            {/* Background gradient orbs */}
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#47b49e]/20 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-[#2ac37a]/20 rounded-full blur-3xl -z-10"></div>
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#2ac37a]/5 -z-10"></div>
            <AnalyticsDashboard />
          </div>

          {/* Testimonials Section - New animated version */}
          <div className="mt-16 md:mt-24">
            <TestimonialsSection />
          </div>

          {/* FAQ Section - New shadcn-based design */}
          <div className="mt-16 md:mt-20">
            <FAQSection />
          </div>

          {/* CTA Section using Shadcn blocks component */}
          <div className="mt-12 md:mt-16">
            <Cta11 
              heading="Ready to Elevate Your SEO Strategy?"
              description="Join thousands of businesses that have already transformed their online visibility with our backlink marketplace."
              buttons={{
                primary: {
                  text: "Get Started Now",
                  url: "/register"
                },
                secondary: {
                  text: "Learn More",
                  url: "/about"
                }
              }}
            />
          </div>
        </>
      );
    }
    
    // Render dynamic sections based on their order
    return page.sections
      .sort((a, b) => a.order - b.order)
      .map((section) => {
        switch (section.type) {
          case 'HERO':
            return <Hero key={section.id} data={section.content as HeroSectionType['content']} />;
            
          case 'LOGO_CAROUSEL':
            return (
              <div key={section.id} className="mt-8 md:mt-12">
                <LogoCarouselSection data={section.content as LogoCarouselSectionType['content']} />
              </div>
            );
            
          case 'MEDIA_BACKLINKS':
            return (
              <div key={section.id} className="mt-16 md:mt-20">
                <MediaBacklinks data={section.content as MediaBacklinksSectionType['content']} />
              </div>
            );
            
          case 'FEATURES':
            return (
              <div key={section.id} className="mt-16 md:mt-24">
                <FeaturesGlowingGrid data={section.content as FeaturesSectionType['content']} />
              </div>
            );
            
          case 'HOW_IT_WORKS':
            // Assuming you'd create a dedicated HowItWorks component
            return (
              <section key={section.id} className="py-12 md:py-16 bg-white relative overflow-hidden mt-16 md:mt-24">
                {/* This would be replaced by a dedicated component */}
                {/* For now, keeping the original static version */}
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-[#87c44d]/20 to-[#47b49e]/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-tl from-[#2ac37a]/20 to-[#47b49e]/10 rounded-full blur-3xl"></div>
                
                <div className="container max-w-[1200px] mx-auto px-4 md:px-6 relative z-10">
                  <div className="text-center mb-10 md:mb-12 reveal-on-scroll">
                    <span className="inline-block bg-gradient-to-r from-[#2ac37a]/20 to-[#47b49e]/20 text-[#2ac37a] text-xs font-semibold px-4 py-1.5 rounded-full mb-3 uppercase tracking-wider">
                      Simple Process
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                      How <span className="bg-gradient-to-r from-[#2ac37a] to-[#47b49e] bg-clip-text text-transparent">It Works</span>
                    </h2>
                    <p className="mt-3 text-base md:text-lg text-[#334155] max-w-2xl mx-auto leading-relaxed">
                      Our simple process makes building quality backlinks easier than ever before.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
                    {[ 
                      { 
                        step: "01", 
                        icon: <Search className="w-7 h-7" />, 
                        title: "Find Quality Opportunities", 
                        description: "Search our marketplace with advanced filters to find high-authority websites tailored to your niche.",
                        color: "#2ac37a",
                        gradient: "from-[#2ac37a] to-[#47b49e]"
                      },
                      { 
                        step: "02", 
                        icon: <ShieldCheck className="w-7 h-7" />, 
                        title: "Secure Placements", 
                        description: "Purchase backlinks directly. We guarantee placements with transparent pricing and secure transactions.",
                        color: "#47b49e",
                        gradient: "from-[#47b49e] to-[#87c44d]"
                      },
                      { 
                        step: "03", 
                        icon: <BarChart className="w-7 h-7" />, 
                        title: "Track Performance", 
                        description: "Monitor the impact of your backlinks on your SEO with our detailed analytics and comprehensive reports.",
                        color: "#87c44d",
                        gradient: "from-[#87c44d] to-[#2ac37a]"
                      },
                      { 
                        step: "04", 
                        icon: <CheckCircle className="w-7 h-7" />, 
                        title: "Grow Your Authority", 
                        description: "Watch your domain authority and organic traffic increase as your backlink profile strengthens over time.",
                        color: "#2ac37a",
                        gradient: "from-[#2ac37a] to-[#47b49e]"
                      },
                    ].map((item, index) => (
                      <div 
                        key={index} 
                        className="reveal-on-scroll" 
                        style={{transitionDelay: `${index * 0.1}s`}}
                      >
                        <div 
                          className="h-full rounded-xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 p-5 flex flex-col group border-2"
                          style={{ 
                            borderColor: index === hoveredCard ? item.color : 'rgba(229, 231, 235, 0.8)'
                          }}
                          onMouseEnter={() => setHoveredCard(index)}
                          onMouseLeave={() => setHoveredCard(null)}
                        >
                          <div className="relative z-10">
                            <div className="flex items-start mb-4">
                              <div className="relative flex-shrink-0">
                                <div className="w-14 h-14 rounded-full flex items-center justify-center group-hover:scale-105 transition-all duration-300 bg-gradient-to-r opacity-80 group-hover:opacity-100" 
                                   style={{ backgroundImage: `linear-gradient(to right, ${item.color}30, ${item.color}15)` }}>
                                  <div style={{ color: item.color }}>
                                    {item.icon}
                                  </div>
                                </div>
                                <span className="absolute -top-2 -right-2 bg-white text-[#2ac37a] text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#2ac37a] shadow-sm">{item.step}</span>
                              </div>
                              <h4 className="text-lg font-bold text-[#1E293B] ml-4 mt-1 group-hover:text-[#2ac37a] transition-colors duration-300">{item.title}</h4>
                            </div>
                            <p className="text-sm text-[#334155] leading-relaxed">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center mt-12 reveal-on-scroll" style={{animationDelay: '0.4s'}}>
                    <Link 
                      href="/services" 
                      className="inline-flex items-center px-6 py-3 rounded-lg text-base font-medium text-white bg-gradient-to-r from-[#2ac37a] to-[#47b49e] hover:from-[#47b49e] hover:to-[#2ac37a] shadow-md transition-all duration-300 transform hover:scale-105"
                    >
                      Learn more about our services <ArrowRight className="h-5 w-5 ml-2" />
                    </Link>
                  </div>
                </div>
              </section>
            );
            
          case 'ANALYTICS_DASHBOARD':
            return (
              <div key={section.id} className="relative overflow-hidden py-12 md:py-16 mt-12 md:mt-16" 
                style={{ backgroundColor: "rgba(241, 245, 249, 0.3)" }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-10 bg-gradient-to-b from-white to-transparent"></div>
                <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#47b49e]/20 rounded-full blur-3xl -z-10"></div>
                <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-[#2ac37a]/20 rounded-full blur-3xl -z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#2ac37a]/5 -z-10"></div>
                <AnalyticsDashboard data={section.content as AnalyticsDashboardSectionType['content']} />
              </div>
            );
            
          case 'TESTIMONIALS':
            return (
              <div key={section.id} className="mt-16 md:mt-24">
                <TestimonialsSection data={section.content as TestimonialsSectionType['content']} />
              </div>
            );
            
          case 'FAQ':
            return (
              <div key={section.id} className="mt-16 md:mt-20">
                <FAQSection data={section.content as FAQSectionType['content']} />
              </div>
            );
            
          case 'CTA':
            const ctaContent = section.content as CTASectionType['content'];
            return (
              <div key={section.id} className="mt-12 md:mt-16">
                <Cta11 
                  heading={ctaContent.heading}
                  description={ctaContent.subheading || ""}
                  buttons={{
                    primary: {
                      text: ctaContent.ctaText,
                      url: ctaContent.ctaLink
                    },
                    secondary: ctaContent.secondaryCtaText ? {
                      text: ctaContent.secondaryCtaText,
                      url: ctaContent.secondaryCtaLink || "#"
                    } : undefined
                  }}
                />
              </div>
            );
            
          default:
            return null;
        }
      });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#1E293B]">
      <Navbar />
      <main className="flex-1">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2ac37a]"></div>
          </div>
        ) : (
          renderSections()
        )}
      </main>
      <Footer />
    </div>
  );
} 
