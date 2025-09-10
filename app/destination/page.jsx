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
        className="p-6 sm:p-10 relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Destination Page
          </h2>
        </motion.div>
        
        {/* NewSection and NewsCards - Vertical Layout */}
        <motion.div 
          ref={newSectionRef}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '1rem',
            marginTop: '2rem'
          }}
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* NewSection Component - Left side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <NewSection />
          </motion.div>

          {/* NewsCards  */}
          <motion.div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}
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
          style={{
            marginTop: '3rem',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Title */}
          <motion.h2 
            style={{
              color: '#000000',
              fontWeight: 'bold',
              fontSize: '1.5rem',
              margin: 0,
              textAlign: 'left',
              marginLeft: '6%'
            }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Latest Post
          </motion.h2>

          {/* Golden Line */}
          <motion.div 
            style={{
              width: '200px',
              height: '0px',
              borderTop: '15px solid #D2AD3F',
              borderRadius: '8px'
            }}
            initial={{ width: 0 }}
            whileInView={{ width: '200px' }}
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
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
            marginTop: '-80px',
            marginBottom: '2rem'
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.button 
            style={{
              background: 'transparent',
              border: 'none',
              color: '#666666',
              fontSize: '18px',
              cursor: 'pointer',
              padding: '8px'
            }}
            whileHover={{ scale: 1.2, color: '#D2AD3F' }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {'<'}
          </motion.button>
          
          <motion.div 
            style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center'
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.span 
              style={{ color: '#666666', fontSize: '16px' }}
              whileHover={{ scale: 1.2, color: '#D2AD3F' }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >1</motion.span>
            <motion.span 
              style={{ color: '#666666', fontSize: '16px' }}
              whileHover={{ scale: 1.2, color: '#D2AD3F' }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >2</motion.span>
            <motion.span 
              style={{ 
                color: '#000000', 
                fontSize: '16px', 
                fontWeight: 'bold',
                background: '#D2AD3F',
                padding: '4px 8px',
                borderRadius: '4px'
              }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >3</motion.span>
            <motion.span 
              style={{ color: '#666666', fontSize: '16px' }}
              whileHover={{ scale: 1.2, color: '#D2AD3F' }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >4</motion.span>
            <motion.span 
              style={{ color: '#666666', fontSize: '16px' }}
              whileHover={{ scale: 1.2, color: '#D2AD3F' }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >5</motion.span>
            <motion.span 
              style={{ color: '#666666', fontSize: '16px' }}
              whileHover={{ scale: 1.2, color: '#D2AD3F' }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >6</motion.span>
          </motion.div>
          
          <motion.button 
            style={{
              background: 'transparent',
              border: 'none',
              color: '#666666',
              fontSize: '18px',
              cursor: 'pointer',
              padding: '8px'
            }}
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
        style={{
          background: 'linear-gradient(102.91deg, rgba(247, 236, 213, 0.45) 1.8%, rgba(238, 201, 249, 0.45) 99.54%)',
          padding: '2rem 0',
          marginTop: '0rem',
          marginBottom: '2rem'
        }}
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '2rem'
          }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Title  popular post*/}
          <motion.h2 
            style={{
              color: '#000000',
              fontWeight: 'bold',
              fontSize: '1.5rem',
              margin: 0,
              textAlign: 'left',
              marginLeft: '6%'
            }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Popular Post
          </motion.h2>

          {/* Golden Line */}
          <motion.div 
            style={{
              width: '200px',
              height: '0px',
              borderTop: '15px solid #D2AD3F',
              borderRadius: '8px'
            }}
            initial={{ width: 0 }}
            whileInView={{ width: '200px' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
          </motion.div>
        </motion.div>

        {/* Popular Post Cards */}
        <motion.div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2rem'
          }}
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
        style={{ display: "flex", gap: "2rem", justifyContent: "flex-start", alignItems: "center", height: "100vh", marginLeft: "55px" }}
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Content Section - Left Side */}
        <motion.div 
          style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: "1rem",
            maxWidth: "400px"
          }}
          initial={{ opacity: 0, x: -100, rotateY: -15 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.h1 
            style={{
              fontFamily: "Inter",
              fontWeight: 600,
              fontStyle: "small-caps",
              fontSize: "20px",
              lineHeight: "24px",
              letterSpacing: "2%",
              verticalAlign: "top",
              color: "#000000",
              marginTop: "-120px"
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Waves & Whispers: Sri Lanka's Hidden Coves
          </motion.h1>
          <motion.p 
            style={{
              fontFamily: "Inter",
              fontWeight: 400,
              fontStyle: "normal",
              fontSize: "10px",
              lineHeight: "20px",
              letterSpacing: "2%",
              verticalAlign: "middle",
              color: "#545454",
              marginTop: "10px"
            }}
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
          style={{ display: "flex", gap: "1rem" }}
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
        style={{
          background: 'linear-gradient(102.91deg, rgba(247, 236, 213, 0.45) 1.8%, rgba(238, 201, 249, 0.45) 99.54%)',
          padding: '2rem 0',
          marginTop: '0rem',
          marginBottom: '0rem'
        }}
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '2rem'
          }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Title Popular Videos */}
          <motion.h2 
            style={{
              color: '#000000',
              fontWeight: 'bold',
              fontSize: '1.5rem',
              margin: 0,
              textAlign: 'left',
              marginLeft: '6%'
            }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Popular Videos
          </motion.h2>

          {/* Golden Line */}
          <motion.div 
            style={{
              width: '200px',
              height: '0px',
              borderTop: '15px solid #D2AD3F',
              borderRadius: '8px'
            }}
            initial={{ width: 0 }}
            whileInView={{ width: '200px' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
          </motion.div>
        </motion.div>

        {/* Video Card Section */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '2rem',
          marginBottom: '2rem',
          paddingLeft: '6%',
          paddingRight: '10%',
          gap: '1rem'
        }}>
          {/* Left Side - 3 Video Cards Vertical */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.8rem'
          }}>
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
          <VideoCard 
            videoSrc=""
            thumbnail="/vi.png"
            title="Amazing Travel Destinations"
            description="Watch this incredible video showcasing the most beautiful destinations around the world."
            duration="3:45"
            size="large"
          />
        </div>
        
        {/* View More Button */}
        <motion.div 
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '1.5rem',
            paddingRight: '10%'
          }}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.button 
            style={{
              width: '192px',
              height: '50px',
              paddingTop: '10px',
              paddingRight: '15px',
              paddingBottom: '10px',
              paddingLeft: '15px',
              gap: '10px',
              borderRadius: '20px',
              background: '#3514EE',
              border: 'none',
              color: 'white',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(53, 20, 238, 0.3)'
            }}
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