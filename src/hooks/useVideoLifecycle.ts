import { useState, useCallback, useEffect } from 'react';

export interface UseVideoLifecycleOptions {
  initialActiveId?: string | null;
  onActiveIdChange?: (activeId: string | null) => void;
}

export function useVideoLifecycle(options?: UseVideoLifecycleOptions) {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(
    options?.initialActiveId ?? null
  );

  const setActiveId = useCallback((id: string | null) => {
    setActiveVideoId(id);
    options?.onActiveIdChange?.(id);
  }, [options]);

  const isVideoActive = useCallback(
    (id: string) => activeVideoId === id,
    [activeVideoId]
  );

  // Clear active video on unmount
  useEffect(() => {
    return () => {
      setActiveVideoId(null);
    };
  }, []);

  return {
    activeVideoId,
    setActiveId,
    isVideoActive,
  };
}
