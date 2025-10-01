import React from "react";
import LatestPostCard from "./LatestPostCard";

const DestinationGrid = ({ card1, card2, card3, card4, card5, card6, card7 }) => {
  const handleCardClick = (cardId) => {
    console.log(`Card ${cardId} clicked - navigating to content page`);
  };
  return (
    <div className="destination-grid-container" style={{
      maxWidth: '114.3%',
      margin: '0 auto',
      marginTop: '27px',
      marginLeft: '15.2%',
      position: 'relative',
      minHeight: '127vh',
      transform: 'scale(1.26)'
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
          <LatestPostCard 
            width="520px" 
            height="200px" 
            image={card1?.image || "/lt1.png"} 
            title={card1?.title}
            description={card1?.description}
            readTime={card1?.readTime}
            category={card1?.category}
            publishedDate={card1?.publishedDate}
            onClick={() => handleCardClick(card1?.id || 1)} 
          />
        </div>
        <div className="card-2" style={{
          position: 'absolute',
          top: '-50px',
          left: '535px',
          zIndex: 1,
          marginLeft: '20px'
        }}>
          <LatestPostCard 
            width="520px" 
            height="200px" 
            image={card2?.image || "/lt2.png" } 
            title={card2?.title}
            description={card2?.description}
            readTime={card2?.readTime}
            category={card2?.category}
            publishedDate={card2?.publishedDate}
            onClick={() => handleCardClick(card2?.id || 2)} 
          />
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
        <LatestPostCard 
          width="450px" 
          height="250px" 
          image={card3?.image || "/lt3.png"} 
          title={card3?.title}
          description={card3?.description}
          readTime={card3?.readTime}
          category={card3?.category}
          publishedDate={card3?.publishedDate}
          onClick={() => handleCardClick(card3?.id || 3)} 
        />
        <LatestPostCard 
          width="350px" 
          height="250px" 
          image={card4?.image || "/lt4.png"} 
          title={card4?.title}
          description={card4?.description}
          readTime={card4?.readTime}
          category={card4?.category}
          publishedDate={card4?.publishedDate}
          onClick={() => handleCardClick(card4?.id || 4)} 
        />
        <LatestPostCard 
          width="250px" 
          height="200px" 
          image={card5?.image || "/lt5.png"} 
          title={card5?.title}
          description={card5?.description}
          readTime={card5?.readTime}
          category={card5?.category}
          publishedDate={card5?.publishedDate}
          onClick={() => handleCardClick(card5?.id || 5)} 
        />
      </div>


      {/* Row 3 - Custom layout with absolute positioning */}
      <div className="row-3" style={{
        position: 'relative',
        height: '400px',
        marginTop: '15px'
      }}>
        <div className="card-6">
          <LatestPostCard 
            width="820px" 
            height="280px" 
            image={card6?.image || "/lt6.png"} 
            title={card6?.title}
            description={card6?.description}
            readTime={card6?.readTime}
            category={card6?.category}
            publishedDate={card6?.publishedDate}
            onClick={() => handleCardClick(card6?.id || 6)} 
          />
        </div>
        <div className="card-7" style={{
          position: 'absolute',
          top: '-50px',
          left: '835px',
          zIndex: 1
        }}>
          <LatestPostCard 
            width="250px" 
            height="330px" 
            image={card7?.image || "/lt7.png"} 
            title={card7?.title}
            description={card7?.description}
            readTime={card7?.readTime}
            category={card7?.category}
            publishedDate={card7?.publishedDate}
            onClick={() => handleCardClick(card7?.id || 7)} 
          />
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
