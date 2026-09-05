import React, { useState, useCallback, useEffect, memo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Short } from '../../types/video';
import { Colors, Spacing, Radius, Typography } from '../../constants/theme';
import { formatLikes } from '../../utils/formatters';
import { VideoPlayer } from '../player/VideoPlayer';

interface ShortItemProps {
  short: Short;
  isActive: boolean;
  shouldMountPlayer?: boolean;
  height: number;
  width: number;
  onPressBack?: () => void;
}

export const ShortItem = memo(
  function ShortItem({
    short,
    isActive,
    shouldMountPlayer = true,
    height,
    width,
    onPressBack,
  }: ShortItemProps) {
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const [likeCount, setLikeCount] = useState(short.likes);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isMuted, setIsMuted] = useState(true);

    useEffect(() => {
      console.log('[ShortItem] Active state updated:', {
        shortId: short.id,
        title: short.title,
        isActive,
        shouldMountPlayer,
        videoUrl: short.videoUrl,
      });
    }, [short.id, short.title, short.videoUrl, isActive, shouldMountPlayer]);

    const handleToggleLike = useCallback(() => {
      if (isLiked) {
        setIsLiked(false);
        setLikeCount((prev) => prev - 1);
      } else {
        setIsLiked(true);
        if (isDisliked) setIsDisliked(false);
        setLikeCount((prev) => prev + 1);
      }
    }, [isLiked, isDisliked]);

    const handleToggleDislike = useCallback(() => {
      if (isDisliked) {
        setIsDisliked(false);
      } else {
        setIsDisliked(true);
        if (isLiked) {
          setIsLiked(false);
          setLikeCount((prev) => prev - 1);
        }
      }
    }, [isDisliked, isLiked]);

    const handleToggleSubscribe = useCallback(() => {
      setIsSubscribed((prev) => !prev);
    }, []);

    const handleToggleMute = useCallback(() => {
      setIsMuted((prev) => !prev);
    }, []);

    return (
      <View style={[styles.container, { width, height }]}>
        {/* Full-Bleed Video Surface or Lightweight Poster Image */}
        {shouldMountPlayer ? (
          <VideoPlayer
            videoUrl={short.videoUrl}
            thumbnailUrl={short.thumbnailUrl}
            autoPlay={true}
            isLooping={true}
            muted={isMuted}
            isActive={isActive}
            showControls={false}
            contentFit="cover"
            style={StyleSheet.absoluteFillObject}
          />
        ) : (
          <Image
            source={{ uri: short.thumbnailUrl }}
            style={StyleSheet.absoluteFillObject}
            resizeMode="cover"
          />
        )}

        {/* Subtle Gradient Overlays for readable text & icons */}
        <View style={styles.topGradient} pointerEvents="none" />
        <View style={styles.bottomGradient} pointerEvents="none" />

        {/* Top Header Overlay with Back button */}
        {onPressBack && (
          <View style={styles.topHeader}>
            <TouchableOpacity
              style={styles.headerBtn}
              onPress={onPressBack}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Shorts</Text>
            <TouchableOpacity style={styles.headerBtn}>
              <Ionicons name="camera-outline" size={22} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        )}

        {/* Right Interaction Sidebar */}
        <View style={styles.rightSidebar}>
          {/* Like */}
          <TouchableOpacity style={styles.sidebarAction} onPress={handleToggleLike} activeOpacity={0.75}>
            <Ionicons
              name={isLiked ? 'thumbs-up' : 'thumbs-up-outline'}
              size={28}
              color={isLiked ? Colors.dark.primary : '#FFFFFF'}
            />
            <Text style={styles.sidebarText}>{formatLikes(likeCount)}</Text>
          </TouchableOpacity>

          {/* Dislike */}
          <TouchableOpacity style={styles.sidebarAction} onPress={handleToggleDislike} activeOpacity={0.75}>
            <Ionicons
              name={isDisliked ? 'thumbs-down' : 'thumbs-down-outline'}
              size={28}
              color={isDisliked ? Colors.dark.primary : '#FFFFFF'}
            />
            <Text style={styles.sidebarText}>Dislike</Text>
          </TouchableOpacity>

          {/* Comments */}
          <TouchableOpacity style={styles.sidebarAction} activeOpacity={0.75}>
            <Ionicons name="chatbubble-ellipses-outline" size={28} color="#FFFFFF" />
            <Text style={styles.sidebarText}>{formatLikes(short.commentsCount)}</Text>
          </TouchableOpacity>

          {/* Share */}
          <TouchableOpacity style={styles.sidebarAction} activeOpacity={0.75}>
            <Ionicons name="arrow-redo-outline" size={28} color="#FFFFFF" />
            <Text style={styles.sidebarText}>{formatLikes(short.sharesCount)}</Text>
          </TouchableOpacity>

          {/* Sound Toggle */}
          <TouchableOpacity style={styles.sidebarAction} onPress={handleToggleMute} activeOpacity={0.75}>
            <Ionicons name={isMuted ? 'volume-mute-outline' : 'volume-high-outline'} size={26} color="#FFFFFF" />
            <Text style={styles.sidebarText}>{isMuted ? 'Muted' : 'Sound'}</Text>
          </TouchableOpacity>

          {/* Audio Disc */}
          <View style={styles.audioDisc}>
            <Image source={{ uri: short.creatorAvatar }} style={styles.discImage} />
          </View>
        </View>

        {/* Bottom Metadata & Creator Overlay */}
        <View style={styles.bottomMeta}>
          <View style={styles.creatorRow}>
            <Image source={{ uri: short.creatorAvatar }} style={styles.creatorAvatar} />
            <Text style={styles.creatorName} numberOfLines={1}>
              @{short.creatorName}
            </Text>
            <TouchableOpacity
              style={[styles.subscribeBadge, isSubscribed && styles.subscribedBadge]}
              onPress={handleToggleSubscribe}
              activeOpacity={0.8}
            >
              <Text style={[styles.subscribeText, isSubscribed && styles.subscribedText]}>
                {isSubscribed ? 'Subscribed' : 'Subscribe'}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.caption} numberOfLines={2}>
            {short.title}
          </Text>

          {short.songTitle && (
            <View style={styles.musicRow}>
              <Ionicons name="musical-notes-outline" size={14} color="#FFFFFF" />
              <Text style={styles.musicTitle} numberOfLines={1}>
                {short.songTitle}
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  },
  (prev, next) =>
    prev.isActive === next.isActive &&
    prev.shouldMountPlayer === next.shouldMountPlayer &&
    prev.short.id === next.short.id &&
    prev.height === next.height &&
    prev.width === next.width
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    position: 'relative',
    overflow: 'hidden',
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: 'rgba(0,0,0,0.35)',
    zIndex: 10,
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 220,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 10,
  },
  topHeader: {
    position: 'absolute',
    top: 48,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    zIndex: 30,
  },
  headerBtn: {
    width: 38,
    height: 38,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: Typography.fontSize.headline,
    fontWeight: '700',
  },
  rightSidebar: {
    position: 'absolute',
    right: Spacing.md,
    bottom: 80,
    alignItems: 'center',
    gap: 18,
    zIndex: 30,
  },
  sidebarAction: {
    alignItems: 'center',
  },
  sidebarText: {
    color: '#FFFFFF',
    fontSize: Typography.fontSize.caption,
    fontWeight: '600',
    marginTop: 4,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowRadius: 4,
  },
  audioDisc: {
    width: 38,
    height: 38,
    borderRadius: Radius.full,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    overflow: 'hidden',
    marginTop: 8,
  },
  discImage: {
    width: '100%',
    height: '100%',
  },
  bottomMeta: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 80,
    paddingHorizontal: Spacing.lg,
    zIndex: 30,
  },
  creatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  creatorAvatar: {
    width: 36,
    height: 36,
    borderRadius: Radius.full,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  creatorName: {
    color: '#FFFFFF',
    fontSize: Typography.fontSize.callout,
    fontWeight: '700',
    maxWidth: 130,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowRadius: 4,
  },
  subscribeBadge: {
    backgroundColor: Colors.dark.primary,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: Radius.full,
  },
  subscribedBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  subscribeText: {
    color: '#FFFFFF',
    fontSize: Typography.fontSize.caption,
    fontWeight: '700',
  },
  subscribedText: {
    color: Colors.dark.textSecondary,
  },
  caption: {
    color: '#FFFFFF',
    fontSize: Typography.fontSize.body,
    lineHeight: 20,
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowRadius: 4,
  },
  musicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  musicTitle: {
    color: '#FFFFFF',
    fontSize: Typography.fontSize.subtext,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowRadius: 4,
  },
});
