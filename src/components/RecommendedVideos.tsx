import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { type Video } from "@/data/mockData";

interface RecommendedVideosProps {
  videos: Video[];
  currentVideoId: string;
}

const RecommendedVideos = ({ videos, currentVideoId }: RecommendedVideosProps) => {
  const navigate = useNavigate();
  const filtered = videos.filter((v) => v.id !== currentVideoId);

  return (
    <div>
      <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
        <Icon name="Sparkles" size={18} className="text-primary" />
        Рекомендации
      </h3>
      <div className="space-y-3">
        {filtered.map((video, i) => (
          <RecommendedCard
            key={video.id}
            video={video}
            index={i}
            onClick={() => navigate(`/watch/${video.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

const RecommendedCard = ({
  video,
  index,
  onClick,
}: {
  video: Video;
  index: number;
  onClick: () => void;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex gap-3 cursor-pointer group animate-fade-in rounded-lg p-1.5 -mx-1.5 hover:bg-secondary/40 transition-all"
      style={{ animationDelay: `${index * 50}ms`, animationFillMode: "both" }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative w-40 shrink-0 aspect-video rounded-lg overflow-hidden bg-secondary">
        <img
          src={video.thumbnail}
          alt={video.title}
          className={`w-full h-full object-cover transition-all duration-300 ${
            hovered ? "scale-105 brightness-90" : ""
          }`}
        />
        <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] font-medium px-1.5 py-0.5 rounded">
          {video.duration}
        </div>
        {hovered && (
          <div className="absolute inset-0 flex items-center justify-center animate-scale-in">
            <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center">
              <Icon name="Play" size={14} className="text-white ml-0.5" />
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0 py-0.5">
        <h4 className="text-sm font-medium text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {video.title}
        </h4>
        <div className="flex items-center gap-1 mt-1.5">
          <span className="text-xs text-muted-foreground">{video.channel.name}</span>
          {video.channel.verified && (
            <Icon name="BadgeCheck" size={12} className="text-primary" />
          )}
        </div>
        <div className="text-xs text-muted-foreground mt-0.5">
          {video.views} • {video.timestamp}
        </div>
      </div>
    </div>
  );
};

export default RecommendedVideos;
