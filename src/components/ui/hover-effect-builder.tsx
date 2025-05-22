"use client";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type HoverEffect = {
  transform?: string;
  filter?: string;
  boxShadow?: string;
  transition?: string;
  background?: string;
  color?: string;
  borderColor?: string;
};

const defaultHoverEffect: HoverEffect = {
  transform: "scale(1.05)",
  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  transition: "all 0.2s ease-in-out",
};

// Schema for the hover effect form
const hoverEffectSchema = z.object({
  // Transform
  useTransform: z.boolean().default(true),
  transformType: z.enum(["scale", "translate", "rotate", "skew", "none"]).default("scale"),
  transformValue: z.string().default("1.05"),
  
  // Shadow
  useBoxShadow: z.boolean().default(true),
  shadowType: z.enum(["subtle", "medium", "large", "glow", "sharp", "none"]).default("medium"),
  shadowColor: z.string().default("rgba(0, 0, 0, 0.1)"),
  
  // Transition
  transitionDuration: z.number().min(0).max(2).default(0.2),
  transitionTiming: z.enum(["ease", "ease-in", "ease-out", "ease-in-out", "linear"]).default("ease-in-out"),
  
  // Colors
  useBackgroundChange: z.boolean().default(false),
  backgroundColor: z.string().default(""),
  
  useColorChange: z.boolean().default(false),
  textColor: z.string().default(""),
  
  useBorderChange: z.boolean().default(false),
  borderColor: z.string().default(""),
  
  // Filter
  useFilter: z.boolean().default(false),
  filterType: z.enum(["blur", "brightness", "contrast", "grayscale", "sepia", "none"]).default("none"),
  filterValue: z.number().min(0).max(100).default(50),
});

type HoverEffectFormValues = z.infer<typeof hoverEffectSchema>;

interface HoverEffectBuilderProps {
  initialEffect?: HoverEffect;
  onChange: (effect: HoverEffect) => void;
  previewElement?: React.ReactNode;
  className?: string;
}

