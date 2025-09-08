export default function NewSection() {
  return (
    <div style={{
      width: '495px', // 550px * 0.9 = 495px (10% smaller)
      padding: '29px', // 32px * 0.9 = 29px (10% smaller)
      background: '#FFFFFF',
      border: '1px solid #E8E8EA',
      borderRadius: '23px', // 25px * 0.9 = 23px (10% smaller)
      display: 'flex',
      flexDirection: 'column',
      gap: '22px' // 24px * 0.9 = 22px (10% smaller)
    }}>
      {/* Header Section with Title and Description */}
      <div style={{
        textAlign: 'center',
        marginBottom: '14px' // 16px * 0.9 = 14px (10% smaller)
      }}>
        <h1 style={{
          fontSize: '25px', // 28px * 0.9 = 25px (10% smaller)
          fontWeight: 'bold',
          color: '#000000',
          margin: '0 0 11px 0' // 12px * 0.9 = 11px (10% smaller)
        }}>
          Featured Destination
        </h1>
        <p style={{
          fontSize: '14px', // 16px * 0.9 = 14px (10% smaller)
          color: '#666666',
          margin: 0,
          lineHeight: '1.5'
        }}>
          Discover the hidden gems of Sri Lanka with our exclusive travel experiences
        </p>
      </div>

      {/* Main Card */}
      <div style={{
        width: '405px', // 450px * 0.9 = 405px (10% smaller)
        height: '387px', // 430px * 0.9 = 387px (10% smaller)
        borderRadius: '14px', // 16px * 0.9 = 14px (10% smaller)
        overflow: 'hidden',
        position: 'relative',
        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) -2.14%, rgba(0,0,0,0.55) 64.58%), url('/news1.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '18px', // 20px * 0.9 = 18px (10% smaller)
        alignSelf: 'center' 
      }}>
        {/* Tours Button */}
        <div style={{
          alignSelf: 'flex-start'
        }}>
          <button style={{
            padding: '5px 9px', // 5px 10px * 0.9 = 5px 9px (10% smaller)
            borderRadius: '12px', // 13px * 0.9 = 12px (10% smaller)
            border: '1px solid white',
            background: 'transparent',
            color: 'white',
            fontSize: '9px', // 10px * 0.9 = 9px (10% smaller)
            fontWeight: '500',
            cursor: 'pointer'
          }}>
            Tours
          </button>
        </div>

        {/* Content Section */}
        <div style={{
          color: 'white',
          textAlign: 'left'
        }}>
          {/* Main Title */}
          <h2 style={{
            fontSize: '19px', // 21px * 0.9 = 19px (10% smaller)
            fontWeight: 'bold',
            margin: '0 0 9px 0', // 10px * 0.9 = 9px (10% smaller)
            lineHeight: '1.2'
          }}>
            Waves & Whispers: Sri Lanka's Hidden Coves
          </h2>
          
          {/* Description */}
          <p style={{
            fontSize: '10px', // 11px * 0.9 = 10px (10% smaller)
            margin: '0 0 14px 0', // 16px * 0.9 = 14px (10% smaller)
            opacity: 0.9,
            lineHeight: '1.4'
          }}>
            A barefoot journey through quiet blue shores
          </p>

          {/* Metadata */}
          <div style={{
            fontSize: '9px', // 10px * 0.9 = 9px (10% smaller)
            opacity: 0.8,
            display: 'flex',
            alignItems: 'center',
            gap: '5px' // 5px * 0.9 = 4.5px, keeping 5px for readability
          }}>
            <span>14 min read</span>
            <span>|</span>
            <span>May 28, 2025</span>
          </div>
        </div>
      </div>
    </div>
  );
}