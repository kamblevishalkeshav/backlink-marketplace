'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Page } from "@/types/content";
import { Edit, Filter, Plus, Search, Trash } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ContentPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [filteredPages, setFilteredPages] = useState<Page[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");

  useEffect(() => {
    async function fetchPages() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/content');
        
        if (!response.ok) {
          throw new Error('Failed to fetch pages');
        }
        
        const data = await response.json();
        setPages(data);
        setFilteredPages(data);
      } catch (err) {
        console.error('Error fetching pages:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchPages();
  }, []);

  useEffect(() => {
    let result = [...pages];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(page => 
        page.title.toLowerCase().includes(query) || 
        page.slug.toLowerCase().includes(query)
      );
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter(page => 
        statusFilter === "published" ? page.isPublished : !page.isPublished
      );
    }
    
    setFilteredPages(result);
  }, [searchQuery, statusFilter, pages]);

  const handleDeletePage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this page?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/content?id=${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete page');
      }
      
      // Remove the deleted page from state
      setPages(pages.filter(page => page.id !== id));
    } catch (err) {
      console.error('Error deleting page:', err);
      alert('Failed to delete page. Please try again.');
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Content Pages</h1>
          <p className="text-gray-500 mt-1">Create and manage your website content</p>
        </div>
        <Link href="/admin/content/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New Page
          </Button>
        </Link>
      </div>
      
      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search pages..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            className="px-3 py-2 rounded-md border border-input bg-background text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as "all" | "published" | "draft")}
          >
            <option value="all">All Pages</option>
            <option value="published">Published Only</option>
            <option value="draft">Drafts Only</option>
          </select>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-red-500">
              <p>{error}</p>
              <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {filteredPages.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center p-8">
                  {searchQuery || statusFilter !== "all" ? (
                    <>
                      <h3 className="text-lg font-medium mb-2">No matching pages found</h3>
                      <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
                      <Button variant="outline" onClick={() => {
                        setSearchQuery("");
                        setStatusFilter("all");
                      }}>
                        Clear Filters
                      </Button>
                    </>
                  ) : (
                    <>
                      <h3 className="text-lg font-medium mb-2">No pages found</h3>
                      <p className="text-gray-500 mb-4">Create your first page to get started</p>
                      <Link href="/admin/content/new">
                        <Button>
                          <Plus className="mr-2 h-4 w-4" /> Create Page
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="overflow-hidden bg-white dark:bg-gray-800 shadow sm:rounded-md">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredPages.map((page) => (
                  <li key={page.id}>
                    <div className="flex items-center px-4 py-4 sm:px-6">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center">
                          <p className="truncate text-sm font-medium">{page.title}</p>
                          <Badge variant={page.isPublished ? "default" : "outline"} className="ml-2">
                            {page.isPublished ? "Published" : "Draft"}
                          </Badge>
                        </div>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <span className="truncate">/{page.slug}</span>
                          <span className="mx-2">•</span>
                          <span>Last updated: {new Date(page.updatedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="ml-5 flex items-center space-x-2">
                        <Link href={`/${page.slug}`} target="_blank">
                          <Button variant="ghost" size="sm">View</Button>
                        </Link>
                        <Link href={`/admin/content/${page.id}`}>
                          <Button variant="outline" size="sm" className="flex items-center">
                            <Edit className="mr-1 h-3 w-3" /> Edit
                          </Button>
                        </Link>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDeletePage(page.id)}
                        >
                          <Trash className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
} 