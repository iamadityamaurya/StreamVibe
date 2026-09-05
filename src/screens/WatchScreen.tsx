import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, Typography } from '../constants/theme';
import { MOCK_VIDEOS } from '../data/mockVideos';
import { formatLikes, formatViews } from '../utils/formatters';

import { VideoPlayer } from '../components/player/VideoPlayer';

interface WatchScreenProps {
  videoId: string;
}

export function WatchScreen({ videoId }: WatchScreenProps) {
  const router = useRouter();
  const video = MOCK_VIDEOS.find((v) => v.id === videoId) || MOCK_VIDEOS[0];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Video Viewport Area with VideoPlayer */}
      <View style={styles.playerContainer}>
        <VideoPlayer
          videoUrl={video.videoUrl}
          thumbnailUrl={video.thumbnailUrl}
          autoPlay={true}
          showControls={true}
          style={styles.player}
        />
        <TouchableOpacity
          style={styles.backButtonOverlay}
          onPress={() => router.back()}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons name="chevron-down" size={28} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Video Details & Interaction Area */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
        {/* Title */}
        <Text style={styles.title}>{video.title}</Text>

        {/* View Count & Upload Date */}
        <Text style={styles.metadata}>
          {formatViews(video.views)} • {video.uploadedAt}
        </Text>

        {/* Action Row (Like, Share, Download, Save) */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.actionsRow}>
          <TouchableOpacity style={styles.actionChip}>
            <Ionicons name="thumbs-up-outline" size={18} color={Colors.dark.text} />
            <Text style={styles.actionChipText}>{formatLikes(video.likes)}</Text>
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

        {/* Channel Info Row */}
        <View style={styles.channelRow}>
          <Image source={{ uri: video.creatorAvatar }} style={styles.channelAvatar} />
          <View style={styles.channelMeta}>
            <Text style={styles.channelName}>{video.creatorName}</Text>
            <Text style={styles.channelSubscribers}>{video.creatorSubscribers} subscribers</Text>
          </View>
          <TouchableOpacity style={styles.subscribeBtn}>
            <Text style={styles.subscribeBtnText}>Subscribe</Text>
          </TouchableOpacity>
        </View>

        {/* Description Box */}
        <View style={styles.descriptionBox}>
          <Text style={styles.descriptionText}>{video.description}</Text>
        </View>

        {/* Up Next / Related Videos Header */}
        <Text style={styles.upNextHeader}>Related Videos</Text>

        {MOCK_VIDEOS.filter((v) => v.id !== video.id).slice(0, 5).map((related) => (
          <TouchableOpacity
            key={related.id}
            style={styles.relatedCard}
            onPress={() => router.push({ pathname: '/watch/[id]', params: { id: related.id } })}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  playerContainer: {
    width: '100%',
    height: 230,
    backgroundColor: '#000000',
    position: 'relative',
  },
  player: {
    width: '100%',
    height: '100%',
  },
  backButtonOverlay: {
    position: 'absolute',
    top: 12,
    left: 12,
    width: 36,
    height: 36,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 30,
  },
  contentContainer: {
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
