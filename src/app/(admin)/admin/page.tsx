'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Page } from "@/types/content";
import { Edit, Globe, Plus, Trash } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [pages, setPages] = useState<Page[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPages() {
      try {
        const response = await fetch('/api/content');
        
        if (!response.ok) {
          throw new Error('Failed to fetch pages');
        }
        
        const data = await response.json();
        setPages(data);
      } catch (err) {
        console.error('Error fetching pages:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchPages();
  }, []);

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
          <h1 className="text-3xl font-bold">Content Management</h1>
          <p className="text-gray-500 mt-1">Manage your website content</p>
        </div>
        <Link href="/admin/content/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New Page
          </Button>
        </Link>
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
          {pages.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center p-8">
                  <h3 className="text-lg font-medium mb-2">No pages found</h3>
                  <p className="text-gray-500 mb-4">Create your first page to get started</p>
                  <Link href="/admin/content/new">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" /> Create Page
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pages.map((page) => (
                <Card key={page.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{page.title}</CardTitle>
                        <CardDescription className="mt-1">
                          <code className="text-xs bg-muted p-1 rounded">{page.slug}</code>
                        </CardDescription>
                      </div>
                      <Badge variant={page.isPublished ? "default" : "outline"}>
                        {page.isPublished ? "Published" : "Draft"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div>
                        {page.sections?.length || 0} section{page.sections?.length !== 1 ? "s" : ""}
                      </div>
                      <div>
                        Last updated: {new Date(page.updatedAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-2 mt-4">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="icon" asChild>
                          <Link href={`/${page.slug}`} target="_blank">
                            <Globe className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => handleDeletePage(page.id)}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button asChild>
                        <Link href={`/admin/content/${page.id}`}>
                          <Edit className="mr-2 h-4 w-4" /> Edit Page
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
} 