import { Icon, RequireFullscreen } from '@/components';
import React, { useEffect, useRef } from 'react';

export const HeaderFullscreen: React.FC = () => {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    rootRef.current = document.getElementById('root');
  }, []);

  return (
    <RequireFullscreen component={rootRef}>
      {(isFullscreen) => (
        <Icon btn name={isFullscreen ? 'FullscreenExitOutlined' : 'FullscreenOutlined'} />
      )}
    </RequireFullscreen>
  );
};
