import React from 'react';
import { MOCK_VIDEOS } from '../data/mockVideos';
import { useGlobalPlayer } from '../context/PlayerContext';

interface WatchScreenProps {
  videoId: string;
}

export function WatchScreen({ videoId }: WatchScreenProps) {
  const { playVideo, activeVideo } = useGlobalPlayer();
  const video = MOCK_VIDEOS.find((v) => v.id === videoId) || MOCK_VIDEOS[0];

  React.useEffect(() => {
    if (!activeVideo || activeVideo.id !== video.id) {
      playVideo(video);
    }
  }, [video, activeVideo, playVideo]);

  return null;
}
