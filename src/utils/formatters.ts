export function formatViews(views: number): string {
  if (views >= 1_000_000) {
    return `${(views / 1_000_000).toFixed(1).replace(/\.0$/, '')}M views`;
  }
  if (views >= 1_000) {
    return `${(views / 1_000).toFixed(1).replace(/\.0$/, '')}K views`;
  }
  return `${views} views`;
}

export function formatLikes(likes: number): string {
  if (likes >= 1_000_000) {
    return `${(likes / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  }
  if (likes >= 1_000) {
    return `${(likes / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
  }
  return `${likes}`;
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}
