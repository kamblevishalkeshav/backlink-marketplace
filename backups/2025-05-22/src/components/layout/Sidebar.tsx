'use client';

import { cn } from '@/lib/utils';
import {
    BarChart,
    Edit,
    FileText,
    Home,
    List,
    Settings,
    ShoppingCart,
    Wallet,
    Wrench
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    if (path === '/dashboard' && pathname === '/dashboard') return true;
    if (path !== '/dashboard' && pathname.startsWith(path)) return true;
    return false;
  };
  
  const routes = [
    {
      href: '/dashboard',
      label: 'Overview',
      icon: Home,
    },
    {
      href: '/dashboard/orders',
      label: 'Orders',
      icon: ShoppingCart,
    },
    {
      href: '/dashboard/wallet',
      label: 'Wallet',
      icon: Wallet,
    },
    {
      href: '/dashboard/tools',
      label: 'Tools',
      icon: Wrench,
    },
  ];
  
  const publisherRoutes = [
    {
      href: '/publisher/listings',
      label: 'Listings',
      icon: List,
    },
    {
      href: '/publisher/orders',
      label: 'Orders',
      icon: ShoppingCart,
    },
    {
      href: '/publisher/analytics',
      label: 'Analytics',
      icon: BarChart,
    },
  ];
  
  const adminRoutes = [
    {
      href: '/dashboard/admin',
      label: 'Admin Panel',
      icon: Settings,
    },
    {
      href: '/dashboard/admin/homepage',
      label: 'Edit Homepage',
      icon: Edit,
    },
    {
      href: '/dashboard/admin/content',
      label: 'Content',
      icon: FileText,
    },
  ];
  
  return (
    <aside className={cn("pb-12 min-h-screen w-full", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Dashboard
          </h2>
          <div className="space-y-1">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-primary",
                  isActive(route.href) 
                    ? "bg-muted text-primary" 
                    : "text-muted-foreground"
                )}
              >
                <route.icon className="h-4 w-4" />
                {route.label}
              </Link>
            ))}
          </div>
        </div>
        
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Publisher
          </h2>
          <div className="space-y-1">
            {publisherRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-primary",
                  isActive(route.href) 
                    ? "bg-muted text-primary" 
                    : "text-muted-foreground"
                )}
              >
                <route.icon className="h-4 w-4" />
                {route.label}
              </Link>
            ))}
          </div>
        </div>
        
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Admin
          </h2>
          <div className="space-y-1">
            {adminRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-primary",
                  isActive(route.href) 
                    ? "bg-muted text-primary" 
                    : "text-muted-foreground"
                )}
              >
                <route.icon className="h-4 w-4" />
                {route.label}
              </Link>
            ))}
          </div>
        </div>
        
        <div className="px-3 py-2">
          <div className="space-y-1">
            <Link
              href="/dashboard/settings"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-primary",
                isActive('/dashboard/settings') 
                  ? "bg-muted text-primary" 
                  : "text-muted-foreground"
              )}
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
} 