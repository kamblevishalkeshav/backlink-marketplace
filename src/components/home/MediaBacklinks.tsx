import { BookOpen, Briefcase, Building2, Newspaper } from 'lucide-react';
import Link from 'next/link';

const MediaBacklinks = () => {
  const mediaTypes = [
    {
      icon: <Newspaper className="h-10 w-10 text-[#2ac37a]" />,
      title: 'News Media',
      description: 'High-authority backlinks from top-tier news publications with global reach.',
      bgClass: 'from-white to-[#2ac37a]/5',
      borderClass: 'border-[#2ac37a]/20',
      tagBgClass: 'bg-[#2ac37a]/10',
      tags: ['Business', 'Tech', 'Finance', 'Health']
    },
    {
      icon: <Building2 className="h-10 w-10 text-[#47b49e]" />,
      title: 'Corporate Press',
      description: 'Authoritative backlinks from established corporate websites and press releases.',
      bgClass: 'from-white to-[#47b49e]/5',
      borderClass: 'border-[#47b49e]/20',
      tagBgClass: 'bg-[#47b49e]/10',
      tags: ['Press Releases', 'Corporate Blogs', 'Industry News']
    },
    {
      icon: <BookOpen className="h-10 w-10 text-[#87c44d]" />,
      title: 'Educational Sites',
      description: 'Valuable .edu backlinks from academic institutions and educational platforms.',
      bgClass: 'from-white to-[#87c44d]/5',
      borderClass: 'border-[#87c44d]/20',
      tagBgClass: 'bg-[#87c44d]/10',
      tags: ['Universities', 'Research', 'Educational Blogs']
    },
    {
      icon: <Briefcase className="h-10 w-10 text-[#2b2e2f]" />,
      title: 'Industry Portals',
      description: 'Niche-specific backlinks from respected industry publications and portals.',
      bgClass: 'from-white to-[#d5dfe3]/10',
      borderClass: 'border-[#d5dfe3]/20',
      tagBgClass: 'bg-[#2b2e2f]/10',
      tags: ['Industry News', 'Trade Publications', 'Professional Blogs']
    }
  ];

  return (
    <section className="py-16 relative overflow-hidden bg-[#f9fafb]" id="media-backlinks">
      {/* Background Decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#2ac37a]/5"></div>
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#87c44d]/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-[#47b49e]/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Premium Backlinks from <span className="bg-gradient-to-r from-[#2ac37a] to-[#47b49e] bg-clip-text text-transparent ml-2">Top Media Sites</span>
          </h2>
          
          <p className="text-lg text-[#2b2e2f]/70 max-w-2xl mx-auto">
            Boost your website&apos;s authority with high-quality backlinks from trusted media sources across various industries.
          </p>
        </div>
        
        {/* Media Type Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mediaTypes.map((media, index) => (
            <div 
              key={index}
              className={`bg-gradient-to-br ${media.bgClass} border ${media.borderClass} rounded-xl p-6 transition-all hover:-translate-y-[5px] hover:shadow-md hover-lift`}
            >
              <div className="mb-4">
                {media.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{media.title}</h3>
              <p className="text-[#2b2e2f]/70 mb-4">{media.description}</p>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {media.tags.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex} 
                    className={`px-2 py-1 ${media.tagBgClass} text-xs rounded-full`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Industry's Best Pricing Guarantee CTA */}
        <div className="mt-10 text-center max-w-2xl mx-auto p-6 border border-[#2ac37a]/20 rounded-xl bg-gradient-to-r from-[#2ac37a]/5 to-[#47b49e]/5 shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Industry&apos;s Best Pricing Guarantee</h3>
          <p className="mb-6">We offer the most competitive pricing for premium media backlinks, guaranteed. If you find a better price for the same quality, we&apos;ll match it.</p>
          <Link 
            href="/pricing" 
            className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-gradient-to-r from-[#2ac37a] to-[#47b49e] text-white hover:opacity-90 shadow-sm font-medium"
          >
            View Our Pricing
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MediaBacklinks; 