import { useState, useRef, useEffect, useCallback } from "react";
import Icon from "@/components/ui/icon";
import { Slider } from "@/components/ui/slider";

interface VideoPlayerProps {
  thumbnail: string;
  title: string;
  duration: string;
}

const parseDuration = (d: string): number => {
  const parts = d.split(":").map(Number);
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  return parts[0] * 60 + parts[1];
};

const formatTime = (s: number): string => {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = Math.floor(s % 60);
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  return `${m}:${String(sec).padStart(2, "0")}`;
};

const VideoPlayer = ({ thumbnail, title, duration }: VideoPlayerProps) => {
  const totalSeconds = parseDuration(duration);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);
  const [muted, setMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const progress = totalSeconds > 0 ? (currentTime / totalSeconds) * 100 : 0;

  useEffect(() => {
    if (playing) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalSeconds) {
            setPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [playing, totalSeconds]);

  const handleMouseMove = useCallback(() => {
    setShowControls(true);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    if (playing) {
      hideTimerRef.current = setTimeout(() => setShowControls(false), 3000);
    }
  }, [playing]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  const handleSeek = (val: number[]) => {
    setCurrentTime((val[0] / 100) * totalSeconds);
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-video bg-black rounded-2xl overflow-hidden group cursor-pointer select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => playing && setShowControls(false)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("[data-controls]")) return;
        setPlaying(!playing);
      }}
    >
      <img
        src={thumbnail}
        alt={title}
        className={`w-full h-full object-cover transition-all duration-700 ${playing ? "brightness-[0.85]" : ""}`}
      />

      {!playing && currentTime === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 animate-fade-in">
          <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center shadow-2xl animate-pulse-glow hover:scale-110 transition-transform">
            <Icon name="Play" size={36} className="text-white ml-1.5" />
          </div>
        </div>
      )}

      {playing && !showControls && (
        <div className="absolute inset-0" />
      )}

      <div
        data-controls
        className={`absolute bottom-0 left-0 right-0 transition-all duration-300 ${
          showControls || !playing ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-16 pb-4 px-4">
          <div className="mb-3 px-1">
            <Slider
              value={[progress]}
              max={100}
              step={0.1}
              onValueChange={handleSeek}
              className="cursor-pointer [&_[role=slider]]:w-3.5 [&_[role=slider]]:h-3.5 [&_[role=slider]]:gradient-bg [&_[role=slider]]:border-0 [&_[role=slider]]:shadow-lg [&_[role=slider]]:shadow-primary/40 [&_.bg-primary]:gradient-bg"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                onClick={(e) => { e.stopPropagation(); setPlaying(!playing); }}
              >
                <Icon name={playing ? "Pause" : "Play"} size={22} className={playing ? "" : "ml-0.5"} />
              </button>

              <button
                className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                onClick={(e) => { e.stopPropagation(); setCurrentTime(Math.min(currentTime + 10, totalSeconds)); }}
              >
                <Icon name="SkipForward" size={20} />
              </button>

              <div className="flex items-center gap-1 group/vol">
                <button
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                  onClick={(e) => { e.stopPropagation(); setMuted(!muted); }}
                >
                  <Icon name={muted || volume === 0 ? "VolumeX" : volume < 50 ? "Volume1" : "Volume2"} size={20} />
                </button>
                <div className="w-0 group-hover/vol:w-24 overflow-hidden transition-all duration-300">
                  <Slider
                    value={[muted ? 0 : volume]}
                    max={100}
                    step={1}
                    onValueChange={(v) => { setVolume(v[0]); setMuted(false); }}
                    className="cursor-pointer [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:bg-white [&_[role=slider]]:border-0"
                  />
                </div>
              </div>

              <span className="text-white/80 text-sm font-mono ml-2">
                {formatTime(currentTime)} / {formatTime(totalSeconds)}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                onClick={(e) => { e.stopPropagation(); }}
              >
                <Icon name="Settings" size={20} />
              </button>
              <button
                className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
              >
                <Icon name={fullscreen ? "Minimize" : "Maximize"} size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
