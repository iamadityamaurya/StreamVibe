import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, Typography } from '../constants/theme';
import { CATEGORIES } from '../constants/categories';
import { MOCK_VIDEOS } from '../data/mockVideos';
import { MOCK_SHORTS } from '../data/mockShorts';
import { Video } from '../types/video';
import { formatDuration, formatViews } from '../utils/formatters';
import { useGlobalPlayer } from '../context/PlayerContext';

const VideoCardItem = React.memo(function VideoCardItem({
  video,
  onPress,
}: {
  video: Video;
  onPress: (video: Video) => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.88}
      style={styles.videoCard}
      onPress={() => onPress(video)}
    >
      <View style={styles.thumbnailWrapper}>
        <Image
          source={{ uri: video.thumbnailUrl }}
          style={styles.thumbnail}
          contentFit="cover"
          transition={150}
        />
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{formatDuration(video.duration)}</Text>
        </View>
      </View>

      <View style={styles.metaContainer}>
        <Image
          source={{ uri: video.creatorAvatar }}
          style={styles.avatar}
          contentFit="cover"
          transition={150}
        />
        <View style={styles.metaContent}>
          <Text style={styles.videoTitle} numberOfLines={2}>
            {video.title}
          </Text>
          <Text style={styles.creatorMeta} numberOfLines={1}>
            {video.creatorName} • {formatViews(video.views)} • {video.uploadedAt}
          </Text>
        </View>
        <TouchableOpacity style={styles.moreButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="ellipsis-vertical" size={18} color={Colors.dark.textSecondary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
});

export function HomeScreen() {
  const router = useRouter();
  const { playVideo } = useGlobalPlayer();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredVideos = selectedCategory === 'all'
    ? MOCK_VIDEOS
    : MOCK_VIDEOS.filter((v) => v.categoryId === selectedCategory);

  const handlePressVideo = useCallback((video: Video) => {
    playVideo(video);
  }, [playVideo]);

  const handlePressShort = useCallback((shortId: string) => {
    router.push({
      pathname: '/shorts/[id]',
      params: { id: shortId },
    });
  }, [router]);

  const renderVideoItem = useCallback(({ item }: { item: Video }) => (
    <VideoCardItem video={item} onPress={handlePressVideo} />
  ), [handlePressVideo]);

  const renderHeader = () => (
    <View style={styles.feedHeader}>
      {/* Category Pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryContainer}
      >
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <TouchableOpacity
              key={cat.id}
              style={[styles.categoryPill, isSelected && styles.categoryPillActive]}
              onPress={() => setSelectedCategory(cat.id)}
            >
              <Text style={[styles.categoryText, isSelected && styles.categoryTextActive]}>
                {cat.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Shorts Shelf Teaser */}
      <View style={styles.shortsShelf}>
        <View style={styles.shortsHeader}>
          <View style={styles.shortsHeaderLeft}>
            <Ionicons name="flash" size={20} color={Colors.dark.primary} />
            <Text style={styles.shortsTitle}>Shorts</Text>
          </View>
          <TouchableOpacity onPress={() => handlePressShort(MOCK_SHORTS[0].id)}>
            <Text style={styles.seeAllText}>View all</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.shortsRow}>
          {MOCK_SHORTS.slice(0, 5).map((short) => (
            <TouchableOpacity
              key={short.id}
              style={styles.shortItem}
              activeOpacity={0.85}
              onPress={() => handlePressShort(short.id)}
            >
              <Image source={{ uri: short.thumbnailUrl }} style={styles.shortThumb} />
              <View style={styles.shortOverlay}>
                <Text style={styles.shortItemTitle} numberOfLines={2}>
                  {short.title}
                </Text>
                <Text style={styles.shortViewsText}>
                  {formatViews(short.likes * 3)}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.dark.background} />

      {/* App Bar */}
      <View style={styles.appBar}>
        <View style={styles.logoRow}>
          <View style={styles.logoIconBg}>
            <Ionicons name="play" size={16} color="#FFFFFF" />
          </View>
          <Text style={styles.logoText}>StreamVibe</Text>
        </View>

        <View style={styles.appBarActions}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="search-outline" size={22} color={Colors.dark.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={22} color={Colors.dark.text} />
          </TouchableOpacity>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' }}
            style={styles.profileAvatar}
          />
        </View>
      </View>

      {/* Main Video List */}
      <FlatList
        data={filteredVideos}
        keyExtractor={(item) => item.id}
        renderItem={renderVideoItem}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.dark.border,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoIconBg: {
    width: 28,
    height: 28,
    borderRadius: Radius.sm,
    backgroundColor: Colors.dark.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: Colors.dark.text,
    fontSize: Typography.fontSize.headline,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  appBarActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconButton: {
    padding: 2,
  },
  profileAvatar: {
    width: 28,
    height: 28,
    borderRadius: Radius.full,
    borderWidth: 1.5,
    borderColor: Colors.dark.primary,
  },
  listContent: {
    paddingBottom: 40,
  },
  feedHeader: {
    paddingBottom: Spacing.md,
  },
  categoryContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: 8,
  },
  categoryPill: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: 7,
    borderRadius: Radius.full,
    backgroundColor: Colors.dark.surfaceElevated,
  },
  categoryPillActive: {
    backgroundColor: Colors.dark.text,
  },
  categoryText: {
    color: Colors.dark.text,
    fontSize: Typography.fontSize.body,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: Colors.dark.background,
    fontWeight: '600',
  },
  shortsShelf: {
    marginTop: Spacing.sm,
    marginBottom: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
    paddingBottom: Spacing.lg,
  },
  shortsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  shortsHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  shortsTitle: {
    color: Colors.dark.text,
    fontSize: Typography.fontSize.headline,
    fontWeight: '700',
  },
  seeAllText: {
    color: Colors.dark.accent,
    fontSize: Typography.fontSize.body,
    fontWeight: '600',
  },
  shortsRow: {
    paddingHorizontal: Spacing.lg,
    gap: 12,
  },
  shortItem: {
    width: 130,
    height: 220,
    borderRadius: Radius.md,
    overflow: 'hidden',
    backgroundColor: Colors.dark.surface,
  },
  shortThumb: {
    width: '100%',
    height: '100%',
  },
  shortOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  shortItemTitle: {
    color: Colors.dark.text,
    fontSize: Typography.fontSize.subtext,
    fontWeight: '600',
    marginBottom: 2,
  },
  shortViewsText: {
    color: Colors.dark.textSecondary,
    fontSize: Typography.fontSize.caption,
  },
  videoCard: {
    marginBottom: Spacing.xl,
  },
  thumbnailWrapper: {
    width: '100%',
    height: 220,
    backgroundColor: Colors.dark.surface,
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  durationBadge: {
    position: 'absolute',
    bottom: Spacing.sm,
    right: Spacing.sm,
    backgroundColor: Colors.dark.badgeBg,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: Radius.xs,
  },
  durationText: {
    color: Colors.dark.badgeText,
    fontSize: Typography.fontSize.caption,
    fontWeight: '600',
  },
  metaContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    alignItems: 'flex-start',
    gap: Spacing.md,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: Radius.full,
    backgroundColor: Colors.dark.surfaceElevated,
  },
  metaContent: {
    flex: 1,
  },
  videoTitle: {
    color: Colors.dark.text,
    fontSize: Typography.fontSize.callout,
    fontWeight: '600',
    lineHeight: 20,
    marginBottom: 4,
  },
  creatorMeta: {
    color: Colors.dark.textSecondary,
    fontSize: Typography.fontSize.subtext,
  },
  moreButton: {
    paddingTop: 2,
  },
});
