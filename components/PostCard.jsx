"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function PostCard({ post, width, height, variant = "default" }) {
  // New LatestPostCard variant with inline styles
  if (variant === "latest") {
    return (
      <motion.div 
        style={{
          width: width || '382px',
          height: height || '146px',
          borderRadius: '10px',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          padding: '14px',
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
            backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 100%), url('${post.image}')`,
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
          <button style={{
            width: '75px',
            height: '24px',
            border: '1px solid #FFFFFF',
            borderRadius: '12px',
            padding: '6px',
            gap: '6px',
            background: 'transparent',
            color: '#FFFFFF',
            fontSize: '9px',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {post.category}
          </button>
        </div>

        {/* Main Content */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: 'auto'
        }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#FFFFFF',
            margin: 0,
            lineHeight: '1.3',
            textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
          }}>
            {post.title}
          </h3>
          <p style={{
            fontSize: '10px',
            color: '#FFFFFF',
            margin: 0,
            lineHeight: '1.5',
            textShadow: '0.5px 0.5px 1px rgba(0,0,0,0.7)'
          }}>
            {post.excerpt}
          </p>
        </div>

        {/* Bottom Section with Metadata - Right */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-end'
        }}>
          <div style={{
            width: '153px',
            height: '17px',
            gap: '14px',
            display: 'flex',
            alignItems: 'center',
            fontSize: '9px',
            color: '#FFFFFF',
            textShadow: '0.5px 0.5px 1px rgba(0,0,0,0.7)'
          }}>
            <span>{post.readTime}</span>
            <span>|</span>
            <span>{post.category}</span>
            <span>|</span>
            <span>{post.date}</span>
          </div>
        </div>
      </motion.div>
    );
  }

  // Original PostCard design
  return (
    <article className="relative overflow-hidden rounded-2xl shadow-smooth group h-full">
      <div className="relative h-full min-h-[300px]">
        <Image 
          src={post.image} 
          alt={post.title} 
          fill 
          className="object-cover transition-transform duration-300 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      </div>

      {/* Category Badge */}
      <div className="absolute left-4 top-4">
        <span className="inline-block px-3 py-1 text-xs font-medium text-white/80 bg-white/20 backdrop-blur-sm rounded-full uppercase tracking-wide">
          {post.category}
        </span>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-xl font-bold leading-tight mb-2 drop-shadow-lg">
          {post.title}
        </h3>
        <p className="text-white/90 text-sm leading-relaxed mb-4 line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-2 text-xs text-white/80">
          <span>{post.readTime}</span>
          <span className="text-white/40">|</span>
          <span>{post.date}</span>
        </div>
      </div>
    </article>
  );
}
