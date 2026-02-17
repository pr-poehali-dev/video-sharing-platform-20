import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import CategoryBar from "@/components/CategoryBar";
import VideoCard from "@/components/VideoCard";
import TrendingBanner from "@/components/TrendingBanner";
import { videos } from "@/data/mockData";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVideos = useMemo(() => {
    let result = videos;

    if (activeCategory !== "all") {
      result = result.filter((v) => v.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          v.channel.name.toLowerCase().includes(q) ||
          v.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return result;
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      <Header
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <Sidebar isOpen={sidebarOpen} />

      <main
        className={`pt-16 transition-all duration-300 ${
          sidebarOpen ? "ml-60" : "ml-[72px]"
        }`}
      >
        <div className="p-6 max-w-[1800px] mx-auto">
          <div className="mb-6">
            <CategoryBar
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>

          {activeCategory === "all" && !searchQuery && <TrendingBanner />}

          {filteredVideos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
              {filteredVideos.map((video, i) => (
                <VideoCard key={video.id} video={video} index={i} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
              <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center mb-4">
                <span className="text-4xl">🔍</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Ничего не найдено
              </h3>
              <p className="text-muted-foreground text-sm max-w-sm">
                Попробуйте изменить запрос или выбрать другую категорию
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
