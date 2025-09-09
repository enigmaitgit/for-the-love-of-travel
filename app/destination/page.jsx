'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import HeroSection from '../../components/HeroSection.jsx'
import NewSection from '../../components/NewSection.jsx'
import NewsCard from '../../components/NewsCard.jsx'
import DestinationGrid from '../../components/DestinationGrid.jsx'
import PopularPostCard from '../../components/PopularPostCard.jsx'
import FramerCard from '../../components/FramerCard.jsx'
import VideoCard from '../../components/VideoCard.jsx'
import Footer from '../../components/Footer.jsx'



export default function DestinationPage() {

  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [selectedPopularPost, setSelectedPopularPost] = useState(null);

  const cards = [
    { id: 1, image: "/framer1.png", title: "Explore Destinations", description: "Discover amazing places", category: "Tour", readTime: "8 min read", date: "Dec 15, 2024" },
    { id: 2, image: "/framer2.png", title: "Adventure Guide", description: "Thrilling activities await", category: "Adventure", readTime: "6 min read", date: "Dec 12, 2024" },
    { id: 3, image: "/framer3.png", title: "Cultural Experiences", description: "Immerse in local traditions", category: "Culture", readTime: "7 min read", date: "Dec 10, 2024" },
  ];


  return (
    <div className="min-h-screen">
      <HeroSection title="Destination" />
      
      {/* Content Section */}
      <div className="p-4 sm:p-6 md:p-10">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            Destination Page
          </h2>
        </div>
        
        {/* NewSection and NewsCards - Responsive Layout */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 lg:gap-4 mt-4 lg:mt-8">
          {/* NewSection Component - Full width on mobile, left side on desktop */}
          <div className="w-full lg:w-auto">
            <NewSection />
          </div>

          {/* NewsCards - Stacked on mobile, column on desktop */}
          <div className="flex flex-col gap-4 w-full lg:w-auto">
            {/* First NewsCard Component */}
            <NewsCard />
            
            {/* Second NewsCard Component */}
            <NewsCard />
            
            {/* Third NewsCard Component */}
            <NewsCard />
          </div>
        </div>

        {/* Latest Post Title - Responsive */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-8 lg:mt-12 mb-4 lg:mb-8 px-4 lg:px-0">
          {/* Title */}
          <h2 className="text-xl lg:text-2xl font-bold text-black text-left lg:ml-0">
            Latest Post
          </h2>

          {/* Golden Line - Hidden on mobile, visible on desktop */}
          <div className="hidden lg:block w-32 lg:w-48 h-0 border-t-4 border-t-yellow-500 rounded-lg">
          </div>
        </div>

        {/* LatestPostCard Grid - Responsive */}
        <div className="mt-8 lg:mt-20">
          <DestinationGrid />
        </div>
        

        {/* Pagination - Mobile Responsive */}
        <div className="flex justify-center items-center gap-2 lg:gap-4 mt-4 lg:-mt-20 mb-4 lg:mb-8 px-4 lg:px-0">
          <button className="bg-transparent border-none text-gray-600 text-lg cursor-pointer p-2 hover:text-gray-800">
            {'<'}
          </button>
          
          <div className="flex gap-2 lg:gap-4 items-center">
            <span className="text-gray-600 text-sm lg:text-base">1</span>
            <span className="text-gray-600 text-sm lg:text-base">2</span>
            <span className="text-black text-sm lg:text-base font-bold bg-yellow-500 px-2 py-1 rounded">
              3
            </span>
            <span className="text-gray-600 text-sm lg:text-base">4</span>
            <span className="text-gray-600 text-sm lg:text-base">5</span>
            <span className="text-gray-600 text-sm lg:text-base">6</span>
          </div>
          
          <button className="bg-transparent border-none text-gray-600 text-lg cursor-pointer p-2 hover:text-gray-800">
            {'>'}
          </button>
        </div>
        
      </div>

      {/* Popular Post Section with Gradient Background - Mobile Responsive */}
      <div className="bg-gradient-to-r from-yellow-100/45 to-purple-100/45 py-8 lg:py-16 mt-0 mb-8 lg:mb-16">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-8 lg:mb-16 px-4 lg:px-0">
          {/* Title Popular Post */}
          <h2 className="text-xl lg:text-2xl font-bold text-black text-left lg:ml-0">
            Popular Post
          </h2>

          {/* Golden Line - Hidden on mobile, visible on desktop */}
          <div className="hidden lg:block w-32 lg:w-48 h-0 border-t-4 border-t-yellow-500 rounded-lg">
          </div>
        </div>

        {/* Popular Post Cards - Mobile Responsive */}
        <div className="flex flex-col items-center gap-6 lg:gap-8 px-4 lg:px-0">
          <PopularPostCard
            image="/popular1.jpg"
            title="Discover Amazing Destinations Around the World"
            description="Explore breathtaking locations, hidden gems, and cultural experiences that will create unforgettable memories. From tropical beaches to mountain peaks, discover the perfect destination for your next adventure."
            category="Travel"
            readTime="8 min read"
            date="Dec 15, 2024"
            onClick={() => setSelectedPopularPost({
              image: "/popular1.jpg",
              title: "Discover Amazing Destinations Around the World",
              description: "Explore breathtaking locations, hidden gems, and cultural experiences that will create unforgettable memories. From tropical beaches to mountain peaks, discover the perfect destination for your next adventure.",
              category: "Travel",
              readTime: "8 min read",
              date: "Dec 15, 2024"
            })}
          />
          
          <PopularPostCard
            image="/popular2.jpg"
            title="Ultimate Guide to Adventure Travel"
            description="Embark on thrilling adventures with our comprehensive guide to adventure travel. From hiking trails to water sports, discover adrenaline-pumping activities and destinations that will challenge and inspire you."
            category="Adventure"
            readTime="6 min read"
            date="Dec 12, 2024"
            onClick={() => setSelectedPopularPost({
              image: "/popular2.jpg",
              title: "Ultimate Guide to Adventure Travel",
              description: "Embark on thrilling adventures with our comprehensive guide to adventure travel. From hiking trails to water sports, discover adrenaline-pumping activities and destinations that will challenge and inspire you.",
              category: "Adventure",
              readTime: "6 min read",
              date: "Dec 12, 2024"
            })}
          />
          
          <PopularPostCard
            image="/popular3.jpg"
            title="Cultural Heritage and Local Experiences"
            description="Immerse yourself in rich cultural traditions and authentic local experiences. Discover ancient temples, traditional festivals, and local cuisines that tell the story of each destination's unique heritage."
            category="Culture"
            readTime="7 min read"
            date="Dec 10, 2024"
            onClick={() => setSelectedPopularPost({
              image: "/popular3.jpg",
              title: "Cultural Heritage and Local Experiences",
              description: "Immerse yourself in rich cultural traditions and authentic local experiences. Discover ancient temples, traditional festivals, and local cuisines that tell the story of each destination's unique heritage.",
              category: "Culture",
              readTime: "7 min read",
              date: "Dec 10, 2024"
            })}
          />
          
          <PopularPostCard
            image="/popular3.jpg"
            title="Hidden Gems and Off-the-Beaten-Path Destinations"
            description="Explore secret destinations that most travelers never discover. From secluded beaches to mountain villages, uncover hidden gems that offer authentic experiences away from tourist crowds."
            category="Hidden Gems"
            readTime="9 min read"
            date="Dec 8, 2024"
            onClick={() => setSelectedPopularPost({
              image: "/popular3.jpg",
              title: "Hidden Gems and Off-the-Beaten-Path Destinations",
              description: "Explore secret destinations that most travelers never discover. From secluded beaches to mountain villages, uncover hidden gems that offer authentic experiences away from tourist crowds.",
              category: "Hidden Gems",
              readTime: "9 min read",
              date: "Dec 8, 2024"
            })}
          />
        </div>
      </div>

      {/* Framer Card Section - Mobile Responsive */}
      <div className="flex flex-col lg:flex-row lg:gap-8 lg:justify-start lg:items-center lg:h-screen lg:ml-14 px-4 lg:px-0 py-8 lg:py-0">
        {/* Content Section - Top on mobile, Left on desktop */}
        <div className="flex flex-col gap-4 lg:max-w-md mb-8 lg:mb-0 lg:-mt-32">
          <h1 className="font-inter font-semibold text-lg lg:text-xl leading-6 lg:leading-6 tracking-wide text-black">
            Waves & Whispers: Sri Lanka's Hidden Coves
          </h1>
          <p className="font-inter font-normal text-xs lg:text-xs leading-5 lg:leading-5 tracking-wide text-gray-600 mt-2 lg:mt-2">
            A barefoot journey through quiet blue shores A barefoot journey through quiet blue shores
            A barefoot journey through quiet blue shores
          </p>
        </div>

        {/* FramerCard Section - Bottom on mobile, Right on desktop */}
        <div className="flex flex-col sm:flex-row gap-4 lg:gap-4 w-full lg:w-auto">
          {cards.map((card) => (
            <FramerCard
              key={card.id}
              id={card.id}
              image={card.image}
              title={card.title}
              description={card.description}
              category={card.category}
              readTime={card.readTime}
              date={card.date}
              selected={selected}
              setSelected={setSelected}
              hovered={hovered}
              setHovered={setHovered}
            />
          ))}
        </div>
      </div>

      {/* Popular Videos Section - Mobile Responsive */}
      <div className="bg-gradient-to-r from-yellow-100/45 to-purple-100/45 py-8 lg:py-16 mt-0 mb-8 lg:mb-16">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-8 lg:mb-16 px-4 lg:px-0">
          {/* Title Popular Videos */}
          <h2 className="text-xl lg:text-2xl font-bold text-black text-left lg:ml-0">
            Popular Videos
          </h2>

          {/* Golden Line - Hidden on mobile, visible on desktop */}
          <div className="hidden lg:block w-32 lg:w-48 h-0 border-t-4 border-t-yellow-500 rounded-lg">
          </div>
        </div>

        {/* Video Card Section - Mobile Responsive */}
        <div className="flex flex-col lg:flex-row lg:justify-between mt-8 lg:mt-8 mb-8 lg:mb-8 px-4 lg:px-0 gap-4 lg:gap-4">
          {/* Left Side - 3 Video Cards - Stacked on mobile, vertical on desktop */}
          <div className="flex flex-col gap-3 lg:gap-3 w-full lg:w-auto">
            <VideoCard 
              videoSrc=""
              thumbnail="/vi.png"
              title="Travel Guide 1"
              description="Essential tips for your next adventure."
              duration="2:30"
              content="Learn the best travel hacks and insider secrets from experienced travelers around the globe."
              metadata="Views: 125K • Likes: 8.2K • 2 days ago"
            />
            <VideoCard 
              videoSrc=""
              thumbnail="/vi.png"
              title="Travel Guide 2"
              description="Discover hidden gems around the world."
              duration="4:15"
              content="Explore off-the-beaten-path destinations that most tourists never get to see."
              metadata="Views: 89K • Likes: 6.1K • 1 week ago"
            />
            <VideoCard 
              videoSrc=""
              thumbnail="/vi.png"
              title="Travel Guide 3"
              description="Budget travel tips and tricks."
              duration="3:20"
              content="Save money while traveling with these proven strategies and budget-friendly recommendations."
              metadata="Views: 156K • Likes: 12.3K • 3 days ago"
            />
          </div>

          {/* Right Side - Main Video Card - Full width on mobile */}
          <div className="w-full lg:w-auto">
            <VideoCard
              videoSrc=""
              thumbnail="/vi.png"
              title="Amazing Travel Destinations"
              description="Watch this incredible video showcasing the most beautiful destinations around the world."
              duration="3:45"
              size="large"
            />
          </div>
        </div>
        
        {/* View More Button - Centered on mobile, right on desktop */}
        <div className="flex justify-center lg:justify-end mt-6 lg:mt-6 px-4 lg:px-0">
          <button className="w-48 lg:w-48 h-12 lg:h-12 px-4 lg:px-4 gap-2 lg:gap-2 rounded-2xl bg-blue-600 border-none text-white text-base lg:text-base font-semibold cursor-pointer flex items-center justify-center transition-all duration-300 ease-in-out shadow-lg hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-xl"
          onMouseEnter={(e) => {
            e.target.style.background = '#2A0FCC';
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 4px 12px rgba(53, 20, 238, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = '#3514EE';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 2px 8px rgba(53, 20, 238, 0.3)';
          }}
          >
            View More
          </button>
        </div>

      </div>

      <Footer/>

      {/* Popular Post Popup Modal */}
      <AnimatePresence>
        {selectedPopularPost && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPopularPost(null)}
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
                onClick={() => setSelectedPopularPost(null)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Image Section */}
              <div className="relative h-96 w-full">
                <Image
                  src={selectedPopularPost.image}
                  alt={selectedPopularPost.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              {/* Content Section */}
              <div className="p-8">
                <div className="mb-4">
                  <span
                    className="inline-block px-3 py-1 text-sm font-medium rounded-full text-white"
                    style={{ backgroundColor: '#D2AD3F' }}
                  >
                    {selectedPopularPost.category}
                  </span>
                </div>
                
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {selectedPopularPost.title}
                </h2>
                
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {selectedPopularPost.description} This comprehensive guide provides detailed insights and practical tips to help you make the most of your travel experience. Whether you're a seasoned traveler or planning your first adventure, you'll find valuable information to enhance your journey.
                </p>

                <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                  <span>{selectedPopularPost.readTime}</span>
                  <span>•</span>
                  <span>{selectedPopularPost.category}</span>
                  <span>•</span>
                  <span>{selectedPopularPost.date}</span>
                </div>

                <div className="flex gap-4">
                  <motion.button
                    className="px-6 py-3 text-white rounded-lg font-medium transition-colors"
                    style={{ backgroundColor: '#D2AD3F' }}
                    whileHover={{ scale: 1.02, backgroundColor: '#B8941F' }}
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
    </div>
  )
}