import React from "react";
import LatestPostCard from "./LatestPostCard";

const DestinationGrid = () => {
  return (
    <div className="w-full max-w-[90%] lg:max-w-[90%] mx-auto lg:mx-0 lg:ml-[13%] mt-4 sm:mt-6 lg:mt-[22px] relative min-h-screen">


      {/* Mobile Layout - Stacked Cards */}
      <div className="flex flex-col gap-4 sm:gap-6 lg:hidden">
        <LatestPostCard width="100%" height="200px" image="/lt1.png" />
        <LatestPostCard width="100%" height="200px" image="/lt2.png" />
        <LatestPostCard width="100%" height="200px" image="/lt3.png" />
        <LatestPostCard width="100%" height="200px" image="/lt4.png" />
      </div>

      {/* Desktop Layout - Original Complex Layout */}
      <div className="hidden lg:block">
        {/* Row 1 - Absolute positioned cards */}
        <div style={{ position: 'relative', height: '400px', marginBottom: '60px' }}>
          <div style={{
            position: 'absolute',
            top: '-50px',
            left: '5px',
            zIndex: 2,
            gap: '10px',
            marginRight: '20px'
          }}>
            <LatestPostCard width="520px" height="200px" image="/lt1.png" />
          </div>
          <div style={{
            position: 'absolute',
            top: '-50px',
            left: '535px',
            zIndex: 1,
            marginLeft: '20px'
          }}>
            <LatestPostCard width="520px" height="200px" image="/lt2.png" />
          </div>
        </div>

        {/* Row 2 - Grid layout */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr 2fr', 
          gap: '15px',
          marginTop: '-290px',
          marginBottom: '20px'
        }}>
          <LatestPostCard width="450px" height="250px" image="/lt3.png" />
          <LatestPostCard width="350px" height="250px" image="/lt4.png" />
          <LatestPostCard width="250px" height="200px" image="/lt5.png" />
        </div>

        {/* Row 3 - Custom layout with absolute positioning */}
        <div style={{ 
          position: 'relative',
          height: '400px',
          marginTop: '15px'
        }}>
          <LatestPostCard width="820px" height="280px" image="/lt6.png" />
          <div style={{
            position: 'absolute',
            top: '-50px',
            left: '835px',
            zIndex: 1
          }}>
            <LatestPostCard width="250px" height="330px" image="/lt7.png" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationGrid;
