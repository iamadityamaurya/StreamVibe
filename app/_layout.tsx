import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import 'react-native-reanimated';

import { PlayerProvider } from '../src/context/PlayerContext';
import { MiniPlayerOverlay } from '../src/components/player/MiniPlayerOverlay';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <PlayerProvider>
          <Stack screenOptions={{ headerShown: false, animation: 'default' }}>
            <Stack.Screen name="index" />
            <Stack.Screen
              name="watch/[id]"
              options={{
                presentation: 'transparentModal',
                animation: 'none',
              }}
            />
            <Stack.Screen
              name="shorts/[id]"
              options={{
                presentation: 'fullScreenModal',
                animation: 'fade',
              }}
            />
          </Stack>
          <MiniPlayerOverlay />
          <StatusBar style="light" />
        </PlayerProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
});
