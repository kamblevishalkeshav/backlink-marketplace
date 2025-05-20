"use client";

import { GlowingEffect } from '@/components/ui/glowing-effect';
import { RainbowButton } from '@/components/ui/rainbow-button';
import { cn } from '@/lib/utils';
import { ArrowRight, Bot, Crown, Eye, LineChart, ListTodo, User2, Users } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  iconBg: string;
}

const FeatureCard = ({ icon, title, description, className, iconBg }: FeatureCardProps) => {
  return (
    <div className={cn("min-h-[14rem] list-none", className)}>
      <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-gray-100 p-2 md:rounded-[1.5rem] md:p-2 hover:border-gray-200 transition-colors duration-200">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={2}
        />
        <div className="relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-xl border-[0.75px] border-gray-100 bg-white/90 backdrop-blur-sm p-5 shadow-md">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className={`w-fit rounded-lg p-2.5 ${iconBg}`}>
              {icon}
            </div>
            <div className="space-y-2">
              <h3 className="text-lg leading-tight font-semibold font-sans tracking-[-0.04em] md:text-xl text-balance text-slate-800">
                {title}
              </h3>
              <h2 className="font-sans text-xs leading-tight md:text-sm text-slate-600">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturesGlowingGrid = () => {
  // Color variants to match the glowing effect
  const colors = [
    { bg: "bg-pink-50", color: "text-pink-500" }, // #dd7bbb (pink)
    { bg: "bg-amber-50", color: "text-amber-500" }, // #d79f1e (gold/amber)
    { bg: "bg-green-50", color: "text-green-600" }, // #5a922c (green)
    { bg: "bg-blue-50", color: "text-blue-500" }, // #4c7894 (blue)
  ];

  const features = [
    {
      icon: <Crown className="h-6 w-6" />,
      title: "Competitor Gap Tool",
      description: "Find missing backlinks and gain an advantage by closing the gap.",
      colorIndex: 0
    },
    {
      icon: <LineChart className="h-6 w-6" />,
      title: "Order Management and Tracking",
      description: "Easily track your link-building projects and their performance.",
      colorIndex: 1
    },
    {
      icon: <ListTodo className="h-6 w-6" />,
      title: "Multiple Payment Options",
      description: "Pay with Stripe, PayPal, Bank Transfer, Wise, Crypto, and more - all on a single invoice.",
      colorIndex: 2
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Link Tracking",
      description: "Automatically check and verify that your placed links are live and effective.",
      colorIndex: 3
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Multi-User Access",
      description: "Invite your team or clients and set different permission levels for each.",
      colorIndex: 0
    },
    {
      icon: <User2 className="h-6 w-6" />,
      title: "Multiple Accounts",
      description: "Manage separate accounts or businesses with standalone settings for each.",
      colorIndex: 1
    },
    {
      icon: <Bot className="h-6 w-6" />,
      title: "AI Tools",
      description: "Use advanced tools and filters to improve your link building strategy.",
      colorIndex: 2
    },
    {
      icon: <User2 className="h-6 w-6" />,
      title: "Dedicated Success Team",
      description: "Get help whenever you need it with a personal account manager.",
      colorIndex: 3
    },
  ];

  return (
    <section className="py-16 md:py-20 relative overflow-hidden hero-bg">
      {/* Enhanced background with gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#ECFDF5] to-[#e0f5f2] -z-10"></div>
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-pink-50/50 blur-3xl opacity-70"></div>
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-50/50 blur-3xl opacity-70"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-10 md:mb-12">
          <div className="text-center lg:text-left lg:max-w-3xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              <span className="bg-gradient-to-r from-slate-800 to-slate-700 bg-clip-text text-transparent">The most advanced tools for</span><br />
              <span className="bg-gradient-to-r from-pink-500 via-amber-500 to-blue-500 bg-clip-text text-transparent">SEO and link building!</span>
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto lg:mx-0 leading-relaxed">
              Backlink Marketplace is more than just a marketplace – it&apos;s a full-service link-building platform packed with advanced tools.
            </p>
          </div>
          
          <div className="hidden lg:flex lg:justify-end mt-6 lg:mt-0">
            <Link href="/features" className="inline-block" passHref>
              <RainbowButton className="flex items-center">
                See All Tools <ArrowRight className="ml-2 h-4 w-4" />
              </RainbowButton>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const color = colors[feature.colorIndex];
            
            return (
              <FeatureCard
                key={index}
                icon={
                  <div className={color.color}>
                    {feature.icon}
                  </div>
                }
                title={feature.title}
                description={feature.description}
                iconBg={color.bg}
              />
            );
          })}
        </div>
        
        <div className="flex lg:hidden justify-center mt-10">
          <Link href="/features" className="inline-block" passHref>
            <RainbowButton className="flex items-center">
              See All Tools <ArrowRight className="ml-2 h-4 w-4" />
            </RainbowButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturesGlowingGrid; 