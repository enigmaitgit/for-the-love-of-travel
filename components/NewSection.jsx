export default function NewSection() {
  return (
    <div className="w-full max-w-[495px] lg:w-[495px] p-4 sm:p-6 lg:p-[29px] bg-white border border-[#E8E8EA] rounded-[23px] flex flex-col gap-4 sm:gap-5 lg:gap-[22px]">
      {/* Header Section with Title and Description */}
      <div className="text-center mb-3 sm:mb-4 lg:mb-[14px]">
        <h1 className="text-lg sm:text-xl lg:text-[25px] font-bold text-black mb-2 sm:mb-3 lg:mb-[11px]">
          Featured Destination
        </h1>
        <p className="text-xs sm:text-sm lg:text-[14px] text-[#666666] leading-relaxed">
          Discover the hidden gems of Sri Lanka with our exclusive travel experiences
        </p>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-[405px] lg:w-[405px] h-64 sm:h-80 lg:h-[387px] rounded-[14px] overflow-hidden relative bg-cover bg-center flex flex-col justify-between p-3 sm:p-4 lg:p-[18px] self-center"
           style={{
             backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) -2.14%, rgba(0,0,0,0.55) 64.58%), url('/news1.png')`
           }}>
        {/* Tours Button */}
        <div className="self-start">
          <button className="px-2 py-1 sm:px-2.5 sm:py-1.5 lg:px-[9px] lg:py-[5px] rounded-[12px] border border-white bg-transparent text-white text-[8px] sm:text-[9px] lg:text-[9px] font-medium cursor-pointer">
            Tours
          </button>
        </div>

        {/* Content Section */}
        <div className="text-white text-left">
          {/* Main Title */}
          <h2 className="text-sm sm:text-base lg:text-[19px] font-bold mb-2 sm:mb-2.5 lg:mb-[9px] leading-tight">
            Waves & Whispers: Sri Lanka's Hidden Coves
          </h2>
          
          {/* Description */}
          <p className="text-[8px] sm:text-[9px] lg:text-[10px] mb-3 sm:mb-3.5 lg:mb-[14px] opacity-90 leading-snug">
            A barefoot journey through quiet blue shores
          </p>

          {/* Metadata */}
          <div className="text-[7px] sm:text-[8px] lg:text-[9px] opacity-80 flex items-center gap-1 sm:gap-1.5 lg:gap-[5px]">
            <span>14 min read</span>
            <span>|</span>
            <span>May 28, 2025</span>
          </div>
        </div>
      </div>
    </div>
  );
}