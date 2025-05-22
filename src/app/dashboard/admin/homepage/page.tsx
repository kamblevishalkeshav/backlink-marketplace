'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Page } from "@/types/content";
import { Globe, Save } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePageEditor() {
  const [page, setPage] = useState<Page | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("hero");
  const { toast } = useToast();

  useEffect(() => {
    async function fetchHomePage() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/content?slug=home');
        
        if (!response.ok) {
          throw new Error('Failed to fetch home page');
        }
        
        const data = await response.json();
        setPage(data);
      } catch (err) {
        console.error('Error fetching home page:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchHomePage();
  }, []);

  const updateSection = (sectionType: string, updatedContent: any) => {
    if (!page) return;
    
    setPage({
      ...page,
      sections: page.sections.map(section => 
        section.type === sectionType ? { ...section, content: updatedContent } : section
      )
    });
  };

  const handleSave = async () => {
    if (!page) return;
    
    try {
      setIsSaving(true);
      
      const response = await fetch('/api/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: page.id,
          title: page.title,
          slug: page.slug,
          isPublished: page.isPublished,
          sections: page.sections
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update home page');
      }
      
      const updatedPage = await response.json();
      setPage(updatedPage);
      
      toast({
        title: "Success",
        description: "Home page updated successfully",
        variant: "default",
      });
    } catch (err) {
      console.error('Error updating home page:', err);
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : 'Failed to update home page',
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Find sections by type
  const getSection = (type: string) => {
    if (!page || !page.sections) return null;
    return page.sections.find(section => section.type === type) || null;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-red-500">
              <p>{error || "Home page not found"}</p>
              <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Home Page Editor</h1>
          <p className="text-gray-500 mt-1">Customize your website's home page</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" asChild>
            <Link href="/" target="_blank">
              <Globe className="mr-2 h-4 w-4" />
              View Live
            </Link>
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="analytics">Dashboard</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          <TabsTrigger value="cta">CTA</TabsTrigger>
        </TabsList>
        
        <TabsContent value="hero" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
              <CardDescription>Edit your main hero section content.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <label htmlFor="hero-title" className="text-sm font-medium">Title</label>
                  <input
                    id="hero-title"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={getSection('HERO')?.content?.title || ''}
                    onChange={(e) => {
                      const section = getSection('HERO');
                      if (section) {
                        updateSection('HERO', {
                          ...section.content,
                          title: e.target.value
                        });
                      }
                    }}
                    placeholder="Build Quality Backlinks with Ease"
                  />
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="hero-subtitle" className="text-sm font-medium">Subtitle</label>
                  <input
                    id="hero-subtitle"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={getSection('HERO')?.content?.subtitle || ''}
                    onChange={(e) => {
                      const section = getSection('HERO');
                      if (section) {
                        updateSection('HERO', {
                          ...section.content,
                          subtitle: e.target.value
                        });
                      }
                    }}
                    placeholder="Connect with premium publishers and grow your authority"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="hero-cta-text" className="text-sm font-medium">CTA Text</label>
                    <input
                      id="hero-cta-text"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={getSection('HERO')?.content?.ctaText || ''}
                      onChange={(e) => {
                        const section = getSection('HERO');
                        if (section) {
                          updateSection('HERO', {
                            ...section.content,
                            ctaText: e.target.value
                          });
                        }
                      }}
                      placeholder="Get Started"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <label htmlFor="hero-cta-link" className="text-sm font-medium">CTA Link</label>
                    <input
                      id="hero-cta-link"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={getSection('HERO')?.content?.ctaLink || ''}
                      onChange={(e) => {
                        const section = getSection('HERO');
                        if (section) {
                          updateSection('HERO', {
                            ...section.content,
                            ctaLink: e.target.value
                          });
                        }
                      }}
                      placeholder="/register"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Add other tabs similar to hero section */}
        <TabsContent value="features" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Features Section</CardTitle>
              <CardDescription>Showcase the key features of your service.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">Edit the features section content here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Dashboard Section</CardTitle>
              <CardDescription>Highlight your analytics dashboard features.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">Edit the analytics dashboard section content here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="testimonials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Testimonials Section</CardTitle>
              <CardDescription>Manage customer testimonials and feedback.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">Edit testimonials section content here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="cta" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Call-to-Action Section</CardTitle>
              <CardDescription>Edit your call-to-action messaging.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">Edit CTA section content here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 