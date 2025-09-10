import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSection({ title = "Destination" }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  return (
    <section className="relative w-full overflow-hidden">
      <div className="px-4 sm:px-6 lg:px-8">
        <motion.section 
          className="relative h-[75vh] md:h-[85vh] lg:h-[95vh] rounded-[28px] overflow-hidden -mt-12"
          style={{ y, opacity }}
        >
          <motion.div
            style={{ scale }}
            className="w-full h-full"
          >
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) -2.14%, rgba(0,0,0,0.55) 64.58%), url('/header.jpg')`,
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
            />
          </motion.div>
          {/* Enhanced gradient overlay for better glass effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          
          {/* Additional subtle overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20" />

          {/* Destination Title - Centered with motion */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white max-w-4xl px-4">
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight drop-shadow-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {title}
              </motion.h1>
            </div>
          </div>

          {/* Decorative elements for visual interest */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-xl" />
          <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-white/3 rounded-full blur-lg" />
        </motion.section>
      </div>
    </section>
  );
}