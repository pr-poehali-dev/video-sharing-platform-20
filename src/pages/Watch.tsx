import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import VideoPlayer from "@/components/VideoPlayer";
import CommentSection from "@/components/CommentSection";
import RecommendedVideos from "@/components/RecommendedVideos";
import { videos, commentsMap, type Comment } from "@/data/mockData";

const Watch = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [comments, setComments] = useState<Record<string, Comment[]>>(commentsMap);

  const video = useMemo(() => videos.find((v) => v.id === id), [id]);

  if (!video) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="w-24 h-24 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
            <span className="text-5xl">📺</span>
          </div>
          <h2 className="text-xl font-semibold mb-2">Видео не найдено</h2>
          <p className="text-muted-foreground mb-6">Возможно, оно было удалено или перемещено</p>
          <Button className="gradient-bg text-white rounded-full" onClick={() => navigate("/")}>
            <Icon name="Home" size={18} className="mr-2" />
            На главную
          </Button>
        </div>
      </div>
    );
  }

  const videoComments = comments[video.id] || [];
  const description = `Добро пожаловать на канал ${video.channel.name}! В этом видео мы рассмотрим "${video.title}". Не забудьте подписаться и поставить лайк, если видео было полезным!\n\nТеги: ${video.tags.join(", ")}\n\n#${video.tags.join(" #")}`;

  const handleAddComment = (text: string) => {
    const newComment: Comment = {
      id: `new-${Date.now()}`,
      author: "Вы",
      avatar: "😎",
      text,
      likes: 0,
      timestamp: "только что",
    };
    setComments((prev) => ({
      ...prev,
      [video.id]: [newComment, ...(prev[video.id] || [])],
    }));
  };

  const handleLike = () => {
    setLiked(!liked);
    if (disliked) setDisliked(false);
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    if (liked) setLiked(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <Sidebar isOpen={sidebarOpen} />

      <main className={`pt-16 transition-all duration-300 ${sidebarOpen ? "ml-60" : "ml-[72px]"}`}>
        <div className="max-w-[1800px] mx-auto p-6">
          <div className="flex flex-col xl:flex-row gap-6">
            <div className="flex-1 min-w-0">
              <VideoPlayer
                thumbnail={video.thumbnail}
                title={video.title}
                duration={video.duration}
              />

              <div className="mt-4 animate-fade-in">
                <h1 className="text-xl font-bold leading-tight mb-3">{video.title}</h1>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="flex items-center gap-3 cursor-pointer"
                      onClick={() => {}}
                    >
                      <div className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center text-xl ring-2 ring-primary/20">
                        {video.channel.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-sm">{video.channel.name}</span>
                          {video.channel.verified && (
                            <Icon name="BadgeCheck" size={15} className="text-primary" />
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {video.channel.subscribers} подписчиков
                        </span>
                      </div>
                    </div>

                    <Button
                      className={`rounded-full font-semibold text-sm px-6 transition-all duration-300 ${
                        subscribed
                          ? "bg-secondary text-foreground hover:bg-secondary/80"
                          : "gradient-bg text-white hover:opacity-90 shadow-lg shadow-primary/20"
                      }`}
                      onClick={() => setSubscribed(!subscribed)}
                    >
                      {subscribed ? (
                        <>
                          <Icon name="Bell" size={16} className="mr-1.5" />
                          Подписка
                        </>
                      ) : (
                        "Подписаться"
                      )}
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center bg-secondary rounded-full overflow-hidden">
                      <button
                        className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all ${
                          liked ? "text-primary" : "text-foreground/70 hover:text-foreground"
                        }`}
                        onClick={handleLike}
                      >
                        <Icon name="ThumbsUp" size={18} />
                        <span>{liked ? video.likes + 1 : video.likes}</span>
                      </button>
                      <div className="w-px h-6 bg-border" />
                      <button
                        className={`flex items-center px-4 py-2.5 transition-all ${
                          disliked ? "text-accent" : "text-foreground/70 hover:text-foreground"
                        }`}
                        onClick={handleDislike}
                      >
                        <Icon name="ThumbsDown" size={18} />
                      </button>
                    </div>

                    <Button variant="secondary" className="rounded-full gap-2">
                      <Icon name="Share2" size={18} />
                      <span className="hidden sm:inline text-sm">Поделиться</span>
                    </Button>

                    <Button variant="secondary" className="rounded-full gap-2">
                      <Icon name="Download" size={18} />
                      <span className="hidden sm:inline text-sm">Скачать</span>
                    </Button>

                    <Button variant="secondary" size="icon" className="rounded-full">
                      <Icon name="MoreHorizontal" size={18} />
                    </Button>
                  </div>
                </div>

                <div className="mt-4 bg-secondary/50 rounded-xl p-4">
                  <div className="flex items-center gap-3 text-sm mb-2">
                    <span className="font-semibold">{video.views} просмотров</span>
                    <span className="text-muted-foreground">{video.timestamp}</span>
                  </div>
                  <p
                    className={`text-sm text-foreground/80 whitespace-pre-line leading-relaxed ${
                      !showFullDesc ? "line-clamp-3" : ""
                    }`}
                  >
                    {description}
                  </p>
                  <button
                    className="text-sm font-semibold text-foreground mt-2 hover:text-primary transition-colors"
                    onClick={() => setShowFullDesc(!showFullDesc)}
                  >
                    {showFullDesc ? "Свернуть" : "Развернуть"}
                  </button>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {video.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-primary/10 text-primary border-0 hover:bg-primary/20 cursor-pointer"
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <CommentSection comments={videoComments} onAddComment={handleAddComment} />
              </div>
            </div>

            <div className="xl:w-[400px] shrink-0">
              <RecommendedVideos videos={videos} currentVideoId={video.id} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Watch;
