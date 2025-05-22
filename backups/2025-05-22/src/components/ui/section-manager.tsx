"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    ArrowDown,
    ArrowUp,
    Eye,
    EyeOff,
    GripVertical,
    Plus,
    Settings,
    Trash,
} from "lucide-react";
import { useState } from "react";

export interface Section {
  id: string;
  name: string;
  type: string;
  isVisible?: boolean;
  [key: string]: any;
}

interface SectionManagerProps {
  sections: Section[];
  onSectionsChange: (sections: Section[]) => void;
  onEditSection: (index: number) => void;
  availableSectionTypes?: Array<{ type: string; name: string }>;
}

export function SectionManager({
  sections,
  onSectionsChange,
  onEditSection,
  availableSectionTypes = [],
}: SectionManagerProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [showAddMenu, setShowAddMenu] = useState(false);

  // Handle section visibility toggle
  const toggleSectionVisibility = (index: number) => {
    const updatedSections = [...sections];
    updatedSections[index] = {
      ...updatedSections[index],
      isVisible: !(updatedSections[index].isVisible ?? true),
    };
    onSectionsChange(updatedSections);
  };

  // Handle section removal
  const removeSection = (index: number) => {
    const updatedSections = [...sections];
    updatedSections.splice(index, 1);
    onSectionsChange(updatedSections);
  };

  // Handle section movement
  const moveSection = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= sections.length) return;

    const updatedSections = [...sections];
    const [removed] = updatedSections.splice(fromIndex, 1);
    updatedSections.splice(toIndex, 0, removed);
    onSectionsChange(updatedSections);
  };

  // Handle section drag start
  const handleDragStart = (index: number) => {
    setIsDragging(true);
    setDraggedIndex(index);
  };

  // Handle section drag end
  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedIndex(null);
  };

  // Handle section drag over
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    moveSection(draggedIndex, index);
    setDraggedIndex(index);
  };

  // Add a new section
  const addSection = (type: string, name: string) => {
    const newSection: Section = {
      id: `section-${Date.now()}`,
      name,
      type,
      isVisible: true,
    };
    
    onSectionsChange([...sections, newSection]);
    setShowAddMenu(false);
    
    // Edit the newly added section
    setTimeout(() => {
      onEditSection(sections.length);
    }, 100);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Page Sections</h3>
        <Button
          size="sm"
          onClick={() => setShowAddMenu(!showAddMenu)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Section
        </Button>
      </div>

      {showAddMenu && (
        <Card className="p-4">
          <h4 className="text-sm font-medium mb-3">Choose section type</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {availableSectionTypes.map((sectionType) => (
              <Button
                key={sectionType.type}
                variant="outline"
                className="justify-start text-sm h-auto py-2"
                onClick={() => addSection(sectionType.type, sectionType.name)}
              >
                {sectionType.name}
              </Button>
            ))}
          </div>
        </Card>
      )}

      <div className="space-y-2">
        {sections.length === 0 ? (
          <div className="text-center p-8 border border-dashed rounded-md">
            <p className="text-muted-foreground">No sections yet</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => setShowAddMenu(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add your first section
            </Button>
          </div>
        ) : (
          sections.map((section, index) => (
            <div
              key={section.id}
              className="border rounded-md flex items-center p-2 bg-card"
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => handleDragOver(e, index)}
              style={{ opacity: isDragging && draggedIndex === index ? 0.5 : 1 }}
            >
              <div className="cursor-move p-2">
                <GripVertical className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1 ml-2">
                <p className="text-sm font-medium">{section.name}</p>
                <p className="text-xs text-muted-foreground">{section.type}</p>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() => toggleSectionVisibility(index)}
                  title={section.isVisible === false ? "Show section" : "Hide section"}
                >
                  {section.isVisible === false ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() => moveSection(index, index - 1)}
                  disabled={index === 0}
                  title="Move up"
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() => moveSection(index, index + 1)}
                  disabled={index === sections.length - 1}
                  title="Move down"
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() => onEditSection(index)}
                  title="Edit section"
                >
                  <Settings className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-destructive hover:text-destructive"
                  onClick={() => removeSection(index)}
                  title="Remove section"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 