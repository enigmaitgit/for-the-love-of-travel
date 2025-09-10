'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Navbar from '../../components/Navbar.jsx'
import HeroSection from '../../components/HeroSection.jsx'
import NewSection from '../../components/NewSection.jsx'
import NewsCard from '../../components/NewsCard.jsx'
import DestinationGrid from '../../components/DestinationGrid.jsx'
import PopularPostCard from '../../components/PopularPostCard.jsx'
import FramerCard from '../../components/FramerCard.jsx'
import VideoCard from '../../components/VideoCard.jsx'
import Newsletter from '../../components/Newsletter.jsx'
import Footer from '../../components/Footer.jsx'



export default function DestinationPage() {
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);
  
  // Refs for scroll animations
  const contentRef = useRef(null);
  const newSectionRef = useRef(null);
  const popularPostRef = useRef(null);
  const videoSectionRef = useRef(null);
  const framerCardRef = useRef(null);
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const cards = [
    { id: 1, image: "/framer1.png", title: "Explore Destinations", description: "Discover amazing places", category: "Tour", readTime: "8 min read", date: "Dec 15, 2024" },
    { id: 2, image: "/framer2.png", title: "Adventure Guide", description: "Thrilling activities await", category: "Adventure", readTime: "6 min read", date: "Dec 12, 2024" },
    { id: 3, image: "/framer3.png", title: "Cultural Experiences", description: "Immerse in local traditions", category: "Culture", readTime: "7 min read", date: "Dec 10, 2024" },
  ];


  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection title="Destinations" />
      
      {/* Content Section */}
      <motion.div 
        ref={contentRef}
        className="p-4 sm:p-6 lg:p-10 relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.div 
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Destination Page
          </h2>
        </motion.div>
        
        {/* NewSection and NewsCards - Responsive Layout */}
        <motion.div 
          ref={newSectionRef}
          className="flex flex-col lg:flex-row justify-between items-start gap-4 lg:gap-6 mt-8 lg:mt-12"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* NewSection Component - Left side */}
          <motion.div
            className="w-full lg:w-auto lg:flex-shrink-0"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <NewSection />
          </motion.div>

          {/* NewsCards */}
          <motion.div 
            className="flex flex-col gap-4 lg:gap-6 w-full lg:w-auto"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* First NewsCard Component */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <NewsCard />
            </motion.div>
            
            {/* Second NewsCard Component */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <NewsCard />
            </motion.div>
            
            {/* Third NewsCard Component */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <NewsCard />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Latest Post Title - Below NewsCards */}
        <motion.div 
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mt-12 lg:mt-16 mb-8 lg:mb-12 px-4 sm:px-6 lg:px-0"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Title */}
          <motion.h2 
            className="text-xl sm:text-2xl lg:text-3xl font-bold text-black text-left ml-0 sm:ml-6 lg:ml-12"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Latest Post
          </motion.h2>

          {/* Golden Line */}
          <motion.div 
            className="w-32 sm:w-40 lg:w-48 h-0 border-t-4 border-[#D2AD3F] rounded-lg"
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
          </motion.div>
        </motion.div>

        {/* LatestPostCard Grid - Simple responsive grid */}
        <motion.div 
          style={{ marginTop: '80px' }}
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <DestinationGrid />
        </motion.div>
        

        {/* Pagination */}
        <motion.div 
          className="flex justify-center items-center gap-2 sm:gap-4 -mt-16 sm:-mt-20 lg:-mt-20 mb-8 lg:mb-12 px-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.button 
            className="bg-transparent border-none text-gray-600 text-sm sm:text-lg cursor-pointer p-2 hover:text-[#D2AD3F]"
            whileHover={{ scale: 1.2, color: '#D2AD3F' }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {'<'}
          </motion.button>
          
          <motion.div 
            className="flex gap-2 sm:gap-4 items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.span 
              className="text-gray-600 text-sm sm:text-base cursor-pointer"
              whileHover={{ scale: 1.2, color: '#D2AD3F' }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >1</motion.span>
            <motion.span 
              className="text-gray-600 text-sm sm:text-base cursor-pointer"
              whileHover={{ scale: 1.2, color: '#D2AD3F' }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >2</motion.span>
            <motion.span 
              className="text-black text-sm sm:text-base font-bold bg-[#D2AD3F] px-2 py-1 rounded cursor-pointer"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >3</motion.span>
            <motion.span 
              className="text-gray-600 text-sm sm:text-base cursor-pointer"
              whileHover={{ scale: 1.2, color: '#D2AD3F' }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >4</motion.span>
            <motion.span 
              className="text-gray-600 text-sm sm:text-base cursor-pointer"
              whileHover={{ scale: 1.2, color: '#D2AD3F' }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >5</motion.span>
            <motion.span 
              className="text-gray-600 text-sm sm:text-base cursor-pointer"
              whileHover={{ scale: 1.2, color: '#D2AD3F' }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >6</motion.span>
          </motion.div>
          
          <motion.button 
            className="bg-transparent border-none text-gray-600 text-sm sm:text-lg cursor-pointer p-2 hover:text-[#D2AD3F]"
            whileHover={{ scale: 1.2, color: '#D2AD3F' }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {'>'}
          </motion.button>
        </motion.div>
        
      </motion.div>

      {/* Popular Post Section with Gradient Background */}
      <motion.div 
        ref={popularPostRef}
        className="py-8 lg:py-12 my-0 mb-8 lg:mb-12"
        style={{
          background: 'linear-gradient(102.91deg, rgba(247, 236, 213, 0.45) 1.8%, rgba(238, 201, 249, 0.45) 99.54%)'
        }}
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.div 
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-8 lg:mb-12 px-4 sm:px-6 lg:px-0"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Title  popular post*/}
          <motion.h2 
            className="text-xl sm:text-2xl lg:text-3xl font-bold text-black text-left ml-0 sm:ml-6 lg:ml-12"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Popular Post
          </motion.h2>

          {/* Golden Line */}
          <motion.div 
            className="w-32 sm:w-40 lg:w-48 h-0 border-t-4 border-[#D2AD3F] rounded-lg"
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
          </motion.div>
        </motion.div>

        {/* Popular Post Cards */}
        <motion.div 
          className="flex flex-col items-center gap-6 lg:gap-8 px-4 sm:px-6 lg:px-0"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: -10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <PopularPostCard 
              image="/popular1.jpg"
              title="Discover Amazing Destinations Around the World"
              description="Explore breathtaking locations, hidden gems, and cultural experiences that will create unforgettable memories. From tropical beaches to mountain peaks, discover the perfect destination for your next adventure."
              category="Travel"
              readTime="8 min read"
              date="Dec 15, 2024"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: -10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.3, delay: 0.7 }}
          >
            <PopularPostCard 
              image="/popular2.jpg"
              title="Ultimate Guide to Adventure Travel"
              description="Embark on thrilling adventures with our comprehensive guide to adventure travel. From hiking trails to water sports, discover adrenaline-pumping activities and destinations that will challenge and inspire you."
              category="Adventure"
              readTime="6 min read"
              date="Dec 12, 2024"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: -10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.3, delay: 0.8 }}
          >
            <PopularPostCard 
              image="/popular3.jpg"
              title="Cultural Heritage and Local Experiences"
              description="Immerse yourself in rich cultural traditions and authentic local experiences. Discover ancient temples, traditional festivals, and local cuisines that tell the story of each destination's unique heritage."
              category="Culture"
              readTime="7 min read"
              date="Dec 10, 2024"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: -10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.3, delay: 0.9 }}
          >
            <PopularPostCard 
              image="/popular3.jpg"
              title="Hidden Gems and Off-the-Beaten-Path Destinations"
              description="Explore secret destinations that most travelers never discover. From secluded beaches to mountain villages, uncover hidden gems that offer authentic experiences away from tourist crowds."
              category="Hidden Gems"
              readTime="9 min read"
              date="Dec 8, 2024"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Framer Card Section with Left Content */}
      <motion.div 
        ref={framerCardRef}
        className="flex flex-col lg:flex-row gap-4 lg:gap-8 justify-start items-center min-h-screen lg:h-screen px-4 sm:px-6 lg:px-14 py-8 lg:py-0"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Content Section - Left Side */}
        <motion.div 
          className="flex flex-col gap-4 max-w-full lg:max-w-md order-2 lg:order-1"
          initial={{ opacity: 0, x: -100, rotateY: -15 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.h1 
            className="font-inter font-semibold text-sm sm:text-base lg:text-xl leading-tight tracking-wide text-black -mt-0 lg:-mt-32"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Waves & Whispers: Sri Lanka's Hidden Coves
          </motion.h1>
          <motion.p 
            className="font-inter font-normal text-xs sm:text-sm leading-5 tracking-wide text-gray-600 mt-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            A barefoot journey through quiet blue shores   A barefoot journey through quiet blue shores
            A barefoot journey through quiet blue shores
          </motion.p>
        </motion.div>

        {/* FramerCard Section - Right Side */}
        <motion.div 
          className="flex flex-col sm:flex-row lg:flex-row gap-4 lg:gap-6 order-1 lg:order-2 w-full lg:w-auto"
          initial={{ opacity: 0, x: 100, rotateY: 15 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {cards.map((card, index) => (
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
              index={index}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Popular Videos Section with Gradient Background */}
      <motion.div 
        ref={videoSectionRef}
        className="py-8 lg:py-12 my-0 mb-0"
        style={{
          background: 'linear-gradient(102.91deg, rgba(247, 236, 213, 0.45) 1.8%, rgba(238, 201, 249, 0.45) 99.54%)'
        }}
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.div 
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-8 lg:mb-12 px-4 sm:px-6 lg:px-0"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Title Popular Videos */}
          <motion.h2 
            className="text-xl sm:text-2xl lg:text-3xl font-bold text-black text-left ml-0 sm:ml-6 lg:ml-12"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Popular Videos
          </motion.h2>

          {/* Golden Line */}
          <motion.div 
            className="w-32 sm:w-40 lg:w-48 h-0 border-t-4 border-[#D2AD3F] rounded-lg"
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
          </motion.div>
        </motion.div>

        {/* Video Card Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mt-8 lg:mt-12 mb-8 lg:mb-12 px-4 sm:px-6 lg:px-12 xl:px-16 gap-6 lg:gap-8">
          {/* Left Side - 3 Video Cards Vertical */}
          <div className="flex flex-col gap-4 lg:gap-6 w-full lg:w-auto lg:max-w-md">
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

          {/* Right Side - Main Video Card */}
          <div className="w-full lg:w-auto lg:flex-1 flex justify-center lg:justify-end">
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
        
        {/* View More Button */}
        <motion.div 
          className="flex justify-center lg:justify-end mt-6 lg:mt-8 px-4 sm:px-6 lg:px-12 xl:px-16"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.button 
            className="w-40 sm:w-48 lg:w-52 h-12 lg:h-14 px-4 lg:px-6 py-2 lg:py-3 gap-2 lg:gap-3 rounded-2xl bg-[#3514EE] border-none text-white text-sm lg:text-base font-semibold cursor-pointer flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ 
              scale: 1.05,
              y: -3,
              boxShadow: '0 8px 20px rgba(53, 20, 238, 0.4)',
              background: '#2A0FCC'
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            View More
          </motion.button>
        </motion.div>

      </motion.div>

      <Newsletter />
      <Footer />
    </main>
  )
}