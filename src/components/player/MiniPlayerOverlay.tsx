import React, { useEffect, useCallback, useRef } from 'react';
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
  interpolateColor,
  Extrapolation,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, Typography } from '../../constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGlobalPlayer } from '../../context/PlayerContext';
import { VideoPlayer, VideoPlayerRef } from './VideoPlayer';
import { MOCK_VIDEOS } from '../../data/mockVideos';
import { formatLikes, formatViews } from '../../utils/formatters';

const MINI_PLAYER_HEIGHT = 64;
const TAB_BAR_HEIGHT = 56;

export function MiniPlayerOverlay() {
  const insets = useSafeAreaInsets();
  const { height: screenHeight, width: screenWidth } = useWindowDimensions();
  const { activeVideo, playerMode, playVideo, minimizePlayer, expandPlayer, closePlayer } =
    useGlobalPlayer();

  const playerRef = useRef<VideoPlayerRef>(null);
  const scrollViewRef = useRef<ScrollView>(null);
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
      translateY.value = withTiming(0, { duration: 220 });
    } else if (playerMode === 'mini') {
      translateY.value = withTiming(snapDistance, { duration: 220 });
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

  const handleTogglePlayPause = useCallback(() => {
    playerRef.current?.togglePlayPause();
  }, []);

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

  // Animated opacity for drag chevron header
  const dragHeaderAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [0, snapDistance * 0.3],
      [1, 0],
      Extrapolation.CLAMP
    );
    return { opacity };
  });

  // Animated styles for morphing card container
  const cardAnimatedStyle = useAnimatedStyle(() => {
    const marginH = interpolate(
      translateY.value,
      [0, snapDistance],
      [0, 12],
      Extrapolation.CLAMP
    );
    const cardHeight = interpolate(
      translateY.value,
      [0, snapDistance],
      [230, MINI_PLAYER_HEIGHT],
      Extrapolation.CLAMP
    );
    const borderRadius = interpolate(
      translateY.value,
      [0, snapDistance],
      [0, 12],
      Extrapolation.CLAMP
    );
    const bgColor = interpolateColor(
      translateY.value,
      [0, snapDistance],
      ['#000000', '#212121']
    );

    return {
      marginHorizontal: marginH,
      height: cardHeight,
      borderRadius,
      backgroundColor: bgColor,
    };
  });

  // Animated styles for morphing video viewport wrapper inside card
  const videoWrapperAnimatedStyle = useAnimatedStyle(() => {
    const width = interpolate(
      translateY.value,
      [0, snapDistance],
      [screenWidth, 96],
      Extrapolation.CLAMP
    );
    const height = interpolate(
      translateY.value,
      [0, snapDistance],
      [230, 52],
      Extrapolation.CLAMP
    );
    const borderRadius = interpolate(
      translateY.value,
      [0, snapDistance],
      [0, 8],
      Extrapolation.CLAMP
    );
    const marginTop = interpolate(
      translateY.value,
      [0, snapDistance],
      [0, 6],
      Extrapolation.CLAMP
    );
    const marginLeft = interpolate(
      translateY.value,
      [0, snapDistance],
      [0, 6],
      Extrapolation.CLAMP
    );

    return {
      width,
      height,
      borderRadius,
      marginTop,
      marginLeft,
    };
  });

  // Animated opacity for mini player controls
  const miniControlsAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [snapDistance * 0.7, snapDistance],
      [0, 1],
      Extrapolation.CLAMP
    );
    return { opacity };
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

  if (!activeVideo || playerMode === 'hidden') {
    return null;
  }

  const isMini = playerMode === 'mini';

  return (
    <Animated.View
      style={[styles.rootContainer, containerAnimatedStyle]}
      pointerEvents={isMini ? 'box-none' : 'auto'}
    >
      <View style={styles.contentWrapper} pointerEvents={isMini ? 'box-none' : 'auto'}>
        {/* Top Interactive Area (Pan Gesture enabled) */}
        <GestureDetector gesture={panGesture}>
          <Animated.View pointerEvents={isMini ? 'box-none' : 'auto'}>
            {/* Top Drag Header Chevron (Visible in full screen view) */}
            <Animated.View
              style={[styles.dragHeader, { top: Math.max(insets.top + 8, 16) }, dragHeaderAnimatedStyle]}
              pointerEvents={isMini ? 'none' : 'auto'}
            >
              <TouchableOpacity style={styles.minimizeBtn} onPress={handleMinimize}>
                <Ionicons name="chevron-down" size={28} color="#FFFFFF" />
              </TouchableOpacity>
              <View style={styles.dragPill} />
            </Animated.View>

            {/* Morphing Video & Mini Player Container */}
            <Animated.View style={[styles.mainCardContainer, cardAnimatedStyle]}>
              {/* Morphing Video Viewport Wrapper (Holds SINGLE persistent VideoPlayer) */}
              <Animated.View style={[styles.videoWrapper, videoWrapperAnimatedStyle]}>
                <VideoPlayer
                  ref={playerRef}
                  videoUrl={activeVideo.videoUrl}
                  thumbnailUrl={activeVideo.thumbnailUrl}
                  autoPlay={true}
                  showControls={!isMini}
                  onPlaybackStatusUpdate={handlePlaybackUpdate}
                  style={styles.fullPlayer}
                />
                {/* Transparent touch area on video surface in mini mode to expand */}
                {isMini && (
                  <Pressable
                    style={StyleSheet.absoluteFill}
                    onPress={handleExpand}
                  />
                )}
              </Animated.View>

              {/* Mini Player Metadata & Action Controls */}
              <Animated.View
                style={[styles.miniControlsRow, miniControlsAnimatedStyle]}
                pointerEvents={isMini ? 'auto' : 'none'}
              >
                <Pressable style={styles.miniMetaPressArea} onPress={handleExpand}>
                  <Text style={styles.miniCardTitle} numberOfLines={1}>
                    {activeVideo.title}
                  </Text>
                  <Text style={styles.miniCardCreator} numberOfLines={1}>
                    {activeVideo.creatorName}
                  </Text>
                </Pressable>

                <View style={styles.miniCardActions}>
                  <TouchableOpacity
                    style={styles.miniActionBtn}
                    onPress={(e) => {
                      e.stopPropagation();
                      handleTogglePlayPause();
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
              </Animated.View>

              {/* Mini Player Progress Accent Bar */}
              <Animated.View
                style={[styles.miniCardProgressTrack, miniControlsAnimatedStyle]}
                pointerEvents="none"
              >
                <View style={[styles.miniCardProgressFill, { width: `${progressPercent}%` }]} />
              </Animated.View>
            </Animated.View>
          </Animated.View>
        </GestureDetector>

        {/* Full View Details ScrollView */}
        <Animated.View
          style={[styles.detailsContainer, detailsAnimatedStyle]}
          pointerEvents={isMini ? 'none' : 'auto'}
        >
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
  },
  dragHeader: {
    position: 'absolute',
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
  mainCardContainer: {
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 10,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  videoWrapper: {
    position: 'absolute',
    backgroundColor: '#000000',
    overflow: 'hidden',
  },
  fullPlayer: {
    width: '100%',
    height: '100%',
  },
  miniControlsRow: {
    position: 'absolute',
    left: 108,
    right: 8,
    top: 0,
    bottom: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  miniMetaPressArea: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 8,
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
    paddingRight: 4,
  },
  miniActionBtn: {
    padding: 6,
  },
  miniCardProgressTrack: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
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
