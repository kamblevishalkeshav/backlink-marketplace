"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MediaUpload } from "@/components/ui/media-upload";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { Section } from "@/components/ui/section-manager";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Base schema for all section types
const baseSectionSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Section name is required"),
  type: z.string(),
  backgroundColor: z.string().optional(),
  textColor: z.string().optional(),
  isVisible: z.boolean().default(true),
});

// Schema for hero section
const heroSectionSchema = baseSectionSchema.extend({
  heading: z.string().min(1, "Heading is required"),
  subheading: z.string().optional(),
  ctaText: z.string().optional(),
  ctaLink: z.string().optional(),
  backgroundImage: z.string().optional(),
});

// Schema for features section
const featuresSectionSchema = baseSectionSchema.extend({
  heading: z.string().min(1, "Heading is required"),
  subheading: z.string().optional(),
  features: z.array(
    z.object({
      id: z.string(),
      title: z.string().min(1, "Feature title is required"),
      description: z.string().optional(),
      iconName: z.string().optional(),
      imageUrl: z.string().optional(),
    })
  ).optional(),
});

// Schema for testimonials section
const testimonialsSectionSchema = baseSectionSchema.extend({
  heading: z.string().min(1, "Heading is required"),
  subheading: z.string().optional(),
  testimonials: z.array(
    z.object({
      id: z.string(),
      quote: z.string().min(1, "Quote is required"),
      author: z.string().min(1, "Author name is required"),
      role: z.string().optional(),
      company: z.string().optional(),
      avatarUrl: z.string().optional(),
    })
  ).optional(),
});

// Schema for text section
const textSectionSchema = baseSectionSchema.extend({
  title: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  alignment: z.enum(["left", "center", "right"]).default("left"),
});

// Schema for CTA section
const ctaSectionSchema = baseSectionSchema.extend({
  heading: z.string().min(1, "Heading is required"),
  subheading: z.string().optional(),
  ctaText: z.string().min(1, "Button text is required"),
  ctaLink: z.string().min(1, "Button link is required"),
  backgroundImage: z.string().optional(),
});

// Schema for image section
const imageSectionSchema = baseSectionSchema.extend({
  title: z.string().optional(),
  imageUrl: z.string().min(1, "Image is required"),
  caption: z.string().optional(),
  altText: z.string().optional(),
});

// Schema for pricing table section
const pricingSectionSchema = baseSectionSchema.extend({
  heading: z.string().min(1, "Heading is required"),
  subheading: z.string().optional(),
  plans: z.array(
    z.object({
      id: z.string(),
      name: z.string().min(1, "Plan name is required"),
      price: z.string().min(1, "Price is required"),
      interval: z.string().optional(),
      description: z.string().optional(),
      features: z.array(z.string()).min(1, "At least one feature is required"),
      ctaText: z.string().optional(),
      ctaLink: z.string().optional(),
      isPopular: z.boolean().default(false),
      accentColor: z.string().optional(),
    })
  ).min(1, "At least one plan is required"),
  layout: z.enum(["horizontal", "vertical"]).default("horizontal"),
});

// Union schema for all section types
const sectionSchema = z.discriminatedUnion("type", [
  heroSectionSchema.extend({ type: z.literal("HERO") }),
  featuresSectionSchema.extend({ type: z.literal("FEATURES") }),
  testimonialsSectionSchema.extend({ type: z.literal("TESTIMONIALS") }),
  textSectionSchema.extend({ type: z.literal("TEXT") }),
  ctaSectionSchema.extend({ type: z.literal("CTA") }),
  imageSectionSchema.extend({ type: z.literal("IMAGE") }),
  pricingSectionSchema.extend({ type: z.literal("PRICING") }),
]);

type SectionFormValues = z.infer<typeof sectionSchema>;

interface SectionEditorProps {
  section: Section;
  onSave: (section: Section) => void;
  onCancel?: () => void;
}

