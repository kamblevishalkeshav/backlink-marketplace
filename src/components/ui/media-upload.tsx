"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ImageIcon, Trash2, Upload } from "lucide-react";
import { ChangeEvent, useState } from "react";

interface MediaUploadProps {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  maxSizeMB?: number;
  aspectRatio?: number;
  allowedTypes?: string[];
}

export function MediaUpload({
  value,
  onChange,
  className,
  maxSizeMB = 5,
  aspectRatio,
  allowedTypes = ["image/jpeg", "image/png", "image/webp"]
}: MediaUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Reset states
    setError(null);
    
    // Validate file type
    if (!allowedTypes.includes(file.type)) {
      setError(`File type not supported. Please upload ${allowedTypes.join(", ")}`);
      return;
    }
    
    // Validate file size
    if (file.size > maxSizeBytes) {
      setError(`File too large. Maximum size is ${maxSizeMB}MB`);
      return;
    }
    
    // In a real app, this would upload to a server or storage service
    // For now, we'll use a simple FileReader to create a data URL
    setIsUploading(true);
    
    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        onChange(result);
        setIsUploading(false);
      };
      reader.onerror = () => {
        setError("Error reading file");
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError("Error processing file");
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    
    // Create a fake input event
    const input = document.createElement("input");
    input.type = "file";
    
    // Use DataTransfer to set files
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    input.files = dataTransfer.files;
    
    // Trigger change handler
    handleFileChange({ target: input } as unknown as ChangeEvent<HTMLInputElement>);
  };

  const handleRemove = () => {
    onChange("");
  };

  return (
    <div className={cn("space-y-2", className)}>
      {!value ? (
        <div
          className={cn(
            "border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center gap-2",
            isDragging ? "border-primary bg-primary/5" : "border-border",
            "transition-colors duration-200"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <ImageIcon className="h-6 w-6 text-primary" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium mb-1">Drag & drop to upload</p>
            <p className="text-xs text-muted-foreground">
              {allowedTypes.join(", ")} (max. {maxSizeMB}MB)
            </p>
          </div>
          <div className="mt-2 relative">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="relative"
              disabled={isUploading}
            >
              <Upload className="h-4 w-4 mr-2" />
              Select file
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept={allowedTypes.join(",")}
                onChange={handleFileChange}
                disabled={isUploading}
              />
            </Button>
            {isUploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-md">
                <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
          {error && <p className="text-xs text-destructive mt-2">{error}</p>}
        </div>
      ) : (
        <div className="relative group">
          <img
            src={value}
            alt="Uploaded media"
            className={cn(
              "w-full rounded-md border object-cover",
              aspectRatio ? "object-cover" : "max-h-96"
            )}
            style={aspectRatio ? { aspectRatio: `${aspectRatio}` } : undefined}
          />
          <div className="absolute inset-0 bg-black/50 rounded-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleRemove}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Remove
            </Button>
          </div>
        </div>
      )}
    </div>
  );
} 