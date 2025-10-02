"use client";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SectionHeader from "../components/SectionHeader";
import PostCard from "../components/PostCard";
import VideoCard from "../components/VideoCard";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import AuthPopup from "../components/AuthPopup";
import ScrollCTA from "../components/ScrollCTA";
import { useScrollTrigger } from "../hooks/useScrollTrigger";
import Image from "next/image";
import { motion } from "framer-motion";
import { featuredPosts, latestPosts, videos } from "../lib/data";

export default function HomePageClient() {
  const { 
    showCTA, 
    showPopup, 
    closeCTA, 
    closePopup, 
    showAuthPopup,
    resetCTA
  } = useScrollTrigger(0.2, 1000); // Trigger at 20% scroll, 1 second delay


  return (
    <main>
      <Navbar />
      <Hero />

      {/* Featured Stories Grid - Mobile Responsive Layout */}
      <section id="stories" className="section pt-16 md:pt-20 lg:pt-24">
        <div className="container mx-auto" style={{ maxWidth: '2048px' }}>
          {/* Mobile: Stack all cards vertically */}
          <div className="block lg:hidden space-y-6 max-w-4xl mx-auto">
            {featuredPosts.slice(0, 6).map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <PostCard post={post} variant="latest" />
              </motion.div>
            ))}
          </div>

          {/* Desktop: Grid layout matching Latest Post structure */}
          <div className="hidden lg:block" style={{ 
            marginTop: '40px',
            position: 'relative',
            minHeight: 'auto'
          }}>
            {/* Row 1 - Improved positioning */}
            <div style={{ 
              position: 'relative', 
              marginBottom: '24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '24px'
            }}>
              <div style={{
                flex: '1',
                maxWidth: '624px',
                zIndex: 2
              }}>
                <PostCard post={featuredPosts[0]} variant="latest" width="624px" height="240px" />
              </div>
              <div style={{
                flex: '1',
                maxWidth: '624px',
                zIndex: 1
              }}>
                <PostCard post={featuredPosts[1]} variant="latest" width="624px" height="240px" />
              </div>
            </div>

            {/* Row 2 - Grid layout */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr 2fr', 
              gap: '18px',
              marginBottom: '24px'
            }}>
              <PostCard post={featuredPosts[2]} variant="latest" width="540px" height="300px" />
              <PostCard post={featuredPosts[3]} variant="latest" width="420px" height="300px" />
              <PostCard post={featuredPosts[4]} variant="latest" width="300px" height="240px" />
            </div>

            {/* Row 3 - Improved layout */}
            <div style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '24px',
              marginTop: '18px'
            }}>
              <div style={{ flex: '2', maxWidth: '984px' }}>
                <PostCard post={featuredPosts[5]} variant="latest" width="984px" height="336px" />
              </div>
              <div style={{ flex: '1', maxWidth: '300px' }}>
                <PostCard post={featuredPosts[6]} variant="latest" width="300px" height="396px" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Post thumbnails */}
      <section className="section bg-white">
        <div className="container mx-auto" style={{ maxWidth: '2048px' }}>
          {/* Custom Latest Post Header */}
          <div className="mb-8 flex justify-center">
            <div 
              className="flex items-center"
              style={{
                maxWidth: '943px',
                minHeight: '74px',
                gap: '48px',
                opacity: 1,
                width: '100%'
              }}
            >
              <h2 className="text-3xl font-bold text-gray-900">Latest Post</h2>
              <div className="w-96 h-1 bg-yellow-400 rounded-full"></div>
            </div>
          </div>
          
          {/* Mobile: Grid layout, Desktop: Staggered layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:hidden">
            {latestPosts.map((src, i) => (
              <motion.div 
                key={i} 
                className="relative rounded-xl overflow-hidden shadow-lg h-80 w-full group cursor-pointer"
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
              >
                <Image 
                  src={src} 
                  alt={`Latest post ${i+1}`} 
                  fill 
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 group-hover:opacity-0 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </div>

           {/* Desktop: Carousel animation layout */}
           <div className="hidden lg:flex gap-6 w-full items-start">
             <div className="w-0 sm:w-4"></div>
             <div className="flex gap-6 flex-1 justify-center group">
              {latestPosts.map((src, i) => (
                <motion.div 
                  key={i} 
                  className={`relative overflow-hidden shadow-lg cursor-pointer flex-shrink-0 carousel-card ${
                    i === 1 ? 'mt-20' : i === 3 ? 'mt-16' : ''
                  }`}
                  style={{
                    width: '412px',
                    height: '499px',
                    borderRadius: '24px',
                    paddingTop: '38px',
                    paddingRight: '44px',
                    paddingBottom: '38px',
                    paddingLeft: '44px',
                    gap: '10px',
                    opacity: 1
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileTap={{ scale: 0.98 }}
                >
                 <Image 
                   src={src} 
                   alt={`Latest post ${i+1}`} 
                   fill 
                   className="object-cover object-center" 
                 />
                 {/* Dark Gradient Overlay - Static */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20"></div>
               </motion.div>
             ))}
             </div>
             <div className="w-0 sm:w-4"></div>
           </div>
        </div>
      </section>

      {/* Filtered Articles Section */}
      <section 
        className="text-white py-20" 
        style={{ 
          backgroundColor: '#0D2436',
          opacity: 1
        }}
      >
        <div className="container mx-auto" style={{ maxWidth: '2048px' }}>
          {/* First Inner Layout - Filter Buttons and View More */}
          <div 
            className="mx-auto"
            style={{
              width: '1758px',
              minHeight: '1249px',
              opacity: 1,
              gap: '42px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start'
            }}
          >
            {/* Filter Buttons */}
            <div 
              className="flex justify-center"
              style={{
                width: '803px',
                height: '65px',
                opacity: 1,
                gap: '36px',
                margin: '0 auto'
              }}
            >
              <button 
                className="text-white font-medium transition-colors text-sm"
                style={{
                  width: '244px',
                  height: '65px',
                  opacity: 1,
                  borderRadius: '20px',
                  paddingTop: '10px',
                  paddingRight: '15px',
                  paddingBottom: '10px',
                  paddingLeft: '15px',
                  gap: '10px',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: 'transparent',
                  backgroundColor: '#3514EE',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onClick={(e) => {
                  // Remove active class from all buttons
                  e.target.parentElement.querySelectorAll('button').forEach(btn => {
                    btn.style.backgroundColor = 'transparent';
                    btn.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                  });
                  // Add active class to clicked button
                  e.target.style.backgroundColor = '#3514EE';
                  e.target.style.borderColor = 'transparent';
                }}
              >
                Destinations
              </button>
              <button 
                className="text-white font-medium transition-colors text-sm"
                style={{
                  width: '244px',
                  height: '65px',
                  opacity: 1,
                  borderRadius: '20px',
                  paddingTop: '10px',
                  paddingRight: '15px',
                  paddingBottom: '10px',
                  paddingLeft: '15px',
                  gap: '10px',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  backgroundColor: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onClick={(e) => {
                  // Remove active class from all buttons
                  e.target.parentElement.querySelectorAll('button').forEach(btn => {
                    btn.style.backgroundColor = 'transparent';
                    btn.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                  });
                  // Add active class to clicked button
                  e.target.style.backgroundColor = '#3514EE';
                  e.target.style.borderColor = 'transparent';
                }}
              >
                Vacations
              </button>
              <button 
                className="text-white font-medium transition-colors text-sm"
                style={{
                  width: '244px',
                  height: '65px',
                  opacity: 1,
                  borderRadius: '20px',
                  paddingTop: '10px',
                  paddingRight: '15px',
                  paddingBottom: '10px',
                  paddingLeft: '15px',
                  gap: '10px',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  backgroundColor: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onClick={(e) => {
                  // Remove active class from all buttons
                  e.target.parentElement.querySelectorAll('button').forEach(btn => {
                    btn.style.backgroundColor = 'transparent';
                    btn.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                  });
                  // Add active class to clicked button
                  e.target.style.backgroundColor = '#3514EE';
                  e.target.style.borderColor = 'transparent';
                }}
              >
                Tours
              </button>
            </div>

          {/* Articles Grid - 2 rows, 4 cards each */}
          <div 
            className="mx-auto"
            style={{
              width: '1758px',
              minHeight: '1234px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              opacity: 1,
              gap: '20px'
            }}
          >
            {/* First Row */}
            <div 
              style={{
                width: '1758px',
                height: '596px',
                opacity: 1,
                gap: '42px',
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              {Array.from({ length: 4 }, (_, i) => {
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
               <article 
                 key={i}
                 className="bg-white overflow-hidden hover:bg-gray-50 transition-colors cursor-pointer"
                 style={{
                   width: '392px',
                   height: '504px',
                   borderRadius: '25px',
                   gap: '16px',
                   borderWidth: '1px',
                   borderStyle: 'solid',
                   borderColor: '#E5E7EB',
                   padding: '16px',
                   opacity: 1
                 }}
               >
                {/* Image */}
                <div 
                  className="overflow-hidden" 
                  style={{ 
                    width: '360px',
                    height: '240px',
                    borderRadius: '14px',
                    opacity: 1
                  }}
                >
                  <Image 
                    src={imageSrc} 
                    alt={`Article ${i + 1}`} 
                    width={360} 
                    height={240} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                
                {/* Description Container Box */}
                <div 
                  style={{ 
                    width: '360px',
                    height: '216px',
                    gap: '20px',
                    padding: '8px',
                    opacity: 1,
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  {/* Description Box */}
                  <div 
                    style={{
                      width: '344px',
                      height: '152px',
                      gap: '16px',
                      opacity: 1,
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
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
                  </div>
                  
                  {/* Read Time and Date Box */}
                  <div 
                    className="text-gray-600 text-xs space-y-1"
                    style={{
                      width: '254px',
                      height: '28px',
                      gap: '24px',
                      opacity: 1,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}
                  >
                    <div>14 min read</div>
                    <div>May 28, 2025</div>
                  </div>
                </div>
               </article>
              );
            })}
            </div>

            {/* Second Row */}
            <div 
              style={{
                width: '1758px',
                height: '596px',
                opacity: 1,
                gap: '42px',
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              {Array.from({ length: 4 }, (_, i) => {
                const actualIndex = i + 4; // Start from index 4 for second row
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
                
                imageSrc = cardImages[actualIndex];
                
                return (
                 <article 
                   key={actualIndex}
                   className="bg-white overflow-hidden hover:bg-gray-50 transition-colors cursor-pointer"
                   style={{
                     width: '392px',
                     height: '504px',
                     borderRadius: '25px',
                     gap: '16px',
                     borderWidth: '1px',
                     borderStyle: 'solid',
                     borderColor: '#E5E7EB',
                     padding: '16px',
                     opacity: 1
                   }}
                 >
                  {/* Image */}
                  <div 
                    className="overflow-hidden" 
                    style={{ 
                      width: '360px',
                      height: '240px',
                      borderRadius: '14px',
                      opacity: 1
                    }}
                  >
                    <Image 
                      src={imageSrc} 
                      alt={`Article ${actualIndex + 1}`} 
                      width={360} 
                      height={240} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  
                  {/* Description Container Box */}
                  <div 
                    style={{ 
                      width: '360px',
                      height: '216px',
                      gap: '20px',
                      padding: '8px',
                      opacity: 1,
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    {/* Description Box */}
                    <div 
                      style={{
                        width: '344px',
                        height: '152px',
                        gap: '16px',
                        opacity: 1,
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
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
                    </div>
                    
                    {/* Read Time and Date Box */}
                    <div 
                      className="text-gray-600 text-xs space-y-1"
                      style={{
                        width: '254px',
                        height: '28px',
                        gap: '24px',
                        opacity: 1,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                      }}
                    >
                      <div>14 min read</div>
                      <div>May 28, 2025</div>
                    </div>
                  </div>
                 </article>
                );
              })}
            </div>
          </div>

            {/* View More Button */}
            <div className="flex justify-end mt-8">
              <button 
                className="px-4 py-2 text-white rounded-2xl font-medium transition-colors flex items-center gap-2"
                style={{ backgroundColor: '#3514EE' }}
              >
                View More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* White gap section */}
      <section className="py-8 bg-white"></section>

      {/* Videos section */}
      <section 
        id="videos" 
        className="py-20"
        style={{ 
          background: 'linear-gradient(102.91deg, rgba(247, 236, 213, 0.65) 1.8%, rgba(238, 201, 249, 0.65) 99.54%)',
          opacity: 1
        }}
      >
        <div className="container mx-auto" style={{ maxWidth: '2048px' }}>
          {/* First Inner Layout - Videos and View More */}
          <div 
            className="mx-auto"
            style={{
              width: '1759px',
              height: '1057px',
              opacity: 1,
              gap: '42px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            {/* Custom Popular Videos Header */}
            <div className="mb-8">
              <div className="flex items-center gap-4">
                <h2 className="text-3xl font-bold text-gray-900">Popular Videos</h2>
                <div className="w-96 h-1 bg-yellow-400 rounded-full"></div>
              </div>
            </div>
            {/* Video Layout - Next Inner Layout */}
            <div 
              className="mx-auto"
              style={{
                width: '1758px',
                height: '920px',
                opacity: 1,
                gap: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start'
              }}
            >
              {/* First Row - 4 Video Cards */}
              <div 
                style={{
                  width: '1758px',
                  height: '450px',
                  opacity: 1,
                  gap: '63px',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                {Array.from({ length: 4 }, (_, i) => {
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
              <article 
                key={i}
                className="bg-transparent overflow-hidden hover:bg-white/10 transition-colors cursor-pointer"
                style={{
                  width: '392px',
                  height: '450px',
                  opacity: 1,
                  gap: '8px',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {/* Video Image with White Border */}
                <div 
                  className="group relative overflow-hidden"
                  style={{
                    width: '392px',
                    height: '272px',
                    borderRadius: '25px',
                    gap: '16px',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'white',
                    padding: '16px',
                    opacity: 1,
                    backgroundColor: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <div className="relative overflow-hidden rounded-lg" style={{ width: '360px', height: '240px' }}>
                    <Image 
                      src={cardImages[i]} 
                      alt={`Video ${i + 1}`} 
                      width={360} 
                      height={240} 
                      className="object-cover rounded-lg transition-transform duration-500 group-hover:scale-110" 
                      style={{
                        width: '360px',
                        height: '240px',
                        borderRadius: '14px',
                        opacity: 1
                      }}
                    />
                    {/* Play Button Overlay - Only on the image */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Description, Time and Date Container */}
                <div 
                  style={{
                    width: '355px',
                    height: '113px',
                    opacity: 1,
                    gap: '13px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    marginTop: '8px'
                  }}
                >
                  {/* Category Tag */}
                  <div className="mb-2">
                    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full" style={{ backgroundColor: '#E5E9FF', color: '#4A64E6' }}>
                      Travel
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-gray-900 font-semibold text-sm leading-tight mb-3" style={{ lineHeight: '1.4', minHeight: '40px' }}>
                    The Impact of Technology on the Workplace: How Technology is Changing
                  </h3>
                  
                  {/* Read Time and Date Container */}
                  <div 
                    className="text-gray-600 text-xs"
                    style={{
                      width: '209px',
                      height: '28px',
                      opacity: 1,
                      gap: '24px',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}
                  >
                    <span>14 min</span>
                    <span>·</span>
                    <span>May 28, 2025</span>
                  </div>
                </div>
              </article>
              );
            })}
              </div>

              {/* Second Row - 4 Video Cards */}
              <div 
                style={{
                  width: '1758px',
                  height: '450px',
                  opacity: 1,
                  gap: '63px',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                {Array.from({ length: 4 }, (_, i) => {
                  const actualIndex = i + 4; // Start from index 4 for second row
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
                  
                  const imageSrc = cardImages[actualIndex];
                  
                  return (
                  <article 
                    key={actualIndex}
                    className="bg-transparent overflow-hidden hover:bg-white/10 transition-colors cursor-pointer"
                    style={{
                      width: '392px',
                      height: '450px',
                      opacity: 1,
                      gap: '8px',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    {/* Video Image with White Border */}
                    <div 
                      className="group relative overflow-hidden"
                      style={{
                        width: '392px',
                        height: '272px',
                        borderRadius: '25px',
                        gap: '16px',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderColor: 'white',
                        padding: '16px',
                        opacity: 1,
                        backgroundColor: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <div className="relative overflow-hidden rounded-lg" style={{ width: '360px', height: '240px' }}>
                        <Image 
                          src={imageSrc} 
                          alt={`Video ${actualIndex + 1}`} 
                          width={360} 
                          height={240} 
                          className="object-cover rounded-lg transition-transform duration-500 group-hover:scale-110" 
                          style={{
                            width: '360px',
                            height: '240px',
                            borderRadius: '14px',
                            opacity: 1
                          }}
                        />
                        {/* Play Button Overlay - Only on the image */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Description, Time and Date Container */}
                    <div 
                      style={{
                        width: '355px',
                        height: '113px',
                        opacity: 1,
                        gap: '13px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        marginTop: '8px'
                      }}
                    >
                      {/* Category Tag */}
                      <div className="mb-2">
                        <span className="inline-block px-3 py-1 text-xs font-medium rounded-full" style={{ backgroundColor: '#E5E9FF', color: '#4A64E6' }}>
                          Travel
                        </span>
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-gray-900 font-semibold text-sm leading-tight mb-3" style={{ lineHeight: '1.4', minHeight: '40px' }}>
                        The Impact of Technology on the Workplace: How Technology is Changing
                      </h3>
                      
                      {/* Read Time and Date Container */}
                      <div 
                        className="text-gray-600 text-xs"
                        style={{
                          width: '209px',
                          height: '28px',
                          opacity: 1,
                          gap: '24px',
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center'
                        }}
                      >
                        <span>14 min</span>
                        <span>·</span>
                        <span>May 28, 2025</span>
                      </div>
                    </div>
                  </article>
                  );
                })}
              </div>
            </div>

            {/* View More Button */}
            <div className="flex justify-end">
              <button 
                className="px-4 py-2 text-white rounded-2xl font-medium transition-colors flex items-center gap-2"
                style={{ backgroundColor: '#3514EE' }}
              >
                View More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* Featured Banner, Newsletter and Footer Section */}
      <section 
        style={{
          width: '2048px',
          height: '2465.46533203125px',
          position: 'absolute',
          top: '6686px',
          opacity: 1,
          gap: '199px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start'
        }}
      >
        {/* Featured banner */}
        <div 
          style={{
            width: '100%',
            height: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <div 
            className="relative rounded-2xl overflow-hidden shadow-smooth group cursor-pointer"
            style={{
              width: '1800px',
              height: '800px'
            }}
          >
            <Image
              src="/images/adde8f33aed2cfe745cae2ca0e5fddb1b7cb7305.png"
              alt="Featured video"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div 
                className="bg-white/90 rounded-full flex items-center justify-center shadow-lg"
                style={{
                  width: '120px',
                  height: '120px'
                }}
              >
                <svg className="w-12 h-12 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter and Footer Container */}
        <div 
          style={{
            width: '2048px',
            height: '1118.4654541015625px',
            opacity: 1,
            paddingTop: '130px',
            paddingRight: '155px',
            paddingBottom: '84px',
            paddingLeft: '155px',
            gap: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          {/* Newsletter */}
          <div style={{ width: '100%' }}>
            <Newsletter />
          </div>

          {/* Footer */}
          <div 
            style={{
              width: '1738px',
              height: '390.4654541015625px',
              opacity: 1,
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Footer />
          </div>
        </div>
      </section>
      
      {/* Scroll-triggered CTA */}
      <ScrollCTA 
        isVisible={showCTA} 
        onJoinClick={showAuthPopup}
        onDismiss={closeCTA}
      />
      
      {/* Authentication Popup */}
      <AuthPopup 
        isOpen={showPopup} 
        onClose={closePopup} 
      />
      
      {/* Debug buttons - only in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 z-[10001] flex flex-col gap-2">
          <button
            onClick={resetCTA}
            className="bg-red-500 text-white px-3 py-2 rounded text-xs"
          >
            Reset CTA
          </button>
          <button
            onClick={() => {
              console.log('Force showing CTA');
              // Force show CTA for testing
              sessionStorage.removeItem('auth-cta-shown');
              window.location.reload();
            }}
            className="bg-blue-500 text-white px-3 py-2 rounded text-xs"
          >
            Show CTA
          </button>
        </div>
      )}
    </main>
  );
}
