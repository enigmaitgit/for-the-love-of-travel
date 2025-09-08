'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar.jsx'
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

  const cards = [
    { id: 1, image: "/framer1.png", title: "Explore Destinations", description: "Discover amazing places", category: "Tour", readTime: "8 min read", date: "Dec 15, 2024" },
    { id: 2, image: "/framer2.png", title: "Adventure Guide", description: "Thrilling activities await", category: "Adventure", readTime: "6 min read", date: "Dec 12, 2024" },
    { id: 3, image: "/framer3.png", title: "Cultural Experiences", description: "Immerse in local traditions", category: "Culture", readTime: "7 min read", date: "Dec 10, 2024" },
  ];


  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection title="Destination" />
      
      {/* Content Section */}
      <div className="p-6 md:p-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Destination Page
          </h2>
        </div>
        
        {/* NewSection and NewsCards - Vertical Layout */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '1rem',
          marginTop: '2rem'
        }}>
          {/* NewSection Component - Left side */}
          <div>
            <NewSection />
          </div>

          {/* NewsCards  */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {/* First NewsCard Component */}
            <NewsCard />
            
            {/* Second NewsCard Component */}
            <NewsCard />
            
            {/* Third NewsCard Component */}
            <NewsCard />
          </div>
        </div>

        {/* Latest Post Title - Below NewsCards */}
        <div style={{
          marginTop: '3rem',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          {/* Title */}
          <h2 style={{
            color: '#000000',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            margin: 0,
            textAlign: 'left',
            marginLeft: '6%'
          }}>
            Latest Post
          </h2>

          {/* Golden Line */}
          <div style={{
            width: '200px',
            height: '0px',
            borderTop: '15px solid #D2AD3F',
            borderRadius: '8px'
          }}>
          </div>
        </div>

        {/* LatestPostCard Grid - Simple responsive grid */}
        <div style={{ marginTop: '80px' }}>
        <DestinationGrid />
        </div>
        

        {/* Pagination */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
          marginTop: '-80px',
          marginBottom: '2rem'
        }}>
          <button style={{
            background: 'transparent',
            border: 'none',
            color: '#666666',
            fontSize: '18px',
            cursor: 'pointer',
            padding: '8px'
          }}>
            {'<'}
          </button>
          
          <div style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center'
          }}>
            <span style={{ color: '#666666', fontSize: '16px' }}>1</span>
            <span style={{ color: '#666666', fontSize: '16px' }}>2</span>
            <span style={{ 
              color: '#000000', 
              fontSize: '16px', 
              fontWeight: 'bold',
              background: '#D2AD3F',
              padding: '4px 8px',
              borderRadius: '4px'
            }}>3</span>
            <span style={{ color: '#666666', fontSize: '16px' }}>4</span>
            <span style={{ color: '#666666', fontSize: '16px' }}>5</span>
            <span style={{ color: '#666666', fontSize: '16px' }}>6</span>
          </div>
          
          <button style={{
            background: 'transparent',
            border: 'none',
            color: '#666666',
            fontSize: '18px',
            cursor: 'pointer',
            padding: '8px'
          }}>
            {'>'}
          </button>
        </div>
        
      </div>

      {/* Popular Post Section with Gradient Background */}
      <div style={{
        background: 'linear-gradient(102.91deg, rgba(247, 236, 213, 0.45) 1.8%, rgba(238, 201, 249, 0.45) 99.54%)',
        padding: '2rem 0',
        marginTop: '0rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '2rem'
        }}>
          {/* Title  popular post*/}
          <h2 style={{
            color: '#000000',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            margin: 0,
            textAlign: 'left',
            marginLeft: '6%'
          }}>
            Popular Post
          </h2>

          {/* Golden Line */}
          <div style={{
            width: '200px',
            height: '0px',
            borderTop: '15px solid #D2AD3F',
            borderRadius: '8px'
          }}>
          </div>
        </div>

        {/* Popular Post Cards */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem'
        }}>
          <PopularPostCard 
            image="/popular1.jpg"
            title="Discover Amazing Destinations Around the World"
            description="Explore breathtaking locations, hidden gems, and cultural experiences that will create unforgettable memories. From tropical beaches to mountain peaks, discover the perfect destination for your next adventure."
            category="Travel"
            readTime="8 min read"
            date="Dec 15, 2024"
          />
          
          <PopularPostCard 
            image="/popular2.jpg"
            title="Ultimate Guide to Adventure Travel"
            description="Embark on thrilling adventures with our comprehensive guide to adventure travel. From hiking trails to water sports, discover adrenaline-pumping activities and destinations that will challenge and inspire you."
            category="Adventure"
            readTime="6 min read"
            date="Dec 12, 2024"
          />
          
          <PopularPostCard 
            image="/popular3.jpg"
            title="Cultural Heritage and Local Experiences"
            description="Immerse yourself in rich cultural traditions and authentic local experiences. Discover ancient temples, traditional festivals, and local cuisines that tell the story of each destination's unique heritage."
            category="Culture"
            readTime="7 min read"
            date="Dec 10, 2024"
          />
          
          <PopularPostCard 
            image="/popular3.jpg"
            title="Hidden Gems and Off-the-Beaten-Path Destinations"
            description="Explore secret destinations that most travelers never discover. From secluded beaches to mountain villages, uncover hidden gems that offer authentic experiences away from tourist crowds."
            category="Hidden Gems"
            readTime="9 min read"
            date="Dec 8, 2024"
          />
        </div>
      </div>

      {/* Framer Card Section with Left Content */}
      <div style={{ display: "flex", gap: "2rem", justifyContent: "flex-start", alignItems: "center", height: "100vh", marginLeft: "55px" }}>
        {/* Content Section - Left Side */}
        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: "1rem",
          maxWidth: "400px"
        }}>
          <h1 style={{
            fontFamily: "Inter",
            fontWeight: 600,
            fontStyle: "small-caps",
            fontSize: "20px",
            lineHeight: "24px",
            letterSpacing: "2%",
            verticalAlign: "top",
            color: "#000000",
            marginTop: "-120px"
          }}>
            Waves & Whispers: Sri Lanka's Hidden Coves
          </h1>
          <p style={{
            fontFamily: "Inter",
            fontWeight: 400,
            fontStyle: "normal",
            fontSize: "10px",
            lineHeight: "20px",
            letterSpacing: "2%",
            verticalAlign: "middle",
            color: "#545454",
            marginTop: "10px"
          }}>
            A barefoot journey through quiet blue shores   A barefoot journey through quiet blue shores
            A barefoot journey through quiet blue shores
          </p>
        </div>

        {/* FramerCard Section - Right Side */}
        <div style={{ display: "flex", gap: "1rem" }}>
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

      {/* Popular Videos Section with Gradient Background */}
      <div style={{
        background: 'linear-gradient(102.91deg, rgba(247, 236, 213, 0.45) 1.8%, rgba(238, 201, 249, 0.45) 99.54%)',
        padding: '2rem 0',
        marginTop: '0rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '2rem'
        }}>
          {/* Title Popular Videos */}
          <h2 style={{
            color: '#000000',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            margin: 0,
            textAlign: 'left',
            marginLeft: '6%'
          }}>
            Popular Videos
          </h2>

          {/* Golden Line */}
          <div style={{
            width: '200px',
            height: '0px',
            borderTop: '15px solid #D2AD3F',
            borderRadius: '8px'
          }}>
          </div>
        </div>

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
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '1.5rem',
          paddingRight: '10%'
        }}>
          <button style={{
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
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 8px rgba(53, 20, 238, 0.3)'
          }}
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
    </div>
  )
}