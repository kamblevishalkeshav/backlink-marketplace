'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Form validation schema for site settings
const siteSettingsSchema = z.object({
  siteName: z.string().min(2, "Site name must be at least 2 characters"),
  siteUrl: z.string().url("Please enter a valid URL"),
  contactEmail: z.string().email("Please enter a valid email address"),
  enableRegistration: z.boolean().default(true),
  maintenanceMode: z.boolean().default(false),
});

// Form validation schema for API settings
const apiSettingsSchema = z.object({
  apiKey: z.string().min(10, "API key must be at least 10 characters"),
  secretKey: z.string().min(10, "Secret key must be at least 10 characters"),
  webhookUrl: z.string().url("Please enter a valid webhook URL").optional().or(z.literal("")),
  rateLimitEnabled: z.boolean().default(true),
  rateLimitRequests: z.number().int().min(1),
});

// Form validation schema for email settings
const emailSettingsSchema = z.object({
  smtpServer: z.string().min(2, "SMTP server is required"),
  smtpPort: z.number().int().min(1),
  smtpUsername: z.string().min(2, "SMTP username is required"),
  smtpPassword: z.string().min(1, "SMTP password is required"),
  defaultFromEmail: z.string().email("Please enter a valid email address"),
  emailFooter: z.string().optional(),
});

type SiteSettingsValues = z.infer<typeof siteSettingsSchema>;
type ApiSettingsValues = z.infer<typeof apiSettingsSchema>;
type EmailSettingsValues = z.infer<typeof emailSettingsSchema>;

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  // Site settings form
  const siteSettingsForm = useForm<SiteSettingsValues>({
    resolver: zodResolver(siteSettingsSchema),
    defaultValues: {
      siteName: "Backlink Marketplace",
      siteUrl: "https://backlink-marketplace.com",
      contactEmail: "support@backlink-marketplace.com",
      enableRegistration: true,
      maintenanceMode: false,
    },
  });

  // API settings form
  const apiSettingsForm = useForm<ApiSettingsValues>({
    resolver: zodResolver(apiSettingsSchema),
    defaultValues: {
      apiKey: "pk_12345678901234567890",
      secretKey: "sk_12345678901234567890",
      webhookUrl: "",
      rateLimitEnabled: true,
      rateLimitRequests: 100,
    },
  });

  // Email settings form
  const emailSettingsForm = useForm<EmailSettingsValues>({
    resolver: zodResolver(emailSettingsSchema),
    defaultValues: {
      smtpServer: "smtp.example.com",
      smtpPort: 587,
      smtpUsername: "smtp-user",
      smtpPassword: "********",
      defaultFromEmail: "noreply@backlink-marketplace.com",
      emailFooter: "© 2023 Backlink Marketplace. All rights reserved.",
    },
  });

  // Handle form submissions
  const onSubmitSiteSettings = async (values: SiteSettingsValues) => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Site Settings:", values);
      
      toast({
        title: "Settings saved",
        description: "Your site settings have been updated successfully.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "There was a problem saving your settings.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const onSubmitApiSettings = async (values: ApiSettingsValues) => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("API Settings:", values);
      
      toast({
        title: "Settings saved",
        description: "Your API settings have been updated successfully.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "There was a problem saving your settings.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const onSubmitEmailSettings = async (values: EmailSettingsValues) => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Email Settings:", values);
      
      toast({
        title: "Settings saved",
        description: "Your email settings have been updated successfully.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "There was a problem saving your settings.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-gray-500 mt-1">Configure your application settings</p>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Site Settings</CardTitle>
              <CardDescription>
                Configure general settings for your website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...siteSettingsForm}>
                <form 
                  onSubmit={siteSettingsForm.handleSubmit(onSubmitSiteSettings)} 
                  className="space-y-6"
                >
                  <FormField
                    control={siteSettingsForm.control}
                    name="siteName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Site Name</FormLabel>
                        <FormControl>
                          <Input placeholder="My Website" {...field} />
                        </FormControl>
                        <FormDescription>
                          The name of your website as it appears to users.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={siteSettingsForm.control}
                    name="siteUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com" {...field} />
                        </FormControl>
                        <FormDescription>
                          The main URL of your website.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={siteSettingsForm.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Email</FormLabel>
                        <FormControl>
                          <Input placeholder="contact@example.com" {...field} />
                        </FormControl>
                        <FormDescription>
                          The email address where users can contact you.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                    <FormField
                      control={siteSettingsForm.control}
                      name="enableRegistration"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Enable User Registration
                            </FormLabel>
                            <FormDescription>
                              Allow new users to register on your site.
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
                    
                    <FormField
                      control={siteSettingsForm.control}
                      name="maintenanceMode"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Maintenance Mode
                            </FormLabel>
                            <FormDescription>
                              Temporarily disable the site for maintenance.
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
                  </div>
                  
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
        
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Settings</CardTitle>
              <CardDescription>
                Configure API access and integration settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...apiSettingsForm}>
                <form 
                  onSubmit={apiSettingsForm.handleSubmit(onSubmitApiSettings)} 
                  className="space-y-6"
                >
                  <FormField
                    control={apiSettingsForm.control}
                    name="apiKey"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>API Key</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          Your public API key for client-side integrations.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={apiSettingsForm.control}
                    name="secretKey"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Secret Key</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormDescription>
                          Your secret API key for server-side integrations.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={apiSettingsForm.control}
                    name="webhookUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Webhook URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/webhook" {...field} />
                        </FormControl>
                        <FormDescription>
                          URL to receive webhook notifications (optional).
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={apiSettingsForm.control}
                    name="rateLimitEnabled"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Enable Rate Limiting
                          </FormLabel>
                          <FormDescription>
                            Limit the number of API requests per minute.
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
                  
                  <FormField
                    control={apiSettingsForm.control}
                    name="rateLimitRequests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rate Limit Requests</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormDescription>
                          Maximum number of requests per minute.
                        </FormDescription>
                        <FormMessage />
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
        
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
              <CardDescription>
                Configure email delivery settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...emailSettingsForm}>
                <form 
                  onSubmit={emailSettingsForm.handleSubmit(onSubmitEmailSettings)} 
                  className="space-y-6"
                >
                  <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                    <FormField
                      control={emailSettingsForm.control}
                      name="smtpServer"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SMTP Server</FormLabel>
                          <FormControl>
                            <Input placeholder="smtp.example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={emailSettingsForm.control}
                      name="smtpPort"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SMTP Port</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              {...field} 
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                    <FormField
                      control={emailSettingsForm.control}
                      name="smtpUsername"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SMTP Username</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={emailSettingsForm.control}
                      name="smtpPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SMTP Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={emailSettingsForm.control}
                    name="defaultFromEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>From Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="noreply@example.com" {...field} />
                        </FormControl>
                        <FormDescription>
                          Default email address for outgoing messages.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={emailSettingsForm.control}
                    name="emailFooter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Footer</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="© 2023 My Company. All rights reserved."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Text to include at the bottom of all outgoing emails.
                        </FormDescription>
                        <FormMessage />
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
        
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Configure the look and feel of your website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <p>Appearance settings coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 