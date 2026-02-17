import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { videos } from "@/data/mockData";

const TrendingBanner = () => {
  const navigate = useNavigate();
  const featured = videos[4];

  return (
    <div className="relative rounded-2xl overflow-hidden mb-8 group cursor-pointer" onClick={() => navigate(`/watch/${featured.id}`)}>
      <div className="absolute inset-0">
        <img
          src={featured.thumbnail}
          alt={featured.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="relative z-10 p-8 md:p-12 flex flex-col justify-end min-h-[280px] md:min-h-[340px]">
        <div className="flex items-center gap-2 mb-4">
          <div className="px-3 py-1 rounded-full gradient-bg text-white text-xs font-bold flex items-center gap-1.5 animate-pulse-glow">
            <Icon name="TrendingUp" size={14} />
            В ТРЕНДЕ
          </div>
          <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-xs font-medium">
            {featured.views} просмотров
          </div>
        </div>

        <h2 className="text-2xl md:text-4xl font-display font-bold text-white mb-3 max-w-xl leading-tight">
          {featured.title}
        </h2>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-base">
            {featured.channel.avatar}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-white/90 text-sm font-medium">{featured.channel.name}</span>
              {featured.channel.verified && (
                <Icon name="BadgeCheck" size={14} className="text-primary" />
              )}
            </div>
            <span className="text-white/50 text-xs">{featured.channel.subscribers} подписчиков</span>
          </div>
        </div>

        <div className="flex gap-3">
          <Button className="gradient-bg text-white font-semibold rounded-full px-6 hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
            <Icon name="Play" size={18} className="mr-2" />
            Смотреть
          </Button>
          <Button
            variant="ghost"
            className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full px-5"
          >
            <Icon name="Plus" size={18} className="mr-2" />
            В плейлист
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TrendingBanner;