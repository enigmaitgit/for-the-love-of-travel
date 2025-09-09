"use client";
import { motion } from 'framer-motion';

export default function LatestPostCard({ width = '382px', height = '146px', image = '/images/balloon4to.png' }) {
  return (
    <motion.div 
      className="w-full h-32 sm:h-40 lg:h-[146px] rounded-[10px] overflow-hidden relative flex flex-col p-3 sm:p-4 lg:p-[12px] cursor-pointer"
      style={{
        width: width,
        height: height,
      }}
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
      {/* Background Image with Zoom Effect */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 100%), url("${image}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -1
        }}
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
      />
      {/* Top Section with Tour Button */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginBottom: 'auto'
      }}>
        {/* Tour Button - Top Left */}
        <button className="w-12 h-4 sm:w-14 sm:h-5 lg:w-[62px] lg:h-[20px] border border-white rounded-[10px] px-1 py-0.5 sm:px-1.5 sm:py-1 lg:px-[5px] lg:py-[5px] gap-1 sm:gap-1.5 lg:gap-[5px] bg-transparent text-white text-[6px] sm:text-[6px] lg:text-[7px] font-medium cursor-pointer flex items-center justify-center">
          Tour
        </button>
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '8px', // 16px * 0.5 = 8px (50% smaller)
        marginBottom: 'auto'
      }}>
        <h3 className="text-[8px] sm:text-[10px] lg:text-[12px] font-bold text-white m-0 leading-tight" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}>
          Discover Hidden Gems: Sri Lanka's Secret Beaches
        </h3>
        <p className="text-[6px] sm:text-[7px] lg:text-[8px] text-white m-0 leading-relaxed" style={{ textShadow: '0.5px 0.5px 1px rgba(0,0,0,0.7)' }}>
          Explore the untouched beauty of Sri Lanka's hidden coastal treasures. From pristine white sand beaches to crystal clear waters, discover the island's best-kept secrets that offer tranquility away from the crowds.
        </p>
      </div>

      {/* Bottom Section with Metadata - Right */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
      }}>
        {/* Metadata Section */}
        <div className="w-20 sm:w-24 lg:w-[127px] h-3 sm:h-3.5 lg:h-[14px] gap-2 sm:gap-3 lg:gap-[12px] flex items-center text-[5px] sm:text-[6px] lg:text-[7px] text-white" style={{ textShadow: '0.5px 0.5px 1px rgba(0,0,0,0.7)' }}>
          <span>8 min read</span>
          <span>|</span>
          <span>Travel Guide</span>
          <span>|</span>
          <span>Dec 15, 2024</span>
        </div>
      </div>
    </motion.div>
  );
}
