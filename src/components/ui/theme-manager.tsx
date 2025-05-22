"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { PlusCircle, Save } from "lucide-react";
import { useEffect, useState } from "react";

// Define the theme interface
export interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
    mutedForeground: string;
    border: string;
  };
}

// Default theme
export const defaultTheme: Theme = {
  id: "default",
  name: "Default Theme",
  colors: {
    primary: "#3b82f6",
    secondary: "#10b981",
    accent: "#8b5cf6",
    background: "#ffffff",
    foreground: "#18181b",
    muted: "#f3f4f6",
    mutedForeground: "#71717a",
    border: "#e5e7eb",
  },
};

interface ThemeManagerProps {
  initialTheme?: Theme;
  themes?: Theme[];
  onThemeChange?: (theme: Theme) => void;
  onSaveTheme?: (theme: Theme) => void;
  className?: string;
}

export function ThemeManager({
  initialTheme = defaultTheme,
  themes = [defaultTheme],
  onThemeChange,
  onSaveTheme,
  className,
}: ThemeManagerProps) {
  const [activeTheme, setActiveTheme] = useState<Theme>(initialTheme);
  const [availableThemes, setAvailableThemes] = useState<Theme[]>(themes);
  const [editMode, setEditMode] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedColor, setDraggedColor] = useState<string | null>(null);
  const [dragTarget, setDragTarget] = useState<keyof Theme["colors"] | null>(null);

  // Update local state when props change
  useEffect(() => {
    setActiveTheme(initialTheme);
    setAvailableThemes(themes);
  }, [initialTheme, themes]);

  // Handle theme selection
  const handleThemeSelect = (themeId: string) => {
    const theme = availableThemes.find((t) => t.id === themeId);
    if (theme) {
      setActiveTheme(theme);
      onThemeChange?.(theme);
    }
  };

  // Handle color change
  const handleColorChange = (key: keyof Theme["colors"], value: string) => {
    const updatedTheme = {
      ...activeTheme,
      colors: {
        ...activeTheme.colors,
        [key]: value,
      },
    };
    setActiveTheme(updatedTheme);
    onThemeChange?.(updatedTheme);
  };

  // Save the current theme
  const saveTheme = () => {
    // Generate a new ID if this is the default theme
    if (activeTheme.id === "default") {
      const newTheme = {
        ...activeTheme,
        id: `theme-${Date.now()}`,
        name: `${activeTheme.name} Copy`,
      };
      setActiveTheme(newTheme);
      setAvailableThemes([...availableThemes, newTheme]);
      onSaveTheme?.(newTheme);
    } else {
      // Update the existing theme
      const updatedThemes = availableThemes.map((t) =>
        t.id === activeTheme.id ? activeTheme : t
      );
      setAvailableThemes(updatedThemes);
      onSaveTheme?.(activeTheme);
    }
  };

  // Create a new theme
  const createNewTheme = () => {
    const newTheme: Theme = {
      id: `theme-${Date.now()}`,
      name: "New Theme",
      colors: { ...defaultTheme.colors },
    };
    setActiveTheme(newTheme);
    setAvailableThemes([...availableThemes, newTheme]);
    setEditMode(true);
    onThemeChange?.(newTheme);
  };

  // Handle drag start
  const handleDragStart = (color: string) => {
    setIsDragging(true);
    setDraggedColor(color);
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent, key: keyof Theme["colors"]) => {
    e.preventDefault();
    setDragTarget(key);
  };

  // Handle drag leave
  const handleDragLeave = () => {
    setDragTarget(null);
  };

  // Handle drop
  const handleDrop = (key: keyof Theme["colors"]) => {
    if (draggedColor) {
      handleColorChange(key, draggedColor);
    }
    setIsDragging(false);
    setDraggedColor(null);
    setDragTarget(null);
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Theme selector */}
      <div className="flex flex-wrap gap-2">
        {availableThemes.map((theme) => (
          <Button
            key={theme.id}
            onClick={() => handleThemeSelect(theme.id)}
            variant={theme.id === activeTheme.id ? "default" : "outline"}
            size="sm"
          >
            {theme.name}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={createNewTheme}
          className="flex items-center gap-1"
        >
          <PlusCircle className="h-4 w-4" />
          New Theme
        </Button>
      </div>

      {/* Theme editor */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {editMode ? (
                <Input
                  value={activeTheme.name}
                  onChange={(e) =>
                    setActiveTheme({ ...activeTheme, name: e.target.value })
                  }
                  className="w-48"
                />
              ) : (
                <h3 className="text-lg font-medium">{activeTheme.name}</h3>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditMode(!editMode)}
              >
                {editMode ? "Done" : "Edit"}
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={saveTheme}
                className="flex items-center gap-1"
              >
                <Save className="h-4 w-4" />
                Save Theme
              </Button>
            </div>
          </div>

          {/* Color palette preview */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {Object.entries(activeTheme.colors).map(([key, color]) => (
              <div
                key={key}
                className="h-12 rounded-md border flex items-center justify-center text-xs"
                style={{
                  backgroundColor: color,
                  color:
                    key === "background" || key === "muted"
                      ? "#000000"
                      : "#ffffff",
                  boxShadow:
                    dragTarget === key
                      ? "0 0 0 2px rgba(59, 130, 246, 0.5)"
                      : "none",
                }}
                draggable
                onDragStart={() => handleDragStart(color)}
                onDragOver={(e) =>
                  handleDragOver(e, key as keyof Theme["colors"])
                }
                onDragLeave={handleDragLeave}
                onDrop={() => handleDrop(key as keyof Theme["colors"])}
              >
                {key}
              </div>
            ))}
          </div>

          {/* Color editor */}
          <div className="space-y-3">
            {Object.entries(activeTheme.colors).map(([key, color]) => (
              <div key={key} className="flex items-center space-x-2">
                <div
                  className="w-6 h-6 rounded-full border"
                  style={{ backgroundColor: color }}
                />
                <div className="font-medium text-sm w-32">{key}:</div>
                <div className="flex-1 flex">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) =>
                      handleColorChange(
                        key as keyof Theme["colors"],
                        e.target.value
                      )
                    }
                    className="w-10 h-9 p-1 border rounded-l"
                  />
                  <Input
                    value={color}
                    onChange={(e) =>
                      handleColorChange(
                        key as keyof Theme["colors"],
                        e.target.value
                      )
                    }
                    className="rounded-l-none flex-1"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Drag and drop instructions */}
          <div className="mt-4 bg-muted/50 p-3 rounded-md text-sm text-muted-foreground">
            <p className="font-medium mb-1">Drag and Drop:</p>
            <p>Drag any color to another slot to apply it. This is helpful for creating cohesive color schemes.</p>
          </div>

          {/* Save button for mobile */}
          <div className="mt-4 pt-4 border-t lg:hidden">
            <Button onClick={saveTheme} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Save Theme
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 