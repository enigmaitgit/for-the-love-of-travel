export default function NewsCard() {
  return (
    <div className="w-full max-w-2xl lg:w-[600px] h-auto lg:h-[163px] border border-gray-200 rounded-xl p-3 lg:p-4 bg-white flex flex-col sm:flex-row items-stretch sm:items-center gap-4 lg:gap-6">
      {/* Image Section */}
      <div className="w-full sm:w-32 lg:w-[120px] h-32 sm:h-28 lg:h-[139px] rounded-lg overflow-hidden flex-shrink-0">
        <img
          src="/news2.jpg"
          alt="News Image"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col justify-between gap-2 lg:gap-3 p-1 lg:p-2 relative">
        {/* Main Content */}
        <div className="flex-grow">
          <h3 className="text-base sm:text-lg lg:text-xl font-bold text-black mb-2 lg:mb-3 leading-tight">
            Latest Travel News & Updates
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Discover the latest travel trends, destination highlights, and exclusive offers from around the world. Stay updated with our curated travel content.
          </p>
        </div>

        {/* Metadata Section - Positioned at right bottom */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mt-2 lg:mt-0 lg:absolute lg:bottom-1 lg:right-1">
          <span>5 min read</span>
          <span>|</span>
          <span>Travel News</span>
        </div>
      </div>
    </div>
  );
}