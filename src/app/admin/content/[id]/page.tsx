'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Page } from "@/types/content";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Eye, Plus, Save, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Form validation schema for basic page info
const pageInfoSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  slug: z.string()
    .min(2, "Slug must be at least 2 characters")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must only contain lowercase letters, numbers, and hyphens"),
  isPublished: z.boolean().default(false),
});

type PageInfoValues = z.infer<typeof pageInfoSchema>;

// Define interface for section content
interface ContentSection {
  id: string;
  type: string;
  content: {
    title?: string;
    text?: string;
    [key: string]: any;
  };
}

export default function ContentEditor({ params }: { params: { id: string } }) {
  // Access id directly but in a way that should be compatible with future Next.js
  const id = params.id;
  
  const [page, setPage] = useState<Page | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("basic-info");
  const [sections, setSections] = useState<ContentSection[]>([]);
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [editingSection, setEditingSection] = useState<ContentSection | null>(null);
  
  const router = useRouter();
  const { toast } = useToast();

  // Initialize form
  const form = useForm<PageInfoValues>({
    resolver: zodResolver(pageInfoSchema),
    defaultValues: {
      title: "",
      slug: "",
      isPublished: false,
    },
  });

  // Fetch page data
  useEffect(() => {
    async function fetchPage() {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/content?id=${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch page');
        }
        
        const data = await response.json();
        setPage(data);
        setSections(data.sections || []);
        
        // Update form values
        form.reset({
          title: data.title,
          slug: data.slug,
          isPublished: data.isPublished,
        });
      } catch (err) {
        console.error('Error fetching page:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchPage();
  }, [id, form]);

  // Handle slug generation from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  };

  // Auto-generate slug when title changes
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    form.setValue("title", title);
    
    // Only auto-generate slug if the user hasn't manually modified it
    if (page?.slug === form.getValues("slug")) {
      form.setValue("slug", generateSlug(title));
    }
  };

  // Save page info
  const handleSavePageInfo = async (values: PageInfoValues) => {
    if (!page) return;
    
    setIsSaving(true);
    try {
      const response = await fetch('/api/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: page.id,
          title: values.title,
          slug: values.slug,
          isPublished: values.isPublished,
          sections
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update page');
      }
      
      const updatedPage = await response.json();
      setPage(updatedPage);
      
      toast({
        title: "Success",
        description: "Page updated successfully",
        variant: "default",
      });
    } catch (err) {
      console.error('Error updating page:', err);
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : 'Failed to update page',
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Add a new section
  const handleAddSection = () => {
    const newSection: ContentSection = {
      id: `section-${Date.now()}`,
      type: "TEXT",
      content: {
        title: "New Section",
        text: "Add your content here..."
      }
    };
    
    setSections([...sections, newSection]);
    setActiveSection(sections.length);
    setEditingSection(newSection);
  };

  // Update a section
  const handleUpdateSection = (updatedSection: ContentSection) => {
    setSections(sections.map(section => 
      section.id === updatedSection.id ? updatedSection : section
    ));
    setEditingSection(null);
  };

  // Delete a section
  const handleDeleteSection = (index: number) => {
    if (!confirm('Are you sure you want to delete this section?')) {
      return;
    }
    
    const newSections = [...sections];
    newSections.splice(index, 1);
    setSections(newSections);
    
    if (activeSection === index) {
      setActiveSection(null);
      setEditingSection(null);
    } else if (activeSection && activeSection > index) {
      setActiveSection(activeSection - 1);
    }
  };

  // Render section editor based on type
  const renderSectionEditor = () => {
    if (!editingSection) return null;
    
    switch (editingSection.type) {
      case "TEXT":
        return (
          <div className="space-y-4">
            <div className="grid gap-2">
              <label htmlFor="section-title" className="text-sm font-medium">Section Title</label>
              <Input
                id="section-title"
                value={(editingSection.content as any).title || ""}
                onChange={(e) => setEditingSection({
                  ...editingSection,
                  content: {
                    ...editingSection.content,
                    title: e.target.value
                  }
                })}
                placeholder="Section Title"
              />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="section-text" className="text-sm font-medium">Content</label>
              <Textarea
                id="section-text"
                value={(editingSection.content as any).text || ""}
                onChange={(e) => setEditingSection({
                  ...editingSection,
                  content: {
                    ...editingSection.content,
                    text: e.target.value
                  }
                })}
                placeholder="Add your content here..."
                rows={6}
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setEditingSection(null)}>
                Cancel
              </Button>
              <Button onClick={() => handleUpdateSection(editingSection)}>
                Save Section
              </Button>
            </div>
          </div>
        );
      
      // Add more section types here
        
      default:
        return <p>Unsupported section type {editingSection.type}</p>;
    }
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
              <p>{error || "Page not found"}</p>
              <Button variant="outline" className="mt-4" onClick={() => router.push('/admin/content')}>
                Back to Content
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center mb-8">
        <Link href="/admin/content" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Edit Page</h1>
          <p className="text-gray-500 mt-1">{page.title}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" asChild>
            <Link href={`/${page.slug}`} target="_blank">
              <Eye className="mr-2 h-4 w-4" />
              View Page
            </Link>
          </Button>
          <Button onClick={form.handleSubmit(handleSavePageInfo)} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
          <TabsTrigger value="content">Page Content</TabsTrigger>
          <TabsTrigger value="seo">SEO Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic-info">
          <Card>
            <CardHeader>
              <CardTitle>Page Details</CardTitle>
              <CardDescription>Edit the basic information for this page.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSavePageInfo)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Page Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter page title"
                            {...field}
                            onChange={handleTitleChange}
                          />
                        </FormControl>
                        <FormDescription>
                          The title of your page as it will appear to visitors.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL Slug</FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            <span className="mr-2 text-gray-500">/</span>
                            <Input placeholder="page-url-slug" {...field} />
                          </div>
                        </FormControl>
                        <FormDescription>
                          The URL path for this page. Use lowercase letters, numbers, and hyphens only.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="isPublished"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Publish Page</FormLabel>
                          <FormDescription>
                            When enabled, the page will be visible to all visitors.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end">
                    <Button type="submit" disabled={isSaving}>
                      <Save className="mr-2 h-4 w-4" />
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Page Content</CardTitle>
              <CardDescription>Add and edit content sections for this page.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-12 gap-6">
                {/* Sections list */}
                <div className="col-span-12 lg:col-span-4">
                  <div className="border rounded-md h-full">
                    <div className="p-4 border-b flex justify-between items-center">
                      <h3 className="font-medium">Sections</h3>
                      <Button size="sm" onClick={handleAddSection}>
                        <Plus className="h-4 w-4 mr-1" /> Add
                      </Button>
                    </div>
                    <div className="divide-y">
                      {sections.length === 0 ? (
                        <div className="p-6 text-center text-gray-500">
                          <p>No sections yet</p>
                          <p className="text-sm mt-1">Add your first section to get started</p>
                        </div>
                      ) : (
                        sections.map((section, index) => (
                          <div 
                            key={section.id} 
                            className={`p-3 flex justify-between items-center cursor-pointer ${
                              activeSection === index ? "bg-gray-100 dark:bg-gray-800" : ""
                            }`}
                            onClick={() => setActiveSection(index)}
                          >
                            <div>
                              <span className="text-sm font-medium">
                                {(section.content as any).title || `Section ${index + 1}`}
                              </span>
                              <span className="text-xs text-gray-500 block">
                                {section.type}
                              </span>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteSection(index);
                              }}
                            >
                              <Trash className="h-3 w-3" />
                            </Button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Section editor */}
                <div className="col-span-12 lg:col-span-8">
                  {activeSection !== null && !editingSection ? (
                    <div className="border rounded-md p-6">
                      <h3 className="font-medium mb-4">
                        {(sections[activeSection].content as any).title || `Section ${activeSection + 1}`}
                      </h3>
                      
                      {sections[activeSection].type === "TEXT" && (
                        <div className="mb-6">
                          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                            {(sections[activeSection].content as any).text}
                          </p>
                        </div>
                      )}
                      
                      <div className="flex justify-end">
                        <Button onClick={() => setEditingSection(sections[activeSection])}>
                          Edit Section
                        </Button>
                      </div>
                    </div>
                  ) : editingSection ? (
                    <div className="border rounded-md p-6">
                      <h3 className="font-medium mb-4">Edit Section</h3>
                      {renderSectionEditor()}
                    </div>
                  ) : (
                    <div className="border rounded-md p-6 text-center">
                      <p className="text-gray-500 mb-4">Select a section to edit or add a new one</p>
                      <Button onClick={handleAddSection}>
                        <Plus className="h-4 w-4 mr-1" /> Add New Section
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>Optimize your page for search engines.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 text-center py-8">SEO settings coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 