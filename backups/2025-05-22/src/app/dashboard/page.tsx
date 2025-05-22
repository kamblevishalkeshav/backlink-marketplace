import AccountBar from '@/components/dashboard/AccountBar';
import AnalyticsDashboard from '@/components/dashboard/AnalyticsDashboard';
import DashboardFooter from '@/components/dashboard/DashboardFooter';
import FilterBar from '@/components/dashboard/FilterBar';
import MarketplaceTable from '@/components/dashboard/MarketplaceTable';
import Navbar from '@/components/dashboard/Navbar';
import Pagination from '@/components/dashboard/Pagination';
import TableTabs from '@/components/dashboard/TableTabs';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AccountBar />
      <Navbar />
      
      <main className="container mx-auto px-4 py-6">
        <AnalyticsDashboard />
        
        <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Marketplace</h2>
          
          <FilterBar />
          
          <div className="mt-6">
            <TableTabs 
              tabs={[
                { id: 'guest-posts', label: 'Guest posts', active: true },
                { id: 'homepage-links', label: 'Homepage links', active: false },
                { id: 'innerpage-links', label: 'Innerpage links', active: false },
                { id: 'sitewide-links', label: 'Sitewide links', active: false }
              ]}
            />
          </div>
          
          <MarketplaceTable className="mt-4" />
          
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Items found: <span className="font-medium text-green-600">143,889</span>
            </div>
            <Pagination 
              currentPage={7194}
              totalPages={7195} 
              onPageChange={(page) => console.log('Page changed:', page)}
            />
          </div>
        </div>
      </main>
      
      <DashboardFooter />
    </div>
  );
} 