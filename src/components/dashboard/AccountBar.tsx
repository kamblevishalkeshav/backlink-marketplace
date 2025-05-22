import { Bell, ChevronDown, PlusCircle, ShoppingCart, User } from 'lucide-react';
import React from 'react';

const AccountBar: React.FC = () => {
  return (
    <div className="bg-white border-b border-gray-200 py-2">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-sm font-medium mr-1">Account</span>
          <div className="relative inline-block">
            <button className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900">
              anc.digital
              <ChevronDown className="ml-1 w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <a 
            href="#" 
            className="text-sm text-green-600 hover:text-green-800"
          >
            Request a managed account!
          </a>
          
          <div className="flex items-center text-sm">
            <span className="font-medium">$0 credits</span>
            <button
              className="ml-1 text-green-600 hover:text-green-800"
              aria-label="Add credits"
            >
              <PlusCircle className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              className="relative p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                2
              </span>
            </button>
            
            <button 
              className="relative p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                9
              </span>
            </button>
            
            <button 
              className="p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="User profile"
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountBar; 