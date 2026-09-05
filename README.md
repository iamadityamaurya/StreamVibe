# StreamVibe — Video-First Mobile Application

StreamVibe is a production-quality, video-first React Native mobile application built for high performance, smooth gesture interactions, and reliable video lifecycle management. Designed using **Expo SDK 54**, **Expo Router**, **`expo-video`**, **React Native Reanimated**, and **Gesture Handler**.

---

## 🚀 Key Features

- **Home Feed**: Virtualized 20-video feed with rich metadata (duration badge, views, upload date, creator avatars).
- **Horizontal Category Row**: Instant category filtering with visual touch feedback.
- **Shorts Experience**: Full-screen vertical Shorts feed with 60fps swiping, auto-play, interaction sidebar, and metadata overlay.
- **Single-Video Swipe Snap Clamping**: Configured FlatList snap physics (`disableIntervalMomentum={true}`) so rapid swiping stops strictly at the next video (exactly 1 video per swipe gesture).
- **Global Video Orchestration (`PlayerContext`)**: Centralized player state allowing continuous, uninterrupted video playback when transitioning between full screen Watch mode and bottom Mini Player mode.
- **Real-Time Finger-Driven Mini Player**: Downward drag gesture tracks finger movement in real time on the UI thread, scaling down the Watch screen into a modern YouTube-style floating mini player (`104px x 58px` 16:9 video container).
- **Global Mute State Synchronization**: Single global audio setting (`isGlobalMuted`) that persists seamlessly across play/pause states and video switches.
- **Hardware-Accelerated Image Caching**: Powered by `expo-image` for memory and disk image caching.
- **Device Safe Area Handling**: Integrated `useSafeAreaInsets` to dynamically position top header controls below device status bars and camera cutouts.

---

## 🛠 Tech Stack & Rationale

| Technology | Selection Rationale |
| :--- | :--- |
| **React Native (0.81) / Expo (SDK 54)** | Modern, stable platform with direct native module access. |
| **Expo Router v4** | File-based routing providing clean navigation transitions. |
| **`expo-video`** | Next-generation React Native video library backed by ExoPlayer (Android) and AVPlayer (iOS) with native event listeners and source replacement. |
| **React Native Reanimated v4** | UI-thread 60fps gesture animations and spring/timing interpolations without JS thread jank. |
| **React Native Gesture Handler v2** | High-performance native gesture recognition (`Gesture.Pan()`). |
| **`expo-image`** | Hardware-accelerated image caching preventing thumbnail flicker during rapid scrolling. |
| **`react-native-safe-area-context`** | Precise device notch and status bar inset calculation. |

---

## 🏗 Architecture & Code Structure

```
StickerSmash/
├── app/                        # Expo Router file-based routes
│   ├── _layout.tsx             # Root layout wrapped in GestureHandlerRootView & PlayerProvider
│   ├── index.tsx               # Home route entry point
│   ├── watch/[id].tsx          # Watch screen route
│   └── shorts/[id].tsx         # Full-screen Shorts route
├── src/
│   ├── components/
│   │   ├── player/
│   │   │   ├── VideoPlayer.tsx        # Reusable expo-video surface & controls
│   │   │   └── MiniPlayerOverlay.tsx  # Gesture-driven floating mini player
│   │   └── shorts/
│   │       └── ShortItem.tsx         # Full-screen vertical Short item
│   ├── context/
│   │   └── PlayerContext.tsx          # Global video player state & mute management
│   ├── hooks/
│   │   ├── usePlayerState.ts          # Playback progress & error state hook
│   │   └── useVideoLifecycle.ts       # Active video lifecycle management
│   ├── data/
│   │   ├── mockVideos.ts              # 20 verified 200 OK media streams
│   │   └── mockShorts.ts              # Mock Shorts feed items
│   ├── types/
│   │   └── video.ts                   # TypeScript interfaces (Video, Short, PlayerState)
│   ├── utils/
│   │   └── formatters.ts              # Duration and view count formatters
│   └── constants/
│       └── theme.ts                   # Color palette, spacing, and typography
```

---

## 🎥 Video Lifecycle Strategy

To guarantee audio isolation, prevent memory leaks, and eliminate overlapping audio:

1. **Active Item Identification**: `viewabilityConfig` with `itemVisiblePercentThreshold: 60` determines the active index.
2. **Immediate Event Clean-up**: Inactive items automatically execute `player.pause()` and unbind playback event listeners.
3. **Lazy Memory Windowing (`shouldMountPlayer`)**: Native `<VideoPlayer />` instances are mounted **only** for items within adjacent window (`Math.abs(index - activeIndex) <= 1`).
4. **Poster Image Fallback**: Far-away items (`Math.abs(index - activeIndex) > 1`) unmount native player instances completely and display a lightweight poster `Image`.

---

## ⚡ Shorts Preloading Strategy

- **Adjacent Preloading**: Pre-mounts adjacent video players (`index = activeIndex ± 1`) so swiping up or down starts playback instantaneously.
- **Strict Single Playback**: Only `index === activeIndex` receives `isActive={true}` and emits audio/video.
- **Single-Video Swipe Clamping**: `pagingEnabled={false}` paired with `snapToInterval={containerHeight}` and `disableIntervalMomentum={true}` ensures fast swiping never skips videos.

---

## 🖐 Gesture Architecture

### Watch → Mini Player Interaction
- **UI-Thread Tracking**: `Gesture.Pan()` captures finger translation. Reanimated `translateY` shared value updates position in real time.
- **Modern YouTube Styling**: Minimized state scales the player into a floating `#212121` bar with rounded corners (`borderRadius: 12`), `104px x 58px` 16:9 video container, title, creator text, and Play/Close action buttons.
- **Snap Threshold**: Releasing past `100px` translation or high velocity (`> 500px/s`) snaps to the Mini Player. Releasing above snaps back to full Watch screen.
- **Gesture Conflict Management**: `Gesture.Pan()` is strictly isolated to the top video surface and header bar, leaving the details `ScrollView` to handle native vertical scrolling without gesture collision.

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Expo Go / Android Emulator / iOS Simulator

### Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start Expo dev server
npx expo start
```

### Running on Android
```bash
# Run on connected Android device or emulator
npx expo start --android
```

### Running on Web
```bash
# Run in web browser
npx expo start --web
```

---

## 🧪 Verification & Reliability

- **TypeScript Verification**: `npx tsc --noEmit` passes with **0 errors**.
- **ESLint Verification**: `npx eslint .` passes cleanly with **0 errors**.
- **Clean Console**: All debug logs removed for zero console noise.

---

## 📝 Known Limitations

- **Mock Data Streams**: Uses verified public MP4 sample streams (`media.w3.org`, `vjs.zencdn.net`, `interactive-examples.mdn.mozilla.net`).
- **Web Autoplay Policy**: Web browsers require initial muted playback for autoplay policy compliance.
