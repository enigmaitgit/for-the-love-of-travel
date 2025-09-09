import React from 'react';

const PopularPostCard = ({ 
  image = "/popular1.jpg", 
  title = "Popular Post Title", 
  description = "This is a description of the popular post content that provides more details about the topic.",
  category = "Travel",
  readTime = "5 min read",
  date = "Dec 15, 2024"
}) => {
  return (
    <div style={{
      width: '879px',
      height: '275px',
      borderWidth: '1px',
      opacity: 1,
      gap: '16px',
      borderRadius: '12px',
      padding: '12px',
      background: '#FFFFFF',
      border: '1px solid #E8E8EA',
      display: 'flex',
      alignItems: 'center'
    }}>
      {/* Image Section */}
      <div style={{
        width: '372px',
        height: '251px',
        opacity: 1,
        borderRadius: '7px',
        overflow: 'hidden',
        flexShrink: 0
      }}>
        <img 
          src={image} 
          alt={title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '7px'
          }}
        />
      </div>

      {/* Content Section */}
      <div style={{
        width: '467px',
        height: '251px',
        opacity: 1,
        gap: '10px',
        padding: '4px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        {/* Category Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{
            background: '#D2AD3F',
            color: '#FFFFFF',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '500'
          }}>
            {category}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#000000',
          margin: 0,
          lineHeight: '1.3',
          marginBottom: '8px'
        }}>
          {title}
        </h3>

        {/* Description */}
        <p style={{
          fontSize: '8px',
          color: '#666666',
          margin: 0,
          lineHeight: '1.6',
          marginBottom: '10px'
        }}>
          {description}
        </p>

        {/* Bottom Section - Date and Read Time */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 'auto'
        }}>
          <span style={{
            fontSize: '7px',
            color: '#999999'
          }}>
            {date}
          </span>
          <span style={{
            fontSize: '7px',
            color: '#999999'
          }}>
            {readTime}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PopularPostCard;
