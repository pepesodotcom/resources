import React from 'react';

interface YouTubeProps {
  videoId: string;
  className?: string;
  aspectRatio?: number;
}

export const YouTube: React.FC<YouTubeProps> = ({ videoId, className = '', aspectRatio = 16 / 9 }) => {
  const style = {
    position: 'relative' as const,
    paddingBottom: `${(aspectRatio * 100).toFixed(2)}%`,
    height: 0,
    overflow: 'hidden',
    maxWidth: '100%',
  };

  const iframeStyle = {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  };

  return (
    <div style={style} className={className}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={iframeStyle}
      />
    </div>
  );
};
