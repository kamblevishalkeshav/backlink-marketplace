import Image from 'next/image';

const FeaturesSection = () => {
  const features = [
    {
      icon: '/global-icon.svg',
      title: 'Top-Tier News Sites',
      description: 'Access backlinks from internationally recognized news platforms with high domain authority.',
      tags: ['CNN', 'BBC', 'Reuters', 'AP News']
    },
    {
      icon: '/chat-icon.svg',
      title: 'Industry Publications',
      description: 'Build credibility with backlinks from respected industry-specific publications and journals.',
      tags: ['TechCrunch', 'Wired', 'Forbes', 'Business Insider']
    },
    {
      icon: '/document-icon.svg',
      title: 'Guest Posting',
      description: 'Share your expertise through guest posts on high-traffic websites across various niches.',
      tags: ['Medium', 'HuffPost', 'Entrepreneur', 'Inc']
    },
    {
      icon: '/mail-icon.svg',
      title: 'Press Release Distribution',
      description: 'Distribute your news through premium press release services with global reach.',
      tags: ['PR Newswire', 'Business Wire', 'MarketWatch', 'Yahoo Finance']
    }
  ];

  return (
    <section className="w-full py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-slate-700">Premium Backlinks from </span>
            <span className="text-emerald-500">Top Media Sites</span>
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto text-lg">
            Access backlinks from the most influential news sites and media outlets worldwide at the most
            competitive rates in the industry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 text-emerald-500">
                <Image 
                  src={feature.icon} 
                  alt={feature.title} 
                  width={32} 
                  height={32}
                  className="text-emerald-500"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">{feature.title}</h3>
              <p className="text-slate-600 mb-6">{feature.description}</p>
              <div className="flex flex-wrap gap-2">
                {feature.tags.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex} 
                    className="inline-block px-3 py-1 text-sm bg-slate-100 text-slate-700 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 bg-emerald-50 rounded-xl p-10 text-center">
          <h3 className="text-2xl font-bold mb-4 text-slate-800">Industry&apos;s Best Pricing Guarantee</h3>
          <p className="text-slate-600 mb-6">
            We offer the most competitive rates in the industry with our price-match guarantee.
            <br />
            Find it cheaper elsewhere and we&apos;ll beat it by 10%.
          </p>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-8 rounded-lg transition-colors">
            View Our Price List
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 