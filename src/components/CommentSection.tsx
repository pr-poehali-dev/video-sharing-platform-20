import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { type Comment } from "@/data/mockData";

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (text: string) => void;
}

const CommentItem = ({ comment, depth = 0 }: { comment: Comment; depth?: number }) => {
  const [liked, setLiked] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  return (
    <div className={`animate-fade-in ${depth > 0 ? "ml-12" : ""}`}>
      <div className="flex gap-3 group">
        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-lg shrink-0">
          {comment.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-semibold text-foreground">{comment.author}</span>
            <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
          </div>
          <p className="text-sm text-foreground/85 leading-relaxed mb-2">{comment.text}</p>
          <div className="flex items-center gap-4">
            <button
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setLiked(!liked)}
            >
              <Icon
                name={liked ? "ThumbsUp" : "ThumbsUp"}
                size={15}
                className={liked ? "text-primary" : ""}
              />
              <span className={liked ? "text-primary font-medium" : ""}>
                {liked ? comment.likes + 1 : comment.likes}
              </span>
            </button>
            <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <Icon name="ThumbsDown" size={15} />
            </button>
            <button className="text-xs text-muted-foreground hover:text-foreground font-medium transition-colors">
              Ответить
            </button>
          </div>

          {comment.replies && comment.replies.length > 0 && (
            <button
              className="flex items-center gap-2 mt-3 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
              onClick={() => setShowReplies(!showReplies)}
            >
              <Icon name={showReplies ? "ChevronUp" : "ChevronDown"} size={16} />
              {showReplies ? "Скрыть" : `${comment.replies.length} ${comment.replies.length === 1 ? "ответ" : "ответа"}`}
            </button>
          )}
        </div>
        <button className="opacity-0 group-hover:opacity-100 transition-opacity self-start mt-1">
          <Icon name="MoreVertical" size={16} className="text-muted-foreground" />
        </button>
      </div>

      {showReplies && comment.replies?.map((reply) => (
        <div key={reply.id} className="mt-4">
          <CommentItem comment={reply} depth={depth + 1} />
        </div>
      ))}
    </div>
  );
};

const CommentSection = ({ comments, onAddComment }: CommentSectionProps) => {
  const [newComment, setNewComment] = useState("");
  const [focused, setFocused] = useState(false);
  const [sortBy, setSortBy] = useState<"top" | "new">("top");

  const totalComments = comments.reduce(
    (acc, c) => acc + 1 + (c.replies?.length || 0),
    0
  );

  const sorted = [...comments].sort((a, b) =>
    sortBy === "top" ? b.likes - a.likes : 0
  );

  const handleSubmit = () => {
    if (!newComment.trim()) return;
    onAddComment(newComment.trim());
    setNewComment("");
    setFocused(false);
  };

  return (
    <div className="mt-8">
      <div className="flex items-center gap-4 mb-6">
        <h3 className="text-lg font-semibold">
          {totalComments} комментари{totalComments === 1 ? "й" : totalComments < 5 ? "я" : "ев"}
        </h3>
        <button
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setSortBy(sortBy === "top" ? "new" : "top")}
        >
          <Icon name="ArrowUpDown" size={16} />
          {sortBy === "top" ? "Популярные" : "Новые"}
        </button>
      </div>

      <div className="flex gap-3 mb-8">
        <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-sm font-bold text-white shrink-0">
          ВП
        </div>
        <div className="flex-1">
          <Textarea
            placeholder="Напишите комментарий..."
            className="bg-transparent border-0 border-b border-border/50 rounded-none resize-none px-0 focus-visible:ring-0 focus-visible:border-primary min-h-[40px] text-sm transition-all"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onFocus={() => setFocused(true)}
            rows={focused ? 3 : 1}
          />
          {focused && (
            <div className="flex justify-end gap-2 mt-3 animate-fade-in">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full text-muted-foreground"
                onClick={() => { setNewComment(""); setFocused(false); }}
              >
                Отмена
              </Button>
              <Button
                size="sm"
                className="rounded-full gradient-bg text-white hover:opacity-90"
                disabled={!newComment.trim()}
                onClick={handleSubmit}
              >
                Комментировать
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {sorted.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
