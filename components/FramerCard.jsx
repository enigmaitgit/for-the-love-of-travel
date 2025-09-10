'use client'

import { motion } from "framer-motion";

const FramerCard = ({ 
  id,
  image = "/framer1.png", 
  title = "Framer Card Title", 
  description = "This is a description of the framer card content that provides more details about the topic.",
  category = "Tour",
  readTime = "5 min read",
  date = "Dec 15, 2024",
  selected,
  setSelected,
  hovered,
  setHovered,
  index = 0
}) => {
  return (
    <motion.div
      onMouseEnter={() => setHovered && setHovered(id)}
      onMouseLeave={() => setHovered && setHovered(null)}
      onClick={() => setSelected && setSelected(selected === id ? null : id)}
      initial={{ 
        opacity: 0, 
        y: 50, 
        scale: 0.8,
        rotateY: -15
      }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        scale: selected === id ? 1.05 : 1,
        rotateY: 0,
        zIndex: selected === id ? 5 : 1,
      }}
      whileHover={{ 
        scale: 1.08,
        y: -15,
        rotateY: 8,
        zIndex: 10,
        boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 8px 16px rgba(0,0,0,0.2)',
        transition: { 
          type: "spring", 
          stiffness: 300, 
          damping: 20,
          duration: 0.4
        }
      }}
      whileTap={{ 
        scale: 0.95,
        transition: { duration: 0.1 }
      }}
      transition={{ 
        type: "spring", 
        stiffness: 200, 
        damping: 20,
        duration: 0.6,
        delay: index * 0.15
      }}
      style={{
        width: '291.87px',
        height: '353.5px',
        opacity: 1,
        padding: '26.92px 31.17px',
        gap: '7.08px',
        borderRadius: '17px',
        background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%), url('${image}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2), 0 4px 8px rgba(0,0,0,0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)'
      }}
    >
      {/* Top Left Category Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 'auto' }}>
        <button style={{
          width: '88.55px',
          height: '28.34px',
          borderRadius: '14.17px',
          border: '0.71px solid #FFFFFF',
          padding: '7.08px',
          background: 'transparent',
          color: '#FFFFFF',
          fontSize: '7px',
          fontWeight: '500',
          cursor: 'pointer'
        }}>
          {category}
        </button>
      </div>

      {/* Title + Description */}
      <div style={{ width: '234px', height: '190.5px', display: 'flex', flexDirection: 'column', justifyContent: 'center', marginBottom: 'auto' }}>
        <h3 style={{
          fontFamily: 'Inter',
          fontWeight: 600,
          fontSize: '27px',
          lineHeight: '37px',
          color: '#FFFFFF',
          margin: 0,
          textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
        }}>
          {title}
        </h3>
        {selected === id && ( // only show description when selected
          <p style={{
            fontSize: '8px',
            color: '#FFFFFF',
            margin: 0,
            lineHeight: '1.5',
            textShadow: '0.5px 0.5px 1px rgba(0,0,0,0.7)'
          }}>
            {description}
          </p>
        )}
      </div>

      {/* Metadata Bottom Right */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '7.08px', fontSize: '6px', color: '#FFFFFF', textShadow: '0.5px 0.5px 1px rgba(0,0,0,0.7)' }}>
          <span>{readTime}</span>
          <span>|</span>
          <span>{date}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default FramerCard;
