import { motion } from 'framer-motion';

export default function LatestPostCard({ width = '382px', height = '146px', image = '/lt1.png' }) {
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
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 100%), url('${image}')`,
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

      <div style={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginBottom: 'auto'
      }}>
        <button style={{
          width: '62px',
          height: '20px',
          border: '1px solid #FFFFFF',
          borderRadius: '10px',
          padding: '5px',
          gap: '5px',
          background: 'transparent',
          color: '#FFFFFF',
          fontSize: '7px',
          fontWeight: '500',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          Tour
        </button>
      </div>

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '8px',
        marginBottom: 'auto'
      }}>
        <h3 style={{
          fontSize: '12px',
          fontWeight: 'bold',
          color: '#FFFFFF',
          margin: 0,
          lineHeight: '1.3',
          textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
        }}>
          Discover Hidden Gems: Sri Lanka's Secret Beaches
        </h3>
        <p style={{
          fontSize: '8px',
          color: '#FFFFFF',
          margin: 0,
          lineHeight: '1.5',
          textShadow: '0.5px 0.5px 1px rgba(0,0,0,0.7)'
        }}>
          Explore the untouched beauty of Sri Lanka's hidden coastal treasures. From pristine white sand beaches to crystal clear waters, discover the island's best-kept secrets that offer tranquility away from the crowds.
        </p>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
      }}>
        <div style={{
          width: '127px',
          height: '14px',
          gap: '12px',
          display: 'flex',
          alignItems: 'center',
          fontSize: '7px',
          color: '#FFFFFF',
          textShadow: '0.5px 0.5px 1px rgba(0,0,0,0.7)'
        }}>
          <span>8 min read</span>
          <span>|</span>
          <span>Travel Guide</span>
          <span>|</span>
          <span>Dec 15, 2024</span>
        </div>
      </div>
    </motion.div>
  );
}
