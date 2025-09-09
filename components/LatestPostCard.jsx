"use client";
import { motion } from 'framer-motion';

export default function LatestPostCard({ width = '382px', height = '146px', image = '/images/balloon4to.png' }) {
  return (
    <motion.div 
      style={{
        width: width,
        height: height,
        borderRadius: '10px', // 20px * 0.5 = 10px (50% smaller)
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        padding: '12px', // 24px * 0.5 = 12px (50% smaller)
        cursor: 'pointer'
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
        <button style={{
          width: '62px', // 125px * 0.5 = 62px (50% smaller)
          height: '20px', // 40px * 0.5 = 20px (50% smaller)
          border: '1px solid #FFFFFF',
          borderRadius: '10px', // 20px * 0.5 = 10px (50% smaller)
          padding: '5px', // 10px * 0.5 = 5px (50% smaller)
          gap: '5px', // 10px * 0.5 = 5px (50% smaller)
          background: 'transparent',
          color: '#FFFFFF',
          fontSize: '7px', // 14px * 0.5 = 7px (50% smaller)
          fontWeight: '500',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
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
        <h3 style={{
          fontSize: '12px', // 24px * 0.5 = 12px (50% smaller)
          fontWeight: 'bold',
          color: '#FFFFFF',
          margin: 0,
          lineHeight: '1.3',
          textShadow: '1px 1px 2px rgba(0,0,0,0.7)' // 2px * 0.5 = 1px (50% smaller)
        }}>
          Discover Hidden Gems: Sri Lanka's Secret Beaches
        </h3>
        <p style={{
          fontSize: '8px', // 16px * 0.5 = 8px (50% smaller)
          color: '#FFFFFF',
          margin: 0,
          lineHeight: '1.5',
          textShadow: '0.5px 0.5px 1px rgba(0,0,0,0.7)' // 1px * 0.5 = 0.5px (50% smaller)
        }}>
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
        <div style={{
          width: '127px', // 254px * 0.5 = 127px (50% smaller)
          height: '14px', // 28px * 0.5 = 14px (50% smaller)
          gap: '12px', // 24px * 0.5 = 12px (50% smaller)
          display: 'flex',
          alignItems: 'center',
          fontSize: '7px', // 14px * 0.5 = 7px (50% smaller)
          color: '#FFFFFF',
          textShadow: '0.5px 0.5px 1px rgba(0,0,0,0.7)' // 1px * 0.5 = 0.5px (50% smaller)
        }}>
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
