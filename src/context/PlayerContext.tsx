import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Video } from '../types/video';

export type PlayerMode = 'full' | 'mini' | 'hidden';

interface PlayerContextType {
  activeVideo: Video | null;
  playerMode: PlayerMode;
  isGlobalMuted: boolean;
  playVideo: (video: Video) => void;
  minimizePlayer: () => void;
  expandPlayer: () => void;
  closePlayer: () => void;
  toggleGlobalMute: () => void;
  setGlobalMuted: (muted: boolean) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const [playerMode, setPlayerMode] = useState<PlayerMode>('hidden');
  const [isGlobalMuted, setIsGlobalMutedState] = useState<boolean>(false);

  const playVideo = useCallback((video: Video) => {
    setActiveVideo(video);
    setPlayerMode('full');
  }, []);

  const minimizePlayer = useCallback(() => {
    if (activeVideo) {
      setPlayerMode('mini');
    }
  }, [activeVideo]);

  const expandPlayer = useCallback(() => {
    if (activeVideo) {
      setPlayerMode('full');
    }
  }, [activeVideo]);

  const closePlayer = useCallback(() => {
    setActiveVideo(null);
    setPlayerMode('hidden');
  }, []);

  const toggleGlobalMute = useCallback(() => {
    setIsGlobalMutedState((prev) => !prev);
  }, []);

  const setGlobalMuted = useCallback((muted: boolean) => {
    setIsGlobalMutedState(muted);
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        activeVideo,
        playerMode,
        isGlobalMuted,
        playVideo,
        minimizePlayer,
        expandPlayer,
        closePlayer,
        toggleGlobalMute,
        setGlobalMuted,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function useGlobalPlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('useGlobalPlayer must be used within a PlayerProvider');
  }
  return context;
}
