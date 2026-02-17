import { useRef, useState } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { categories, type Category } from "@/data/mockData";

interface CategoryBarProps {
  activeCategory: string;
  onCategoryChange: (id: string) => void;
}

const CategoryBar = ({ activeCategory, onCategoryChange }: CategoryBarProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeft(scrollLeft > 10);
    setShowRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {showLeft && (
        <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center">
          <div className="bg-gradient-to-r from-background via-background to-transparent pr-6 pl-1 h-full flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 rounded-full bg-secondary/80 hover:bg-secondary"
              onClick={() => scroll("left")}
            >
              <Icon name="ChevronLeft" size={16} />
            </Button>
          </div>
        </div>
      )}

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-2 overflow-x-auto scrollbar-hide py-1 px-1"
      >
        {categories.map((cat: Category) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 shrink-0 ${
              activeCategory === cat.id
                ? "gradient-bg text-white shadow-lg shadow-primary/20"
                : "bg-secondary/60 text-foreground/70 hover:bg-secondary hover:text-foreground"
            }`}
          >
            <Icon name={cat.icon} size={16} />
            {cat.label}
          </button>
        ))}
      </div>

      {showRight && (
        <div className="absolute right-0 top-0 bottom-0 z-10 flex items-center">
          <div className="bg-gradient-to-l from-background via-background to-transparent pl-6 pr-1 h-full flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 rounded-full bg-secondary/80 hover:bg-secondary"
              onClick={() => scroll("right")}
            >
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryBar;
