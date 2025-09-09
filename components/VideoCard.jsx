'use client';

import React, { useState } from 'react';
import Image from "next/image";
import { Play } from "lucide-react";

const VideoCard = ({ 
  // Props for second implementation
  videoSrc = "/video.mp4",
  thumbnail = "/vi.png",
  title = "Video Title",
  description = "Video description",
  duration = "5:30",
  size = "small", // "small" or "large"
  metadata = null, // Additional metadata for small cards
  content = null, // Additional content field for small cards

  // Props for first implementation
  video = null
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleCardClick = () => {
    setIsPlaying(!isPlaying);
  };

  // Size-based styling (for second version)
  const cardStyles = size === "large" ? {
    width: '666.18px',
    height: '540.86px',
    borderRadius: '28.9px',
    playIconSize: '136px',
    contentPadding: '34px',
    titleFontSize: '27.2px',
    descriptionFontSize: '20.4px',
    durationFontSize: '17px',
    contentMargin: '13.6px',
    durationPadding: '6.8px 13.6px',
    durationBorderRadius: '6.8px'
  } : {
    width: '214.51px',
    height: '150px',
    borderRadius: '8.09px',
    playIconSize: '38.08px',
    contentPadding: '9.52px',
    titleFontSize: '7.62px',
    descriptionFontSize: '5.71px',
    durationFontSize: '4.76px',
    contentMargin: '3.81px',
    durationPadding: '1.90px 3.81px',
    durationBorderRadius: '1.90px'
  };

  // --- If "video" prop is passed → use the first implementation ---
  if (video) {
    return (
      <article className="card overflow-hidden group">
        <div className="relative h-44">
          <Image 
            src={video.image} 
            alt={video.title} 
            fill 
            className="object-cover transition-transform duration-300 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute inset-0 grid place-items-center">
            <button className="h-12 w-12 rounded-full bg-white/90 grid place-items-center">
              <Play className="h-6 w-6" />
            </button>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-medium">{video.title}</h3>
          <p className="text-sm text-black/60">{video.meta}</p>
        </div>
      </article>
    );
  }

  // --- Otherwise use the second implementation ---
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div 
        style={{
          width: cardStyles.width,
          height: cardStyles.height,
          borderRadius: cardStyles.borderRadius,
          overflow: 'hidden',
          position: 'relative',
          cursor: 'pointer',
          backgroundImage: `url('${thumbnail}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onClick={handleCardClick}
      >
        {/* Video Player */}
        {isPlaying && (
          <video
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 2
            }}
            autoPlay
            controls
            onEnded={() => setIsPlaying(false)}
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {/* Play Icon Overlay */}
        {!isPlaying && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 3,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <img 
              src="/viicon.png" 
              alt="Play Video"
              style={{
                width: cardStyles.playIconSize,
                height: cardStyles.playIconSize,
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
              }}
            />
          </div>
        )}

        {/* Dark Overlay */}
        {!isPlaying && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.3)',
            zIndex: 1
          }} />
        )}

        {/* Content Overlay */}
        {!isPlaying && (
          <div style={{
            position: 'absolute',
            bottom: cardStyles.contentPadding,
            left: cardStyles.contentPadding,
            right: cardStyles.contentPadding,
            zIndex: 3,
            color: 'white'
          }}>
            <h3 style={{
              fontSize: cardStyles.titleFontSize,
              fontWeight: 'bold',
              margin: `0 0 ${cardStyles.contentMargin} 0`,
              textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
            }}>
              {title}
            </h3>
            <p style={{
              fontSize: cardStyles.descriptionFontSize,
              margin: `0 0 ${cardStyles.contentMargin} 0`,
              textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
              lineHeight: '1.4'
            }}>
              {description}
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{
                fontSize: cardStyles.durationFontSize,
                background: 'rgba(0,0,0,0.7)',
                padding: cardStyles.durationPadding,
                borderRadius: cardStyles.durationBorderRadius,
                textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
              }}>
                {duration}
              </span>
            </div>
          </div>
        )}
      </div>
      
      {/* Content field for small cards - below the card */}
      {size === "small" && content && (
        <div style={{
          marginTop: '8px',
          padding: '6px 10px',
          background: 'rgba(247, 236, 213, 0.3)',
          borderRadius: '8px',
          fontSize: '11px',
          color: '#333',
          textAlign: 'center',
          width: '100%',
          maxWidth: cardStyles.width,
          fontWeight: '500',
          lineHeight: '1.3'
        }}>
          {content}
        </div>
      )}
      
      {/* Metadata for small cards - below the content */}
      {size === "small" && metadata && (
        <div style={{
          marginTop: '6px',
          padding: '4px 8px',
          background: 'rgba(0,0,0,0.1)',
          borderRadius: '6px',
          fontSize: '10px',
          color: '#666',
          textAlign: 'center',
          width: '100%',
          maxWidth: cardStyles.width
        }}>
          {metadata}
        </div>
      )}
    </div>
  );
};

export default VideoCard;
