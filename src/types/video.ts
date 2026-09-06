export interface Video {
  id: string;
  title: string;
  description: string;
  creatorName: string;
  creatorAvatar: string;
  creatorSubscribers: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: number; // in seconds
  views: number;
  likes: number;
  uploadedAt: string; // e.g. "2 hours ago", "3 days ago"
  categoryId: string;
}

export interface Short {
  id: string;
  title: string;
  creatorName: string;
  creatorAvatar: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: number;
  likes: number;
  commentsCount: number;
  sharesCount: number;
  songTitle?: string;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
}

export interface PlayerState {
  videoId: string | null;
  isPlaying: boolean;
  isMiniPlayer: boolean;
  progress: number; // 0 to 1
  currentTime: number; // in seconds
  duration: number; // in seconds
  isBuffering: boolean;
  isMuted: boolean;
  error: string | null;
}

export interface VideoPlayerProps {
  videoUrl: string;
  thumbnailUrl?: string;
  autoPlay?: boolean;
  isLooping?: boolean;
  muted?: boolean;
  isActive?: boolean; // For Shorts and list lifecycle management
  showControls?: boolean;
  showCenterPlayIcon?: boolean;
  onPlaybackStatusUpdate?: (status: Partial<PlayerState>) => void;
  onError?: (error: string) => void;
  onEnd?: () => void;
  style?: object;
  contentFit?: 'contain' | 'cover' | 'fill';
}

