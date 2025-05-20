import Floating, { FloatingElement } from '@/components/ui/parallax-floating';
import { TextRotate, TextRotateRef } from '@/components/ui/text-rotate';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { AnalyticsImage, DashboardImage, SeoImage } from './PlaceholderImages';

const Hero = () => {
  // Rotating words with their emojis (combined)
  const rotatingTexts = [
    "Press Release 📰",
    "SEO 🔍",
    "Backlinks 🔗",
    "Trust ✓",
    "News 📢"
  ];
  
  // Reference to control text rotation programmatically if needed
  const textRotateRef = useRef<TextRotateRef>(null);

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden" id="hero">
      {/* Gradient Orbs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#2ac37a]/20 rounded-full blur-3xl animate-pulse"></div>
      <div 
        className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#47b49e]/20 rounded-full blur-3xl animate-pulse" 
        style={{animationDelay: '1s'}}
      ></div>
      
      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5]">
        <div className="absolute -inset-[10%] opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[300px] bg-white blur-3xl rounded-full animate-shimmer"></div>
        </div>
      </div>
      
      {/* Floating elements */}
      <Floating sensitivity={0.15} easingFactor={0.07}>
        {/* Left side parallax images */}
        <FloatingElement depth={1.8} className="top-[25%] left-[5%] hidden md:block">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-40 h-52 rounded-xl overflow-hidden shadow-xl rotate-[-3deg]"
          >
            <DashboardImage />
          </motion.div>
        </FloatingElement>
        
        <FloatingElement depth={1.2} className="top-[55%] left-[10%] hidden md:block">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="w-32 h-32 rounded-full overflow-hidden shadow-xl bg-[#2ac37a]/10 p-4 flex items-center justify-center"
          >
            <div className="text-3xl">🔍</div>
          </motion.div>
        </FloatingElement>

        {/* Right side parallax images */}
        <FloatingElement depth={1.5} className="top-[20%] right-[8%] hidden md:block">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-44 h-36 rounded-xl overflow-hidden shadow-xl rotate-[5deg]"
          >
            <AnalyticsImage />
          </motion.div>
        </FloatingElement>

        <FloatingElement depth={1.3} className="top-[60%] right-[12%] hidden md:block">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="w-36 h-36 rounded-xl overflow-hidden shadow-xl rotate-[-5deg]"
          >
            <SeoImage />
          </motion.div>
        </FloatingElement>
        
        {/* Floating circles and shapes (visible on mobile too) */}
        <FloatingElement depth={1.2} className="top-[15%] right-[10%]">
          <div className="w-8 h-8 bg-[#2ac37a]/10 rounded-full" />
        </FloatingElement>
        <FloatingElement depth={1.5} className="top-[20%] right-[15%]">
          <div className="w-5 h-5 bg-[#47b49e]/15 rounded-full" />
        </FloatingElement>
        
        <FloatingElement depth={0.8} className="bottom-[25%] left-[15%]">
          <div className="w-6 h-6 bg-[#47b49e]/20 rounded-full" />
        </FloatingElement>
        <FloatingElement depth={1.3} className="bottom-[30%] left-[10%]">
          <div className="w-4 h-4 bg-[#2ac37a]/15 rounded-full" />
        </FloatingElement>
        
        <FloatingElement depth={1.5} className="top-[40%] left-[10%]">
          <div className="w-10 h-10 bg-gradient-to-br from-[#2ac37a]/10 to-[#47b49e]/20 rounded-md rotate-12" />
        </FloatingElement>
        
        <FloatingElement depth={1.0} className="top-[50%] right-[12%]">
          <div className="w-12 h-12 bg-gradient-to-bl from-[#47b49e]/15 to-[#2ac37a]/10 rounded-md -rotate-12" />
        </FloatingElement>
        
        <FloatingElement depth={0.7} className="top-[60%] right-[25%]">
          <div className="w-3 h-8 bg-[#2ac37a]/10 rounded-full" />
        </FloatingElement>
        <FloatingElement depth={1.1} className="top-[30%] left-[25%]">
          <div className="w-3 h-8 bg-[#47b49e]/15 rounded-full" />
        </FloatingElement>
      </Floating>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Heading and sub-heading - Pyramid structure */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight flex flex-col items-center justify-center w-full">
              {/* Top of pyramid - narrower */}
              <motion.span 
                className="text-[#2b2e2f] mb-3 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                Boost Your
              </motion.span>
              
              {/* Bottom of pyramid - wider */}
              <motion.div
                className="flex justify-center items-center w-full text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              >
                <div className="inline-flex items-center justify-center">
                  <span className="text-[#2b2e2f] inline-flex items-center font-semibold text-4xl md:text-5xl lg:text-6xl">Brand with&nbsp;</span>
                  <span className="relative inline-flex items-center">
                    <motion.div 
                      className="inline-flex items-center font-bold text-4xl md:text-5xl lg:text-6xl"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ 
                        duration: 6, 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        times: [0, 0.5, 1]
                      }}
                    >
                      <TextRotate 
                        ref={textRotateRef}
                        texts={rotatingTexts}
                        rotationInterval={4000}
                        staggerDuration={0.02}
                        transition={{ 
                          type: "spring", 
                          damping: 28, 
                          stiffness: 250,
                          mass: 0.7
                        }}
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "-100%", opacity: 0 }}
                        splitBy="characters"
                        staggerFrom="first"
                        mainClassName="inline-flex items-center min-h-[1.2em] min-w-[10ch] leading-none align-bottom font-bold"
                        elementLevelClassName="inline-block bg-gradient-to-r from-[#2ac37a] to-[#47b49e] bg-clip-text text-transparent"
                      />
                    </motion.div>

                    {/* Subtle highlight effect */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      <div className="absolute -inset-[100%] w-[150%] h-[200%] top-0 opacity-30 bg-gradient-to-r from-transparent via-white to-transparent skew-x-[-20deg] animate-shimmer-slide"></div>
                    </div>
                  </span>
                </div>
              </motion.div>
            </h1>
            
            {/* Base of the pyramid - widest */}
            <motion.p 
              className="text-lg md:text-xl text-[#2b2e2f]/80 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            >
              Find, buy, and track high-quality backlinks to boost your SEO strategy and improve your website&apos;s authority.
            </motion.p>
          </div>

          {/* CTA Box with Buttons */}
          <motion.div 
            className="mt-10 md:mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          >
            <div className="py-8 px-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-sm max-w-xl mx-auto border border-[#d5dfe3]/50">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  href="/register" 
                  className="w-full sm:w-auto h-12 inline-flex items-center justify-center px-8 text-lg font-medium text-white bg-gradient-to-r from-[#2ac37a] to-[#47b49e] rounded-md shadow-md hover:opacity-90 transition-all hover:shadow-lg"
                >
                  Get Started Free
                </Link>
                <Link 
                  href="#how-it-works" 
                  className="w-full sm:w-auto h-12 inline-flex items-center justify-center px-8 text-lg font-medium text-[#2b2e2f] bg-white border border-[#2ac37a]/20 rounded-md hover:bg-[#2ac37a]/5 transition-all"
                >
                  See How It Works
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              
              {/* No credit card text */}
              <div className="pt-6 text-sm text-[#2b2e2f]/70">
                No credit card required • Free plan available
              </div>
            </div>
          </motion.div>

          {/* Featured logos */}
          <motion.div 
            className="mt-20 space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <p className="text-sm uppercase tracking-wider font-medium text-[#2b2e2f]/70">FEATURED IN</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {[
                { name: 'Forbes', path: '/forbes-logo.svg' },
                { name: 'TechCrunch', path: '/techcrunch-logo.svg' },
                { name: 'New York Times', path: '/nytimes-logo.svg' },
                { name: 'Bloomberg', path: '/bloomberg-logo.svg' },
              ].map((logo) => (
                <div key={logo.name} className="h-8 opacity-80 hover:opacity-100 transition-opacity">
                  <Image
                    src={logo.path}
                    alt={logo.name}
                    width={120}
                    height={32}
                    className="h-full w-auto"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 