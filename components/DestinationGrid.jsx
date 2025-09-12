import React from "react";
import LatestPostCard from "./LatestPostCard";

const DestinationGrid = () => {
  const handleCardClick = (cardId) => {
    console.log(`Card ${cardId} clicked - navigating to content page`);
  };
  return (
    <div className="destination-grid-container" style={{
      maxWidth: '90%',
      margin: '0 auto',
      marginTop: '22px',
      marginLeft: '12%',
      position: 'relative',
      minHeight: '100vh'
    }}>


      {/* Row 1 - Absolute positioned cards */}
      <div className="row-1" style={{ position: 'relative', height: '400px', marginBottom: '60px' }}>
        <div className="card-1" style={{
          position: 'absolute',
          top: '-50px',
          left: '5px',
          zIndex: 2,
          gap: '10px',
          marginRight: '20px'
        }}>
          <LatestPostCard width="520px" height="200px" image="/lt1.png" onClick={() => handleCardClick(1)} />
        </div>
        <div className="card-2" style={{
          position: 'absolute',
          top: '-50px',
          left: '535px',
          zIndex: 1,
          marginLeft: '20px'
        }}>
          <LatestPostCard width="520px" height="200px" image="/lt2.png" onClick={() => handleCardClick(2)} />
        </div>
      </div>


      {/* Row 2 - Grid layout */}
      <div className="row-2" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 2fr',
        gap: '15px',
        marginTop: '-290px',
        marginBottom: '20px'
      }}>
        <LatestPostCard width="450px" height="250px" image="/lt3.png" onClick={() => handleCardClick(3)} />
        <LatestPostCard width="350px" height="250px" image="/lt4.png" onClick={() => handleCardClick(4)} />
        <LatestPostCard width="250px" height="200px" image="/lt5.png" onClick={() => handleCardClick(5)} />
      </div>


      {/* Row 3 - Custom layout with absolute positioning */}
      <div className="row-3" style={{
        position: 'relative',
        height: '400px',
        marginTop: '15px'
      }}>
        <div className="card-6">
          <LatestPostCard width="820px" height="280px" image="/lt6.png" onClick={() => handleCardClick(6)} />
        </div>
        <div className="card-7" style={{
          position: 'absolute',
          top: '-50px',
          left: '835px',
          zIndex: 1
        }}>
          <LatestPostCard width="250px" height="330px" image="/lt7.png" onClick={() => handleCardClick(7)} />
        </div>
      </div>

      {/* Mobile-specific CSS */}
      <style jsx>{`
        @media (max-width: 768px) {
          .destination-grid-container {
            max-width: 95% !important;
            min-height: auto !important;
            padding: 0 10px !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 20px !important;
          }
          
          .row-1 {
            height: auto !important;
            margin-bottom: 0 !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 20px !important;
          }
          
          .card-1, .card-2 {
            position: static !important;
            margin: 0 !important;
            width: 100% !important;
            display: flex !important;
            justify-content: center !important;
          }
          
          .row-2 {
            display: flex !important;
            flex-direction: column !important;
            gap: 20px !important;
            margin-top: 0 !important;
            margin-bottom: 0 !important;
          }
          
          /* Show only first 2 cards in row-2, hide the third */
          .row-2 > :nth-child(1),
          .row-2 > :nth-child(2) {
            display: flex !important;
            justify-content: center !important;
          }
          
          .row-2 > :nth-child(3) {
            display: none !important;
          }
          
          /* Hide entire row-3 on mobile */
          .row-3 {
            display: none !important;
          }
        }
        
        @media (max-width: 480px) {
          .destination-grid-container {
            max-width: 100% !important;
            padding: 0 5px !important;
            gap: 15px !important;
          }
          
          .row-1 {
            gap: 15px !important;
          }
          
          .row-2 {
            gap: 15px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default DestinationGrid;
