import { BarChart4, FileDown, PieChart, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const AnalyticsDashboard = () => {
  return (
    <section className="py-8 md:py-10">
      <div className="container max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Column - Content */}
          <div className="space-y-4 max-w-xl mx-auto lg:mx-0">
            <span className="inline-block rounded-full bg-[#2ac37a]/10 px-3 py-1 text-sm text-[#2ac37a] font-medium mb-2">
              Powerful Insights
            </span>
            
            <h2 className="text-3xl md:text-4xl font-bold text-center lg:text-left">
              Track the impact of your backlinks
            </h2>
            
            <p className="text-lg text-muted-foreground text-center lg:text-left">
              Our comprehensive analytics dashboard provides real-time data on how your backlinks are performing, 
              helping you make informed decisions about your SEO strategy.
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="bg-[#2ac37a]/10 p-2 rounded-full">
                  <BarChart4 className="h-5 w-5 text-[#2ac37a]" />
                </div>
                <div>
                  <p className="font-medium">DR & Metrics</p>
                  <p className="text-sm text-muted-foreground">Monitor Domain Rating, Authority Score, and other key metrics.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-[#2ac37a]/10 p-2 rounded-full">
                  <PieChart className="h-5 w-5 text-[#2ac37a]" />
                </div>
                <div>
                  <p className="font-medium">Traffic Insights</p>
                  <p className="text-sm text-muted-foreground">See how backlinks impact your organic traffic and referral sources.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-[#2ac37a]/10 p-2 rounded-full">
                  <TrendingUp className="h-5 w-5 text-[#2ac37a]" />
                </div>
                <div>
                  <p className="font-medium">Keyword Rankings</p>
                  <p className="text-sm text-muted-foreground">Track your search engine rankings for target keywords over time.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-[#2ac37a]/10 p-2 rounded-full">
                  <FileDown className="h-5 w-5 text-[#2ac37a]" />
                </div>
                <div>
                  <p className="font-medium">Custom Reports</p>
                  <p className="text-sm text-muted-foreground">Generate detailed reports to share progress with your team or clients.</p>
                </div>
              </div>
            </div>

            <div className="text-center lg:text-left">
              <Link 
                href="/dashboard/analytics" 
                className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-[#2ac37a] text-white font-medium hover:bg-[#2ac37a]/90 transition-colors"
              >
                Explore Dashboard
              </Link>
            </div>
          </div>

          {/* Right Column - Dashboard Preview */}
          <div className="bg-[#d5dfe3]/10 border border-border rounded-xl p-6 shadow-lg relative">
            {/* Mock Dashboard UI */}
            <div className="aspect-[16/9] bg-gradient-to-br from-[#2ac37a]/5 to-[#47b49e]/5 rounded-lg border border-border overflow-hidden relative">
              {/* Dashboard Header */}
              <div className="p-4 border-b border-border flex justify-between items-center">
                <div>
                  <div className="h-2 w-16 bg-[#2ac37a]/20 rounded mb-2"></div>
                  <div className="h-2 w-24 bg-[#2ac37a]/10 rounded"></div>
                </div>
                <div className="flex gap-2">
                  <div className="h-6 w-6 rounded-md bg-[#2ac37a]/10"></div>
                  <div className="h-6 w-6 rounded-md bg-[#2ac37a]/10"></div>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-4">
                {/* KPI Cards */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: 'Total Links', value: '248', change: '+12%' },
                    { label: 'Avg. DA', value: '52', change: '+3' },
                    { label: 'Traffic', value: '18.2k', change: '+8%' },
                  ].map((kpi, i) => (
                    <div key={i} className="bg-background/80 rounded-lg p-3">
                      <div className="h-2 w-12 bg-[#2ac37a]/20 rounded mb-2"></div>
                      <div className="flex justify-between items-end">
                        <span className="text-xl font-bold text-[#2ac37a]">{kpi.value}</span>
                        <span className="text-xs text-[#2ac37a]">{kpi.change}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Charts */}
                <div className="bg-background/80 rounded-lg p-3 mb-4">
                  <div className="h-2 w-24 bg-[#2ac37a]/20 rounded mb-3"></div>
                  
                  {/* Bar Chart */}
                  <div className="h-32 flex items-end gap-2 mb-2">
                    {[65, 40, 85, 30, 55, 75, 45, 90, 60, 50, 70, 80].map((height, i) => (
                      <div 
                        key={i} 
                        className="flex-1 bg-[#2ac37a]/20 hover:bg-[#2ac37a]/30 transition-colors rounded-t"
                        style={{ height: `${height}%` }}
                      ></div>
                    ))}
                  </div>
                  <div className="flex justify-between">
                    <div className="h-2 w-8 bg-[#2ac37a]/10 rounded"></div>
                    <div className="h-2 w-8 bg-[#2ac37a]/10 rounded"></div>
                  </div>
                </div>

                {/* Table */}
                <div className="bg-background/80 rounded-lg p-3">
                  <div className="h-2 w-32 bg-[#2ac37a]/20 rounded mb-3"></div>
                  <div className="space-y-2">
                    {[1, 2, 3].map((row) => (
                      <div key={row} className="flex justify-between items-center py-2 border-b border-border">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-[#2ac37a]/20"></div>
                          <div className="h-2 w-24 bg-[#2ac37a]/10 rounded"></div>
                        </div>
                        <div className="h-2 w-12 bg-[#2ac37a]/20 rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsDashboard; 