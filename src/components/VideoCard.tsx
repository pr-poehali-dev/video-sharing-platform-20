import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { type Video } from "@/data/mockData";

interface VideoCardProps {
  video: Video;
  index: number;
}

const VideoCard = ({ video, index }: VideoCardProps) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div
      className="group cursor-pointer animate-fade-in"
      style={{ animationDelay: `${index * 60}ms`, animationFillMode: "both" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/watch/${video.id}`)}
    >
      <div className="relative aspect-video rounded-xl overflow-hidden bg-secondary mb-3">
        {!imgLoaded && (
          <div className="absolute inset-0 bg-secondary animate-pulse" />
        )}
        <img
          src={video.thumbnail}
          alt={video.title}
          className={`w-full h-full object-cover transition-all duration-500 ${
            isHovered ? "scale-105 brightness-90" : "scale-100"
          } ${imgLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setImgLoaded(true)}
        />

        <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm text-white text-xs font-medium px-2 py-0.5 rounded-md">
          {video.duration}
        </div>

        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
        >
          <div className="w-14 h-14 rounded-full gradient-bg flex items-center justify-center shadow-xl animate-pulse-glow">
            <Icon name="Play" size={24} className="text-white ml-1" />
          </div>
        </div>

        {isHovered && (
          <div className="absolute top-2 right-2 flex flex-col gap-1">
            {[
              { icon: "Clock", label: "Позже" },
              { icon: "ListPlus", label: "В плейлист" },
            ].map((action) => (
              <button
                key={action.icon}
                className="w-8 h-8 rounded-lg bg-black/70 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/90 transition-all animate-scale-in"
                title={action.label}
              >
                <Icon name={action.icon} size={16} />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-lg shrink-0 mt-0.5 group-hover:ring-2 ring-primary/30 transition-all duration-300">
          {video.channel.avatar}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {video.title}
          </h3>
          <div className="mt-1 flex items-center gap-1">
            <span className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              {video.channel.name}
            </span>
            {video.channel.verified && (
              <Icon name="BadgeCheck" size={13} className="text-primary" />
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>{video.views} просмотров</span>
            <span>•</span>
            <span>{video.timestamp}</span>
          </div>
        </div>

        <button className="opacity-0 group-hover:opacity-100 transition-opacity self-start mt-1">
          <Icon name="MoreVertical" size={18} className="text-muted-foreground hover:text-foreground" />
        </button>
      </div>
    </div>
  );
};

export default VideoCard;