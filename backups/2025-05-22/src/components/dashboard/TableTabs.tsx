import React from 'react';

interface TabProps {
  id: string;
  label: string;
  active: boolean;
}

interface TableTabsProps {
  tabs: TabProps[];
  onTabChange?: (tabId: string) => void;
}

const TableTabs: React.FC<TableTabsProps> = ({ tabs, onTabChange = () => {} }) => {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex -mb-px space-x-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              tab.active
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            aria-current={tab.active ? 'page' : undefined}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TableTabs; 