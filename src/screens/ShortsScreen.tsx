import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ViewToken,
  LayoutChangeEvent,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MOCK_SHORTS } from '../data/mockShorts';
import { Short } from '../types/video';
import { ShortItem } from '../components/shorts/ShortItem';

interface ShortsScreenProps {
  shortId: string;
}

export function ShortsScreen({ shortId }: ShortsScreenProps) {
  const router = useRouter();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [containerHeight, setContainerHeight] = useState(windowHeight);

  // Find initial index matching initial shortId
  const initialIndex = Math.max(
    0,
    MOCK_SHORTS.findIndex((s) => s.id === shortId)
  );

  const [activeIndex, setActiveIndex] = useState<number>(initialIndex);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setActiveIndex(viewableItems[0].index);
      }
    }
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 60,
  }).current;

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    if (height > 0) {
      setContainerHeight(height);
    }
  }, []);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: containerHeight,
      offset: containerHeight * index,
      index,
    }),
    [containerHeight]
  );

  const renderShortItem = useCallback(
    ({ item, index }: { item: Short; index: number }) => (
      <ShortItem
        short={item}
        isActive={index === activeIndex}
        shouldMountPlayer={Math.abs(index - activeIndex) <= 1}
        width={windowWidth}
        height={containerHeight}
        onPressBack={handleBack}
      />
    ),
    [activeIndex, windowWidth, containerHeight, handleBack]
  );

  return (
    <View style={styles.container} onLayout={handleLayout}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <FlatList
        data={MOCK_SHORTS}
        keyExtractor={(item) => item.id}
        renderItem={renderShortItem}
        pagingEnabled={false}
        disableIntervalMomentum={true}
        snapToInterval={containerHeight}
        snapToAlignment="start"
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        initialScrollIndex={initialIndex}
        getItemLayout={getItemLayout}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        removeClippedSubviews={true}
        maxToRenderPerBatch={2}
        windowSize={3}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
});
