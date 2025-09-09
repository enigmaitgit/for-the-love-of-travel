'use client';

import React, { useState } from 'react';
import Image from "next/image";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

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

  // Size-based styling (for second version) - Mobile Responsive
  const cardStyles = size === "large" ? {
    // Large card - responsive sizing
    width: '100%',
    maxWidth: '666.18px',
    height: '300px',
    smHeight: '400px',
    lgHeight: '540.86px',
    borderRadius: '16px',
    smBorderRadius: '20px',
    lgBorderRadius: '28.9px',
    playIconSize: '60px',
    smPlayIconSize: '80px',
    lgPlayIconSize: '136px',
    contentPadding: '16px',
    smContentPadding: '24px',
    lgContentPadding: '34px',
    titleFontSize: '16px',
    smTitleFontSize: '20px',
    lgTitleFontSize: '27.2px',
    descriptionFontSize: '12px',
    smDescriptionFontSize: '16px',
    lgDescriptionFontSize: '20.4px',
    durationFontSize: '10px',
    smDurationFontSize: '14px',
    lgDurationFontSize: '17px',
    contentMargin: '8px',
    smContentMargin: '10px',
    lgContentMargin: '13.6px',
    durationPadding: '4px 8px',
    smDurationPadding: '5px 10px',
    lgDurationPadding: '6.8px 13.6px',
    durationBorderRadius: '4px',
    smDurationBorderRadius: '5px',
    lgDurationBorderRadius: '6.8px'
  } : {
    // Small card - responsive sizing
    width: '100%',
    maxWidth: '214.51px',
    height: '120px',
    smHeight: '135px',
    lgHeight: '150px',
    borderRadius: '6px',
    smBorderRadius: '7px',
    lgBorderRadius: '8.09px',
    playIconSize: '24px',
    smPlayIconSize: '32px',
    lgPlayIconSize: '38.08px',
    contentPadding: '6px',
    smContentPadding: '8px',
    lgContentPadding: '9.52px',
    titleFontSize: '6px',
    smTitleFontSize: '7px',
    lgTitleFontSize: '7.62px',
    descriptionFontSize: '4px',
    smDescriptionFontSize: '5px',
    lgDescriptionFontSize: '5.71px',
    durationFontSize: '3px',
    smDurationFontSize: '4px',
    lgDurationFontSize: '4.76px',
    contentMargin: '2px',
    smContentMargin: '3px',
    lgContentMargin: '3.81px',
    durationPadding: '1px 3px',
    smDurationPadding: '1.5px 3.5px',
    lgDurationPadding: '1.90px 3.81px',
    durationBorderRadius: '1px',
    smDurationBorderRadius: '1.5px',
    lgDurationBorderRadius: '1.90px'
  };

  // --- If "video" prop is passed → use the first implementation ---
  if (video) {
    return (
      <motion.article 
        className="card overflow-hidden group"
        initial={{ scale: 1, y: 0 }}
        whileHover={{ 
          scale: 1.02,
          y: -5,
          transition: { 
            type: "spring", 
            stiffness: 300, 
            damping: 20,
            duration: 0.3
          }
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 20 
        }}
      >
        <div className="relative h-44">
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ 
              scale: 1.1,
              transition: { 
                type: "spring", 
                stiffness: 200, 
                damping: 25,
                duration: 0.4
              }
            }}
            className="w-full h-full"
          >
            <Image 
              src={video.image} 
              alt={video.title} 
              fill 
              className="object-cover transition-transform duration-300 group-hover:scale-105" 
            />
          </motion.div>
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
      </motion.article>
    );
  }
  
  return (
    <motion.div 
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      initial={{ scale: 1, y: 0 }}
      whileHover={{ 
        scale: 1.02,
        y: -5,
        transition: { 
          type: "spring", 
          stiffness: 300, 
          damping: 20,
          duration: 0.3
        }
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
    >
      <motion.div 
        className={`w-full ${size === 'large' ? 'h-64 sm:h-80 lg:h-[540.86px] lg:w-[666.18px]' : 'h-24 sm:h-28 lg:h-[150px]'} ${size === 'large' ? 'rounded-2xl sm:rounded-3xl lg:rounded-[28.9px]' : 'rounded-lg sm:rounded-xl lg:rounded-[8.09px]'} overflow-hidden relative cursor-pointer bg-cover bg-center flex flex-col justify-center items-center`}
        style={{
          backgroundImage: `url('${thumbnail}')`,
        }}
        onClick={handleCardClick}
        initial={{ scale: 1 }}
        whileHover={{ 
          scale: 1.05,
          transition: { 
            type: "spring", 
            stiffness: 200, 
            damping: 25,
            duration: 0.4
          }
        }}
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
              className={`${size === 'large' ? 'w-12 h-12 sm:w-16 sm:h-16 lg:w-[136px] lg:h-[136px]' : 'w-6 h-6 sm:w-8 sm:h-8 lg:w-[38.08px] lg:h-[38.08px]'}`}
              style={{
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
          <div className={`absolute bottom-3 sm:bottom-6 lg:bottom-[34px] left-3 sm:left-6 lg:left-[34px] right-3 sm:right-6 lg:right-[34px] z-10 text-white`}>
            <h3 className={`${size === 'large' ? 'text-base sm:text-lg lg:text-[27.2px]' : 'text-[6px] sm:text-[7px] lg:text-[7.62px]'} font-bold mb-2 sm:mb-2.5 lg:mb-[13.6px]`} style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}>
              {title}
            </h3>
            <p className={`${size === 'large' ? 'text-xs sm:text-sm lg:text-[20.4px]' : 'text-[4px] sm:text-[5px] lg:text-[5.71px]'} mb-2 sm:mb-2.5 lg:mb-[13.6px] leading-tight`} style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}>
              {description}
            </p>
            <div className="flex justify-between items-center">
              <span className={`${size === 'large' ? 'text-[10px] sm:text-xs lg:text-[17px]' : 'text-[3px] sm:text-[4px] lg:text-[4.76px]'} bg-black/70 px-2 py-1 sm:px-2.5 sm:py-1.5 lg:px-[13.6px] lg:py-[6.8px] rounded sm:rounded-md lg:rounded-[6.8px]`} style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}>
                {duration}
              </span>
            </div>
          </div>
        )}
      </motion.div>
      
      {/* Content field for small cards - below the card */}
      {size === "small" && content && (
        <div className="mt-2 p-2 sm:p-2.5 lg:p-[10px] bg-yellow-100/30 rounded-lg text-[9px] sm:text-[10px] lg:text-[11px] text-gray-800 text-center w-full font-medium leading-tight">
          {content}
        </div>
      )}
      
      {/* Metadata for small cards - below the content */}
      {size === "small" && metadata && (
        <div className="mt-1.5 p-1.5 sm:p-2 lg:p-[8px] bg-black/10 rounded-md text-[8px] sm:text-[9px] lg:text-[10px] text-gray-600 text-center w-full">
          {metadata}
        </div>
      )}
    </motion.div>
  );
};

export default VideoCard;
