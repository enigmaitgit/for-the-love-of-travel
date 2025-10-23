'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';
import DynamicNavbar from '../../../components/DynamicNavbar';
import HeroSection from '../../../components/HeroSection';
import NewSection from '../../../components/NewSection';
import NewsCard from '../../../components/NewsCard';
import DestinationGrid from '../../../components/DestinationGrid';
import PopularPostCard from '../../../components/PopularPostCard';
import FramerCard from '../../../components/FramerCard';
import VideoCard from '../../../components/VideoCard';
import Newsletter from '../../../components/Newsletter';
import Footer from '../../../components/Footer';

export default function SubcategoryPageTemplate({ pageData }) {
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [cards, setCards] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videosLoading, setVideosLoading] = useState(true);
  
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

  // Default framer cards (can be customized via pageData)
  const defaultFramerCards = [
    { id: 1, image: "/framer1.png", title: "Explore Destinations", description: "Discover amazing places", category: "Tour", readTime: "8 min read", date: "Dec 15, 2024" },
    { id: 2, image: "/framer2.png", title: "Adventure Guide", description: "Thrilling activities await", category: "Adventure", readTime: "6 min read", date: "Dec 12, 2024" },
    { id: 3, image: "/framer3.png", title: "Cultural Experiences", description: "Immerse in local traditions", category: "Culture", readTime: "7 min read", date: "Dec 10, 2024" },
  ];

  const framerCards = pageData?.sections?.framerCards?.cards || defaultFramerCards;

  // Fetch posts for this subcategory
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch posts for this subcategory
        const base = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
        const subcategorySlug = pageData.subcategory?.slug;
        
        if (subcategorySlug) {
          // First, get the category ID from the slug
          const categoryResponse = await fetch(`${base}/api/v1/categories/tree`);
          let categoryId = null;
          
          if (categoryResponse.ok) {
            const categoryData = await categoryResponse.json();
            if (categoryData.success) {
              // Find the category by slug
              const findCategory = (categories) => {
                for (const category of categories) {
                  if (category.slug === subcategorySlug) {
                    return category._id;
                  }
                  if (category.children && category.children.length > 0) {
                    const found = findCategory(category.children);
                    if (found) return found;
                  }
                }
                return null;
              };
              
              categoryId = findCategory(categoryData.data);
            }
          }
          
          if (categoryId) {
            // Fetch latest posts for this subcategory using category ID
            const latestResponse = await fetch(`${base}/api/v1/posts?categories=${categoryId}&limit=7&status=published`);
            if (latestResponse.ok) {
              const latestData = await latestResponse.json();
              if (latestData.success) {
                const mappedCards = latestData.data.map((post) => {
                  // Handle image URL properly - use the same logic as homepage
                  let imageUrl = post.featuredMedia?.url || post.featuredImage?.url || post.featuredImage || null;
                  
                  // Transform media URLs from admin frontend (port 3002) to backend (port 5000)
                  if (imageUrl && typeof imageUrl === 'string' && imageUrl.includes('localhost:3002/api/admin/media/serve/')) {
                    imageUrl = imageUrl.replace('localhost:3002/api/admin/media/serve/', 'localhost:5000/api/v1/media/serve/');
                  }
                  
                  // Handle relative URLs
                  if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('/') && !imageUrl.startsWith('data:')) {
                    imageUrl = `http://localhost:5000/api/v1/media/serve/${encodeURIComponent(imageUrl)}`;
                  }
                  
                  // Use a proper fallback image that exists
                  if (!imageUrl || imageUrl === '/images/placeholder.jpg') {
                    imageUrl = '/images/3969146248009e641f454298f62e13de84ac0a09.jpg';
                  }
                  
                  return {
                    id: post._id,
                    slug: post.slug,
                    image: imageUrl,
                    featuredMedia: post.featuredMedia,
                    title: post.title,
                    description: post.excerpt || post.body?.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
                    readTime: post.readingTimeText || (post.readingTime ? `${post.readingTime} min read` : '5 min read'),
                    categories: post.categories || [],
                    category: post.categories?.[0]?.name || 'Travel',
                    publishedDate: post.formattedPublishedDate || (post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    }) : new Date().toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    }))
                  };
                });
                setCards(mappedCards);
              }
            }

            // Fetch popular posts for this subcategory using category ID
            const popularResponse = await fetch(`${base}/api/v1/posts?categories=${categoryId}&limit=4&status=published&sortBy=viewCount&sortOrder=desc`);
            if (popularResponse.ok) {
              const popularData = await popularResponse.json();
              if (popularData.success) {
                const mappedPopularPosts = popularData.data.map((post) => {
                  // Handle image URL properly - use the same logic as homepage
                  let imageUrl = post.featuredMedia?.url || post.featuredImage?.url || post.featuredImage || null;
                  
                  // Transform media URLs from admin frontend (port 3002) to backend (port 5000)
                  if (imageUrl && typeof imageUrl === 'string' && imageUrl.includes('localhost:3002/api/admin/media/serve/')) {
                    imageUrl = imageUrl.replace('localhost:3002/api/admin/media/serve/', 'localhost:5000/api/v1/media/serve/');
                  }
                  
                  // Handle relative URLs
                  if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('/') && !imageUrl.startsWith('data:')) {
                    imageUrl = `http://localhost:5000/api/v1/media/serve/${encodeURIComponent(imageUrl)}`;
                  }
                  
                  // Use a proper fallback image that exists
                  if (!imageUrl || imageUrl === '/images/placeholder.jpg') {
                    imageUrl = '/images/3969146248009e641f454298f62e13de84ac0a09.jpg';
                  }
                  
                  return {
                    id: post._id,
                    image: imageUrl,
                    featuredMedia: post.featuredMedia,
                    title: post.title,
                    description: post.excerpt || post.body?.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
                    category: post.categories?.[0]?.name || 'Travel',
                    readTime: post.readingTimeText || (post.readingTime ? `${post.readingTime} min read` : '5 min read'),
                    date: post.formattedPublishedDate || new Date(post.publishedAt).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })
                  };
                });
                setPopularPosts(mappedPopularPosts);
              }
            }
          } else {
            console.warn(`Category with slug "${subcategorySlug}" not found`);
          }
        }

        // Use popular posts as videos for now - this will be called after popularPosts is set
        // We'll handle this in a separate useEffect

      } catch (err) {
        console.error("Error fetching posts:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (pageData?._id) {
      fetchPosts();
    }
  }, [pageData]);

      // Fetch videos separately
      useEffect(() => {
        const fetchVideos = async () => {
          try {
            setVideosLoading(true);
            const base = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
            
            // Fetch popular videos from the backend
            const response = await fetch(`${base}/api/v1/homepage-content/videos/popular?limit=8`);
            const data = await response.json();
            
            console.log('Video API response:', data);
            
            if (data.success) {
              console.log('Videos data:', data.data);
              setVideos(data.data);
            } else {
              console.log('Video API error:', data.message);
              setVideos([]);
            }
          } catch (err) {
            console.error('Error fetching videos:', err);
            setVideos([]);
          } finally {
            setVideosLoading(false);
          }
        };

        fetchVideos();
      }, []);

  // Show fallback content if no posts available
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D2AD3F] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading content...</p>
        </div>
      </div>
    );
  }

  if (error || (!cards.length && !popularPosts.length)) {
    return (
      <main className="min-h-screen overflow-x-hidden">
        <DynamicNavbar />
        
        {/* Custom Hero Section */}
        <div 
          className="relative w-full h-screen flex items-center justify-center"
          style={{
            backgroundImage: pageData?.hero?.backgroundImage ? `url(${pageData.hero.backgroundImage})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div 
            className="absolute inset-0"
            style={{
              backgroundColor: `rgba(0, 0, 0, ${pageData?.hero?.overlayOpacity || 0.3})`
            }}
          ></div>
          
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              {pageData?.hero?.title || pageData?.subcategory?.name || 'Subcategory'}
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto">
              {pageData?.hero?.description || pageData?.fallbackContent?.message || 'Posts are not available for this subcategory yet. Check back soon!'}
            </p>
          </div>
        </div>

        <Footer />
      </main>
    );
  }

  return (
    <>
      <style jsx>{`
        .container {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .news-section,
        .hero-section,
        .content-section,
        .popular-post-section,
        .framer-section,
        .video-section {
          width: 100%;
          max-width: 100%;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .new-section {
          width: 100% !important;
          max-width: 100% !important;
          margin: 0 auto !important; 
          padding: 0 1rem !important;
        }

        .main-video {
          width: 100% !important;
          max-width: 100% !important;
          margin: 10px auto !important;
          transform: scale(1.45) !important;
        }

        /* Responsive styles - same as destination page */
        @media (max-width: 1024px) {
          .container {
            padding: 0 1rem;
          }

          .news-section {
            flex-direction: column !important;
            gap: 2rem !important;
          }

          .news-cards,
          .new-section {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 auto !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
          }
        }

        @media (max-width: 768px) {
          .container {
            padding: 0 0.5rem;
          }

          .hero-section {
            margin: 0 auto !important;
            padding: 0 1rem !important;
          }

          .content-section {
            padding: 1rem !important;
          }

          .news-section {
            margin-top: 2rem !important;
            gap: 1.5rem !important;
          }

          .news-cards,
          .new-section {
            margin: 0 auto !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
          }

          .latest-post-title {
            flex-direction: column !important;
            align-items: center !important;
            gap: 1rem !important;
            margin: 2rem auto 0 !important;
            display: flex !important;
            justify-content: center !important;
            text-align: center !important;
          }

          .flex.latest-post-title {
            align-items: center !important;
            justify-content: center !important;
            text-align: center !important;
          }

          .latest-post-title h2 {
            text-align: center !important;
            margin: 0 auto !important;
          }

          .destination-grid {
            margin: 1rem 0 2rem !important;
          }

          .popular-post-section {
            padding: 2rem 1rem !important;
            min-height: auto !important;
            margin-top: 6rem !important;
          }

          .popular-post-title {
            margin: 0 0 2rem 0 !important;
            flex-direction: column !important;
            align-items: flex-start !important;
          }

          .popular-post-cards {
            gap: 2rem !important;
          }

          .popular-post-cards > div:nth-child(5) {
            display: none !important;
          }

          .framer-section {
            flex-direction: column !important;
            min-height: auto !important;
            padding: 2rem 1rem !important;
            margin-top: 4rem !important;
          }

          .framer-section[style*="marginTop"] {
            margin-top: 4rem !important;
          }

          .framer-content {
            order: 2 !important;
            max-width: 100% !important;
            margin-top: 2rem !important;
          }

          .framer-cards {
            order: 1 !important;
            width: 100% !important;
          }

          .video-section {
            padding: 2rem 1rem !important;
            margin-top: 6rem !important;
          }

          .video-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }

          .video-sidebar {
            grid-template-rows: repeat(3, auto) !important;
            gap: 1rem !important;
          }

          .main-video {
            margin: 1rem auto !important;
            width: 100% !important;
            max-width: 100% !important;
            transform: none !important;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 0 0.25rem;
          }

          .content-section {
            padding: 0.5rem !important;
          }

          .news-section {
            margin-top: 1rem !important;
            gap: 1rem !important;
          }

          .news-cards,
          .new-section {
            margin: 0 auto !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
          }

          .latest-post-title h2 {
            font-size: 1.5rem !important;
          }

          .latest-post-title {
            align-items: center !important;
            display: flex !important;
            justify-content: center !important;
            text-align: center !important;
          }

          .flex.latest-post-title {
            align-items: center !important;
            justify-content: center !important;
            text-align: center !important;
          }

          .latest-post-title h2 {
            text-align: center !important;
            margin: 0 auto !important;
          }

          .popular-post-section {
            padding: 1rem 0.5rem !important;
            margin-top: 7.5rem !important;
          }

          .popular-post-title h2 {
            font-size: 1.5rem !important;
          }

          .popular-post-cards > div:nth-child(5) {
            display: none !important;
          }

          .framer-section {
            padding: 1rem 0.5rem !important;
            margin-top: 5rem !important;
          }

          .framer-section[style*="marginTop"] {
            margin-top: 5rem !important;
          }

          .video-section {
            padding: 1rem 0.5rem !important;
            margin-top: 6rem !important;
          }

          .main-video {
            margin: 0.5rem auto !important;
            width: 100% !important;
            transform: none !important;
          }
        }
      `}</style>
      
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
          <DynamicNavbar />
          
          {/* Custom Hero Section */}
          <div 
            className="relative w-full h-screen flex items-center justify-center"
            style={{
              backgroundImage: pageData?.hero?.backgroundImage ? `url(${pageData.hero.backgroundImage})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div 
              className="absolute inset-0"
              style={{
                backgroundColor: `rgba(0, 0, 0, ${pageData?.hero?.overlayOpacity || 0.3})`
              }}
            ></div>
            
            <div className="relative z-10 text-center text-white px-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                {pageData?.hero?.title || pageData?.subcategory?.name || 'Subcategory'}
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto">
                {pageData?.hero?.description || 'Discover amazing destinations and travel stories'}
              </p>
            </div>
          </div>
        
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
                {pageData?.subcategory?.name || 'Subcategory'} Page
              </h2>
            </motion.div>
            
            {/* NewSection and NewsCards - Responsive Layout */}
            <motion.div 
              ref={newSectionRef}
              className="flex flex-col lg:flex-row justify-between items-start gap-4 lg:gap-6 mt-8 lg:mt-12 news-section"
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* NewSection Component - Left side */}
              <motion.div
                className="w-full lg:w-auto lg:flex-shrink-0 new-section new-section-desktop"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  maxWidth: '400px',
                  margin: '0 auto',
                  gap: '1200px'
                }}
              >
                <NewSection />
              </motion.div>

              {/* NewsCards - Merged Section */}
              <motion.div 
                className="flex flex-col gap-4 lg:gap-6 w-full lg:w-auto items-start news-cards news-cards-desktop"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '90%',
                  maxWidth: '450px',
                  margin: '0 auto',
                  gap: '35px'
                }}
              >
                <NewsCard />
                <NewsCard />
                <NewsCard />
              </motion.div>
            </motion.div>

            {/* Latest Post Title - Below NewsCards */}
            <motion.div 
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 px-4 sm:px-6 lg:px-0 latest-post-title"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                marginTop: '2rem',
                display: 'flex !important',
                justifyContent: 'center !important',
                alignItems: 'center !important',
                textAlign: 'center !important'
              }}
            >
              {/* Title */}
              <motion.h2 
                className="text-xl sm:text-2xl lg:text-3xl font-bold text-black text-center sm:text-left ml-0 sm:ml-6 lg:ml-12"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {pageData?.sections?.latestPosts?.title || 'Latest Post'}
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

            {/* LatestPostCard Grid with Data Fetching and Pagination */}
            <motion.div
              className="destination-grid"
              style={{ marginTop: "220px", marginBottom: "60px" }}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {/* Pass fetched data as props */}
              <DestinationGrid
                card1={cards[0]}
                card2={cards[1]}
                card3={cards[2]}
                card4={cards[3]}
                card5={cards[4]}
                card6={cards[5]}
                card7={cards[6]}
              />

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

          {/* Popular Post Section with Gradient Background */}
          {pageData?.sections?.popularPosts?.isEnabled !== false && (
            <motion.div 
              ref={popularPostRef}
              className="py-16 lg:py-24 my-0 mb-16 lg:mb-24 popular-post-section"
              style={{
                background: 'linear-gradient(102.91deg, rgba(247, 236, 213, 0.45) 1.8%, rgba(238, 201, 249, 0.45) 99.54%)',
                minHeight: '150vh',
                marginTop: '6rem'
              }}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.div 
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-8 lg:mb-12 px-4 sm:px-6 lg:px-0 popular-post-title"
                style={{ marginTop: '-80px', marginBottom: '80px' }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* Title popular post*/}
                <motion.h2 
                  className="text-xl sm:text-2xl lg:text-3xl font-bold text-black text-left ml-0 sm:ml-6 lg:ml-12"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {pageData?.sections?.popularPosts?.title || 'Popular Post'}
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
                className="flex flex-col items-center px-4 sm:px-6 lg:px-0 popular-post-cards"
                style={{ gap: '180px' }}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {popularPosts.length > 0 ? (
                  popularPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 50, rotateX: -10 }}
                      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.6, delay: 0.6 + (index * 0.1), ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      <PopularPostCard 
                        image={post.image}
                        featuredMedia={post.featuredMedia}
                        title={post.title}
                        description={post.description}
                        category={post.category}
                        readTime={post.readTime}
                        date={post.date}
                      />
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-semibold text-gray-600 mb-4">No popular posts yet</h3>
                    <p className="text-gray-500">Check back later for popular content in this subcategory.</p>
                  </div>
                )}
              </motion.div>
              
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
          )}

          {/* Framer Card Section with Left Content */}
          {pageData?.sections?.framerCards?.isEnabled !== false && (
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
                  {pageData?.sections?.framerCards?.title || 'Featured Stories'}
                </motion.h1>
                <motion.p 
                  className="font-inter font-normal text-xs sm:text-sm leading-5 tracking-wide text-gray-600 mt-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  Discover amazing stories and experiences from {pageData?.subcategory?.name || 'this destination'}
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
          )}

          {/* Popular Videos Section - Homepage Style */}
          {pageData?.sections?.videos?.isEnabled !== false && (
            <motion.section
              ref={videoSectionRef}
              className="py-12 sm:py-16 lg:py-20"
              style={{ 
                background: "linear-gradient(to right, #F7ECD5, #EEC9F9)",
                marginTop: '6rem'
              }}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="container mx-auto px-4">
                {/* Header */}
                <motion.div 
                  className="mb-12"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <div className="flex items-center gap-6">
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
                      {pageData?.sections?.videos?.title || 'Popular Videos'}
                    </h2>
                    <div className="w-96 h-2 bg-yellow-400 rounded-full"></div>
                  </div>
                </motion.div>

                {/* Videos Grid - Homepage Style */}
                {videosLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="bg-gray-200 animate-pulse rounded-xl h-64"></div>
                    ))}
                  </div>
                ) : videos.length > 0 ? (
                  <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12"
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    {videos.map((video, i) => {
                      console.log(`Rendering video ${i + 1}:`, video.title, 'Thumbnail:', video.thumbnail);
                      return (
                      <motion.div
                        key={video._id}
                        className="bg-transparent rounded-xl overflow-hidden hover:bg-white/10 transition-colors"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        viewport={{ once: true, amount: 0.3 }}
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
                        {/* Video Image */}
                        <div className="h-48 sm:h-56 rounded-xl overflow-hidden border-4 sm:border-8 border-white group relative pointer-events-none">
                          {video.thumbnail ? (
                            <Image
                              src={video.thumbnail}
                              alt={video.title}
                              width={400}
                              height={224}
                              className="w-full h-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-110"
                              onError={(e) => {
                                console.error('Image load error for:', video.title);
                                console.log('Failed URL:', video.thumbnail);
                                console.log('Video data:', video);
                                // Hide the failed image and show fallback
                                e.target.style.display = 'none';
                                const fallback = e.target.nextElementSibling;
                                if (fallback) {
                                  fallback.style.display = 'flex';
                                  console.log('Fallback displayed for:', video.title);
                                } else {
                                  console.error('Fallback element not found for:', video.title);
                                }
                              }}
                              onLoad={() => {
                                console.log('Image loaded successfully for:', video.title);
                              }}
                              unoptimized={true}
                              priority={false}
                            />
                          ) : null}
                          {/* Fallback for missing/failed images */}
                          <div 
                            className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center rounded-lg"
                            style={{ display: video.thumbnail ? 'none' : 'flex' }}
                          >
                            <div className="text-center">
                              <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-2">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                              <span className="text-gray-600 text-sm font-medium">Video</span>
                            </div>
                          </div>
                          {/* Static Play Button - No interaction */}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-4 sm:p-5">
                          <h3 className="font-semibold text-sm sm:text-base mb-2 line-clamp-2 text-gray-900">
                            {video.title}
                          </h3>
                          {video.description && (
                            <p className="text-gray-600 text-xs sm:text-sm mb-2 line-clamp-2">
                              {video.description}
                            </p>
                          )}
                          <div className="text-gray-500 text-xs">
                            {video.duration && `${video.duration} • `}
                            {video.viewCount ? `${video.viewCount} views` : '0 views'}
                          </div>
                        </div>
                      </motion.div>
                      );
                    })}
                  </motion.div>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-semibold text-gray-600 mb-4">No videos available yet</h3>
                    <p className="text-gray-500">Check back later for video content in this subcategory.</p>
                  </div>
                )}
              </div>
            </motion.section>
          )}

          <Newsletter />
          <Footer />
        </div>
      </main>
    </>
  );
}
