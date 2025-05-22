"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";
import { useCallback, useState } from "react";

export type GradientStop = {
  color: string;
  position: number;
};

export type GradientType = "linear" | "radial";

export type GradientDirection = 
  | "to top" 
  | "to right" 
  | "to bottom" 
  | "to left" 
  | "to top right" 
  | "to bottom right" 
  | "to bottom left" 
  | "to top left";

export type GradientValue = {
  type: GradientType;
  direction: GradientDirection;
  stops: GradientStop[];
};

const DEFAULT_LINEAR_GRADIENT: GradientValue = {
  type: "linear",
  direction: "to right",
  stops: [
    { color: "#ffffff", position: 0 },
    { color: "#000000", position: 100 }
  ]
};

const GRADIENT_DIRECTIONS: { label: string; value: GradientDirection }[] = [
  { label: "↑", value: "to top" },
  { label: "↗", value: "to top right" },
  { label: "→", value: "to right" },
  { label: "↘", value: "to bottom right" },
  { label: "↓", value: "to bottom" },
  { label: "↙", value: "to bottom left" },
  { label: "←", value: "to left" },
  { label: "↖", value: "to top left" }
];

interface GradientPickerProps {
  value?: GradientValue | string;
  onChange: (value: GradientValue | string) => void;
  enableSolidColor?: boolean;
  className?: string;
}

