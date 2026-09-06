import React, { useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import { Image } from 'expo-image';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolation,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, Typography } from '../../constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGlobalPlayer } from '../../context/PlayerContext';
import { VideoPlayer } from './VideoPlayer';
import { MOCK_VIDEOS } from '../../data/mockVideos';
import { formatLikes, formatViews } from '../../utils/formatters';

const MINI_PLAYER_HEIGHT = 64;
const TAB_BAR_HEIGHT = 56;

export function MiniPlayerOverlay() {
  const insets = useSafeAreaInsets();
  const { height: screenHeight } = useWindowDimensions();
  const { activeVideo, playerMode, playVideo, minimizePlayer, expandPlayer, closePlayer } =
    useGlobalPlayer();

  const scrollViewRef = React.useRef<ScrollView>(null);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [progressPercent, setProgressPercent] = React.useState(0);

  const translateY = useSharedValue(screenHeight);
  const snapDistance = screenHeight - MINI_PLAYER_HEIGHT - TAB_BAR_HEIGHT - Math.max(insets.bottom, 8);

  useEffect(() => {
    if (activeVideo?.id) {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }
  }, [activeVideo?.id]);

  // React to playerMode changes
  useEffect(() => {
    if (playerMode === 'full') {
      translateY.value = withTiming(0, { duration: 200 });
    } else if (playerMode === 'mini') {
      translateY.value = withTiming(snapDistance, { duration: 200 });
    } else if (playerMode === 'hidden') {
      translateY.value = withTiming(screenHeight, { duration: 180 });
    }
  }, [playerMode, snapDistance, screenHeight, translateY]);

  const handleMinimize = useCallback(() => {
    minimizePlayer();
  }, [minimizePlayer]);

  const handleExpand = useCallback(() => {
    expandPlayer();
  }, [expandPlayer]);

  const handleClose = useCallback(() => {
    closePlayer();
  }, [closePlayer]);

  const handlePlaybackUpdate = useCallback((status: { isPlaying?: boolean; progress?: number }) => {
    if (typeof status.isPlaying === 'boolean') {
      setIsPlaying(status.isPlaying);
    }
    if (typeof status.progress === 'number') {
      setProgressPercent(Math.min(100, Math.max(0, status.progress * 100)));
    }
  }, []);

  // Real-time finger-driven Pan Gesture
  const panGesture = Gesture.Pan()
    .onChange((event) => {
      if (playerMode === 'full') {
        const nextY = Math.max(0, event.translationY);
        translateY.value = nextY;
      } else if (playerMode === 'mini') {
        const nextY = snapDistance + event.translationY;
        translateY.value = Math.max(0, nextY);
      }
    })
    .onEnd((event) => {
      if (playerMode === 'full') {
        if (event.translationY > 100 || event.velocityY > 500) {
          translateY.value = withTiming(snapDistance, { duration: 200 });
          runOnJS(handleMinimize)();
        } else {
          translateY.value = withTiming(0, { duration: 150 });
        }
      } else if (playerMode === 'mini') {
        if (event.translationY < -40 || event.velocityY < -400) {
          translateY.value = withTiming(0, { duration: 200 });
          runOnJS(handleExpand)();
        } else if (event.translationY > 60 || event.velocityY > 400) {
          translateY.value = withTiming(screenHeight, { duration: 180 });
          runOnJS(handleClose)();
        } else {
          translateY.value = withTiming(snapDistance, { duration: 150 });
        }
      }
    });

  // Animated styles for root overlay container
  const containerAnimatedStyle = useAnimatedStyle(() => {
    const isMiniMode = translateY.value > snapDistance * 0.5;
    return {
      transform: [{ translateY: translateY.value }],
      backgroundColor: isMiniMode ? 'transparent' : '#0F0F0F',
    };
  });

  // Animated opacity for full details content
  const detailsAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [0, snapDistance * 0.4],
      [1, 0],
      Extrapolation.CLAMP
    );
    return { opacity };
  });

  // Animated styles for mini player bar overlay
  const miniBarAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [snapDistance * 0.6, snapDistance],
      [0, 1],
      Extrapolation.CLAMP
    );
    return { opacity };
  });

  if (!activeVideo || playerMode === 'hidden') {
    return null;
  }

  const isMini = playerMode === 'mini';

  return (
    <Animated.View style={[styles.rootContainer, containerAnimatedStyle]} pointerEvents={isMini ? 'box-none' : 'auto'}>
      <View style={styles.contentWrapper} pointerEvents={isMini ? 'box-none' : 'auto'}>
        {/* Top Interactive Area (Pan Gesture enabled for minimization) */}
        <GestureDetector gesture={panGesture}>
          <Animated.View>
            {/* Top Drag Indicator / Header Overlay (Visible when Fullscreen) */}
            {!isMini && (
              <View style={[styles.dragHeader, { top: Math.max(insets.top + 8, 16) }]}>
                <TouchableOpacity style={styles.minimizeBtn} onPress={handleMinimize}>
                  <Ionicons name="chevron-down" size={28} color="#FFFFFF" />
                </TouchableOpacity>
                <View style={styles.dragPill} />
              </View>
            )}

            {/* Main Video Viewport or Modern YouTube Floating Mini Player Card */}
            {isMini ? (
              <Animated.View style={[styles.miniFloatingCard, miniBarAnimatedStyle]}>
                <Pressable style={styles.miniCardPressArea} onPress={handleExpand}>
                  {/* Left: 16:9 Video Surface */}
                  <View style={styles.miniCardVideoContainer}>
                    <VideoPlayer
                      videoUrl={activeVideo.videoUrl}
                      thumbnailUrl={activeVideo.thumbnailUrl}
                      autoPlay={true}
                      showControls={false}
                      onPlaybackStatusUpdate={handlePlaybackUpdate}
                      style={styles.fullPlayer}
                    />
                  </View>

                  {/* Middle: Video Title & Creator Meta */}
                  <View style={styles.miniCardMeta}>
                    <Text style={styles.miniCardTitle} numberOfLines={1}>
                      {activeVideo.title}
                    </Text>
                    <Text style={styles.miniCardCreator} numberOfLines={1}>
                      {activeVideo.creatorName}
                    </Text>
                  </View>

                  {/* Right: Actions (Play/Pause + Close) */}
                  <View style={styles.miniCardActions}>
                    <TouchableOpacity
                      style={styles.miniActionBtn}
                      onPress={(e) => {
                        e.stopPropagation();
                        // Toggle play/pause
                        handlePlaybackUpdate({ isPlaying: !isPlaying });
                      }}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                      <Ionicons name={isPlaying ? 'pause' : 'play'} size={20} color="#FFFFFF" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.miniActionBtn}
                      onPress={(e) => {
                        e.stopPropagation();
                        handleClose();
                      }}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                      <Ionicons name="close" size={22} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                </Pressable>

                {/* Bottom Red Accent Progress Bar */}
                <View style={styles.miniCardProgressTrack}>
                  <View style={[styles.miniCardProgressFill, { width: `${progressPercent}%` }]} />
                </View>
              </Animated.View>
            ) : (
              <View style={styles.fullVideoViewport}>
                <VideoPlayer
                  videoUrl={activeVideo.videoUrl}
                  thumbnailUrl={activeVideo.thumbnailUrl}
                  autoPlay={true}
                  showControls={true}
                  onPlaybackStatusUpdate={handlePlaybackUpdate}
                  style={styles.fullPlayer}
                />
              </View>
            )}
          </Animated.View>
        </GestureDetector>

        {/* Full Screen Scrollable Details (Independent Smooth Scrolling) */}
        <Animated.View style={[styles.detailsContainer, detailsAnimatedStyle]} pointerEvents={isMini ? 'none' : 'auto'}>
            <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
              <Text style={styles.title}>{activeVideo.title}</Text>
              <Text style={styles.metadata}>
                {formatViews(activeVideo.views)} • {activeVideo.uploadedAt}
              </Text>

              {/* Action Buttons */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.actionsRow}>
                <TouchableOpacity style={styles.actionChip}>
                  <Ionicons name="thumbs-up-outline" size={18} color={Colors.dark.text} />
                  <Text style={styles.actionChipText}>{formatLikes(activeVideo.likes)}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionChip}>
                  <Ionicons name="share-social-outline" size={18} color={Colors.dark.text} />
                  <Text style={styles.actionChipText}>Share</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionChip}>
                  <Ionicons name="arrow-down-circle-outline" size={18} color={Colors.dark.text} />
                  <Text style={styles.actionChipText}>Download</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionChip}>
                  <Ionicons name="bookmark-outline" size={18} color={Colors.dark.text} />
                  <Text style={styles.actionChipText}>Save</Text>
                </TouchableOpacity>
              </ScrollView>

              {/* Creator Channel Row */}
              <View style={styles.channelRow}>
                <Image source={{ uri: activeVideo.creatorAvatar }} style={styles.channelAvatar} />
                <View style={styles.channelMeta}>
                  <Text style={styles.channelName}>{activeVideo.creatorName}</Text>
                  <Text style={styles.channelSubscribers}>{activeVideo.creatorSubscribers} subscribers</Text>
                </View>
                <TouchableOpacity style={styles.subscribeBtn}>
                  <Text style={styles.subscribeBtnText}>Subscribe</Text>
                </TouchableOpacity>
              </View>

              {/* Description Box */}
              <View style={styles.descriptionBox}>
                <Text style={styles.descriptionText}>{activeVideo.description}</Text>
              </View>

              {/* Related Videos */}
              <Text style={styles.upNextHeader}>Related Videos</Text>
              {MOCK_VIDEOS.filter((v) => v.id !== activeVideo.id).slice(0, 5).map((related) => (
                <TouchableOpacity
                  key={related.id}
                  style={styles.relatedCard}
                  activeOpacity={0.8}
                  onPress={() => playVideo(related)}
                >
                  <Image source={{ uri: related.thumbnailUrl }} style={styles.relatedThumb} />
                  <View style={styles.relatedMeta}>
                    <Text style={styles.relatedTitle} numberOfLines={2}>
                      {related.title}
                    </Text>
                    <Text style={styles.relatedSub} numberOfLines={1}>
                      {related.creatorName} • {formatViews(related.views)}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>
        </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0F0F0F',
    zIndex: 999,
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  dragHeader: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 50,
  },
  minimizeBtn: {
    width: 36,
    height: 36,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dragPill: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.4)',
    alignSelf: 'center',
  },
  fullVideoViewport: {
    width: '100%',
    height: 230,
    backgroundColor: '#000000',
  },
  fullPlayer: {
    width: '100%',
    height: '100%',
  },
  miniFloatingCard: {
    marginHorizontal: 12,
    height: MINI_PLAYER_HEIGHT,
    backgroundColor: '#212121',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 10,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  miniCardPressArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  miniCardVideoContainer: {
    width: 96,
    height: 52,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#000000',
  },
  miniCardMeta: {
    flex: 1,
    marginLeft: 10,
    marginRight: 8,
    justifyContent: 'center',
  },
  miniCardTitle: {
    color: '#FFFFFF',
    fontSize: Typography.fontSize.subtext,
    fontWeight: '700',
  },
  miniCardCreator: {
    color: Colors.dark.textSecondary,
    fontSize: Typography.fontSize.caption,
    marginTop: 2,
  },
  miniCardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingRight: 8,
  },
  miniActionBtn: {
    padding: 6,
  },
  miniCardProgressTrack: {
    width: '100%',
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  miniCardProgressFill: {
    height: '100%',
    backgroundColor: Colors.dark.primary,
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: 40,
  },
  title: {
    color: Colors.dark.text,
    fontSize: Typography.fontSize.headline,
    fontWeight: '700',
    lineHeight: 24,
    marginBottom: 6,
  },
  metadata: {
    color: Colors.dark.textSecondary,
    fontSize: Typography.fontSize.subtext,
    marginBottom: Spacing.md,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: Spacing.lg,
  },
  actionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.dark.surfaceElevated,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: Radius.full,
  },
  actionChipText: {
    color: Colors.dark.text,
    fontSize: Typography.fontSize.subtext,
    fontWeight: '600',
  },
  channelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.dark.border,
    marginBottom: Spacing.lg,
  },
  channelAvatar: {
    width: 42,
    height: 42,
    borderRadius: Radius.full,
    marginRight: Spacing.md,
  },
  channelMeta: {
    flex: 1,
  },
  channelName: {
    color: Colors.dark.text,
    fontSize: Typography.fontSize.callout,
    fontWeight: '700',
  },
  channelSubscribers: {
    color: Colors.dark.textSecondary,
    fontSize: Typography.fontSize.caption,
  },
  subscribeBtn: {
    backgroundColor: Colors.dark.text,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: Radius.full,
  },
  subscribeBtnText: {
    color: Colors.dark.background,
    fontSize: Typography.fontSize.subtext,
    fontWeight: '700',
  },
  descriptionBox: {
    backgroundColor: Colors.dark.surfaceElevated,
    padding: Spacing.md,
    borderRadius: Radius.md,
    marginBottom: Spacing.xl,
  },
  descriptionText: {
    color: Colors.dark.textSecondary,
    fontSize: Typography.fontSize.body,
    lineHeight: 20,
  },
  upNextHeader: {
    color: Colors.dark.text,
    fontSize: Typography.fontSize.title,
    fontWeight: '700',
    marginBottom: Spacing.md,
  },
  relatedCard: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
    gap: Spacing.md,
  },
  relatedThumb: {
    width: 120,
    height: 70,
    borderRadius: Radius.sm,
    backgroundColor: Colors.dark.surface,
  },
  relatedMeta: {
    flex: 1,
    justifyContent: 'center',
  },
  relatedTitle: {
    color: Colors.dark.text,
    fontSize: Typography.fontSize.subtext,
    fontWeight: '600',
    lineHeight: 18,
    marginBottom: 4,
  },
  relatedSub: {
    color: Colors.dark.textSecondary,
    fontSize: Typography.fontSize.caption,
  },
});
