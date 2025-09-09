"use client";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import SectionHeader from "../components/SectionHeader";
import PostCard from "../components/PostCard";
import VideoCard from "../components/VideoCard";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { featuredPosts, latestPosts, videos } from "../lib/data";
import { useState } from "react";

export default function HomePageClient() {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <main>
      <Navbar />
      <HeroSection title="Home" />

      {/* Featured Stories Grid - New Layout */}
      <section id="stories" className="section pt-16 md:pt-20 lg:pt-24">
        <div style={{ 
          maxWidth: '92%', 
          margin: '0 auto', 
          marginTop: '40px', 
          marginLeft: '8%',
          position: 'relative',
          minHeight: '110vh'
        }}>
          {/* Row 1 - Absolute positioned cards */}
          <div style={{ position: 'relative', height: '480px', marginBottom: '72px' }}>
            <div style={{
              position: 'absolute',
              top: '-60px',
              left: '6px',
              zIndex: 2,
              gap: '12px',
              marginRight: '24px'
            }}>
              <PostCard post={featuredPosts[0]} variant="latest" width="624px" height="240px" />
            </div>
            <div style={{
              position: 'absolute',
              top: '-60px',
              left: '642px',
              zIndex: 1,
              marginLeft: '24px'
            }}>
              <PostCard post={featuredPosts[1]} variant="latest" width="624px" height="240px" />
            </div>
          </div>

          {/* Row 2 - Grid layout */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr 2fr', 
            gap: '18px',
            marginTop: '-348px',
            marginBottom: '24px'
          }}>
            <PostCard post={featuredPosts[2]} variant="latest" width="540px" height="300px" />
            <PostCard post={featuredPosts[3]} variant="latest" width="420px" height="300px" />
            <PostCard post={featuredPosts[4]} variant="latest" width="300px" height="240px" />
          </div>

          {/* Row 3 - Custom layout with absolute positioning */}
          <div style={{ 
            position: 'relative',
            height: '480px',
            marginTop: '18px'
          }}>
            <PostCard post={featuredPosts[5]} variant="latest" width="984px" height="336px" />
            <div style={{
              position: 'absolute',
              top: '-60px',
              left: '1002px',
              zIndex: 1
            }}>
              <PostCard post={featuredPosts[6]} variant="latest" width="300px" height="396px" />
            </div>
          </div>
        </div>
      </section>

      {/* Latest Post thumbnails */}
      <section className="section bg-white">
        <div className="container">
          {/* Custom Latest Post Header */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Latest Post</h2>
              <div className="w-48 sm:w-96 h-1 bg-yellow-400 rounded-full"></div>
            </div>
          </div>
          
          {/* Staggered Card Layout */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full items-start">
            {/* Left spacer to align with heading */}
            <div className="w-0 sm:w-4"></div>
            {/* Cards container */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 flex-1 justify-center overflow-x-auto sm:overflow-x-visible">
            {latestPosts.map((src, i) => (
              <motion.div
                key={i}
                className={`relative rounded-xl overflow-hidden shadow-lg h-48 w-48 sm:h-64 sm:w-56 lg:h-80 lg:w-64 group cursor-pointer flex-shrink-0 ${
                  i === 1 ? 'mt-8 sm:mt-20' : i === 3 ? 'mt-6 sm:mt-16' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{
                  scale: 1.03,
                  y: -5,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedPost({ src, index: i })}
              >
                <Image
                  src={src}
                  alt={`Latest post ${i+1}`}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                />
                {/* Dark Gradient Overlay - Removed on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 group-hover:opacity-0 transition-opacity duration-300"></div>
                
                {/* Popup Indicator */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </div>
              </motion.div>
            ))}
            </div>
            {/* Right spacer for even spacing */}
            <div className="w-0 sm:w-4"></div>
          </div>
        </div>
      </section>

      {/* Filtered Articles Section */}
      <section className="section text-white py-16" style={{ backgroundColor: '#0D2436' }}>
        <div className="container">
          {/* Filter Buttons */}
          <div className="flex gap-4 mb-12 justify-center">
            <button className="px-6 py-3 text-white rounded-lg font-medium transition-colors" style={{ backgroundColor: '#3514EE' }}>
              Destinations
            </button>
            <button className="px-6 py-3 border border-white/30 text-white rounded-lg font-medium hover:bg-white/10 transition-colors">
              Vacations
            </button>
            <button className="px-6 py-3 border border-white/30 text-white rounded-lg font-medium hover:bg-white/10 transition-colors">
              Tours
            </button>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {Array.from({ length: 8 }, (_, i) => {
              // Define which images to use for specific cards
              let imageSrc = "/images/placeholder.jpg"; // default placeholder
              
              // Assign images to specific card positions
              const cardImages = [
                "/images/74654a8f67369b797c8fb2e96a533fd515fb2939.jpg", // Card 1 - Beach scene
                "/images/3abf26dd585632b9d05dcfd0daffacedd55842f5.jpg", // Card 2 - Venice scene
                "/images/3969146248009e641f454298f62e13de84ac0a09.jpg", // Card 3 - Woman with orange car
                "/images/3969146248009e641f454298f62e13de84ac0a09.jpg", // Card 4 - Same as card 3
                "/images/74654a8f67369b797c8fb2e96a533fd515fb2939.jpg", // Card 5 - Same as card 1
                "/images/3abf26dd585632b9d05dcfd0daffacedd55842f5.jpg", // Card 6 - Same as card 2
                "/images/3969146248009e641f454298f62e13de84ac0a09.jpg", // Card 7 - Same as card 3
                "/images/0ef79490733114b35273ae93b13e8ebc24870d94.png"  // Card 8 - Coastal town
              ];
              
              imageSrc = cardImages[i];
              
              return (
              <motion.article 
                key={i}
                className="bg-white rounded-xl overflow-hidden hover:bg-gray-50 transition-colors cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  transition: { 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 20
                  }
                }}
              >
                {/* Image */}
                <div className="h-48 rounded-t-xl overflow-hidden">
                  <Image 
                    src={imageSrc} 
                    alt={`Article ${i + 1}`} 
                    width={300} 
                    height={192} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                
                {/* Content */}
                <div className="p-4">
                  {/* Category Tag */}
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full" style={{ backgroundColor: '#E5E9FF', color: '#4A64E6' }}>
                      Destinations
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-gray-900 font-semibold text-sm leading-tight mb-3 line-clamp-2">
                    The Impact of Technology on the Workplace: How Technology is Changing
                  </h3>
                  
                  {/* Metadata */}
                  <div className="text-gray-600 text-xs space-y-1">
                    <div>14 min read</div>
                    <div>May 28, 2025</div>
                  </div>
                </div>
              </motion.article>
              );
            })}
          </div>

          {/* View More Button */}
          <div className="flex justify-end">
            <motion.button 
              className="px-4 py-2 text-white rounded-2xl font-medium transition-colors flex items-center gap-2"
              style={{ backgroundColor: '#3514EE' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View More
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </div>
      </section>

      {/* White gap section */}
      <section className="py-20 bg-white"></section>

      {/* Videos section */}
      <section id="videos" className="section" style={{ background: 'linear-gradient(to right, #F7ECD5, #EEC9F9)' }}>
        <div className="container">
          {/* Custom Popular Videos Header */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Popular Videos</h2>
              <div className="w-48 sm:w-96 h-1 bg-yellow-400 rounded-full"></div>
            </div>
          </div>
          {/* Videos Grid - Same layout as filtered articles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {Array.from({ length: 8 }, (_, i) => {
              // Use the same images as the filtered articles section
              const cardImages = [
                "/images/74654a8f67369b797c8fb2e96a533fd515fb2939.jpg", // Card 1 - Beach scene
                "/images/3abf26dd585632b9d05dcfd0daffacedd55842f5.jpg", // Card 2 - Venice scene
                "/images/3969146248009e641f454298f62e13de84ac0a09.jpg", // Card 3 - Woman with orange car
                "/images/3969146248009e641f454298f62e13de84ac0a09.jpg", // Card 4 - Same as card 3
                "/images/74654a8f67369b797c8fb2e96a533fd515fb2939.jpg", // Card 5 - Same as card 1
                "/images/3abf26dd585632b9d05dcfd0daffacedd55842f5.jpg", // Card 6 - Same as card 2
                "/images/3969146248009e641f454298f62e13de84ac0a09.jpg", // Card 7 - Same as card 3
                "/images/0ef79490733114b35273ae93b13e8ebc24870d94.png"  // Card 8 - Coastal town
              ];
              
              return (
              <motion.article 
                key={i}
                className="bg-transparent rounded-xl overflow-hidden hover:bg-white/10 transition-colors cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {/* Video Image */}
                <div className="h-32 sm:h-40 lg:h-48 rounded-xl overflow-hidden border-4 sm:border-6 lg:border-8 border-white group relative">
                  <Image 
                    src={cardImages[i]} 
                    alt={`Video ${i + 1}`} 
                    width={300} 
                    height={192} 
                    className="w-full h-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-110" 
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-3 sm:p-4">
                  {/* Title */}
                  <h3 className="text-gray-900 font-semibold text-xs sm:text-sm leading-tight mb-2 sm:mb-3 line-clamp-2">
                    Popular Travel Video: Amazing Destinations
                  </h3>
                  
                  {/* Metadata */}
                  <div className="text-gray-600 text-[10px] sm:text-xs space-y-1">
                    <div>5:30 · Dec 15, 2024</div>
                  </div>
                </div>
              </motion.article>
              );
            })}
          </div>

          {/* View More Button */}
          <div className="flex justify-end">
            <motion.button 
              className="px-4 py-2 text-white rounded-2xl font-medium transition-colors flex items-center gap-2"
              style={{ backgroundColor: '#3514EE' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View More
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </div>
      </section>

      {/* Featured banner */}
      <section className="section">
        <div className="container">
          <div className="relative h-96 md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-smooth group cursor-pointer">
            <Image
              src="/images/adde8f33aed2cfe745cae2ca0e5fddb1b7cb7305.png"
              alt="Featured video"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />

      {/* Popup Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              className="relative bg-white rounded-2xl overflow-hidden max-w-4xl max-h-[90vh] w-full"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                duration: 0.4
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-colors"
                onClick={() => setSelectedPost(null)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Image Section */}
              <div className="relative h-96 w-full">
                <Image
                  src={selectedPost.src}
                  alt={`Latest post ${selectedPost.index + 1}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              {/* Content Section */}
              <div className="p-8">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">
                    Latest Post
                  </span>
                </div>
                
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Discover Hidden Gems: Sri Lanka's Secret Beaches
                </h2>
                
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Explore the untouched beauty of Sri Lanka's hidden coastal treasures. From pristine white sand beaches to crystal clear waters, discover the island's best-kept secrets that offer tranquility away from the crowds. This comprehensive guide will take you through the most spectacular hidden beaches that only locals know about.
                </p>

                <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                  <span>8 min read</span>
                  <span>•</span>
                  <span>Travel Guide</span>
                  <span>•</span>
                  <span>Dec 15, 2024</span>
                </div>

                <div className="flex gap-4">
                  <motion.button
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Read Full Article
                  </motion.button>
                  <motion.button
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Save for Later
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
