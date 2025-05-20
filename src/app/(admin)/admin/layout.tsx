'use client';

import { Cog, FileText, LayoutDashboard, LogOut, Menu, Users, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Content', href: '/admin/content', icon: FileText },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Settings', href: '/admin/settings', icon: Cog },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          type="button"
          className="p-2 rounded-md text-gray-700 bg-white shadow-md hover:bg-gray-50"
          onClick={toggleSidebar}
        >
          {sidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 transition-transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-white border-r border-gray-200`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <Link href="/admin" className="flex items-center space-x-2">
              <span className="text-xl font-bold">Admin Panel</span>
            </Link>
            <button
              type="button"
              className="p-1 rounded-md text-gray-500 hover:text-gray-700 lg:hidden"
              onClick={toggleSidebar}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                const IconComponent = item.icon;
                
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg ${
                        isActive
                          ? 'bg-gray-100 text-[#2ac37a]'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => {
                        if (sidebarOpen) {
                          setSidebarOpen(false);
                        }
                      }}
                    >
                      <IconComponent className={`h-5 w-5 mr-3 ${isActive ? 'text-[#2ac37a]' : 'text-gray-500'}`} />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="p-4 border-t">
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">admin@example.com</p>
              </div>
              <Link
                href="/logout"
                className="p-2 text-gray-500 rounded-full hover:bg-gray-100"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className={`lg:pl-64 min-h-screen`}>
        <div className="py-4 sm:py-6">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
} 