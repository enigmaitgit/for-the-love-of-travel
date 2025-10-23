import React from 'react';
import Image from 'next/image';

const PopularPostCard = ({ 
  image = "/popular1.jpg", 
  featuredMedia,
  title = "Popular Post Title", 
  description = "This is a description of the popular post content that provides more details about the topic.",
  category = "Travel",
  readTime = "5 min read",
  date = "Dec 15, 2024"
}) => {
  return (
    <div 
      className="w-full max-w-4xl lg:w-[879px] h-auto lg:h-[275px] border border-gray-200 rounded-xl p-3 lg:p-4 bg-white flex flex-col lg:flex-row items-stretch lg:items-center gap-4 lg:gap-6"
      style={{ transform: 'scale(1.45)' }}
    >
      {/* Media Section */}
      <div className="w-full lg:w-[372px] h-48 lg:h-[251px] rounded-lg overflow-hidden flex-shrink-0 relative">
        {(() => {
          // Determine media URL and type (prioritize featuredMedia over image)
          const rawMediaUrl = featuredMedia?.url || image;
          const mediaType = featuredMedia?.type || 'image';
          
          // Construct proper URL based on media type
          let mediaUrl = rawMediaUrl;
          if (rawMediaUrl && !rawMediaUrl.startsWith('http') && !rawMediaUrl.startsWith('/') && !rawMediaUrl.startsWith('data:')) {
            // For both images and videos, use admin backend URL (port 5000)
            mediaUrl = `http://localhost:5000/api/v1/media/serve/${encodeURIComponent(rawMediaUrl)}`;
          }
          
          if (!mediaUrl) return null;
          
          if (mediaType === 'video') {
            return (
              <div className="relative w-full h-full">
                <video
                  src={mediaUrl}
                  className="w-full h-full object-cover rounded-lg"
                  muted
                  preload="metadata"
                  poster={image} // Use image as poster/thumbnail
                />
                {/* Video play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                {/* Video badge */}
                <div className="absolute top-2 right-2">
                  <div className="bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                    <div className="w-2 h-2 bg-white rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 border-l-2 border-t-1 border-b-1 border-white border-transparent ml-0.5"></div>
                    </div>
                    Video
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <Image 
                src={mediaUrl} 
                alt={title}
                width={372}
                height={251}
                className="w-full h-full object-cover rounded-lg"
              />
            );
          }
        })()}
      </div>

      {/* Content Section */}
      <div className="w-full lg:w-[467px] h-auto lg:h-[251px] flex flex-col justify-between gap-2 lg:gap-3 p-1 lg:p-2">
        {/* Category Badge */}
        <div className="flex items-center gap-2">
          <span className="bg-[#D2AD3F] text-white px-3 py-1 rounded-full text-xs font-medium">
            {category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-sm sm:text-base lg:text-lg font-bold text-black leading-tight mb-2 lg:mb-3">
          {title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3 lg:mb-4 flex-grow">
          {description}
        </p>

        {/* Bottom Section - Date and Read Time */}
        <div className="flex justify-between items-center mt-auto">
          <span className="text-xs text-gray-500">
            {date}
          </span>
          <span className="text-xs text-gray-500">
            {readTime}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PopularPostCard;
