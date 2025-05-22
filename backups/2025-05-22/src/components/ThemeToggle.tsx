import { useTheme } from '@/app/providers';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  return (
    <div className="flex items-center space-x-2 theme-toggle-switch">
      <Sun className="h-4 w-4 transition-all" />
      <Switch
        id="header-dark-mode"
        checked={isDarkMode}
        onCheckedChange={toggleTheme}
        aria-label="Toggle dark mode"
        className="transition-all"
      />
      <Moon className="h-4 w-4 transition-all" />
      <Label htmlFor="header-dark-mode" className="sr-only">
        Toggle dark mode
      </Label>
    </div>
  );
} 