export function GradientPicker({
  value,
  onChange,
  enableSolidColor = true,
  className
}: GradientPickerProps) {
  // Parse initial value
  const initialValue = parseInitialValue(value);
  
  const [gradientType, setGradientType] = useState<"solid" | GradientType>(
    typeof initialValue === "string" ? "solid" : initialValue.type
  );
  const [direction, setDirection] = useState<GradientDirection>(
    typeof initialValue === "string" ? "to right" : initialValue.direction
  );
  const [stops, setStops] = useState<GradientStop[]>(
    typeof initialValue === "string" 
      ? [{ color: initialValue, position: 0 }] 
      : initialValue.stops
  );
  const [solidColor, setSolidColor] = useState<string>(
    typeof initialValue === "string" ? initialValue : "#ffffff"
  );

  // Parse the initial value which could be a string or GradientValue
  function parseInitialValue(value: GradientValue | string | undefined): GradientValue | string {
    if (!value) {
      return DEFAULT_LINEAR_GRADIENT;
    }
    
    if (typeof value === "string") {
      // Check if it's a gradient string
      if (value.includes("gradient")) {
        try {
          // Very basic parsing - in a real app, use a proper CSS parser
          const isRadial = value.includes("radial-gradient");
          const type: GradientType = isRadial ? "radial" : "linear";
          
          let direction: GradientDirection = "to right";
          const directionMatch = value.match(/to\s+(?:top|right|bottom|left)(?:\s+(?:right|left))?/);
          if (directionMatch) {
            direction = directionMatch[0] as GradientDirection;
          }
          
          const stops: GradientStop[] = [];
          const stopMatches = value.matchAll(/(#[0-9a-f]{3,8}|rgba?\([^)]+\))\s+(\d+)%/gi);
          Array.from(stopMatches).forEach((match) => {
            stops.push({
              color: match[1],
              position: parseInt(match[2], 10)
            });
          });
          
          return { type, direction, stops: stops.length ? stops : DEFAULT_LINEAR_GRADIENT.stops };
        } catch (e) {
          // If parsing fails, default to solid color
          return "#ffffff";
        }
      }
      return value; // Solid color
    }
    
    return value; // Already a GradientValue
  }

  // Generate CSS for gradient
  const generateGradientCSS = useCallback(() => {
    if (gradientType === "solid") {
      return solidColor;
    }
    
    const sortedStops = [...stops].sort((a, b) => a.position - b.position);
    const stopsCSS = sortedStops.map(stop => `${stop.color} ${stop.position}%`).join(", ");
    
    if (gradientType === "linear") {
      return `linear-gradient(${direction}, ${stopsCSS})`;
    } else {
      return `radial-gradient(circle at center, ${stopsCSS})`;
    }
  }, [gradientType, stops, direction, solidColor]);

  // Handle changes and call parent onChange
  const handleChange = useCallback(() => {
    if (gradientType === "solid") {
      onChange(solidColor);
    } else {
      onChange({
        type: gradientType as GradientType,
        direction,
        stops: [...stops]
      });
    }
  }, [gradientType, direction, stops, solidColor, onChange]);

  // Add a stop
  const addStop = () => {
    if (stops.length >= 5) return; // Limit to 5 stops
    
    // Calculate a position between existing stops
    let position = 50;
    if (stops.length >= 2) {
      const sortedStops = [...stops].sort((a, b) => a.position - b.position);
      const lastPos = sortedStops[sortedStops.length - 1].position;
      const firstPos = sortedStops[0].position;
      position = firstPos + (lastPos - firstPos) / 2;
    }
    
    const newStops = [...stops, { color: "#7c3aed", position }];
    setStops(newStops);
    
    if (gradientType !== "solid") {
      onChange({
        type: gradientType as GradientType,
        direction,
        stops: newStops
      });
    }
  };

  // Remove a stop
  const removeStop = (index: number) => {
    if (stops.length <= 2) return; // Maintain at least 2 stops
    
    const newStops = stops.filter((_, i) => i !== index);
    setStops(newStops);
    
    if (gradientType !== "solid") {
      onChange({
        type: gradientType as GradientType,
        direction,
        stops: newStops
      });
    }
  };

  // Update a stop
  const updateStop = (index: number, update: Partial<GradientStop>) => {
    const newStops = stops.map((stop, i) => 
      i === index ? { ...stop, ...update } : stop
    );
    setStops(newStops);
    
    if (gradientType !== "solid") {
      onChange({
        type: gradientType as GradientType,
        direction,
        stops: newStops
      });
    }
  };

  // Change type between solid and gradient
  const changeType = (type: "solid" | GradientType) => {
    setGradientType(type);
    if (type === "solid") {
      onChange(solidColor);
    } else {
      onChange({
        type,
        direction,
        stops
      });
    }
  };

  // Change gradient direction
  const changeDirection = (newDirection: GradientDirection) => {
    setDirection(newDirection);
    
    if (gradientType !== "solid") {
      onChange({
        type: gradientType as GradientType,
        direction: newDirection,
        stops
      });
    }
  };

  // Change solid color
  const changeSolidColor = (color: string) => {
    setSolidColor(color);
    if (gradientType === "solid") {
      onChange(color);
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      {/* Preview */}
      <div 
        className="w-full h-12 rounded-md border"
        style={{ background: generateGradientCSS() }}
      />
      
      {/* Type selector */}
      <div className="flex space-x-2">
        {enableSolidColor && (
          <Button 
            type="button"
            size="sm"
            variant={gradientType === "solid" ? "default" : "outline"}
            onClick={() => changeType("solid")}
            className="flex-1"
          >
            Solid
          </Button>
        )}
        <Button 
          type="button"
          size="sm"
          variant={gradientType === "linear" ? "default" : "outline"}
          onClick={() => changeType("linear")}
          className="flex-1"
        >
          Linear
        </Button>
        <Button 
          type="button"
          size="sm"
          variant={gradientType === "radial" ? "default" : "outline"}
          onClick={() => changeType("radial")}
          className="flex-1"
        >
          Radial
        </Button>
      </div>
      
      {/* Solid color picker */}
      {gradientType === "solid" && (
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium">Color:</label>
          <div className="flex-1 flex items-center space-x-2">
            <input
              type="color"
              value={solidColor}
              onChange={(e) => changeSolidColor(e.target.value)}
              className="w-8 h-8 p-0 border rounded cursor-pointer"
            />
            <input
              type="text"
              value={solidColor}
              onChange={(e) => changeSolidColor(e.target.value)}
              className="flex-1 h-8 px-2 py-1 text-sm border rounded"
              placeholder="#ffffff or rgba(255,255,255,1)"
            />
          </div>
        </div>
      )}
      
      {/* Gradient direction - only show for linear gradients */}
      {gradientType === "linear" && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Direction:</label>
          <div className="grid grid-cols-4 gap-1">
            {GRADIENT_DIRECTIONS.map((dir) => (
              <Button
                key={dir.value}
                type="button"
                size="sm"
                variant={direction === dir.value ? "default" : "outline"}
                onClick={() => changeDirection(dir.value)}
                className="h-8 w-full"
              >
                {dir.label}
              </Button>
            ))}
          </div>
        </div>
      )}
      
      {/* Gradient stops */}
      {gradientType !== "solid" && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Color Stops:</label>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={addStop}
              disabled={stops.length >= 5}
            >
              Add Stop
            </Button>
          </div>
          
          <div className="space-y-2">
            {stops.map((stop, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="color"
                  value={stop.color}
                  onChange={(e) => updateStop(index, { color: e.target.value })}
                  className="w-8 h-8 p-0 border rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={stop.color}
                  onChange={(e) => updateStop(index, { color: e.target.value })}
                  className="w-24 h-8 px-2 py-1 text-sm border rounded"
                  placeholder="#RRGGBB"
                />
                <div className="flex-1">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={stop.position}
                    onChange={(e) => updateStop(index, { position: parseInt(e.target.value, 10) })}
                    className="w-full h-8"
                  />
                </div>
                <div className="w-10 text-center text-sm">
                  {stop.position}%
                </div>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => removeStop(index)}
                  disabled={stops.length <= 2}
                  className="h-8 w-8"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Output CSS */}
      <div className="pt-2">
        <div className="text-sm font-medium mb-1">CSS Value:</div>
        <div className="bg-muted/50 p-2 rounded text-sm font-mono overflow-auto">
          {generateGradientCSS()}
        </div>
      </div>
    </div>
  );
} 