import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
  LayoutChangeEvent,
  PanResponder,
} from 'react-native';
import { Image } from 'expo-image';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Typography } from '../../constants/theme';
import { VideoPlayerProps } from '../../types/video';
import { formatDuration } from '../../utils/formatters';
import { usePlayerState } from '../../hooks/usePlayerState';
import { useGlobalPlayer } from '../../context/PlayerContext';

export interface VideoPlayerRef {
  play: () => void;
  pause: () => void;
  togglePlayPause: () => void;
}

export const VideoPlayer = React.forwardRef<VideoPlayerRef, VideoPlayerProps>(
  function VideoPlayer(
    {
      videoUrl,
      thumbnailUrl,
      autoPlay = true,
      isLooping = false,
      muted = false,
      isActive = true,
      showControls = true,
      nativeControls,
      showCenterPlayIcon = false,
      onPlaybackStatusUpdate,
      onError,
      onEnd,
      style,
      contentFit = 'contain',
    },
    ref
  ) {
  const { playerState, setIsPlaying, setProgress, setIsBuffering, setIsMuted, setError } =
    usePlayerState();
  const globalPlayer = useGlobalPlayer();
  const effectiveMuted = globalPlayer ? globalPlayer.isGlobalMuted : muted;

  const [controlsVisible, setControlsVisible] = useState(showControls);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const videoViewRef = useRef<VideoView>(null);
  const userPausedRef = useRef(false);
  const playerStateRef = useRef(playerState);
  playerStateRef.current = playerState;

  // Reset userPausedRef and isEnded state when videoUrl changes
  useEffect(() => {
    userPausedRef.current = false;
    setIsEnded(false);
  }, [videoUrl]);

  // Initialize expo-video player instance
  const player = useVideoPlayer(videoUrl, (p) => {
    p.loop = isLooping;
    p.muted = effectiveMuted;
  });

  // Ensure playback starts after VideoView DOM element mounts
  useEffect(() => {
    if (!player) return;

    let isSubscribed = true;
    const playVideo = () => {
      if (isSubscribed && isActive && autoPlay && !userPausedRef.current) {
        try {
          player.play();
        } catch (e) {
          console.warn('Autoplay error:', e);
        }
      }
    };

    // Immediate attempt
    playVideo();

    // Secondary attempt after VideoView mounts element
    const timer = setTimeout(playVideo, 150);

    return () => {
      isSubscribed = false;
      clearTimeout(timer);
      try {
        player.pause();
      } catch {
        // ignore
      }
    };
  }, [player, isActive, autoPlay, videoUrl]);

  // Sync source if videoUrl changes
  useEffect(() => {
    if (player) {
      setError(null);
      setIsBuffering(true);
    }
  }, [videoUrl, player, setError, setIsBuffering]);

  // Check initial ready status
  useEffect(() => {
    if (player && player.status === 'readyToPlay') {
      setIsBuffering(false);
      setError(null);
    }
  }, [player, setIsBuffering, setError, videoUrl]);

  // Handle active status (play/pause synchronization)
  useEffect(() => {
    if (!player) return;

    if (isActive) {
      if (autoPlay && !userPausedRef.current) {
        try {
          player.play();
        } catch (err) {
          console.warn('[VideoPlayer] Play error on active:', err);
        }
      }
    } else {
      player.pause();
    }
  }, [isActive, autoPlay, player, videoUrl]);

  // Sync mute setting
  useEffect(() => {
    if (player) {
      player.muted = effectiveMuted;
      setIsMuted(effectiveMuted);
    }
  }, [effectiveMuted, player, setIsMuted]);

  // Register expo-video event listeners
  useEffect(() => {
    if (!player) return;

    const subscriptions = [
      player.addListener('playingChange', (event) => {
        setIsPlaying(event.isPlaying);
        if (event.isPlaying) {
          setIsBuffering(false);
          setError(null);
        }
        onPlaybackStatusUpdate?.({ isPlaying: event.isPlaying });
      }),

      player.addListener('statusChange', (event) => {
        if (event.status === 'loading') {
          setIsBuffering(true);
        } else if (event.status === 'readyToPlay') {
          setIsBuffering(false);
          setError(null);
          if (isActive && autoPlay && !userPausedRef.current) {
            try {
              player.play();
            } catch (err) {
              console.warn('[VideoPlayer] Error playing on readyToPlay:', err);
            }
          }
        } else if (event.status === 'error') {
          console.warn('[VideoPlayer] Stream status error:', videoUrl, event);
          if (!playerStateRef.current.isPlaying && playerStateRef.current.currentTime === 0) {
            setIsBuffering(false);
            const errorMsg = 'Failed to load video stream';
            setError(errorMsg);
            onError?.(errorMsg);
          }
        }
      }),

      player.addListener('timeUpdate', (event) => {
        if (isSeekingRef.current) return;

        try {
          const duration = player.duration || 1;
          const currentTime = event.currentTime || 0;
          const progress = currentTime / duration;

          if (currentTime > 0) {
            setIsBuffering(false);
            setError(null);
          }

          setProgress(progress, currentTime, duration);
          onPlaybackStatusUpdate?.({
            progress,
            currentTime,
            duration,
          });
        } catch {
          // ignore released player
        }
      }),

      player.addListener('playToEnd', () => {
        onEnd?.();
        if (!isLooping) {
          setIsPlaying(false);
          setIsEnded(true);
        }
      }),
    ];

    try {
      player.timeUpdateEventInterval = 0.1;
    } catch {
      // ignore
    }

    return () => {
      subscriptions.forEach((sub) => sub?.remove?.());
    };
  }, [player, isActive, autoPlay, videoUrl, setIsPlaying, setIsBuffering, setError, setProgress, onError, onEnd, isLooping, onPlaybackStatusUpdate]);

  const handleReplay = useCallback(() => {
    if (!player) return;
    setError(null);
    userPausedRef.current = false;
    setIsEnded(false);
    try {
      player.currentTime = 0;
    } catch {
      try {
        player.seekBy(-10000);
      } catch (e) {
        console.warn('Replay seek error:', e);
      }
    }
    try {
      player.play();
      setIsPlaying(true);
      onPlaybackStatusUpdate?.({ isPlaying: true, progress: 0, currentTime: 0 });
    } catch (e) {
      console.warn('Replay error:', e);
    }
  }, [player, setError, setIsPlaying, onPlaybackStatusUpdate]);

  const handleTogglePlayPause = useCallback(() => {
    if (!player) return;

    if (isEnded) {
      handleReplay();
      return;
    }

    setError(null);
    let isCurrentlyPlaying = playerStateRef.current.isPlaying;
    try {
      if (typeof player.playing === 'boolean') {
        isCurrentlyPlaying = player.playing;
      }
    } catch {
      // ignore
    }
    const nextState = !isCurrentlyPlaying;

    if (isCurrentlyPlaying) {
      userPausedRef.current = true;
      try {
        player.pause();
      } catch (e) {
        console.warn('User pause error:', e);
      }
    } else {
      userPausedRef.current = false;
      try {
        player.play();
      } catch (e) {
        console.warn('User play error:', e);
      }
    }

    setIsPlaying(nextState);
    onPlaybackStatusUpdate?.({ isPlaying: nextState });
  }, [player, isEnded, handleReplay, setError, setIsPlaying, onPlaybackStatusUpdate]);

  React.useImperativeHandle(
    ref,
    () => ({
      play: () => {
        if (!player) return;
        userPausedRef.current = false;
        try {
          player.play();
          setIsPlaying(true);
          onPlaybackStatusUpdate?.({ isPlaying: true });
        } catch (e) {
          console.warn('Imperative play error:', e);
        }
      },
      pause: () => {
        if (!player) return;
        userPausedRef.current = true;
        try {
          player.pause();
          setIsPlaying(false);
          onPlaybackStatusUpdate?.({ isPlaying: false });
        } catch (e) {
          console.warn('Imperative pause error:', e);
        }
      },
      togglePlayPause: handleTogglePlayPause,
    }),
    [player, handleTogglePlayPause, setIsPlaying, onPlaybackStatusUpdate]
  );

  const handleToggleMute = useCallback(() => {
    if (globalPlayer) {
      globalPlayer.toggleGlobalMute();
    } else if (player) {
      try {
        const newMutedState = !player.muted;
        player.muted = newMutedState;
        setIsMuted(newMutedState);
      } catch (e) {
        console.warn('Mute toggle error:', e);
      }
    }
  }, [globalPlayer, player, setIsMuted]);

  const progressBarRef = useRef<View>(null);
  const progressBarWidthRef = useRef(0);
  const progressBarPageXRef = useRef(0);
  const isSeekingRef = useRef(false);

  const updatePageOffset = useCallback(() => {
    progressBarRef.current?.measureInWindow((x) => {
      if (typeof x === 'number' && x >= 0) {
        progressBarPageXRef.current = x;
      }
    });
  }, []);

  const handleProgressBarLayout = useCallback((e: LayoutChangeEvent) => {
    const { width } = e.nativeEvent.layout;
    if (width > 0) {
      progressBarWidthRef.current = width;
      updatePageOffset();
    }
  }, [updatePageOffset]);

  const handleSeekLocation = useCallback(
    (pageX: number) => {
      const width = progressBarWidthRef.current;
      if (!player || width <= 0) return;

      try {
        const duration = player.duration || 1;
        const offsetX = progressBarPageXRef.current;
        const touchX = pageX - offsetX;
        const clampedX = Math.max(0, Math.min(touchX, width));
        const seekPercent = clampedX / width;
        const targetTime = seekPercent * duration;

        player.currentTime = targetTime;
        setProgress(seekPercent, targetTime, duration);
      } catch (err) {
        console.warn('[VideoPlayer] Seek error (player released):', err);
      }
    },
    [player, setProgress]
  );

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (evt) => {
        isSeekingRef.current = true;
        updatePageOffset();
        handleSeekLocation(evt.nativeEvent.pageX);
      },
      onPanResponderMove: (evt) => {
        handleSeekLocation(evt.nativeEvent.pageX);
      },
      onPanResponderRelease: (evt) => {
        handleSeekLocation(evt.nativeEvent.pageX);
        isSeekingRef.current = false;
      },
      onPanResponderTerminate: () => {
        isSeekingRef.current = false;
      },
    })
  ).current;

  const handleRetry = useCallback(() => {
    if (!player) return;
    setError(null);
    setIsBuffering(true);
    try {
      player.replace(videoUrl);
      player.play();
    } catch (e) {
      console.warn('Retry error:', e);
    }
  }, [player, videoUrl, setError, setIsBuffering]);

  const handleToggleFullscreen = useCallback(async () => {
    if (!videoViewRef.current) return;
    try {
      if (isFullscreen) {
        await videoViewRef.current.exitFullscreen();
      } else {
        await videoViewRef.current.enterFullscreen();
      }
    } catch (err) {
      console.warn('[VideoPlayer] Fullscreen toggle error:', err);
    }
  }, [isFullscreen]);

  const toggleControls = useCallback(() => {
    if (showControls) {
      setControlsVisible((prev) => !prev);
    } else {
      // Tap on borderless player (Shorts) toggles play/pause
      handleTogglePlayPause();
    }
  }, [showControls, handleTogglePlayPause]);

  const useNative = nativeControls ?? isFullscreen;

  return (
    <View style={[styles.container, style]}>
      {/* Video Surface */}
      <VideoView
        ref={videoViewRef}
        player={player}
        style={styles.videoView}
        contentFit={contentFit}
        nativeControls={useNative}
        fullscreenOptions={{
          enable: true,
          orientation: 'landscape',
        }}
        onFullscreenEnter={() => setIsFullscreen(true)}
        onFullscreenExit={() => setIsFullscreen(false)}
      />

      {/* Touch Backdrop over Video Surface (catches taps when custom controls overlay is hidden, bypassed when prebuilt native controls are active) */}
      {!useNative && <Pressable style={StyleSheet.absoluteFill} onPress={toggleControls} />}

      {/* Poster / Thumbnail when buffering initially */}
      {thumbnailUrl && playerState.isBuffering && playerState.currentTime === 0 && (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          <Image
            source={{ uri: thumbnailUrl }}
            style={styles.thumbnailOverlay}
            contentFit="cover"
          />
        </View>
      )}

      {/* Buffering Indicator */}
      {playerState.isBuffering && !playerState.error && (
        <View style={styles.centerOverlay} pointerEvents="none">
          <ActivityIndicator size="large" color={Colors.dark.primary} />
        </View>
      )}

      {/* Error Fallback Overlay */}
      {playerState.error && (
        <View style={styles.errorOverlay}>
          <Ionicons name="alert-circle-outline" size={40} color="#FF453A" />
          <Text style={styles.errorText}>Unable to play video</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry} activeOpacity={0.8}>
            <Ionicons name="refresh" size={16} color="#FFFFFF" />
            <Text style={styles.retryText}>Tap to retry</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Replay Overlay when video ends */}
      {isEnded && !playerState.isBuffering && !playerState.error && (
        <TouchableOpacity
          style={styles.centerOverlay}
          onPress={handleReplay}
          activeOpacity={0.85}
        >
          <View style={styles.playPauseBtn}>
            <Ionicons name="reload" size={30} color="#FFFFFF" />
          </View>
          <Text style={styles.replayText}>Replay</Text>
        </TouchableOpacity>
      )}

      {/* Center Play Icon in Vertical View (stays visible when video is paused and not ended) */}
      {!isEnded && showCenterPlayIcon && !playerState.isPlaying && !playerState.isBuffering && !playerState.error && (
        <View style={styles.centerOverlay} pointerEvents="none">
          <View style={styles.playPauseBtn}>
            <Ionicons name="play" size={34} color="#FFFFFF" />
          </View>
        </View>
      )}

      {/* Touch Controls Overlay */}
      {showControls && controlsVisible && !playerState.error && (
        <Pressable
          style={styles.controlsOverlay}
          onPress={toggleControls}
        >
          {/* Top Mute Control */}
          <View style={styles.topControls}>
            <TouchableOpacity
              style={styles.controlIconBg}
              onPress={(e) => {
                e.stopPropagation();
                handleToggleMute();
              }}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons
                name={playerState.isMuted ? 'volume-mute' : 'volume-high'}
                size={18}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>

          {/* Play / Pause / Replay Center Button */}
          <TouchableOpacity
            style={styles.playPauseBtn}
            onPress={(e) => {
              e.stopPropagation();
              if (isEnded) {
                handleReplay();
              } else {
                handleTogglePlayPause();
              }
            }}
            activeOpacity={0.8}
          >
            <Ionicons
              name={isEnded ? 'reload' : playerState.isPlaying ? 'pause' : 'play'}
              size={32}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          {/* Bottom Bar: Interactive Progress Bar & Time text */}
          <Pressable
            style={styles.bottomBar}
            onPress={(e) => e.stopPropagation()}
          >
            <View
              ref={progressBarRef}
              style={styles.progressBarContainer}
              onLayout={handleProgressBarLayout}
              {...panResponder.panHandlers}
            >
              <View style={styles.progressBarBg} pointerEvents="none">
                <View
                  style={[
                    styles.progressBarFill,
                    { width: `${Math.min(100, Math.max(0, (playerState.progress || 0) * 100))}%` },
                  ]}
                  pointerEvents="none"
                />
                <View
                  style={[
                    styles.scrubberKnob,
                    { left: `${Math.min(100, Math.max(0, (playerState.progress || 0) * 100))}%` },
                  ]}
                  pointerEvents="none"
                />
              </View>
            </View>

            <View style={styles.timeAndFullscreenRow}>
              <Text style={styles.timeText}>
                {formatDuration(playerState.currentTime)} / {formatDuration(playerState.duration)}
              </Text>
              <TouchableOpacity
                style={styles.fullscreenBtn}
                onPress={(e) => {
                  e.stopPropagation();
                  handleToggleFullscreen();
                }}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                activeOpacity={0.8}
              >
                <Ionicons
                  name={isFullscreen ? 'contract' : 'expand'}
                  size={20}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  thumbnailOverlay: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  centerOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  replayText: {
    color: '#FFFFFF',
    fontSize: Typography.fontSize.caption,
    fontWeight: '600',
    marginTop: 6,
  },
  errorOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15,15,15,0.92)',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    padding: 20,
    zIndex: 30,
  },
  errorText: {
    color: '#FFFFFF',
    fontSize: Typography.fontSize.callout,
    fontWeight: '600',
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.dark.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: Radius.full,
    marginTop: 4,
  },
  retryText: {
    color: '#FFFFFF',
    fontSize: Typography.fontSize.subtext,
    fontWeight: '600',
  },
  controlsOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'space-between',
    padding: 12,
    zIndex: 20,
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop : 14,
    marginRight: 4,
  },
  controlIconBg: {
    width: 32,
    height: 32,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playPauseBtn: {
    width: 56,
    height: 56,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 2,
  },
  bottomBar: {
    gap: 4,
  },
  progressBarContainer: {
    width: '100%',
    height: 18,
    justifyContent: 'center',
  },
  progressBarBg: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    position: 'relative',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.dark.primary,
    borderRadius: 2,
  },
  scrubberKnob: {
    position: 'absolute',
    top: -4,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.dark.primary,
    marginLeft: -6,
  },
  timeText: {
    color: '#FFFFFF',
    fontSize: Typography.fontSize.caption,
    fontWeight: '500',
  },
  timeAndFullscreenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  fullscreenBtn: {
    padding: 4,
    borderRadius: Radius.xs,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
});
