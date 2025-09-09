export default function NewsCard() {
  return (
    <div className="w-full max-w-[600px] lg:w-[600px] h-32 sm:h-40 lg:h-[163px] gap-3 sm:gap-4 lg:gap-[16px] rounded-[12px] border border-[#E8E8EA] p-3 sm:p-4 lg:p-[12px] bg-white flex flex-col sm:flex-row items-start sm:items-center">
      {/* Image Section */}
      <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-[120px] lg:h-[139px] rounded-[7px] overflow-hidden flex-shrink-0">
        <img
          src="/news2.jpg"
          alt="News Image"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col justify-between gap-2 sm:gap-2.5 lg:gap-[10px] p-1 sm:p-2 lg:p-[4px] sm:ml-4 lg:ml-[16px] relative">
        {/* Main Content */}
        <div>
          <h3 className="text-sm sm:text-base lg:text-[20px] font-bold text-black mb-1 sm:mb-1.5 lg:mb-[6px] leading-tight">
            Latest Travel News & Updates
          </h3>
          <p className="text-[9px] sm:text-[10px] lg:text-[11px] text-[#666666] mb-2 sm:mb-2.5 lg:mb-[8px] leading-relaxed">
            Discover the latest travel trends, destination highlights, and exclusive offers from around the world. Stay updated with our curated travel content.
          </p>
        </div>

        {/* Metadata Section - Positioned at right bottom */}
        <div className="w-20 sm:w-24 lg:w-[127px] h-3 sm:h-3.5 lg:h-[14px] gap-2 sm:gap-3 lg:gap-[12px] flex items-center text-[7px] sm:text-[8px] lg:text-[9px] text-[#888888] absolute bottom-1 sm:bottom-1.5 lg:bottom-[4px] right-1 sm:right-1.5 lg:right-[4px]">
          <span>5 min read</span>
          <span>|</span>
          <span>Travel News</span>
        </div>
      </div>
    </div>
  );
}