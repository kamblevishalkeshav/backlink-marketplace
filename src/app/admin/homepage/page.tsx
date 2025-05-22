"use client";

import { SectionEditor } from "@/components/admin/section-editor";
import { SectionPreview } from "@/components/admin/section-preview";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Section, SectionManager } from "@/components/ui/section-manager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Theme, ThemeManager, defaultTheme } from "@/components/ui/theme-manager";
import { useToast } from "@/components/ui/use-toast";
import { BarChart3, LayoutDashboard, PaintBucket, Save } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

// Available section types - this would come from API in a real app
const AVAILABLE_SECTION_TYPES = [
  { type: "HERO", name: "Hero Banner" },
  { type: "FEATURES", name: "Features Grid" },
  { type: "TEXT", name: "Text Content" },
  { type: "TESTIMONIALS", name: "Testimonials" },
  { type: "CTA", name: "Call to Action" },
  { type: "IMAGE", name: "Image" },
  { type: "PRICING", name: "Pricing Plans" },
];

// Mock analytics data - in a real app this would come from an API
const MOCK_ANALYTICS_DATA = {
  sectionViews: [
    { id: "section-1", name: "Hero Banner", views: 2456, clicks: 342, ctr: 13.9 },
    { id: "section-2", name: "Features Section", views: 1987, clicks: 205, ctr: 10.3 },
    { id: "section-3", name: "Call to Action", views: 1568, clicks: 284, ctr: 18.1 },
  ],
  performanceByDevice: {
    desktop: { views: 3245, clicks: 520, ctr: 16.0 },
    mobile: { views: 2345, clicks: 278, ctr: 11.9 },
    tablet: { views: 421, clicks: 43, ctr: 10.2 },
  },
  conversionData: {
    signups: 126,
    purchases: 48,
    conversionRate: 2.1,
  }
};

// Mock data - in a real app this would come from the database
const MOCK_HOMEPAGE_DATA = {
  sections: [
    {
      id: "section-1",
      name: "Hero Banner",
      type: "HERO",
      isVisible: true,
      backgroundColor: "#f8fafc",
      textColor: "#0f172a",
      content: {
        heading: "Backlink Marketplace",
        subheading: "Grow your website's authority with quality backlinks from reputable publishers.",
        ctaText: "Get Started",
        ctaLink: "/register",
        backgroundImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1800&q=80",
      },
    },
    {
      id: "section-2",
      name: "Features Section",
      type: "FEATURES",
      isVisible: true,
      backgroundColor: "#ffffff",
      textColor: "#0f172a",
      content: {
        heading: "Why Choose Our Platform",
        subheading: "We offer a comprehensive solution for both publishers and website owners",
        features: [
          {
            id: "feature-1",
            title: "Quality Backlinks",
            description: "Only high DA sites with real traffic",
            iconName: "link",
          },
          {
            id: "feature-2",
            title: "Fair Pricing",
            description: "Transparent pricing with no hidden fees",
            iconName: "dollar-sign",
          },
          {
            id: "feature-3",
            title: "Fast Delivery",
            description: "Get your backlinks published quickly",
            iconName: "zap",
          },
        ],
      },
    },
    {
      id: "section-3",
      name: "Call to Action",
      type: "CTA",
      isVisible: true,
      backgroundColor: "#3b82f6",
      textColor: "#ffffff",
      content: {
        heading: "Ready to Boost Your SEO?",
        subheading: "Join thousands of satisfied customers who have improved their search rankings.",
        ctaText: "Start Now",
        ctaLink: "/register",
      },
    },
  ],
  theme: defaultTheme,
};

