'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, DollarSign, ShoppingCart, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  // Example dashboard data - these would normally come from API calls
  const stats = [
    {
      title: "Total Orders",
      value: "12",
      icon: ShoppingCart,
      description: "Total orders placed",
    },
    {
      title: "Wallet Balance",
      value: "$240.00",
      icon: DollarSign,
      description: "Available balance",
    },
    {
      title: "Active Links",
      value: "8",
      icon: TrendingUp,
      description: "Live backlinks",
    },
  ];

  // Mock recent orders data
  const recentOrders = [
    {
      id: "ORD-1234",
      website: "example.com",
      da: 45,
      dr: 52,
      price: "$120",
      status: "completed",
      date: "2023-06-24",
    },
    {
      id: "ORD-1235",
      website: "techblog.com",
      da: 38,
      dr: 41,
      price: "$85",
      status: "in_progress",
      date: "2023-06-22",
    },
    {
      id: "ORD-1236",
      website: "newsblog.org",
      da: 52,
      dr: 48,
      price: "$150",
      status: "pending",
      date: "2023-06-20",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-9"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button
            size="sm"
            className="h-9"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            New Order
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="grid gap-4 grid-cols-1">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              Your most recent backlink orders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left font-medium">Order ID</th>
                    <th className="px-4 py-3 text-left font-medium">Website</th>
                    <th className="px-4 py-3 text-left font-medium">DA/DR</th>
                    <th className="px-4 py-3 text-left font-medium">Price</th>
                    <th className="px-4 py-3 text-left font-medium">Status</th>
                    <th className="px-4 py-3 text-left font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="px-4 py-3">{order.id}</td>
                      <td className="px-4 py-3">{order.website}</td>
                      <td className="px-4 py-3">{order.da}/{order.dr}</td>
                      <td className="px-4 py-3">{order.price}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : order.status === 'in_progress' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status === 'completed' 
                            ? 'Completed' 
                            : order.status === 'in_progress' 
                            ? 'In Progress' 
                            : 'Pending'}
                        </span>
                      </td>
                      <td className="px-4 py-3">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-center mt-4">
              <Button variant="outline" size="sm">
                View All Orders
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 