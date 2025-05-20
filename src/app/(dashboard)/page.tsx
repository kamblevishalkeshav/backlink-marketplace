'use client';

import { redirect } from 'next/navigation';

export default function DashboardPage() {
  // Redirect to the new dashboard route
  redirect('/dashboard');
  
  // This won't be rendered due to redirect
  return null;
} 