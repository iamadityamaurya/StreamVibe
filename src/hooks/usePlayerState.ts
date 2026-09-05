import { useState, useCallback } from 'react';
import { PlayerState } from '../types/video';

export interface UsePlayerStateReturn {
  playerState: PlayerState;
  setIsPlaying: (playing: boolean) => void;
  setProgress: (progress: number, currentTime?: number, duration?: number) => void;
  setIsBuffering: (buffering: boolean) => void;
  setIsMuted: (muted: boolean) => void;
  setError: (error: string | null) => void;
  resetState: () => void;
}

const initialPlayerState: PlayerState = {
  videoId: null,
  isPlaying: false,
  isMiniPlayer: false,
  progress: 0,
  currentTime: 0,
  duration: 0,
  isBuffering: true,
  isMuted: false,
  error: null,
};

export function usePlayerState(videoId?: string): UsePlayerStateReturn {
  const [playerState, setPlayerState] = useState<PlayerState>({
    ...initialPlayerState,
    videoId: videoId ?? null,
  });

  const setIsPlaying = useCallback((isPlaying: boolean) => {
    setPlayerState((prev) => ({ ...prev, isPlaying, error: null }));
  }, []);

  const setProgress = useCallback((progress: number, currentTime = 0, duration = 0) => {
    setPlayerState((prev) => ({
      ...prev,
      progress: Math.min(1, Math.max(0, progress)),
      currentTime,
      duration: duration || prev.duration,
    }));
  }, []);

  const setIsBuffering = useCallback((isBuffering: boolean) => {
    setPlayerState((prev) => ({ ...prev, isBuffering }));
  }, []);

  const setIsMuted = useCallback((isMuted: boolean) => {
    setPlayerState((prev) => ({ ...prev, isMuted }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setPlayerState((prev) => ({
      ...prev,
      error,
      isPlaying: false,
      isBuffering: false,
    }));
  }, []);

  const resetState = useCallback(() => {
    setPlayerState({
      ...initialPlayerState,
      videoId: videoId ?? null,
    });
  }, [videoId]);

  return {
    playerState,
    setIsPlaying,
    setProgress,
    setIsBuffering,
    setIsMuted,
    setError,
    resetState,
  };
}
