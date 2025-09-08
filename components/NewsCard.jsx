export default function NewsCard() {
  return (
    <div style={{
      width: '600px', // Adjusted for larger content section
      height: '163px', // 266px / 2 = 133px (half size)
      gap: '16px', // 32px / 2 = 16px (half size)
      borderRadius: '12px', // 25px / 2 = 12px (half size)
      border: '1px solid #E8E8EA',
      padding: '12px', // 24px / 2 = 12px (half size)
      background: '#FFFFFF',
      display: 'flex',
      alignItems: 'center'
    }}>
      {/* Image Section */}
      <div style={{
        width: '120px', // 241px / 2 = 120px (half size)
        height: '139px', // 218px / 2 = 109px (half size)
        borderRadius: '7px', // 14px / 2 = 7px (half size)
        overflow: 'hidden',
        flexShrink: 0
      }}>
        <img
          src="/news2.jpg"
          alt="News Image"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>

      {/* Content Section */}
      <div style={{
        width: '857px', // 118% larger than original 392px
        height: '109px', // 218px / 2 = 109px (half size)
        gap: '10px', // 20px / 2 = 10px (half size)
        padding: '4px', // 8px / 2 = 4px (half size)
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginLeft: '16px', // 32px / 2 = 16px (half size)
        position: 'relative'
      }}>
        {/* Main Content */}
        <div>
          <h3 style={{
            fontSize: '20px', // 24px / 2 = 12px (half size)
            fontWeight: 'bold',
            color: '#000000',
            margin: '0 0 6px 0', // 12px / 2 = 6px (half size)
            lineHeight: '1.3'
          }}>
            Latest Travel News & Updates
          </h3>
          <p style={{
            fontSize: '11px', // 16px / 2 = 8px (half size)
            color: '#666666',
            margin: '0 0 8px 0', // 16px / 2 = 8px (half size)
            lineHeight: '1.5'
          }}>
            Discover the latest travel trends, destination highlights, and exclusive offers from around the world. Stay updated with our curated travel content.
          </p>
        </div>

        {/* Metadata Section - Positioned at right bottom */}
        <div style={{
          width: '127px', // 254px / 2 = 127px (half size)
          height: '14px', // 28px / 2 = 14px (half size)
          gap: '12px', // 24px / 2 = 12px (half size)
          display: 'flex',
          alignItems: 'center',
          fontSize: '9px', // 14px / 2 = 7px (half size)
          color: '#888888',
          position: 'absolute',
          bottom: '4px',
          right: '4px'
        }}>
          <span>5 min read</span>
          <span>|</span>
          <span>Travel News</span>
        </div>
      </div>
    </div>
  );
}