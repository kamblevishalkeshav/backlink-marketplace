import { ChevronDown } from 'lucide-react';
import React from 'react';

const AnalyticsDashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Project Card (8 columns) */}
      <div className="col-span-12 md:col-span-8 bg-white rounded-xl shadow-sm p-4 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <h2 className="text-sm font-medium text-gray-500">SELECTED PROJECT</h2>
            <div className="ml-2 flex items-center">
              <span className="text-lg font-medium">arivupro.com</span>
              <ChevronDown className="w-4 h-4 ml-1 text-gray-500" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1 text-gray-400 hover:text-gray-600" aria-label="Information">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button className="p-1 text-gray-400 hover:text-gray-600" aria-label="Settings">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-2">
          <div className="text-center">
            <h3 className="uppercase text-xs text-gray-500 mb-1">DR</h3>
            <p className="text-2xl font-semibold">34</p>
          </div>
          <div className="text-center">
            <h3 className="uppercase text-xs text-gray-500 mb-1">DA</h3>
            <p className="text-2xl font-semibold">27</p>
          </div>
          <div className="text-center">
            <h3 className="uppercase text-xs text-gray-500 mb-1">AS</h3>
            <p className="text-2xl font-semibold">38</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <h3 className="uppercase text-xs text-gray-500 mb-1">Traffic</h3>
            <p className="text-lg font-semibold">58.8K</p>
          </div>
          <div className="text-center">
            <h3 className="uppercase text-xs text-gray-500 mb-1">Keywords</h3>
            <p className="text-lg font-semibold">11.3K</p>
          </div>
          <div className="text-center">
            <h3 className="uppercase text-xs text-gray-500 mb-1">Ref. Domains</h3>
            <p className="text-lg font-semibold">656</p>
          </div>
        </div>
        
        <div className="mt-4 flex items-center">
          <span className="text-sm mr-2">Country:</span>
          <div className="flex items-center">
            <img src="https://flagcdn.com/in.svg" alt="India" className="w-4 h-4 rounded-sm mr-1" />
            <span className="text-sm">IN (87%)</span>
          </div>
        </div>
      </div>
      
      {/* Competitor Link Gap Card (4 columns on md+) */}
      <div className="col-span-12 md:col-span-4 bg-white rounded-xl shadow-sm p-4 border border-gray-200 relative">
        <div className="absolute right-4 top-2 bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
          NEW
        </div>
        
        <h3 className="text-lg font-semibold mb-2">Competitor Link Gap</h3>
        <p className="text-sm text-gray-600 mb-4">
          Add your competitors and automatically analyze their backlinks. Use our Competitor gap match filter to find link gap opportunities.
        </p>
        
        <button className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
          <span className="mr-1">+</span> Add Competitor
        </button>
      </div>
      
      {/* Customer Success Card (Optional, can be 4 columns) */}
      <div className="col-span-12 md:col-span-4 bg-white rounded-xl shadow-sm p-4 border border-gray-200">
        <h3 className="text-xs font-medium text-gray-500 uppercase mb-1">CUSTOMER SUCCESS</h3>
        <p className="text-sm font-medium mb-3">success@meup.com</p>
        
        <button className="flex items-center justify-center w-full py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700">
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Get Help
        </button>
        
        <div className="flex justify-center mt-3 space-x-4">
          <button className="p-1 text-gray-400 hover:text-gray-600" aria-label="Call us">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </button>
          
          <button className="p-1 text-gray-400 hover:text-gray-600" aria-label="Send email">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard; 