export default function HomepageEditor() {
  const { toast } = useToast();
  const [sections, setSections] = useState<Section[]>([]);
  const [currentTab, setCurrentTab] = useState("sections");
  const [editingSectionIndex, setEditingSectionIndex] = useState<number | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [activeTheme, setActiveTheme] = useState<Theme>(defaultTheme);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Active section for preview or editing
  const activeSection = useMemo(() => {
    if (editingSectionIndex !== null && sections[editingSectionIndex]) {
      return sections[editingSectionIndex];
    }
    return null;
  }, [editingSectionIndex, sections]);

  // Load homepage data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setSections(MOCK_HOMEPAGE_DATA.sections);
      setActiveTheme(MOCK_HOMEPAGE_DATA.theme);
      setIsLoading(false);
    }, 800);
  }, []);

  // Apply theme to preview
  const applyThemeToPreview = (section: Section): Section => {
    return {
      ...section,
      backgroundColor: section.backgroundColor || activeTheme.colors.background,
      textColor: section.textColor || activeTheme.colors.foreground,
    };
  };

  // Save homepage data
  const saveHomepage = async () => {
    setIsSaving(true);
    
    // Simulate API call
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Homepage saved",
        description: "Your changes have been published.",
      });
    } catch (error) {
      toast({
        title: "Failed to save",
        description: "An error occurred while saving the homepage.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Handle section updates
  const handleSectionUpdate = (updatedSection: Section) => {
    if (editingSectionIndex !== null) {
      const newSections = [...sections];
      newSections[editingSectionIndex] = updatedSection;
      setSections(newSections);
      
      if (previewMode) {
        // Stay in preview mode
      } else {
        // Exit edit mode
        setEditingSectionIndex(null);
      }
    }
  };

  // Handle section edits
  const handleEditSection = (index: number) => {
    setEditingSectionIndex(index);
    setPreviewMode(false);
  };

  // Handle theme change
  const handleThemeChange = (theme: Theme) => {
    setActiveTheme(theme);
  };

  // Toggle preview mode
  const togglePreviewMode = () => {
    setPreviewMode(!previewMode);
  };

  // Handle preview
  const handlePreview = () => {
    // In a real app, this would navigate to the homepage with a preview param
    window.open("/", "_blank");
  };

  if (isLoading) {
    return (
      <div className="p-8 flex justify-center">
        <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // If we're editing a specific section
  if (editingSectionIndex !== null && sections[editingSectionIndex]) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={() => {
              setEditingSectionIndex(null);
              setPreviewMode(false);
            }}
          >
            Back to Sections
          </Button>
          <div className="flex items-center space-x-2">
            <Button
              variant={previewMode ? "default" : "outline"}
              onClick={togglePreviewMode}
            >
              {previewMode ? "Exit Preview" : "Preview Mode"}
            </Button>
            <Button onClick={handlePreview}>Open in New Tab</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Section Editor */}
          <div className={previewMode ? "hidden lg:block" : ""}>
            <SectionEditor
              section={sections[editingSectionIndex]}
              onSave={handleSectionUpdate}
              onCancel={() => {
                setEditingSectionIndex(null);
                setPreviewMode(false);
              }}
            />
          </div>
          
          {/* Live Preview */}
          {(previewMode || window.innerWidth >= 1024) && activeSection && (
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Live Preview</CardTitle>
                  <CardDescription>
                    How this section will appear on your site
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SectionPreview 
                    section={applyThemeToPreview(activeSection)}
                  />
                </CardContent>
              </Card>
              
              {previewMode && (
                <Button 
                  className="w-full"
                  onClick={() => {
                    setPreviewMode(false);
                  }}
                >
                  Return to Editing
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Homepage Editor</h2>
          <p className="text-muted-foreground">
            Customize your homepage layout and content.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handlePreview}>
            Preview
          </Button>
          <Button onClick={saveHomepage} disabled={isSaving}>
            {isSaving ? (
              <>
                <div className="h-4 w-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Publish Changes
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="sections" className="flex items-center">
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Sections
          </TabsTrigger>
          <TabsTrigger value="theme" className="flex items-center">
            <PaintBucket className="h-4 w-4 mr-2" />
            Theme
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="sections" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <SectionManager
                sections={sections}
                onSectionsChange={setSections}
                onEditSection={handleEditSection}
                availableSectionTypes={AVAILABLE_SECTION_TYPES}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="theme" className="space-y-4">
          <ThemeManager
            initialTheme={activeTheme}
            onThemeChange={handleThemeChange}
            onSaveTheme={(theme) => {
              setActiveTheme(theme);
              toast({
                title: "Theme updated",
                description: `Theme "${theme.name}" has been applied to your homepage.`,
              });
            }}
          />
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Homepage Analytics</CardTitle>
              <CardDescription>
                View performance metrics for your homepage sections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Section Performance */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Section Performance</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="py-3 px-2 text-left font-medium text-muted-foreground">Section</th>
                          <th className="py-3 px-2 text-right font-medium text-muted-foreground">Views</th>
                          <th className="py-3 px-2 text-right font-medium text-muted-foreground">Clicks</th>
                          <th className="py-3 px-2 text-right font-medium text-muted-foreground">CTR</th>
                        </tr>
                      </thead>
                      <tbody>
                        {MOCK_ANALYTICS_DATA.sectionViews.map((row) => (
                          <tr key={row.id} className="border-b">
                            <td className="py-3 px-2">{row.name}</td>
                            <td className="py-3 px-2 text-right">{row.views.toLocaleString()}</td>
                            <td className="py-3 px-2 text-right">{row.clicks.toLocaleString()}</td>
                            <td className="py-3 px-2 text-right">{row.ctr}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {/* Device Breakdown */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Device Breakdown</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(MOCK_ANALYTICS_DATA.performanceByDevice).map(([device, data]) => (
                      <Card key={device}>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <h4 className="text-lg font-medium capitalize">{device}</h4>
                            <div className="mt-2 grid grid-cols-3 gap-2 text-center">
                              <div>
                                <div className="text-2xl font-bold">{data.views.toLocaleString()}</div>
                                <div className="text-xs text-muted-foreground">Views</div>
                              </div>
                              <div>
                                <div className="text-2xl font-bold">{data.clicks.toLocaleString()}</div>
                                <div className="text-xs text-muted-foreground">Clicks</div>
                              </div>
                              <div>
                                <div className="text-2xl font-bold">{data.ctr}%</div>
                                <div className="text-xs text-muted-foreground">CTR</div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                {/* Conversion Stats */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Conversion Statistics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <div className="text-3xl font-bold">{MOCK_ANALYTICS_DATA.conversionData.signups}</div>
                          <div className="text-sm font-medium mt-1">New Signups</div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <div className="text-3xl font-bold">{MOCK_ANALYTICS_DATA.conversionData.purchases}</div>
                          <div className="text-sm font-medium mt-1">Purchases</div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <div className="text-3xl font-bold">{MOCK_ANALYTICS_DATA.conversionData.conversionRate}%</div>
                          <div className="text-sm font-medium mt-1">Conversion Rate</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div className="pt-2 text-center text-sm text-muted-foreground">
                  <p>This data is updated daily. Last updated: {new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 