"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
    AlignCenter,
    AlignLeft,
    AlignRight,
    Bold,
    ChevronDown,
    Heading1,
    Heading2,
    Heading3,
    Heading4,
    Italic,
    Link as LinkIcon,
    List,
    ListOrdered,
    LucideIcon,
    Palette,
    TextCursorInput,
    Type,
    Underline
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: string;
  enableAdvancedFormatting?: boolean;
}

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "p";

const FONT_FAMILIES = [
  { name: "Default", value: "inherit" },
  { name: "Arial", value: "Arial, sans-serif" },
  { name: "Helvetica", value: "Helvetica, sans-serif" },
  { name: "Times New Roman", value: "Times New Roman, serif" },
  { name: "Georgia", value: "Georgia, serif" },
  { name: "Verdana", value: "Verdana, sans-serif" },
  { name: "Courier New", value: "Courier New, monospace" }
];

const FONT_SIZES = [
  { name: "Default", value: "inherit" },
  { name: "Small", value: "0.875rem" },
  { name: "Normal", value: "1rem" },
  { name: "Medium", value: "1.25rem" },
  { name: "Large", value: "1.5rem" },
  { name: "X-Large", value: "2rem" },
  { name: "XX-Large", value: "3rem" }
];

const TEXT_COLORS = [
  { name: "Default", value: "inherit" },
  { name: "Black", value: "#000000" },
  { name: "Dark Gray", value: "#444444" },
  { name: "Gray", value: "#888888" },
  { name: "Light Gray", value: "#cccccc" },
  { name: "White", value: "#ffffff" },
  { name: "Red", value: "#ff0000" },
  { name: "Green", value: "#00ff00" },
  { name: "Blue", value: "#0000ff" },
  { name: "Yellow", value: "#ffff00" },
  { name: "Purple", value: "#800080" },
  { name: "Orange", value: "#ffa500" },
  { name: "Pink", value: "#ffc0cb" }
];

