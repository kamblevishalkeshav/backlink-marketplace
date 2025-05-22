"use client";

import AccountBar from '@/components/dashboard/AccountBar';
import AnalyticsDashboard from '@/components/dashboard/AnalyticsDashboard';
import DashboardFooter from '@/components/dashboard/DashboardFooter';
import FilterBar from '@/components/dashboard/FilterBar';
import MarketplaceTable from '@/components/dashboard/MarketplaceTable';
import Navbar from '@/components/dashboard/Navbar';
import Pagination from '@/components/dashboard/Pagination';
import TableTabs from '@/components/dashboard/TableTabs';
import { useState } from 'react';

export default function DashboardPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('guest-posts');
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log('Page changed:', page);
  };
  
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    console.log('Tab changed:', tabId);
  };
  
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
                { id: 'guest-posts', label: 'Guest posts', active: activeTab === 'guest-posts' },
                { id: 'homepage-links', label: 'Homepage links', active: activeTab === 'homepage-links' },
                { id: 'innerpage-links', label: 'Innerpage links', active: activeTab === 'innerpage-links' },
                { id: 'sitewide-links', label: 'Sitewide links', active: activeTab === 'sitewide-links' }
              ]}
              onTabChange={handleTabChange}
            />
          </div>
          
          <MarketplaceTable className="mt-4" />
          
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Items found: <span className="font-medium text-green-600">143,889</span>
            </div>
            <Pagination 
              currentPage={currentPage}
              totalPages={7195} 
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </main>
      
      <DashboardFooter />
    </div>
  );
} 