import { ArrowRight, Bot, Crown, Eye, LineChart, ListTodo, MoreHorizontal, User2, Users } from 'lucide-react';
import Link from 'next/link';

const FeatureCard = ({ icon: Icon, title, description }: { 
  icon: React.ElementType;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-center text-center group hover:scale-105 transition-all duration-300">
      <div className="mb-5 p-3 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-500 shadow-sm group-hover:shadow-md transition-all duration-300 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-emerald-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
        <Icon className="w-7 h-7 relative z-10" strokeWidth={1.75} />
      </div>
      <h3 className="text-lg font-semibold text-slate-800 mb-2">{title}</h3>
      <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
};

const FeaturesGrid = () => {
  const features = [
    {
      icon: Crown,
      title: "Competitor Gap Tool",
      description: "Find missing backlinks and gain an advantage by closing the gap."
    },
    {
      icon: LineChart,
      title: "Order Management and Tracking",
      description: "Easily track your link-building projects and their performance."
    },
    {
      icon: ListTodo,
      title: "Multiple Payment Options, One Invoice",
      description: "Pay with Stripe, PayPal, Bank Transfer, Wise, Crypto, and more - all on a single invoice."
    },
    {
      icon: Eye,
      title: "Link Tracking",
      description: "Automatically check and verify that your placed links are live and effective."
    },
    {
      icon: Users,
      title: "Multi-User Access",
      description: "Invite your team or clients and set different permission levels for each."
    },
    {
      icon: User2,
      title: "Multiple Accounts",
      description: "Manage separate accounts or businesses with standalone settings for each."
    },
    {
      icon: Bot,
      title: "AI Tools",
      description: "Use advanced tools and filters to improve your link building strategy."
    },
    {
      icon: User2,
      title: "Dedicated Success Team",
      description: "Get help whenever you need it with a personal account manager."
    },
    {
      icon: ListTodo,
      title: "Offer Lists",
      description: "Create and share lists of preselected link options with clients or your team."
    },
    {
      icon: LineChart,
      title: "Upgrade to Managed Account",
      description: "A dedicated expert runs your strategy on autopilot — from links to execution. Free with minimum budget."
    },
    {
      icon: MoreHorizontal,
      title: "And more...",
      description: "Discover other tools to help you succeed."
    }
  ];

  return (
    <section className="py-24 md:py-28 relative overflow-hidden">
      {/* Background gradient elements */}
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-emerald-50 blur-3xl opacity-70"></div>
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-emerald-50 blur-3xl opacity-70"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-slate-800 to-slate-700 bg-clip-text text-transparent">The most advanced tools for</span><br />
            <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">SEO and link building!</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Backlink Marketplace is more than just a marketplace – it&apos;s a full-service link-building platform packed with advanced tools.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 lg:p-10 mb-12 relative">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-transparent to-emerald-50/20 rounded-2xl"></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 relative z-10">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link 
            href="/features" 
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent rounded-lg shadow-md text-base font-medium text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105"
          >
            See All Tools In Action
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid; 