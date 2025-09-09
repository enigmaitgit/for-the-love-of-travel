"use client";
import React from 'react';
import { motion } from 'framer-motion';

const PopularPostCard = ({
  image = "/popular1.jpg",
  title = "Popular Post Title",
  description = "This is a description of the popular post content that provides more details about the topic.",
  category = "Travel",
  readTime = "5 min read",
  date = "Dec 15, 2024",
  onClick
}) => {
  return (
    <motion.div
      className="w-full max-w-4xl lg:w-[879px] h-auto lg:h-[275px] border border-gray-200 rounded-xl p-3 lg:p-3 bg-white flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-4 cursor-pointer group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        scale: 1.02,
        y: -5,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 20
        }
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {/* Image Section */}
      <div className="w-full lg:w-[372px] h-48 lg:h-[251px] rounded-lg overflow-hidden flex-shrink-0 relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Popup Indicator */}
        <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full lg:w-[467px] lg:h-[251px] gap-2 lg:gap-2 p-1 lg:p-1 flex flex-col justify-between">
        {/* Category Badge */}
        <div className="flex items-center gap-2">
          <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-medium">
            {category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-sm lg:text-sm font-bold text-black m-0 leading-tight mb-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-xs lg:text-xs text-gray-600 m-0 leading-relaxed mb-2 flex-grow">
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
    </motion.div>
  );
};

export default PopularPostCard;
