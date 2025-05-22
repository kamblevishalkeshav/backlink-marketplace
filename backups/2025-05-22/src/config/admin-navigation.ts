import { Cog, DollarSign, FileText, Folder, Globe, Home, LayoutDashboard, LucideIcon, ShieldCheck, ShoppingCart, Users } from 'lucide-react';

export interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

export interface NavSection {
  section: string;
  items: NavItem[];
}

export const adminNavigation: NavSection[] = [
  {
    section: 'Core',
    items: [
      { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    ],
  },
  {
    section: 'Site Builder',
    items: [
      { name: 'Pages', href: '/admin/homepage', icon: Home },
    ],
  },
  {
    section: 'Marketplace',
    items: [
      { name: 'Listings', href: '/admin/marketplace/listings', icon: Globe },
      { name: 'Categories', href: '/admin/marketplace/categories', icon: Folder },
      { name: 'Review Queue', href: '/admin/marketplace/review', icon: ShieldCheck },
    ],
  },
  {
    section: 'Orders & Finance',
    items: [
      { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
      { name: 'Payouts', href: '/admin/finance/payouts', icon: DollarSign },
    ],
  },
  {
    section: 'Content',
    items: [
      { name: 'Content', href: '/admin/content', icon: FileText },
      { name: 'Users', href: '/admin/users', icon: Users },
    ],
  },
  {
    section: 'Settings',
    items: [
      { name: 'Settings', href: '/admin/settings', icon: Cog },
    ],
  },
]; 