import { useLocalSearchParams } from 'expo-router';
import { ShortsScreen } from '../../src/screens/ShortsScreen';

export default function ShortsPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <ShortsScreen shortId={id ?? 'short-1'} />;
}
