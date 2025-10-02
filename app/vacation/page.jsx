'use client';

import { useState, useRef, useEffect } from 'react';
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
import { postsApi, videosApi } from '../../lib/api'



export default function VacationPage() {
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [cards, setCards] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);
  const [videos, setVideos] = useState([]);
  
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

  const framerCards = [
    { id: 1, image: "/framer1.png", title: "Tropical Paradise", description: "Escape to pristine beaches and crystal-clear waters", category: "Beach", readTime: "8 min read", date: "Dec 15, 2024" },
    { id: 2, image: "/framer2.png", title: "Mountain Retreat", description: "Recharge in serene mountain landscapes", category: "Mountains", readTime: "6 min read", date: "Dec 12, 2024" },
    { id: 3, image: "/framer3.png", title: "City Break", description: "Explore vibrant cities and urban adventures", category: "Urban", readTime: "7 min read", date: "Dec 10, 2024" },
  ];

  // Mock data for popular posts as fallback
  const mockPopularPosts = [
    {
      id: "mock-1",
      image: "/popular1.jpg",
      title: "Top 10 All-Inclusive Beach Resorts for the Perfect Vacation",
      description: "Discover the world's most luxurious all-inclusive beach resorts where every detail is taken care of. From the Maldives to the Caribbean, find your perfect tropical paradise getaway.",
      category: "Beach",
      readTime: "8 min read",
      date: "Dec 20, 2024"
    },
    {
      id: "mock-2", 
      image: "/popular2.jpg",
      title: "Family Vacation Ideas: 15 Destinations Perfect for Kids",
      description: "Plan the ultimate family vacation with our curated list of kid-friendly destinations. From theme parks to national parks, create memories that will last a lifetime.",
      category: "Family",
      readTime: "12 min read", 
      date: "Dec 18, 2024"
    },
    {
      id: "mock-3",
      image: "/popular3.jpg", 
      title: "Romantic Getaways: Honeymoon Destinations Around the World",
      description: "Celebrate your love with these enchanting honeymoon destinations. From overwater bungalows to mountain cabins, find the perfect romantic escape for your special trip.",
      category: "Romance",
      readTime: "6 min read",
      date: "Dec 16, 2024"
    },
    {
      id: "mock-4",
      image: "/popular1.jpg",
      title: "Budget Vacation Tips: How to Travel More for Less",
      description: "Learn insider secrets to planning amazing vacations without breaking the bank. Discover budget-friendly destinations, money-saving tips, and how to maximize your vacation budget.",
      category: "Budget", 
      readTime: "10 min read",
      date: "Dec 14, 2024"
    }
  ];

  // Mock data for popular videos as fallback
  const mockPopularVideos = [
    {
      id: "video-mock-1",
      videoSrc: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      thumbnail: "/vi.png",
      title: "Maldives Paradise: Ultimate Beach Vacation Guide",
      description: "Discover the stunning beauty of the Maldives with this comprehensive guide to planning your perfect beach vacation in paradise.",
      duration: "8:45",
      content: "From overwater bungalows to pristine beaches, explore everything you need to know about vacationing in the Maldives.",
      metadata: "Views: 2.3M • Likes: 45K • 2 days ago"
    },
    {
      id: "video-mock-2",
      videoSrc: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
      thumbnail: "/vi.png",
      title: "Disney World Vacation Planning: Tips for the Perfect Family Trip",
      description: "Plan the ultimate Disney World vacation with insider tips, must-see attractions, and money-saving strategies for families.",
      duration: "12:30",
      content: "Learn how to maximize your Disney experience with expert advice on dining, accommodations, and park strategies.",
      metadata: "Views: 1.8M • Likes: 32K • 5 days ago"
    },
    {
      id: "video-mock-3",
      videoSrc: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4",
      thumbnail: "/vi.png",
      title: "European Summer Vacation: 10 Must-Visit Cities",
      description: "Explore the most beautiful European cities perfect for your summer vacation, from Paris to Barcelona and beyond.",
      duration: "15:20",
      content: "Discover the best European destinations for summer travel, including hidden gems and popular tourist spots.",
      metadata: "Views: 3.1M • Likes: 67K • 1 week ago"
    },
    {
      id: "video-mock-4",
      videoSrc: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_10mb.mp4",
      thumbnail: "/vi.png",
      title: "Hawaii Vacation Guide: Islands, Beaches & Adventures",
      description: "Plan your perfect Hawaii vacation with this complete guide to the islands, beaches, and unforgettable adventures.",
      duration: "6:15",
      content: "From Maui's Road to Hana to Oahu's Pearl Harbor, discover all the must-see attractions and activities in Hawaii.",
      metadata: "Views: 4.2M • Likes: 89K • 3 days ago"
    }
  ];

  // Fetch data from backend using postsApi
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await postsApi.getLatestPostCards(7); // Get 7 latest post cards for the grid
        const posts = response.data || [];
        
        // Debug: Log the first post to see the data structure
        if (posts.length > 0) {
          console.log('Sample post data:', posts[0]);
        }
        
        // Map backend Post data to card format expected by DestinationGrid
        const mappedCards = posts.map((post) => ({
          id: post._id,
          image: post.featuredImage?.url,
          title: post.title,
          description: post.excerpt,
          readTime: post.readingTimeText || (post.readingTime ? `${post.readingTime} min read` : '5 min read'),
          category: post.categories?.[0]?.name || 'Travel',
          publishedDate: post.formattedPublishedDate || new Date(post.publishedAt).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
          })
        }));
        
        setCards(mappedCards);
      } catch (err) {
        console.error("Error fetching cards:", err);
        // Set empty array as fallback to prevent errors
        setCards([]);
      }
    };

    fetchCards();
  }, []);

  // Fetch popular posts
  useEffect(() => {
    const fetchPopularPosts = async () => {
      try {
        const response = await postsApi.getPopularPosts(4, '30d'); // Get 4 popular posts from last 30 days
        const posts = response.data || [];
        
        // Map backend Post data to popular post format
        const mappedPopularPosts = posts.map((post) => ({
          id: post._id,
          image: post.featuredImage?.url || "/popular1.jpg",
          title: post.title,
          description: post.excerpt,
          category: post.categories?.[0]?.name || 'Travel',
          readTime: post.readingTimeText || (post.readingTime ? `${post.readingTime} min read` : '5 min read'),
          date: post.formattedPublishedDate || new Date(post.publishedAt).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
          })
        }));
        
        // Use backend data if available, otherwise use mock data
        setPopularPosts(mappedPopularPosts.length > 0 ? mappedPopularPosts : mockPopularPosts);
      } catch (err) {
        console.error("Error fetching popular posts:", err);
        // Use mock data as fallback when API fails
        setPopularPosts(mockPopularPosts);
      }
    };

    fetchPopularPosts();
  }, []);

  // Fetch popular videos
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await videosApi.getPopularVideos(4); // Get 4 popular videos
        const posts = response.data || [];
        
        // Map backend Post data to video format
        const mappedVideos = posts.map((post) => ({
          id: post._id,
          videoSrc: post.videoUrl || "",
          thumbnail: post.featuredImage?.url || "/vi.png",
          title: post.title,
          description: post.excerpt,
          duration: post.videoDuration || "5:30",
          content: post.excerpt,
          metadata: `Views: ${post.viewCount || 0} • Likes: ${post.likeCount || 0} • ${post.formattedPublishedDate || new Date(post.publishedAt).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
          })} ago`
        }));
        
        // Use backend data if available, otherwise use mock data
        setVideos(mappedVideos.length > 0 ? mappedVideos : mockPopularVideos);
      } catch (err) {
        console.error("Error fetching videos:", err);
        // Use mock data as fallback when API fails
        setVideos(mockPopularVideos);
      }
    };

    fetchVideos();
  }, []);

  return (
    <>
      <main className="min-h-screen overflow-x-hidden">
      <div 
        className="w-full h-full"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          transformOrigin: 'top left'
        }}
      >
        <Navbar />
        <HeroSection title="Vacation" />
      
      {/* Main Container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       
        {/* Content Section */}
        <motion.div 
          ref={contentRef}
          className="py-8 sm:py-12 lg:py-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
        <motion.div 
          className="text-center mb-8 sm:mb-12 lg:mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Vacation News Update
          </h2>
        </motion.div>
        
        {/* Featured Content Section - Mobile First */}
        <motion.div 
          ref={newSectionRef}
          className="py-8 sm:py-12 lg:py-16"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Mobile: Stack vertically */}
          <div className="block lg:hidden space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <NewSection />
            </motion.div>
            {[1, 2, 3].map((index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + (index * 0.1) }}
              >
                <NewsCard />
              </motion.div>
            ))}
          </div>

          {/* Desktop: Grid layout */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-8 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <NewSection />
            </motion.div>

            <motion.div 
              className="flex flex-col gap-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <NewsCard />
              <NewsCard />
              <NewsCard />
            </motion.div>
          </div>
        </motion.div>

        {/* Latest Post Title - Mobile First */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-8 sm:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Title */}
          <motion.h2 
            className="text-xl sm:text-2xl lg:text-3xl font-bold text-black text-center sm:text-left"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Latest Post
          </motion.h2>

          {/* Golden Line */}
          <motion.div 
            className="w-32 sm:w-40 lg:w-48 h-1 bg-[#D2AD3F] rounded-lg"
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
          </motion.div>
        </motion.div>
        
        {/* Latest Post Cards Grid - Mobile First */}
        <motion.div
          className="py-8 sm:py-12 lg:py-16"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.7,
            delay: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {/* Mobile: Grid layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:hidden">
            {cards.slice(0, 7).map((card, i) => (
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
                <img 
                  src={card.image || "/popular1.jpg"} 
                  alt={card.title || `Latest post ${i+1}`} 
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 group-hover:opacity-0 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold text-sm leading-tight mb-2 line-clamp-2">
                    {card.title || `Latest Post ${i+1}`}
                  </h3>
                  <div className="text-white/80 text-xs">
                    {card.readTime || '5 min read'}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop: DestinationGrid component */}
          <div className="hidden lg:block">
            <DestinationGrid
              card1={cards[0]}
              card2={cards[1]}
              card3={cards[2]}
              card4={cards[3]}
              card5={cards[4]}
              card6={cards[5]}
              card7={cards[6]}
            />
          </div>

          {/* Pagination */}
          <motion.div
            className="flex justify-center items-center gap-2 sm:gap-4 -mt-16 sm:-mt-20 lg:-mt-20 mb-8 lg:mb-12 px-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.6,
              delay: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {/* left arrow */}
            <motion.button
              className="bg-transparent border-none text-gray-600 text-sm sm:text-lg cursor-pointer p-2 hover:text-[#D2AD3F]"
              whileHover={{ scale: 1.2, color: "#D2AD3F" }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {"<"}
            </motion.button>

            {/* numbers */}
            <motion.div
              className="flex gap-2 sm:gap-4 items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <motion.span
                className="text-gray-600 text-sm sm:text-base cursor-pointer"
                whileHover={{ scale: 1.2, color: "#D2AD3F" }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                1
              </motion.span>
              <motion.span
                className="text-gray-600 text-sm sm:text-base cursor-pointer"
                whileHover={{ scale: 1.2, color: "#D2AD3F" }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                2
              </motion.span>
              <motion.span
                className="text-black text-sm sm:text-base font-bold bg-[#D2AD3F] px-2 py-1 rounded cursor-pointer"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                3
              </motion.span>
              <motion.span
                className="text-gray-600 text-sm sm:text-base cursor-pointer"
                whileHover={{ scale: 1.2, color: "#D2AD3F" }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                4
              </motion.span>
              <motion.span
                className="text-gray-600 text-sm sm:text-base cursor-pointer"
                whileHover={{ scale: 1.2, color: "#D2AD3F" }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                5
              </motion.span>
              <motion.span
                className="text-gray-600 text-sm sm:text-base cursor-pointer"
                whileHover={{ scale: 1.2, color: "#D2AD3F" }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                6
              </motion.span>
            </motion.div>

            {/* right arrow */}
            <motion.button
              className="bg-transparent border-none text-gray-600 text-sm sm:text-lg cursor-pointer p-2 hover:text-[#D2AD3F]"
              whileHover={{ scale: 1.2, color: "#D2AD3F" }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {">"}
            </motion.button>
          </motion.div>
        </motion.div>
        
      </motion.div>

      {/* Popular Post Section with Gradient Background - Mobile First */}
      <motion.div 
        ref={popularPostRef}
        className="py-16 lg:py-24 my-0 mb-16 lg:mb-24 mt-16 lg:mt-24"
        style={{
          background: 'linear-gradient(102.91deg, rgba(247, 236, 213, 0.45) 1.8%, rgba(238, 201, 249, 0.45) 99.54%)',
          minHeight: '150vh'
        }}
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-8 lg:mb-12 -mt-20 mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Title */}
            <motion.h2 
              className="text-xl sm:text-2xl lg:text-3xl font-bold text-black text-center sm:text-left"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Popular Post
            </motion.h2>

            {/* Golden Line */}
            <motion.div 
              className="w-32 sm:w-40 lg:w-48 h-1 bg-[#D2AD3F] rounded-lg"
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
            </motion.div>
          </motion.div>

          {/* Popular Post Cards - Mobile First */}
          <motion.div 
            className="py-8 sm:py-12 lg:py-16"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Mobile: Vertical layout */}
            <div className="block lg:hidden">
              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                {popularPosts.slice(0, 4).map((post, index) => (
                  <motion.div
                    key={post.id}
                    className="bg-white rounded-xl overflow-hidden hover:bg-gray-50 transition-colors cursor-pointer group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ 
                      scale: 1.02,
                      y: -3,
                      transition: { 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 20
                      }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex flex-col sm:flex-row">
                      {/* Image */}
                      <div className="w-full sm:w-48 h-48 sm:h-32 rounded-t-xl sm:rounded-l-xl sm:rounded-t-none overflow-hidden flex-shrink-0">
                        <img 
                          src={post.image || "/popular1.jpg"} 
                          alt={post.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        />
                      </div>
                      
                      {/* Content */}
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Category Tag */}
                          <div className="mb-3">
                            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full" style={{ backgroundColor: '#E5E9FF', color: '#4A64E6' }}>
                              {post.category}
                            </span>
                          </div>
                          
                          {/* Title */}
                          <h3 className="text-gray-900 font-semibold text-sm sm:text-base leading-tight mb-2 line-clamp-2">
                            {post.title}
                          </h3>
                          
                          {/* Description */}
                          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                            {post.description}
                          </p>
                        </div>
                        
                        {/* Metadata */}
                        <div className="text-gray-600 text-xs space-y-1">
                          <div>{post.readTime}</div>
                          <div>{post.date}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Desktop: Vertical layout */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-1 gap-6 max-w-2xl mx-auto">
                {popularPosts.slice(0, 4).map((post, index) => (
                  <motion.div
                    key={post.id}
                    className="bg-white rounded-xl overflow-hidden hover:bg-gray-50 transition-colors cursor-pointer group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ 
                      scale: 1.02,
                      y: -3,
                      transition: { 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 20
                      }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex flex-row">
                      {/* Image */}
                      <div className="w-48 h-32 rounded-l-xl overflow-hidden flex-shrink-0">
                        <img 
                          src={post.image || "/popular1.jpg"} 
                          alt={post.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        />
                      </div>
                      
                      {/* Content */}
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Category Tag */}
                          <div className="mb-3">
                            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full" style={{ backgroundColor: '#E5E9FF', color: '#4A64E6' }}>
                              {post.category}
                            </span>
                          </div>
                          
                          {/* Title */}
                          <h3 className="text-gray-900 font-semibold text-base leading-tight mb-2 line-clamp-2">
                            {post.title}
                          </h3>
                          
                          {/* Description */}
                          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                            {post.description}
                          </p>
                        </div>
                        
                        {/* Metadata */}
                        <div className="text-gray-600 text-xs space-y-1">
                          <div>{post.readTime}</div>
                          <div>{post.date}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* View More Button */}
        <motion.div 
          className="flex items-end px-4 sm:px-6 lg:px-0"
          style={{
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            marginTop: '50px',
            marginBottom: '-50px',
            marginRight: '-50px',
            marginLeft: '350px',
            paddingTop: '40px',
            justifyContent: 'center',
            paddingLeft: '50%'
          }}
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

      {/* Framer Card Section with Left Content */}
      <motion.div 
        ref={framerCardRef}
        className="flex flex-col lg:flex-row gap-4 lg:gap-8 justify-start items-center min-h-screen lg:h-screen px-4 sm:px-6 lg:px-14 py-8 lg:py-0 framer-section"
        style={{ marginTop: '-150px',marginBottom: '-105px' }}
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Content Section - Left Side */}
        <motion.div 
          className="flex flex-col gap-4 max-w-full lg:max-w-md order-2 lg:order-1 framer-content"
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
            Ultimate Vacation Escapes: Where Dreams Come True
          </motion.h1>
          <motion.p 
            className="font-inter font-normal text-xs sm:text-sm leading-5 tracking-wide text-gray-600 mt-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            Discover your perfect getaway with our curated collection of vacation destinations. From tropical beaches to mountain retreats, find the ideal escape that matches your dream vacation style.
          </motion.p>
        </motion.div>

        {/* FramerCard Section - Right Side */}
        <motion.div 
          className="flex flex-col sm:flex-row lg:flex-row gap-4 lg:gap-6 order-1 lg:order-2 w-full lg:w-auto framer-cards"
          initial={{ opacity: 0, x: 100, rotateY: 15 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {framerCards.map((card, index) => (
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
        className="py-8 lg:py-12 my-0 mb-0 video-section"
        style={{
          background: 'linear-gradient(102.91deg, rgba(247, 236, 213, 0.45) 1.8%, rgba(238, 201, 249, 0.45) 99.54%)',
          marginTop: '6rem'
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
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mt-8 lg:mt-12 mb-8 lg:mb-12 px-4 sm:px-6 lg:px-12 xl:px-16 gap-6 lg:gap-8 video-container">
          {/* Left Side - 3 Video Cards Vertical */}
          <div 
            className="flex flex-col gap-4 lg:gap-6 w-full lg:w-auto lg:max-w-md video-sidebar"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              marginRight: '1250px',
              marginLeft: '-130px',
              width: '600px',
              maxWidth: '5000px',
              marginRight: '50px',
              padding: '20px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '15px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            {videos.slice(0, 3).map((video, index) => (
              <VideoCard 
                key={video.id}
                videoSrc={video.videoSrc}
                thumbnail={video.thumbnail}
                title={video.title}
                
                duration={video.duration}
                
                metadata={video.metadata}
                size="small"
              />
            ))}
          </div>

          {/* Right Side - Main Video Card */}
          <div 
            className="w-full lg:w-auto lg:flex-1 flex justify-center lg:justify-end main-video"
            style={{ 
              display: 'flex',
              transform: 'scale(1.45)',
              alignItems: 'center',
              justifyContent: 'flex-end',
              width: '100%',
              maxWidth: '800px',
              marginLeft: '-200px',
              marginRight: '90px',
              padding: '20px',
              position: 'relative'
            }}
          >
            {videos.slice(3, 4).map((video, index) => (
              <VideoCard 
                key={video.id}
                videoSrc={video.videoSrc}
                thumbnail={video.thumbnail}
                title={video.title}
                description={video.description}
                duration={video.duration}
                content={video.content}
                metadata={video.metadata}
                size="large"
              />
            ))}
          </div>
        </div>
        
        {/* View More Button */}
        <motion.div 
          className="flex justify-center lg:justify-end px-4 sm:px-6 lg:px-12 xl:px-16"
          style={{ marginTop: '100px', marginBottom: '0px' }}
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

        </div> {/* Close main-container */}
        
        <Newsletter />
        <Footer />
      </div>
    </main>
    </>
  )
}