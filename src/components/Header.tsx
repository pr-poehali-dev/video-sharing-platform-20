import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface HeaderProps {
  onToggleSidebar: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Header = ({ onToggleSidebar, searchQuery, onSearchChange }: HeaderProps) => {
  const [focused, setFocused] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground/70 hover:text-foreground"
            onClick={onToggleSidebar}
          >
            <Icon name="Menu" size={22} />
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <Icon name="Play" size={16} className="text-white ml-0.5" />
            </div>
            <span className="font-display font-bold text-xl hidden sm:block">
              Vibe<span className="gradient-text">Tube</span>
            </span>
          </div>
        </div>

        <div className={`flex items-center max-w-2xl w-full mx-4 transition-all duration-300 ${focused ? "scale-[1.02]" : ""}`}>
          <div className="relative flex-1 flex">
            <div className={`absolute inset-0 rounded-full gradient-bg opacity-0 blur-md transition-opacity duration-300 ${focused ? "opacity-20" : ""}`} />
            <Input
              placeholder="Поиск видео..."
              className="rounded-l-full rounded-r-none border-border/50 bg-secondary/50 h-10 pl-4 pr-4 focus-visible:ring-1 focus-visible:ring-primary/50 relative"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            />
            <Button
              className="rounded-r-full rounded-l-none border border-l-0 border-border/50 bg-secondary/80 hover:bg-secondary text-foreground/70 h-10 px-5"
              variant="ghost"
            >
              <Icon name="Search" size={18} />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="ml-2 text-foreground/70 hover:text-foreground hidden sm:flex"
          >
            <Icon name="Mic" size={20} />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-foreground/70 hover:text-foreground hidden sm:flex">
            <Icon name="Upload" size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="text-foreground/70 hover:text-foreground relative">
            <Icon name="Bell" size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full gradient-bg" />
          </Button>
          <Avatar className="w-8 h-8 cursor-pointer gradient-border">
            <AvatarFallback className="bg-secondary text-sm font-semibold">
              ВП
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header;
