export default function HeroSection({ title = "Destination" }) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '300px',
        borderRadius: '0 0 40px 40px',
        overflow: 'hidden',
        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) -2.14%, rgba(0,0,0,0.55) 64.58%), url('/header.jpg')`,
        backgroundSize: "cover",
        backgroundPosition:"center"
      }}
    >

      {/* Travel Icon 
      <div style={{
        position: 'absolute',
        top: '25px',
        left: '25px'
      }}>
        <img 
          src="/icon.png" 
          alt="Travel Icon" 
          style={{
            width: '128px',
            height: '48px',
            opacity: 1
          }}
        />
      </div>
*/}

      {/* Destination Title - Centered */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center'
      }}>
        <h1 style={{
          color: 'white',
          fontSize: '2rem',
          fontWeight: 'bold',
          margin: 0,
          textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
        }}>
          {title}
        </h1>
      </div>     
    </div>
  );
}