const HIGHLIGHT_COLORS = [
  { name: "None", value: "transparent" },
  { name: "Yellow", value: "#ffff00" },
  { name: "Green", value: "#00ff00" },
  { name: "Blue", value: "#00ffff" },
  { name: "Pink", value: "#ff00ff" },
  { name: "Gray", value: "#eeeeee" }
];

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Enter content...",
  className,
  minHeight = "150px",
  enableAdvancedFormatting = true
}: RichTextEditorProps) {
  const [editor, setEditor] = useState<HTMLDivElement | null>(null);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [currentHeadingLevel, setCurrentHeadingLevel] = useState<HeadingLevel>("p");

  // Initialize and sync with external value
  useEffect(() => {
    if (editor) {
      if (editor.innerHTML !== value) {
        editor.innerHTML = value || "";
      }
    }
  }, [value, editor]);

  // Listen to content changes and update parent
  const handleInput = useCallback(() => {
    if (editor) {
      onChange(editor.innerHTML);
    }
  }, [editor, onChange]);

  useEffect(() => {
    if (editor) {
      // Add event listener
      editor.addEventListener("input", handleInput);
      
      // Cleanup
      return () => {
        editor.removeEventListener("input", handleInput);
      };
    }
  }, [editor, handleInput]);

  // Exec commands
  const execCommand = (command: string, value: string = "") => {
    document.execCommand(command, false, value);
    if (editor) {
      editor.focus();
      handleInput();
    }
  };

  // Format block as heading
  const formatHeading = (level: HeadingLevel) => {
    if (level === "p") {
      execCommand("formatBlock", "<p>");
    } else {
      execCommand("formatBlock", `<${level}>`);
    }
    setCurrentHeadingLevel(level);
  };

  // Apply font family
  const applyFontFamily = (fontFamily: string) => {
    execCommand("fontName", fontFamily);
  };

  // Apply font size
  const applyFontSize = (fontSize: string) => {
    // We need to wrap the selected text in a span with the font size
    if (editor && window.getSelection) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const span = document.createElement("span");
        span.style.fontSize = fontSize;
        
        try {
          // Try to surround contents with the span
          range.surroundContents(span);
          handleInput();
        } catch (e) {
          // If surroundContents fails (e.g., due to partial nodes), use alternative approach
          const fragment = range.extractContents();
          span.appendChild(fragment);
          range.insertNode(span);
          handleInput();
        }
      }
    }
  };

  // Apply text color
  const applyTextColor = (color: string) => {
    execCommand("foreColor", color);
  };

  // Apply highlight color
  const applyHighlightColor = (color: string) => {
    execCommand("hiliteColor", color);
  };

  // Handle link insertion
  const insertLink = () => {
    if (linkUrl && linkText) {
      execCommand("insertHTML", `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer">${linkText}</a>`);
      setShowLinkInput(false);
      setLinkUrl("");
      setLinkText("");
    }
  };

  const getHeadingIcon = (level: HeadingLevel): LucideIcon => {
    switch (level) {
      case "h1": return Heading1;
      case "h2": return Heading2;
      case "h3": return Heading3;
      case "h4": return Heading4;
      default: return TextCursorInput;
    }
  };

  const HeadingIcon = getHeadingIcon(currentHeadingLevel);

  return (
    <div className={cn("border rounded-md overflow-hidden", className)}>
      <div className="bg-muted/50 border-b p-2 flex flex-wrap gap-1">
        {/* Basic formatting */}
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => execCommand("bold")}
          className="h-8 w-8 p-0"
        >
          <Bold className="h-4 w-4" />
          <span className="sr-only">Bold</span>
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => execCommand("italic")}
          className="h-8 w-8 p-0"
        >
          <Italic className="h-4 w-4" />
          <span className="sr-only">Italic</span>
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => execCommand("underline")}
          className="h-8 w-8 p-0"
        >
          <Underline className="h-4 w-4" />
          <span className="sr-only">Underline</span>
        </Button>
        <div className="h-8 w-px bg-border mx-1" />

        {/* Lists */}
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => execCommand("insertUnorderedList")}
          className="h-8 w-8 p-0"
        >
          <List className="h-4 w-4" />
          <span className="sr-only">Bullet List</span>
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => execCommand("insertOrderedList")}
          className="h-8 w-8 p-0"
        >
          <ListOrdered className="h-4 w-4" />
          <span className="sr-only">Numbered List</span>
        </Button>
        <div className="h-8 w-px bg-border mx-1" />

        {/* Alignment */}
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => execCommand("justifyLeft")}
          className="h-8 w-8 p-0"
        >
          <AlignLeft className="h-4 w-4" />
          <span className="sr-only">Align Left</span>
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => execCommand("justifyCenter")}
          className="h-8 w-8 p-0"
        >
          <AlignCenter className="h-4 w-4" />
          <span className="sr-only">Align Center</span>
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => execCommand("justifyRight")}
          className="h-8 w-8 p-0"
        >
          <AlignRight className="h-4 w-4" />
          <span className="sr-only">Align Right</span>
        </Button>
        <div className="h-8 w-px bg-border mx-1" />

        {/* Link */}
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => setShowLinkInput(!showLinkInput)}
          className="h-8 px-2"
        >
          <LinkIcon className="h-4 w-4 mr-1" />
          <span className="text-xs">Link</span>
        </Button>

        {enableAdvancedFormatting && (
          <>
            <div className="h-8 w-px bg-border mx-1" />
            
            {/* Heading Level */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 px-2"
                >
                  <HeadingIcon className="h-4 w-4 mr-1" />
                  <span className="text-xs">{currentHeadingLevel.toUpperCase()}</span>
                  <ChevronDown className="h-3 w-3 ml-1 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => formatHeading("h1")}>
                  <Heading1 className="h-4 w-4 mr-2" />
                  <span>Heading 1</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => formatHeading("h2")}>
                  <Heading2 className="h-4 w-4 mr-2" />
                  <span>Heading 2</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => formatHeading("h3")}>
                  <Heading3 className="h-4 w-4 mr-2" />
                  <span>Heading 3</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => formatHeading("h4")}>
                  <Heading4 className="h-4 w-4 mr-2" />
                  <span>Heading 4</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => formatHeading("p")}>
                  <TextCursorInput className="h-4 w-4 mr-2" />
                  <span>Paragraph</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Font Family */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 px-2"
                >
                  <Type className="h-4 w-4 mr-1" />
                  <span className="text-xs">Font</span>
                  <ChevronDown className="h-3 w-3 ml-1 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {FONT_FAMILIES.map((font) => (
                  <DropdownMenuItem 
                    key={font.value}
                    onClick={() => applyFontFamily(font.value)}
                    style={{ fontFamily: font.value }}
                  >
                    {font.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Font Size */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 px-2"
                >
                  <TextCursorInput className="h-4 w-4 mr-1" />
                  <span className="text-xs">Size</span>
                  <ChevronDown className="h-3 w-3 ml-1 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {FONT_SIZES.map((size) => (
                  <DropdownMenuItem 
                    key={size.value}
                    onClick={() => applyFontSize(size.value)}
                    style={{ fontSize: size.name === "Default" ? undefined : size.value }}
                  >
                    {size.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Text Color */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 px-2"
                >
                  <Palette className="h-4 w-4 mr-1" />
                  <span className="text-xs">Color</span>
                  <ChevronDown className="h-3 w-3 ml-1 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-40">
                <div className="grid grid-cols-4 gap-1 p-2">
                  {TEXT_COLORS.map((color) => (
                    <button
                      key={color.value}
                      className="h-6 w-6 rounded-md border border-input"
                      style={{ backgroundColor: color.value }}
                      onClick={() => applyTextColor(color.value)}
                      title={color.name}
                    />
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Highlight Color */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 px-2"
                >
                  <span className="bg-yellow-200 text-black px-1 text-xs font-bold">A</span>
                  <span className="text-xs ml-1">Highlight</span>
                  <ChevronDown className="h-3 w-3 ml-1 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-40">
                <div className="grid grid-cols-3 gap-1 p-2">
                  {HIGHLIGHT_COLORS.map((color) => (
                    <button
                      key={color.value}
                      className="h-6 w-10 rounded-md border border-input flex items-center justify-center text-xs font-medium"
                      style={{ backgroundColor: color.value, color: color.value === "transparent" ? "inherit" : "#000" }}
                      onClick={() => applyHighlightColor(color.value)}
                      title={color.name}
                    >
                      {color.name === "None" ? "None" : "Ab"}
                    </button>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>
      
      {showLinkInput && (
        <div className="p-2 flex flex-wrap gap-2 border-b bg-muted/20">
          <input 
            type="text" 
            placeholder="Link text" 
            value={linkText}
            onChange={(e) => setLinkText(e.target.value)}
            className="px-2 py-1 text-sm rounded border flex-1 min-w-[150px]"
          />
          <input 
            type="url" 
            placeholder="URL (https://...)" 
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            className="px-2 py-1 text-sm rounded border flex-1 min-w-[150px]"
          />
          <Button 
            type="button" 
            size="sm" 
            onClick={insertLink}
            disabled={!linkUrl || !linkText}
          >
            Insert
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={() => {
              setShowLinkInput(false);
              setLinkUrl("");
              setLinkText("");
            }}
          >
            Cancel
          </Button>
        </div>
      )}
      
      <div
        ref={setEditor}
        contentEditable
        className={cn(
          "p-3 focus:outline-none w-full overflow-auto",
          "prose prose-sm max-w-none dark:prose-invert",
          !value && "before:content-[attr(data-placeholder)] before:text-muted-foreground"
        )}
        style={{ minHeight }}
        dangerouslySetInnerHTML={{ __html: value || "" }}
        onBlur={handleInput}
        data-placeholder={placeholder}
      />
    </div>
  );
} 