export function HoverEffectBuilder({
  initialEffect = defaultHoverEffect,
  onChange,
  previewElement,
  className
}: HoverEffectBuilderProps) {
  const [previewHover, setPreviewHover] = useState(false);
  
  // Parse initialEffect to form values
  const getInitialValues = (): HoverEffectFormValues => {
    const values: HoverEffectFormValues = {
      useTransform: Boolean(initialEffect.transform),
      transformType: "scale",
      transformValue: "1.05",
      
      useBoxShadow: Boolean(initialEffect.boxShadow),
      shadowType: "medium",
      shadowColor: "rgba(0, 0, 0, 0.1)",
      
      transitionDuration: 0.2,
      transitionTiming: "ease-in-out",
      
      useBackgroundChange: Boolean(initialEffect.background),
      backgroundColor: initialEffect.background || "",
      
      useColorChange: Boolean(initialEffect.color),
      textColor: initialEffect.color || "",
      
      useBorderChange: Boolean(initialEffect.borderColor),
      borderColor: initialEffect.borderColor || "",
      
      useFilter: Boolean(initialEffect.filter),
      filterType: "none",
      filterValue: 50,
    };
    
    // Parse transform
    if (initialEffect.transform) {
      if (initialEffect.transform.includes("scale")) {
        values.transformType = "scale";
        const match = initialEffect.transform.match(/scale\(([^)]+)\)/);
        if (match) values.transformValue = match[1];
      } else if (initialEffect.transform.includes("translate")) {
        values.transformType = "translate";
        const match = initialEffect.transform.match(/translate\(([^)]+)\)/);
        if (match) values.transformValue = match[1];
      } else if (initialEffect.transform.includes("rotate")) {
        values.transformType = "rotate";
        const match = initialEffect.transform.match(/rotate\(([^)]+)\)/);
        if (match) values.transformValue = match[1];
      } else if (initialEffect.transform.includes("skew")) {
        values.transformType = "skew";
        const match = initialEffect.transform.match(/skew\(([^)]+)\)/);
        if (match) values.transformValue = match[1];
      }
    }
    
    // Parse shadow
    if (initialEffect.boxShadow) {
      if (initialEffect.boxShadow.includes("rgba")) {
        const match = initialEffect.boxShadow.match(/rgba\([^)]+\)/);
        if (match) values.shadowColor = match[0];
      }
      
      if (initialEffect.boxShadow.includes("15px")) {
        values.shadowType = "large";
      } else if (initialEffect.boxShadow.includes("10px")) {
        values.shadowType = "medium";
      } else if (initialEffect.boxShadow.includes("glow")) {
        values.shadowType = "glow";
      } else if (initialEffect.boxShadow.includes("sharp")) {
        values.shadowType = "sharp";
      } else {
        values.shadowType = "subtle";
      }
    }
    
    // Parse transition
    if (initialEffect.transition) {
      const durationMatch = initialEffect.transition.match(/(\d+\.?\d*)s/);
      if (durationMatch) {
        values.transitionDuration = parseFloat(durationMatch[1]);
      }
      
      if (initialEffect.transition.includes("ease-in-out")) {
        values.transitionTiming = "ease-in-out";
      } else if (initialEffect.transition.includes("ease-in")) {
        values.transitionTiming = "ease-in";
      } else if (initialEffect.transition.includes("ease-out")) {
        values.transitionTiming = "ease-out";
      } else if (initialEffect.transition.includes("linear")) {
        values.transitionTiming = "linear";
      } else {
        values.transitionTiming = "ease";
      }
    }
    
    // Parse filter
    if (initialEffect.filter) {
      if (initialEffect.filter.includes("blur")) {
        values.filterType = "blur";
        const match = initialEffect.filter.match(/blur\(([^)]+)\)/);
        if (match) values.filterValue = parseInt(match[1]);
      } else if (initialEffect.filter.includes("brightness")) {
        values.filterType = "brightness";
        const match = initialEffect.filter.match(/brightness\(([^)]+)\)/);
        if (match) values.filterValue = parseInt(match[1]);
      } else if (initialEffect.filter.includes("contrast")) {
        values.filterType = "contrast";
        const match = initialEffect.filter.match(/contrast\(([^)]+)\)/);
        if (match) values.filterValue = parseInt(match[1]);
      } else if (initialEffect.filter.includes("grayscale")) {
        values.filterType = "grayscale";
        const match = initialEffect.filter.match(/grayscale\(([^)]+)\)/);
        if (match) values.filterValue = parseInt(match[1]);
      } else if (initialEffect.filter.includes("sepia")) {
        values.filterType = "sepia";
        const match = initialEffect.filter.match(/sepia\(([^)]+)\)/);
        if (match) values.filterValue = parseInt(match[1]);
      }
    }
    
    return values;
  };
  
  const form = useForm<HoverEffectFormValues>({
    resolver: zodResolver(hoverEffectSchema),
    defaultValues: getInitialValues(),
  });
  
  // Generate CSS based on form values
  const generateHoverCSS = (values: HoverEffectFormValues): HoverEffect => {
    const effect: HoverEffect = {
      transition: `all ${values.transitionDuration}s ${values.transitionTiming}`,
    };
    
    // Transform
    if (values.useTransform && values.transformType !== "none") {
      switch (values.transformType) {
        case "scale":
          effect.transform = `scale(${values.transformValue})`;
          break;
        case "translate":
          effect.transform = `translate(${values.transformValue})`;
          break;
        case "rotate":
          effect.transform = `rotate(${values.transformValue})`;
          break;
        case "skew":
          effect.transform = `skew(${values.transformValue})`;
          break;
      }
    }
    
    // Box Shadow
    if (values.useBoxShadow && values.shadowType !== "none") {
      switch (values.shadowType) {
        case "subtle":
          effect.boxShadow = `0 4px 6px -1px ${values.shadowColor}, 0 2px 4px -1px ${values.shadowColor}`;
          break;
        case "medium":
          effect.boxShadow = `0 10px 15px -3px ${values.shadowColor}, 0 4px 6px -2px ${values.shadowColor}`;
          break;
        case "large":
          effect.boxShadow = `0 20px 25px -5px ${values.shadowColor}, 0 10px 10px -5px ${values.shadowColor}`;
          break;
        case "glow":
          effect.boxShadow = `0 0 20px ${values.shadowColor}`;
          break;
        case "sharp":
          effect.boxShadow = `5px 5px 0px ${values.shadowColor}`;
          break;
      }
    }
    
    // Filter
    if (values.useFilter && values.filterType !== "none") {
      switch (values.filterType) {
        case "blur":
          effect.filter = `blur(${values.filterValue / 10}px)`;
          break;
        case "brightness":
          effect.filter = `brightness(${values.filterValue + 50}%)`;
          break;
        case "contrast":
          effect.filter = `contrast(${values.filterValue + 50}%)`;
          break;
        case "grayscale":
          effect.filter = `grayscale(${values.filterValue}%)`;
          break;
        case "sepia":
          effect.filter = `sepia(${values.filterValue}%)`;
          break;
      }
    }
    
    // Colors
    if (values.useBackgroundChange && values.backgroundColor) {
      effect.background = values.backgroundColor;
    }
    
    if (values.useColorChange && values.textColor) {
      effect.color = values.textColor;
    }
    
    if (values.useBorderChange && values.borderColor) {
      effect.borderColor = values.borderColor;
    }
    
    return effect;
  };
  
  // Watch for form changes
  const watchedValues = form.watch();
  const currentEffect = generateHoverCSS(watchedValues);
  
  // Update parent component when form changes
  const handleFormChange = () => {
    onChange(currentEffect);
  };
  
  // Initial effect update
  useState(() => {
    handleFormChange();
  });
  
  return (
    <div className={cn("space-y-6", className)}>
      {/* Preview */}
      {previewElement && (
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Preview:</h3>
          <div 
            className="flex justify-center items-center p-6 border border-dashed rounded-md"
            onMouseEnter={() => setPreviewHover(true)}
            onMouseLeave={() => setPreviewHover(false)}
          >
            <div
              style={previewHover ? currentEffect : undefined}
              className="transition-all"
            >
              {previewElement}
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Hover over the element to see the effect
          </p>
        </div>
      )}
      
      <Form {...form}>
        <form onChange={handleFormChange} className="space-y-4">
          {/* Transform Effects */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Transform Effects</h3>
              <FormField
                control={form.control}
                name="useTransform"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="rounded border-gray-300"
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal m-0">Enable</FormLabel>
                  </FormItem>
                )}
              />
            </div>
            
            {watchedValues.useTransform && (
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="transformType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select transform" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="scale">Scale</SelectItem>
                          <SelectItem value="translate">Translate</SelectItem>
                          <SelectItem value="rotate">Rotate</SelectItem>
                          <SelectItem value="skew">Skew</SelectItem>
                          <SelectItem value="none">None</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                
                {watchedValues.transformType !== "none" && (
                  <FormField
                    control={form.control}
                    name="transformValue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Value</FormLabel>
                        <FormControl>
                          <Input 
                            {...field}
                            placeholder={
                              watchedValues.transformType === "scale" ? "1.05" :
                              watchedValues.transformType === "translate" ? "0px, -10px" : 
                              watchedValues.transformType === "rotate" ? "5deg" : 
                              "5deg, 5deg"
                            }
                          />
                        </FormControl>
                        <FormDescription className="text-xs">
                          {watchedValues.transformType === "scale" ? "Scale factor (e.g., 1.1)" :
                          watchedValues.transformType === "translate" ? "X and Y values (e.g., 0px, -10px)" :
                          watchedValues.transformType === "rotate" ? "Angle in degrees (e.g., 5deg)" :
                          "X and Y skew angles (e.g., 5deg, 5deg)"}
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                )}
              </div>
            )}
          </div>
          
          {/* Shadow Effects */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Shadow Effects</h3>
              <FormField
                control={form.control}
                name="useBoxShadow"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="rounded border-gray-300"
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal m-0">Enable</FormLabel>
                  </FormItem>
                )}
              />
            </div>
            
            {watchedValues.useBoxShadow && (
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="shadowType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select shadow" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="subtle">Subtle</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                          <SelectItem value="glow">Glow</SelectItem>
                          <SelectItem value="sharp">Sharp</SelectItem>
                          <SelectItem value="none">None</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                
                {watchedValues.shadowType !== "none" && (
                  <FormField
                    control={form.control}
                    name="shadowColor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Color</FormLabel>
                        <div className="flex space-x-2">
                          <FormControl>
                            <div className="flex-1 flex">
                              <input
                                type="color"
                                value={field.value.startsWith("rgba") ? "#000000" : field.value}
                                onChange={(e) => {
                                  // Convert hex to rgba with opacity
                                  const hex = e.target.value;
                                  field.onChange(hex);
                                }}
                                className="w-10 h-9 p-1 border rounded-l"
                              />
                              <Input
                                value={field.value}
                                onChange={field.onChange}
                                className="rounded-l-none flex-1"
                                placeholder="rgba(0,0,0,0.1)"
                              />
                            </div>
                          </FormControl>
                        </div>
                      </FormItem>
                    )}
                  />
                )}
              </div>
            )}
          </div>
          
          {/* Transition */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Transition</h3>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="transitionDuration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration: {field.value}s</FormLabel>
                    <FormControl>
                      <Slider
                        value={[field.value]}
                        min={0}
                        max={2}
                        step={0.1}
                        onValueChange={(values: number[]) => field.onChange(values[0])}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="transitionTiming"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Timing Function</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select timing" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ease">Ease</SelectItem>
                        <SelectItem value="ease-in">Ease In</SelectItem>
                        <SelectItem value="ease-out">Ease Out</SelectItem>
                        <SelectItem value="ease-in-out">Ease In Out</SelectItem>
                        <SelectItem value="linear">Linear</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          {/* Color Effects */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Color Effects</h3>
            
            {/* Background Color */}
            <div className="flex items-center space-x-4">
              <FormField
                control={form.control}
                name="useBackgroundChange"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="rounded border-gray-300"
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal m-0">Change Background</FormLabel>
                  </FormItem>
                )}
              />
              
              {watchedValues.useBackgroundChange && (
                <FormField
                  control={form.control}
                  name="backgroundColor"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <div className="flex space-x-2">
                        <input
                          type="color"
                          value={field.value || "#ffffff"}
                          onChange={(e) => field.onChange(e.target.value)}
                          className="w-9 h-9 p-1 border rounded"
                        />
                        <Input
                          {...field}
                          placeholder="#ffffff or rgba(255,255,255,1)"
                          className="flex-1"
                        />
                      </div>
                    </FormItem>
                  )}
                />
              )}
            </div>
            
            {/* Text Color */}
            <div className="flex items-center space-x-4">
              <FormField
                control={form.control}
                name="useColorChange"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="rounded border-gray-300"
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal m-0">Change Text Color</FormLabel>
                  </FormItem>
                )}
              />
              
              {watchedValues.useColorChange && (
                <FormField
                  control={form.control}
                  name="textColor"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <div className="flex space-x-2">
                        <input
                          type="color"
                          value={field.value || "#000000"}
                          onChange={(e) => field.onChange(e.target.value)}
                          className="w-9 h-9 p-1 border rounded"
                        />
                        <Input
                          {...field}
                          placeholder="#000000"
                          className="flex-1"
                        />
                      </div>
                    </FormItem>
                  )}
                />
              )}
            </div>
            
            {/* Border Color */}
            <div className="flex items-center space-x-4">
              <FormField
                control={form.control}
                name="useBorderChange"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="rounded border-gray-300"
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal m-0">Change Border Color</FormLabel>
                  </FormItem>
                )}
              />
              
              {watchedValues.useBorderChange && (
                <FormField
                  control={form.control}
                  name="borderColor"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <div className="flex space-x-2">
                        <input
                          type="color"
                          value={field.value || "#000000"}
                          onChange={(e) => field.onChange(e.target.value)}
                          className="w-9 h-9 p-1 border rounded"
                        />
                        <Input
                          {...field}
                          placeholder="#000000"
                          className="flex-1"
                        />
                      </div>
                    </FormItem>
                  )}
                />
              )}
            </div>
          </div>
          
          {/* Filter Effects */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Filter Effects</h3>
              <FormField
                control={form.control}
                name="useFilter"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="rounded border-gray-300"
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal m-0">Enable</FormLabel>
                  </FormItem>
                )}
              />
            </div>
            
            {watchedValues.useFilter && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="filterType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Filter Type</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select filter" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="blur">Blur</SelectItem>
                          <SelectItem value="brightness">Brightness</SelectItem>
                          <SelectItem value="contrast">Contrast</SelectItem>
                          <SelectItem value="grayscale">Grayscale</SelectItem>
                          <SelectItem value="sepia">Sepia</SelectItem>
                          <SelectItem value="none">None</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                
                {watchedValues.filterType !== "none" && (
                  <FormField
                    control={form.control}
                    name="filterValue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {watchedValues.filterType === "blur" ? "Blur Amount:" :
                          watchedValues.filterType === "brightness" ? "Brightness:" :
                          watchedValues.filterType === "contrast" ? "Contrast:" :
                          watchedValues.filterType === "grayscale" ? "Grayscale Amount:" :
                          "Sepia Amount:"} {field.value}%
                        </FormLabel>
                        <FormControl>
                          <Slider
                            value={[field.value]}
                            min={0}
                            max={100}
                            step={1}
                            onValueChange={(values: number[]) => field.onChange(values[0])}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}
              </div>
            )}
          </div>
          
          {/* CSS Output */}
          <div className="pt-4">
            <h3 className="text-sm font-semibold mb-2">Generated CSS:</h3>
            <pre className="bg-muted/50 p-3 rounded-md text-xs font-mono overflow-auto max-h-60">
              {`/* Hover effect CSS */\n${
                Object.entries(currentEffect)
                  .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`)
                  .join('\n')
              }`}
            </pre>
          </div>
        </form>
      </Form>
    </div>
  );
} 