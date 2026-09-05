import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, Typography } from '../constants/theme';
import { MOCK_SHORTS } from '../data/mockShorts';
import { formatLikes } from '../utils/formatters';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface ShortsScreenProps {
  shortId: string;
}

export function ShortsScreen({ shortId }: ShortsScreenProps) {
  const router = useRouter();
  const short = MOCK_SHORTS.find((s) => s.id === shortId) || MOCK_SHORTS[0];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Full-bleed background placeholder for Phase 1 */}
      <Image source={{ uri: short.thumbnailUrl }} style={styles.backgroundImage} />
      <View style={styles.darkGradient} />

      {/* Top Bar with Back Button */}
      <SafeAreaView style={styles.topBar} edges={['top']}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Shorts</Text>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="camera-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Right Interaction Sidebar */}
      <View style={styles.rightSidebar}>
        <TouchableOpacity style={styles.sidebarAction}>
          <Ionicons name="thumbs-up" size={28} color="#FFFFFF" />
          <Text style={styles.sidebarText}>{formatLikes(short.likes)}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sidebarAction}>
          <Ionicons name="thumbs-down-outline" size={28} color="#FFFFFF" />
          <Text style={styles.sidebarText}>Dislike</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sidebarAction}>
          <Ionicons name="chatbubble-ellipses" size={28} color="#FFFFFF" />
          <Text style={styles.sidebarText}>{formatLikes(short.commentsCount)}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sidebarAction}>
          <Ionicons name="arrow-redo" size={28} color="#FFFFFF" />
          <Text style={styles.sidebarText}>{formatLikes(short.sharesCount)}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.audioDisc}>
          <Image source={{ uri: short.creatorAvatar }} style={styles.discImage} />
        </TouchableOpacity>
      </View>

      {/* Bottom Metadata */}
      <SafeAreaView style={styles.bottomMeta} edges={['bottom']}>
        <View style={styles.creatorRow}>
          <Image source={{ uri: short.creatorAvatar }} style={styles.creatorAvatar} />
          <Text style={styles.creatorName}>@{short.creatorName}</Text>
          <TouchableOpacity style={styles.subscribeBadge}>
            <Text style={styles.subscribeText}>Subscribe</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.caption} numberOfLines={2}>
          {short.title}
        </Text>

        {short.songTitle && (
          <View style={styles.musicRow}>
            <Ionicons name="musical-notes" size={14} color="#FFFFFF" />
            <Text style={styles.musicTitle} numberOfLines={1}>
              {short.songTitle}
            </Text>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  darkGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    zIndex: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBarTitle: {
    color: '#FFFFFF',
    fontSize: Typography.fontSize.headline,
    fontWeight: '700',
  },
  rightSidebar: {
    position: 'absolute',
    right: Spacing.md,
    bottom: 110,
    alignItems: 'center',
    gap: 18,
    zIndex: 20,
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
    width: 36,
    height: 36,
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
    bottom: 0,
    left: 0,
    right: 80,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    zIndex: 20,
  },
  creatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  creatorAvatar: {
    width: 34,
    height: 34,
    borderRadius: Radius.full,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  creatorName: {
    color: '#FFFFFF',
    fontSize: Typography.fontSize.callout,
    fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowRadius: 4,
  },
  subscribeBadge: {
    backgroundColor: Colors.dark.primary,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: Radius.full,
  },
  subscribeText: {
    color: '#FFFFFF',
    fontSize: Typography.fontSize.caption,
    fontWeight: '700',
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