export function SectionEditor({ section, onSave, onCancel }: SectionEditorProps) {
  // Transform section data to form values format
  const getDefaultValues = () => {
    const baseValues = {
      id: section.id,
      name: section.name,
      type: section.type,
      backgroundColor: section.backgroundColor || "#ffffff",
      textColor: section.textColor || "#000000",
      isVisible: section.isVisible ?? true,
    };

    // Extract content properties based on section type
    const content = section.content || {};

    switch (section.type) {
      case "HERO":
        return {
          ...baseValues,
          heading: content.heading || "",
          subheading: content.subheading || "",
          ctaText: content.ctaText || "",
          ctaLink: content.ctaLink || "",
          backgroundImage: content.backgroundImage || "",
        };
      case "FEATURES":
        return {
          ...baseValues,
          heading: content.heading || "",
          subheading: content.subheading || "",
          features: content.features || [],
        };
      case "TESTIMONIALS":
        return {
          ...baseValues,
          heading: content.heading || "",
          subheading: content.subheading || "",
          testimonials: content.testimonials || [],
        };
      case "TEXT":
        return {
          ...baseValues,
          title: content.title || "",
          content: content.text || "",
          alignment: content.alignment || "left",
        };
      case "CTA":
        return {
          ...baseValues,
          heading: content.heading || "",
          subheading: content.subheading || "",
          ctaText: content.ctaText || "",
          ctaLink: content.ctaLink || "",
          backgroundImage: content.backgroundImage || "",
        };
      case "IMAGE":
        return {
          ...baseValues,
          title: content.title || "",
          imageUrl: content.imageUrl || "",
          caption: content.caption || "",
          altText: content.altText || "",
        };
      case "PRICING":
        return {
          ...baseValues,
          heading: content.heading || "",
          subheading: content.subheading || "",
          plans: content.plans || [
            {
              id: `plan-${Date.now()}`,
              name: "Basic Plan",
              price: "$19",
              interval: "/month",
              description: "Perfect for starters",
              features: ["Feature 1", "Feature 2"],
              ctaText: "Get Started",
              ctaLink: "/register",
              isPopular: false,
              accentColor: "#3b82f6",
            },
          ],
          layout: content.layout || "horizontal",
        };
      default:
        return baseValues;
    }
  };

  // Initialize form with dynamic schema based on section type
  const form = useForm<SectionFormValues>({
    resolver: zodResolver(sectionSchema),
    defaultValues: getDefaultValues(),
  });

  // Handle form submission
  const onSubmit = (values: SectionFormValues) => {
    // Transform form values back to section format
    const updatedSection: Section = {
      id: values.id,
      name: values.name,
      type: values.type,
      backgroundColor: values.backgroundColor,
      textColor: values.textColor,
      isVisible: values.isVisible,
    };

    // Extract content properties based on section type
    switch (values.type) {
      case "HERO":
        updatedSection.content = {
          heading: values.heading,
          subheading: values.subheading,
          ctaText: values.ctaText,
          ctaLink: values.ctaLink,
          backgroundImage: values.backgroundImage,
        };
        break;
      case "FEATURES":
        updatedSection.content = {
          heading: values.heading,
          subheading: values.subheading,
          features: values.features,
        };
        break;
      case "TESTIMONIALS":
        updatedSection.content = {
          heading: values.heading,
          subheading: values.subheading,
          testimonials: values.testimonials,
        };
        break;
      case "TEXT":
        updatedSection.content = {
          title: values.title,
          text: values.content,
          alignment: values.alignment,
        };
        break;
      case "CTA":
        updatedSection.content = {
          heading: values.heading,
          subheading: values.subheading,
          ctaText: values.ctaText,
          ctaLink: values.ctaLink,
          backgroundImage: values.backgroundImage,
        };
        break;
      case "IMAGE":
        updatedSection.content = {
          title: values.title,
          imageUrl: values.imageUrl,
          caption: values.caption,
          altText: values.altText,
        };
        break;
      case "PRICING":
        updatedSection.content = {
          heading: values.heading,
          subheading: values.subheading,
          plans: values.plans,
          layout: values.layout,
        };
        break;
    }

    onSave(updatedSection);
  };

  // Render section-specific fields
  const renderSectionFields = () => {
    const sectionType = section.type;

    switch (sectionType) {
      case "HERO":
        return (
          <>
            <FormField
              control={form.control}
              name="heading"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Heading</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subheading"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subheading</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      value={field.value || ""}
                      onChange={field.onChange}
                      placeholder="Enter subheading text..."
                      minHeight="100px"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="ctaText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Button Text</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ctaLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Button Link</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="backgroundImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Background Image</FormLabel>
                  <FormControl>
                    <MediaUpload
                      value={field.value}
                      onChange={field.onChange}
                      aspectRatio={16/9}
                    />
                  </FormControl>
                  <FormDescription>
                    Recommended size: 1920x1080px, max 2MB
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );

      case "TEXT":
        return (
          <>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      value={field.value || ""}
                      onChange={field.onChange}
                      placeholder="Enter section content..."
                      minHeight="200px"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="alignment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Text Alignment</FormLabel>
                  <Select 
                    value={field.value} 
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select alignment" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );

      case "IMAGE":
        return (
          <>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <MediaUpload
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="caption"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Caption (Optional)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="altText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alt Text</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Description for screen readers
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        );

      case "CTA":
        return (
          <>
            <FormField
              control={form.control}
              name="heading"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Heading</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subheading"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subheading</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      value={field.value || ""}
                      onChange={field.onChange}
                      placeholder="Enter subheading text..."
                      minHeight="100px"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="ctaText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Button Text</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ctaLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Button Link</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="backgroundImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Background Image</FormLabel>
                  <FormControl>
                    <MediaUpload
                      value={field.value}
                      onChange={field.onChange}
                      aspectRatio={16/5}
                    />
                  </FormControl>
                  <FormDescription>
                    Recommended wide banner format, max 2MB
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );

      case "PRICING":
        return (
          <>
            <FormField
              control={form.control}
              name="heading"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Heading</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subheading"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subheading</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      value={field.value || ""}
                      onChange={field.onChange}
                      placeholder="Enter subheading text..."
                      minHeight="100px"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="layout"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Layout</FormLabel>
                  <Select 
                    value={field.value} 
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select layout" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="horizontal">Horizontal</SelectItem>
                      <SelectItem value="vertical">Vertical</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    How the pricing plans should be displayed
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-medium">Pricing Plans</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const plans = form.getValues("plans") || [];
                    form.setValue("plans", [
                      ...plans,
                      {
                        id: `plan-${Date.now()}`,
                        name: "New Plan",
                        price: "$29",
                        interval: "/month",
                        description: "Plan description",
                        features: ["Feature 1", "Feature 2"],
                        ctaText: "Get Started",
                        ctaLink: "/register",
                        isPopular: false,
                        accentColor: "#3b82f6",
                      },
                    ]);
                  }}
                >
                  Add Plan
                </Button>
              </div>
              
              <div className="space-y-4">
                {form.watch("plans")?.map((plan, index) => (
                  <Card key={plan.id} className="p-4">
                    <div className="flex justify-between mb-4">
                      <h4 className="font-medium">Plan {index + 1}</h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-destructive"
                        onClick={() => {
                          const plans = [...(form.getValues("plans") || [])];
                          if (plans.length > 1) {
                            plans.splice(index, 1);
                            form.setValue("plans", plans);
                          }
                        }}
                        disabled={form.watch("plans")?.length === 1}
                      >
                        Remove
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`plans.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Plan Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-2">
                        <FormField
                          control={form.control}
                          name={`plans.${index}.price`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Price</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name={`plans.${index}.interval`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Interval</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="/month" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <FormField
                      control={form.control}
                      name={`plans.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name={`plans.${index}.isPopular`}
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2 mt-4">
                          <FormControl>
                            <input
                              type="checkbox"
                              checked={field.value}
                              onChange={field.onChange}
                              className="rounded border-gray-300"
                            />
                          </FormControl>
                          <FormLabel className="mt-0">Mark as popular</FormLabel>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name={`plans.${index}.accentColor`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Accent Color</FormLabel>
                          <div className="flex">
                            <FormControl>
                              <div className="flex w-full">
                                <Input
                                  type="color"
                                  className="w-12 p-1 h-10"
                                  value={field.value || "#3b82f6"}
                                  onChange={field.onChange}
                                />
                                <Input
                                  className="flex-1 rounded-l-none"
                                  value={field.value || "#3b82f6"}
                                  onChange={field.onChange}
                                />
                              </div>
                            </FormControl>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name={`plans.${index}.features`}
                      render={({ field }) => (
                        <FormItem className="mt-4">
                          <FormLabel>Features</FormLabel>
                          <div className="space-y-2">
                            {field.value.map((feature, featureIndex) => (
                              <div key={featureIndex} className="flex gap-2">
                                <Input
                                  value={feature}
                                  onChange={(e) => {
                                    const newFeatures = [...field.value];
                                    newFeatures[featureIndex] = e.target.value;
                                    field.onChange(newFeatures);
                                  }}
                                  className="flex-1"
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    const newFeatures = [...field.value];
                                    newFeatures.splice(featureIndex, 1);
                                    field.onChange(newFeatures);
                                  }}
                                  disabled={field.value.length <= 1}
                                >
                                  Remove
                                </Button>
                              </div>
                            ))}
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                field.onChange([...field.value, "New Feature"]);
                              }}
                            >
                              Add Feature
                            </Button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <FormField
                        control={form.control}
                        name={`plans.${index}.ctaText`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Button Text</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name={`plans.${index}.ctaLink`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Button Link</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </>
        );

      // For other section types, provide placeholders
      default:
        return (
          <div className="p-6 border border-dashed rounded-md text-center">
            <p>Editor for {sectionType} section type coming soon</p>
            <p className="text-sm text-muted-foreground mt-1">
              Basic section properties can still be edited
            </p>
          </div>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit {section.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Common section fields */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Internal name for this section (not displayed on the website)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="backgroundColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Background Color</FormLabel>
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <div className="flex w-full">
                          <Input
                            type="color"
                            className="w-12 p-1 h-10"
                            value={field.value || "#ffffff"}
                            onChange={field.onChange}
                          />
                          <Input
                            className="flex-1 rounded-l-none"
                            value={field.value || "#ffffff"}
                            onChange={field.onChange}
                          />
                        </div>
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="textColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Text Color</FormLabel>
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <div className="flex w-full">
                          <Input
                            type="color"
                            className="w-12 p-1 h-10"
                            value={field.value || "#000000"}
                            onChange={field.onChange}
                          />
                          <Input
                            className="flex-1 rounded-l-none"
                            value={field.value || "#000000"}
                            onChange={field.onChange}
                          />
                        </div>
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <hr className="my-6" />

            {/* Section-specific fields */}
            {renderSectionFields()}

            <div className="flex justify-end space-x-2 pt-4">
              {onCancel && (
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
              )}
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
} 