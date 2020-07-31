import React, { useEffect } from 'react';
import useLoadScript from '@irvingjs/core/hooks/useLoadScript';

const CoralTalkEmbed = () => {
  const loaded = useLoadScript(
    'http://localhost:3000/assets/js/embed.js',
    'coral'
  );

  useEffect(() => {
    if (window.Coral) {
      window.Coral.createStreamEmbed({
        id: 'coral_thread',
        autoRender: true,
        rootURL: 'http://localhost:3000',
      });
    }
  }, [loaded]);

  return (
    <div id="coral_thread" />
  );
};

export default CoralTalkEmbed;
