// Create home page script
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createHomePage() {
  console.log('Creating home page...');
  
  try {
    // Check if home page already exists
    const existingPage = await prisma.page.findUnique({
      where: { slug: 'home' }
    });
    
    if (existingPage) {
      console.log('Home page already exists.');
      return;
    }
    
    // Create the home page with sections
    const homePage = await prisma.page.create({
      data: {
        title: 'Home Page',
        slug: 'home',
        isPublished: true,
        sections: {
          create: [
            {
              name: 'Hero Section',
              type: 'HERO',
              order: 0,
              content: {
                title: 'Build Quality Backlinks with Ease',
                subtitle: 'Connect with premium publishers and grow your authority',
                ctaText: 'Get Started',
                ctaLink: '/register'
              }
            },
            {
              name: 'Features Section',
              type: 'FEATURES',
              order: 1,
              content: {
                title: 'Why Choose Our Platform',
                subtitle: 'Discover the advantages of our backlink marketplace',
                features: [
                  {
                    title: 'Quality Guaranteed',
                    description: 'All websites are vetted for quality metrics'
                  },
                  {
                    title: 'Direct Relationships',
                    description: 'Work directly with publishers, no middlemen'
                  },
                  {
                    title: 'Transparent Pricing',
                    description: 'See exactly what you\'re paying for'
                  },
                  {
                    title: 'Performance Tracking',
                    description: 'Monitor the impact of your backlinks'
                  }
                ]
              }
            },
            {
              name: 'Analytics Dashboard',
              type: 'ANALYTICS_DASHBOARD',
              order: 2,
              content: {
                title: 'Powerful Analytics Dashboard',
                subtitle: 'Track your backlink performance and ROI',
                features: ['Domain authority tracking', 'Traffic analytics', 'Ranking improvements', 'Conversion tracking']
              }
            },
            {
              name: 'Testimonials Section',
              type: 'TESTIMONIALS',
              order: 3,
              content: {
                title: 'What Our Customers Say',
                subtitle: 'Discover why businesses trust our platform',
                testimonials: [
                  {
                    name: 'Jane Smith',
                    role: 'SEO Manager at TechCorp',
                    content: 'We\'ve seen a 40% increase in organic traffic since using this platform. The quality of backlinks is outstanding.',
                    avatar: '/testimonials/avatar1.jpg'
                  },
                  {
                    name: 'Mark Johnson',
                    role: 'Digital Marketing Lead',
                    content: 'The transparency and ease of use make this my go-to platform for building our backlink profile.',
                    avatar: '/testimonials/avatar2.jpg'
                  },
                  {
                    name: 'Sarah Williams',
                    role: 'Founder at GrowthAgency',
                    content: 'I recommend this to all my clients. The ROI speaks for itself - quality backlinks without the usual hassle.',
                    avatar: '/testimonials/avatar3.jpg'
                  }
                ]
              }
            },
            {
              name: 'CTA Section',
              type: 'CTA',
              order: 4,
              content: {
                title: 'Ready to boost your SEO?',
                subtitle: 'Join thousands of businesses building quality backlinks today',
                buttonText: 'Start Building Links',
                buttonLink: '/register'
              }
            }
          ]
        }
      }
    });
    
    console.log('Home page created successfully:', homePage.title, '(ID:', homePage.id + ')');
    
  } catch (error) {
    console.error('Error creating home page:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createHomePage(); 