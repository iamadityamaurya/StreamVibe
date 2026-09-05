import { useLocalSearchParams } from 'expo-router';
import { WatchScreen } from '../../src/screens/WatchScreen';

export default function WatchPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <WatchScreen videoId={id ?? 'vid-1'} />;
}
